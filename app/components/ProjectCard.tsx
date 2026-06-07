import React from 'react'
import Image from 'next/image';
import Badge from './Badge';
import { GitBranch, MoveUpRight } from 'lucide-react';
import { IoLogoGithub } from "react-icons/io";

const ProjectCard = () => {
    return (
        <div className='flex flex-col border border-[#e9ecef] rounded-2xl
                        hover:border-[#ccc] transition-colors duration-150 overflow-hidden'>

            {/* Preview image */}
            <div className='relative h-32 w-full'>
                <Image
                    src='/images/image1.jpg'
                    alt='DSA Visualizer preview'
                    fill
                    className='object-cover rounded-t-2xl'
                />
            </div>

            {/* Body */}
            <div className='p-3.5 flex flex-col gap-2'>

                {/* Badges */}
                <div className='flex flex-wrap gap-1.5'>
                    <Badge text='Python' />
                    <Badge text='DSA' />
                    <Badge text='TypeScript' />
                </div>

                {/* Title */}
                <h2 className='text-[13px] font-medium text-[#1a1a1a] leading-tight'>
                    DSA Visualizer
                </h2>

                {/* Description */}
                <p className='text-[11px] text-[#585858] leading-relaxed'>
                    Animates 18+ sorting and graph algorithms step by step
                    with a live Big-O complexity panel.
                </p>

                {/* Footer */}
                <div className='border-t border-[#f0f0f0] flex justify-between
                                items-center pt-2.5 mt-1'>
                    <div className='flex items-center gap-1.5'>
                        <span className='w-1.5 h-1.5 rounded-full bg-[#3B6D11]' />
                        <span className='text-[10px] text-[#9b9b9b]'>Active · 2024</span>
                    </div>
                    <a href='#'
                       className='flex items-center gap-1 text-[10px] text-[#585858]
                                  hover:text-[#1a1a1a] transition-colors'>
                        <IoLogoGithub />
                        Github
                        <MoveUpRight size={11} />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard