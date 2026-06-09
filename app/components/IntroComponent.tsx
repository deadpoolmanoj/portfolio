"use client";

import { useEffect, useState } from "react";
import { Cloud, ChevronRight, RefreshCw, Clock } from "lucide-react";
import { UserEnvironment } from "@/utils/userMetaData";

const STATUSES = [
  "☕ Brewing coffee & debugging linked lists.",
  "📐 Designing a new bento layout.",
  "🎧 Deep in a coding session with lo-fi on.",
  "🔍 Reviewing a pull request from last night.",
  "🌙 Planning tomorrow's dev tasks.",
];

const SUGGESTIONS = [
  { emoji: "⚡", text: "Tell me about Manoj's technical background." },
  { emoji: "📂", text: "What projects has he built recently?" },
  { emoji: "📄", text: "Can I see or download a copy of his resume?" },
  { emoji: "🧠", text: "How is his expertise in DSA?" },
];

interface Weather {
  city: string;
  temperature: number;
}

interface HomeIntroProps {
  weather?: UserEnvironment | null;
  sendUserMessage: (text: string) => void;
}

export default function HomeIntro({ weather, sendUserMessage }: HomeIntroProps) {
  const [statusIndex, setStatusIndex] = useState(0);
  const [statusVisible, setStatusVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const t = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      });
      setCurrentTime(`${t} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30_000);
    return () => clearInterval(interval);
  }, []);

  const cycleStatus = () => {
    setStatusVisible(false);
    setTimeout(() => {
      setStatusIndex((prev) => (prev + 1) % STATUSES.length);
      setStatusVisible(true);
    }, 150);
  };

  console.log('weather',weather);
  

  return (
    <div className="w-full pt-12 md:pt-24 flex justify-center items-center px-4 pb-32">
      <div className="flex flex-col items-center w-full max-w-sm">

        {/* Context strip — weather + time */}
        <div className="flex items-center gap-2.5 mb-4">
          <div
            className="flex items-center gap-1.5 text-[11.5px]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <Cloud size={13} />
            {weather ? `${weather.city} ${weather.temperature}°C` : "Bengaluru —°C"}
          </div>
          <span style={{ color: "var(--color-border)" }}>·</span>
          <div
            className="flex items-center gap-1.5 text-[11.5px]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <Clock size={13} />
            {currentTime || "—"}
          </div>
        </div>

        {/* Status pill */}
        <button
          onClick={cycleStatus}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 text-[11.5px] transition-all"
          style={{
            backgroundColor: "var(--color-bg-accent)",
            border: "1px solid var(--color-border-accent)",
            color: "var(--color-text-secondary)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-accent)";
          }}
          aria-label="Cycle status"
        >
          {/* Pulsing green dot */}
          <span className="relative flex h-[7px] w-[7px] shrink-0">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
              style={{ backgroundColor: "#22c55e" }}
            />
            <span
              className="relative inline-flex rounded-full h-[7px] w-[7px]"
              style={{ backgroundColor: "#22c55e" }}
            />
          </span>

          <span
            className="transition-opacity duration-200"
            style={{ opacity: statusVisible ? 1 : 0 }}
          >
            Manoj is currently: {STATUSES[statusIndex]}
          </span>

          <RefreshCw
            size={11}
            className="shrink-0 ml-0.5"
            style={{ color: "var(--color-text-muted)" }}
          />
        </button>

        {/* Heading */}
        <h1
          className="text-[16px] font-semibold leading-snug mb-1 text-center"
          style={{ color: "var(--color-text-primary)" }}
        >
          What would you like to know about Manoj?
        </h1>
        <p
          className="text-[12px] leading-relaxed mb-8 text-center"
          style={{ color: "var(--color-text-muted)" }}
        >
          Ask me anything — his work, skills, or background.
        </p>

        {/* Suggestion chips */}
        <div className="w-full flex flex-col gap-1.5">
          <span
            className="text-[10px] font-medium uppercase tracking-widest mb-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            Suggested
          </span>
          {SUGGESTIONS.map((item) => (
            <button
              key={item.text}
              onClick={() => sendUserMessage(item.text)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[12px] text-left transition-all"
              style={{
                backgroundColor: "var(--color-bg-card)",
                border: "1px solid var(--color-border-light)",
                color: "var(--color-text-primary)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-light)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <span className="flex items-center gap-3">
                <span className="text-[15px]">{item.emoji}</span>
                {item.text}
              </span>
              <ChevronRight
                size={13}
                className="shrink-0"
                style={{ color: "var(--color-border)" }}
              />
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}