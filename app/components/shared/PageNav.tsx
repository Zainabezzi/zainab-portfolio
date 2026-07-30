"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Me" },
  { href: "/works", label: "My Works" },
  { href: "/contact", label: "Contact" },
];

export default function PageNav({
  storageKey = "inner-theme",
  dark,
  onDarkChange,
}: {
  storageKey?: string;
  dark: boolean;
  onDarkChange: (dark: boolean) => void;
}) {
  const menuId = "menu-toggle";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    onDarkChange(next);
    localStorage.setItem(storageKey, next ? "dark" : "light");
  };

  return (
    <nav className="page-nav">
      <input
        type="checkbox"
        id={menuId}
        className="menu-toggle"
        checked={open}
        onChange={(e) => setOpen(e.target.checked)}
        aria-hidden
      />
      <div className="nav-actions">
        <button
          className="theme-toggle"
          type="button"
          aria-label="Toggle dark mode"
          onClick={toggleTheme}
        >
          {dark ? "Light" : "Dark"}
        </button>
        <label
          htmlFor={menuId}
          className="menu-icon"
          aria-label="Open navigation menu"
          aria-controls="nav-menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </label>
      </div>
      <ul
        className="menu"
        id="nav-menu"
        style={
          open
            ? { opacity: 1, pointerEvents: "auto", transform: "translateY(0)" }
            : undefined
        }
      >
        {LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
