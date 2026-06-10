// "use client";

// import {
//   SiReact, SiNextdotjs, SiTailwindcss, SiShadcnui, SiJamstack,
//   SiJavascript, SiTypescript, SiPython,
//   SiNodedotjs, SiExpress, SiPostgresql, SiMongodb, SiRedis, SiSupabase,
//   SiDocker, SiVercel, SiNetlify, SiGithub,
//   SiPostman, SiSwagger,
// } from "react-icons/si";
// import { TbApi, TbRepeat, TbLayersIntersect, TbBinaryTree } from "react-icons/tb";
// import { BsFiletypeHtml, BsFiletypeCss } from "react-icons/bs";
// import Badge from "./Badge";
// import DownLoadResumeButton from "./DownLoadResumeButton";
// import ResponseFooter from "./ResponseFooter";

// const Pill = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
//   <span
//     className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-medium cursor-default select-none"
//     style={{
//       border: "1px solid var(--color-badge-border)",
//       backgroundColor: "var(--color-bg-card)",
//       color: "var(--color-text-primary)",
//     }}
//   >
//     <span className="text-[14px] leading-none">{icon}</span>
//     {label}
//   </span>
// );

// const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
//   <div className="mb-5">
//     <p
//       className="text-[10px] font-medium uppercase tracking-widest mb-2"
//       style={{ color: "var(--color-text-muted)" }}
//     >
//       {title}
//     </p>
//     <div className="flex flex-wrap gap-1.5">{children}</div>
//   </div>
// );

// interface ChatSkillsProps {
//   messageId: string;
//   convoId: string;
//   feedback?: string;
// }

// export default function ChatSkills({ messageId, convoId, feedback }: ChatSkillsProps) {
//   return (
//     <div className="w-full">

//       {/* Header */}
//       <div className="mb-4">
//         <div className="flex items-center gap-2 mb-4">
//           <Badge text="Skills" />
//           <span className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>
//             26+ technologies
//           </span>
//         </div>

//         <h1 className="text-[15px] font-medium leading-snug mb-2" style={{ color: "var(--color-text-primary)" }}>
//           My technical background
//         </h1>

//         <div className="space-y-3">
//           <p className="text-[12px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
//             Full-stack developer with strong roots in the
//             <span className="font-medium" style={{ color: "var(--color-text-primary)" }}> JavaScript ecosystem</span>.
//             I build end-to-end —
//             <span className="font-medium" style={{ color: "var(--color-text-primary)" }}> REST APIs</span>,
//             <span className="font-medium" style={{ color: "var(--color-text-primary)" }}> real-time systems</span>, and
//             polished
//             <span className="font-medium" style={{ color: "var(--color-text-primary)" }}> React frontends</span>.
//           </p>

//           <div className="pl-3" style={{ borderLeft: "2px solid var(--color-border)" }}>
//             <p className="text-[12px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
//               The focus is always on writing clean, maintainable code that scales —
//               not just making things work, but making them
//               <span className="font-medium" style={{ color: "var(--color-text-primary)" }}> work well</span>.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Skill sections */}
//       <div className="mt-4 space-y-1">
//         <Section title="Frontend">
//           <Pill icon={<SiReact color="#61dafb" />} label="React" />
//           <Pill icon={<SiNextdotjs style={{ color: "var(--color-text-primary)" }} />} label="Next.js" />
//           <Pill icon={<SiTailwindcss color="#38bdf8" />} label="Tailwind CSS" />
//           <Pill icon={<SiShadcnui style={{ color: "var(--color-text-primary)" }} />} label="shadcn/ui" />
//           <Pill icon={<SiJamstack color="#ef4444" />} label="TanStack" />
//           <Pill icon={<BsFiletypeHtml color="#e34c26" />} label="HTML" />
//           <Pill icon={<BsFiletypeCss color="#2965f1" />} label="CSS" />
//         </Section>

