"use client";

import React from "react";
import { Sparkles, Code2, Brain, Layers, MessageCircle, Zap } from "lucide-react";

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

const AskManoj = () => (
  <div className="w-full">

    {/* Header */}
    <div className="mb-4">
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
      <p className="text-[12px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
        This is an interactive AI-powered portfolio assistant built to answer
        questions about Manoj's skills, projects, education, and experience —
        just like chatting with him directly.
      </p>
    </div>

    {/* Features */}
    <div className="space-y-2">
      <FeatureCard
        icon={<Brain size={14} />}
        title="Context-aware responses"
        desc="Understands whether you're asking about skills, projects, or general background."
      />
      <FeatureCard
        icon={<Code2 size={14} />}
        title="Deep technical breakdowns"
        desc="Explains projects, architecture, and tech stack in detail."
      />
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

    {/* Footer note */}
    <div
      className="mt-4 p-3 rounded-xl"
      style={{
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
  </div>
);

export default AskManoj;