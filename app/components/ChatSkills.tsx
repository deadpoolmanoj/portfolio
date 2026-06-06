import React from 'react'
import Badge from './Badge';
import SkillCard from './SkillCard';

const ChatSkills = () => {
    return (
        <div className='w-full px-1 my-4'>

            {/* Header */}
            <div className='mb-4'>
                <div className='flex items-center gap-2 mb-1'>
                    <span className='text-[10px] font-medium tracking-widest uppercase
                                    text-[#9b9b9b] bg-[#f8f9fa] border border-[#e9ecef]
                                    px-2.5 py-0.5 rounded-full'>
                        Skills
                    </span>
                    <span className='text-[11px] text-[#9b9b9b]'>20+ technologies</span>
                </div>
                <h1 className='text-[15px] font-medium text-[#1a1a1a] leading-snug mb-1'>
                    My technical background
                </h1>
                <p className='text-[12px] text-[#585858] leading-relaxed'>
                    Full-stack developer with strong roots in JavaScript and Python ecosystems.
                    I build end-to-end — from REST APIs and real-time WebSocket systems
                    to polished React frontends.
                </p>
            </div>

            {/* Legend */}
            <div className='flex items-center gap-4 mb-4'>
                {[
                    { color: '#3B6D11', label: 'Strong' },
                    { color: '#ffac81', label: 'Solid' },
                    { color: '#9b9b9b', label: 'Familiar' },
                ].map(({ color, label }) => (
                    <div key={label} className='flex items-center gap-1.5'>
                        <span className='w-2 h-2 rounded-full' style={{ background: color }} />
                        <span className='text-[11px] text-[#585858]'>{label}</span>
                    </div>
                ))}
            </div>

            {/* Desktop: grouped sections */}
            <div className='hidden md:flex flex-col gap-6'>
                {['FRONTEND', 'BACKEND', 'LANGUAGES & DATABASES'].map((section) => (
                    <div key={section}>
                        <h2 className='text-[10px] font-medium tracking-widest uppercase
                                       text-[#9b9b9b] mb-2.5'>
                            {section}
                        </h2>
                        <div className='grid grid-cols-3 gap-2.5'>
                            <SkillCard />
                            <SkillCard />
                            <SkillCard />
                            <SkillCard />
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile: filter tabs + single column */}
            <div className='flex flex-col md:hidden gap-3'>
                <div className='flex gap-2 overflow-x-auto pb-1'>
                    {['All', 'Frontend', 'Backend', 'Databases', 'Core CS'].map((tab) => (
                        <button key={tab}
                                className='border border-[#e9ecef] rounded-full px-3 py-1
                                           text-[11px] text-[#585858] shrink-0
                                           hover:bg-[#f8f9fa] transition-colors'>
                            {tab}
                        </button>
                    ))}
                </div>
                <div className='grid grid-cols-1 gap-2.5'>
                    <SkillCard />
                    <SkillCard />
                    <SkillCard />
                    <SkillCard />
                    <SkillCard />
                </div>
            </div>
        </div>
    )
}

export default ChatSkills