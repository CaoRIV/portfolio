import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";

const links = [
  { id: "work", label: "Work" },
  { id: "capabilities", label: "Capabilities" },
  { id: "credentials", label: "Credentials" },
  { id: "changelog", label: "Changelog" },
  { id: "contact", label: "Contact" }
];

export function Nav() {
  const [activeSection, setActiveSection] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = ["top", ...links.map((link) => link.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-16% 0px -68% 0px", threshold: [0, 0.05, 0.2, 0.5] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <motion.header
      className="nav-shell"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className="brand" href="#top" aria-label="Cao Van Ha, back to top">
        <span className="brand-mark">CVH</span>
        <span className="brand-name">{profile.name}</span>
        <span className="brand-role">/ {profile.role}</span>
      </a>

      <nav id="mobile-navigation" className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
        {links.map((link, index) => (
          <a
            href={`#${link.id}`}
            aria-current={activeSection === link.id ? "page" : undefined}
            key={link.id}
            onClick={() => setMenuOpen(false)}
          >
            <small>{String(index + 1).padStart(2, "0")}</small>
            {link.label}
          </a>
        ))}
      </nav>

      <a className="nav-status" href={`mailto:${profile.email}`}>
        <span aria-hidden="true" />
        {profile.availability}
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>
    </motion.header>
  );
}
