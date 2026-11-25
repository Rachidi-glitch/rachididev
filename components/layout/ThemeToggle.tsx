"use client";

import { useEffect, useState } from "react";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = document.documentElement.dataset.theme;
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);

    try {
      window.localStorage.setItem("rachididev-theme", nextTheme);
    } catch (error) {
      console.error("Impossible de mémoriser le thème choisi.", error);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:bg-white/10"
      aria-label={`Activer le thème ${theme === "dark" ? "clair" : "sombre"}`}
      aria-pressed={theme === "light"}
      title={`Activer le thème ${theme === "dark" ? "clair" : "sombre"}`}
    >
      {theme === "dark" ? <IconSun size={20} /> : <IconMoonStars size={20} />}
    </button>
  );
}
