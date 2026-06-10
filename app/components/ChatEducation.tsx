'use client'

import React, { useEffect, useRef } from 'react'
import Badge from './Badge';
import DownLoadResumeButton from './DownLoadResumeButton';
import ResponseFooter from './ResponseFooter';
import { HIDDEN } from './ChatBlogs';

interface ChatEducationProps {
  messageId: string;
  convoId: string;
  feedback?: string;
}

const paragraphContents: { id: string; html: string }[] = [
  {
    id: 'edu-p1',
    html: `My academic journey has been driven by a strong interest in
<strong style="color: var(--color-text-primary)"> technology, mathematics, and problem-solving</strong>.
I completed my
<strong style="color: var(--color-text-primary)"> Secondary School education</strong>
 at <span style="font-style:italic">S.S.E.M.H.S</span>, where I built a
solid foundation in science and mathematics.`,
  },
  {
    id: 'edu-p2',
    html: `I then pursued my
<strong style="color: var(--color-text-primary)"> Pre-University education (PCMC)</strong>
 at <span style="font-style:italic">Sri Vidyaniketan P U College</span>,
focusing on Physics, Chemistry, Mathematics, and Computer Science.
This phase strengthened my analytical thinking and sparked my interest
in software development.`,
  },
  {
    id: 'edu-p3',
    html: `To deepen my technical expertise, I earned a
<strong style="color: var(--color-text-primary)"> Bachelor of Science in Information Technology</strong>
 from <span style="font-style:italic">Vidyalankar School of Information Technology</span>,
graduating with a
<strong style="color: #16a34a"> CGPA of 8.4</strong> and
First Class with Distinction. During this time, I developed a strong
foundation in web development, databases, networking, and object-oriented programming.`,
  },
  {
    id: 'edu-p4',
    html: `Beyond academics, I've always focused on applying what I learn
through hands-on projects. Building real-world applications alongside
my coursework has helped me strengthen my development skills and gain
practical experience with modern technologies.`,
  },
];

/* ── helpers ─────────────────────────────────────────────────── */

