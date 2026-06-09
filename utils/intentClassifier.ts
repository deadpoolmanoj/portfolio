// intentClassifier.ts

export type IntentType =
  | "projects"
  | "skills"
  | "education"
  | "blogs"
  | "askManoj"
  | "resume"
  | "unknown";

export type SkillsSubIntent =
  | "skills_frontend"
  | "skills_backend"
  | "skills_languages"
  | "skills_devops"
  | "skills_tools"
  | "skills_concepts"
  | "skills_specific"
  | "skills_overview"
  | "skills_question";

export type ProjectsSubIntent =
  | "projects_specific"
  | "projects_overview"
  | "projects_question";

export type EducationSubIntent =
  | "education_overview"
  | "education_timeline"
  | "education_institution"
  | "education_score"
  | "education_degree"
  | "education_question";

export interface ParsedIntent {
  intent: IntentType;
  hasSubIntent: boolean;
  subIntent?: SkillsSubIntent | ProjectsSubIntent | EducationSubIntent;
  subjectKeyword?: string;
  context?: string;
}

// ─────────────────────────────────────────────────────────────
// VOCABULARY
// ─────────────────────────────────────────────────────────────

const INTENT_KEYWORDS: { intent: IntentType; keywords: string[] }[] = [
  {
    intent: "projects",
    keywords: [
      "project", "projects", "built", "build", "created", "make", "made",
      "work", "works", "portfolio", "github", "repo", "repository",
      "app", "application", "website", "site", "tool", "product",
      "side project", "open source", "showcase", "demo", "live",
      "skribbbly", "finovex", "haqms", "task manager", "workflow builder",
    ],
  },
  {
    intent: "skills",
    keywords: [
      "skill", "skills", "stack", "tech", "technologies", "technology",
      "experience", "proficient", "know", "use", "using", "work with",
      "familiar", "expertise", "good at", "capable", "tools",
      "language", "languages", "framework", "frameworks", "library", "libraries",
      "frontend", "backend", "database", "devops", "cloud",
      "react", "next", "nextjs", "tailwind", "shadcn", "tanstack",
      "node", "nodejs", "express", "postgres", "postgresql", "mongodb",
      "redis", "supabase", "docker", "vercel", "netlify", "github",
      "javascript", "typescript", "python", "sql",
      "postman", "swagger", "dsa", "agile", "mvc",
    ],
  },
  {
    intent: "education",
    keywords: [
      "education", "study", "studies", "studied", "college", "school",
      "university", "degree", "academic", "academics", "qualification",
      "background", "learn", "learned", "course", "curriculum",
      "mca", "bsc", "bachelor", "master", "10th", "12th", "ssc", "hsc",
      "manipal", "mumbai", "sikkim", "rizvi", "xavier",
      "cgpa", "marks", "percentage", "score", "grade", "gpa",
    ],
  },
  {
    intent: "blogs",
    keywords: [
      "blog", "blogs", "article", "articles", "write", "writes", "wrote",
      "post", "posts", "written", "writing", "read", "reads",
      "publish", "published", "newsletter", "content",
    ],
  },
  {
    intent: "askManoj",
    keywords: [
      "ask manoj",
      "manoj",
      "ask you",
      "tell me about you",
      "who are you",
      "yourself",
      "about you",
      "what can you do",
    ],
  },
  {
    intent: "resume",
    keywords: [
      "resume",
      "cv",
      "curriculum vitae",
      "download resume",
      "view resume",
      "manoj resume",
      "portfolio resume",
      "experience pdf",
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// SKILL CATEGORY BUCKETS
// ─────────────────────────────────────────────────────────────

const FRONTEND_KEYWORDS = [
  "react", "next", "nextjs", "next.js", "tailwind", "tailwindcss",
  "shadcn", "tanstack", "html", "css", "frontend", "front end", "front-end",
  "ui", "interface", "component", "jsx", "tsx",
];

const BACKEND_KEYWORDS = [
  "node", "nodejs", "node.js", "express", "expressjs", "express.js",
  "server", "api", "rest", "backend", "back end", "back-end",
  "postgres", "postgresql", "mongodb", "mongo", "redis", "supabase",
  "database", "db", "prisma", "orm", "websocket", "socket",
];

const LANGUAGES_KEYWORDS = [
  "javascript", "js", "typescript", "ts", "python", "sql", "language",
];

const DEVOPS_KEYWORDS = [
  "docker", "vercel", "netlify", "github", "git", "deployment", "deploy",
  "devops", "cloud", "hosting", "ci", "cd", "pipeline",
];

const TOOLS_KEYWORDS = [
  "postman", "swagger", "openapi", "testing", "tool", "tools",
];

const CONCEPTS_KEYWORDS = [
  "dsa", "data structure", "algorithm", "agile", "scrum", "mvc",
  "design pattern", "architecture", "concept",
];

// ─────────────────────────────────────────────────────────────
// QUESTION KEYWORD BUCKETS
// ─────────────────────────────────────────────────────────────

const PROJECTS_QUESTION_KEYWORDS = [
  "hardest", "easiest", "difficult", "challenging", "favourite", "favorite",
  "best", "worst", "most", "least", "proud", "complex", "simple",
  "which", "what was", "how was", "tell me about", "explain",
  "describe", "why", "how did", "what did", "what were",
  "interesting", "fun", "enjoyed", "liked", "loved", "hated",
  "took longest", "time", "struggled", "learned", "lesson",
  "recent", "latest", "biggest", "smallest", "impactful",
];

const SKILLS_QUESTION_KEYWORDS = [
  "which", "what", "favourite", "favorite", "best", "most", "least",
  "strongest", "weakest", "confident", "comfortable", "prefer",
  "use most", "use the most", "often", "mainly", "primarily",
  "how good", "how well", "rate", "rating", "level", "proficiency",
  "how long", "years", "experience with", "tell me about", "explain",
  "describe", "why", "enjoy", "enjoyed", "like", "liked",
];

const EDUCATION_QUESTION_KEYWORDS = [
  "which", "what", "favourite", "favorite", "best", "hardest",
  "easiest", "enjoyed", "liked", "struggled", "why did", "how was",
  "tell me", "describe", "explain", "interesting", "fun",
  "challenging", "difficult", "proud", "how long", "duration",
];

// ─────────────────────────────────────────────────────────────
// PROJECT NAME BUCKETS
// ─────────────────────────────────────────────────────────────

const PROJECT_NAMES = [
  "skribbbly", "finovex", "haqms", "task manager",
  "workflow builder", "portfolio", "ai builder",
  "dsa visualizer", "bud 101", "openlog", "recruiter radar",
];

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s.]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function similarity(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j++) dp[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j] + 1
        );
      }
    }
  }
  return 1 - dp[b.length][a.length] / Math.max(a.length, b.length);
}

