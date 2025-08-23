'use client'

import React from 'react'
import { ArrowLeft, Clock, Eye, Star, Glasses } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

// Sample blog data organized by category
const blogData = {
  "News & Updates": [
    {
      id: 1,
      title: "Supreme Court Ruling on Digital Privacy Rights",
      excerpt: "Landmark decision sets new precedent for data protection in the digital age",
      author: "Sarah Johnson",
      rating: 4.9,
      reviews: 127,
      readTime: "8 min",
      views: "2.4k",
      category: "News & Updates",
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "New Environmental Protection Regulations",
      excerpt: "Comprehensive overview of the latest environmental laws and their implications",
      author: "Michael Chen",
      rating: 4.7,
      reviews: 89,
      readTime: "12 min",
      views: "1.8k",
      category: "News & Updates",
      date: "2024-01-12"
    },
    {
      id: 3,
      title: "Corporate Law Amendments 2024",
      excerpt: "Key changes in corporate governance and compliance requirements",
      author: "Emma Rodriguez",
      rating: 4.8,
      reviews: 156,
      readTime: "15 min",
      views: "3.1k",
      category: "News & Updates",
      date: "2024-01-10"
    }
  ],
  "Acts & Rules": [
    {
      id: 4,
      title: "Understanding the Right to Information Act",
      excerpt: "Complete guide to RTI provisions, procedures, and practical applications",
      author: "David Thompson",
      rating: 4.6,
      reviews: 203,
      readTime: "20 min",
      views: "2.7k",
      category: "Acts & Rules",
      date: "2024-01-08"
    },
    {
      id: 5,
      title: "Consumer Protection Act: Your Rights",
      excerpt: "Everything you need to know about consumer rights and legal remedies",
      author: "Lisa Wang",
      rating: 4.5,
      reviews: 178,
      readTime: "18 min",
      views: "2.2k",
      category: "Acts & Rules",
      date: "2024-01-05"
    },
    {
      id: 6,
      title: "Labor Laws: Employment Rights Guide",
      excerpt: "Comprehensive overview of labor laws and employee protections",
      author: "James Wilson",
      rating: 4.7,
      reviews: 145,
      readTime: "22 min",
      views: "1.9k",
      category: "Acts & Rules",
      date: "2024-01-03"
    }
  ],
  "Education & Learning": [
    {
      id: 7,
      title: "Legal Research Methodology",
      excerpt: "Step-by-step guide to conducting effective legal research",
      author: "Dr. Robert Brown",
      rating: 4.9,
      reviews: 234,
      readTime: "25 min",
      views: "4.2k",
      category: "Education & Learning",
      date: "2024-01-01"
    },
    {
      id: 8,
      title: "Case Law Analysis Techniques",
      excerpt: "Master the art of analyzing and interpreting judicial decisions",
      author: "Prof. Maria Garcia",
      rating: 4.8,
      reviews: 189,
      readTime: "30 min",
      views: "3.8k",
      category: "Education & Learning",
      date: "2023-12-28"
    },
    {
      id: 9,
      title: "Legal Writing Fundamentals",
      excerpt: "Essential skills for drafting clear and persuasive legal documents",
      author: "Dr. Ahmed Hassan",
      rating: 4.7,
      reviews: 167,
      readTime: "28 min",
      views: "3.3k",
      category: "Education & Learning",
      date: "2023-12-25"
    }
  ],
  "Leadership & Strategy": [
    {
      id: 10,
      title: "Legal Department Management",
      excerpt: "Best practices for leading and managing legal teams effectively",
      author: "Jennifer Lee",
      rating: 4.6,
      reviews: 198,
      readTime: "35 min",
      views: "2.9k",
      category: "Leadership & Strategy",
      date: "2023-12-22"
    },
    {
      id: 11,
      title: "Strategic Legal Planning",
      excerpt: "How to develop and implement long-term legal strategies",
      author: "Mark Anderson",
      rating: 4.5,
      reviews: 156,
      readTime: "32 min",
      views: "2.4k",
      category: "Leadership & Strategy",
      date: "2023-12-20"
    },
    {
      id: 12,
      title: "Risk Management in Legal Practice",
      excerpt: "Identifying and mitigating legal risks in business operations",
      author: "Dr. Susan Miller",
      rating: 4.7,
      reviews: 178,
      readTime: "40 min",
      views: "3.1k",
      category: "Leadership & Strategy",
      date: "2023-12-18"
    }
  ]
}

export default function ListPage() {
  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get('category')
  
  // Memoize filtered data to prevent unnecessary re-computations
  const filteredBlogData = React.useMemo(() => {
    if (categoryFilter) {
      const categoryData = blogData[categoryFilter as keyof typeof blogData]
      return categoryData ? { [categoryFilter]: categoryData } : {}
    }
    return blogData
  }, [categoryFilter])

  // Show loading state while data is being processed
  if (!filteredBlogData || Object.keys(filteredBlogData).length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              {categoryFilter ? `${categoryFilter} Blogs` : 'Blog List View'}
            </h1>
            {categoryFilter && (
              <Link 
                href="/list"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Clear Filter
              </Link>
            )}
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Navigation */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category:</h2>
          <div className="flex flex-wrap gap-3">
            <Link 
              href="/list"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                !categoryFilter 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Categories
            </Link>
            {Object.keys(blogData).map((categoryName) => (
              <Link
                key={categoryName}
                href={`/list?category=${encodeURIComponent(categoryName)}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                  categoryFilter === categoryName
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {categoryName}
              </Link>
            ))}
          </div>
        </div>

        {Object.entries(filteredBlogData).map(([category, blogs], categoryIndex) => (
          <div
            key={category}
            className="mb-16"
          >
            {/* Category Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{category}</h2>
              <p className="text-gray-600">{blogs.length} articles</p>
            </div>

            {/* Blogs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, blogIndex) => (
                <article
                  key={blog.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  {/* Image Placeholder */}
                  <div className="aspect-[16/10] bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-white/90 text-gray-800">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-3 line-clamp-2">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                      {blog.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>By {blog.author}</span>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{blog.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{blog.views}</span>
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(blog.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {blog.rating} ({blog.reviews} reviews)
                      </span>
                    </div>

                    {/* Date and CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {new Date(blog.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <Link 
                        href={`/blog/${blog.id}`}
                        className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                      >
                        <Glasses className="h-4 w-4" />
                        <span>Read Now</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
