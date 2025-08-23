'use client'

import React, { useState } from 'react'
import { Bell, Mail, CheckCircle, AlertCircle } from 'lucide-react'

interface SubscriberSignupProps {
  className?: string
}

export default function SubscriberSignup({ className = '' }: SubscriberSignupProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const categories = [
    'News & Updates',
    'Acts & Rules',
    'Education & Learning',
    'Leadership & Strategy'
  ]

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim() || !name.trim()) {
      setError('Please fill in all required fields.')
      return
    }

    if (selectedCategories.length === 0) {
      setError('Please select at least one category.')
      return
    }

    setIsSubmitting(true)
    setError('')

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setEmail('')
      setName('')
      setSelectedCategories([])
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    }, 1500)
  }

  if (isSuccess) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-xl p-6 text-center ${className}`}>
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-900 mb-2">Successfully Subscribed!</h3>
        <p className="text-green-700">
          Thank you for subscribing to our blog notifications. You'll receive updates about new posts and important announcements.
        </p>
      </div>
    )
  }

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 ${className}`}>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bell className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h2>
        <p className="text-gray-600">
          Subscribe to get notified about new blog posts, legal updates, and important announcements
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Categories of Interest *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors duration-300"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">{category}</span>
              </label>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Select at least one category to receive relevant notifications
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Subscribing...
            </div>
          ) : (
            <>
              <Bell className="w-5 h-5 inline mr-2" />
              Subscribe to Notifications
            </>
          )}
        </button>

        {/* Privacy Notice */}
        <p className="text-xs text-gray-500 text-center">
          By subscribing, you agree to receive email notifications from us. 
          You can unsubscribe at any time. We respect your privacy and will never share your information.
        </p>
      </form>

      {/* Benefits */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">What You'll Get</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Instant Notifications</h4>
            <p className="text-sm text-gray-600">Get notified as soon as new content is published</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Curated Content</h4>
            <p className="text-sm text-gray-600">Receive updates only for topics you're interested in</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Weekly Digest</h4>
            <p className="text-sm text-gray-600">Get a summary of the week's most important posts</p>
          </div>
        </div>
      </div>
    </div>
  )
}
