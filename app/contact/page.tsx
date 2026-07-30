"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageNav from "../components/shared/PageNav";
import PageFooter from "../components/shared/PageFooter";
import ScrollTop from "../components/shared/ScrollTop";
import "../styles/contact.css";

const LINKEDIN_URL = "https://www.linkedin.com/in/zainab-ezzi-2669372a2/";
const CONTACT_EMAIL = "ezzizainab16@gmail.com";

const ICE_CREAM_FRAMES = [
  "/contact/ice-cream/frame-0.png",
  "/contact/ice-cream/frame-1.png",
  "/contact/ice-cream/frame-2.png",
  "/contact/ice-cream/frame-3.png",
  "/contact/ice-cream/frame-4.png",
];

const FRAME_MS = 800;

function IceCreamAnim() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ICE_CREAM_FRAMES.length);
    }, FRAME_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="feature-media ice-cream-anim" aria-hidden>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.img
          key={ICE_CREAM_FRAMES[index]}
          src={ICE_CREAM_FRAMES[index]}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        />
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const [dark, setDark] = useState(false);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  useEffect(() => {
    setDark(localStorage.getItem("contact-theme") === "dark");
  }, []);

  useEffect(() => {
    if (!qrOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setQrOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [qrOpen]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();

    setSending(true);
    setStatus("Sending…");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          _subject: subject ? `Portfolio contact: ${subject}` : "New message from portfolio",
          _template: "table",
          _captcha: "false",
        }),
      });

      const result = (await response.json()) as { success?: string | boolean; message?: string };

      if (!response.ok || result.success === "false" || result.success === false) {
        throw new Error(result.message || "Could not send message.");
      }

      setStatus(
        `Thanks ${name || "there"} — your message is on its way to ${CONTACT_EMAIL}.`,
      );
      form.reset();
    } catch {
      setStatus(
        `Something went wrong. Please email me directly at ${CONTACT_EMAIL}.`,
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={`page-contact${dark ? " dark-mode" : ""}`}>
      <PageNav storageKey="contact-theme" dark={dark} onDarkChange={setDark} />

      <main className="page-shell">
        <motion.section
          className="hero"
          id="top"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="hero-copy">
            <h1>Contact</h1>
            <p className="hero-description">
              For collaborations, projects, or just to reach out, use the form below or contact me
              directly.
            </p>
          </div>
        </motion.section>

        <section className="contact-layout">
          <aside className="contact-details">
            <article className="feature-card">
              <IceCreamAnim />
              <div className="feature-copy">
                <p className="detail-label">Support?</p>
                <h2>Buy me an Ice-Cream!</h2>
                <p className="detail-text">
                  If you like the work and want to support future projects, you can buy me an
                  Ice-cream, Diet coke or anything else too.
                </p>
                <button
                  className="support-link"
                  type="button"
                  aria-label="Buy me an Ice cream"
                  onClick={() => setQrOpen(true)}
                >
                  Buy me an Ice cream
                </button>
              </div>
            </article>
          </aside>

          <section className="contact-panel">
            <div className="panel-copy">
              <h2>Send a message</h2>
            </div>

            <form className="contact-form" onSubmit={onSubmit}>
              <label className="field">
                <span>Name</span>
                <input type="text" name="name" placeholder="Your name" required />
              </label>
              <label className="field">
                <span>Email</span>
                <input type="email" name="email" placeholder="your@email.com" required />
              </label>
              <label className="field">
                <span>Subject</span>
                <input
                  type="text"
                  name="subject"
                  placeholder="Project, commission, collaboration..."
                  required
                />
              </label>
              <label className="field field-full">
                <span>Message</span>
                <textarea
                  name="message"
                  rows={7}
                  placeholder="Tell me a little about what you have in mind."
                  required
                />
              </label>
              <div className="form-actions">
                <button className="submit-button" type="submit" disabled={sending}>
                  {sending ? "Sending…" : "Send Message"}
                </button>
                <p className="form-status" aria-live="polite">
                  {status}
                </p>
              </div>
            </form>

            <section className="contact-direct" aria-label="Direct contact details">
              <article className="detail-card">
                <p className="detail-label">Email</p>
                <a className="detail-link" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
              </article>
              <article className="detail-card">
                <p className="detail-label">Phone</p>
                <a className="detail-link" href="tel:+919175952153">
                  +91 9175952153
                </a>
              </article>
              <article className="detail-card">
                <p className="detail-label">LinkedIn</p>
                <a className="detail-link" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                  linkedin.com/in/zainab-ezzi
                </a>
              </article>
              <article className="detail-card">
                <p className="detail-label">Location</p>
                <p className="detail-text">Pune, Maharashtra, India</p>
              </article>
            </section>
          </section>
        </section>

        <PageFooter />
      </main>

      <ScrollTop />

      <div className={`qr-modal${qrOpen ? " is-open" : ""}`} aria-hidden={!qrOpen}>
        <div className="qr-modal-backdrop" onClick={() => setQrOpen(false)} />
        <div
          className="qr-modal-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="qr-modal-title"
        >
          <button
            className="qr-modal-close"
            type="button"
            aria-label="Close QR code"
            onClick={() => setQrOpen(false)}
          >
            ×
          </button>
          <p className="detail-label">Support</p>
          <h2 id="qr-modal-title">Buy me an Ice cream</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/contact/upi-qr.png"
            alt="UPI QR code for Zainab Ezzi"
            className="qr-modal-image"
          />
          <p className="qr-modal-upi">UPI ID: ezzizainab16@okhdfcbank</p>
          <p className="qr-modal-hint">Scan to pay with any UPI app</p>
        </div>
      </div>
    </div>
  );
}
