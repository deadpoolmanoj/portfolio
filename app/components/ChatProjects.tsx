"use client";

import React from "react";
import Badge from "./Badge";
import DownLoadResumeButton from "./DownLoadResumeButton";
import ResponseFooter from "./ResponseFooter";
import { ExternalLink } from "lucide-react";
import { IoLogoGithub } from "react-icons/io";

interface Project {
  title: string;
  institution: string;
  description: string;
  longDescription: string;
  stack: string[];
  extraStack: string[];
  highlights: string[];
  tags: string[];
  status: "Active" | "Archived" | "WIP";
  year: string;
  github?: string;
  demo?: string;
}

const PROJECTS: Project[] = [
  {
    title: "DSA Visualizer",
    institution: "Personal Project",
    description: "Step-by-step animation engine for 18+ sorting and graph algorithms with a live Big-O complexity panel.",
    longDescription:
      "Each algorithmic frame is rendered discretely — users can pause, rewind, and scrub through any algorithm manually. Built originally as a study tool, it grew into a shareable visualisation playground used by fellow students preparing for technical interviews.",
    stack: ["Python", "TypeScript", "React"],
    extraStack: ["Canvas API", "Zustand", "Vite"],
    highlights: [
      "Custom animation scheduler on requestAnimationFrame for jank-free playback",
      "Supports BFS, DFS, Dijkstra, quicksort, merge sort, heap sort, and more",
      "Shareable permalink encodes algorithm + input state in the URL",
    ],
    tags: ["Algorithms", "Data Structures", "Education", "Open Source"],
    status: "Active",
    year: "2024",
    github: "#",
    demo: "#",
  },
  {
    title: "Bud 101",
    institution: "Personal Project",
    description:
      "AI assistant trained on your portfolio — lets recruiters ask anything about your work and get grounded, cited answers.",
    longDescription:
      "The RAG pipeline indexes all portfolio content into a vector store and retrieves the most relevant chunks at query time, keeping responses accurate and hallucination-free. Built because I was tired of writing the same intro emails over and over.",
    stack: ["Next.js", "Node.js", "OpenAI"],
    extraStack: ["Pinecone", "TypeScript", "Vercel AI SDK"],
    highlights: [
      "Semantic paragraph chunking with overlapping windows for better retrieval",
      "Streaming responses with inline source citations and confidence indicators",
      "Multi-turn conversation with retained context across follow-up questions",
    ],
    tags: ["AI / RAG", "Portfolio", "LLM", "Full-stack"],
    status: "Active",
    year: "2025",
    github: "#",
    demo: "#",
  },
  {
    title: "OpenLog",
    institution: "Open Source",
    description:
      "Zero-config structured JSON logging SDK for Node.js with a companion CLI viewer — no third-party service required.",
    longDescription:
      "Drop it into any project and it just works. Designed for teams who want structured logs in development without the overhead of setting up Datadog or Logtail from day one. Published on npm with full TypeScript support.",
    stack: ["Node.js", "TypeScript"],
    extraStack: ["CLI", "Jest", "npm"],
    highlights: [
      "Layered config: sensible defaults, env overrides, and a programmatic API",
      "Request-scoped correlation IDs automatically injected via AsyncLocalStorage",
      "CLI viewer supports live tail, level filtering, and keyword search",
    ],
    tags: ["Developer Tools", "SDK", "Open Source", "npm package"],
    status: "Archived",
    year: "2023",
    github: "#",
  },
  {
    title: "Recruiter Radar",
    institution: "Personal Project",
    description:
      "Tracks job postings across boards, diffs descriptions week-over-week, and alerts you on meaningful changes.",
    longDescription:
      "Born out of frustration watching roles change after I had already applied. Snapshots job descriptions on a schedule and surfaces changes — salary bands added, requirements softened, roles quietly re-opened — delivered as a clean email or webhook digest.",
    stack: ["Python", "FastAPI", "React"],
    extraStack: ["Playwright", "PostgreSQL", "Redis", "SendGrid"],
    highlights: [
      "Rotating proxy strategy with polite crawl intervals to bypass anti-scraping",
      "Fuzzy title + company matching for deduplication across multiple boards",
      "Configurable webhook and email digest with visual diff highlighting",
    ],
    tags: ["Automation", "Scraping", "Job Search", "Side Project"],
    status: "WIP",
    year: "2024",
    github: "#",
    demo: "#",
  },
];

const Thumb = ({ title }: { title: string }) => (
  <div className="w-[72px] h-[52px] rounded-lg border border-[#f0f0f0] bg-[#fafafa] flex-shrink-0 flex items-center justify-center overflow-hidden relative">
    <svg className="absolute inset-0 opacity-20 w-full h-full">
      <defs>
        <pattern
          id={`g-${title.replace(/\s/g, "")}`}
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path d="M10 0L0 0 0 10" fill="none" stroke="#94a3b8" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#g-${title.replace(/\s/g, "")})`} />
    </svg>
    <span className="text-[9px] font-medium text-[#9b9b9b] text-center leading-tight px-1.5 relative z-10">
      {title}
    </span>
  </div>
);

