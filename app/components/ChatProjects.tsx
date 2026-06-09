"use client";

import React from "react";
import Badge from "./Badge";
import DownLoadResumeButton from "./DownLoadResumeButton";
import ResponseFooter from "./ResponseFooter";
import { ExternalLink } from "lucide-react";
import { IoLogoGithub } from "react-icons/io";
import Image from "next/image";

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
  image?: string;
  github?: string;
  demo?: string;
}

const PROJECTS: Project[] = [
  {
    title: "scribbbly",
    image: "/projects/scribbbly.jpeg",
    institution: "Personal Project",
    description:
      "Real-time multiplayer drawing and guessing game with live room management, chat, scoring, and gameplay synchronization.",
    longDescription:
      "Developed a full-stack multiplayer web application where players can create rooms, draw words, guess drawings, and compete in real time. Built with WebSockets for instant communication and synchronized game state across all connected users.",
    stack: ["Next.js", "Node.js", "Socket.io"],
    extraStack: ["TypeScript", "Tailwind CSS"],
    highlights: [
      "Implemented WebSocket-based communication for real-time synchronization and chat",
      "Built scoring systems, round management, player tracking, and timer-based gameplay",
      "Optimized application performance and reliability through testing and debugging",
    ],
    tags: ["Real-time", "Multiplayer", "WebSockets", "Full Stack"],
    status: "Active",
    year: "2025",
    github: "#",
    demo: "#",
  },
  {
    title: "Finovex",
    image: "/projects/finovex.jpeg",
    institution: "Personal Project",
    description:
      "Personal finance management platform for budgeting, transaction tracking, savings management, and financial planning.",
    longDescription:
      "Built a full-stack finance management application that helps users monitor expenses, manage budgets, track savings goals, and gain better control over their financial activities through an intuitive dashboard.",
    stack: ["Next.js", "TypeScript"],
    extraStack: ["REST APIs", "OAuth"],
    highlights: [
      "Developed RESTful APIs for CRUD operations and secure data handling",
      "Implemented OAuth-based authentication and user account management",
      "Designed modular and maintainable application architecture following software engineering principles",
    ],
    tags: ["Finance", "Full Stack", "REST APIs", "Authentication"],
    status: "Active",
    year: "2025",
    github: "#",
    demo: "#",
  },
  {
    title: "Fantsea",
    institution: "Client Project",
    description:
      "Responsive event-service showcase platform designed to present services and manage business content effectively.",
    longDescription:
      "Developed a business-focused website using Node.js and MongoDB, enabling service presentation, content management, and seamless communication of offerings to potential customers.",
    stack: ["Node.js", "Express.js"],
    extraStack: ["MongoDB", "HTML", "CSS"],
    highlights: [
      "Implemented both frontend interfaces and backend business functionality",
      "Worked directly with stakeholders to gather requirements and deliver features",
      "Participated in testing, deployment, documentation, and project delivery",
    ],
    tags: ["Business Website", "Backend", "MongoDB", "Client Work"],
    status: "Archived",
    year: "2024",
    github: "#",
  },
];

const Thumb = ({
  title,
  image,
}: {
  title: string;
  image?: string;
}) => (
  <div
    className="w-[72px] h-[52px] rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden relative"
    style={{
      border: "1px solid var(--color-border-light)",
      backgroundColor: "var(--color-bg-subtle)",
    }}
  >
    {image ? (
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
      />
    ) : (
      <>
        <svg className="absolute inset-0 opacity-20 w-full h-full">
          <defs>
            <pattern
              id={`g-${title.replace(/\s/g, "")}`}
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M10 0L0 0 0 10"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill={`url(#g-${title.replace(/\s/g, "")})`}
          />
        </svg>

        <span
          className="text-[9px] font-medium text-center leading-tight px-1.5 relative z-10"
          style={{ color: "var(--color-text-muted)" }}
        >
          {title}
        </span>
      </>
    )}
  </div>
);

