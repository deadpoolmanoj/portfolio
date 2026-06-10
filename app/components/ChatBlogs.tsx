"use client";

import React, { useEffect, useRef } from "react";
import { BookOpen, ExternalLink, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { BLOGS } from "@/utils/blogs";
import ResponseFooter from "./ResponseFooter";
import { useConversation } from "@/context/ConversationContext";

const animatedMessages = new Set<string>();

export const HIDDEN: React.CSSProperties = {
  overflow: "hidden",
  maxHeight: "0px",
  opacity: 0,
};


const BlogMeta = ({ tag, readTime }: { tag: string; readTime: string }) => (
  <div className="flex items-center gap-3 mt-2 text-[10px]" style={{ color: "var(--color-text-muted)" }}>
    <span
      className="px-2 py-0.5 rounded-md"
      style={{
        border: "1px solid var(--color-border)",
        backgroundColor: "var(--color-bg-card)",
        color: "var(--color-text-muted)",
      }}
    >
      {tag}
    </span>
    <span className="flex items-center gap-1">
      <Clock size={11} />
      {readTime}
    </span>
  </div>
);

const FeaturedBlog = ({ blog }: { blog: (typeof BLOGS)[0] }) => {
  const router = useRouter();

  return (
    <div
      className="w-full rounded-2xl overflow-hidden mb-3 cursor-pointer"
      style={{
        border: "1px solid var(--color-border)",
        backgroundColor: "var(--color-bg-card)",
      }}
      onClick={() => window.open(`/blogs/${blog.id}`, '_blank')}
    >
      <div className="w-full h-40 relative overflow-hidden">
        <img
          src={blog.headerImage}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <span className="absolute bottom-3 left-3 text-2xl z-10">
          {blog.headerEmoji}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[13px] font-medium leading-snug" style={{ color: "var(--color-text-primary)" }}>
              {blog.title}
            </p>
            <p className="text-[11px] leading-relaxed mt-1" style={{ color: "var(--color-text-muted)" }}>
              {blog.subtitle}
            </p>
            <BlogMeta tag={blog.tags[0]} readTime={blog.readTime} />
          </div>
          <ExternalLink size={14} style={{ color: "var(--color-text-muted)" }} className="mt-1 shrink-0" />
        </div>
      </div>
    </div>
  );
};

const CompactBlog = ({ blog }: { blog: (typeof BLOGS)[0] }) => {
  const router = useRouter();

  return (
    <div
      className="p-3 rounded-xl cursor-pointer transition-colors"
      style={{
        border: "1px solid var(--color-border)",
        backgroundColor: "var(--color-bg-card)",
      }}
      onClick={() => window.open(`/blogs/${blog.id}`, '_blank')}
      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-bg-subtle)"}
      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-bg-card)"}
    >
      <div className="flex justify-between gap-2">
        <div>
          <p className="text-[12px] font-medium leading-snug" style={{ color: "var(--color-text-primary)" }}>
            {blog.title}
          </p>
          <p className="text-[11px] leading-relaxed mt-1" style={{ color: "var(--color-text-muted)" }}>
            {blog.subtitle}
          </p>
          <BlogMeta tag={blog.tags[0]} readTime={blog.readTime} />
        </div>
        <ExternalLink size={14} style={{ color: "var(--color-text-muted)" }} className="mt-1 shrink-0" />
      </div>
    </div>
  );
};

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
      "display:inline-block;width:1px;height:1em;background:var(--color-text-primary);margin-left:1px;vertical-align:text-bottom;animation:blogs-blink 0.7s step-end infinite;";
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
    id: "blogs-p1",
    html: `Honest write-ups on building real projects — what worked, what didn't, and what I'd do differently.`,
  },
];

async function runSequence(
  refs: {
    header: React.RefObject<HTMLDivElement | null>;
    typeSection: React.RefObject<HTMLDivElement | null>;
    featured: React.RefObject<HTMLDivElement | null>;
    grid: React.RefObject<HTMLDivElement | null>;
    footerNote: React.RefObject<HTMLDivElement | null>;
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
  await fadeIn(refs.featured.current);
  await fadeIn(refs.grid.current);
  await fadeIn(refs.footerNote.current);
  await fadeIn(refs.responseFooter.current);

  onDone?.();
}

/* ── main component ──────────────────────────────────────────── */

interface ChatBlogsProps {
  messageId: string;
  convoId: string;
  feedback?: "like" | "dislike" | null;
  onAnimationComplete?: () => void;
}

const ChatBlogs = ({ messageId, convoId, feedback, onAnimationComplete }: ChatBlogsProps) => {
  const [featured, ...rest] = BLOGS;

  const headerRef = useRef<HTMLDivElement>(null);
  const typeSectionRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const footerNoteRef = useRef<HTMLDivElement>(null);
  const responseFooterRef = useRef<HTMLDivElement>(null);

  const { setIsAiResponding } = useConversation()

  useEffect(() => {
    if (!document.getElementById("blogs-blink-style")) {
      const style = document.createElement("style");
      style.id = "blogs-blink-style";
      style.textContent = "@keyframes blogs-blink { 50% { opacity: 0; } }";
      document.head.appendChild(style);
    }

    if (animatedMessages.has(messageId)) {
      setTimeout(() => {
        [headerRef, typeSectionRef, featuredRef, gridRef, footerNoteRef, responseFooterRef].forEach((ref) => {
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

    [headerRef, typeSectionRef, featuredRef, gridRef, footerNoteRef, responseFooterRef].forEach((ref) => {
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
          featured: featuredRef,
          grid: gridRef,
          footerNote: footerNoteRef,
          responseFooter: responseFooterRef,
        },
        onAnimationComplete,
      );
      animatedMessages.add(messageId);
      setIsAiResponding(false);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">

      {/* ── Header ─────────────────────────────────────────── */}
      <div ref={headerRef} style={HIDDEN} className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="p-1.5 rounded-md"
            style={{
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-bg-card)",
            }}
          >
            <BookOpen size={14} style={{ color: "var(--color-text-secondary)" }} />
          </div>
          <p className="text-[12px] font-medium" style={{ color: "var(--color-text-primary)" }}>
            Blogs & Writing
          </p>
        </div>
      </div>

      {/* ── Typewriter description ──────────────────────────── */}
      <div ref={typeSectionRef} className="mb-4">
        <p id="blogs-p1" className="text-[12px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }} />
      </div>

      {/* ── Featured ───────────────────────────────────────── */}
      <div ref={featuredRef} style={HIDDEN}>
        <FeaturedBlog blog={featured} />
      </div>

      {/* ── Grid ───────────────────────────────────────────── */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-2" style={HIDDEN}>
        {rest.map((blog) => (
          <CompactBlog key={blog.id} blog={blog} />
        ))}
      </div>

      {/* ── Footer note ────────────────────────────────────── */}
      <div
        ref={footerNoteRef}
        className="mt-4 p-3 rounded-xl"
        style={{
          border: "1px solid var(--color-border)",
          backgroundColor: "var(--color-bg-subtle)",
        }}
      >
        <p className="text-[11px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
          More posts coming on{" "}
          <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>
            real-time systems, AI engineering, and building in public.
          </span>
        </p>
      </div>

      {/* ── ResponseFooter — last to appear ────────────────── */}
      <div ref={responseFooterRef} style={HIDDEN}>
        <ResponseFooter messageId={messageId} convoId={convoId} feedback={feedback as "dislike" | "like" | null | undefined} />
      </div>

    </div>
  );
};

export default ChatBlogs;