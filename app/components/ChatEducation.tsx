import React from 'react'
import Badge from './Badge';


const ChatEducation = () => {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* ── Intro paragraphs ── */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
        Manoj's academic journey reflects a consistent focus on technology and computer science.
        He completed his 10th grade at St. Xavier's High School in 2018, followed by his 12th
        (Science stream) from Rizvi College of Science in 2020.
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
        He then earned a BSc in Information Technology from the University of Mumbai in 2023,
        graduating with a CGPA of 8.4. He's currently in his final year of an MCA at Sikkim
        Manipal University (2023–2025).
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
        What stands out isn't just the degrees — it's how he's paired academic learning with
        hands-on development, building full-stack applications throughout his studies.
      </p>

      {/* ── Header ── */}
      <Badge text="Education" />
      <h2 className="text-lg font-medium text-foreground mt-3 mb-6">Academic journey</h2>

      {/* ── Timeline ── */}
      <div className="relative pl-8">

        {/* vertical line */}
        <div className="absolute left-[8px] top-2 bottom-2 w-[1.5px] bg-orange-500/20" />

        {/* ── Stop 1: 10th ── */}
        <div className="relative mb-7">
          <div className="absolute -left-[28px] top-1 w-[11px] h-[11px] rounded-full bg-orange-100 border-2 border-orange-400" />
          <p className="text-[11px] font-semibold text-orange-500 uppercase tracking-widest mb-1">2015 – 2018</p>
          <p className="text-[15px] font-medium text-foreground mb-0.5">St. Xavier's High School</p>
          <p className="text-sm text-muted-foreground mb-2">SSC · 10th standard · Maharashtra State Board</p>
          <div className="flex flex-wrap gap-1.5">
            <Badge text="Science" />
            <Badge text="Mathematics" />
            <Badge text="English" />
          </div>
        </div>

        {/* ── Stop 2: 12th ── */}
        <div className="relative mb-7">
          <div className="absolute -left-[28px] top-1 w-[11px] h-[11px] rounded-full bg-orange-100 border-2 border-orange-400" />
          <p className="text-[11px] font-semibold text-orange-500 uppercase tracking-widest mb-1">2018 – 2020</p>
          <p className="text-[15px] font-medium text-foreground mb-0.5">Rizvi College of Science</p>
          <p className="text-sm text-muted-foreground mb-2">HSC · 12th · Science stream · Maharashtra State Board</p>
          <div className="flex flex-wrap gap-1.5">
            <Badge text="Physics" />
            <Badge text="Chemistry" />
            <Badge text="Maths" />
            <Badge text="CS" />
          </div>
        </div>

        {/* ── Stop 3: BSc IT ── */}
        <div className="relative mb-7">
          <div className="absolute -left-[28px] top-1 w-[11px] h-[11px] rounded-full bg-orange-100 border-2 border-orange-400" />
          <p className="text-[11px] font-semibold text-orange-500 uppercase tracking-widest mb-1">2020 – 2023</p>
          <p className="text-[15px] font-medium text-foreground mb-0.5">University of Mumbai</p>
          <p className="text-sm text-muted-foreground mb-0.5">BSc Information Technology</p>
          <p className="text-xs text-muted-foreground/70 mb-2">CGPA 8.4 · First class with distinction</p>
          <div className="flex flex-wrap gap-1.5">
            <Badge text="Web Dev" />
            <Badge text="DBMS" />
            <Badge text="OOP" />
            <Badge text="Networking" />
          </div>
        </div>

        {/* ── Stop 4: MCA (current) ── */}
        <div className="relative">
          {/* hollow dot with ring = current */}
          <div className="absolute -left-[29px] top-[3px] w-[13px] h-[13px] rounded-full bg-background border-[2.5px] border-orange-400 ring-[3px] ring-orange-100" />
          <p className="text-[11px] font-semibold text-orange-500 uppercase tracking-widest mb-1">2023 – 2025</p>
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-[15px] font-medium text-foreground">Sikkim Manipal University</p>
            <span className="text-[10px] font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Current</span>
          </div>
          <p className="text-sm text-muted-foreground mb-0.5">MCA · Master of Computer Applications</p>
          <p className="text-xs text-muted-foreground/70 mb-2">Final year · Full stack specialisation</p>
          <div className="flex flex-wrap gap-1.5">
            <Badge text="React" />
            <Badge text="Node.js" />
            <Badge text="Cloud" />
            <Badge text="DSA" />
          </div>
        </div>

      </div>

      <p className="text-xs text-muted-foreground/60 mt-6 pb-6 leading-relaxed">
        Feel free to ask about his projects, tech stack, or anything else you'd like to know!
      </p>

    </div>
  )
}

export default ChatEducation