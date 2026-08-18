"use client";

import { Quote } from "lucide-react";
import { useRevealChildren } from "@/hooks/useReveal";

const testimonials = [
  {
    name: "Rahul Menon",
    role: "Founder, Kickstart FC",
    text: "GD Jersey printed 50 custom jerseys for our football team in under 2 days. The colors were vibrant and the fabric quality was excellent. Will definitely order again!",
  },
  {
    name: "Priya Sharma",
    role: "Marketing Manager, TechStar",
    text: "We ordered corporate gift hampers for 200+ employees — mugs, t-shirts, caps, and notebooks. Everything was on-brand, on-time, and within budget. Outstanding service!",
  },
  {
    name: "Anil Kumar",
    role: "Event Organizer",
    text: "From banners to ID cards to participant kits — GD Jersey handled our entire event branding. One-stop shop that delivers quality work fast.",
  },
  {
    name: "Sneha Nair",
    role: "Small Business Owner",
    text: "I needed custom product labels and business cards with a quick turnaround. GD Jersey's design team was incredibly helpful and the print quality exceeded my expectations.",
  },
  {
    name: "Fahad Ali",
    role: "Sports Coach",
    text: "The jerseys and track suits they made for our academy looked professional and high-end. Great attention to detail in the sublimation printing.",
  },
];

export default function Testimonials() {
  const headingRef = useRevealChildren();

  // Double the testimonials for seamless marquee
  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="relative py-24 sm:py-32 bg-gd-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <div ref={headingRef} className="text-center">
          <span className="inline-block font-heading text-xs uppercase tracking-[0.3em] text-gd-red mb-4">
            Testimonials
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-gd-cream mb-4">
            Client Stories
          </h2>
          <p className="max-w-md mx-auto text-gd-cream-muted text-base">
            Hear from businesses and individuals who trust us with their
            branding.
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative w-full">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gd-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gd-black to-transparent z-10" />

        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {doubledTestimonials.map((testimonial, idx) => (
            <div
              key={`${testimonial.name}-${idx}`}
              className="flex-shrink-0 w-[350px] sm:w-[400px] mx-3"
            >
              <div className="h-full p-6 rounded-sm border border-gd-cream/5 bg-gd-dark-card hover:border-gd-red/20 transition-all duration-500">
                <Quote className="w-8 h-8 text-gd-red/30 mb-4" />
                <p className="text-sm text-gd-cream/80 leading-relaxed mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gd-red/10 flex items-center justify-center font-heading text-sm text-gd-red font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading text-sm uppercase tracking-wider text-gd-cream">
                      {testimonial.name}
                    </p>
                    <p className="text-[11px] text-gd-cream-muted">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
