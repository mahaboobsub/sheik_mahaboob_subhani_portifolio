// Grounded, reactive knowledge base engine for Sheik Mahaboob Subhani's AI Chatbot.
// Handles conversational queries, greetings, elevator pitches, and fact-checked resume details.

export interface QueryResolution {
  answer: string;
  intent: string;
  sources: string[];
  followUps: string[];
}

export function resolveKnowledgeAnswer(rawQuery: string): QueryResolution {
  const query = rawQuery.toLowerCase().trim();

  // 1. GREETINGS & CASUAL HELLOS
  if (
    query === "hi" ||
    query === "hello" ||
    query === "hey" ||
    query === "hola" ||
    query === "yo" ||
    query === "sup" ||
    query.startsWith("hi ") ||
    query.startsWith("hello ") ||
    query.startsWith("hey ") ||
    query.includes("good morning") ||
    query.includes("good afternoon") ||
    query.includes("good evening") ||
    query.includes("how are you") ||
    query.includes("how r u")
  ) {
    return {
      intent: "Greeting & Welcome",
      sources: ["Portfolio Overview", "Résumé Summary"],
      followUps: [
        "Why should we hire Subhani?",
        "What did you build at Ruvinsys?",
        "Explain BloodBridge's 14-node architecture",
      ],
      answer:
        "Hello! 👋 I'm **Subhani's AI Assistant**, embedded in the developer portfolio of **Sheik Mahaboob Subhani**.\n\n" +
        "I'm here to give you instant, verified insights into his engineering work as an **AI-SDE & Full Stack Developer**:\n\n" +
        "• **Autonomous Agent Systems**: Architected BloodBridge AI with a 14-node LangGraph pipeline and <100ms Neo4j antigen matching.\n" +
        "• **Enterprise RAG Ingestion**: Engineered the 4-agent CBSE exam generator at Ruvinsys Global Solutions (<10s SLA).\n" +
        "• **Core Technical Stack**: FastAPI, Python, LangGraph, Qdrant, Neo4j, Node.js, and React.\n" +
        "• **Credentials**: 250+ DSA problems solved, Oracle Cloud 2025 GenAI Certified, and Top 12 Hackathon Finalist.\n\n" +
        "What would you like to explore today? Feel free to ask about his projects, skills, experience, or hiring availability!",
    };
  }

  // 2. ASSISTANT IDENTITY / CAPABILITIES
  if (
    query.includes("who are you") ||
    query.includes("what are you") ||
    query.includes("what can you do") ||
    query.includes("how can you help") ||
    query.includes("what is your purpose") ||
    query.includes("introduce yourself")
  ) {
    return {
      intent: "Assistant Identity",
      sources: ["Portfolio AI System", "4-Agent Architecture"],
      followUps: [
        "Tell me about Mahaboob Subhani",
        "What are your core technical skills?",
        "How can I contact Subhani?",
      ],
      answer:
        "I am **Subhani's Portfolio AI Assistant**, powered by a 4-agent pipeline architecture (Intake, Retrieval, Reasoning, and Grounding).\n\n" +
        "My knowledge base is strictly grounded in Sheik Mahaboob Subhani's résumé, production projects, and technical case studies. I can assist you with:\n\n" +
        "1. **Deep Dives into Project Architectures**: Explain the 14 nodes of BloodBridge AI, Neo4j 8-antigen scoring, or Ruvinsys textbook OCR ingestion.\n" +
        "2. **Experience & Track Record**: Breakdown his work at Ruvinsys Global Solutions and his internship at NIT Andhra Pradesh.\n" +
        "3. **Skills & Problem Solving**: Details on his Python, FastAPI, Java, Node.js skills, and 250+ DSA problems.\n" +
        "4. **Direct Contact & Hiring**: Provide verified email, LinkedIn, and GitHub links for recruiting opportunities.",
    };
  }

  // 3. WHO IS SUBHANI / ABOUT MAHABOOB
  if (
    query.includes("who is subhani") ||
    query.includes("who is mahaboob") ||
    query.includes("tell me about subhani") ||
    query.includes("tell me about mahaboob") ||
    query.includes("about mahaboob") ||
    query.includes("about subhani") ||
    query.includes("tell me about yourself") ||
    query.includes("who is he") ||
    query.includes("bio") ||
    query.includes("background")
  ) {
    return {
      intent: "Candidate Profile",
      sources: ["Profile & About Section", "Education & Experience"],
      followUps: [
        "Why should we hire Subhani?",
        "What are his top projects?",
        "What is his education background?",
      ],
      answer:
        "**Sheik Mahaboob Subhani** is an **AI-SDE (AI & Full Stack Developer)** based in Bhimavaram, Andhra Pradesh, India.\n\n" +
        "He specializes in building resilient, low-latency AI backends and autonomous multi-agent pipelines:\n\n" +
        "• **Current Role**: AI & Full Stack Developer at *Ruvinsys Global Solutions* (Dec 2025 – Present), engineering 4-agent CBSE exam synthesis.\n" +
        "• **Education**: B.Tech in CSE at DNR College of Engineering & Technology (2023–2026, **8.04 CGPA**) and Diploma in ECE from SMT B. Seetha Polytechnic (**9.3 CGPA**).\n" +
        "• **Key Milestone**: Top 12 Finalist at AI for Good Hackathon 2.0 with BloodBridge AI.\n" +
        "• **Certifications**: Oracle Cloud Infrastructure 2025 Generative AI Certified.\n" +
        "• **Problem Solving**: 250+ Data Structures & Algorithms (DSA) problems solved across platforms.",
    };
  }

  // 4. WHY HIRE SUBHANI / ELEVATOR PITCH
  if (
    query.includes("why hire") ||
    query.includes("why should we hire") ||
    query.includes("pitch") ||
    query.includes("elevator pitch") ||
    query.includes("strengths") ||
    query.includes("why choose")
  ) {
    return {
      intent: "Recruiter Pitch",
      sources: ["Candidate Evaluation", "Technical Repertoire"],
      followUps: [
        "Tell me about BloodBridge AI",
        "What did you build at Ruvinsys?",
        "How can I contact Subhani?",
      ],
      answer:
        "**Top 5 Reasons to Hire Sheik Mahaboob Subhani:**\n\n" +
        "1. **Production-Minded AI Architect**: Doesn't just write simple LLM wrapper scripts. Builds stateful, multi-agent systems with cyclic fallbacks (14-node LangGraph) and sub-100ms graph traversals in Neo4j.\n" +
        "2. **Hands-On RAG Engineering**: Built custom textbook PDF ingestion combining PyMuPDF, Gemini Vision OCR, and Qdrant dense+BM25 hybrid search at Ruvinsys with a sub-10s SLA.\n" +
        "3. **True End-to-End Full Stack**: Seamlessly bridges FastAPI, Node.js, Express, React, Prisma, WebSockets, and database indexing.\n" +
        "4. **Solid Algorithmic Foundation**: 250+ DSA problems solved across platforms, ensuring optimized time/space complexity in all production code.\n" +
        "5. **Certified & Proven**: Oracle Cloud Infrastructure 2025 GenAI Certified, and Top 12 Finalist at AI for Good Hackathon 2.0.",
    };
  }

  // 5. RESUME / CV OVERVIEW
  if (
    query.includes("resume") ||
    query.includes("cv") ||
    query.includes("profile overview") ||
    query.includes("full details")
  ) {
    return {
      intent: "Résumé Summary",
      sources: ["Full Résumé Data", "Career Timeline"],
      followUps: [
        "What are your technical skills?",
        "Tell me about your Ruvinsys experience",
        "How can I contact Subhani?",
      ],
      answer:
        "**Sheik Mahaboob Subhani — Résumé Snapshot**\n\n" +
        "• **Role**: AI-SDE (AI & Full Stack Developer) | Bhimavaram, AP\n" +
        "• **Work Experience**:\n" +
        "  - *Ruvinsys Global Solutions* (Dec 2025 – Present): AI & Full Stack Developer (4-Agent CBSE Exam Generator, PyMuPDF + Gemini Vision OCR in Qdrant, Node.js/Prisma)\n" +
        "  - *NIT Andhra Pradesh* (May – Jul 2025): Product Development Intern (AI Student Dashboard, PDF dropzone, multi-turn vector chat, Postman API testing)\n" +
        "• **Education**:\n" +
        "  - B.Tech in CSE: DNR College (2023–2026) · CGPA: 8.04/10\n" +
        "  - Diploma in ECE: SMT B. Seetha Poly (2020–2023) · CGPA: 9.3/10\n" +
        "• **Top Projects**: BloodBridge AI (14-node LangGraph), CBSE Exam Generator, Fashion Recommender (VGG16), Password Manager (AES-256-GCM)\n" +
        "• **Credentials**: 250+ DSA Solved, OCI 2025 GenAI Certified, Top 12 Hackathon Finalist.",
    };
  }

  // 6. CONTACT / EMAIL / PHONE / LOCATION / HIRE
  if (
    query.includes("contact") ||
    query.includes("reach") ||
    query.includes("email") ||
    query.includes("mail") ||
    query.includes("phone") ||
    query.includes("mobile") ||
    query.includes("number") ||
    query.includes("linkedin") ||
    query.includes("github") ||
    query.includes("location") ||
    query.includes("where do you live") ||
    query.includes("where are you from") ||
    query.includes("bhimavaram") ||
    query.includes("relocate") ||
    query.includes("remote")
  ) {
    return {
      intent: "Contact Information",
      sources: ["Contact & Verification", "Profile Header"],
      followUps: [
        "Why should we hire Subhani?",
        "What are his core technical skills?",
        "Tell me about BloodBridge AI",
      ],
      answer:
        "**Contact & Location Details**:\n\n" +
        "• **Email**: [skmahaboobsubhani62@gmail.com](mailto:skmahaboobsubhani62@gmail.com)\n" +
        "• **LinkedIn**: [linkedin.com/in/sheik-mahaboob-subhani](https://linkedin.com/in/sheik-mahaboob-subhani)\n" +
        "• **GitHub**: [github.com/mahaboobsub](https://github.com/mahaboobsub)\n" +
        "• **Location**: Bhimavaram, Andhra Pradesh, India\n" +
        "• **Availability**: Open to Immediate AI-SDE / Full Stack roles · Open to Remote & Relocation\n" +
        "• **Phone**: *Available upon request* via email or the portfolio contact form to prevent automated spam scraping.",
    };
  }

  // 7. BLOODBRIDGE AI / EMERGENCY BLOOD DONOR
  if (
    query.includes("bloodbridge") ||
    query.includes("blood") ||
    query.includes("donor") ||
    query.includes("antigen") ||
    query.includes("neo4j") ||
    query.includes("14 node") ||
    query.includes("14-node") ||
    query.includes("vapi") ||
    query.includes("dpdp")
  ) {
    return {
      intent: "BloodBridge AI Case Study",
      sources: ["Project: BloodBridge AI", "LangGraph Graph Architecture"],
      followUps: [
        "How does Neo4j calculate donor compatibility in <100ms?",
        "How does Vapi handle automated voice outreach?",
        "Can I see the BloodBridge GitHub repository?",
      ],
      answer:
        "**BloodBridge AI — Emergency Multi-Agent Blood Coordination**\n\n" +
        "• **14-Node Stateful LangGraph Machine**: Coordinates emergency intake, geospatial radius calculation, graph compatibility scoring, consent gating, and automated fallback dispatching.\n" +
        "• **8-Antigen Matching on Neo4j**: Calculates ABO, Rh, Kell, Duffy, Kidd blood compatibility in **sub-100ms** graph traversals.\n" +
        "• **Voice Outreach (Vapi.ai)**: Automates voice calls to eligible donors with instant response telemetry pushed over WebSockets.\n" +
        "• **Privacy Compliance**: Built following India's **DPDP Act 2023** with tokenized donor identity masking.\n" +
        "• **Outcome**: Top 12 Finalist at AI for Good Hackathon 2.0 (GitHub: [github.com/mahaboobsub/AI4FullStack](https://github.com/mahaboobsub/AI4FullStack)).",
    };
  }

  // 8. RUVINSYS / CBSE EXAM GENERATOR
  if (
    query.includes("ruvinsys") ||
    query.includes("exam") ||
    query.includes("cbse") ||
    query.includes("blueprint") ||
    query.includes("textbook") ||
    query.includes("ocr") ||
    query.includes("pymupdf")
  ) {
    return {
      intent: "Ruvinsys Case Study",
      sources: ["Experience: Ruvinsys Global Solutions", "Project: AI Exam Generator"],
      followUps: [
        "How does the hybrid retriever combine PyMuPDF and BM25?",
        "What were your exact contributions at Ruvinsys?",
        "How does the pipeline achieve <10s generation SLA?",
      ],
      answer:
        "**AI Exam Generator at Ruvinsys Global Solutions (Dec 2025 – Present)**\n\n" +
        "• **4-Agent Async FastAPI Pipeline**: Blueprint Planner (curriculum weightage), Hybrid Retriever (dense + BM25 keyword search), Question Generator (stems with marking schemes), and Compliance Reviewer (CBSE taxonomy verification).\n" +
        "• **Custom RAG Ingestion**: Ingests textbook PDFs containing complex mathematical formulas and scientific diagrams using PyMuPDF and Gemini Vision OCR into Qdrant vector embeddings.\n" +
        "• **Generation SLA**: Synthesizes verified, curriculum-compliant exam question papers in **under 10 seconds**.\n" +
        "• **Team Collaboration**: Worked with a 4-member team to integrate backend services with Node.js and Prisma ORM for teacher review workflows.",
    };
  }

  // 9. NIT ANDHRA PRADESH / INTERNSHIP
  if (
    query.includes("nit") ||
    query.includes("intern") ||
    query.includes("internship") ||
    query.includes("student dashboard")
  ) {
    return {
      intent: "NIT Andhra Pradesh Internship",
      sources: ["Experience: NIT Andhra Pradesh", "Student Dashboard"],
      followUps: [
        "What technologies did you use at NIT Andhra Pradesh?",
        "What were your key responsibilities?",
        "Tell me about your Ruvinsys experience",
      ],
      answer:
        "**Product Development Intern — NIT Andhra Pradesh (May – Jul 2025)**\n\n" +
        "• Built a student dashboard for an AI-powered chatbot platform with PDF dropzone, multi-turn chat history, and document management.\n" +
        "• Integrated frontend React components with FastAPI backend services and conducted API testing using Postman.\n" +
        "• Researched RAG retrieval patterns, Vector DB indexing, and ArXiv API academic search integration.",
    };
  }

  // 10. TECHNICAL SKILLS & STACK
  if (
    query.includes("skill") ||
    query.includes("tech") ||
    query.includes("stack") ||
    query.includes("technologies") ||
    query.includes("fastapi") ||
    query.includes("python") ||
    query.includes("java") ||
    query.includes("sql") ||
    query.includes("javascript") ||
    query.includes("langgraph") ||
    query.includes("qdrant") ||
    query.includes("backend")
  ) {
    return {
      intent: "Technical Repertoire",
      sources: ["Technical Skills Matrix", "Skills Bento"],
      followUps: [
        "How many DSA problems have you solved?",
        "What is your experience with Neo4j and Knowledge Graphs?",
        "Tell me about your FastAPI backends",
      ],
      answer:
        "**Technical Repertoire & Competencies:**\n\n" +
        "• **Languages**: Java, Python, SQL, JavaScript\n" +
        "• **AI & Multi-Agent**: LangGraph, Qdrant Vector DB, Neo4j Graph DB, Gemini Vision OCR, PyMuPDF, VGG16 (CNN), Hybrid RAG (Dense + BM25)\n" +
        "• **Backend & APIs**: FastAPI, Node.js, Express.js, Prisma ORM, WebSockets, REST APIs, Docker\n" +
        "• **Databases**: MySQL, Qdrant, Neo4j\n" +
        "• **Developer Tools**: Git, Postman, JIRA, Linux\n" +
        "• **Problem Solving**: 250+ DSA problems solved across competitive coding platforms.",
    };
  }

  // 11. DSA / PROBLEM SOLVING / LEETCODE
  if (
    query.includes("dsa") ||
    query.includes("leetcode") ||
    query.includes("problem solving") ||
    query.includes("coding") ||
    query.includes("competitive") ||
    query.includes("250")
  ) {
    return {
      intent: "DSA & Problem Solving",
      sources: ["Achievements: 250+ DSA", "Languages: Java & Python"],
      followUps: [
        "What are your core technical skills?",
        "Tell me about your project architectures",
        "How can I contact Subhani?",
      ],
      answer:
        "**Data Structures & Algorithms (DSA):**\n\n" +
        "• Subhani has solved **250+ DSA problems** across LeetCode, GeeksforGeeks, and HackerRank.\n" +
        "• Primary languages for problem-solving: **Java** and **Python**.\n" +
        "• Core problem domains: Graph traversals (BFS/DFS, Dijkstra), Dynamic Programming, Trees, Binary Search, Sliding Window, and Hash Maps.\n" +
        "• This algorithmic foundation translates directly into writing optimal, low-latency production backends.",
    };
  }

  // 12. CERTIFICATIONS / AWARDS / HACKATHONS
  if (
    query.includes("cert") ||
    query.includes("certification") ||
    query.includes("oracle") ||
    query.includes("hackathon") ||
    query.includes("award") ||
    query.includes("achievement") ||
    query.includes("credential")
  ) {
    return {
      intent: "Credentials & Awards",
      sources: ["Achievements & Certifications", "Hackathon Track Record"],
      followUps: [
        "Tell me about the BloodBridge hackathon project",
        "What are your core technical skills?",
        "What is your education background?",
      ],
      answer:
        "**Official Certifications & Achievements:**\n\n" +
        "• **Oracle Cloud Infrastructure 2025**: Generative AI Professional Certified.\n" +
        "• **AI for Good Hackathon 2.0**: Top 12 Finalist for architecting BloodBridge AI.\n" +
        "• **DSA Milestone**: 250+ verified problems solved across coding platforms.",
    };
  }

  // 13. EDUCATION / COLLEGE / CGPA / MARKS
  if (
    query.includes("education") ||
    query.includes("college") ||
    query.includes("b.tech") ||
    query.includes("btech") ||
    query.includes("diploma") ||
    query.includes("dnr") ||
    query.includes("cgpa") ||
    query.includes("grade") ||
    query.includes("marks") ||
    query.includes("study")
  ) {
    return {
      intent: "Education History",
      sources: ["Education Records", "Academic Timeline"],
      followUps: [
        "What did you build during your degree?",
        "Tell me about your NIT Andhra Pradesh internship",
        "What are your core technical skills?",
      ],
      answer:
        "**Educational Background:**\n\n" +
        "• **B.Tech in Computer Science and Engineering** (2023 – 2026)\n" +
        "  - *DNR College of Engineering and Technology*, Bhimavaram, AP\n" +
        "  - Cumulative GPA: **8.04 / 10**\n\n" +
        "• **Diploma in Electronics and Communication Engineering** (2020 – 2023)\n" +
        "  - *SMT B. Seetha Polytechnic*, Bhimavaram, AP\n" +
        "  - Cumulative GPA: **9.3 / 10**",
    };
  }

  // 14. ALL PROJECTS OVERVIEW
  if (
    query.includes("project") ||
    query.includes("projects") ||
    query.includes("portfolio work") ||
    query.includes("what did he build") ||
    query.includes("what have you built")
  ) {
    return {
      intent: "Selected Projects",
      sources: ["Selected Work Bento", "Project Case Studies"],
      followUps: [
        "Explain BloodBridge's 14-node architecture",
        "Tell me about the CBSE Exam Generator",
        "Tell me about the Fashion Recommender",
      ],
      answer:
        "**Subhani's Core Engineering Projects:**\n\n" +
        "1. **BloodBridge AI**: 14-node LangGraph emergency donor coordination machine with <100ms Neo4j antigen scoring and Vapi.ai voice dispatch (Top 12 Finalist).\n" +
        "2. **AI Exam Generator (Ruvinsys)**: 4-agent FastAPI pipeline synthesizing CBSE exams in <10s with PyMuPDF + Gemini Vision OCR into Qdrant.\n" +
        "3. **Fashion Image Recommender**: VGG16 CNN feature extraction with sub-second cosine distance matching in Streamlit.\n" +
        "4. **Secure Password Manager**: AES-256-GCM AEAD encrypted vaults with bcrypt 12-round salted master passwords and stateless JWT.\n" +
        "5. **NIT Student Dashboard**: Academic AI chatbot platform with PDF dropzone and vector retrieval.",
    };
  }

  // 15. FASHION RECOMMENDER
  if (
    query.includes("fashion") ||
    query.includes("vgg16") ||
    query.includes("recommender") ||
    query.includes("image similarity")
  ) {
    return {
      intent: "Fashion Recommender Case Study",
      sources: ["Project: Fashion Recommender", "VGG16 Architecture"],
      followUps: [
        "Why did you choose VGG16 for feature extraction?",
        "What other machine learning projects have you built?",
        "Tell me about BloodBridge AI",
      ],
      answer:
        "**Women Fashion Image Recommender System:**\n\n" +
        "• **Architecture**: Pretrained VGG16 CNN processes catalog imagery to generate 512-dimensional deep visual embeddings, which are L2-normalized.\n" +
        "• **Performance**: Pre-computed matrix allows sub-second query-time pairwise cosine similarity distance calculations on CPU.\n" +
        "• **Interface**: Built with Streamlit for interactive image uploads and nearest outfit recommendations.\n" +
        "• **Tech**: Python, TensorFlow, Keras, VGG16, NumPy, Scikit-Learn (GitHub: [github.com/mahaboobsub/Fashion_Recommendation_System_using_Image_Features](https://github.com/mahaboobsub/Fashion_Recommendation_System_using_Image_Features)).",
    };
  }

  // 16. PASSWORD MANAGER
  if (
    query.includes("password") ||
    query.includes("aes") ||
    query.includes("jwt") ||
    query.includes("crypto") ||
    query.includes("security")
  ) {
    return {
      intent: "Password Manager Case Study",
      sources: ["Project: Secure Password Manager", "Security Architecture"],
      followUps: [
        "What encryption standards were used?",
        "Tell me about your Node.js backend experience",
        "What other projects have you built?",
      ],
      answer:
        "**Secure Password Manager Platform:**\n\n" +
        "• **AES-256-GCM AEAD**: Authenticated symmetric encryption protects credential payloads with unique IVs.\n" +
        "• **Bcrypt Hashing**: 12 salt rounds protect master user passwords against brute-force attacks.\n" +
        "• **Stateless JWT**: Secure token authorization and session management.\n" +
        "• **Security Principle**: Zero plain-text credentials stored in databases or server logs.\n" +
        "• **Tech**: Node.js, Express.js, MySQL, REST APIs (GitHub: [github.com/mahaboobsub/passwordManager-ls](https://github.com/mahaboobsub/passwordManager-ls)).",
    };
  }

  // DEFAULT COMPREHENSIVE OVERVIEW
  return {
    intent: "General Knowledge Retrieval",
    sources: ["Résumé & Portfolio Knowledge Base", "Case Studies"],
    followUps: [
      "Why should we hire Subhani?",
      "What are his top projects?",
      "How can I contact Subhani?",
    ],
    answer:
      "**Sheik Mahaboob Subhani — AI-SDE (AI & Full Stack Developer)**\n\n" +
      "He specializes in autonomous multi-agent systems and high-throughput AI backends:\n\n" +
      "• **Key Systems**: BloodBridge AI (14-node LangGraph & <100ms Neo4j donor matching) and the Ruvinsys CBSE Exam Generator (<10s SLA).\n" +
      "• **Core Tech**: Python, FastAPI, LangGraph, Qdrant, Neo4j, Node.js, Express, React, and Java.\n" +
      "• **Highlights**: 250+ DSA problems solved, Oracle GenAI Certified, Top 12 Hackathon Finalist.\n" +
      "• **Contact**: [skmahaboobsubhani62@gmail.com](mailto:skmahaboobsubhani62@gmail.com) | [LinkedIn](https://linkedin.com/in/sheik-mahaboob-subhani) | [GitHub](https://github.com/mahaboobsub).\n\n" +
      "Feel free to ask a specific question about his work, code, or background!",
  };
}
