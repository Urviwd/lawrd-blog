'use client'

import Link from "next/link";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

const featuredPosts = [
  {
    id: 1,
    title: "Supreme Court Ruling on Digital Privacy: What It Means for Tech Companies",
    excerpt: "A landmark decision that reshapes how companies handle user data and privacy protection in the digital age.",
    category: "Constitutional Law",
    author: "Dr. Sarah Chen",
    readTime: "8 min read",
    publishDate: "2024-01-15",
    image: "/api/placeholder/400/250",
    featured: true
  },
  {
    id: 2,
    title: "New Employment Law Changes: Impact on Remote Work Policies",
    excerpt: "Understanding the latest amendments to employment regulations and their implications for hybrid work environments.",
    category: "Employment Law",
    author: "Michael Rodriguez",
    readTime: "6 min read",
    publishDate: "2024-01-12",
    image: "/api/placeholder/400/250"
  }
];

export default function FeaturedPosts() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Legal Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay ahead with our most important legal analysis and commentary on current legal developments.
          </p>
        </div>

        {/* Featured Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post, index) => (
            <article 
              key={post.id} 
              className={`group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                post.featured ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Post Image */}
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
                {post.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-block px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Post Content */}
              <div className="p-6">
                <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors ${
                  post.featured ? 'text-xl lg:text-2xl' : 'text-lg'
                }`}>
                  <Link href={`/blog/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Post Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <Link 
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group-hover:underline"
                >
                  Read More
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link 
            href="/list"
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            View All Articles
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

