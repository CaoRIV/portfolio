import React from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import "./styles.css";

const profile = {
  name: "[YOUR NAME]",
  role: "[YOUR ROLE]",
  tagline: "[YOUR TAGLINE]",
  location: "[YOUR LOCATION]",
  email: "[YOUR EMAIL]",
  availability: "Available for select product and portfolio work",
  metrics: [
    { value: "03", label: "launch modes" },
    { value: "14+", label: "interaction states" },
    { value: "0.7s", label: "motion rhythm" }
  ],
  socials: [
    { label: "GitHub", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Social", href: "#" }
  ],
  traits: [
    "Systems thinker",
    "Motion-minded builder",
    "Calm collaborator",
    "Prototype to polish"
  ],
  skills: [
    {
      group: "Product",
      items: ["Discovery", "UX strategy", "Story mapping", "Design systems"]
    },
    {
      group: "Frontend",
      items: ["React", "Next.js", "Animation", "Accessibility"]
    },
    {
      group: "Craft",
      items: ["Micro-interactions", "Performance", "Visual QA", "Responsive UI"]
    }
  ],
  projects: [
    {
      title: "[PROJECT ONE]",
      description:
        "An immersive launch experience that turns product complexity into a clear, tactile scroll story.",
      stack: "React, Framer Motion, CMS",
      role: "Lead design engineer",
      href: "#"
    },
    {
      title: "[PROJECT TWO]",
      description:
        "A polished analytics workspace with fast interactions, focused hierarchy, and delightful state transitions.",
      stack: "Next.js, TypeScript, API design",
      role: "Frontend architect",
      href: "#"
    },
    {
      title: "[PROJECT THREE]",
      description:
        "A brand-forward portfolio system built around editorial pacing, reusable content blocks, and smooth reveals.",
      stack: "React, CSS, Motion",
      role: "Creative developer",
      href: "#"
    }
  ],
  timeline: [
    {
      year: "2026",
      title: "[CURRENT ROLE]",
      body: "Designing and shipping thoughtful digital experiences with a focus on story, interaction, and performance."
    },
    {
      year: "2024",
      title: "[MILESTONE]",
      body: "Led a cross-functional project from early concept through launch, turning ambiguity into a confident product."
    },
    {
      year: "2022",
      title: "[EDUCATION OR EXPERIENCE]",
      body: "Built the foundation across engineering, design craft, research, and communication."
    }
  ]
};

const fadeUp = {
  hidden: { opacity: 0, y: 34, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] }
  }
};

function getInitials(name) {
  const clean = name.replace(/\[|\]/g, "").trim();
  return clean
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "YN";
}

function App() {
  const reduceMotion = useReducedMotion();

  return (
    <main>
      <Nav />
      <Hero reduceMotion={reduceMotion} />
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Contact />
    </main>
  );
}

function Nav() {
  return (
    <motion.nav
      className="nav-shell"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <a className="brand-mark" href="#top" aria-label="Go to top">
        {getInitials(profile.name)}
      </a>
      <div className="nav-links" aria-label="Primary navigation">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Work</a>
        <a href="#contact">Contact</a>
      </div>
    </motion.nav>
  );
}

