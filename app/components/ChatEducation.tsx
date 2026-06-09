'use client'

import React from 'react'
import Badge from './Badge';
import DownLoadResumeButton from './DownLoadResumeButton';

const ChatEducation = () => {
  return (
    <div className="w-full">

      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Badge text="Education" />
          <span className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>
            4 academic milestones
          </span>
        </div>

        <h1 className="text-[15px] font-medium leading-snug mb-2" style={{ color: "var(--color-text-primary)" }}>
          My academic journey
        </h1>

        <div className="space-y-3">
          <p
            className="text-[12px] leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            My academic journey has been driven by a strong interest in
            <span
              className="font-medium"
              style={{ color: "var(--color-text-primary)" }}
            >
              {" "}technology, mathematics, and problem-solving
            </span>.
            I completed my
            <span
              className="font-medium"
              style={{ color: "var(--color-text-primary)" }}
            >
              {" "}Secondary School education
            </span>
            {" "}at <span className="italic">S.S.E.M.H.S</span>, where I built a
            solid foundation in science and mathematics.
          </p>

          <p
            className="text-[12px] leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            I then pursued my
            <span
              className="font-medium"
              style={{ color: "var(--color-text-primary)" }}
            >
              {" "}Pre-University education (PCMC)
            </span>
            {" "}at <span className="italic">Sri Vidyaniketan P U College</span>,
            focusing on Physics, Chemistry, Mathematics, and Computer Science.
            This phase strengthened my analytical thinking and sparked my interest
            in software development.
          </p>

          <p
            className="text-[12px] leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            To deepen my technical expertise, I earned a
            <span
              className="font-medium"
              style={{ color: "var(--color-text-primary)" }}
            >
              {" "}Bachelor of Science in Information Technology
            </span>
            {" "}from <span className="italic">Vidyalankar School of Information Technology</span>,
            graduating with a
            <span className="font-medium text-green-600"> CGPA of 8.4</span> and
            First Class with Distinction. During this time, I developed a strong
            foundation in web development, databases, networking, and object-oriented programming.
          </p>

          <div
            className="pl-3"
            style={{ borderLeft: "2px solid var(--color-border)" }}
          >
            <p
              className="text-[12px] leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Beyond academics, I've always focused on applying what I learn
              through hands-on projects. Building real-world applications alongside
              my coursework has helped me strengthen my development skills and gain
              practical experience with modern technologies.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pl-8 mt-6">

        {/* Vertical line */}
        <div className="absolute left-[9px] top-2 bottom-2 w-[1.5px] bg-orange-500/20" />

        {/* SSC */}
        <div className="relative mb-7">
          <div className="absolute -left-[28px] top-1 w-[11px] h-[11px] rounded-full bg-orange-100 border-2 border-orange-400" />
          <p className="text-[10px] font-medium uppercase tracking-widest text-orange-500 mb-1">
            2015 – 2017
          </p>
          <p className="text-[14px] font-medium mb-0.5" style={{ color: "var(--color-text-primary)" }}>
            S.S.E.M.H.S
          </p>
          <p className="text-[12px] mb-2" style={{ color: "var(--color-text-secondary)" }}>
            SSC · 10th Standard · Karnataka State Board
          </p>
          <div className="flex flex-wrap gap-1.5">
            <Badge text="Science" />
            <Badge text="Mathematics" />
            <Badge text="English" />
          </div>
        </div>

        {/* HSC */}
        <div className="relative mb-7">
          <div className="absolute -left-[28px] top-1 w-[11px] h-[11px] rounded-full bg-orange-100 border-2 border-orange-400" />
          <p className="text-[10px] font-medium uppercase tracking-widest text-orange-500 mb-1">
            2017 – 2019
          </p>
          <p className="text-[14px] font-medium mb-0.5" style={{ color: "var(--color-text-primary)" }}>
            Sri Vidyaniketan P U College
          </p>
          <p className="text-[12px] mb-2" style={{ color: "var(--color-text-secondary)" }}>
            Pre University · PCMC · Karnataka State Board
          </p>
          <div className="flex flex-wrap gap-1.5">
            <Badge text="Physics" />
            <Badge text="Chemistry" />
            <Badge text="Maths" />
            <Badge text="CS" />
          </div>
        </div>

        {/* BSc IT */}
        <div className="relative mb-7">
          <div className="absolute -left-[28px] top-1 w-[11px] h-[11px] rounded-full bg-orange-100 border-2 border-orange-400" />
          <p className="text-[10px] font-medium uppercase tracking-widest text-orange-500 mb-1">
            2019 – 2022
          </p>
          <p className="text-[14px] font-medium mb-0.5" style={{ color: "var(--color-text-primary)" }}>
            Vidyalankar School of Information Technology
          </p>
          <p className="text-[12px] mb-0.5" style={{ color: "var(--color-text-secondary)" }}>
            BSc Information Technology
          </p>
          <p className="text-[11px] mb-2" style={{ color: "var(--color-text-muted)" }}>
            CGPA 8.4 · First Class with Distinction
          </p>
          <div className="flex flex-wrap gap-1.5">
            <Badge text="Web Dev" />
            <Badge text="DBMS" />
            <Badge text="OOP" />
            <Badge text="Networking" />
          </div>
        </div>

        {/* MCA */}
        {/* <div className="relative">
          <div className="absolute -left-[29px] top-[3px] w-[13px] h-[13px] rounded-full border-[2.5px] border-orange-400 ring-[3px] ring-orange-100"
            style={{ backgroundColor: "var(--color-bg-page)" }} />
          <p className="text-[10px] font-medium uppercase tracking-widest text-orange-500 mb-1">
            2023 – 2025
          </p>
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-[14px] font-medium" style={{ color: "var(--color-text-primary)" }}>
              Sikkim Manipal University
            </p>
            <span className="text-[10px] font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              Current
            </span>
          </div>
          <p className="text-[12px] mb-0.5" style={{ color: "var(--color-text-secondary)" }}>
            MCA · Master of Computer Applications
          </p>
          <p className="text-[11px] mb-2" style={{ color: "var(--color-text-muted)" }}>
            Final Year · Full Stack Specialisation
          </p>
          <div className="flex flex-wrap gap-1.5">
            <Badge text="React" />
            <Badge text="Node.js" />
            <Badge text="Cloud" />
            <Badge text="DSA" />
          </div>
        </div> */}
      </div>

      {/* Footer */}
      <p className="text-[12px] leading-relaxed mt-4" style={{ color: "var(--color-text-secondary)" }}>
        Feel free to ask about my projects, technical skills, coursework,
        or anything else you'd like to know.
      </p>

      <div className='mt-4'>
        <DownLoadResumeButton />
      </div>
    </div>
  )
}

export default ChatEducation;