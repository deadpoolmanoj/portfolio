// "use client";

// import React from "react";
// import { Sparkles, Code2, Brain, Layers, MessageCircle, Zap } from "lucide-react";

// const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
//   <div
//     className="flex gap-3 p-3 rounded-xl transition-colors"
//     style={{
//       border: "1px solid var(--color-border)",
//       backgroundColor: "var(--color-bg-card)",
//     }}
//     onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-bg-subtle)"}
//     onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-bg-card)"}
//   >
//     <div className="mt-0.5" style={{ color: "var(--color-text-secondary)" }}>{icon}</div>
//     <div>
//       <p className="text-[12px] font-medium" style={{ color: "var(--color-text-primary)" }}>{title}</p>
//       <p className="text-[11px] leading-relaxed mt-0.5" style={{ color: "var(--color-text-muted)" }}>{desc}</p>
//     </div>
//   </div>
// );

// const AskManoj = () => (
//   <div className="w-full">

//     {/* Header */}
//     <div className="mb-4">
//       <div className="flex items-center gap-2 mb-2">
//         <div
//           className="p-1.5 rounded-md"
//           style={{
//             border: "1px solid var(--color-border)",
//             backgroundColor: "var(--color-bg-card)",
//           }}
//         >
//           <Sparkles size={14} style={{ color: "var(--color-text-secondary)" }} />
//         </div>
//         <p className="text-[12px] font-medium" style={{ color: "var(--color-text-primary)" }}>
//           Ask Manoj AI
//         </p>
//       </div>
//       <p className="text-[12px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
//         This is an interactive AI-powered portfolio assistant built to answer
//         questions about Manoj's skills, projects, education, and experience —
//         just like chatting with him directly.
//       </p>
//     </div>

//     {/* Features */}
//     <div className="space-y-2">
//       <FeatureCard
//         icon={<Brain size={14} />}
//         title="Context-aware responses"
//         desc="Understands whether you're asking about skills, projects, or general background."
//       />
//       <FeatureCard
//         icon={<Code2 size={14} />}
//         title="Deep technical breakdowns"
//         desc="Explains projects, architecture, and tech stack in detail."
//       />
//       <FeatureCard
//         icon={<Layers size={14} />}
//         title="Structured portfolio data"
//         desc="Automatically organizes responses into projects, skills, and education."
//       />
//       <FeatureCard
//         icon={<MessageCircle size={14} />}
//         title="Conversational experience"
//         desc="Feels like chatting with Manoj in real time, not reading a static resume."
//       />
//       <FeatureCard
//         icon={<Zap size={14} />}
//         title="Fast AI routing system"
//         desc="Uses intent classification to instantly show relevant sections or AI responses."
//       />
//     </div>

//     {/* Footer note */}
//     <div
//       className="mt-4 p-3 rounded-xl"
//       style={{
//         border: "1px solid var(--color-border)",
//         backgroundColor: "var(--color-bg-subtle)",
//       }}
//     >
//       <p className="text-[11px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
//         Try asking:{" "}
//         <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>
//           "What projects has Manoj built?"
//         </span>{" "}
//         or{" "}
//         <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>
//           "What are his strongest skills?"
//         </span>
//       </p>
//     </div>
//   </div>
// );

// export default AskManoj;

"use client";

import React, { useEffect, useRef } from "react";
import { Sparkles, Code2, Brain, Layers, MessageCircle, Zap } from "lucide-react";
import ResponseFooter from "./ResponseFooter";
import { HIDDEN } from "./ChatBlogs";

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div
    className="flex gap-3 p-3 rounded-xl transition-colors"
    style={{
      border: "1px solid var(--color-border)",
      backgroundColor: "var(--color-bg-card)",
    }}
    onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-bg-subtle)"}
    onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-bg-card)"}
  >
    <div className="mt-0.5" style={{ color: "var(--color-text-secondary)" }}>{icon}</div>
    <div>
      <p className="text-[12px] font-medium" style={{ color: "var(--color-text-primary)" }}>{title}</p>
      <p className="text-[11px] leading-relaxed mt-0.5" style={{ color: "var(--color-text-muted)" }}>{desc}</p>
    </div>
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
      "display:inline-block;width:1px;height:1em;background:var(--color-text-primary);margin-left:1px;vertical-align:text-bottom;animation:askmanoj-blink 0.7s step-end infinite;";
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
    id: "askmanoj-p1",
    html: `This is an interactive <strong style="color:var(--color-text-primary)">AI-powered portfolio assistant</strong> built to answer questions about Manoj's skills, projects, education, and experience — just like chatting with him directly.`,
  },
];

