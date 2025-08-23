'use client'

import React, { useState } from 'react'
import { ArrowLeft, Clock, Eye, Star, Share2, MessageCircle, Bookmark, ThumbsUp, ThumbsDown } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Image from 'next/image'

// Blog post interface
interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  authorTitle: string
  authorAvatar: string
  rating: number
  reviews: number
  readTime: string
  views: string
  category: string
  date: string
  featuredImage: string
  imageCaption: string
  tags: string[]
  relatedPosts: Array<{ id: number; title: string; category: string }>
}

// Sample blog data - in a real app, this would come from an API or database
const blogData: Record<string, BlogPost> = {
  1: {
    id: 1,
    title: "Supreme Court Ruling on Digital Privacy Rights",
    excerpt: "Landmark decision sets new precedent for data protection in the digital age",
    content: `
      <p class="mb-6 text-lg leading-relaxed text-gray-700">
        In a landmark decision that will reshape the landscape of digital privacy law, the Supreme Court has issued a comprehensive ruling on the intersection of technology and constitutional rights. This decision, which comes after years of legal debate and technological advancement, establishes new precedents that will guide future cases involving digital privacy.
      </p>
      
      <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">The Case Background</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">
        The case originated from a challenge to a state law that required technology companies to provide law enforcement with access to encrypted user data. The plaintiffs argued that such requirements violated the Fourth Amendment's protection against unreasonable searches and seizures, as well as the First Amendment's protection of free speech.
      </p>
      
      <p class="mb-6 text-gray-700 leading-relaxed">
        The lower courts were divided on the issue, with some finding that the law was constitutional under the "special needs" exception to the warrant requirement, while others held that it violated fundamental privacy rights. This split in authority made the Supreme Court's decision particularly significant.
      </p>
      
      <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Key Legal Principles Established</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">
        The Court's majority opinion, written by Chief Justice Roberts, established several key principles that will guide future digital privacy cases:
      </p>
      
      <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li><strong>Digital Footprint as Protected Information:</strong> The Court held that an individual's digital footprint, including browsing history, location data, and communication patterns, constitutes protected information under the Fourth Amendment.</li>
        <li><strong>Warrant Requirement:</strong> Law enforcement must obtain a warrant based on probable cause before accessing such digital information, unless a specific exception applies.</li>
        <li><strong>Third-Party Doctrine Limitations:</strong> The Court significantly limited the "third-party doctrine," which had previously allowed warrantless access to information shared with third parties like technology companies.</li>
        <li><strong>Technological Neutrality:</strong> Privacy protections apply regardless of the technology used to collect or store information.</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Implications for Technology Companies</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">
        This ruling has immediate and far-reaching implications for technology companies. They are now required to:
      </p>
      
      <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Implement stronger encryption and security measures to protect user data</li>
        <li>Establish clear policies for responding to law enforcement requests</li>
        <li>Ensure that any data sharing complies with the new warrant requirements</li>
        <li>Develop systems for verifying the validity of law enforcement requests</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Impact on Law Enforcement</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">
        Law enforcement agencies will need to adapt their investigative techniques to comply with the new requirements. This includes:
      </p>
      
      <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Developing more sophisticated methods for establishing probable cause in digital investigations</li>
        <li>Training officers on the new legal standards</li>
        <li>Establishing protocols for obtaining warrants in digital cases</li>
        <li>Working with technology companies to develop lawful access methods</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Future Implications</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">
        This decision is likely to influence future cases involving emerging technologies such as artificial intelligence, biometric data, and the Internet of Things. The Court's emphasis on technological neutrality suggests that the principles established here will apply to new technologies as they develop.
      </p>
      
      <p class="mb-6 text-gray-700 leading-relaxed">
        Legal scholars predict that this ruling will lead to increased litigation as law enforcement and technology companies navigate the new legal landscape. Additionally, Congress may be prompted to pass legislation that provides more specific guidance on digital privacy issues.
      </p>
      
      <h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">Conclusion</h2>
      <p class="mb-6 text-gray-700 leading-relaxed">
        The Supreme Court's decision represents a significant step forward in protecting digital privacy rights while maintaining the ability of law enforcement to investigate crimes effectively. By establishing clear legal standards, the Court has provided much-needed guidance for an area of law that has been rapidly evolving.
      </p>
      
      <p class="mb-6 text-gray-700 leading-relaxed">
        As technology continues to advance, this ruling will serve as a foundation for future decisions that balance individual privacy rights with societal needs for security and law enforcement. The legal community will be watching closely to see how these principles are applied in practice and how they influence the development of new technologies and legal frameworks.
      </p>
    `,
    author: "Sarah Johnson",
    authorTitle: "Senior Legal Analyst",
    authorAvatar: "/api/placeholder/60/60",
    rating: 4.9,
    reviews: 127,
    readTime: "8 min",
    views: "2.4k",
    category: "News & Updates",
    date: "2024-01-15",
    featuredImage: "/api/placeholder/1200/600",
    imageCaption: "Supreme Court building representing justice and constitutional rights",
    tags: ["Digital Privacy", "Supreme Court", "Fourth Amendment", "Technology Law"],
    relatedPosts: [
      { id: 2, title: "New Environmental Protection Regulations", category: "News & Updates" },
      { id: 4, title: "Understanding the Right to Information Act", category: "Acts & Rules" },
      { id: 7, title: "Legal Research Methodology", category: "Education & Learning" }
    ]
  },
  2: {
    id: 2,
    title: "New Environmental Protection Regulations",
    excerpt: "Comprehensive overview of the latest environmental laws and their implications",
    content: `<p>Environmental protection content here...</p>`,
    author: "Michael Chen",
    authorTitle: "Environmental Law Specialist",
    authorAvatar: "/api/placeholder/60/60",
    rating: 4.7,
    reviews: 89,
    readTime: "12 min",
    views: "1.8k",
    category: "News & Updates",
    date: "2024-01-12",
    featuredImage: "/api/placeholder/1200/600",
    imageCaption: "Green landscape representing environmental protection and sustainability",
    tags: ["Environmental Law", "Regulations", "Sustainability", "Climate Change"],
    relatedPosts: [
      { id: 1, title: "Supreme Court Ruling on Digital Privacy Rights", category: "News & Updates" },
      { id: 3, title: "Corporate Law Amendments 2024", category: "News & Updates" }
    ]
  },
  3: {
    id: 3,
    title: "Corporate Law Amendments 2024",
    excerpt: "Key changes in corporate governance and compliance requirements",
    content: `<p>Corporate law content here...</p>`,
    author: "Emma Rodriguez",
    authorTitle: "Corporate Law Expert",
    authorAvatar: "/api/placeholder/60/60",
    rating: 4.8,
    reviews: 156,
    readTime: "15 min",
    views: "3.1k",
    category: "News & Updates",
    date: "2024-01-10",
    featuredImage: "/api/placeholder/1200/600",
    imageCaption: "Modern corporate building representing business law and governance",
    tags: ["Corporate Law", "Governance", "Compliance", "Business"],
    relatedPosts: [
      { id: 1, title: "Supreme Court Ruling on Digital Privacy Rights", category: "News & Updates" },
      { id: 2, title: "New Environmental Protection Regulations", category: "News & Updates" }
    ]
  }
}

