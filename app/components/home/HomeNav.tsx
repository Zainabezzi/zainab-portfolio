"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BrandMark from "./BrandMark";

type Theme = "artist" | "light" | "dark";

const THEMES: Theme[] = ["artist", "light", "dark"];

export default function HomeNav({
  theme,
  onThemeChange,
}: {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}) {
  const menuId = "home-menu-toggle";
  const [menuOpen, setMenuOpen] = useState(false);

  function applyTheme(next: Theme) {
    onThemeChange(next);
    localStorage.setItem("homepage-theme", next);
  }

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuOpen) return;
      const nav = document.querySelector(".site-nav");
      if (nav && !nav.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [menuOpen]);

  return (
    <nav className="site-nav">
      <Link aria-label="Zainab home" className="brand brand-mark" href="/">
        <BrandMark />
      </Link>

      <div className="nav-controls">
        <div className="theme-switcher" aria-label="Theme modes">
          {THEMES.map((t) => (
            <motion.button
              key={t}
              className={`theme-chip${theme === t ? " is-active" : ""}`}
              type="button"
              data-theme={t}
              aria-label={
                t === "artist" ? "Artist mode" : t === "light" ? "Light mode" : "Dark mode"
              }
              whileHover={{ x: -2, y: -2 }}
              transition={{ duration: 0.14 }}
              onClick={() => applyTheme(t)}
            >
              {t === "artist" && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/images/brand/v2-theme.png"
                  alt=""
                  className="theme-art-icon"
                  width={48}
                  height={48}
                />
              )}
              {t === "light" && <span className="theme-icon theme-icon-light" aria-hidden />}
              {t === "dark" && <span className="theme-icon theme-icon-dark" aria-hidden />}
            </motion.button>
          ))}
        </div>
      </div>

      <input
        type="checkbox"
        id={menuId}
        className="menu-toggle"
        checked={menuOpen}
        onChange={(e) => setMenuOpen(e.target.checked)}
      />
      <label htmlFor={menuId} className="menu-button" aria-label="Open navigation menu">
        <span />
        <span />
        <span />
      </label>

      <ul
        className="menu"
        style={
          menuOpen
            ? { opacity: 1, pointerEvents: "auto", transform: "translateY(0)" }
            : undefined
        }
      >
        <li>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About Me
          </Link>
        </li>
        <li>
          <Link href="/#experience" onClick={() => setMenuOpen(false)}>
            My Works
          </Link>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/zainab-ezzi-2669372a2/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            My LinkedIn
          </a>
        </li>
        <li>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
