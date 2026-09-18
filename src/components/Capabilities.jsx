import React from "react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { reveal, viewport } from "../animation";

export function Capabilities() {
  return (
    <section id="capabilities" className="section-shell capabilities-section">
      <motion.div
        className="capabilities-intro"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={reveal}
      >
        <div>
          <p className="section-index">02 / Capabilities</p>
          <h2>Technical depth,<br />connected.</h2>
        </div>
        <p>Capabilities are tied to working systems—not detached technology labels.</p>
      </motion.div>

      <div className="capability-matrix">
        {profile.capabilities.map((capability, index) => (
          <motion.a
            href={`#${capability.projectId}`}
            className="capability-row"
            key={capability.title}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            transition={{ delay: index * 0.04 }}
          >
            <span>{capability.index}</span>
            <h3>{capability.title}</h3>
            <p>{capability.tools}</p>
            <strong>{capability.evidence} <span aria-hidden="true">→</span></strong>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
