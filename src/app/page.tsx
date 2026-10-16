import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { FeaturedPosts } from "@/components/sections/featured-posts";
import { FeaturedCourses } from "@/components/sections/featured-courses";
import { Testimonials } from "@/components/sections/testimonials";
import { FaqSection } from "@/components/sections/faq-section";
import { MOCK_POSTS, MOCK_COURSES } from "@/lib/mock-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={MOCK_POSTS} />
      <FeaturedCourses courses={MOCK_COURSES} />
      <Testimonials />
      <FaqSection />
    </>
  );
}