function matches(text: string, keyword: string): boolean {
  if (text.includes(keyword)) return true;
  return text.split(" ").some((w) => similarity(w, keyword) > 0.82);
}

function anyMatch(text: string, keywords: string[]): boolean {
  return keywords.some((kw) => matches(text, kw));
}

function firstMatch(text: string, keywords: string[]): string | undefined {
  return keywords.find((kw) => matches(text, kw));
}

// ─────────────────────────────────────────────────────────────
// BASE INTENT
// ─────────────────────────────────────────────────────────────

function detectBaseIntent(text: string): IntentType {
  let best: { intent: IntentType; score: number } = { intent: "unknown", score: 0 };

  for (const group of INTENT_KEYWORDS) {
    let score = 0;
    for (const keyword of group.keywords) {
      if (matches(text, keyword)) score++;
    }
    if (score > best.score) {
      best = { intent: group.intent as IntentType, score };
    }
  }

  return best.score > 0 ? best.intent : "unknown";
}

// ─────────────────────────────────────────────────────────────
// SKILLS SUB-INTENT
// ─────────────────────────────────────────────────────────────

function detectSkillsSubIntent(text: string): {
  subIntent: SkillsSubIntent;
  hasSubIntent: boolean;
  subjectKeyword?: string;
  context?: string;
} {
  if (anyMatch(text, FRONTEND_KEYWORDS)) {
    const keyword = firstMatch(text, FRONTEND_KEYWORDS)!;
    return {
      subIntent: "skills_frontend",
      hasSubIntent: true,
      subjectKeyword: keyword,
      context: `User is asking about Manoj's frontend skill: "${keyword}". Explain his experience, projects where he used it, and his proficiency level.`,
    };
  }

  if (anyMatch(text, BACKEND_KEYWORDS)) {
    const keyword = firstMatch(text, BACKEND_KEYWORDS)!;
    return {
      subIntent: "skills_backend",
      hasSubIntent: true,
      subjectKeyword: keyword,
      context: `User is asking about Manoj's backend skill: "${keyword}". Explain his experience, how he used it in projects, and his depth of knowledge.`,
    };
  }

  if (anyMatch(text, LANGUAGES_KEYWORDS)) {
    const keyword = firstMatch(text, LANGUAGES_KEYWORDS)!;
    return {
      subIntent: "skills_languages",
      hasSubIntent: true,
      subjectKeyword: keyword,
      context: `User is asking about Manoj's experience with the programming language: "${keyword}".`,
    };
  }

  if (anyMatch(text, DEVOPS_KEYWORDS)) {
    const keyword = firstMatch(text, DEVOPS_KEYWORDS)!;
    return {
      subIntent: "skills_devops",
      hasSubIntent: true,
      subjectKeyword: keyword,
      context: `User is asking about Manoj's DevOps/cloud skill: "${keyword}".`,
    };
  }

  if (anyMatch(text, TOOLS_KEYWORDS)) {
    const keyword = firstMatch(text, TOOLS_KEYWORDS)!;
    return {
      subIntent: "skills_tools",
      hasSubIntent: true,
      subjectKeyword: keyword,
      context: `User is asking about Manoj's tooling knowledge: "${keyword}".`,
    };
  }

  if (anyMatch(text, CONCEPTS_KEYWORDS)) {
    const keyword = firstMatch(text, CONCEPTS_KEYWORDS)!;
    return {
      subIntent: "skills_concepts",
      hasSubIntent: true,
      subjectKeyword: keyword,
      context: `User is asking about Manoj's conceptual knowledge: "${keyword}".`,
    };
  }

  // question about skills without a specific tech mentioned
  if (anyMatch(text, SKILLS_QUESTION_KEYWORDS)) {
    const keyword = firstMatch(text, SKILLS_QUESTION_KEYWORDS);
    return {
      subIntent: "skills_question",
      hasSubIntent: true,
      subjectKeyword: keyword,
      context: `User is asking a question about Manoj's skills: "${text}". Answer based on his full skill set — React, Next.js, TypeScript, Node.js, Express, PostgreSQL, Supabase, Prisma, Redis, Socket.io, Docker, and more. Be specific and personal in tone.`,
    };
  }

  return {
    subIntent: "skills_overview",
    hasSubIntent: false,
  };
}

