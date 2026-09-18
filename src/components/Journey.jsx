import React, { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { reveal, viewport } from "../animation";

export function Method() {
  return (
    <section id="method" className="section-shell method-section">
      <motion.div
        className="method-intro"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={reveal}
      >
        <div>
          <p className="section-index">03 / Operating model</p>
          <h2>Build with<br />evidence.</h2>
        </div>
        <p>A compact method for joining user needs, retrieval, models, interface, and evaluation into one dependable product flow.</p>
      </motion.div>

      <div className="method-track">
        {profile.process.map((step, index) => (
          <motion.article
            className="method-step"
            key={step.index}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            transition={{ delay: index * 0.06 }}
          >
            <span>{step.index} / {step.label}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function Changelog() {
  return (
    <section id="changelog" className="section-shell changelog-section">
      <motion.div
        className="changelog-copy"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={reveal}
      >
        <p className="section-index">04 / Changelog</p>
        <h2>A focused path into applied AI.</h2>
        <p>Progress measured through increasingly complete systems rather than disconnected experiments.</p>
      </motion.div>

      <div className="changelog-list">
        {profile.timeline.map((item, index) => (
          <motion.article
            className="changelog-row"
            key={`${item.year}-${item.title}`}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            transition={{ delay: index * 0.05 }}
          >
            <time>{item.year}</time>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </motion.article>
        ))}
        <p className="changelog-command" aria-hidden="true">{profile.handle} latest --verbose</p>
      </div>
    </section>
  );
}

export function Contact() {
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const company = String(data.get("company") || "").trim();

    if (!name || !email || !message) {
      setStatus({ type: "error", message: "Complete all fields before sending." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: "error", message: "Enter a valid email address." });
      return;
    }

    setStatus({ type: "pending", message: "Transmitting your message…" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company })
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus({
          type: "error",
          message: typeof result.error === "string" && result.error.trim()
            ? result.error
            : "Message could not be sent. Please use the direct email link."
        });
        return;
      }
      if (typeof result.message !== "string" || !result.message.trim()) {
        setStatus({ type: "error", message: "Delivery could not be confirmed. Please use the direct email link." });
        return;
      }

      form.reset();
      setStatus({ type: "success", message: result.message });
    } catch {
      setStatus({ type: "error", message: "Message could not be sent. Please use the direct email link." });
    }
  };

  return (
    <section id="contact" className="contact-section">
      <motion.div
        className="contact-shell"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
        variants={reveal}
      >
        <div className="contact-heading">
          <p>05 / Open channel <span>{profile.location} / {profile.timezone}</span></p>
          <h2>Let’s ship<br />something <span>useful.</span></h2>
        </div>

        <div className="contact-grid">
          <div className="contact-details">
            <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email} <span aria-hidden="true">↗</span></a>
            <div className="contact-meta">
              <div><small>Availability</small><strong className="status-online">{profile.availability}</strong></div>
              <div><small>Focus</small><strong>RAG / NLP / AI products</strong></div>
            </div>
            <div className="contact-socials">
              {profile.socials.map((social) => (
                <a href={social.href} target="_blank" rel="noreferrer" key={social.label}>{social.label} ↗</a>
              ))}
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <label>Name<input name="name" type="text" autoComplete="name" placeholder="Your name" maxLength="80" /></label>
              <label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength="160" /></label>
            </div>
            <label>Project or idea<textarea name="message" rows="5" placeholder="Tell me what you are building" maxLength="4000" /></label>
            <label className="honeypot" aria-hidden="true">Company<input name="company" type="text" tabIndex={-1} autoComplete="off" /></label>
            <div className="form-action">
              <button className="button button-primary" type="submit" disabled={status.type === "pending"}>{status.type === "pending" ? "Transmitting" : "Send message"} <span aria-hidden="true">↗</span></button>
              {status.message && (
                <p className={`form-status is-${status.type}`} role={status.type === "error" ? "alert" : "status"}>{status.message}</p>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <span>{profile.name} / {profile.role}</span>
      <span>{profile.handle} build --production</span>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
