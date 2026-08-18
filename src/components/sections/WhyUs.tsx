"use client";

import { useRef } from "react";
import { useCountUp } from "@/hooks/useGSAP";
import { useReveal, useRevealChildren } from "@/hooks/useReveal";
import {
  Zap,
  PenTool,
  Users,
  ShieldCheck,
} from "lucide-react";

const differentiators = [
  {
    icon: Zap,
    title: "Fast Turnaround",
    description:
      "From design approval to finished product — we deliver most orders within 24–48 hours.",
    stat: 48,
    suffix: "h",
    label: "Avg. Delivery",
  },
  {
    icon: PenTool,
    title: "In-House Design",
    description:
      "Our creative team handles everything from concept to print-ready files — no outsourcing.",
    stat: 100,
    suffix: "%",
    label: "In-House",
  },
  {
    icon: Users,
    title: "Bulk & Corporate",
    description:
      "Competitive pricing for bulk orders and corporate accounts with dedicated account managers.",
    stat: 500,
    suffix: "+",
    label: "Happy Clients",
  },
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    description:
      "We use top-grade materials and the latest printing technology to ensure vibrant, lasting results.",
    stat: 25,
    suffix: "+",
    label: "Products",
  },
];

export default function WhyUs() {
  const headingRef = useRevealChildren();

  return (
    <section
      id="why-us"
      className="relative py-24 sm:py-32 bg-gd-dark-surface"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-16 sm:mb-20">
          <span className="inline-block font-heading text-xs uppercase tracking-[0.3em] text-gd-red mb-4">
            Why GD Jersey
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-gd-cream mb-4">
            Why Choose Us
          </h2>
          <p className="max-w-md mx-auto text-gd-cream-muted text-base">
            We combine speed, quality, and creative expertise to deliver
            printing solutions that make your brand stand out.
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentiators.map((item) => (
            <DifferentiatorCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DifferentiatorCard({
  icon: Icon,
  title,
  description,
  stat,
  suffix,
  label,
}: {
  icon: typeof Zap;
  title: string;
  description: string;
  stat: number;
  suffix: string;
  label: string;
}) {
  const cardRef = useReveal();
  const countRef = useCountUp(stat, 2, suffix);

  return (
    <div
      ref={cardRef}
      className="group text-center p-6 rounded-sm border border-gd-cream/5 hover:border-gd-red/20 bg-gd-black/50 transition-all duration-500"
    >
      <div className="w-14 h-14 mx-auto rounded-full bg-gd-red/10 flex items-center justify-center mb-5 group-hover:bg-gd-red/20 group-hover:scale-110 transition-all duration-500">
        <Icon className="w-6 h-6 text-gd-red" />
      </div>

      <div className="mb-3">
        <span
          ref={countRef}
          className="font-heading text-3xl sm:text-4xl font-bold text-gd-cream"
        >
          0
        </span>
      </div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-gd-cream-muted mb-3">
        {label}
      </p>

      <h3 className="font-heading text-base uppercase tracking-wider text-gd-cream mb-2">
        {title}
      </h3>
      <p className="text-sm text-gd-cream-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
}
