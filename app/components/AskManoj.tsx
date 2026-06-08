"use client";

import React from "react";
import { Sparkles, Code2, Brain, Layers, MessageCircle, Zap } from "lucide-react";

const FeatureCard = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => {
  return (
    <div className="flex gap-3 p-3 rounded-xl border border-[#e9ecef] bg-white hover:bg-[#fafafa] transition-colors">
      <div className="text-[#585858] mt-0.5">{icon}</div>

      <div>
        <p className="text-[12px] font-medium text-[#1a1a1a]">{title}</p>
        <p className="text-[11px] text-[#9b9b9b] leading-relaxed mt-0.5">
          {desc}
        </p>
      </div>
    </div>
  );
};

const AskManoj = () => {
  return (
    <div className="w-full">

      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-md border border-[#e9ecef] bg-white">
            <Sparkles size={14} className="text-[#585858]" />
          </div>

          <p className="text-[12px] font-medium text-[#1a1a1a]">
            Ask Manoj AI
          </p>
        </div>

        <p className="text-[12px] text-[#585858] leading-relaxed">
          This is an interactive AI-powered portfolio assistant built to answer
          questions about Manoj’s skills, projects, education, and experience —
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
      <div className="mt-4 p-3 rounded-xl border border-[#e9ecef] bg-[#fafafa]">
        <p className="text-[11px] text-[#9b9b9b] leading-relaxed">
          Try asking:{" "}
          <span className="text-[#1a1a1a] font-medium">
            “What projects has Manoj built?”
          </span>{" "}
          or{" "}
          <span className="text-[#1a1a1a] font-medium">
            “What are his strongest skills?”
          </span>
        </p>
      </div>

    </div>
  );
};

export default AskManoj;