import React from 'react'
import Badge from './Badge';
import DownLoadResumeButton from './DownLoadResumeButton';
import ResponseFooter from './ResponseFooter';

const ChatEducation = () => {
  return (
    <div className="w-full">

      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Badge text="Education" />
          <span className="text-[11px] text-[#9b9b9b]">
            4 academic milestones
          </span>
        </div>

        <h1 className="text-[15px] font-medium text-[#1a1a1a] leading-snug mb-2">
          My academic journey
        </h1>

        <div className="space-y-3">
          <p className="text-[12px] text-[#585858] leading-relaxed">
            My academic journey has been centered around
            <span className="font-medium text-[#1a1a1a]"> technology</span> and
            <span className="font-medium text-[#1a1a1a]"> computer science</span>.
            I completed my
            <span className="font-medium text-[#1a1a1a]"> SSC</span> from
            <span className="italic"> St. Xavier's High School</span> in 2018,
            followed by my
            <span className="font-medium text-[#1a1a1a]"> HSC (Science)</span> from
            <span className="italic"> Rizvi College of Science</span> in 2020.
          </p>

          <p className="text-[12px] text-[#585858] leading-relaxed">
            I then earned a
            <span className="font-medium text-[#1a1a1a]">
              {" "}Bachelor of Science in Information Technology
            </span>
            {" "}from the
            <span className="italic"> University of Mumbai</span>,
            graduating with a
            <span className="font-medium text-[#3B6D11]"> CGPA of 8.4</span>.
            Currently, I'm pursuing a
            <span className="font-medium text-[#1a1a1a]">
              {" "}Master of Computer Applications (MCA)
            </span>
            {" "}at
            <span className="italic"> Sikkim Manipal University</span>.
          </p>

          <div className="border-l-2 border-[#e9ecef] pl-3">
            <p className="text-[12px] text-[#585858] leading-relaxed">
              What stands out isn't just the degrees—it's the combination of
              <span className="font-medium text-[#1a1a1a]">
                {" "}academic learning
              </span>
              {" "}and
              <span className="font-medium text-[#1a1a1a]">
                {" "}hands-on development
              </span>.
              Throughout my studies, I've consistently built real-world projects,
              explored modern technologies, and strengthened my problem-solving
              skills through practical experience.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pl-8 mt-6">

        {/* Vertical Line */}
        <div className="absolute left-[9px] top-2 bottom-2 w-[1.5px] bg-orange-500/20" />

        {/* SSC */}
        <div className="relative mb-7">
          <div className="absolute -left-[28px] top-1 w-[11px] h-[11px] rounded-full bg-orange-100 border-2 border-orange-400" />

          <p className="text-[10px] font-medium uppercase tracking-widest text-orange-500 mb-1">
            2015 – 2018
          </p>

          <p className="text-[14px] font-medium text-[#1a1a1a] mb-0.5">
            St. Xavier's High School
          </p>

          <p className="text-[12px] text-[#585858] mb-2">
            SSC · 10th Standard · Maharashtra State Board
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
            2018 – 2020
          </p>

          <p className="text-[14px] font-medium text-[#1a1a1a] mb-0.5">
            Rizvi College of Science
          </p>

          <p className="text-[12px] text-[#585858] mb-2">
            HSC · Science Stream · Maharashtra State Board
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
            2020 – 2023
          </p>

          <p className="text-[14px] font-medium text-[#1a1a1a] mb-0.5">
            University of Mumbai
          </p>

          <p className="text-[12px] text-[#585858] mb-0.5">
            BSc Information Technology
          </p>

          <p className="text-[11px] text-[#9b9b9b] mb-2">
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
        <div className="relative">
          <div className="absolute -left-[29px] top-[3px] w-[13px] h-[13px] rounded-full bg-background border-[2.5px] border-orange-400 ring-[3px] ring-orange-100" />

          <p className="text-[10px] font-medium uppercase tracking-widest text-orange-500 mb-1">
            2023 – 2025
          </p>

          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-[14px] font-medium text-[#1a1a1a]">
              Sikkim Manipal University
            </p>

            <span className="text-[10px] font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              Current
            </span>
          </div>

          <p className="text-[12px] text-[#585858] mb-0.5">
            MCA · Master of Computer Applications
          </p>

          <p className="text-[11px] text-[#9b9b9b] mb-2">
            Final Year · Full Stack Specialisation
          </p>

          <div className="flex flex-wrap gap-1.5">
            <Badge text="React" />
            <Badge text="Node.js" />
            <Badge text="Cloud" />
            <Badge text="DSA" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-[12px] text-[#585858] leading-relaxed mt-4">
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