const ProjectRow = ({ project, isLast }: { project: Project; isLast: boolean }) => (
  <div className={`py-5 ${!isLast ? "border-b border-[#f0f0f0]" : ""}`}>

    {/* Top: thumbnail + title block */}
    <div className="flex gap-3 items-start mb-3">
      <Thumb title={project.title} />

      <div className="flex-1 min-w-0">
        {/* Title + status + year */}
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          <p className="text-[14px] font-medium text-[#1a1a1a]">{project.title}</p>
          {project.status === "Active" && (
            <span className="text-[10px] font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              Active
            </span>
          )}
          {project.status === "WIP" && (
            <span className="text-[10px] font-medium bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
              In Progress
            </span>
          )}
          <span className="text-[11px] text-[#9b9b9b]">{project.year}</span>
        </div>

        {/* Institution */}
        <p className="text-[12px] text-[#585858] mb-2">{project.institution}</p>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Badge key={s} text={s} />
          ))}
          {project.extraStack.map((s) => (
            <Badge key={s} text={s} />
          ))}
        </div>
      </div>
    </div>

    {/* Description */}
    <p className="text-[12px] text-[#585858] leading-relaxed mb-1">
      {project.description}
    </p>
    <p className="text-[12px] text-[#585858] leading-relaxed mb-3">
      {project.longDescription}
    </p>

    {/* Highlights */}
    <div className="border-l-2 border-[#e9ecef] pl-3 mb-3 space-y-1">
      {project.highlights.map((h, i) => (
        <p key={i} className="text-[12px] text-[#585858] leading-relaxed">
          {h}
        </p>
      ))}
    </div>

    {/* Tags */}
    <div className="flex flex-wrap gap-1.5 mb-3">
      {project.tags.map((t) => (
        <Badge key={t} text={t} />
      ))}
    </div>

    {/* Links */}
    <div className="flex items-center gap-2">
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white bg-[#1a1a1a] rounded-md px-3 py-1.5 no-underline"
        >
          <ExternalLink size={11} />
          Live
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#1a1a1a] border border-[#e5e7eb] rounded-md px-3 py-1.5 no-underline"
        >
          <IoLogoGithub size={13} />
          Github
        </a>
      )}
    </div>
  </div>
);

const ChatProjects = () => (
  <div className="w-full">

    {/* Header */}
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-4">
        <Badge text="Projects" />
        <span className="text-[11px] text-[#9b9b9b]">4 selected works</span>
      </div>

      <h1 className="text-[15px] font-medium text-[#1a1a1a] leading-snug mb-2">
        Things I've built from scratch
      </h1>

      <div className="space-y-3">
        <p className="text-[12px] text-[#585858] leading-relaxed">
          A mix of tools, apps, and side projects — ranging from
          <span className="font-medium text-[#1a1a1a]"> production systems</span> to
          <span className="font-medium text-[#1a1a1a]"> open-source experiments</span>.
          Each one solved a real problem I ran into while learning or working.
        </p>

        <p className="text-[12px] text-[#585858] leading-relaxed">
          The stack spans
          <span className="font-medium text-[#1a1a1a]"> React</span>,
          <span className="font-medium text-[#1a1a1a]"> Node.js</span>,
          <span className="font-medium text-[#1a1a1a]"> Python</span>, and
          <span className="font-medium text-[#1a1a1a]"> AI/LLM tooling</span> —
          with a consistent focus on shipping things that actually work end to end,
          not just demos.
        </p>

        <div className="border-l-2 border-[#e9ecef] pl-3">
          <p className="text-[12px] text-[#585858] leading-relaxed">
            What stands out isn't just the code — it's the combination of
            <span className="font-medium text-[#1a1a1a]"> technical depth</span> and
            <span className="font-medium text-[#1a1a1a]"> real-world motivation</span>.
            Every project here started because something was missing or frustrating,
            and ended with something usable.
          </p>
        </div>
      </div>
    </div>

    {/* Project list */}
    <div className="mt-4">
      {PROJECTS.map((p, i) => (
        <ProjectRow key={p.title} project={p} isLast={i === PROJECTS.length - 1} />
      ))}
    </div>

    {/* Footer */}
    <p className="text-[12px] text-[#585858] leading-relaxed mt-4">
      These projects highlight different aspects of my work — from frontend
      engineering and system design to AI-powered applications. Feel free to
      ask about the architecture, challenges, or technical decisions behind any project.
    </p>

    <div className="mt-4">
      <DownLoadResumeButton />
    </div>
  </div>
);

export default ChatProjects;
export { PROJECTS };
export type { Project };

