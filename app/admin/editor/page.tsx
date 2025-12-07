'use client'

import React, { useState, useEffect } from 'react'
import { 
  Save, 
  Eye, 
  Settings, 
  Image, 
  Type, 
  ArrowLeft,
  Plus,
  Trash2,
  Instagram,
  MessageCircle,
  Link as LinkIcon
} from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import RichTextEditor from '@/src/components/RichTextEditor'

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

const initialBlogPost: BlogPost = {
  title: '',
  excerpt: '',
  content: '',
  category: '',
  tags: [],
  author: '',
  status: 'draft',
  socialMedia: {
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    instagramTitle: '',
    instagramDescription: '',
    instagramImage: '',
    whatsappTitle: '',
    whatsappDescription: '',
    whatsappImage: ''
  }
}

const categories = [
  'News & Updates',
  'Acts & Rules', 
  'Education & Learning',
  'Leadership & Strategy'
]

// LocalStorage utility functions
const STORAGE_KEY = 'blog_posts'

// Strip bidi control characters that can cause reversed text
const stripBidi = (html: string): string => {
  if (!html) return ''
  // Remove RTL/LTR override characters: U+202A-U+202E, U+200E, U+200F
  return html.replace(/[\u202A-\u202E\u200E\u200F]/g, '')
}

const getPostsFromStorage = (): BlogPost[] => {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const posts: BlogPost[] = JSON.parse(stored)
    // Clean content to remove any bidi control characters
    return posts.map(p => ({
      ...p,
      content: p.content ? stripBidi(p.content) : ''
    }))
  } catch (error) {
    console.error('Error loading posts from storage:', error)
    return []
  }
}

const savePostToStorage = (post: BlogPost): void => {
  if (typeof window === 'undefined') return
  try {
    // Sanitize content before saving to prevent bidi characters
    const sanitizedPost = {
      ...post,
      content: post.content ? stripBidi(post.content) : ''
    }
    
    const posts = getPostsFromStorage()
    const existingIndex = posts.findIndex(p => p.id === sanitizedPost.id)
    
    if (existingIndex >= 0) {
      posts[existingIndex] = sanitizedPost
    } else {
      // New post - generate ID if not present
      if (!sanitizedPost.id) {
        sanitizedPost.id = `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }
      posts.push(sanitizedPost)
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  } catch (error) {
    console.error('Error saving post to storage:', error)
  }
}

const getPostById = (id: string): BlogPost | null => {
  const posts = getPostsFromStorage()
  return posts.find(p => p.id === id) || null
}

export default function BlogEditorPage() {
  const searchParams = useSearchParams()
  const postId = searchParams.get('id')
  const [blogPost, setBlogPost] = useState<BlogPost>(initialBlogPost)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [showSeoSettings, setShowSeoSettings] = useState(false)
  const [showSocialMediaSettings, setShowSocialMediaSettings] = useState(false)
  const [isLoading, setIsLoading] = useState(!!postId)

  // Load existing post if ID is provided
  useEffect(() => {
    if (postId) {
      setIsLoading(true)
      const existingPost = getPostById(postId)
      if (existingPost) {
        // Ensure socialMedia object exists with all fields, preserving existing values
        // Also clean content of any bidi characters
        const postWithSocialMedia: BlogPost = {
          ...existingPost,
          content: existingPost.content ? stripBidi(existingPost.content) : '',
          socialMedia: {
            ogTitle: existingPost.socialMedia?.ogTitle || '',
            ogDescription: existingPost.socialMedia?.ogDescription || '',
            ogImage: existingPost.socialMedia?.ogImage || '',
            instagramTitle: existingPost.socialMedia?.instagramTitle || '',
            instagramDescription: existingPost.socialMedia?.instagramDescription || '',
            instagramImage: existingPost.socialMedia?.instagramImage || '',
            whatsappTitle: existingPost.socialMedia?.whatsappTitle || '',
            whatsappDescription: existingPost.socialMedia?.whatsappDescription || '',
            whatsappImage: existingPost.socialMedia?.whatsappImage || ''
          }
        }
        setBlogPost(postWithSocialMedia)
      } else {
        alert('Post not found!')
        window.location.href = '/admin/editor'
      }
      setIsLoading(false)
    }
  }, [postId])

  // Force document-level LTR on mount
  useEffect(() => {
    // Set document direction
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', 'ltr')
      document.documentElement.setAttribute('lang', 'en')
      document.documentElement.style.direction = 'ltr'
      if (document.body) {
        document.body.setAttribute('dir', 'ltr')
        document.body.style.direction = 'ltr'
      }
    }
  }, [])

  const handleInputChange = <T extends keyof BlogPost>(field: T, value: BlogPost[T]) => {
    setBlogPost(prev => ({ ...prev, [field]: value }))
  }

  const handleSocialMediaChange = (field: keyof NonNullable<BlogPost['socialMedia']>, value: string) => {
    setBlogPost(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [field]: value
      }
    }))
  }

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      e.preventDefault()
      const newTag = e.currentTarget.value.trim()
      if (!blogPost.tags.includes(newTag)) {
        handleInputChange('tags', [...blogPost.tags, newTag])
        e.currentTarget.value = ''
      }
    }
  }

  const removeTag = (tagToRemove: string) => {
    handleInputChange('tags', blogPost.tags.filter(tag => tag !== tagToRemove))
  }

  const handleSave = async () => {
    if (!blogPost.title.trim()) {
      alert('Please enter a title before saving.')
      return
    }

    setIsSaving(true)
    try {
      // Ensure socialMedia object is properly structured
      const socialMedia = {
        ogTitle: blogPost.socialMedia?.ogTitle || '',
        ogDescription: blogPost.socialMedia?.ogDescription || '',
        ogImage: blogPost.socialMedia?.ogImage || '',
        instagramTitle: blogPost.socialMedia?.instagramTitle || '',
        instagramDescription: blogPost.socialMedia?.instagramDescription || '',
        instagramImage: blogPost.socialMedia?.instagramImage || '',
        whatsappTitle: blogPost.socialMedia?.whatsappTitle || '',
        whatsappDescription: blogPost.socialMedia?.whatsappDescription || '',
        whatsappImage: blogPost.socialMedia?.whatsappImage || ''
      }

      // Generate ID if new post
      const postToSave: BlogPost = {
        ...blogPost,
        socialMedia,
        id: blogPost.id || `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        updatedAt: new Date().toISOString(),
        createdAt: blogPost.id ? (blogPost as any).createdAt : new Date().toISOString()
      }
      
      savePostToStorage(postToSave)
      
      // Update local state with saved post
      setBlogPost(postToSave)
      
      setTimeout(() => {
        setIsSaving(false)
        alert('Blog post saved successfully!')
      }, 500)
    } catch (error) {
      console.error('Error saving post:', error)
      setIsSaving(false)
      alert('Error saving post. Please try again.')
    }
  }

  const handlePublish = async () => {
    if (!blogPost.title.trim() || !blogPost.content.trim()) {
      alert('Please fill in title and content before publishing.')
      return
    }

    setIsSaving(true)
    try {
      // Ensure socialMedia object is properly structured
      const socialMedia = {
        ogTitle: blogPost.socialMedia?.ogTitle || '',
        ogDescription: blogPost.socialMedia?.ogDescription || '',
        ogImage: blogPost.socialMedia?.ogImage || '',
        instagramTitle: blogPost.socialMedia?.instagramTitle || '',
        instagramDescription: blogPost.socialMedia?.instagramDescription || '',
        instagramImage: blogPost.socialMedia?.instagramImage || '',
        whatsappTitle: blogPost.socialMedia?.whatsappTitle || '',
        whatsappDescription: blogPost.socialMedia?.whatsappDescription || '',
        whatsappImage: blogPost.socialMedia?.whatsappImage || ''
      }

      const postToSave: BlogPost = {
        ...blogPost,
        socialMedia,
        status: 'published',
        id: blogPost.id || `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        updatedAt: new Date().toISOString(),
        createdAt: blogPost.id ? (blogPost as any).createdAt : new Date().toISOString()
      }
      
      savePostToStorage(postToSave)
      setBlogPost(postToSave)
      
      setTimeout(() => {
        setIsSaving(false)
        alert('Blog post published successfully!')
      }, 500)
    } catch (error) {
      console.error('Error publishing post:', error)
      setIsSaving(false)
      alert('Error publishing post. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-gray-50" dir="ltr" style={{ direction: 'ltr' }}>
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
              <h1 className="text-xl font-bold text-gray-900">
                {postId ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  isPreviewMode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Eye className="w-4 h-4 inline mr-2" />
                {isPreviewMode ? 'Edit Mode' : 'Preview'}
              </button>
              
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-300 disabled:opacity-50"
              >
                <Save className="w-4 h-4 inline mr-2" />
                {isSaving ? 'Saving...' : 'Save Draft'}
              </button>
              
              <button
                onClick={handlePublish}
                disabled={isSaving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Publish
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Editor Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={blogPost.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter blog title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                  <textarea
                    value={blogPost.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of the blog..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={blogPost.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select category...</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    value={blogPost.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Author name..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <input
                    type="text"
                    onKeyDown={handleTagInput}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Press Enter to add tags..."
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {blogPost.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={blogPost.status}
                    onChange={(e) => handleInputChange('status', e.target.value as 'draft' | 'published' | 'review')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="review">Review</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">SEO Settings</h3>
                <button
                  onClick={() => setShowSeoSettings(!showSeoSettings)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
              
              {showSeoSettings && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SEO Title</label>
                    <input
                      type="text"
                      value={blogPost.seoTitle || ''}
                      onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="SEO optimized title..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SEO Description</label>
                    <textarea
                      value={blogPost.seoDescription || ''}
                      onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Meta description for search engines..."
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Featured Image</h3>
                <button
                  onClick={() => setShowImageUpload(!showImageUpload)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Image className="w-4 h-4" />
                </button>
              </div>
              
              {showImageUpload && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Drop image here or click to upload</p>
                    <input type="file" accept="image/*" className="hidden" />
                  </div>
                </div>
              )}
            </div>

            {/* Social Media SEO Settings */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Social Media Sharing</h3>
                <button
                  onClick={() => setShowSocialMediaSettings(!showSocialMediaSettings)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
              
              {showSocialMediaSettings && (
                <div className="space-y-6">
                  {/* Open Graph (General) */}
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">Open Graph (General)</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">OG Title</label>
                        <input
                          type="text"
                          value={blogPost.socialMedia?.ogTitle || ''}
                          onChange={(e) => handleSocialMediaChange('ogTitle', e.target.value)}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={blogPost.title || 'OG Title...'}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">OG Description</label>
                        <textarea
                          value={blogPost.socialMedia?.ogDescription || ''}
                          onChange={(e) => handleSocialMediaChange('ogDescription', e.target.value)}
                          rows={2}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={blogPost.excerpt || 'OG Description...'}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">OG Image URL</label>
                        <input
                          type="text"
                          value={blogPost.socialMedia?.ogImage || ''}
                          onChange={(e) => handleSocialMediaChange('ogImage', e.target.value)}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Instagram className="w-4 h-4 text-pink-600" />
                      <h4 className="text-sm font-semibold text-gray-800">Instagram</h4>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Instagram Title</label>
                        <input
                          type="text"
                          value={blogPost.socialMedia?.instagramTitle || ''}
                          onChange={(e) => handleSocialMediaChange('instagramTitle', e.target.value)}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={blogPost.title || 'Instagram Title...'}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Instagram Description</label>
                        <textarea
                          value={blogPost.socialMedia?.instagramDescription || ''}
                          onChange={(e) => handleSocialMediaChange('instagramDescription', e.target.value)}
                          rows={2}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={blogPost.excerpt || 'Instagram Description...'}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Instagram Image URL</label>
                        <input
                          type="text"
                          value={blogPost.socialMedia?.instagramImage || ''}
                          onChange={(e) => handleSocialMediaChange('instagramImage', e.target.value)}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://example.com/instagram-image.jpg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <MessageCircle className="w-4 h-4 text-green-600" />
                      <h4 className="text-sm font-semibold text-gray-800">WhatsApp</h4>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">WhatsApp Title</label>
                        <input
                          type="text"
                          value={blogPost.socialMedia?.whatsappTitle || ''}
                          onChange={(e) => handleSocialMediaChange('whatsappTitle', e.target.value)}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={blogPost.title || 'WhatsApp Title...'}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">WhatsApp Description</label>
                        <textarea
                          value={blogPost.socialMedia?.whatsappDescription || ''}
                          onChange={(e) => handleSocialMediaChange('whatsappDescription', e.target.value)}
                          rows={2}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={blogPost.excerpt || 'WhatsApp Description...'}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">WhatsApp Image URL</label>
                        <input
                          type="text"
                          value={blogPost.socialMedia?.whatsappImage || ''}
                          onChange={(e) => handleSocialMediaChange('whatsappImage', e.target.value)}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://example.com/whatsapp-image.jpg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Content</h3>
              <RichTextEditor
                content={blogPost.content}
                onChange={(content: string) => handleInputChange('content', content)}
                placeholder="Start writing your blog post..."
              />
            </div>

            {/* Social Media Preview */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-900">Social Media Preview</h3>
                <p className="text-sm text-gray-600 mt-1">See how your post will appear when shared</p>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Instagram Preview */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Instagram className="w-5 h-5 text-pink-600" />
                    <h4 className="text-sm font-semibold text-gray-800">Instagram Preview</h4>
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-1">
                      <div className="bg-white rounded-t-lg">
                        {blogPost.socialMedia?.instagramImage || blogPost.featuredImage ? (
                          <img
                            src={blogPost.socialMedia?.instagramImage || blogPost.featuredImage || ''}
                            alt="Instagram preview"
                            className="w-full h-64 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none'
                            }}
                          />
                        ) : (
                          <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                            <Image className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                        <div className="p-4">
                          <h5 className="font-semibold text-gray-900 mb-2">
                            {blogPost.socialMedia?.instagramTitle || blogPost.title || 'Post Title'}
                          </h5>
                          <p className="text-sm text-gray-600 line-clamp-3">
                            {blogPost.socialMedia?.instagramDescription || blogPost.excerpt || 'Post description will appear here...'}
                          </p>
                          <div className="mt-3 flex items-center space-x-2 text-xs text-gray-500">
                            <span>❤️ 0</span>
                            <span>💬 0</span>
                            <span>📤 0</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Preview */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    <h4 className="text-sm font-semibold text-gray-800">WhatsApp Preview</h4>
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                    <div className="bg-green-600 p-3">
                      <div className="flex items-center space-x-2 text-white">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                          <MessageCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">WhatsApp</p>
                          <p className="text-xs opacity-90">Link Preview</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white border-t border-gray-200">
                      {blogPost.socialMedia?.whatsappImage || blogPost.featuredImage ? (
                        <img
                          src={blogPost.socialMedia?.whatsappImage || blogPost.featuredImage || ''}
                          alt="WhatsApp preview"
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none'
                          }}
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                          <Image className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <div className="p-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">example.com</p>
                        <h5 className="font-semibold text-gray-900 mb-1 text-sm">
                          {blogPost.socialMedia?.whatsappTitle || blogPost.title || 'Post Title'}
                        </h5>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {blogPost.socialMedia?.whatsappDescription || blogPost.excerpt || 'Post description will appear here...'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Open Graph Preview (Facebook/Twitter style) */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <LinkIcon className="w-5 h-5 text-blue-600" />
                    <h4 className="text-sm font-semibold text-gray-800">Open Graph Preview</h4>
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                    {blogPost.socialMedia?.ogImage || blogPost.featuredImage ? (
                      <img
                        src={blogPost.socialMedia?.ogImage || blogPost.featuredImage || ''}
                        alt="OG preview"
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                        <Image className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    <div className="p-4">
                      <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">example.com</p>
                      <h5 className="font-bold text-gray-900 mb-2 text-base">
                        {blogPost.socialMedia?.ogTitle || blogPost.title || 'Post Title'}
                      </h5>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {blogPost.socialMedia?.ogDescription || blogPost.excerpt || 'Post description will appear here...'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
