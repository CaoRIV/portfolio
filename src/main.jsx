import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, useReducedMotion } from "framer-motion";
import "./styles.css";

const profile = {
  name: "Cao Van Ha",
  role: "AI Engineer",
  eyebrow: "AI engineering / RAG / Vietnamese NLP",
  statement:
    "I design and build AI systems that turn complex knowledge into useful, grounded products.",
  location: "Vietnam",
  email: "caov77029@gmail.com",
  availability: "Open to internships, research, and AI product collaboration",
  practice: [
    "RAG architecture",
    "Vietnamese NLP",
    "AI product engineering",
    "Full-stack delivery"
  ],
  metrics: [
    { value: "RAG", label: "core system" },
    { value: "NLP", label: "language layer" },
    { value: "04", label: "selected projects" }
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/CaoRIV" },
    { label: "X", href: "https://x.com/Cao744604355049" }
  ],
  projects: [
    {
      title: "IT Smart Assistant",
      category: "Education / RAG",
      outcome: "Faculty-grounded answers",
      description:
        "Developing an AI assistant to support lecturers and students at the Faculty of Information Technology for Student Scientific Research 2025-2026 at UTC.",
      stack: "Chatbot AI, RAG architecture, backend development",
      role: "Backend and RAG architecture developer",
      href: "https://github.com/CaoRIV/IT-Smart-Assistant",
      linkLabel: "View on GitHub",
      visual: {
        code: "RAG-01",
        label: "Assistant pipeline",
        flow: ["Student question", "FastAPI backend", "RAG retrieval", "Grounded answer"]
      }
    },
    {
      title: "MathRAG THPT",
      category: "Learning / Retrieval",
      outcome: "Source-grounded math support",
      description:
        "A Vietnamese, source-grounded learning assistant for Grade 12 mathematics and THPT exam preparation, retrieving relevant theory, formulas, examples, and exam material before answering.",
      stack: "FastAPI, React, hybrid retrieval, BM25, FAISS, Ollama",
      role: "RAG learning assistant",
      href: "https://github.com/CaoRIV/MathRAG-THPT",
      linkLabel: "View on GitHub",
      visual: {
        code: "RAG-02",
        label: "Math retrieval",
        flow: ["Math question", "Hybrid search", "Formula context", "Explained answer"]
      }
    },
    {
      title: "V-Fashion Insight",
      category: "Vietnamese NLP",
      outcome: "Five-aspect classification",
      description:
        "A Vietnamese aspect-based sentiment analysis project for fashion reviews across material, design, size, price, and service, with a reproducible data and evaluation workflow.",
      stack: "Python, Vietnamese NLP, TF-IDF, PhoBERT, Hugging Face",
      role: "NLP and sentiment analysis",
      href: "https://github.com/CaoRIV/V-Fashion-Insight",
      linkLabel: "View on GitHub",
      visual: {
        code: "NLP-03",
        label: "Review analysis",
        flow: ["Fashion review", "Text features", "Aspect model", "Sentiment labels"]
      }
    },
    {
      title: "AnimalDex",
      category: "Computer Vision",
      outcome: "Prediction with confidence",
      description:
        "An AI-powered animal recognition web app that classifies uploaded images, shows confidence scores and species information, and lets users save personal collections.",
      stack: "Next.js, FastAPI, TensorFlow/Keras, Supabase",
      role: "Computer vision product",
      href: "https://github.com/CaoRIV/animal-dex",
      linkLabel: "View on GitHub",
      visual: {
        code: "CV-04",
        label: "Vision pipeline",
        flow: ["Image upload", "TensorFlow model", "Species profile", "Saved collection"]
      }
    }
  ],
  process: [
    {
      number: "01",
      title: "Discover",
      body: "Clarify the user problem, available knowledge, and what a trustworthy answer must contain."
    },
    {
      number: "02",
      title: "Design",
      body: "Shape retrieval, model, data, and interface decisions into one testable system."
    },
    {
      number: "03",
      title: "Build",
      body: "Implement the backend, evaluation flow, and product surface as a coherent delivery."
    },
    {
      number: "04",
      title: "Validate",
      body: "Test answer quality, failure cases, usability, and operational behavior before iteration."
    }
  ],
  skills: [
    {
      group: "AI & Data",
      items: ["RAG Systems", "LLM Integration", "PhoBERT", "TF-IDF", "Data Mining", "Sentiment Analysis"]
    },
    {
      group: "Product Engineering",
      items: ["FastAPI", "Next.js", "React", "Node.js", "WebSocket", "TypeScript"]
    },
    {
      group: "Infrastructure",
      items: ["Python", "Docker", "Redis", "PostgreSQL", "Git", "Supabase"]
    }
  ],
  timeline: [
    {
      year: "Year 3",
      title: "Started learning AI",
      body: "Focused on AI engineering foundations, natural language processing, LLM integration, and practical systems built around real user needs."
    },
    {
      year: "2025-26",
      title: "IT Smart Assistant research project",
      body: "Developing backend services and RAG architecture for an assistant supporting lecturers and students at UTC's Faculty of Information Technology."
    },
    {
      year: "Now",
      title: "Current focus",
      body: "Exploring AI and LLM integration, educational technology, Vietnamese NLP, sentiment analysis, full-stack development, and data engineering."
    }
  ]
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] }
  }
};

