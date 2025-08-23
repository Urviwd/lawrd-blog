'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Star, Users } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-white to-green-600 py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/30 via-white/20 to-green-600/30"></div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex justify-center space-x-8 text-gray-800"
          >
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">10K+ Readers</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span className="text-sm font-medium">50+ Articles</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span className="text-sm font-medium">4.9/5 Rating</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-black-600 sm:text-5xl lg:text-6xl"
          >
            Know the law.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-600">
              Drive Change.
             Stay Current.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-700 sm:text-xl"
          >
            The law, decoded: timely updates, 
            actionable guidance, and tools to help you learn faster and influence what happens next.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
          >
            <Link 
              href="/list"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-xl active:scale-95"
            >
              List View
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <button className="inline-flex items-center justify-center rounded-full border-2 border-gray-600 px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-300 hover:border-gray-800 hover:bg-gray-100 active:scale-95">
              College Notes
            </button>
          </motion.div>

          {/* Trust Indicators */}
          {/* <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-gray-600">Trusted by industry leaders worldwide</p>
            <div className="mt-4 flex justify-center space-x-8 opacity-60">
              <div className="h-8 w-24 bg-gray-300 rounded"></div>
              <div className="h-8 w-24 bg-gray-300 rounded"></div>
              <div className="h-8 w-24 bg-gray-300 rounded"></div>
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  )
}
