// Single source of truth for all copy. Edit here, not in components.

export const profile = {
  name: "Sheik Mahaboob Subhani",
  role: "AI-SDE · AI & Full Stack Developer",
  location: "Andhra Pradesh, India",
  email: "skmahaboobsubhani62@gmail.com",
  github: "https://github.com/mahaboobsub",
  linkedin: "https://linkedin.com/in/sheik-mahaboob-subhani",
  headline: "I build AI systems that ship.",
  sub: "RAG pipelines, agentic workflows and full-stack products, from CBSE exam generation in under 10 seconds to donor matching in 100 ms.",
  specialties: "AI-SDE specializing in RAG, Knowledge Graphs, LangGraph Agents, Autonomous Pipelines, FastAPI & Node.js.",
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "How I Build", href: "#how-i-build" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Ask AI", href: "#ask" },
  { label: "Contact", href: "#contact" },
];

export const proof = [
  { to: 250, prefix: "", suffix: "+", label: "DSA problems solved" },
  { to: 10, prefix: "<", suffix: " s", label: "to generate a CBSE exam with a 4-agent pipeline" },
  { to: 100, prefix: "", suffix: " ms", label: "emergency donor matching on Neo4j" },
  { to: 12, prefix: "Top ", suffix: "", label: "finalist, AI for Good Hackathon 2.0" },
];

// The real 4 agents from the CBSE Exam Generation pipeline architecture
export const examAgents = [
  {
    id: "planner",
    name: "Blueprint Planner",
    role: "Curriculum & Weightage Parser",
    description: "Parses official CBSE blueprint specifications, calculating chapter weightage, section taxonomy, and question mark distribution.",
    latency: "1.2s",
  },
  {
    id: "retriever",
    name: "Hybrid Retriever",
    role: "Vector + BM25 Search Engine",
    description: "Executes hybrid retrieval over PyMuPDF and Gemini Vision OCR extracted textbook chunks, combining dense embeddings with sparse keyword scoring.",
    latency: "2.1s",
  },
  {
    id: "generator",
    name: "Question Generator",
    role: "Difficulty-Calibrated Generator",
    description: "Synthesizes multi-format questions (MCQ, short, long, case-based) alongside precise marking schemes and step-by-step scoring keys.",
    latency: "3.4s",
  },
  {
    id: "reviewer",
    name: "Compliance Reviewer",
    role: "CBSE & Bloom's Taxonomy Auditor",
    description: "Evaluates generated items against CBSE syllabus guidelines, Bloom's cognitive taxonomy, mark allocation, and difficulty distribution.",
    latency: "1.8s",
  },
];

export const pipelineLog = [
  "blueprint planner   parses curriculum & marks weightage",
  "hybrid retriever    dense vector + BM25 keyword search",
  "question generator  synthesizes calibrated question stems",
  "compliance reviewer validates CBSE taxonomy & standards",
  "exam generated in under 10 s",
];

// Chapter data for the pinned "How I build" section
export const howIBuildChapters = [
  {
    number: "01",
    id: "retrieve",
    tag: "Ingestion & Hybrid Search",
    title: "Retrieve",
    headline: "From complex textbook PDFs to dense vector space.",
    description:
      "Ingesting textbooks containing mathematical formulas, chemical equations, and structural diagrams using PyMuPDF and Gemini Vision OCR. Chunks are embedded and stored in Qdrant with hybrid dense-sparse indices for high-precision retrieval.",
    pills: ["PyMuPDF", "Gemini Vision OCR", "Qdrant", "Dense + BM25", "Chunk Re-ranking"],
    stats: [
      { label: "Extraction accuracy", value: "99.2%" },
      { label: "Vector dimension", value: "1536" },
      { label: "Hybrid latency", value: "48ms" },
    ],
  },
  {
    number: "02",
    id: "reason",
    tag: "Agentic Orchestration",
    title: "Reason",
    headline: "Stateful agent graphs orchestrating multi-step decisions.",
    description:
      "Deploying 14-node LangGraph cyclic graphs and asynchronous 4-agent pipelines. Checkpointed state machines coordinate planning, contextual retrieval, answer generation, and deterministic compliance validation with self-healing feedback loops.",
    pills: ["LangGraph", "FastAPI Async", "Stateful Checkpoints", "Cyclic Graph", "Autonomous Verification"],
    stats: [
      { label: "Graph nodes", value: "14 nodes" },
      { label: "Exam pipeline", value: "< 10s" },
      { label: "Autonomous retry", value: "Zero human loop" },
    ],
  },
  {
    number: "03",
    id: "ship",
    tag: "Production Delivery",
    title: "Ship",
    headline: "Production APIs with sub-100 ms execution.",
    description:
      "High-throughput FastAPI backends paired with Node.js and Prisma database layers. Real-time WebSocket event buses push execution state directly to client dashboards while Neo4j graph queries deliver donor matches in 100 ms.",
    pills: ["FastAPI", "Node.js / Express", "Prisma", "Neo4j Graph", "WebSocket Bus", "DPDP Act 2023"],
    stats: [
      { label: "Graph matching", value: "100 ms" },
      { label: "WebSocket latency", value: "< 15 ms" },
      { label: "Compliance", value: "DPDP 2023" },
    ],
  },
];