const ProjectRow = ({ project, isLast }: { project: Project; isLast: boolean }) => (
  <div
    className="py-5"
    style={!isLast ? { borderBottom: "1px solid var(--color-border-light)" } : {}}
  >
    {/* Top: thumbnail + title block */}
    <div className="flex gap-3 items-start mb-3">
      <Thumb title={project.title} image={project.image} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          <p className="text-[14px] font-medium" style={{ color: "var(--color-text-primary)" }}>
            {project.title}
          </p>
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
          <span className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>
            {project.year}
          </span>
        </div>

        <p className="text-[12px] mb-2" style={{ color: "var(--color-text-secondary)" }}>
          {project.institution}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => <Badge key={s} text={s} />)}
          {project.extraStack.map((s) => <Badge key={s} text={s} />)}
        </div>
      </div>
    </div>

    <p className="text-[12px] leading-relaxed mb-1" style={{ color: "var(--color-text-secondary)" }}>
      {project.description}
    </p>
    <p className="text-[12px] leading-relaxed mb-3" style={{ color: "var(--color-text-secondary)" }}>
      {project.longDescription}
    </p>

    <div
      className="pl-3 mb-3 space-y-1"
      style={{ borderLeft: "2px solid var(--color-border)" }}
    >
      {project.highlights.map((h, i) => (
        <p key={i} className="text-[12px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          {h}
        </p>
      ))}
    </div>

    <div className="flex flex-wrap gap-1.5 mb-3">
      {project.tags.map((t) => <Badge key={t} text={t} />)}
    </div>

    <div className="flex items-center gap-2">
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white rounded-md px-3 py-1.5 no-underline"
          style={{ backgroundColor: "var(--color-text-primary)" }}
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
          className="inline-flex items-center gap-1.5 text-[11px] font-medium rounded-md px-3 py-1.5 no-underline"
          style={{
            color: "var(--color-text-primary)",
            border: "1px solid var(--color-border)",
          }}
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

    <div className="mb-4">
      <div className="flex items-center gap-2 mb-4">
        <Badge text="Projects" />
        <span className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>
          4 selected works
        </span>
      </div>

      <h1 className="text-[15px] font-medium leading-snug mb-2" style={{ color: "var(--color-text-primary)" }}>
        Things I've built from scratch
      </h1>

      <div className="space-y-3">
        <p
          className="text-[12px] leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          A collection of full-stack applications built to solve real-world problems,
          ranging from
          <span
            className="font-medium"
            style={{ color: "var(--color-text-primary)" }}
          >
            {" "}real-time multiplayer experiences
          </span>
          {" "}to
          <span
            className="font-medium"
            style={{ color: "var(--color-text-primary)" }}
          >
            {" "}personal finance management
          </span>
          {" "}and business-focused web platforms. Each project challenged me to design,
          build, test, and improve complete software solutions.
        </p>

        <p
          className="text-[12px] leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          The stack spans
          <span
            className="font-medium"
            style={{ color: "var(--color-text-primary)" }}
          >
            {" "}Next.js, Node.js, TypeScript, Express.js, MongoDB,
          </span>
          {" "}and
          <span
            className="font-medium"
            style={{ color: "var(--color-text-primary)" }}
          >
            {" "}Socket.io
          </span>
          , with a strong focus on building scalable applications, developing REST APIs,
          implementing authentication, and creating responsive user experiences.
        </p>

        <div
          className="pl-3"
          style={{ borderLeft: "2px solid var(--color-border)" }}
        >
          <p
            className="text-[12px] leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            What stands out isn't just the technology stack—it's the emphasis on
            practical software engineering. From real-time communication and API
            development to testing, debugging, optimization, and deployment, each
            project reflects my commitment to building reliable and maintainable
            applications from end to end.
          </p>
        </div>
      </div>
    </div>

    <div className="mt-4">
      {PROJECTS.map((p, i) => (
        <ProjectRow key={p.title} project={p} isLast={i === PROJECTS.length - 1} />
      ))}
    </div>

    <p className="text-[12px] leading-relaxed mt-4" style={{ color: "var(--color-text-secondary)" }}>
      These projects highlight different aspects of my work — from frontend engineering and system design
      to AI-powered applications. Feel free to ask about the architecture, challenges, or technical decisions
      behind any project.
    </p>

    <div className="mt-4">
      <DownLoadResumeButton />
    </div>
  </div>
);

export default ChatProjects;
export { PROJECTS };
export type { Project };