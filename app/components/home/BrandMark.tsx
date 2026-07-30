"use client";

import { useEffect, useState } from "react";

const FRAMES = [
  "/images/brand/v2-0.png",
  "/images/brand/v2-1.png",
  "/images/brand/v2-2.png",
  "/images/brand/v2-3.png",
  "/images/brand/v2-4.png",
  "/images/brand/v2-5.png",
];

export default function BrandMark({ intervalMs = 700 }: { intervalMs?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    FRAMES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % FRAMES.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return (
    <span className="brand-mark-frames" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={FRAMES[index]}
        src={FRAMES[index]}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
        }}
      />
    </span>
  );
}
