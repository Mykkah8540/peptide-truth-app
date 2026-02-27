"use client";

import { useEffect } from "react";

/**
 * Adds a CSS class to <html> on mount and removes it on unmount.
 * Used to apply page-level background / theme without touching layout.tsx.
 */
export default function BodyClass({ className }: { className: string }) {
  useEffect(() => {
    document.documentElement.classList.add(className);
    return () => document.documentElement.classList.remove(className);
  }, [className]);
  return null;
}
