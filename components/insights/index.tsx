"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getAllInsights, Insight } from "@/apirequests/insights";

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const data = await getAllInsights();
      setInsights(data);
    } catch (error) {
      console.error("Failed to fetch insights:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get featured posts (first 3)
  const featuredPosts = insights.slice(0, 3);

  // Get all posts excluding featured
  const allPosts = insights.slice(3);

  // Get recent posts (last 5)
  const recentPosts = insights.slice(0, 5);

  // Filter insights based on search only
  const filteredInsights = insights.filter((insight) => {
    const matchesSearch =
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const displayedFeatured = filteredInsights.slice(0, 3);
  const displayedAll = filteredInsights.slice(3);

  const resources = [
    {
      title: "GST Return Due Dates 2024",
      type: "PDF Calendar",
      downloads: "2.5k+",
      link: "#",
    },
    {
      title: "ITR Filing Checklist",
      type: "PDF Guide",
      downloads: "1.8k+",
      link: "#",
    },
    {
      title: "Company Incorporation Document List",
      type: "Excel Sheet",
      downloads: "3.2k+",
      link: "#",
    },
    {
      title: "Startup India Benefits Guide",
      type: "E-Book",
      downloads: "1.2k+",
      link: "#",
    },
    {
      title: "Tax Planning Strategies for FY 2024-25",
      type: "PDF Guide",
      downloads: "987+",
      link: "#",
    },
  ];

  // Helper function to create content preview from HTML
  const getContentPreview = (content: string, maxLength: number = 150): string => {
    // Strip HTML tags
    const stripped = content.replace(/<[^>]*>/g, "");
    // Trim and truncate
    return stripped.length > maxLength
      ? stripped.substring(0, maxLength) + "..."
      : stripped;
  };

  if (loading) {
    return (
      <main className="overflow-hidden min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#145886] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading insights...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-[#145886]/5 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[#F37920] font-semibold text-sm uppercase tracking-wider">Insights</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#145886] mt-2 mb-4">
              Knowledge Center
            </h1>
            <p className="text-lg text-gray-600">
              Stay updated with the latest news, updates, and expert insights on taxation, compliance, 
              and business regulations.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles, guides, resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pr-12 bg-white border border-gray-200 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F37920] focus:border-transparent"
              />
              <button className="absolute right-2 top-2 bg-[#145886] text-white p-2 rounded-full hover:bg-[#145886]/90 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#145886]">Featured Articles</h2>
            <Link href="/insights/featured" className="text-[#F37920] font-semibold hover:underline">
              View All Featured →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {displayedFeatured.map((post) => (
              <Link
                key={post.id}
                href={`/insights/${post.slug}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="relative w-full h-48 bg-gradient-to-br from-[#145886] to-[#145886]/80 overflow-hidden flex items-center justify-center">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#145886] to-[#145886]/80">
                      <span className="text-white text-6xl">📊</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-[#F37920] text-white text-xs font-semibold rounded-full mb-2">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold text-[#145886] mb-2 group-hover:text-[#F37920] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {post.excerpt || getContentPreview(post.content || "")}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-[#145886] font-semibold">{post.author}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">
                        {new Date(post.createdAt || "").toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-gray-400">{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

  

     
    </main>
  );
}