import React from 'react'
import ProjectCard from './ProjectCard';
import { RotateCw, ThumbsDown, ThumbsUp } from 'lucide-react';
import DownLoadResumeButton from './DownLoadResumeButton';
import ResponseFooter from './ResponseFooter';
import { IoLogoGithub } from "react-icons/io";

const ChatProjects = () => {
    return (
        <div className='w-full pt-8'>

            {/* Header */}
            <div className='mb-4'>
                <div className='flex items-center gap-2 mb-6'>
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
                <p className='text-[12px] text-[#585858] leading-relaxed pb-4'>
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
            <ResponseFooter/>
        </div>
    )
}

export default ChatProjects