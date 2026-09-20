export const profile = {
  name: "Cao Van Ha",
  role: "AI Engineer",
  handle: "cao@portfolio:~$",
  location: "Vietnam",
  timezone: "UTC+7",
  email: "caov77029@gmail.com",
  availability: "Open for internships and collaboration",
  statement:
    "I turn complex knowledge into useful products through retrieval architecture, Vietnamese NLP, evaluation, and full-stack delivery.",
  current: "IT Smart Assistant / Research 2025–26",
  socials: [
    { label: "GitHub", href: "https://github.com/CaoRIV" },
    { label: "X", href: "https://x.com/Cao744604355049" }
  ],
  projects: [
    {
      id: "it-smart-assistant",
      index: "01",
      code: "RAG-SYSTEM-01",
      title: "IT Smart Assistant",
      category: "Education + RAG",
      status: "Research 2025–26",
      outcome: "Faculty-grounded answers",
      description:
        "Developing an AI assistant to support lecturers and students at UTC's Faculty of Information Technology for Student Scientific Research 2025–2026.",
      role: "Backend and RAG architecture developer",
      stack: ["AI chatbot", "RAG architecture", "Backend development"],
      href: "https://github.com/CaoRIV/IT-Smart-Assistant",
      visual: {
        kind: "pipeline",
        label: "Retrieval architecture",
        mode: "Source grounded",
        flow: ["Student question", "FastAPI backend", "RAG retrieval", "Grounded answer"]
      }
    },
    {
      id: "telco-churn-intelligence",
      index: "02",
      code: "ML-SYSTEM-02",
      title: "Telco Churn Intelligence",
      category: "Data Mining + ML",
      status: "Live dashboard",
      outcome: "92.8% churn recall",
      description:
        "An end-to-end telco churn pipeline that connects reproducible data preparation, leakage-safe classification, threshold optimization, and a deployed retention decision dashboard.",
      role: "Data mining and applied ML developer",
      stack: ["Python", "scikit-learn", "Streamlit", "pandas", "SciPy"],
      href: "https://github.com/CaoRIV/customer-churn-data-mining",
      demoHref: "https://customer-churn-data-mining-vha.streamlit.app/business",
      visual: {
        kind: "churn",
        label: "Retention intelligence",
        mode: "Threshold 0.30",
        recall: "92.8%",
        threshold: "0.30",
        metrics: [
          { label: "ROC-AUC", value: "0.842" },
          { label: "False negatives", value: "27" },
          { label: "Priority customers", value: "808" }
        ],
        flow: ["7,043 customers", "Leakage-safe pipeline", "Risk scoring", "Retention queue"]
      }
    },
    {
      id: "v-fashion-insight",
      index: "03",
      code: "NLP-SYSTEM-03",
      title: "V-Fashion Insight",
      category: "Vietnamese NLP",
      status: "Repository available",
      outcome: "Five-aspect classification",
      description:
        "Vietnamese aspect-based sentiment analysis for fashion reviews across material, design, size, price, and service, with a reproducible data and evaluation workflow.",
      role: "NLP and sentiment analysis developer",
      stack: ["Python", "TF-IDF", "PhoBERT", "Hugging Face"],
      href: "https://github.com/CaoRIV/V-Fashion-Insight",
      visual: {
        kind: "sentiment",
        label: "Aspect analysis",
        mode: "Vietnamese text",
        flow: ["Fashion review", "Text features", "Aspect model", "Sentiment labels"],
        aspects: ["Material", "Design", "Size", "Price", "Service"]
      }
    },
    {
      id: "animaldex",
      index: "04",
      code: "CV-SYSTEM-04",
      title: "AnimalDex",
      category: "Computer Vision",
      status: "Repository available",
      outcome: "Prediction with confidence",
      description:
        "An AI-powered animal recognition product that classifies uploaded images, shows confidence and species information, and lets users save personal collections.",
      role: "Computer vision product developer",
      stack: ["Next.js", "FastAPI", "TensorFlow/Keras", "Supabase"],
      href: "https://github.com/CaoRIV/animal-dex",
      visual: {
        kind: "vision",
        label: "Vision pipeline",
        mode: "Image classification",
        testAccuracy: "91.7%",
        classes: "90",
        flow: ["Image upload", "TensorFlow model", "Species profile", "Saved collection"]
      }
    }
  ],
  capabilities: [
    {
      index: "01",
      title: "Applied machine learning",
      tools: "scikit-learn / evaluation / threshold optimization",
      evidence: "Telco Churn Intelligence",
      projectId: "telco-churn-intelligence"
    },
    {
      index: "02",
      title: "Vietnamese NLP",
      tools: "PhoBERT / TF-IDF / aspect sentiment",
      evidence: "V-Fashion Insight",
      projectId: "v-fashion-insight"
    },
    {
      index: "03",
      title: "AI product engineering",
      tools: "FastAPI / React / Next.js / WebSocket",
      evidence: "IT Smart Assistant",
      projectId: "it-smart-assistant"
    },
    {
      index: "04",
      title: "Data infrastructure",
      tools: "PostgreSQL / Redis / Supabase / Docker",
      evidence: "AnimalDex",
      projectId: "animaldex"
    }
  ],
  credentials: [
    {
      index: "01",
      title: "Machine Learning with Python",
      issuer: "IBM",
      type: "Course certificate",
      issued: "September 14, 2026",
      issuedISO: "2026-09-14",
      credentialId: "9TTR1XAXQA01",
      focus: ["scikit-learn", "model evaluation", "supervised + unsupervised learning"],
      href: "https://www.coursera.org/account/accomplishments/verify/9TTR1XAXQA01"
    },
    {
      index: "02",
      title: "Natural Language Processing with Classification and Vector Spaces",
      issuer: "DeepLearning.AI",
      type: "Course certificate",
      issued: "September 13, 2026",
      issuedISO: "2026-09-13",
      credentialId: "UC4Z9HEE9HDM",
      focus: ["NLP", "classification", "word vectors + embeddings"],
      href: "https://www.coursera.org/account/accomplishments/verify/UC4Z9HEE9HDM"
    }
  ],
  process: [
    {
      index: "01",
      title: "Frame the real problem.",
      label: "Discover",
      body: "Clarify the user, available knowledge, and the shape of a trustworthy answer."
    },
    {
      index: "02",
      title: "Map the system.",
      label: "Design",
      body: "Connect data, retrieval, model, and interface decisions before implementation."
    },
    {
      index: "03",
      title: "Ship the whole flow.",
      label: "Build",
      body: "Implement backend, product surface, and evaluation as one coherent delivery."
    },
    {
      index: "04",
      title: "Test what can fail.",
      label: "Validate",
      body: "Review answer quality, failure cases, usability, and operational behavior."
    }
  ],
  timeline: [
    {
      year: "Year 3",
      title: "Started learning AI",
      body: "Focused on AI engineering foundations, natural language processing, LLM integration, and practical systems built around real user needs."
    },
    {
      year: "2025–26",
      title: "IT Smart Assistant research project",
      body: "Developing backend services and RAG architecture for lecturers and students at UTC's Faculty of Information Technology."
    },
    {
      year: "Now",
      title: "Current focus",
      body: "Educational AI, Vietnamese NLP, evaluation, full-stack delivery, and data engineering."
    }
  ]
};
