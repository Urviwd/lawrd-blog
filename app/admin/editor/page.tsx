'use client'

import React, { useState, useRef } from 'react'
import { 
  Save, 
  Eye, 
  Settings, 
  Image, 
  Type, 
  List, 
  Quote, 
  Code, 
  Link as LinkIcon, 
  Bold, 
  Italic, 
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ArrowLeft,
  Plus,
  Trash2
} from 'lucide-react'
import Link from 'next/link'

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
}

const initialBlogPost: BlogPost = {
  title: '',
  excerpt: '',
  content: '',
  category: '',
  tags: [],
  author: '',
  status: 'draft'
}

const categories = [
  'News & Updates',
  'Acts & Rules', 
  'Education & Learning',
  'Leadership & Strategy'
]

export default function BlogEditorPage() {
  const [blogPost, setBlogPost] = useState<BlogPost>(initialBlogPost)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [showSeoSettings, setShowSeoSettings] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleInputChange = <T extends keyof BlogPost>(field: T, value: BlogPost[T]) => {
    setBlogPost(prev => ({ ...prev, [field]: value }))
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

  const insertText = (text: string, tag: string = 'p') => {
    if (contentRef.current) {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const element = document.createElement(tag)
        element.textContent = text
        range.insertNode(element)
        range.collapse(false)
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }
  }

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    contentRef.current?.focus()
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save delay
    setTimeout(() => {
      setIsSaving(false)
      alert('Blog post saved successfully!')
    }, 1000)
  }

  const handlePublish = async () => {
    if (blogPost.title.trim() && blogPost.content.trim()) {
      setIsSaving(true)
      setTimeout(() => {
        setIsSaving(false)
        handleInputChange('status', 'published')
        alert('Blog post published successfully!')
      }, 1000)
    } else {
      alert('Please fill in title and content before publishing.')
    }
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
              <h1 className="text-xl font-bold text-gray-900">Blog Editor</h1>
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
          </div>

          {/* Main Editor */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm">
              {/* Toolbar */}
              <div className="border-b border-gray-200 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Text Formatting */}
                  <div className="flex items-center space-x-1 border-r border-gray-200 pr-3">
                    <button
                      onClick={() => formatText('bold')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-300"
                      title="Bold"
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => formatText('italic')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-300"
                      title="Italic"
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => formatText('underline')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-300"
                      title="Underline"
                    >
                      <Underline className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Alignment */}
                  <div className="flex items-center space-x-1 border-r border-gray-200 pr-3">
                    <button
                      onClick={() => formatText('justifyLeft')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-300"
                      title="Align Left"
                    >
                      <AlignLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => formatText('justifyCenter')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-300"
                      title="Align Center"
                    >
                      <AlignCenter className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => formatText('justifyRight')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-300"
                      title="Align Right"
                    >
                      <AlignRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => formatText('justifyFull')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-300"
                      title="Justify"
                    >
                      <AlignJustify className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Insert Elements */}
                  <div className="flex items-center space-x-1 border-r border-gray-200 pr-3">
                    <button
                      onClick={() => insertText('Heading 1', 'h1')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-300"
                      title="Heading 1"
                    >
                      <Type className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => insertText('• List item', 'li')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-300"
                      title="List"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => insertText('Quote text here...', 'blockquote')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-300"
                      title="Quote"
                    >
                      <Quote className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => insertText('Code snippet here...', 'code')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-300"
                      title="Code"
                    >
                      <Code className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        const url = prompt('Enter URL:')
                        if (url) formatText('createLink', url)
                      }}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-300"
                      title="Insert Link"
                    >
                      <LinkIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Image Insert */}
                  <button
                    onClick={() => setShowImageUpload(!showImageUpload)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-300"
                    title="Insert Image"
                  >
                    <Image className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content Editor */}
              <div className="p-6">
                <div
                  ref={contentRef}
                  contentEditable={!isPreviewMode}
                  suppressContentEditableWarning={true}
                  className={`min-h-[600px] outline-none ${
                    isPreviewMode 
                      ? 'prose prose-lg max-w-none' 
                      : 'border border-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  }`}
                  onInput={(e) => handleInputChange('content', e.currentTarget.innerHTML)}
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />
                
                {!isPreviewMode && !blogPost.content && (
                  <div className="text-gray-400 text-center py-8">
                    <Type className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Start writing your blog post...</p>
                    <p className="text-sm">Use the toolbar above to format your content</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
