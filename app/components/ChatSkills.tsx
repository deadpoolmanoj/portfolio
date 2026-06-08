"use client";

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

const Pill = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#ebebeb] bg-white text-[12px] font-medium text-[#1a1a1a] cursor-default select-none">
    <span className="text-[14px] leading-none">{icon}</span>
    {label}
  </span>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-5">
    <p className="text-[10px] font-medium uppercase tracking-widest text-[#9b9b9b] mb-2">
      {title}
    </p>
    <div className="flex flex-wrap gap-1.5">{children}</div>
  </div>
);

export default function Skills() {
  return (
    <div className="w-full">

      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Badge text="Skills" />
          <span className="text-[11px] text-[#9b9b9b]">26+ technologies</span>
        </div>

        <h1 className="text-[15px] font-medium text-[#1a1a1a] leading-snug mb-2">
          My technical background
        </h1>

        <div className="space-y-3">
          <p className="text-[12px] text-[#585858] leading-relaxed">
            Full-stack developer with strong roots in the
            <span className="font-medium text-[#1a1a1a]"> JavaScript ecosystem</span>.
            I build end-to-end —
            <span className="font-medium text-[#1a1a1a]"> REST APIs</span>,
            <span className="font-medium text-[#1a1a1a]"> real-time systems</span>, and
            polished
            <span className="font-medium text-[#1a1a1a]"> React frontends</span>.
          </p>

          <div className="border-l-2 border-[#e9ecef] pl-3">
            <p className="text-[12px] text-[#585858] leading-relaxed">
              The focus is always on writing clean, maintainable code that scales —
              not just making things work, but making them
              <span className="font-medium text-[#1a1a1a]"> work well</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Skill sections */}
      <div className="mt-4 space-y-1">

        <Section title="Frontend">
          <Pill icon={<SiReact color="#61dafb" />} label="React" />
          <Pill icon={<SiNextdotjs color="#1a1a1a" />} label="Next.js" />
          <Pill icon={<SiTailwindcss color="#38bdf8" />} label="Tailwind CSS" />
          <Pill icon={<SiShadcnui color="#1a1a1a" />} label="shadcn/ui" />
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
          <Pill icon={<SiVercel color="#1a1a1a" />} label="Vercel" />
          <Pill icon={<SiNetlify color="#00ad9f" />} label="Netlify" />
          <Pill icon={<SiGithub color="#1a1a1a" />} label="GitHub" />
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

      {/* Footer */}
      <p className="text-[12px] text-[#585858] leading-relaxed mt-4">
        Feel free to ask about any of these technologies, how I've used them in
        projects, or what I'm currently exploring.
      </p>

      <div className="mt-4">
        <DownLoadResumeButton />
      </div>

    </div>
  );
}