"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ANIMATED_SELECTORS = [
  ".hero-copy",
  ".hero-visual",
  ".booking-widget",
  ".stat-item",
  ".section-heading",
  ".service-card",
  ".feature-card",
  ".step-card",
  ".cta-band",
  ".page-hero",
  ".search-panel",
  ".listing-card",
  ".form-card",
  ".dashboard-heading",
  ".metric-card",
  ".dashboard-columns > .panel",
  ".quick-action",
  ".auth-visual",
  ".auth-content"
].join(",");

/** Adds scroll-triggered reveal effects without making content depend on JavaScript. */
export default function ScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      root.classList.remove("motion-enabled");
      return;
    }

    root.classList.add("motion-enabled");
    const items = Array.from(document.querySelectorAll(ANIMATED_SELECTORS));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
    );

    items.forEach((item, index) => {
      item.classList.add("motion-item");
      item.style.setProperty("--motion-delay", `${Math.min(index % 5, 4) * 65}ms`);
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