function App() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav />
      <main id="main-content" tabIndex="-1">
        <Hero reduceMotion={reduceMotion} />
        <PracticeStrip />
        <Projects />
        <Process />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Nav() {
  const [activeSection, setActiveSection] = useState("top");
  const links = [
    { id: "work", label: "Work" },
    { id: "process", label: "Process" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" }
  ];

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
      { rootMargin: "-18% 0px -68% 0px", threshold: [0.04, 0.2, 0.5] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      className="nav-shell"
      aria-label="Primary navigation"
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className="brand-mark" href="#top" aria-label="Go to top">CVH <span>/ AI</span></a>
      <div className="nav-links">
        {links.map((link) => (
          <a
            href={`#${link.id}`}
            aria-current={activeSection === link.id ? "page" : undefined}
            key={link.id}
          >
            {link.label}
          </a>
        ))}
      </div>
      <a className="nav-cta" href={`mailto:${profile.email}`}>Start a conversation</a>
    </motion.nav>
  );
}

function Hero({ reduceMotion }) {
  const nodes = [
    { className: "system-node-a", number: "01", label: "Knowledge" },
    { className: "system-node-b", number: "02", label: "Retrieval" },
    { className: "system-node-c", number: "03", label: "Interface" }
  ];

  return (
    <section id="top" className="hero-section">
      <div className="hero-grid">
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } } }}
        >
          <motion.p className="hero-eyebrow" variants={fadeUp}>{profile.eyebrow}</motion.p>
          <motion.h1 variants={fadeUp}>{profile.name}<span>{profile.role}</span></motion.h1>
          <motion.p className="hero-statement" variants={fadeUp}>{profile.statement}</motion.p>
          <motion.div className="hero-actions" variants={fadeUp}>
            <a className="button button-primary" href="#work">Explore selected work <span aria-hidden="true">&#8599;</span></a>
            <a className="button button-quiet" href={`mailto:${profile.email}`}>Email me</a>
          </motion.div>
          <motion.div className="hero-meta" variants={fadeUp}>
            <span>Based in {profile.location}</span>
            <span>{profile.availability}</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-system"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Applied AI engineering system"
        >
          <div className="system-topline"><span>System map / 2026</span><span>Applied intelligence</span></div>
          <div className="system-connectors" aria-hidden="true" />
          {nodes.map((node, index) => (
            <motion.div
              className={`system-node ${node.className}`}
              key={node.label}
              animate={reduceMotion ? {} : { y: [0, index % 2 ? 7 : -7, 0] }}
              transition={{ duration: 5.6 + index, repeat: Infinity, ease: "easeInOut" }}
            >
              <span>{node.number}</span><strong>{node.label}</strong>
            </motion.div>
          ))}
          <div className="system-core"><span>Grounded</span><strong>AI</strong></div>
          <div className="system-metrics">
            {profile.metrics.map((metric) => (
              <span key={metric.label}><strong>{metric.value}</strong>{metric.label}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PracticeStrip() {
  return (
    <section className="practice-strip" aria-label="Core practice">
      <span className="practice-label">Current practice</span>
      {profile.practice.map((item, index) => (
        <span className="practice-item" key={item}><small>{String(index + 1).padStart(2, "0")}</small>{item}</span>
      ))}
    </section>
  );
}

function SectionHeader({ label, title, children }) {
  return (
    <motion.header className="section-header" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }} variants={fadeUp}>
      <p>{label}</p><h2>{title}</h2>{children && <span>{children}</span>}
    </motion.header>
  );
}

function ProjectCaseStudy({ project, index }) {
  return (
    <motion.article
      className={`project-case ${index % 2 ? "is-reversed" : ""}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      variants={fadeUp}
    >
      <div className="project-visual" role="img" aria-label={`${project.title} technical flow: ${project.visual.flow.join(" to ")}`}>
        <div className="project-visual-head"><span>{project.visual.code}</span><strong>{project.visual.label}</strong></div>
        <div className="project-flow">
          {project.visual.flow.map((step, stepIndex) => (
            <div className="flow-node" key={step}><small>{String(stepIndex + 1).padStart(2, "0")}</small><strong>{step}</strong></div>
          ))}
        </div>
        <div className="project-output"><span>Outcome</span><strong>{project.outcome}</strong></div>
      </div>
      <div className="project-copy">
        <div className="project-index"><span>{String(index + 1).padStart(2, "0")}</span><span>{project.category}</span></div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <dl className="project-details">
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>Stack</dt><dd>{project.stack}</dd></div>
        </dl>
        <a className="project-link" href={project.href} target="_blank" rel="noreferrer">{project.linkLabel} <span aria-hidden="true">&#8599;</span></a>
      </div>
    </motion.article>
  );
}

function Projects() {
  return (
    <section id="work" className="section-shell work-section">
      <SectionHeader label="Selected work" title="Systems built for real questions.">Four projects across educational retrieval, Vietnamese language understanding, and computer vision.</SectionHeader>
      <div className="project-list">{profile.projects.map((project, index) => <ProjectCaseStudy project={project} index={index} key={project.title} />)}</div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="section-shell process-section">
      <SectionHeader label="Process" title="From uncertain idea to testable system.">A practical framework for turning data, models, and user needs into one dependable product flow.</SectionHeader>
      <div className="process-grid">
        {profile.process.map((step, index) => (
          <motion.article className="process-step" key={step.number} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp} transition={{ delay: index * 0.06 }}>
            <span>{step.number}</span><h3>{step.title}</h3><p>{step.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-shell skills-section">
      <SectionHeader label="Capabilities" title="Technical depth, connected end to end.">Tools matter most when they work together as one reliable system.</SectionHeader>
      <div className="skills-list">
        {profile.skills.map((skill, index) => (
          <motion.article className="skill-index" key={skill.group} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.45 }} variants={fadeUp}>
            <span>{String(index + 1).padStart(2, "0")}</span><h3>{skill.group}</h3>
            <div>{skill.items.map((item) => <span key={item}>{item}</span>)}</div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section-shell experience-section">
      <SectionHeader label="Experience" title="A focused path into applied AI.">Learning, research, and product work developed through progressively more complete systems.</SectionHeader>
      <div className="experience-list">
        {profile.timeline.map((item) => (
          <motion.article className="experience-row" key={`${item.year}-${item.title}`} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.45 }} variants={fadeUp}>
            <time>{item.year}</time><h3>{item.title}</h3><p>{item.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState({ type: "", message: "" });
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email || !message) {
      setStatus({ type: "error", message: "Please complete all fields before sending." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }
    setStatus({ type: "success", message: "Thanks for the message. You can also reach me directly by email." });
    form.reset();
  };

  return (
    <section id="contact" className="contact-section">
      <motion.div className="contact-shell" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.16 }} variants={fadeUp}>
        <div className="contact-copy">
          <p>Contact / {profile.location}</p><h2>Have a useful AI product in mind?</h2>
          <span>I am open to engineering internships, research collaboration, and products around RAG, Vietnamese NLP, educational technology, and full-stack AI.</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <div className="contact-links">
            {profile.socials.map((social) => <a href={social.href} target="_blank" rel="noreferrer" key={social.label}>{social.label} <span aria-hidden="true">&#8599;</span></a>)}
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <label>Name<input name="name" type="text" autoComplete="name" placeholder="Your name" /></label>
          <label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label>
          <label>Project or idea<textarea name="message" rows="5" placeholder="Tell me what you are building" /></label>
          <button className="button button-primary" type="submit">Send message <span aria-hidden="true">&#8599;</span></button>
          {status.message && <p className={`form-status ${status.type === "error" ? "is-error" : ""}`} role={status.type === "error" ? "alert" : "status"}>{status.message}</p>}
        </form>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer"><span>{profile.name} / AI Engineer</span><span>Designed around real systems and useful outcomes.</span><a href="#top">Back to top</a></footer>
  );
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
