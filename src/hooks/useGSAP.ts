"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGSAP() {
  const scope = useRef<HTMLDivElement>(null);
  return { scope, gsap, ScrollTrigger };
}

export function useScrollReveal(
  options: {
    y?: number;
    opacity?: number;
    duration?: number;
    stagger?: number;
    delay?: number;
    start?: string;
  } = {}
) {
  const ref = useRef<HTMLDivElement>(null);

  const {
    y = 40,
    opacity = 0,
    duration = 0.8,
    stagger = 0.1,
    delay = 0,
    start = "top 85%",
  } = options;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !ref.current) return;

    const children = ref.current.children;

    gsap.set(children, { y, opacity });

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start,
      onEnter: () => {
        gsap.to(children, {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease: "power3.out",
        });
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, [y, opacity, duration, stagger, delay, start]);

  return ref;
}

export function useCountUp(
  end: number,
  duration: number = 2,
  suffix: string = ""
) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const startCount = useCallback(() => {
    if (!ref.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      ref.current.textContent = `${end}${suffix}`;
      return;
    }

    const counter = { value: 0 };
    gsap.to(counter, {
      value: end,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = `${Math.round(counter.value)}${suffix}`;
        }
      },
    });
  }, [end, duration, suffix]);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      onEnter: startCount,
      once: true,
    });

    return () => trigger.kill();
  }, [startCount]);

  return ref;
}
