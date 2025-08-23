import HeroSection from "@/src/components/HeroSection";
import FeaturedPosts from "@/src/components/FeaturedPosts";
import Categories from "@/src/components/Categories";
import Testimonials from "@/src/components/Testimonials";
import SubscriberSignup from "@/src/components/SubscriberSignup";
import Footer from "@/src/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedPosts />
      <Categories />
      <Testimonials />
      <SubscriberSignup />
      <Footer />
    </main>
  );
}
