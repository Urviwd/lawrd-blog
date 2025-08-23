import { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import FeaturedPosts from '@/components/FeaturedPosts'
import Categories from '@/components/Categories'
import NewsletterSignup from '@/components/NewsletterSignup'
import Testimonials from '@/components/Testimonials'
import SubscriberSignup from '@/components/SubscriberSignup'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Premium Blog Store - Discover Amazing Content & Products',
  description: 'Explore our curated collection of premium blog posts, digital products, and exclusive content. Find inspiration, knowledge, and valuable resources all in one place.',
  keywords: 'blog store, premium content, digital products, exclusive posts, curated content, inspiration, knowledge resources',
  authors: [{ name: 'Premium Blog Store' }],
  creator: 'Premium Blog Store',
  publisher: 'Premium Blog Store',
  openGraph: {
    title: 'Premium Blog Store - Discover Amazing Content & Products',
    description: 'Explore our curated collection of premium blog posts, digital products, and exclusive content. Find inspiration, knowledge, and valuable resources all in one place.',
    url: 'https://yourdomain.com',
    siteName: 'Premium Blog Store',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Premium Blog Store - Your Gateway to Amazing Content',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Blog Store - Discover Amazing Content & Products',
    description: 'Explore our curated collection of premium blog posts, digital products, and exclusive content.',
    images: ['/og-image.jpg'],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <HeroSection />
      <FeaturedPosts />
      <Categories />
      <Testimonials />
      <SubscriberSignup />
      <Footer />
    </main>
  )
}
