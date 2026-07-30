"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageNav from "../components/shared/PageNav";
import PageFooter from "../components/shared/PageFooter";
import ScrollTop from "../components/shared/ScrollTop";
import "../styles/about.css";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

const INTERESTS = [
  "Designing products and experiences",
  "Entrepreneurship and building ideas from scratch",
  "Brand identity and visual storytelling",
  "Research driven problem solving",
  "Photography and documenting moments",
  "Emerging technology and AI",
  "Travel, culture, and everyday observations",
  "Learning new skills simply because they seem interesting",
];

const WAYS_I_WORK = [
  "Design",
  "Product Thinking",
  "Research",
  "Branding",
  "Strategy",
  "Prototyping",
  "Creative Direction",
  "Writing",
  "Experience Design",
];

export default function AboutPage() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(localStorage.getItem("about-theme") === "dark");
  }, []);

  return (
    <div className={`page-about${dark ? " dark-mode" : ""}`}>
      <PageNav storageKey="about-theme" dark={dark} onDarkChange={setDark} />

      <main className="page-shell">
        <motion.section
          className="hero"
          id="top"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <figure className="hero-portrait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/about-assets/portrait-about.jpg" alt="Zainab with a cheetah" />
          </figure>
          <div className="hero-copy">
            <h1>About Me</h1>
            <p className="hero-description">
              I&apos;m Zainab, a multidisciplinary designer and builder with a curiosity that rarely
              stays in one place. My work moves between design, technology, entrepreneurship, and
              storytelling, often beginning with a simple question or an idea I can&apos;t stop
              thinking about. Rather than limiting myself to one discipline, I enjoy exploring
              whatever medium helps bring an idea to life, whether that&apos;s designing digital
              experiences, building products, creating brands, or experimenting with something
              entirely new.
            </p>
            <p className="hero-description hero-description-follow">
              I&apos;ve never believed that learning comes from waiting until you&apos;re ready.
              Most of what I know has come from diving into unfamiliar challenges, figuring things
              out as I go, and letting every iteration teach me something new. For me, every project
              is both an opportunity to create something meaningful and a chance to become a little
              better than I was before.
            </p>
          </div>
        </motion.section>

        <section className="about-grid">
          <motion.article className="about-card about-card-large" {...fadeUp}>
            <p className="section-label">Practice</p>
            <p>
              My work is driven by curiosity more than discipline. Some projects begin with a
              problem worth solving, others with a question that refuses to leave my mind. I enjoy
              moving between design, strategy, technology, branding, research, and product thinking
              because the most interesting ideas rarely belong to a single field.
            </p>
            <p>
              Rather than following a fixed process, I adapt my approach to what each project needs.
              Sometimes that means sketching on paper before touching a screen. Other times it means
              building a prototype, speaking to people, or experimenting until the right solution
              starts to emerge. I see every project as an opportunity to learn through making, not
              just thinking.
            </p>
          </motion.article>

          <motion.article className="about-card" {...fadeUp}>
            <p className="section-label">Interests</p>
            <ul className="detail-list">
              {INTERESTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.article>

          <motion.article className="about-card" {...fadeUp}>
            <p className="section-label">Approach</p>
            <p>
              I do my best work when I have the freedom to explore. I enjoy asking questions before
              searching for answers and experimenting before settling on a solution. I care just as
              much about the process as the final outcome because I believe thoughtful work comes
              from understanding a problem deeply rather than solving it quickly.
            </p>
            <p>
              I like taking ownership, learning as I go, and building alongside people who are
              equally curious. Challenges don&apos;t intimidate me. They&apos;re usually the reason I
              choose a project in the first place.
            </p>
          </motion.article>

          <motion.article className="about-card" {...fadeUp}>
            <p className="section-label">Ways I Work</p>
            <ul className="detail-list ways-list">
              {WAYS_I_WORK.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.article>
        </section>

        <PageFooter />
      </main>

      <ScrollTop />
    </div>
  );
}
