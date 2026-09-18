import React from "react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { reveal } from "../animation";

const nodes = [
  { className: "system-node-a", code: "01 / INPUT", label: "Knowledge" },
  { className: "system-node-b", code: "02 / SEARCH", label: "Retrieval" },
  { className: "system-node-c", code: "03 / CONTEXT", label: "Grounding" },
  { className: "system-node-d", code: "04 / CHECK", label: "Evaluation" },
  { className: "system-node-e", code: "05 / OUTPUT", label: "Product" }
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
            <svg viewBox="0 0 500 420" preserveAspectRatio="none" aria-hidden="true">
              <path d="M92 118 C150 118 174 190 250 206" />
              <path d="M408 118 C350 118 326 190 250 206" />
              <path className="signal-path" d="M250 217 L250 287" />
              <path d="M250 323 C195 340 150 352 92 357" />
              <path d="M250 323 C305 340 350 352 408 357" />
            </svg>
            {nodes.map((node, index) => (
              <motion.div
                className={`system-node ${node.className}`}
                key={node.label}
                animate={reduceMotion ? {} : { y: [0, index % 2 ? 4 : -4, 0] }}
                transition={{ duration: 5.5 + index * 0.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <small>{node.code}</small>
                <strong>{node.label}</strong>
              </motion.div>
            ))}
            <motion.div
              className="system-core"
              animate={reduceMotion ? {} : { boxShadow: ["0 0 0 8px rgba(197,244,93,.06)", "0 0 0 14px rgba(197,244,93,.015)", "0 0 0 8px rgba(197,244,93,.06)"] }}
              transition={{ duration: 3.2, repeat: Infinity }}
            >
              AI
            </motion.div>
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
