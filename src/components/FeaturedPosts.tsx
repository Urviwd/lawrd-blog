'use client'

import { motion } from 'framer-motion'
import { Star, Clock, Eye, Glasses, Heart } from 'lucide-react'
import Link from 'next/link'

const featuredPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Digital Marketing in 2024",
    excerpt: "Master the latest strategies, tools, and techniques that are driving success in today's competitive digital landscape.",
    author: "Sarah Johnson",
    rating: 4.9,
    reviews: 127,
    readTime: "15 min",
    views: "2.4k",
    price: 29.99,
    originalPrice: 49.99,
    category: "Marketing",
    featured: true
  },
  {
    id: 2,
    title: "AI-Powered Business Automation: Complete Framework",
    excerpt: "Learn how to implement intelligent automation systems that can save you 20+ hours per week while improving efficiency.",
    author: "Michael Chen",
    rating: 4.8,
    reviews: 89,
    readTime: "22 min",
    views: "1.8k",
    price: 39.99,
    originalPrice: 69.99,
    category: "Technology",
    featured: true
  },
  {
    id: 3,
    title: "Financial Freedom Blueprint: Build Wealth in 5 Years",
    excerpt: "A comprehensive roadmap to achieving financial independence through smart investing, budgeting, and income strategies.",
    author: "Emma Rodriguez",
    rating: 4.7,
    reviews: 203,
    readTime: "18 min",
    views: "3.1k",
    price: 24.99,
    originalPrice: 39.99,
    category: "Finance",
    featured: false
  },
  {
    id: 4,
    title: "Productivity Mastery: 10X Your Output",
    excerpt: "Discover the proven methods used by top performers to maximize productivity and achieve more in less time.",
    author: "David Thompson",
    rating: 4.6,
    reviews: 156,
    readTime: "12 min",
    views: "2.7k",
    price: 19.99,
    originalPrice: 29.99,
    category: "Productivity",
    featured: false
  }
]

export default function FeaturedPosts() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          >
            Featured Premium Content
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Handpicked articles and guides that deliver exceptional value and actionable insights
          </motion.p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                post.featured ? 'ring-2 ring-blue-500 ring-offset-4' : ''
              }`}
            >
              {/* Featured Badge */}
              {post.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
                    Featured
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="aspect-[16/10] bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-white/90 text-gray-800">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-3">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>By {post.author}</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(post.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {post.rating} ({post.reviews} reviews)
                  </span>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-end">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-300">
                      <Heart className="h-5 w-5" />
                    </button>
                    <Link 
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                      <Glasses className="h-4 w-4" />
                      <span>Read Now</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
            View All Premium Content
          </button>
        </motion.div>
      </div>
    </section>
  )
}
