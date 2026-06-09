"use client";

import React from "react";
import { FileText } from "lucide-react";
import DownLoadResumeButton from "@/app/components/DownLoadResumeButton";

const ChatResume = () => {
  return (
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
            <FileText size={14} style={{ color: "var(--color-text-secondary)" }} />
          </div>

          <p
            className="text-[12px] font-medium"
            style={{ color: "var(--color-text-primary)" }}
          >
            Resume
          </p>
        </div>

        <p
          className="text-[12px] leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          A snapshot of my professional background. Click the button below to download my full resume and explore my experience, skills, and projects in detail.
        </p>
      </div>

      {/* Download Button */}
      <DownLoadResumeButton />
    </div>
  );
};

export default ChatResume;