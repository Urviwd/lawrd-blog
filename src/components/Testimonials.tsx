'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: "Alexandra Chen",
    role: "Marketing Director",
    company: "TechFlow Inc.",
    rating: 5,
    content: "The premium content from this blog store has completely transformed our marketing strategy. The insights are actionable and the quality is exceptional. Worth every penny!",
    featured: true
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Startup Founder",
    company: "InnovateLab",
    rating: 5,
    content: "I've purchased several premium guides and they've helped me avoid costly mistakes. The financial freedom blueprint alone saved me months of research.",
    featured: false
  },
  {
    id: 3,
    name: "Sarah Williams",
    role: "Product Manager",
    company: "GrowthCorp",
    rating: 5,
    content: "The productivity content is gold! I've implemented several strategies that have increased my team's output by 40%. Highly recommended!",
    featured: false
  },
  {
    id: 4,
    name: "David Kim",
    role: "Consultant",
    company: "Strategic Solutions",
    rating: 5,
    content: "As a consultant, I need to stay ahead of trends. This blog store provides cutting-edge insights that keep me competitive and valuable to my clients.",
    featured: false
  },
  {
    id: 5,
    name: "Emily Thompson",
    role: "Freelance Writer",
    company: "Content Studio",
    rating: 5,
    content: "The writing quality and depth of research in these premium posts is outstanding. They've become my go-to resource for professional development.",
    featured: false
  }
]

export default function Testimonials() {
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
            What Our Readers Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Join thousands of satisfied customers who have transformed their knowledge and skills
          </motion.p>
        </div>

        {/* Featured Testimonial */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 lg:p-12">
            <Quote className="absolute top-8 right-8 h-12 w-12 text-blue-200" />
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-2xl lg:text-3xl font-medium text-gray-900 mb-8 leading-relaxed">
                &ldquo;The premium content from this blog store has completely transformed our marketing strategy. The insights are actionable and the quality is exceptional. Worth every penny!&rdquo;
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  AC
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Alexandra Chen</div>
                  <div className="text-gray-600">Marketing Director at TechFlow Inc.</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.slice(1).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-blue-600">98%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">10K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">500+</div>
            <div className="text-gray-600">Premium Articles</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
