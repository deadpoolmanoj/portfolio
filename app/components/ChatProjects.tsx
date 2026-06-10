"use client";

import React, { useEffect, useRef } from "react";
import Badge from "./Badge";
import DownLoadResumeButton from "./DownLoadResumeButton";
import ResponseFooter from "./ResponseFooter";
import { ExternalLink } from "lucide-react";
import { IoLogoGithub } from "react-icons/io";
import Image from "next/image";
import { HIDDEN } from "./ChatBlogs";
import { useConversation } from "@/context/ConversationContext";

const animatedMessages = new Set<string>();

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
    year: "2023",
    // github: "#",
  },
];

/* ── helpers ─────────────────────────────────────────────────── */

function fadeIn(el: HTMLElement | null, durationMs = 400): Promise<void> {
  return new Promise((resolve) => {
    if (!el) { resolve(); return; }

    el.style.overflow = "hidden";
    el.style.maxHeight = "0px";
    el.style.opacity = "0";
    el.style.transform = "translateY(6px)";
    void el.offsetHeight;

    el.style.maxHeight = "9999px";
    const naturalHeight = el.scrollHeight;
    el.style.maxHeight = "0px";
    void el.offsetHeight;

    el.style.transition = `opacity ${durationMs}ms ease, transform ${durationMs}ms ease, max-height ${durationMs}ms ease`;
    el.style.maxHeight = `${naturalHeight}px`;
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";

    setTimeout(() => {
      el.style.maxHeight = "none";
      el.style.overflow = "visible";
      resolve();
    }, durationMs);
  });
}

const paragraphContents: { id: string; html: string }[] = [
  {
    id: "proj-p1",
    html: `A collection of full-stack applications built to solve real-world problems, ranging from <strong style="color:var(--color-text-primary)"> real-time multiplayer experiences</strong> to <strong style="color:var(--color-text-primary)"> personal finance management</strong> and business-focused web platforms. Each project challenged me to design, build, test, and improve complete software solutions.`,
  },
  {
    id: "proj-p2",
    html: `The stack spans <strong style="color:var(--color-text-primary)"> Next.js, Node.js, TypeScript, Express.js, MongoDB,</strong> and <strong style="color:var(--color-text-primary)"> Socket.io</strong>, with a strong focus on building scalable applications, developing REST APIs, implementing authentication, and creating responsive user experiences.`,
  },
  {
    id: "proj-p3",
    html: `What stands out isn't just the technology stack — it's the emphasis on practical software engineering. From real-time communication and API development to testing, debugging, optimization, and deployment, each project reflects my commitment to building reliable and maintainable applications from end to end.`,
  },
];

function typewriterHTML(
  el: HTMLElement | null,
  html: string,
  speed = 5,
): Promise<void> {
  return new Promise((resolve) => {
    if (!el) { resolve(); return; }

    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    const plain = tmp.textContent ?? "";

    let charIdx = 0;

    const cursor = document.createElement("span");
    cursor.style.cssText =
      "display:inline-block;width:1px;height:1em;background:var(--color-text-primary);margin-left:1px;vertical-align:text-bottom;animation:proj-blink 0.7s step-end infinite;";
    el.innerHTML = "";
    el.appendChild(cursor);

    function tick() {
      if (charIdx >= plain.length) {
        el!.innerHTML = html;
        resolve();
        return;
      }
      charIdx++;
      el!.textContent = plain.substring(0, charIdx);
      el!.appendChild(cursor);
      setTimeout(tick, speed);
    }

    tick();
  });
}

async function runSequence(
  refs: {
    badge: React.RefObject<HTMLDivElement | null>;
    heading: React.RefObject<HTMLHeadingElement | null>;
    typeSection: React.RefObject<HTMLDivElement | null>;
    proj3Wrapper: React.RefObject<HTMLDivElement | null>;
    projects: React.RefObject<HTMLDivElement | null>;
    footer: React.RefObject<HTMLParagraphElement | null>;
    footerBtn: React.RefObject<HTMLDivElement | null>;
    responseFooter: React.RefObject<HTMLDivElement | null>;
  },
  onDone?: () => void,
) {
  await fadeIn(refs.badge.current);
  await fadeIn(refs.heading.current);

  if (refs.typeSection.current) {
    refs.typeSection.current.style.maxHeight = "none";
    refs.typeSection.current.style.overflow = "visible";
    refs.typeSection.current.style.opacity = "1";
  }

  const [p1, p2, p3] = paragraphContents;
  await typewriterHTML(document.getElementById(p1.id), p1.html, 1);
  await new Promise((r) => setTimeout(r, 80));
  await typewriterHTML(document.getElementById(p2.id), p2.html, 1);
  await new Promise((r) => setTimeout(r, 80));

  // reveal the border wrapper just before typing p3
  await fadeIn(refs.proj3Wrapper.current, 200);
  await typewriterHTML(document.getElementById(p3.id), p3.html, 1);
  await new Promise((r) => setTimeout(r, 80));

  await new Promise((r) => setTimeout(r, 120));
  await fadeIn(refs.projects.current);
  await fadeIn(refs.footer.current);
  await fadeIn(refs.footerBtn.current);
  await fadeIn(refs.responseFooter.current);

  onDone?.();
}

/* ── sub-components (unchanged) ─────────────────────────────── */