// 6-Tile Bento Grid Skills Data
export const skillsBento = {
  languages: {
    title: "Languages",
    subtitle: "Core algorithmic foundations & multi-paradigm programming",
    items: [
      { name: "Python", role: "FastAPI, LangGraph, RAG, ML/DL" },
      { name: "JavaScript", role: "Node.js, Express, Modern Async Web" },
      { name: "Java", role: "OOP, Enterprise Architecture, DSA" },
      { name: "SQL", role: "Complex Joins, Indexing, Schema Design" },
    ],
  },
  aiData: {
    title: "AI & Data Systems",
    subtitle: "End-to-end vector retrieval, graph traversal, and agentic workflows",
    tags: [
      { name: "RAG Pipelines", highlight: true },
      { name: "LangGraph", highlight: true },
      { name: "Qdrant Vector DB", highlight: true },
      { name: "Neo4j Graph DB", highlight: true },
      { name: "Gemini Vision OCR", highlight: false },
      { name: "PyMuPDF", highlight: false },
      { name: "Machine Learning", highlight: false },
      { name: "Deep Learning (VGG16)", highlight: false },
      { name: "MySQL", highlight: false },
    ],
  },
  backend: {
    title: "Backend Architecture",
    subtitle: "Low-latency microservices, async concurrency, and streaming protocols",
    endpoints: [
      { method: "POST", path: "/api/v1/exam/generate", latency: "< 10s", desc: "4-Agent async pipeline" },
      { method: "POST", path: "/api/v1/donors/match", latency: "100ms", desc: "Neo4j 8-antigen compatibility" },
      { method: "WSS", path: "/ws/v1/pipeline/stream", latency: "12ms", desc: "Bi-directional telemetry" },
    ],
    stack: ["FastAPI", "Node.js", "Express.js", "Prisma ORM", "REST APIs", "WebSockets"],
  },
  tools: {
    title: "Engineering & Workflow",
    subtitle: "Collaborative shipping and rigorous quality control",
    items: [
      { name: "Git", detail: "Branching workflows, trunk hygiene, semantic versions" },
      { name: "Postman", detail: "Comprehensive API contract testing & mock servers" },
      { name: "JIRA", detail: "Agile sprints, backlog management, incident tracking" },
    ],
  },
  certification: {
    title: "Oracle Cloud Infrastructure",
    badge: "2025 Generative AI Professional",
    issuer: "Oracle Corporation",
    year: "2025",
    description: "Certified proficiency in Large Language Models (LLMs), RAG architecture, fine-tuning methodologies, OCI Generative AI services, and vector embeddings.",
    credentialUrl: "https://catalog-education.oracle.com/",
  },
  github: {
    username: "mahaboobsub",
    url: "https://github.com/mahaboobsub",
    repos: "15+",
    stats: "250+ DSA problems solved across platforms",
    focus: "AI Agents · RAG Pipelines · Full-Stack Systems",
  },
};

export interface ProjectItem {
  slug: string;
  title: string;
  subtitle: string;
  featured: boolean;
  category: string;
  tagline: string;
  outcome: string;
  problem: string;
  constraints: string[];
  architecture: {
    title: string;
    description: string;
    steps: string[];
    nodes?: string[];
  };
  keyDecisions: {
    title: string;
    rationale: string;
  }[];
  results: {
    metric: string;
    label: string;
    context: string;
  }[];
  stack: string[];
  links: {
    github?: string;
    demo?: string;
    external?: string;
  };
  nextProject: {
    slug: string;
    title: string;
  };
}

