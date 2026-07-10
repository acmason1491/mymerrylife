import { Hero } from "@/components/sections/hero";
import { FeaturedPosts } from "@/components/sections/featured-posts";
import { FeaturedCourses } from "@/components/sections/featured-courses";
import { Testimonials } from "@/components/sections/testimonials";
import { FaqSection } from "@/components/sections/faq-section";
import { Newsletter } from "@/components/sections/newsletter";
import { MOCK_POSTS, MOCK_COURSES } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={MOCK_POSTS} />
      <FeaturedCourses courses={MOCK_COURSES} />
      <Testimonials />
      <FaqSection />
      <Newsletter />
    </>
  );
}
