"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import PageNav from "../components/shared/PageNav";
import PageFooter from "../components/shared/PageFooter";
import ScrollTop from "../components/shared/ScrollTop";
import { isVideoSource, mediaUrl } from "../lib/assets";
import { WORK_CATEGORIES, WORKS, type WorkItem } from "../lib/works-data";
import "../styles/works.css";

function MediaEl({
  src,
  alt,
  eager,
  className,
  controls,
}: {
  src: string;
  alt: string;
  eager?: boolean;
  className?: string;
  controls?: boolean;
}) {
  const url = mediaUrl(src);
  if (isVideoSource(src)) {
    return (
      <video
        src={url}
        className={className}
        controls={controls}
        preload="metadata"
        playsInline
        aria-label={alt}
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding={eager ? "sync" : "async"}
    />
  );
}

export default function WorksPage() {
  const [dark, setDark] = useState(false);
  const [category, setCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [assetOpen, setAssetOpen] = useState(false);

  useEffect(() => {
    setDark(localStorage.getItem("works-theme") === "dark");
  }, []);

  const visible = useMemo(
    () => (category === "All" ? WORKS : WORKS.filter((w) => w.category === category)),
    [category],
  );

  const current: WorkItem | null =
    lightboxIndex !== null ? visible[lightboxIndex] ?? null : null;

  const mediaList = current
    ? current.media?.length
      ? current.media
      : [current.src]
    : [];

  const openWork = (index: number) => {
    setLightboxIndex(index);
    setMediaIndex(0);
    document.body.classList.add("lightbox-open");
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setMediaIndex(0);
    setAssetOpen(false);
    document.body.classList.remove("lightbox-open", "asset-viewer-open");
  }, []);

  const openAsset = () => {
    setAssetOpen(true);
    document.body.classList.add("asset-viewer-open");
  };

  const closeAsset = () => {
    setAssetOpen(false);
    document.body.classList.remove("asset-viewer-open");
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (assetOpen) closeAsset();
        else closeLightbox();
      }
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") {
        if (assetOpen || mediaList.length <= 1) {
          setLightboxIndex((i) => (i === null ? i : Math.max(0, i - 1)));
          setMediaIndex(0);
        } else {
          setMediaIndex((m) => Math.max(0, m - 1));
        }
      }
      if (e.key === "ArrowRight") {
        if (assetOpen || mediaList.length <= 1) {
          setLightboxIndex((i) =>
            i === null ? i : Math.min(visible.length - 1, i + 1),
          );
          setMediaIndex(0);
        } else {
          setMediaIndex((m) => Math.min(mediaList.length - 1, m + 1));
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [assetOpen, closeLightbox, lightboxIndex, mediaList.length, visible.length]);

  useEffect(() => {
    return () => {
      document.body.classList.remove("lightbox-open", "asset-viewer-open");
    };
  }, []);

  return (
    <div className={`page-works${dark ? " dark-mode" : ""}`}>
      <PageNav storageKey="works-theme" dark={dark} onDarkChange={setDark} />

      <main className="page-shell">
        <motion.section
          className="hero"
          id="top"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="hero-copy">
            <h1>My works</h1>
            <p className="hero-description">
              A curated archive of my works across illustration, graphic design, motion,
              experimental visuals, and multidisciplinary practice. Each project carries its own
              visual logic, process, and mood, while staying rooted in the same larger body of work.
            </p>
          </div>
        </motion.section>

        <section className="filters" aria-label="Work categories">
          <div className="filter-row">
            {WORK_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={`filter-chip${category === c ? " is-active" : ""}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        <section className="works-grid" aria-live="polite">
          <AnimatePresence mode="popLayout">
            {visible.map((item, index) => (
              <motion.article
                layout
                key={item.title}
                className="work-card"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.28 }}
                onClick={() => openWork(index)}
                role="button"
                tabIndex={0}
                aria-label={`Open ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openWork(index);
                }}
              >
                <div className="work-media">
                  <MediaEl src={item.src} alt={item.alt || item.title} />
                </div>
                <div className="work-copy">
                  <p className="work-category">{item.category}</p>
                  <h2 className="work-title">{item.title}</h2>
                  <p className="work-description">{item.description}</p>
                  <div className="work-meta">
                    {item.meta.map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                  <span className="work-link">Open Work</span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </section>

        <PageFooter />
      </main>

      <div
        className={`work-lightbox${lightboxIndex !== null ? " is-open" : ""}`}
        aria-hidden={lightboxIndex === null}
      >
        <button className="lightbox-close" type="button" onClick={closeLightbox}>
          Close
        </button>
        <button
          className="lightbox-nav lightbox-nav-prev"
          type="button"
          aria-label="Previous work"
          disabled={lightboxIndex === 0}
          onClick={() => {
            setLightboxIndex((i) => (i === null ? i : Math.max(0, i - 1)));
            setMediaIndex(0);
          }}
        >
          ‹
        </button>
        <div className="lightbox-stage">
          {current && (
            <>
              <div className="lightbox-media" onClick={openAsset}>
                <MediaEl
                  src={mediaList[mediaIndex]}
                  alt={current.alt || current.title}
                  eager
                  className="lightbox-asset"
                  controls
                />
              </div>
              <div className="lightbox-media-controls">
                <button
                  className="lightbox-subnav lightbox-subnav-prev"
                  type="button"
                  aria-label="Previous image in project"
                  disabled={mediaIndex === 0}
                  onClick={() => setMediaIndex((m) => Math.max(0, m - 1))}
                >
                  ‹
                </button>
                <div className="lightbox-dots" aria-label="Project images">
                  {mediaList.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`lightbox-dot${i === mediaIndex ? " is-active" : ""}`}
                      onClick={() => setMediaIndex(i)}
                      aria-label={`Image ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  className="lightbox-subnav lightbox-subnav-next"
                  type="button"
                  aria-label="Next image in project"
                  disabled={mediaIndex >= mediaList.length - 1}
                  onClick={() =>
                    setMediaIndex((m) => Math.min(mediaList.length - 1, m + 1))
                  }
                >
                  ›
                </button>
              </div>
              <div className="lightbox-caption">
                <p className="lightbox-eyebrow">{current.category}</p>
                <h2>{current.title}</h2>
                <div className="lightbox-description">
                  {current.description.split(/\n\n+/).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <ul className="lightbox-meta">
                  {current.meta.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
        <button
          className="lightbox-nav lightbox-nav-next"
          type="button"
          aria-label="Next work"
          disabled={lightboxIndex === null || lightboxIndex >= visible.length - 1}
          onClick={() => {
            setLightboxIndex((i) =>
              i === null ? i : Math.min(visible.length - 1, i + 1),
            );
            setMediaIndex(0);
          }}
        >
          ›
        </button>
      </div>

      <div className={`asset-viewer${assetOpen ? " is-open" : ""}`} aria-hidden={!assetOpen}>
        <button className="asset-viewer-close" type="button" onClick={closeAsset}>
          Close
        </button>
        <button
          className="asset-viewer-nav asset-viewer-nav-prev"
          type="button"
          aria-label="Previous image"
          disabled={mediaIndex === 0}
          onClick={() => setMediaIndex((m) => Math.max(0, m - 1))}
        >
          ‹
        </button>
        <div className="asset-viewer-stage">
          {current && (
            <MediaEl
              src={mediaList[mediaIndex]}
              alt={current.alt || current.title}
              eager
              controls
            />
          )}
        </div>
        <button
          className="asset-viewer-nav asset-viewer-nav-next"
          type="button"
          aria-label="Next image"
          disabled={mediaIndex >= mediaList.length - 1}
          onClick={() => setMediaIndex((m) => Math.min(mediaList.length - 1, m + 1))}
        >
          ›
        </button>
      </div>

      <ScrollTop />
    </div>
  );
}