async function runSequence(
  refs: {
    header: React.RefObject<HTMLDivElement | null>;
    typeSection: React.RefObject<HTMLDivElement | null>;
    features: React.RefObject<HTMLDivElement | null>;
    footerNote: React.RefObject<HTMLDivElement | null>;
    responseFooterRef: React.RefObject<HTMLDivElement | null>;
  },
  onDone?: () => void,
) {
  await fadeIn(refs.header.current);

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
  await fadeIn(refs.features.current);
  await fadeIn(refs.footerNote.current);
  await fadeIn(refs.responseFooterRef.current);

  onDone?.();
}

/* ── main component ──────────────────────────────────────────── */

interface AskManojProps {
  messageId: string;
  convoId: string;
  feedback?: string;
  onAnimationComplete?: () => void;
}


const AskManoj = ({ messageId, convoId, feedback, onAnimationComplete }: AskManojProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const typeSectionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const footerNoteRef = useRef<HTMLDivElement>(null);
  const responseFooterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.getElementById("askmanoj-blink-style")) {
      const style = document.createElement("style");
      style.id = "askmanoj-blink-style";
      style.textContent = "@keyframes askmanoj-blink { 50% { opacity: 0; } }";
      document.head.appendChild(style);
    }

    [headerRef, typeSectionRef, featuresRef, footerNoteRef, responseFooterRef].forEach((ref) => {
      if (ref.current) {
        ref.current.style.overflow = "hidden";
        ref.current.style.maxHeight = "0px";
        ref.current.style.opacity = "0";
      }
    });

    const timer = setTimeout(() => {
      runSequence(
        {
          header: headerRef,
          typeSection: typeSectionRef,
          features: featuresRef,
          footerNote: footerNoteRef,
          responseFooterRef: responseFooterRef,
        },);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">

      {/* ── Header ─────────────────────────────────────────── */}
      <div ref={headerRef} className="mb-4" style={HIDDEN}>
        <div className="flex items-center gap-2 mb-2">
          <div
            className="p-1.5 rounded-md"
            style={{
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-bg-card)",
            }}
          >
            <Sparkles size={14} style={{ color: "var(--color-text-secondary)" }} />
          </div>
          <p className="text-[12px] font-medium" style={{ color: "var(--color-text-primary)" }}>
            Ask Manoj AI
          </p>
        </div>
      </div>

      {/* ── Typewriter description ──────────────────────────── */}
      <div ref={typeSectionRef} className="mb-4" style={HIDDEN}>
        <p id="askmanoj-p1" className="text-[12px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }} />
      </div>

      {/* ── Features ───────────────────────────────────────── */}
      <div ref={featuresRef} className="space-y-2" style={HIDDEN}>
        <FeatureCard
          icon={<Brain size={14} />}
          title="Context-aware responses"
          desc="Understands whether you're asking about skills, projects, or general background."
        />
        {/* <FeatureCard
          icon={<Code2 size={14} />}
          title="Deep technical breakdowns"
          desc="Explains projects, architecture, and tech stack in detail."
        /> */}
        <FeatureCard
          icon={<Layers size={14} />}
          title="Structured portfolio data"
          desc="Automatically organizes responses into projects, skills, and education."
        />
        <FeatureCard
          icon={<MessageCircle size={14} />}
          title="Conversational experience"
          desc="Feels like chatting with Manoj in real time, not reading a static resume."
        />
        <FeatureCard
          icon={<Zap size={14} />}
          title="Fast AI routing system"
          desc="Uses intent classification to instantly show relevant sections or AI responses."
        />
      </div>

      {/* ── Footer note ────────────────────────────────────── */}
      <div
        ref={footerNoteRef}
        className="mt-4 p-3 rounded-xl"
        style={{
          ...HIDDEN,
          border: "1px solid var(--color-border)",
          backgroundColor: "var(--color-bg-subtle)",
        }}
      >
        <p className="text-[11px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
          Try asking:{" "}
          <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>
            "What projects has Manoj built?"
          </span>{" "}
          or{" "}
          <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>
            "What are his strongest skills?"
          </span>
        </p>
      </div>

      <div ref={responseFooterRef} style={HIDDEN}>
        <ResponseFooter messageId={messageId} convoId={convoId} feedback={feedback as "dislike" | "like" | null | undefined} />
      </div>

    </div>
  );
};

export default AskManoj;