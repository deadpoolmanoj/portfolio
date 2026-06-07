// import React from 'react'
// import Badge from './Badge';
// import SkillCard from './SkillCard';

// const ChatSkills = () => {
//     return (
//         <div className='w-full px-1 my-4'>

//             {/* Header */}
//             <div className='mb-4'>
//                 <div className='flex items-center gap-2 mb-1'>
//                     <span className='text-[10px] font-medium tracking-widest uppercase
//                                     text-[#9b9b9b] bg-[#f8f9fa] border border-[#e9ecef]
//                                     px-2.5 py-0.5 rounded-full'>
//                         Skills
//                     </span>
//                     <span className='text-[11px] text-[#9b9b9b]'>20+ technologies</span>
//                 </div>
//                 <h1 className='text-[15px] font-medium text-[#1a1a1a] leading-snug mb-1'>
//                     My technical background
//                 </h1>
//                 <p className='text-[12px] text-[#585858] leading-relaxed'>
//                     Full-stack developer with strong roots in JavaScript and Python ecosystems.
//                     I build end-to-end — from REST APIs and real-time WebSocket systems
//                     to polished React frontends.
//                 </p>
//             </div>

//             {/* Legend */}
//             <div className='flex items-center gap-4 mb-4'>
//                 {[
//                     { color: '#3B6D11', label: 'Strong' },
//                     { color: '#ffac81', label: 'Solid' },
//                     { color: '#9b9b9b', label: 'Familiar' },
//                 ].map(({ color, label }) => (
//                     <div key={label} className='flex items-center gap-1.5'>
//                         <span className='w-2 h-2 rounded-full' style={{ background: color }} />
//                         <span className='text-[11px] text-[#585858]'>{label}</span>
//                     </div>
//                 ))}
//             </div>

