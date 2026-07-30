"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HomeNav from "./HomeNav";
import ScrollTop from "../shared/ScrollTop";
import { projects, workExperience, type ContentBlock } from "../../lib/home-blocks";

type Theme = "artist" | "light" | "dark";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

const fadeIn = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

const hoverLift = {
  whileHover: { x: -2, y: -2 },
  transition: { duration: 0.14 },
};

const TOOLS = [
  { id: "procreate", label: "Procreate" },
  { id: "canva", label: "Canva" },
  { id: "zoho", label: "Zoho" },
  { id: "shopify", label: "Shopify" },
  { id: "m365", label: "Microsoft Office 360" },
  { id: "figma", label: "Figma" },
  { id: "chatgpt", label: "ChatGPT" },
  { id: "claude", label: "Claude" },
  { id: "cursor", label: "Cursor" },
  { id: "miro", label: "Miro" },
  { id: "slack", label: "Slack" },
] as const;

function BlocksSection({
  id,
  kicker,
  items,
}: {
  id: string;
  kicker: string;
  items: ContentBlock[];
}) {
  return (
    <motion.section className="blocks-panel" id={id} aria-label={kicker} {...fadeUp}>
      <h2 className="blocks-heading">{kicker}</h2>
      <div className="blocks-grid">
        {items.map((item, i) => (
          <motion.article
            key={`${item.title}-${i}`}
            className="content-block"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
          >
            <div className="block-media">
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt="" />
              ) : null}
            </div>
            <div className="block-copy">
              <div className="block-meta">
                <p className="block-eyebrow">{item.eyebrow}</p>
                {item.period ? <p className="block-period">{item.period}</p> : null}
              </div>
              <h3 className="block-title">{item.title}</h3>
              <p className="block-description">{item.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

export default function HomePage() {
  const [theme, setTheme] = useState<Theme>("artist");

  useEffect(() => {
    const stored = (localStorage.getItem("homepage-theme") as Theme) || "artist";
    setTheme(stored);
  }, []);

  return (
    <div className="page-home" data-theme={theme}>
      <HomeNav theme={theme} onThemeChange={setTheme} />

      <main className="page-shell">
        <motion.section className="hero-card" {...fadeIn}>
          <figure className="hero-portrait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/about-assets/portrait.jpg" alt="Portrait of Zainab" />
          </figure>

          <div className="hero-copy">
            <p className="eyebrow">Multidisciplinary Entrepreneur</p>
            <h1>Zainab</h1>
            <p className="intro">
              Hi, I&apos;m Zainab, an Entrepreneur, designer, and builder driven by curiosity,
              always chasing ideas worth creating and experiences worth remembering.
            </p>
            <div className="hero-actions">
              <motion.div {...hoverLift}>
                <Link className="action-link" href="#experience">
                  View works
                </Link>
              </motion.div>
              <motion.div {...hoverLift}>
                <Link className="action-link alt" href="#about">
                  Read more
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="info-strip"
          aria-label="Quick details"
          {...fadeIn}
          transition={{ ...fadeIn.transition, delay: 0.08 }}
        >
          <article className="strip-item">
            <p className="strip-label">Based in</p>
            <p className="strip-value">Pune</p>
          </article>
          <article className="strip-item">
            <p className="strip-label">Focus</p>
            <p className="strip-value">Research & Development, Marketing, Designing</p>
          </article>
          <article className="strip-item">
            <p className="strip-label">Status</p>
            <p className="strip-value">
              <span style={{ textDecoration: "line-through" }}>Single :(</span>
              <br />
              Building Nutrivaano
            </p>
          </article>
        </motion.section>

        <section className="content-grid" id="about">
          <motion.article className="panel panel-about" {...fadeUp}>
            <p className="panel-kicker">About Me</p>
            <h2>
              I&apos;m less interested in having all the answers than I am in asking better
              questions.
            </h2>
            <p>
              Some days I&apos;m designing interfaces, other days I&apos;m building products,
              planning experiences, or chasing ideas that started as random thoughts. I&apos;ve
              never believed that the best learning comes from waiting until you&apos;re ready.
              <br />
              <br />
              I prefer diving into unfamiliar problems, experimenting relentlessly, and improving
              through every iteration. That&apos;s how I&apos;ve learned most of what I know, and
              it&apos;s still how I approach every new challenge.
            </p>
            <motion.div {...hoverLift} style={{ justifySelf: "start" }}>
              <Link className="inline-link" href="/about">
                Wanna know more?
              </Link>
            </motion.div>
          </motion.article>

          <motion.article
            className="panel panel-links"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.08 }}
          >
            <p className="panel-kicker">Links</p>
            <motion.div {...hoverLift}>
              <Link className="route-card" href="#experience">
                <span className="route-title">My Works</span>
                <span className="route-copy">Projects across design, building, and product.</span>
              </Link>
            </motion.div>
            <motion.div {...hoverLift}>
              <a
                className="route-card"
                href="https://www.linkedin.com/in/zainab-ezzi-2669372a2/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="route-title">LinkedIn</span>
                <span className="route-copy">
                  Connect for collaborations, opportunities, and conversations.
                </span>
              </a>
            </motion.div>
            <motion.div {...hoverLift}>
              <Link className="route-card" href="/contact">
                <span className="route-title">Contact</span>
                <span className="route-copy">
                  For commissions, collaborations, freelance projects, and conversations.
                </span>
              </Link>
            </motion.div>
          </motion.article>
        </section>

        <motion.section className="tools-panel" {...fadeUp}>
          <p className="panel-kicker">Tools I Work With</p>
          <div className="tools-list">
            {TOOLS.map((tool) => (
              <span key={tool.id} className="tool-chip" data-tool={tool.id}>
                {tool.label}
              </span>
            ))}
          </div>
        </motion.section>

        <BlocksSection id="experience" kicker="Work Experience" items={workExperience} />
        <BlocksSection id="projects" kicker="My Projects" items={projects} />

        <motion.section className="feature-card" {...fadeUp}>
          <div className="feature-copy">
            <p className="panel-kicker" />
            <h2>The best work changes the person creating it.</h2>
            <p>
              Every project I take on teaches me something beyond the brief itself. I value the
              process as much as the outcome because growth doesn&apos;t happen after the work is
              finished. It happens while you&apos;re in the middle of figuring it out.
            </p>
          </div>
          <figure className="feature-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/feature-crossed.png"
              alt="Illustration of Zainab with crossed eyes"
            />
          </figure>
        </motion.section>

        <motion.section className="availability" {...fadeUp}>
          <p>Available for collaborations!</p>
        </motion.section>
      </main>

      <footer className="page-footer">
        <p>Created by Zainab.</p>
        <p>© 2026 All rights reserved.</p>
      </footer>

      <ScrollTop />
    </div>
  );
}
