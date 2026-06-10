"use client";

import { useEffect, useState } from "react";
import { Cloud, ChevronRight, RefreshCw, Clock } from "lucide-react";
import { UserEnvironment } from "@/utils/userMetaData";
import InputBar from "./InputBar";
import { useConversation } from "@/context/ConversationContext";
import { getWeatherIcon } from "./TopNavBar";

const STATUSES = [
  "☕ Brewing coffee & writing clean code.",
  "🎧 Lo-fi on. Deep in a coding session.",
  "🔍 Debugging something I wrote last night.",
  "🌙 Planning tomorrow's build.",
  "⚡ Pushing a new feature. Almost there.",
];

const SUGGESTIONS = [
  { emoji: "⚡", text: " What's your tech stack and core skills?" },
  { emoji: "📂", text: "Tell me about Skribbbly or Finovex." },
  { emoji: "📄", text: "Can I see or download a copy of your resume?" },
  { emoji: "🎓", text: "Where did you study and what's your background?" },
];

interface Weather {
  city: string;
  temperature: number;
}

interface HomeIntroProps {
  weather?: UserEnvironment | null;
  // sendUserMessage: (text: string) => void;
}

export default function HomeIntro({ weather }: HomeIntroProps) {
  const [statusIndex, setStatusIndex] = useState(0);
  const [statusVisible, setStatusVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState("");

  const { sendUserMessage } = useConversation()

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

  const condition = weather?.weather ?? "Cloudy";

  return (
    <div className="w-full pt-12 md:pt-24 flex justify-center items-center px-4 pb-32 ">
      <div className="flex flex-col items-center w-full max-w-sm">

        <div
          className="flex items-center justify-center w-10 h-10 rounded-2xl mb-4"
          style={{
            backgroundColor: "var(--color-bg-primary)",
            border: "1px solid var(--color-border)",
          }}
        >
          {getWeatherIcon(condition)}
        </div>

        {/* Context strip — weather + time */}
        <div className="flex items-center gap-2.5 mb-4">

          <div
            className="flex items-center gap-1.5 text-[11.5px]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {/* <Cloud size={13} /> */}
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
          What would you like to know about me?
        </h1>
        <p
          className="text-[12px] leading-relaxed mb-8 text-center"
          style={{ color: "var(--color-text-muted)" }}
        >
          Ask anything — my work, skills, or background.
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
        <InputBar convoId="" />
      </div>
    </div>
  );
}