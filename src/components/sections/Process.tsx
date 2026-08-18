"use client";

import { MessageSquare, Printer, Palette, Truck } from "lucide-react";
import { useReveal, useRevealChildren } from "@/hooks/useReveal";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Consult",
    description:
      "Tell us what you need — product type, quantity, design ideas. We'll guide you through options and pricing.",
  },
  {
    number: "02",
    icon: Palette,
    title: "Design",
    description:
      "Our in-house design team creates or refines your artwork to be print-ready. Unlimited revisions until you're satisfied.",
  },
  {
    number: "03",
    icon: Printer,
    title: "Print",
    description:
      "Using the latest printing technology, we produce your order with precision color matching and quality control.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Deliver",
    description:
      "Fast turnaround with careful packaging. Pickup or delivery — your branded products reach you on time.",
  },
];

export default function Process() {
  const headingRef = useRevealChildren();
  const stepsRef = useRevealChildren(0.05);

  return (
    <section
      id="process"
      className="relative py-24 sm:py-32 bg-gd-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-16 sm:mb-20">
          <span className="inline-block font-heading text-xs uppercase tracking-[0.3em] text-gd-red mb-4">
            How It Works
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-gd-cream mb-4">
            Our Process
          </h2>
          <p className="max-w-md mx-auto text-gd-cream-muted text-base">
            Four simple steps from idea to finished product.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop progress line */}
          <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-[2px] bg-gd-cream/5">
            <div className="h-full bg-gd-red origin-left w-full scale-x-100" />
          </div>

          {/* Steps Grid */}
          <div
            ref={stepsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
          >
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="process-step relative text-center lg:text-center group"
                >
                  {/* Number circle */}
                  <div className="relative z-10 w-[120px] h-[120px] mx-auto mb-6 rounded-full border-2 border-gd-cream/10 bg-gd-black flex flex-col items-center justify-center group-hover:border-gd-red/40 transition-all duration-500">
                    <span className="font-heading text-3xl font-bold text-gd-red">
                      {step.number}
                    </span>
                    <Icon className="w-5 h-5 text-gd-cream-muted mt-1" />
                  </div>

                  {/* Content */}
                  <h3 className="font-heading text-xl uppercase tracking-wider text-gd-cream mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gd-cream-muted leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