export default function BlogPage() {
  const params = useParams()
  const blogId = params.id as string
  const blog = blogData[blogId as keyof typeof blogData]
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog?.title,
    "description": blog?.excerpt,
    "image": blog?.featuredImage,
    "author": {
      "@type": "Person",
      "name": blog?.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "CoddessCookie",
      "logo": {
        "@type": "ImageObject",
        "url": "/logo.png"
      }
    },
    "datePublished": blog?.date,
    "dateModified": blog?.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `/blog/${blogId}`
    },
    "articleSection": blog?.category,
    "keywords": blog?.tags?.join(", ")
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
          <Link href="/list" className="text-blue-600 hover:text-blue-800">
            Back to Blog List
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/list"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to List</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {blog.category}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(blog.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>
      </header>
      {/* Featured Image Section */}
      <div className="mb-8">
        <div className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden shadow-lg" role="img" aria-label={`Featured image for ${blog.title}`}>
          {/* Featured Image */}
          <Image
            src={blog.featuredImage || '/api/placeholder/1200/600'}
            alt={`Featured image for ${blog.title} - ${blog.imageCaption || 'Blog post image'}`}
            fill
            className={`object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
          
          {/* Loading State */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="text-gray-500">Loading image...</div>
            </div>
          )}
          
          {/* Error State */}
          {imageError && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">📷</div>
                <div>Image not available</div>
              </div>
            </div>
          )}
          
          {/* Image Overlay with Category Badge */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-6 left-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-gray-800 backdrop-blur-sm">
              {blog.category}
            </span>
          </div>
          
          {/* Image Attribution */}
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-sm opacity-90">Photo by {blog.author}</p>
          </div>
        </div>
        
        {/* Image Caption and Credits */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {blog.imageCaption || `Featured image for "${blog.title}"`}
          </p>
        </div>
      </div>

      {/* Main Content - 2 Columns */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Column 1: Blog Content (60%) */}
          <div className="lg:col-span-3">
            <div
              className="bg-white rounded-xl shadow-lg p-8"
            >
              {/* Blog Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {blog.title}
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  {blog.excerpt}
                </p>
                
                {/* Author Info */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {blog.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{blog.author}</p>
                    <p className="text-sm text-gray-600">{blog.authorTitle}</p>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex items-center space-x-6 text-sm text-gray-500 border-t border-gray-200 pt-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{blog.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>{blog.views}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{blog.rating} ({blog.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Blog Content */}
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Insta View (40%) */}
          <div className="lg:col-span-2">
            <div
              className="space-y-6"
            >
              {/* Instagram Feed Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">@coddesscookie</h3>
                      <p className="text-xs text-gray-600">Follow us on Instagram</p>
                    </div>
                  </div>
                  <a 
                    href="https://instagram.com/coddesscookie" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 text-sm"
                  >
                    <span>Follow</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                {/* Instagram Posts Grid - Vertical Layout */}
                <div className="space-y-3">
                  {/* Post 1 */}
                  <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300 cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg relative overflow-hidden flex-shrink-0">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">Cookie Delight</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span>2.1k</span>
                      </div>
                    </div>
                  </div>

                  {/* Post 2 */}
                  <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300 cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-teal-200 rounded-lg relative overflow-hidden flex-shrink-0">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">Sweet Treats</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span>1.8k</span>
                      </div>
                    </div>
                  </div>

                  {/* Post 3 */}
                  <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300 cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-lg relative overflow-hidden flex-shrink-0">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">Baking Time</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span>3.2k</span>
                      </div>
                    </div>
                  </div>

                  {/* Post 4 */}
                  <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300 cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-200 to-emerald-200 rounded-lg relative overflow-hidden flex-shrink-0">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">Fresh Bakes</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span>1.5k</span>
                      </div>
                    </div>
                  </div>

                  {/* Post 5 */}
                  <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300 cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg relative overflow-hidden flex-shrink-0">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">Dessert Magic</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span>2.7k</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* View All Link */}
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <a 
                    href="https://instagram.com/coddesscookie" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium block text-center"
                  >
                    View All Posts →
                  </a>
                </div>
              </div>
                  {/* add social media icons here */}
              {/* Author Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Author</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {blog.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{blog.author}</p>
                    <p className="text-sm text-gray-600">{blog.authorTitle}</p>
                    <p className="text-sm text-gray-500 mt-1">Expert in Constitutional Law</p>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Posts</h3>
                <div className="space-y-3">
                  {blog.relatedPosts.map((post: { id: number; title: string; category: string }) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.id}`}
                      className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                    >
                      <p className="font-medium text-gray-900 text-sm">{post.title}</p>
                      <p className="text-xs text-gray-500">{post.category}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Article Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{blog.views}</p>
                    <p className="text-sm text-gray-600">Views</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{blog.reviews}</p>
                    <p className="text-sm text-gray-600">Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Bottom Row: Share Content and Rate Content Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Share Content Area */}
          <div
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Share This Article</h3>
            <div className="space-y-4">
              
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-300">
                  <MessageCircle className="h-4 w-4" />
                  <span>Copy Link</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-300">
                  <Bookmark className="h-4 w-4" />
                  <span>Bookmark</span>
                </button>
              </div>
              {/* Social Media Sharing Icons */}
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-2">
                  {/* Facebook */}
                  <button 
                    onClick={() => {
                      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(blog.title)}`;
                      window.open(url, '_blank', 'width=600,height=400');
                    }}
                    className="flex flex-col items-center justify-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 group"
                  >
                    <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="text-xs">Facebook</span>
                  </button>

                  {/* Twitter/X */}
                  <button 
                    onClick={() => {
                      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`;
                      window.open(url, '_blank', 'width=600,height=400');
                    }}
                    className="flex flex-col items-center justify-center p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 group"
                  >
                    <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span className="text-xs">Twitter</span>
                  </button>

                  {/* LinkedIn */}
                  <button 
                    onClick={() => {
                      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
                      window.open(url, '_blank', 'width=600,height=400');
                    }}
                    className="flex flex-col items-center justify-center p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300 group"
                  >
                    <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="text-xs">LinkedIn</span>
                  </button>

                  {/* WhatsApp */}
                  <button 
                    onClick={() => {
                      const url = `https://wa.me/?text=${encodeURIComponent(blog.title + ' ' + window.location.href)}`;
                      window.open(url, '_blank');
                    }}
                    className="flex flex-col items-center justify-center p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 group"
                  >
                    <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span className="text-xs">WhatsApp</span>
                  </button>
                </div>

                {/* Additional Social Platforms */}
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {/* Reddit */}
                  <button 
                    onClick={() => {
                      const url = `https://reddit.com/submit?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blog.title)}`;
                      window.open(url, '_blank', 'width=600,height=400');
                    }}
                    className="flex items-center justify-center space-x-2 p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-300 text-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.5 3.5c-.687 0-1.249.561-1.249 1.249 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.248 0-.687-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.249.561-1.249 1.249 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.248 0-.687-.562-1.249-1.25-1.249z"/>
                    </svg>
                    <span>Reddit</span>
                  </button>

                  {/* Telegram */}
                  <button 
                    onClick={() => {
                      const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`;
                      window.open(url, '_blank');
                    }}
                    className="flex items-center justify-center space-x-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    <span>Telegram</span>
                  </button>

                  {/* Email */}
                  <button 
                    onClick={() => {
                      const subject = encodeURIComponent(blog.title);
                      const body = encodeURIComponent(`Check out this article: ${blog.title}\n\n${blog.excerpt}\n\nRead more at: ${window.location.href}`);
                      const url = `mailto:?subject=${subject}&body=${body}`;
                      window.location.href = url;
                    }}
                    className="flex items-center justify-center space-x-2 p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 text-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M0 3v18h24V3H0zm21.518 2L12 12.713 2.482 5h19.036zM2 19V7.183l10 8.104 10-8.104V19H2z"/>
                    </svg>
                    <span>Email</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Rate Content Area */}
          <div
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Rate This Article</h3>
            <div className="space-y-4">
              {/* Current Rating Display */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < Math.floor(blog.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  Current Rating: {blog.rating}/5 ({blog.reviews} reviews)
                </p>
              </div>

              {/* Rating Actions */}
              <div className="flex items-center justify-center space-x-4">
                <button className="flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors duration-300">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Helpful</span>
                </button>
                <button className="flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors duration-300">
                  <ThumbsDown className="h-4 w-4" />
                  <span>Not Helpful</span>
                </button>
              </div>

              {/* Write Review Button */}
              <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </main>
      </div>
    </>
  )
}
