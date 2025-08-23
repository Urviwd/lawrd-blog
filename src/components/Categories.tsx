'use client'

import Link from "next/link";
import { Scale, Building2, Shield, Users, BookOpen, Gavel, FileText, Briefcase } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Constitutional Law",
    description: "Fundamental rights, government structure, and constitutional interpretation",
    icon: Scale,
    color: "bg-blue-500",
    articleCount: 45,
    slug: "constitutional-law"
  },
  {
    id: 2,
    name: "Corporate Law",
    description: "Business formation, compliance, mergers, and corporate governance",
    icon: Building2,
    color: "bg-green-500",
    articleCount: 38,
    slug: "corporate-law"
  },
  {
    id: 3,
    name: "Criminal Law",
    description: "Criminal procedure, defense strategies, and sentencing guidelines",
    icon: Shield,
    color: "bg-red-500",
    articleCount: 52,
    slug: "criminal-law"
  },
  {
    id: 4,
    name: "Employment Law",
    description: "Workplace rights, discrimination, and labor regulations",
    icon: Users,
    color: "bg-purple-500",
    articleCount: 41,
    slug: "employment-law"
  },
  {
    id: 5,
    name: "Environmental Law",
    description: "Environmental compliance, regulations, and sustainability",
    icon: BookOpen,
    color: "bg-emerald-500",
    articleCount: 29,
    slug: "environmental-law"
  },
  {
    id: 6,
    name: "Family Law",
    description: "Marriage, divorce, custody, and family rights",
    icon: Gavel,
    color: "bg-pink-500",
    articleCount: 33,
    slug: "family-law"
  },
  {
    id: 7,
    name: "Intellectual Property",
    description: "Patents, trademarks, copyrights, and trade secrets",
    icon: FileText,
    color: "bg-indigo-500",
    articleCount: 27,
    slug: "intellectual-property"
  },
  {
    id: 8,
    name: "Real Estate Law",
    description: "Property transactions, zoning, and real estate regulations",
    icon: Briefcase,
    color: "bg-orange-500",
    articleCount: 35,
    slug: "real-estate-law"
  }
];

export default function Categories() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Legal Topics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dive deep into specific areas of law with our comprehensive category coverage and expert analysis.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link 
                key={category.id} 
                href={`/category/${category.slug}`}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
              >
                {/* Category Icon */}
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                {/* Category Content */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>

                {/* Article Count */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {category.articleCount} articles
                  </span>
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Browse All Categories Button */}
        <div className="text-center mt-12">
          <Link 
            href="/categories"
            className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200"
          >
            Browse All Categories
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

