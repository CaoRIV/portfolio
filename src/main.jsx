import React from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import "./styles.css";

const profile = {
  name: "Cao Van Ha",
  role: "AI Engineer",
  tagline: "Building RAG systems, NLP tools, and full-stack AI products for education.",
  location: "Vietnam",
  email: "caov77029@gmail.com",
  availability: "Open to AI engineering internships, research work, and AI product collaboration",
  metrics: [
    { value: "RAG", label: "core focus" },
    { value: "UTC", label: "research context" },
    { value: "25-26", label: "student research" }
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/CaoRIV" },
    { label: "X", href: "https://x.com/Cao744604355049" }
  ],
  traits: [
    "RAG-focused builder",
    "NLP problem solver",
    "Full-stack developer",
    "Research-minded learner"
  ],
  skills: [
    {
      group: "AI & Data",
      items: ["RAG Systems", "LLM Integration", "PhoBERT", "TF-IDF", "Data Mining", "Sentiment Analysis"]
    },
    {
      group: "Full-stack",
      items: ["FastAPI", "Next.js", "React", "Node.js", "WebSocket", "TypeScript"]
    },
    {
      group: "Tools",
      items: ["Python", "Docker", "Redis", "PostgreSQL", "Git", "VS Code"]
    }
  ],
  projects: [
    {
      title: "IT Smart Assistant",
      description:
        "Developing an AI assistant to support lecturers and students at the Faculty of Information Technology for Student Scientific Research 2025-2026 at UTC.",
      stack: "Chatbot AI, RAG architecture, backend development",
      role: "Backend and RAG architecture developer",
      href: "https://github.com/CaoRIV/IT-Smart-Assistant",
      linkLabel: "GitHub"
    },
    {
      title: "MathRAG THPT",
      description:
        "A Vietnamese, source-grounded learning assistant for Grade 12 mathematics and THPT exam preparation, retrieving relevant theory, formulas, examples, and exam material before answering.",
      stack: "FastAPI, React, hybrid retrieval, BM25, FAISS, Ollama",
      role: "RAG learning assistant",
      href: "https://github.com/CaoRIV/MathRAG-THPT",
      linkLabel: "GitHub"
    },
    {
      title: "V-Fashion Insight",
      description:
        "A Vietnamese aspect-based sentiment analysis project for fashion reviews across material, design, size, price, and service, with a reproducible data and evaluation workflow.",
      stack: "Python, Vietnamese NLP, TF-IDF, PhoBERT, Hugging Face",
      role: "NLP and sentiment analysis",
      href: "https://github.com/CaoRIV/V-Fashion-Insight",
      linkLabel: "GitHub"
    },
    {
      title: "AnimalDex",
      description:
        "An AI-powered animal recognition web app that classifies uploaded images, shows confidence scores and species information, and lets users save personal collections.",
      stack: "Next.js, FastAPI, TensorFlow/Keras, Supabase",
      role: "Computer vision product",
      href: "https://github.com/CaoRIV/animal-dex",
      linkLabel: "GitHub"
    }
  ],
  timeline: [
    {
      year: "Year 3",
      title: "Started learning AI",
      body: "Focused on AI engineering foundations, natural language processing, LLM integration, and building practical systems around real user needs."
    },
    {
      year: "2025-26",
      title: "IT Smart Assistant research project",
      body: "Developing backend services and RAG architecture for an AI assistant that supports lecturers and students at UTC's Faculty of Information Technology."
    },
    {
      year: "Now",
      title: "Current focus",
      body: "Exploring AI and LLM integration, educational technology, Vietnamese NLP, sentiment analysis, full-stack development, and data engineering."
    }
  ]
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 92, damping: 20, mass: 0.8 }
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
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
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
  const yA = useTransform(scrollYProgress, [0, 0.38], [0, reduceMotion ? 0 : -46]);
  const yB = useTransform(scrollYProgress, [0, 0.38], [0, reduceMotion ? 0 : 32]);

  return (
    <section id="top" className="hero-section">
      <motion.div className="hero-orbit orbit-one" style={{ y: yA }} />
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
            <strong>Focused on practical AI systems that combine retrieval, language understanding, and reliable backend architecture.</strong>
          </motion.div>
        </motion.div>

        <motion.div
          className="story-stage"
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
          aria-label="AI engineering focus index"
        >
          <div className="stage-toolbar">
            <span>Selected practice</span>
            <span>2026</span>
          </div>
          <motion.div
            className="stage-card stage-card-a"
            animate={reduceMotion ? {} : { y: [0, -6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>01</span>
            <strong>Research</strong>
          </motion.div>
          <motion.div
            className="stage-card stage-card-b"
            animate={reduceMotion ? {} : { y: [0, 7, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>02</span>
            <strong>Systems</strong>
          </motion.div>
          <motion.div
            className="stage-card stage-card-c"
            animate={reduceMotion ? {} : { y: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>03</span>
            <strong>Products</strong>
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
            <span>Applied AI engineering</span>
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
      <SectionIntro label="About" title="Building AI systems for learning and real use.">
        I am {profile.name}, an {profile.role} focused on RAG systems, Vietnamese NLP, AI assistants, and full-stack products that connect data, language models, and useful user experiences.
      </SectionIntro>
      <motion.div
        className="about-note"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        variants={fadeUp}
      >
        <p>Working style</p>
        <strong>Start from the real problem, design the retrieval and data flow, then build the backend and interface that make the assistant useful.</strong>
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
      <SectionIntro label="Skills" title="AI, data, and full-stack tools working together.">
        My skill set connects AI/ML, natural language processing, backend development, real-time applications, and modern frontend stacks.
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
      <SectionIntro label="Work" title="Featured AI work across learning, language, and vision.">
        Selected projects spanning educational assistants, retrieval-augmented generation, Vietnamese NLP, sentiment analysis, and computer vision products.
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
                  <a className="project-link" href={project.href} target="_blank" rel="noreferrer">
                    {project.linkLabel || "Project link"}
                  </a>
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
      <SectionIntro label="Timeline" title="The path into AI engineering.">
        A focused path through AI learning, research work, and applied projects in NLP, RAG, and full-stack development.
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
    setStatus("Thanks for the message. You can also reach me directly by email.");
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
        <h2>Want to build an AI assistant or data-driven product?</h2>
        <p>
          I am open to AI engineering internships, research collaboration, and projects around RAG systems, NLP, educational technology, and full-stack AI products.
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
              <a href={social.href} key={social.label} target="_blank" rel="noreferrer">
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
