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

export function Credentials() {
  return (
    <section id="credentials" className="section-shell credentials-section">
      <motion.div
        className="credentials-intro"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={reveal}
      >
        <div>
          <p className="section-index">03 / Credentials</p>
          <h2>Verified learning,<br />kept in context.</h2>
        </div>
        <p>Course and specialization credentials support the work; shipped systems remain the primary proof.</p>
      </motion.div>

      <div className="credentials-registry">
        {profile.credentials.map((credential, index) => (
          <motion.a
            href={credential.href}
            className="credential-row"
            target="_blank"
            rel="noreferrer"
            aria-label={`Verify ${credential.title} credential from ${credential.issuer}`}
            key={credential.credentialId}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={reveal}
            transition={{ delay: index * 0.05 }}
          >
            <span className="credential-index">{credential.index}</span>
            <div className="credential-name">
              <p>{credential.type} / {credential.issuer}</p>
              <h3>{credential.title}</h3>
            </div>
            <div className="credential-scope">
              <small>Focus</small>
              <p>{credential.focus.join(" / ")}</p>
            </div>
            <div className="credential-proof">
              <span className="credential-status"><i aria-hidden="true" /> Verified</span>
              <time dateTime={credential.issuedISO}>{credential.issued}</time>
              <small>{credential.credentialId}</small>
              <strong>Verify credential <span aria-hidden="true">↗</span></strong>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
