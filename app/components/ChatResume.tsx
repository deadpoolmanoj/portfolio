"use client";

import React, { useEffect, useRef } from "react";
import { FileText } from "lucide-react";
import DownLoadResumeButton from "@/app/components/DownLoadResumeButton";
import ResponseFooter from "./ResponseFooter";
import { HIDDEN } from "./ChatBlogs";
import { useConversation } from "@/context/ConversationContext";

const animatedMessages = new Set<string>();

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
      "display:inline-block;width:1px;height:1em;background:var(--color-text-primary);margin-left:1px;vertical-align:text-bottom;animation:resume-blink 0.7s step-end infinite;";
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
    id: "resume-p1",
    html: `A snapshot of my professional background. Click the button below to download my full resume and explore my <strong style="color:var(--color-text-primary)">experience, skills, and projects</strong> in detail.`,
  },
];

async function runSequence(
  refs: {
    header: React.RefObject<HTMLDivElement | null>;
    typeSection: React.RefObject<HTMLDivElement | null>;
    downloadBtn: React.RefObject<HTMLDivElement | null>;
    responseFooter: React.RefObject<HTMLDivElement | null>;
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
    await typewriterHTML(el, p.html, 1);
    await new Promise((r) => setTimeout(r, 80));
  }

  await new Promise((r) => setTimeout(r, 120));
  await fadeIn(refs.downloadBtn.current);
  await fadeIn(refs.responseFooter.current);

  onDone?.();
}

/* ── main component ──────────────────────────────────────────── */

interface ChatResumeProps {
  messageId: string;
  convoId: string;
  feedback?: string;
  onAnimationComplete?: () => void;
}

const ChatResume = ({ messageId, convoId, feedback, onAnimationComplete }: ChatResumeProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const typeSectionRef = useRef<HTMLDivElement>(null);
  const downloadBtnRef = useRef<HTMLDivElement>(null);
  const responseFooterRef = useRef<HTMLDivElement>(null);

  const { setIsAiResponding } = useConversation()

  useEffect(() => {
    if (!document.getElementById("resume-blink-style")) {
      const style = document.createElement("style");
      style.id = "resume-blink-style";
      style.textContent = "@keyframes resume-blink { 50% { opacity: 0; } }";
      document.head.appendChild(style);
    }

    if (animatedMessages.has(messageId)) {
      setTimeout(() => {
        [headerRef, typeSectionRef, downloadBtnRef, responseFooterRef].forEach((ref) => {
          if (ref.current) {
            ref.current.style.maxHeight = "none";
            ref.current.style.overflow = "visible";
            ref.current.style.opacity = "1";
            ref.current.style.transform = "none";
          }
        });
        paragraphContents.forEach((p) => {
          const el = document.getElementById(p.id);
          if (el) el.innerHTML = p.html;
        });
      }, 0);
      return;
    }

    [headerRef, typeSectionRef, downloadBtnRef, responseFooterRef].forEach((ref) => {
      if (ref.current) {
        ref.current.style.overflow = "hidden";
        ref.current.style.maxHeight = "0px";
        ref.current.style.opacity = "0";
      }
    });

    const timer = setTimeout(async () => {
      await runSequence(
        {
          header: headerRef,
          typeSection: typeSectionRef,
          downloadBtn: downloadBtnRef,
          responseFooter: responseFooterRef,
        },
      );
      animatedMessages.add(messageId);
      setIsAiResponding(false);
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
            <FileText size={14} style={{ color: "var(--color-text-secondary)" }} />
          </div>
          <p className="text-[12px] font-medium" style={{ color: "var(--color-text-primary)" }}>
            Resume
          </p>
        </div>
      </div>

      {/* ── Typewriter description ──────────────────────────── */}
      <div ref={typeSectionRef} className="mb-4" style={HIDDEN}>
        <p id="resume-p1" className="text-[12px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }} />
      </div>

      {/* ── Download Button ─────────────────────────────────── */}
      <div ref={downloadBtnRef} style={HIDDEN}>
        <DownLoadResumeButton />
      </div>

      {/* ── ResponseFooter — last to appear ────────────────── */}
      <div ref={responseFooterRef} style={HIDDEN}>
        <ResponseFooter messageId={messageId} convoId={convoId} feedback={feedback as "dislike" | "like" | null | undefined} />
      </div>

    </div>
  );
};

export default ChatResume;