function Hero({ reduceMotion }) {
  const { scrollYProgress } = useScroll();
  const yA = useTransform(scrollYProgress, [0, 0.38], [0, reduceMotion ? 0 : -110]);
  const yB = useTransform(scrollYProgress, [0, 0.38], [0, reduceMotion ? 0 : 90]);
  const rotate = useTransform(scrollYProgress, [0, 0.35], [0, reduceMotion ? 0 : 18]);

  return (
    <section id="top" className="hero-section">
      <motion.div className="hero-orbit orbit-one" style={{ y: yA, rotate }} />
      <motion.div className="hero-orbit orbit-two" style={{ y: yB }} />
      <div className="hero-grid">
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } }
          }}
        >
          <motion.p className="hero-kicker" variants={fadeUp}>
            {profile.availability}
          </motion.p>
          <motion.h1 variants={fadeUp}>
            {profile.name}
            <span>{profile.role}</span>
          </motion.h1>
          <motion.p className="hero-tagline" variants={fadeUp}>
            {profile.tagline || "I turn complex ideas into expressive, useful digital experiences."}
          </motion.p>
          <motion.div className="hero-actions" variants={fadeUp}>
            <a className="button primary" href="#projects">
              View Work
            </a>
            <a className="button secondary" href="#contact">
              Contact Me
            </a>
          </motion.div>
          <motion.div className="hero-note" variants={fadeUp}>
            <span>Based in {profile.location}</span>
            <strong>Built for clear stories, refined interfaces, and useful motion.</strong>
          </motion.div>
        </motion.div>

        <motion.div
          className="story-stage"
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Abstract interactive portfolio scene"
        >
          <div className="stage-toolbar">
            <span />
            <span />
            <span />
          </div>
          <motion.div
            className="stage-card stage-card-a"
            animate={reduceMotion ? {} : { y: [0, -14, 0], rotate: [-2, 1, -2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>01</span>
            <strong>Frame</strong>
          </motion.div>
          <motion.div
            className="stage-card stage-card-b"
            animate={reduceMotion ? {} : { y: [0, 18, 0], rotate: [3, -1, 3] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>02</span>
            <strong>Make</strong>
          </motion.div>
          <motion.div
            className="stage-card stage-card-c"
            animate={reduceMotion ? {} : { y: [0, -10, 0], x: [0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>03</span>
            <strong>Learn</strong>
          </motion.div>
          <div className="stage-path" />
          <div className="stage-map">
            {profile.metrics.map((metric) => (
              <span key={metric.label}>
                <strong>{metric.value}</strong>
                {metric.label}
              </span>
            ))}
          </div>
          <div className="stage-core">
            <span>Living portfolio system</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionIntro({ label, title, children }) {
  return (
    <motion.div
      className="section-intro"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      variants={fadeUp}
    >
      <p className="section-label">{label}</p>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </motion.div>
  );
}

function About() {
  return (
    <section id="about" className="content-section about-section">
      <SectionIntro label="About" title="A portfolio that unfolds like a working process.">
        I am {profile.name}, a {profile.role} who blends product thinking, frontend craft, and motion design to make digital work feel clear, alive, and memorable.
      </SectionIntro>
      <motion.div
        className="about-note"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        variants={fadeUp}
      >
        <p>Working style</p>
        <strong>Start with the human signal, then shape the interface until every transition, word, and state earns its place.</strong>
      </motion.div>
      <div className="trait-grid">
        {profile.traits.map((trait, index) => (
          <motion.article
            className="trait-tile"
            key={trait}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.45 }}
            variants={fadeUp}
            transition={{ delay: index * 0.08 }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{trait}</h3>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="content-section skills-section">
      <SectionIntro label="Skills" title="A connected skill system, not a checklist.">
        The work moves across strategy, interface systems, code, and motion so ideas can travel from rough sketch to polished launch.
      </SectionIntro>
      <div className="skill-map">
        {profile.skills.map((skill, index) => (
          <motion.article
            className="skill-cluster"
            key={skill.group}
            initial={{ opacity: 0, y: 44, rotate: index % 2 ? 2 : -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.72, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3>{skill.group}</h3>
            <div>
              {skill.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="content-section projects-section">
      <SectionIntro label="Work" title="Featured projects with room for story and texture.">
        Replace these project placeholders with your strongest case studies, live links, and measurable outcomes.
      </SectionIntro>
      <div className="project-stack">
        {profile.projects.map((project, index) => (
          <motion.article
            className="project-panel"
            key={project.title}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="project-art" aria-hidden="true">
              <div className="art-window" />
              <div className="art-line line-a" />
              <div className="art-line line-b" />
              <div className="art-chip" />
            </div>
            <div className="project-copy">
              <p>{project.role}</p>
              <h3>{project.title}</h3>
              <span>{project.description}</span>
              <div className="project-meta">
                <strong>{project.stack}</strong>
                {project.href === "#" ? (
                  <span className="project-link is-disabled">Case study soon</span>
                ) : (
                  <a className="project-link" href={project.href}>Project link</a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="content-section timeline-section">
      <SectionIntro label="Timeline" title="Milestones that shaped the way I build.">
        A focused path through education, work, launches, and the moments that sharpened the craft.
      </SectionIntro>
      <div className="timeline">
        {profile.timeline.map((item, index) => (
          <motion.article
            className="timeline-item"
            key={`${item.year}-${item.title}`}
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <time>{item.year}</time>
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("Message drafted. Replace this with your email or form service when you connect the site.");
  };

  return (
    <section id="contact" className="contact-section">
      <motion.div
        className="contact-card"
        initial={{ opacity: 0, y: 44, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="section-label">Contact</p>
        <h2>Have a story worth shaping into something people can use?</h2>
        <p>
          I am open to thoughtful collaborations, design engineering roles, and polished product work that needs both clarity and feeling.
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" placeholder="Your name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" required />
          </label>
          <label>
            Message
            <textarea name="message" placeholder="Tell me what you are building" rows="4" required />
          </label>
          <button className="button primary" type="submit">
            Send Message
          </button>
          {status && <p className="form-status" role="status">{status}</p>}
        </form>
        <div className="contact-links">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          {profile.socials.map((social) => (
            social.href === "#" ? (
              <span className="contact-link is-disabled" key={social.label}>{social.label}</span>
            ) : (
              <a href={social.href} key={social.label}>
                {social.label}
              </a>
            )
          ))}
        </div>
      </motion.div>
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);
