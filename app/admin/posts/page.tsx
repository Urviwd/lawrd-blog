'use client'

import React, { useState, useEffect } from 'react'
import { 
  ArrowLeft,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  RefreshCw
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface BlogPost {
  id?: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: string
  status: 'draft' | 'published' | 'review'
  featuredImage?: string
  seoTitle?: string
  seoDescription?: string
  socialMedia?: {
    ogTitle?: string
    ogDescription?: string
    ogImage?: string
    instagramTitle?: string
    instagramDescription?: string
    instagramImage?: string
    whatsappTitle?: string
    whatsappDescription?: string
    whatsappImage?: string
  }
  createdAt?: string
  updatedAt?: string
}

const STORAGE_KEY = 'blog_posts'

const getPostsFromStorage = (): BlogPost[] => {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading posts from storage:', error)
    return []
  }
}

const deletePostFromStorage = (id: string): void => {
  if (typeof window === 'undefined') return
  try {
    const posts = getPostsFromStorage()
    const filtered = posts.filter(p => p.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error('Error deleting post from storage:', error)
  }
}

export default function ManagePostsPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published' | 'review'>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    loadPosts()
  }, [])

  useEffect(() => {
    if (isMounted) {
      filterPosts()
    }
  }, [posts, searchQuery, statusFilter, categoryFilter, isMounted])

  const loadPosts = () => {
    if (typeof window === 'undefined') return
    try {
      const allPosts = getPostsFromStorage()
      // Filter out any invalid posts (must have at least a title or id)
      const validPosts = allPosts.filter(post => post && (post.id || post.title))
      // Sort by updatedAt or createdAt, most recent first
      const sorted = validPosts.sort((a, b) => {
        const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime()
        const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime()
        return dateB - dateA
      })
      setPosts(sorted)
    } catch (error) {
      console.error('Error loading posts:', error)
      setPosts([])
    }
  }

  const filterPosts = () => {
    let filtered = [...posts]

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(post => post.status === statusFilter)
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(post => post.category === categoryFilter)
    }

    setFilteredPosts(filtered)
  }

  const handleDelete = (id: string) => {
    if (showDeleteConfirm === id) {
      deletePostFromStorage(id)
      loadPosts()
      setShowDeleteConfirm(null)
    } else {
      setShowDeleteConfirm(id)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="w-4 h-4" />
      case 'draft':
        return <Clock className="w-4 h-4" />
      case 'review':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const categories = ['News & Updates', 'Acts & Rules', 'Education & Learning', 'Leadership & Strategy']
  const uniqueCategories = Array.from(new Set([...categories, ...posts.map(p => p.category).filter(Boolean)]))

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return 'N/A'
    }
  }

  // Show loading state until component is mounted
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin"
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="w-px h-6 bg-gray-300"></div>
              <h1 className="text-xl font-bold text-gray-900">Manage Posts</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={loadPosts}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-300"
                title="Refresh posts list"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <Link
                href="/admin/editor"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
              >
                <Plus className="w-4 h-4" />
                <span>New Post</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="review">Review</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Categories</option>
                {uniqueCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Total Posts: <strong className="text-gray-900">{posts.length}</strong></span>
              <span>Filtered Results: <strong className="text-gray-900">{filteredPosts.length}</strong></span>
            </div>
          </div>
        </div>

        {/* Posts List */}
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {posts.length === 0 ? 'No posts yet' : 'No posts match your filters'}
            </h3>
            <p className="text-gray-600 mb-6">
              {posts.length === 0 
                ? 'Get started by creating your first blog post!' 
                : 'Try adjusting your search or filter criteria'}
            </p>
            {posts.length === 0 && (
              <Link
                href="/admin/editor"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
              >
                <Plus className="w-4 h-4" />
                <span>Create First Post</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(post.status)}`}>
                        {getStatusIcon(post.status)}
                        <span className="capitalize">{post.status}</span>
                      </span>
                      {post.category && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {post.title || 'Untitled Post'}
                    </h3>
                    
                    {post.excerpt && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <span>Author: <strong className="text-gray-700">{post.author || 'Unknown'}</strong></span>
                      {post.createdAt && (
                        <span>Created: {formatDate(post.createdAt)}</span>
                      )}
                      {post.updatedAt && (
                        <span>Updated: {formatDate(post.updatedAt)}</span>
                      )}
                      {post.tags.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <span>Tags:</span>
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="text-gray-400">+{post.tags.length - 3} more</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {post.id && (
                      <>
                        <Link
                          href={`/blog/${post.id}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-300"
                          title="View Post"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                        <Link
                          href={`/admin/editor?id=${post.id}`}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-300"
                          title="Edit Post"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id!)}
                          className={`p-2 rounded-lg transition-colors duration-300 ${
                            showDeleteConfirm === post.id
                              ? 'bg-red-600 text-white hover:bg-red-700'
                              : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                          }`}
                          title={showDeleteConfirm === post.id ? 'Confirm Delete' : 'Delete Post'}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {showDeleteConfirm === post.id && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800 mb-2">
                      Are you sure you want to delete this post? This action cannot be undone.
                    </p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDelete(post.id!)}
                        className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors duration-300"
                      >
                        Confirm Delete
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

