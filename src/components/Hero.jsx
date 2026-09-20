import React from "react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { reveal } from "../animation";

const stages = [
  { code: "01", eyebrow: "Input", label: "Knowledge", state: "indexed" },
  { code: "02", eyebrow: "Search", label: "Retrieval", state: "matched" },
  { code: "03", eyebrow: "Context", label: "Grounding", state: "active" },
  { code: "04", eyebrow: "Check", label: "Evaluation", state: "verified" },
  { code: "05", eyebrow: "Output", label: "Product", state: "ready" }
];

export function Hero({ reduceMotion }) {
  return (
    <section id="top" className="hero-section">
      <div className="hero-grid">
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }}
        >
          <motion.p className="hero-eyebrow" variants={reveal}>
            <span>01</span> Developer systems portfolio / 2026
          </motion.p>
          <motion.h1 variants={reveal} aria-label="I build grounded AI systems">
            <span>I build</span>
            <span className="outline-text">grounded</span>
            <span className="signal-text">AI systems.</span>
          </motion.h1>
          <motion.div className="hero-summary" variants={reveal}>
            <p>{profile.statement}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                View deployments <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-secondary" href={`mailto:${profile.email}`}>
                Contact <span aria-hidden="true">→</span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.aside
          className="system-panel"
          aria-label="Applied AI system map"
          initial={{ opacity: 0, scale: 0.98, x: 18 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="system-panel-head">
            <span>System / online</span>
            <span>cvh-core-01</span>
          </div>
          <div className="system-map">
            <div className="system-trace-head">
              <span>Live execution trace</span>
              <div className="trace-wave" aria-hidden="true">
                {Array.from({ length: 10 }, (_, index) => <i key={index} />)}
              </div>
            </div>
            <div className="system-stage-list">
              <motion.span
                className="system-packet"
                aria-hidden="true"
                animate={reduceMotion ? {} : { y: [0, 228] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "linear" }}
              />
              {stages.map((stage, index) => (
                <motion.div
                  className={["system-stage", index === 0 && "system-node-a", index === 2 && "is-active"].filter(Boolean).join(" ")}
                  key={stage.label}
                  animate={reduceMotion || index !== 0 ? {} : { y: [0, -2, 0] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <small className="stage-code">{stage.code}</small>
                  <span className="stage-marker" aria-hidden="true" />
                  <span className="stage-copy">
                    <small>{stage.eyebrow}</small>
                    <strong>{stage.label}</strong>
                  </span>
                  <small className="stage-state">{stage.state}</small>
                </motion.div>
              ))}
            </div>
            <div className="system-result">
              <span><i aria-hidden="true" /> Trace complete</span>
              <strong>Context retained → answer grounded</strong>
            </div>
          </div>
          <div className="system-telemetry">
            <div><small>Focus</small><strong>RAG / NLP</strong></div>
            <div><small>Systems</small><strong>04 selected</strong></div>
            <div><small>Status</small><strong className="is-online">Operational</strong></div>
          </div>
        </motion.aside>
      </div>

      <motion.div className="deployment-strip" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.72 }}>
        <span>{profile.location} / {profile.timezone}</span>
        <span className="latest-deployment">Latest deployment / {profile.current}</span>
        <span>{profile.handle} ready</span>
      </motion.div>
    </section>
  );
}