//         <Section title="Languages">
//           <Pill icon={<SiJavascript color="#f0b429" />} label="JavaScript" />
//           <Pill icon={<SiTypescript color="#3178c6" />} label="TypeScript" />
//           <Pill icon={<SiPython color="#3572a5" />} label="Python" />
//           <Pill icon={<SiPostgresql color="#336791" />} label="SQL" />
//         </Section>

//         <Section title="Backend">
//           <Pill icon={<SiNodedotjs color="#5fa04e" />} label="Node.js" />
//           <Pill icon={<SiExpress color="#888" />} label="Express.js" />
//           <Pill icon={<SiPostgresql color="#336791" />} label="PostgreSQL" />
//           <Pill icon={<SiMongodb color="#4db33d" />} label="MongoDB" />
//           <Pill icon={<SiRedis color="#dc382d" />} label="Redis" />
//           <Pill icon={<SiSupabase color="#3ecf8e" />} label="Supabase" />
//         </Section>

//         <Section title="DevOps & Cloud">
//           <Pill icon={<SiDocker color="#2496ed" />} label="Docker" />
//           <Pill icon={<SiVercel style={{ color: "var(--color-text-primary)" }} />} label="Vercel" />
//           <Pill icon={<SiNetlify color="#00ad9f" />} label="Netlify" />
//           <Pill icon={<SiGithub style={{ color: "var(--color-text-primary)" }} />} label="GitHub" />
//         </Section>

//         <Section title="Tools">
//           <Pill icon={<SiPostman color="#ef5c00" />} label="Postman" />
//           <Pill icon={<SiSwagger color="#85ea2d" />} label="Swagger" />
//         </Section>

//         <Section title="Concepts">
//           <Pill icon={<TbBinaryTree color="#585858" />} label="DSA" />
//           <Pill icon={<TbRepeat color="#585858" />} label="Agile" />
//           <Pill icon={<TbLayersIntersect color="#585858" />} label="MVC" />
//           <Pill icon={<TbApi color="#585858" />} label="REST APIs" />
//         </Section>
//       </div>

//       {/* Footer */}
//       <p className="text-[12px] leading-relaxed mt-4" style={{ color: "var(--color-text-secondary)" }}>
//         Feel free to ask about any of these technologies, how I've used them in
//         projects, or what I'm currently exploring.
//       </p>

//       <div className="mt-4">
//         <DownLoadResumeButton />
//       </div>
//       <div>
//         <ResponseFooter messageId={messageId} convoId={convoId} feedback={feedback as "dislike" | "like" | null | undefined} />
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useRef } from "react";
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiShadcnui, SiJamstack,
  SiJavascript, SiTypescript, SiPython,
  SiNodedotjs, SiExpress, SiPostgresql, SiMongodb, SiRedis, SiSupabase,
  SiDocker, SiVercel, SiNetlify, SiGithub,
  SiPostman, SiSwagger,
} from "react-icons/si";
import { TbApi, TbRepeat, TbLayersIntersect, TbBinaryTree } from "react-icons/tb";
import { BsFiletypeHtml, BsFiletypeCss } from "react-icons/bs";
import Badge from "./Badge";
import DownLoadResumeButton from "./DownLoadResumeButton";
import ResponseFooter from "./ResponseFooter";
import { HIDDEN } from "./ChatBlogs";

const Pill = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <span
    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-medium cursor-default select-none"
    style={{
      border: "1px solid var(--color-badge-border)",
      backgroundColor: "var(--color-bg-card)",
      color: "var(--color-text-primary)",
    }}
  >
    <span className="text-[14px] leading-none">{icon}</span>
    {label}
  </span>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-5">
    <p
      className="text-[10px] font-medium uppercase tracking-widest mb-2"
      style={{ color: "var(--color-text-muted)" }}
    >
      {title}
    </p>
    <div className="flex flex-wrap gap-1.5">{children}</div>
  </div>
);

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

