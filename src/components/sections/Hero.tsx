"use client";

import { Suspense, lazy } from "react";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

const HeroCanvas = lazy(() => import("@/components/three/HeroCanvas"));

function HeroFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="w-full h-full"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(200,35,42,0.15) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain-overlay"
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<HeroFallback />}>
          <HeroCanvas />
        </Suspense>
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gd-black/60 via-gd-black/40 to-gd-black z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="mb-8 animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gd-cream/10 bg-gd-cream/5 text-gd-cream-muted text-xs font-heading uppercase tracking-[0.2em]">
            <span className="w-2 h-2 rounded-full bg-gd-red animate-pulse" />
            Graphica Designers
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.9] mb-6"
        >
          <span className="inline-block">Print</span>{" "}
          <span className="inline-block text-gd-red">Your</span>
          <br />
          <span className="inline-block">Brand</span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-xl mx-auto text-gd-cream-muted text-base sm:text-lg md:text-xl leading-relaxed mb-10">
          One-stop custom printing &amp; branding shop. Fast turnaround,
          in-house design team, and a product range that covers every surface
          you can imagine.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className={buttonVariants({
              size: "lg",
              className:
                "bg-gd-red hover:bg-gd-red-dark text-gd-cream font-heading uppercase tracking-wider text-sm px-8 py-6 rounded-sm transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(200,35,42,0.3)]",
            })}
          >
            Get a Quote
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
          <a
            href="#services"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className:
                "border-gd-cream/20 text-gd-cream hover:bg-gd-cream/5 font-heading uppercase tracking-wider text-sm px-8 py-6 rounded-sm",
            })}
          >
            View Services
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gd-cream-muted/40">
        <span className="text-[10px] uppercase tracking-[0.3em] font-heading">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
