"use client";

import { useRef } from "react";

export function HomeStarfield({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeSection = useRef<HTMLElement | null>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !(event.target instanceof Element)
    ) {
      return;
    }

    const section = event.target.closest("section");
    if (!section || !event.currentTarget.contains(section)) return;

    if (activeSection.current !== section) {
      if (activeSection.current) {
        delete activeSection.current.dataset.cursorActive;
      }
      activeSection.current = section;
    }

    const bounds = section.getBoundingClientRect();
    section.style.setProperty("--cursor-x", `${event.clientX - bounds.left}px`);
    section.style.setProperty("--cursor-y", `${event.clientY - bounds.top}px`);
    section.dataset.cursorActive = "true";
  }

  function handlePointerLeave() {
    if (activeSection.current) {
      delete activeSection.current.dataset.cursorActive;
      activeSection.current = null;
    }
  }

  return (
    <div
      className="home-starfield"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </div>
  );
}
