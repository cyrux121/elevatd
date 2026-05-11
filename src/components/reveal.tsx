"use client";

import { useEffect } from "react";

// Adds `.is-visible` to any `.reveal` element when it enters the viewport.
// Pairs with `.reveal` styles in globals.css. Honors prefers-reduced-motion.
export function Reveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    if (prefersReduced) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  });
  return null;
}
