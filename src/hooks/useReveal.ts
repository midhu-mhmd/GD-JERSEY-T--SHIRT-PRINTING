"use client";

import { useEffect, useRef } from "react";

/**
 * Adds the `.reveal` class to the ref element on mount,
 * then adds `.visible` when it scrolls into view.
 * Pure CSS transitions handle the animation — no GSAP dependency.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add("reveal");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

/**
 * Reveals all children of a container with staggered delays.
 * Adds `.reveal` + `.reveal-delay-N` to each child.
 */
export function useRevealChildren<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.1
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];
    children.forEach((child, i) => {
      child.classList.add("reveal");
      if (i > 0 && i <= 4) child.classList.add(`reveal-delay-${i}`);
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child) => child.classList.add("visible"));
          observer.unobserve(container);
        }
      },
      { threshold }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
