'use client'

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Attorney",
    company: "Johnson & Associates",
    content: "CoddessCookie has become my go-to resource for staying current with legal developments. The analysis is always insightful and practical.",
    rating: 5,
    avatar: "/api/placeholder/60/60"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Law Professor",
    company: "Harvard Law School",
    content: "As an educator, I appreciate the depth and clarity of the legal content. My students find it incredibly helpful for their studies.",
    rating: 5,
    avatar: "/api/placeholder/60/60"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Corporate Counsel",
    company: "TechCorp Inc.",
    content: "The practical insights and compliance guidance have been invaluable for our legal team. Highly recommended for any legal professional.",
    rating: 5,
    avatar: "/api/placeholder/60/60"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Legal Consultant",
    company: "Thompson Legal Services",
    content: "I've been following CoddessCookie for years. The quality of analysis and timely updates make it an essential resource in my practice.",
    rating: 5,
    avatar: "/api/placeholder/60/60"
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Public Defender",
    company: "State Public Defender's Office",
    content: "The criminal law insights and case analysis have been incredibly helpful in my practice. Clear, concise, and always relevant.",
    rating: 5,
    avatar: "/api/placeholder/60/60"
  },
  {
    id: 6,
    name: "Robert Kim",
    role: "In-House Counsel",
    company: "Global Industries",
    content: "Excellent resource for corporate law updates and compliance guidance. The practical tips save me hours of research time.",
    rating: 5,
    avatar: "/api/placeholder/60/60"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Legal Professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what attorneys, professors, and legal experts say about CoddessCookie&apos;s impact on their practice and education.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-gray-50 rounded-xl p-6 relative group hover:shadow-lg transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 left-6">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4 mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Join Thousands of Legal Professionals
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Get access to expert legal analysis, practical insights, and the latest developments in your field.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Start Reading Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

