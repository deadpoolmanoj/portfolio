import React from 'react'
import ProjectCard from './ProjectCard';
import { RotateCw, ThumbsDown, ThumbsUp } from 'lucide-react';
import DownLoadResumeButton from './DownLoadResumeButton';
import ResponseFooter from './ResponseFooter';
import { IoLogoGithub } from "react-icons/io";
import Badge from './Badge';

const ChatProjects = () => {
    return (
        <div className='w-full '>

            {/* Header */}
            <div className='mb-4'>
                <div className='flex items-center gap-2 mb-4'>
                    <Badge text=' Projects'/>
                    <span className='text-[11px] text-[#9b9b9b]'>4 selected works</span>
                </div>
                <h1 className='text-[15px] font-medium text-[#1a1a1a] leading-snug mb-2'>
                    Things I've built from scratch
                </h1>
                <p className='text-[12px] text-[#585858] leading-relaxed pb-3'>
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

            <div className='mt-4'>
                <DownLoadResumeButton />
            </div>

            <ResponseFooter/>
        </div>
    )
}

export default ChatProjects