// ─────────────────────────────────────────────────────────────
// PROJECTS SUB-INTENT
// ─────────────────────────────────────────────────────────────

function detectProjectsSubIntent(text: string): {
  subIntent: ProjectsSubIntent;
  hasSubIntent: boolean;
  subjectKeyword?: string;
  context?: string;
} {
  // specific project name mentioned
  const projectName = firstMatch(text, PROJECT_NAMES);
  if (projectName) {
    return {
      subIntent: "projects_specific",
      hasSubIntent: true,
      subjectKeyword: projectName,
      context: `User is asking about a specific project: "${projectName}". Describe what it is, the tech stack used, key technical challenges, and what Manoj learned from it.`,
    };
  }

  // question/comparison about projects — needs AI answer
  if (anyMatch(text, PROJECTS_QUESTION_KEYWORDS)) {
    const keyword = firstMatch(text, PROJECTS_QUESTION_KEYWORDS);
    return {
      subIntent: "projects_question",
      hasSubIntent: true,
      subjectKeyword: keyword,
      context: `User is asking a question about Manoj's projects: "${text}". Answer based on his projects — DSA Visualizer, Bud 101, OpenLog, Recruiter Radar, Skribbbly, HAQMS, Task Manager API. Be specific and personal in tone.`,
    };
  }

  // "show me your projects" — render component directly
  return {
    subIntent: "projects_overview",
    hasSubIntent: false,
  };
}