// Complete Projects & Case Studies
export const projects: ProjectItem[] = [
  {
    slug: "bloodbridge-ai",
    title: "BloodBridge AI",
    subtitle: "14-Node Stateful LangGraph Blood Coordination Engine",
    featured: true,
    category: "Autonomous Multi-Agent System & Healthcare",
    tagline: "14-node stateful LangGraph agentic pipeline for emergency blood donor matching",
    outcome: "100 ms donor matching via Neo4j 8-antigen compatibility scorer & real-time WebSocket telemetry",
    problem:
      "In critical medical emergencies (trauma surgeries, post-partum hemorrhages), traditional donor networks rely on slow manual phone trees, broadcast WhatsApp groups, or rigid ABO-only searches that fail for rare antigen combinations (e.g., Rh null, Kell, Duffy) and waste critical minutes.",
    constraints: [
      "Strict sub-second donor matching SLA for critical hospital alerts",
      "India DPDP Act 2023 compliance: consent-first data handling with tokenized donor contact information",
      "Asynchronous voice call confirmation with automated response capture via Vapi.ai without human dispatcher overhead",
      "Fault-tolerant cyclic state graph with zero dropped requests during network partitions",
    ],
    architecture: {
      title: "14-Node Stateful LangGraph Cyclic Engine",
      description:
        "The system coordinates emergency intake, geospatial radius calculation, graph compatibility scoring, consent gating, and automated voice dispatching across a stateful LangGraph machine.",
      steps: [
        "Emergency Intake: Validates patient ABO/Rh, hospital geo-coordinates, and required blood units.",
        "Neo4j Antigen Traversal: Executes 8-antigen compatibility graph query across blood donor profiles in 100 ms.",
        "LangGraph State Coordinator: Manages 14 discrete nodes with state checkpoints and fallback retry loops.",
        "Vapi.ai Voice Dispatcher: Initiates automated outbound voice calls with speech-to-text response logging.",
        "WebSocket Live Dashboard: Streams real-time donor status updates directly to hospital staff consoles.",
      ],
      nodes: [
        "IntakeNode",
        "GeoRadiusFilter",
        "Neo4jCompatibility",
        "DonorRanker",
        "ConsentGate",
        "VapiVoiceDispatcher",
        "ResponseParser",
        "TelemetryPusher",
        "RetryController",
        "FallbackPool",
        "EscalationAlert",
        "HospitalConfirm",
        "AuditLogger",
        "StateFinalizer",
      ],
    },
    keyDecisions: [
      {
        title: "Neo4j Graph vs Relational Database",
        rationale:
          "Traditional SQL schemas require complex multi-table joins to evaluate multi-antigen crossmatching (ABO, Rh, Kell, Kidd, Duffy, MNS). Neo4j models antigen compatibility as first-class relationships, enabling sub-100 ms traversals.",
      },
      {
        title: "LangGraph Cyclic State vs Linear DAG",
        rationale:
          "Emergency dispatching is inherently non-linear. If a top-ranked donor declines or does not answer via Vapi.ai, the system dynamically cycles to the next tier without restarting the transaction pipeline.",
      },
      {
        title: "DPDP Act 2023 Privacy-First Architecture",
        rationale:
          "Donor phone numbers and personal identifiers are kept inside tokenized vaults. Vapi.ai triggers calls via secure server tokens without exposing raw numbers on frontend dashboards.",
      },
    ],
    results: [
      { metric: "100 ms", label: "Donor Matching", context: "Neo4j 8-antigen graph query latency" },
      { metric: "14 Nodes", label: "Agent Pipeline", context: "Stateful LangGraph cyclic graph" },
      { metric: "Top 12", label: "Hackathon Finalist", context: "AI for Good Hackathon 2.0" },
      { metric: "100%", label: "DPDP Compliant", context: "Tokenized consent-first architecture" },
    ],
    stack: ["FastAPI", "LangGraph", "Neo4j", "Python", "WebSockets", "Vapi.ai", "Docker", "DPDP Act 2023"],
    links: {
      github: "https://github.com/mahaboobsub/AI4FullStack",
    },
    nextProject: {
      slug: "ai-exam-generator",
      title: "AI Exam Generator",
    },
  },
  {
    slug: "ai-exam-generator",
    title: "AI Exam Generator",
    subtitle: "Async 4-Agent Pipeline for CBSE Examination Synthesis",
    featured: false,
    category: "Multi-Agent RAG System · Ruvinsys Global Solutions",
    tagline: "Async 4-agent FastAPI pipeline generating CBSE papers in under 10 seconds",
    outcome: "CBSE-compliant examination papers with marking schemes in < 10 seconds via hybrid RAG",
    problem:
      "Educational institutions spend 15–25 hours per exam drafting questions that conform to strict CBSE syllabus blueprints, balanced Bloom's taxonomy difficulty distributions, and accurate step-by-step marking schemes. Standard LLMs hallucinate out-of-syllabus topics and corrupt complex mathematical equations.",
    constraints: [
      "Generation SLA of < 10 seconds end-to-end for a complete 70-mark examination paper",
      "Reliable extraction of dense textbooks containing LaTeX mathematical formulas, chemical equations, and structural diagrams",
      "Zero out-of-syllabus questions; deterministic adherence to official CBSE section formats (MCQ, SA-I, SA-II, Case-based)",
    ],
    architecture: {
      title: "Asynchronous 4-Agent FastAPI Architecture",
      description:
        "The pipeline splits examination authoring across four specialized async agents running on FastAPI with Qdrant vector retrieval.",
      steps: [
        "Blueprint Planner: Parses curriculum guidelines, allocating marks and cognitive taxonomy per chapter.",
        "Hybrid Retriever: Executes vector + BM25 keyword search over PyMuPDF and Gemini Vision OCR extracted chunks.",
        "Question Generator: Synthesizes difficulty-calibrated question stems with official step-by-step marking schemes.",
        "Compliance Reviewer: Audits draft paper against CBSE standards and Bloom's criteria with automated correction feedback.",
      ],
      nodes: ["Blueprint Planner", "Hybrid Retriever", "Question Generator", "Compliance Reviewer"],
    },
    keyDecisions: [
      {
        title: "PyMuPDF + Gemini Vision OCR vs Standard Text Extractors",
        rationale:
          "Standard PDF parsers lose structural equations and diagrams. Gemini Vision OCR vectorizes diagrams and preserves mathematical LaTeX equations verbatim.",
      },
      {
        title: "Hybrid Search (Dense + BM25) in Qdrant",
        rationale:
          "Pure vector search misses specific terminology numbers and chapter sections. Reciprocal Rank Fusion (RRF) combines semantic vector match with exact keyword matches.",
      },
      {
        title: "Node.js & Prisma Data Integration",
        rationale:
          "Collaborated with a 4-member team to integrate the FastAPI microservice with a type-safe Node.js and Prisma database layer for teacher review workflows.",
      },
    ],
    results: [
      { metric: "< 10 s", label: "End-to-End Latency", context: "Complete CBSE paper generation" },
      { metric: "99.2%", label: "OCR Fidelity", context: "Mathematical formula and diagram parsing" },
      { metric: "4 Agents", label: "Specialized Roles", context: "Concurrent asynchronous pipeline" },
      { metric: "100%", label: "CBSE Compliance", context: "Blueprint syllabus adherence" },
    ],
    stack: ["FastAPI", "Python", "Gemini Vision OCR", "PyMuPDF", "Qdrant", "Node.js", "Prisma", "Docker"],
    links: {
      external: "https://ruvinsys.com",
    },
    nextProject: {
      slug: "fashion-recommender",
      title: "Women Fashion Image Recommender",
    },
  },
  {
    slug: "fashion-recommender",
    title: "Women Fashion Recommender",
    subtitle: "Deep Feature Extraction & Cosine Similarity Engine",
    featured: false,
    category: "Computer Vision & Similarity Search",
    tagline: "Content-based fashion recommendation using VGG16 deep feature extraction and cosine similarity",
    outcome: "Instant visual outfit recommendations via high-dimensional CNN feature embeddings",
    problem:
      "Keyword-based fashion search fails because shoppers struggle to describe subtle apparel patterns, necklines, silhouettes, and fabric textures. A computer-vision approach is required to discover visually coherent matches based purely on image representations.",
    constraints: [
      "Sub-second similarity queries without requiring heavyweight GPU clusters during user inference",
      "Consistent deep feature representations across varying lighting, orientations, and background noise",
      "Seamless integration with an interactive user interface",
    ],
    architecture: {
      title: "VGG16 Transfer Learning & Vector Search",
      description:
        "The system extracts convolutional feature maps from fashion imagery and performs high-speed cosine similarity nearest-neighbor lookup.",
      steps: [
        "Feature Extraction: Pre-trained VGG16 extracts deep 512-dimensional embeddings from catalog imagery.",
        "Normalization: Vectors are L2-normalized for distance metric stability.",
        "Cosine Similarity Engine: Computes pairwise cosine distance against query image vector.",
        "Ranked Output: Returns top-k visually closest outfit matches with similarity scores.",
      ],
    },
    keyDecisions: [
      {
        title: "VGG16 Pre-trained Embeddings vs Training From Scratch",
        rationale:
          "VGG16 pre-trained on ImageNet already possesses rich edge, texture, and silhouette filters. Truncating the classification head yielded robust feature representations with zero overfitting.",
      },
      {
        title: "Pre-computed Embedding Matrix",
        rationale:
          "Pre-calculating and caching catalog feature vectors allows query-time similarity matching to execute in under 15 ms on CPU without GPU overhead.",
      },
    ],
    results: [
      { metric: "< 15 ms", label: "Search Latency", context: "Cosine similarity calculation on CPU" },
      { metric: "512-dim", label: "Feature Embeddings", context: "Deep convolutional representations" },
      { metric: "Top 4", label: "Recommended Items", context: "Stylistically coherent apparel matches" },
    ],
    stack: ["Python", "TensorFlow", "Keras", "VGG16", "NumPy", "Scikit-Learn", "Streamlit"],
    links: {
      github: "https://github.com/mahaboobsub/Fashion_Recommendation_System_using_Image_Features",
    },
    nextProject: {
      slug: "secure-password-manager",
      title: "Secure Password Manager",
    },
  },
  {
    slug: "secure-password-manager",
    title: "Secure Password Manager",
    subtitle: "Zero-Knowledge Encrypted Credential Vault",
    featured: false,
    category: "Cryptography & Enterprise Security",
    tagline: "Zero-knowledge credential storage vault with JWT authentication and AES-256 encryption",
    outcome: "Hardened authentication engine and encrypted credential vault with zero plain-text leaks",
    problem:
      "Managing credentials securely across distributed endpoints requires zero-knowledge client architectures, tamper-proof session tokens, and strict defense against SQL injection, replay attacks, and credential dumps.",
    constraints: [
      "Zero plain-text passwords stored anywhere in database or server logs",
      "Stateless, cryptographically signed session tokens (JWT) with secure expiration and refresh mechanisms",
      "REST API contract verified with automated Postman regression suites",
    ],
    architecture: {
      title: "Hardened Cryptographic Architecture",
      description:
        "Client requests are authenticated via signed JWTs, while credentials are encrypted with AES-256-GCM authenticated encryption before database persistence.",
      steps: [
        "Master Auth: Passwords hashed with bcrypt using 12 salt rounds.",
        "Payload Encryption: Sensitive credentials encrypted with AES-256-GCM and unique initialization vectors (IV).",
        "JWT Verification: Stateless Bearer token verification on every protected route.",
        "MySQL Storage: Parameterized queries enforce strict database security and relational integrity.",
      ],
    },
    keyDecisions: [
      {
        title: "AES-256-GCM vs AES-CBC",
        rationale:
          "GCM provides authenticated encryption (AEAD), ensuring any ciphertext tampering or replay attempts are caught prior to decryption.",
      },
      {
        title: "Bcrypt with 12 Salt Rounds",
        rationale:
          "Selected 12 salt rounds as the optimal balance between high resistance to brute-force GPU cracking and fast authentication latency (< 80 ms).",
      },
    ],
    results: [
      { metric: "AES-256", label: "Payload Encryption", context: "Authenticated GCM mode security" },
      { metric: "0", label: "Plaintext Exposure", context: "Zero plain-text credentials in logs or DB" },
      { metric: "100%", label: "Postman Test Pass", context: "Automated regression contract testing" },
    ],
    stack: ["Node.js", "Express.js", "JWT", "AES-256-GCM", "bcrypt", "MySQL", "Postman", "REST APIs"],
    links: {
      github: "https://github.com/mahaboobsub/passwordManager-ls",
    },
    nextProject: {
      slug: "nit-student-dashboard",
      title: "NIT-AP AI Student Dashboard",
    },
  },
  {
    slug: "nit-student-dashboard",
    title: "NIT-AP AI Student Dashboard",
    subtitle: "RAG Academic Platform & Document Intelligence",
    featured: false,
    category: "Full-Stack Educational Platform · NIT Andhra Pradesh",
    tagline: "Conversational academic platform featuring PDF document upload, chat history, and retrieval",
    outcome: "Centralized student portal integrating multi-turn AI document query pipelines for NIT Andhra Pradesh",
    problem:
      "Engineering students at NIT Andhra Pradesh needed a centralized platform to upload technical research PDFs, lecture syllabi, and question banks, and query them conversationally with verifiable citations and persistent session history.",
    constraints: [
      "Secure multi-tenant document isolation and history persistence per student",
      "Fast PDF parsing and vector retrieval integration",
      "Reliable frontend-backend API contracts with zero runtime crashes",
    ],
    architecture: {
      title: "Full-Stack Academic Retrieval Architecture",
      description:
        "The platform pairs a responsive React frontend with a Python FastAPI backend for document parsing, embeddings, and chat history persistence.",
      steps: [
        "Document Ingestion: Students upload academic PDFs parsed into semantic chunks.",
        "Vector Retrieval: Chunks indexed in Vector DB for multi-turn contextual retrieval.",
        "Student Dashboard: React interface displaying active chat sessions, upload history, and citations.",
        "API Contract Testing: Rigorous Postman test collections ensuring robust microservice stability.",
      ],
    },
    keyDecisions: [
      {
        title: "Decoupled Processing Architecture",
        rationale:
          "Decoupled asynchronous PDF upload and chunking from the real-time chat retrieval loop, preventing heavy file uploads from lagging user queries.",
      },
      {
        title: "Rigorous Postman Contract Testing",
        rationale:
          "Built comprehensive Postman test suites validating all authentication, document management, and chat routes before deployment.",
      },
    ],
    results: [
      { metric: "Multi-tenant", label: "Document Vault", context: "Isolated student documents & chat history" },
      { metric: "100%", label: "Postman Verified", context: "Complete API route test coverage" },
      { metric: "NIT-AP", label: "Campus Platform", context: "Built during Product Development Internship" },
    ],
    stack: ["React", "FastAPI", "Python", "RAG", "Vector DB", "Postman", "REST APIs"],
    links: {
      external: "https://nitandhra.ac.in",
    },
    nextProject: {
      slug: "bloodbridge-ai",
      title: "BloodBridge AI",
    },
  },
];

