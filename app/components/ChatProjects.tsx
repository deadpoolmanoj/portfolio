import React from 'react'
import ProjectCard from './ProjectCard';
import { RotateCw, ThumbsDown, ThumbsUp } from 'lucide-react';
import DownLoadResumeButton from './DownLoadResumeButton';

const ChatProjects = () => {
    return (
        <div className='w-full md:mx-6 my-4 px-1'>

            {/* Header */}
            <div className='mb-4'>
                <div className='flex items-center gap-2 mb-1'>
                    <span className='text-[10px] font-medium tracking-widest uppercase
                                    text-[#9b9b9b] bg-[#f8f9fa] border border-[#e9ecef]
                                    px-2.5 py-0.5 rounded-full'>
                        Projects
                    </span>
                    <span className='text-[11px] text-[#9b9b9b]'>4 selected works</span>
                </div>
                <h1 className='text-[15px] font-medium text-[#1a1a1a] leading-snug mb-1'>
                    Things I've built from scratch
                </h1>
                <p className='text-[12px] text-[#585858] leading-relaxed'>
                    A mix of tools, apps, and side projects — ranging from production systems
                    to open-source experiments. Each one solved a real problem I ran into.
                </p>
            </div>

            {/* Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
            </div>

            {/* Footer text */}
            <p className='text-[12px] text-[#585858] leading-relaxed mt-4'>
                These projects highlight different aspects of my work — from frontend
                engineering and system design to AI-powered applications. Feel free to
                ask about the architecture, challenges, or technical decisions behind any project.
            </p>

            {/* Actions */}
            <div className='mt-4'>
                <DownLoadResumeButton />
            </div>

            {/* Feedback row */}
            <div className='flex gap-3 mt-3 pt-3 border-t border-[#e9ecef]'>
                <button className='p-1.5 rounded-full hover:bg-[#f8f9fa] text-[#9b9b9b]
                                   transition-colors'>
                    <RotateCw size={14} />
                </button>
                <button className='p-1.5 rounded-full hover:bg-[#f8f9fa] text-[#9b9b9b]
                                   transition-colors'>
                    <ThumbsUp size={14} />
                </button>
                <button className='p-1.5 rounded-full hover:bg-[#f8f9fa] text-[#9b9b9b]
                                   transition-colors'>
                    <ThumbsDown size={14} />
                </button>
            </div>
        </div>
    )
}

export default ChatProjects