const Thumb = ({ title, image }: { title: string; image?: string }) => (
  <div
    className="w-[72px] h-[52px] rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden relative"
    style={{
      border: "1px solid var(--color-border-light)",
      backgroundColor: "var(--color-bg-subtle)",
    }}
  >
    {image ? (
      <Image src={image} alt={title} fill className="object-cover" />
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
              <path d="M10 0L0 0 0 10" fill="none" stroke="#94a3b8" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#g-${title.replace(/\s/g, "")})`} />
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
      className="pl-3 mb-3 space-y-1 rounded-r-md py-2 pr-2"
      style={{
        borderLeft: "2px solid #d4845a",
        backgroundColor: "rgba(255, 172, 129, 0.06)",
      }}
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
          className="inline-flex items-center gap-1.5 text-[11px] font-medium rounded-md px-3 py-1.5 no-underline"
          style={{
            backgroundColor: "var(--color-text-primary)",
            color: "var(--color-bg-card)",
          }}
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
          style={{ color: "var(--color-text-primary)", border: "1px solid var(--color-border)" }}
        >
          <IoLogoGithub size={13} />
          Github
        </a>
      )}
    </div>
  </div>
);

/* ── main component ──────────────────────────────────────────── */

interface ChatProjectsProps {
  messageId: string;
  convoId: string;
  feedback?: "like" | "dislike" | null;
  onAnimationComplete?: () => void;
}

const ChatProjects = ({ messageId, convoId, feedback, onAnimationComplete }: ChatProjectsProps) => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const typeSectionRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLParagraphElement>(null);
  const footerBtnRef = useRef<HTMLDivElement>(null);
  const responseFooterRef = useRef<HTMLDivElement>(null);
  const proj3WrapperRef = useRef<HTMLDivElement>(null);

  const { setIsAiResponding } = useConversation()

  useEffect(() => {
    if (!document.getElementById("proj-blink-style")) {
      const style = document.createElement("style");
      style.id = "proj-blink-style";
      style.textContent = "@keyframes proj-blink { 50% { opacity: 0; } }";
      document.head.appendChild(style);
    }

    if (animatedMessages.has(messageId)) {
      setTimeout(() => {
        [badgeRef, headingRef, typeSectionRef, proj3WrapperRef, projectsRef, footerRef, footerBtnRef, responseFooterRef].forEach((ref) => {
          if (ref.current) {
            ref.current.style.maxHeight = 'none';
            ref.current.style.overflow = 'visible';
            ref.current.style.opacity = '1';
            ref.current.style.transform = 'none';
          }
        });
        paragraphContents.forEach((p) => {
          const el = document.getElementById(p.id);
          if (el) el.innerHTML = p.html;
        });
      }, 0);
      return;
    }

    [badgeRef, headingRef, typeSectionRef, proj3WrapperRef, projectsRef, footerRef, footerBtnRef, responseFooterRef].forEach((ref) => {
      if (ref.current) {
        ref.current.style.overflow = "hidden";
        ref.current.style.maxHeight = "0px";
        ref.current.style.opacity = "0";
      }
    });

    const timer = setTimeout(async () => {
      await runSequence({
        badge: badgeRef,
        heading: headingRef,
        typeSection: typeSectionRef,
        proj3Wrapper: proj3WrapperRef,
        projects: projectsRef,
        footer: footerRef,
        footerBtn: footerBtnRef,
        responseFooter: responseFooterRef,
      });
      animatedMessages.add(messageId);
      setIsAiResponding(false);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="mb-4">
        <div ref={badgeRef} className="flex items-center gap-2 mb-4" style={HIDDEN}>
          <Badge text="Projects" />
          <span className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>
            4 selected works
          </span>
        </div>

        <h1
          ref={headingRef}
          className="text-[15px] font-medium leading-snug mb-2"
          style={{ ...HIDDEN, color: "var(--color-text-primary)" }}
        >
          Things I've built from scratch
        </h1>

        {/* Typewriter paragraphs */}
        <div ref={typeSectionRef} className="space-y-3" style={HIDDEN}>
          <p id="proj-p1" className="text-[12px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }} />
          <p id="proj-p2" className="text-[12px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }} />
          <div ref={proj3WrapperRef} className="pl-3 py-2 pr-2" style={{ backgroundColor: 'rgba(255, 172, 129, 0.06)', borderLeft: "2px solid #d4845a", ...HIDDEN }}>
            <p id="proj-p3" className="text-[12px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }} />
          </div>
        </div>
      </div>

      {/* ── Project list ───────────────────────────────────── */}
      <div ref={projectsRef} className="mt-4" style={HIDDEN}>
        {PROJECTS.map((p, i) => (
          <ProjectRow key={p.title} project={p} isLast={i === PROJECTS.length - 1} />
        ))}
      </div>

      {/* ── Footer text ────────────────────────────────────── */}
      <p
        ref={footerRef}
        className="text-[12px] leading-relaxed mt-4"
        style={{ ...HIDDEN, color: "var(--color-text-secondary)" }}
      >
        These projects highlight different aspects of my work — from frontend engineering and system design
        to AI-powered applications. Feel free to ask about the architecture, challenges, or technical decisions
        behind any project.
      </p>

      <div ref={footerBtnRef} className="mt-4" style={HIDDEN}>
        <DownLoadResumeButton />
      </div>

      {/* ── ResponseFooter — last to appear ────────────────── */}
      <div ref={responseFooterRef} style={HIDDEN}>
        <ResponseFooter messageId={messageId} convoId={convoId} feedback={feedback as "like" | "dislike" | null | undefined} />
      </div>

    </div>
  );
};

export default ChatProjects;
export { PROJECTS };
export type { Project };