// ─────────────────────────────────────────────────────────────
// EDUCATION SUB-INTENT
// ─────────────────────────────────────────────────────────────

function detectEducationSubIntent(text: string): {
  subIntent: EducationSubIntent;
  hasSubIntent: boolean;
  subjectKeyword?: string;
  context?: string;
} {
  if (
    anyMatch(text, ["when", "year", "passed", "complete", "finish", "completed",
      "finished", "graduated", "graduation", "duration", "12th", "10th", "2018",
      "2020", "2023", "2025"])
  ) {
    return {
      subIntent: "education_timeline",
      hasSubIntent: true,
      subjectKeyword: "timeline",
      context: "User is asking about the timeline of Manoj's education — when he completed each degree or school.",
    };
  }

  if (
    anyMatch(text, ["where", "college", "school", "university", "institution",
      "manipal", "mumbai", "sikkim", "rizvi", "xavier", "name of"])
  ) {
    return {
      subIntent: "education_institution",
      hasSubIntent: true,
      subjectKeyword: "institution",
      context: "User is asking about which colleges or schools Manoj attended.",
    };
  }

  if (
    anyMatch(text, ["cgpa", "percentage", "marks", "score", "grade", "gpa",
      "result", "how much", "how well", "8.4"])
  ) {
    return {
      subIntent: "education_score",
      hasSubIntent: true,
      subjectKeyword: "score",
      context: "User is asking about Manoj's academic scores, CGPA, or grades.",
    };
  }

  if (
    anyMatch(text, ["degree", "mca", "bsc", "bachelor", "master", "course",
      "what did", "what he studied", "major", "specialization"])
  ) {
    return {
      subIntent: "education_degree",
      hasSubIntent: true,
      subjectKeyword: "degree",
      context: "User is asking about what degree or course Manoj pursued.",
    };
  }

  // question about education without a specific category
  if (anyMatch(text, EDUCATION_QUESTION_KEYWORDS)) {
    const keyword = firstMatch(text, EDUCATION_QUESTION_KEYWORDS);
    return {
      subIntent: "education_question",
      hasSubIntent: true,
      subjectKeyword: keyword,
      context: `User is asking a question about Manoj's education: "${text}". Answer based on his background — BSc IT from University of Mumbai, MCA final year at Sikkim Manipal University. Be specific and personal in tone.`,
    };
  }

  return {
    subIntent: "education_overview",
    hasSubIntent: false,
  };
}

// ─────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────

export function classifyUserInput(input: string): ParsedIntent {
  const text = normalize(input);
  const intent = detectBaseIntent(text);

  if (intent === "skills") {
    const result = detectSkillsSubIntent(text);
    return { intent, ...result };
  }

  if (intent === "projects") {
    const result = detectProjectsSubIntent(text);
    return { intent, ...result };
  }

  if (intent === "education") {
    const result = detectEducationSubIntent(text);
    return { intent, ...result };
  }

  if (intent === "blogs") {
    return { intent, hasSubIntent: false };
  }

  if (intent === "askManoj") {
    return { intent, hasSubIntent: false, };
  }

  if (intent === "resume") {
    return { intent, hasSubIntent: false, };
  }

  return { intent: "unknown", hasSubIntent: false };
}


// ─────────────────────────────────────────────────────────────
// HOW TO USE IN YOUR CHAT HANDLER
// ─────────────────────────────────────────────────────────────
//
// const result = classifyUserInput(userMessage);
//
// if (result.hasSubIntent) {
//   // send result.context to OpenAI and stream the reply as text
//   const aiReply = await callOpenAI(result.context!);
//   renderTextResponse(aiReply);
// } else {
//   // render the matching React component directly
//   switch (result.intent) {
//     case "projects":   return <ChatProjects />;
//     case "skills":     return <ChatSkills />;
//     case "education":  return <ChatEducation />;
//     case "blogs":      return <ChatBlogs />;
//     default:           return <ChatUnknown />;
//   }
// }