function typewriterHTML(
  el: HTMLElement | null,
  html: string,
  speed = 4,
): Promise<void> {
  return new Promise((resolve) => {
    if (!el) { resolve(); return; }

    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    const plain = tmp.textContent ?? "";

    let charIdx = 0;

    const cursor = document.createElement("span");
    cursor.style.cssText =
      "display:inline-block;width:1px;height:1em;background:var(--color-text-primary);margin-left:1px;vertical-align:text-bottom;animation:skills-blink 0.7s step-end infinite;";
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

const paragraphContents: { id: string; html: string }[] = [
  {
    id: "skills-p1",
    html: `Full-stack developer with strong roots in the <strong style="color:var(--color-text-primary)"> JavaScript ecosystem</strong>. I build end-to-end — <strong style="color:var(--color-text-primary)"> REST APIs</strong>, <strong style="color:var(--color-text-primary)"> real-time systems</strong>, and polished <strong style="color:var(--color-text-primary)"> React frontends</strong>.`,
  },
  {
    id: "skills-p2",
    html: `The focus is always on writing clean, maintainable code that scales — not just making things work, but making them <strong style="color:var(--color-text-primary)"> work well</strong>.`,
  },
];

async function runSequence(
  refs: {
    badge: React.RefObject<HTMLDivElement | null>;
    heading: React.RefObject<HTMLHeadingElement | null>;
    typeSection: React.RefObject<HTMLDivElement | null>;
    skillSections: React.RefObject<HTMLDivElement | null>;
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

  for (const p of paragraphContents) {
    const el = document.getElementById(p.id);
    await typewriterHTML(el, p.html, 12);
    await new Promise((r) => setTimeout(r, 80));
  }

  await new Promise((r) => setTimeout(r, 120));
  await fadeIn(refs.skillSections.current);
  await fadeIn(refs.footer.current);
  await fadeIn(refs.footerBtn.current);
  await fadeIn(refs.responseFooter.current);

  onDone?.();
}

/* ── main component ──────────────────────────────────────────── */

interface ChatSkillsProps {
  messageId: string;
  convoId: string;
  feedback?: string;
  onAnimationComplete?: () => void;
}

export default function ChatSkills({ messageId, convoId, feedback, onAnimationComplete }: ChatSkillsProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const typeSectionRef = useRef<HTMLDivElement>(null);
  const skillSectionsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLParagraphElement>(null);
  const footerBtnRef = useRef<HTMLDivElement>(null);
  const responseFooterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.getElementById("skills-blink-style")) {
      const style = document.createElement("style");
      style.id = "skills-blink-style";
      style.textContent = "@keyframes skills-blink { 50% { opacity: 0; } }";
      document.head.appendChild(style);
    }

    [badgeRef, headingRef, typeSectionRef, skillSectionsRef, footerRef, footerBtnRef, responseFooterRef].forEach((ref) => {
      if (ref.current) {
        ref.current.style.overflow = "hidden";
        ref.current.style.maxHeight = "0px";
        ref.current.style.opacity = "0";
      }
    });

    const timer = setTimeout(() => {
      runSequence(
        {
          badge: badgeRef,
          heading: headingRef,
          typeSection: typeSectionRef,
          skillSections: skillSectionsRef,
          footer: footerRef,
          footerBtn: footerBtnRef,
          responseFooter: responseFooterRef,
        },
        onAnimationComplete,
      );
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="mb-4">
        <div ref={badgeRef} className="flex items-center gap-2 mb-4" style={HIDDEN}>
          <Badge text="Skills" />
          <span className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>
            26+ technologies
          </span>
        </div>

        <h1
          ref={headingRef}
          className="text-[15px] font-medium leading-snug mb-2"
          style={{ ...HIDDEN, color: "var(--color-text-primary)" }}
        >
          My technical background
        </h1>

        <div ref={typeSectionRef} className="space-y-3" style={HIDDEN}>
          <p id="skills-p1" className="text-[12px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }} />
          <div className="pl-3" style={{ borderLeft: "2px solid var(--color-border)" }}>
            <p id="skills-p2" className="text-[12px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }} />
          </div>
        </div>
      </div>

      {/* ── Skill sections ─────────────────────────────────── */}
      <div ref={skillSectionsRef} className="mt-4 space-y-1" style={HIDDEN}>
        <Section title="Frontend">
          <Pill icon={<SiReact color="#61dafb" />} label="React" />
          <Pill icon={<SiNextdotjs style={{ color: "var(--color-text-primary)" }} />} label="Next.js" />
          <Pill icon={<SiTailwindcss color="#38bdf8" />} label="Tailwind CSS" />
          <Pill icon={<SiShadcnui style={{ color: "var(--color-text-primary)" }} />} label="shadcn/ui" />
          <Pill icon={<SiJamstack color="#ef4444" />} label="TanStack" />
          <Pill icon={<BsFiletypeHtml color="#e34c26" />} label="HTML" />
          <Pill icon={<BsFiletypeCss color="#2965f1" />} label="CSS" />
        </Section>

        <Section title="Languages">
          <Pill icon={<SiJavascript color="#f0b429" />} label="JavaScript" />
          <Pill icon={<SiTypescript color="#3178c6" />} label="TypeScript" />
          <Pill icon={<SiPython color="#3572a5" />} label="Python" />
          <Pill icon={<SiPostgresql color="#336791" />} label="SQL" />
        </Section>

        <Section title="Backend">
          <Pill icon={<SiNodedotjs color="#5fa04e" />} label="Node.js" />
          <Pill icon={<SiExpress color="#888" />} label="Express.js" />
          <Pill icon={<SiPostgresql color="#336791" />} label="PostgreSQL" />
          <Pill icon={<SiMongodb color="#4db33d" />} label="MongoDB" />
          <Pill icon={<SiRedis color="#dc382d" />} label="Redis" />
          <Pill icon={<SiSupabase color="#3ecf8e" />} label="Supabase" />
        </Section>

        <Section title="DevOps & Cloud">
          <Pill icon={<SiDocker color="#2496ed" />} label="Docker" />
          <Pill icon={<SiVercel style={{ color: "var(--color-text-primary)" }} />} label="Vercel" />
          <Pill icon={<SiNetlify color="#00ad9f" />} label="Netlify" />
          <Pill icon={<SiGithub style={{ color: "var(--color-text-primary)" }} />} label="GitHub" />
        </Section>

        <Section title="Tools">
          <Pill icon={<SiPostman color="#ef5c00" />} label="Postman" />
          <Pill icon={<SiSwagger color="#85ea2d" />} label="Swagger" />
        </Section>

        <Section title="Concepts">
          <Pill icon={<TbBinaryTree color="#585858" />} label="DSA" />
          <Pill icon={<TbRepeat color="#585858" />} label="Agile" />
          <Pill icon={<TbLayersIntersect color="#585858" />} label="MVC" />
          <Pill icon={<TbApi color="#585858" />} label="REST APIs" />
        </Section>
      </div>

      {/* ── Footer ─────────────────────────────────────────── */}
      <p
        ref={footerRef}
        className="text-[12px] leading-relaxed mt-4"
        style={{ ...HIDDEN, color: "var(--color-text-secondary)" }}
      >
        Feel free to ask about any of these technologies, how I've used them in
        projects, or what I'm currently exploring.
      </p>

      <div ref={footerBtnRef} className="mt-4" style={HIDDEN}>
        <DownLoadResumeButton />
      </div>

      <div ref={responseFooterRef} style={HIDDEN}>
        <ResponseFooter messageId={messageId} convoId={convoId} feedback={feedback as "dislike" | "like" | null | undefined} />
      </div>

    </div>
  );
}