function fadeIn(el: HTMLElement | null, durationMs = 400): Promise<void> {
  return new Promise((resolve) => {
    if (!el) { resolve(); return; }

    el.style.overflow = 'hidden';
    el.style.maxHeight = '0px';
    el.style.opacity = '0';
    el.style.transform = 'translateY(6px)';
    void el.offsetHeight;

    el.style.maxHeight = '9999px';
    const naturalHeight = el.scrollHeight;
    el.style.maxHeight = '0px';
    void el.offsetHeight;

    el.style.transition = `opacity ${durationMs}ms ease, transform ${durationMs}ms ease, max-height ${durationMs}ms ease`;
    el.style.maxHeight = `${naturalHeight}px`;
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';

    setTimeout(() => {
      el.style.maxHeight = 'none';
      el.style.overflow = 'visible';
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

    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const plain = tmp.textContent ?? '';

    let charIdx = 0;

    const cursor = document.createElement('span');
    cursor.style.cssText =
      'display:inline-block;width:1px;height:1em;background:var(--color-text-primary);margin-left:1px;vertical-align:text-bottom;animation:edu-blink 0.7s step-end infinite;';
    el.innerHTML = '';
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

async function runSequence(refs: {
  badge: React.RefObject<HTMLDivElement | null>;
  heading: React.RefObject<HTMLHeadingElement | null>;
  typeSection: React.RefObject<HTMLDivElement | null>;
  timeline: React.RefObject<HTMLDivElement | null>;
  footer: React.RefObject<HTMLParagraphElement | null>;
  footerBtn: React.RefObject<HTMLDivElement | null>;
  responseFooter: React.RefObject<HTMLDivElement | null>;
}) {
  await fadeIn(refs.badge.current);
  await fadeIn(refs.heading.current);

  if (refs.typeSection.current) {
    refs.typeSection.current.style.maxHeight = 'none';
    refs.typeSection.current.style.overflow = 'visible';
    refs.typeSection.current.style.opacity = '1';
  }

  for (const p of paragraphContents) {
    const el = document.getElementById(p.id);
    await typewriterHTML(el, p.html, 12);
    await new Promise((r) => setTimeout(r, 80));
  }

  await new Promise((r) => setTimeout(r, 120));
  await fadeIn(refs.timeline.current);
  await fadeIn(refs.footer.current);
  await fadeIn(refs.footerBtn.current);

  // ResponseFooter reveals last — after everything is done
  await fadeIn(refs.responseFooter.current);
}

/* ── component ───────────────────────────────────────────────── */

const ChatEducation = ({ messageId, convoId, feedback }: ChatEducationProps) => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const typeSectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLParagraphElement>(null);
  const footerBtnRef = useRef<HTMLDivElement>(null);
  const responseFooterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.getElementById('edu-blink-style')) {
      const style = document.createElement('style');
      style.id = 'edu-blink-style';
      style.textContent = '@keyframes edu-blink { 50% { opacity: 0; } }';
      document.head.appendChild(style);
    }

    // Hide all animated elements — fadeIn() will expand them in sequence
    [badgeRef, headingRef, typeSectionRef, timelineRef, footerRef, footerBtnRef, responseFooterRef].forEach((ref) => {
      if (ref.current) {
        ref.current.style.overflow = 'hidden';
        ref.current.style.maxHeight = '0px';
        ref.current.style.opacity = '0';
      }
    });

    const timer = setTimeout(() => {
      runSequence({
        badge: badgeRef,
        heading: headingRef,
        typeSection: typeSectionRef,
        timeline: timelineRef,
        footer: footerRef,
        footerBtn: footerBtnRef,
        responseFooter: responseFooterRef,
      });
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="mb-4">
        <div ref={badgeRef} className="flex items-center gap-2 mb-4" style={HIDDEN}>
          <Badge text="Education" />
          <span className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>
            4 academic milestones
          </span>
        </div>

        <h1
          ref={headingRef}
          className="text-[15px] font-medium leading-snug mb-2"
          style={{ ...HIDDEN, color: "var(--color-text-primary)" }}
        >
          My academic journey
        </h1>

        <div ref={typeSectionRef} className="space-y-3" style={HIDDEN}>
          <p id="edu-p1" className="text-[12px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }} />
          <p id="edu-p2" className="text-[12px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }} />
          <p id="edu-p3" className="text-[12px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }} />
          <div className="pl-3" style={{ borderLeft: "2px solid var(--color-border)" }}>
            <p id="edu-p4" className="text-[12px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }} />
          </div>
        </div>
      </div>

      {/* ── Timeline ───────────────────────────────────────── */}
      <div ref={timelineRef} className="relative pl-8 mt-6" style={HIDDEN}>
        <div className="absolute left-[9px] top-2 bottom-2 w-[1.5px] bg-orange-500/20" />

        <div className="relative mb-7">
          <div className="absolute -left-[28px] top-1 w-[11px] h-[11px] rounded-full bg-orange-100 border-2 border-orange-400" />
          <p className="text-[10px] font-medium uppercase tracking-widest text-orange-500 mb-1">2015 – 2017</p>
          <p className="text-[14px] font-medium mb-0.5" style={{ color: "var(--color-text-primary)" }}>S.S.E.M.H.S</p>
          <p className="text-[12px] mb-2" style={{ color: "var(--color-text-secondary)" }}>SSC · 10th Standard · Karnataka State Board</p>
          <div className="flex flex-wrap gap-1.5">
            <Badge text="Science" />
            <Badge text="Mathematics" />
            <Badge text="English" />
          </div>
        </div>

        <div className="relative mb-7">
          <div className="absolute -left-[28px] top-1 w-[11px] h-[11px] rounded-full bg-orange-100 border-2 border-orange-400" />
          <p className="text-[10px] font-medium uppercase tracking-widest text-orange-500 mb-1">2017 – 2019</p>
          <p className="text-[14px] font-medium mb-0.5" style={{ color: "var(--color-text-primary)" }}>Sri Vidyaniketan P U College</p>
          <p className="text-[12px] mb-2" style={{ color: "var(--color-text-secondary)" }}>Pre University · PCMC · Karnataka State Board</p>
          <div className="flex flex-wrap gap-1.5">
            <Badge text="Physics" />
            <Badge text="Chemistry" />
            <Badge text="Maths" />
            <Badge text="CS" />
          </div>
        </div>

        <div className="relative mb-7">
          <div className="absolute -left-[28px] top-1 w-[11px] h-[11px] rounded-full bg-orange-100 border-2 border-orange-400" />
          <p className="text-[10px] font-medium uppercase tracking-widest text-orange-500 mb-1">2019 – 2022</p>
          <p className="text-[14px] font-medium mb-0.5" style={{ color: "var(--color-text-primary)" }}>Vidyalankar School of Information Technology</p>
          <p className="text-[12px] mb-0.5" style={{ color: "var(--color-text-secondary)" }}>BSc Information Technology</p>
          <p className="text-[11px] mb-2" style={{ color: "var(--color-text-muted)" }}>CGPA 8.4 · First Class with Distinction</p>
          <div className="flex flex-wrap gap-1.5">
            <Badge text="Web Dev" />
            <Badge text="DBMS" />
            <Badge text="OOP" />
            <Badge text="Networking" />
          </div>
        </div>
      </div>

      {/* ── Footer text + download ──────────────────────────── */}
      <p
        ref={footerRef}
        className="text-[12px] leading-relaxed mt-4"
        style={{ ...HIDDEN, color: "var(--color-text-secondary)" }}
      >
        Feel free to ask about my projects, technical skills, coursework,
        or anything else you'd like to know.
      </p>

      <div ref={footerBtnRef} className="mt-4" style={HIDDEN}>
        <DownLoadResumeButton />
      </div>

      {/* ── ResponseFooter — last to appear ────────────────── */}
      <div ref={responseFooterRef} style={HIDDEN}>
        <ResponseFooter messageId={messageId} convoId={convoId} feedback={feedback} />
      </div>

    </div>
  );
};

export default ChatEducation;