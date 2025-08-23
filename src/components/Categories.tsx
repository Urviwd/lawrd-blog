'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Lightbulb, 
  DollarSign, 
  Zap, 
  Heart, 
  Globe, 
  BookOpen, 
  Target 
} from 'lucide-react'
import Link from 'next/link'

const categories = [
  {
    id: 1,
    name: "News & Updates",
    description: "Holistic approaches to physical and mental well-being",
    icon: Heart,
    postCount: 76,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50"
  },
  {
    id: 2,
    name: "Acts & Rules",
    description: "Cutting-edge tech insights and AI implementation",
    icon: Globe,
    postCount: 112,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50"
  },
  {
    id: 3,
    name: "Education & Learning",
    description: "Continuous learning strategies and skill development",
    icon: BookOpen,
    postCount: 58,
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50"
  },
  {
    id: 4,
    name: "Leadership & Strategy",
    description: "Executive insights and strategic decision-making",
    icon: Target,
    postCount: 81,
    color: "from-gray-500 to-gray-600",
    bgColor: "bg-gray-50"
  }
]

export default function Categories() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
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
            Explore by Category
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Find exactly what you need across our comprehensive content categories
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/list?category=${encodeURIComponent(category.name)}`}
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className={`${category.bgColor} rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-lg hover:scale-105`}>
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Post Count */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      {category.postCount} posts
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center`}>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Browse All Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link 
            href="/list"
            className="inline-flex items-center px-8 py-3 border-2 border-blue-600 text-base font-medium rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            Browse All Categories
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
