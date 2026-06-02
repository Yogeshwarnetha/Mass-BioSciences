// Example: Updated About Page Component (Dynamic Content from Database)
// app/about/page-dynamic.tsx

import { getAboutSections } from "@/apirequests/about";
import Link from "next/link";

interface AboutSection {
    id?: number;
    sectionTitle: string;
    sectionSubtitle?: string;
    content: string;
    imageUrl?: string;
    order: number;
    isVisible: boolean;
}

export default async function AboutPage() {
    // Fetch sections from database
    let sections: AboutSection[] = [];
    
    try {
        sections = await getAboutSections();
    } catch (error) {
        console.error("Failed to fetch about sections:", error);
        sections = [];
    }

    return (
        <main className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-white to-[#145886]/5 pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <span className="text-[#F37920] font-semibold text-sm uppercase tracking-wider">About Us</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-[#145886] mt-2 mb-4">
                            Trusted Financial Experts
                        </h1>
                        <p className="text-lg text-gray-600">
                            With decades of combined experience, we provide expert financial and compliance solutions 
                            backed by professional excellence and ICAI standards.
                        </p>
                    </div>
                </div>
            </section>

            {/* Dynamic Sections */}
            {sections && sections.length > 0 ? (
                sections.map((section, index) => (
                    <section 
                        key={section.id} 
                        className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-[#145886]/5'}`}
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {/* Section Header */}
                            <div className={`mb-12 ${index % 2 === 1 ? 'text-center' : ''}`}>
                                {section.sectionSubtitle && (
                                    <span className="text-[#F37920] font-semibold text-sm uppercase tracking-wider">
                                        {section.sectionSubtitle}
                                    </span>
                                )}
                                <h2 className="text-3xl font-bold text-[#145886] mt-2">
                                    {section.sectionTitle}
                                </h2>
                            </div>

                            {/* Section Content with Optional Image */}
                            <div className={`grid ${section.imageUrl ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-12 items-center`}>
                                {/* Content */}
                                <div className={section.imageUrl && index % 2 === 1 ? 'order-2' : ''}>
                                    <div 
                                        className="prose prose-lg max-w-none text-gray-600 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: section.content }}
                                    />
                                </div>

                                {/* Image */}
                                {section.imageUrl && (
                                    <div className={index % 2 === 1 ? 'order-1' : ''}>
                                        <div className="relative">
                                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#F37920]/10 rounded-full"></div>
                                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#145886]/10 rounded-full"></div>
                                            <img 
                                                src={section.imageUrl} 
                                                alt={section.sectionTitle}
                                                className="relative rounded-2xl shadow-lg w-full h-auto"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                ))
            ) : (
                // Fallback content if no sections found
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <p className="text-gray-600">Loading content...</p>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-[#145886] to-[#145886]/90">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to grow with us?</h2>
                    <p className="text-white/90 mb-8">
                        Join 500+ satisfied clients who trust us with their financial and compliance needs.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-[#F37920] hover:bg-[#F37920]/90 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                    >
                        Get in Touch
                    </Link>
                </div>
            </section>
        </main>
    );
}
