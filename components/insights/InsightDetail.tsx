"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaCalendar, FaClock, FaUser, FaTag, FaSpinner, FaShareAlt } from "react-icons/fa";
import { getInsightBySlug, getAllInsights, Insight } from "@/apirequests/insights";

export default function InsightDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string;
    
    const [insight, setInsight] = useState<Insight | null>(null);
    const [relatedInsights, setRelatedInsights] = useState<Insight[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (slug) {
            fetchInsight();
        }
    }, [slug]);

    const fetchInsight = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Fetch the current insight
            const data = await getInsightBySlug(slug);
            setInsight(data);

            // Fetch all insights for related posts
            const allInsights = await getAllInsights();
            const related = allInsights
                .filter((item: Insight) => 
                    item.slug !== slug && 
                    item.category === data.category
                )
                .slice(0, 3);
            setRelatedInsights(related);
        } catch (error: any) {
            console.error("Failed to fetch insight:", error);
            setError("Failed to load the article. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: insight?.title,
                text: insight?.excerpt,
                url: window.location.href,
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    if (loading) {
        return (
            <main className="overflow-hidden min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <FaSpinner className="w-16 h-16 text-[#145886] animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading article...</p>
                </div>
            </main>
        );
    }

    if (error || !insight) {
        return (
            <main className="overflow-hidden min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="text-6xl mb-4">😞</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h1>
                    <p className="text-gray-600 mb-6">{error || "The article you're looking for doesn't exist."}</p>
                    <Link
                        href="/insights"
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-[#145886] text-white rounded-lg hover:bg-[#145886]/90 transition-colors"
                    >
                        <FaArrowLeft />
                        <span>Back to Insights</span>
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="overflow-hidden min-h-screen bg-gray-50">
            {/* Header Navigation */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <Link
                        href="/insights"
                        className="inline-flex items-center space-x-2 text-[#145886] hover:text-[#F37920] transition-colors"
                    >
                        <FaArrowLeft />
                        <span className="font-medium">Back to Insights</span>
                    </Link>
                </div>
            </div>

            {/* Article Content */}
            <article className="max-w-4xl mx-auto px-4 py-12">
                {/* Article Header */}
                <header className="mb-8">
                    {/* Featured Image */}
                    {insight.imageUrl && (
                        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src={insight.imageUrl}
                                alt={insight.title}
                                className="w-full h-auto object-contain bg-gray-100"
                            />
                        </div>
                    )}

                    <div className="flex items-center space-x-2 mb-4">
                        <span className="px-3 py-1 bg-[#F37920]/10 text-[#F37920] text-sm font-semibold rounded-full">
                            {insight.category}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-500">
                            {new Date(insight.createdAt || "").toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {insight.title}
                    </h1>

                    {insight.excerpt && (
                        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                            {insight.excerpt}
                        </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                        <div className="flex items-center space-x-2">
                            <FaUser className="text-[#145886]" />
                            <span className="font-medium">{insight.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaClock className="text-[#145886]" />
                            <span>{insight.readTime}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                        </div>
                        <button
                            onClick={handleShare}
                            className="flex items-center space-x-2 px-4 py-2 bg-[#145886] text-white rounded-lg hover:bg-[#145886]/90 transition-colors"
                        >
                            <FaShareAlt />
                            <span>Share</span>
                        </button>
                    </div>
                </header>

                {/* Article Body */}
                <div 
                    className="prose prose-lg max-w-none mb-12 prose-imgs:object-contain prose-imgs:w-full prose-imgs:h-auto prose-ol:space-y-2 prose-li:my-1"
                    dangerouslySetInnerHTML={{ __html: insight.content || "" }}
                    style={{
                        lineHeight: "1.8",
                    }}
                />

                {/* Article Footer */}
                <footer className="border-t border-gray-200 pt-8">
                    <div className="bg-gradient-to-r from-[#145886] to-[#145886]/90 rounded-2xl p-8 text-white mb-8">
                        <h3 className="text-2xl font-bold mb-2 text-white">Need Expert Consultation?</h3>
                        <p className="text-white/90 mb-4">
                            Get personalized advice from our experienced chartered accountants
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-6 py-3 bg-[#F37920] text-white font-semibold rounded-lg hover:bg-[#F37920]/90 transition-colors"
                        >
                            Book a Consultation
                        </Link>
                    </div>

                    {/* Related Articles */}
                    {relatedInsights.length > 0 && (
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                {relatedInsights.map((related) => (
                                    <Link
                                        key={related.id}
                                        href={`/insights/${related.slug}`}
                                        className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                                    >
                                        {related.imageUrl && (
                                            <div className="relative w-full h-40 overflow-hidden">
                                                <img
                                                    src={related.imageUrl}
                                                    alt={related.title}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-xs text-gray-400">{related.readTime}</span>
                                            </div>
                                            <h4 className="text-lg font-bold text-[#145886] mb-2 hover:text-[#F37920] transition-colors line-clamp-2">
                                                {related.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                                {related.excerpt}
                                            </p>
                                            <div className="text-xs text-gray-500">
                                                <span className="font-semibold text-[#145886]">{related.author}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </footer>
            </article>

            {/* Back to Top Button */}
            <div className="fixed bottom-8 right-8">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="p-4 bg-[#145886] text-white rounded-full shadow-lg hover:bg-[#145886]/90 transition-all"
                    aria-label="Back to top"
                >
                    <FaArrowLeft className="transform rotate-90" />
                </button>
            </div>
        </main>
    );
}