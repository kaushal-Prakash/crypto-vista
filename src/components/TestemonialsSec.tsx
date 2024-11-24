"use client";

import { testimonials } from "@/data/tesiminoals";
import { AnimatedTestimonials } from "./ui/AnimatedTestemonials";

function TestimonialsSec() {
  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          What Our Users Say
        </h2>
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </section>
  );
}

export default TestimonialsSec;