//             {/* Desktop: grouped sections */}
//             <div className='hidden md:flex flex-col gap-6'>
//                 {['FRONTEND', 'BACKEND', 'LANGUAGES & DATABASES'].map((section) => (
//                     <div key={section}>
//                         <h2 className='text-[10px] font-medium tracking-widest uppercase
//                                        text-[#9b9b9b] mb-2.5'>
//                             {section}
//                         </h2>
//                         <div className='grid grid-cols-3 gap-2.5'>
//                             <SkillCard />
//                             <SkillCard />
//                             <SkillCard />
//                             <SkillCard />
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Mobile: filter tabs + single column */}
//             <div className='flex flex-col md:hidden gap-3'>
//                 <div className='flex gap-2 overflow-x-auto pb-1'>
//                     {['All', 'Frontend', 'Backend', 'Databases', 'Core CS'].map((tab) => (
//                         <button key={tab}
//                                 className='border border-[#e9ecef] rounded-full px-3 py-1
//                                            text-[11px] text-[#585858] shrink-0
//                                            hover:bg-[#f8f9fa] transition-colors'>
//                             {tab}
//                         </button>
//                     ))}
//                 </div>
//                 <div className='grid grid-cols-1 gap-2.5'>
//                     <SkillCard />
//                     <SkillCard />
//                     <SkillCard />
//                     <SkillCard />
//                     <SkillCard />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ChatSkills

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
  variant = "light",
}: {
  icon: React.ReactNode;
  label: string;
  variant?: "dark" | "light" | "accent";
}) => {
  const base =
    "inline-flex items-center gap-2 px-3.5 py-2 rounded-[10px] border text-[13px] font-medium transition-all duration-150 cursor-default select-none hover:shadow-[0_0_0_3px_#fff7ec] hover:border-[#f5a623]";

  const styles = {
    dark: "bg-[#1a1a1a] text-white border-[#1a1a1a]",
    light: "bg-white text-[#1a1a1a] border-[#e4e4e2]",
    accent: "bg-[#fff7ec] text-[#c47a0c] border-[#fde5b8]",
  };

  return (
    <span className={`${base} ${styles[variant]}`}>
      <span className="text-base leading-none">{icon}</span>
      {label}
    </span>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <p className="text-[11px] uppercase tracking-[0.09em] text-[#aaa] font-semibold mb-2.5">
      {title}
    </p>
    <div className="flex flex-wrap gap-2">{children}</div>
  </div>
);

export default function Skills() {
  return (
    <div className="flex-1 overflow-y-auto">

      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Badge text="Skills" />
        <span className="text-[11px] text-[#bbb]">26+ technologies</span>
      </div>

      <h1 className="text-[22px] font-semibold text-[#1a1a1a] tracking-tight mb-2">
        My technical background
      </h1>
      <p className="text-[13px] text-[#888] leading-relaxed mb-4 max-w-[520px]">
        Full-stack developer with strong roots in the JavaScript ecosystem. I build
        end-to-end — REST APIs, real-time systems, and polished React frontends.
      </p>

      {/* Frontend */}
      <Section title="Frontend">
        <Pill variant="dark" icon={<SiReact color="#61dafb" />} label="React" />
        <Pill variant="dark" icon={<SiNextdotjs color="#fff" />} label="Next.js" />
        <Pill variant="dark" icon={<SiTailwindcss color="#38bdf8" />} label="Tailwind CSS" />
        <Pill variant="dark" icon={<SiShadcnui color="#fff" />} label="shadcn/ui" />
        <Pill variant="dark" icon={<SiJamstack color="#ef4444" />} label="TanStack" />
        <Pill variant="dark" icon={<BsFiletypeHtml color="#e34c26" />} label="HTML" />
        <Pill variant="dark" icon={<BsFiletypeCss color="#2965f1" />} label="CSS" />
      </Section>

      {/* Languages */}
      <Section title="Languages">
        <Pill icon={<SiJavascript color="#f0b429" />} label="JavaScript" />
        <Pill icon={<SiTypescript color="#3178c6" />} label="TypeScript" />
        <Pill icon={<SiPython color="#3572a5" />} label="Python" />
        <Pill icon={<SiPostgresql color="#336791" />} label="SQL" />
      </Section>

      {/* Backend */}
      <Section title="Backend">
        <Pill icon={<SiNodedotjs color="#5fa04e" />} label="Node.js" />
        <Pill icon={<SiExpress color="#888" />} label="Express.js" />
        <Pill icon={<SiPostgresql color="#336791" />} label="PostgreSQL" />
        <Pill icon={<SiMongodb color="#4db33d" />} label="MongoDB" />
        <Pill icon={<SiRedis color="#dc382d" />} label="Redis" />
        <Pill icon={<SiSupabase color="#3ecf8e" />} label="Supabase" />
      </Section>

      {/* DevOps & Cloud */}
      <Section title="DevOps & Cloud">
        <Pill icon={<SiDocker color="#2496ed" />} label="Docker" />
        <Pill icon={<SiVercel color="#1a1a1a" />} label="Vercel" />
        <Pill icon={<SiNetlify color="#00ad9f" />} label="Netlify" />
        <Pill icon={<SiGithub color="#1a1a1a" />} label="GitHub" />
      </Section>

      {/* Tools */}
      <Section title="Tools">
        <Pill icon={<SiPostman color="#ef5c00" />} label="Postman" />
        <Pill icon={<SiSwagger color="#85ea2d" />} label="Swagger" />
      </Section>

      {/* Concepts */}
      <Section title="Concepts">
        <Pill variant="accent" icon={<TbBinaryTree color="#d4820a" />} label="DSA" />
        <Pill variant="accent" icon={<TbRepeat color="#d4820a" />} label="Agile" />
        <Pill variant="accent" icon={<TbLayersIntersect color="#d4820a" />} label="MVC" />
        <Pill variant="accent" icon={<TbApi color="#d4820a" />} label="REST APIs" />
      </Section>

      <div className='mt-4'>
        <DownLoadResumeButton />
      </div>

      <ResponseFooter />

    </div>
  );
}