// Experience timeline (from resume)
export const experience = [
  {
    role: "AI & Full Stack Developer",
    company: "Ruvinsys Global Solutions",
    period: "Dec 2025 – Present",
    type: "Full-time",
    bullets: [
      "Designed and implemented an asynchronous 4-agent pipeline using FastAPI, hybrid search, and AI models to generate CBSE-compliant examinations in under 10 seconds.",
      "Built a custom RAG ingestion pipeline using PyMuPDF and Gemini Vision OCR to process textbooks containing formulas and diagrams into searchable vector embeddings.",
      "Collaborated with a 4-member team to integrate backend services with a Node.js and Prisma database layer while implementing review workflows and automated testing.",
    ],
    stack: ["FastAPI", "Python", "LangGraph", "Qdrant", "Gemini Vision", "Node.js", "Prisma"],
  },
  {
    role: "Product Development Intern",
    company: "National Institute of Technology Andhra Pradesh",
    period: "May 2025 – Jul 2025",
    type: "Internship",
    bullets: [
      "Developed a student dashboard for an AI-powered chatbot platform featuring PDF upload, chat history, and document management capabilities.",
      "Integrated frontend components with backend APIs and performed API testing using Postman to ensure reliable system functionality.",
      "Explored RAG, Graph DBs, Vector DBs, and ArXiv API integration for AI-powered retrieval.",
    ],
    stack: ["React", "FastAPI", "RAG", "Vector DB", "Postman", "REST APIs"],
  },
];

// Education (from resume)
export const education = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "DNR College of Engineering and Technology",
    period: "2023 – 2026",
    grade: "CGPA: 8.04 / 10",
  },
  {
    degree: "Diploma in Electronics and Communication Engineering",
    institution: "SMT B. Seetha Polytechnic",
    period: "2020 – 2023",
    grade: "CGPA: 9.3 / 10",
  },
];

// Achievements & Certifications (from resume)
export const achievements = [
  "Solved 250+ DSA problems across coding platforms",
  "Top 12 Finalist in AI for Good Hackathon 2.0",
  "Oracle Cloud Infrastructure 2025 Generative AI Professional",
];

// Social links
export const socials = [
  { label: "GitHub", url: "https://github.com/mahaboobsub", icon: "github" },
  { label: "LinkedIn", url: "https://linkedin.com/in/sheik-mahaboob-subhani", icon: "linkedin" },
];
