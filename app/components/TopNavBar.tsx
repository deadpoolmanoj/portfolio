'use client'

import { X, PanelLeft, CirclePlus, FolderKanban, Wrench, School, Dock, ChevronDown, Brain } from 'lucide-react';
import { useState } from 'react'

const TopNavBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            {/* Top bar */}
            <nav className='fixed md:hidden top-0 left-0 right-0 z-40
                            flex items-center justify-between
                            h-12 px-4 bg-white/80 backdrop-blur-md
                            border-b border-[#e9ecef]'>

                <button onClick={() => setSidebarOpen(true)}
                    className='p-1.5 rounded-lg text-[#585858] hover:bg-[#f8f9fa]'>
                    <PanelLeft size={17} />
                </button>

                <div className='flex items-center gap-1.5'>
                    <span className='text-[12px] font-medium text-[#1a1a1a]'>7:07<sup className='text-[9px] font-normal'>PM</sup></span>
                    <span className='text-[#ccc]'>·</span>
                    <span className='text-[12px] text-[#585858]'>Bengaluru 22°</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                        stroke="#9b9b9b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
                    </svg>
                </div>

                <div className='w-8' />
            </nav>

            {/* Backdrop */}
            {sidebarOpen && (
                <div className='fixed inset-0 z-40 bg-black/10 md:hidden'
                    onClick={() => setSidebarOpen(false)} />
            )}

            {/* Drawer */}
            <div className={`fixed top-0 left-0 z-50 md:hidden w-72 h-screen p-2 
                            transition-transform duration-300 ease-in-out
                            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className='w-full h-full border bg-white border-[#e9ecef] rounded-4xl p-[2px]'>
                    <div className='h-full rounded-4xl bg-[#e9ecef]/50 p-1 flex flex-col'>

                        <div className='flex justify-between items-center p-2'>
                            <button className='p-4 rounded-full bg-red-400' />
                            <button onClick={() => setSidebarOpen(false)}
                                className='text-[#585858] hover:bg-white rounded-full p-2'>
                                <X size={16} />
                            </button>
                        </div>

                        <ul className='flex-1 flex flex-col gap-0.5 px-1'>
                            <li className='flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white text-[13px] text-[#585858] cursor-pointer'>
                                <CirclePlus size={15} /> New Chat
                            </li>
                            <li className='flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white text-[13px] text-[#585858] cursor-pointer'>
                                <FolderKanban size={15} /> Projects
                            </li>
                            <li className='flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white text-[13px] text-[#585858] cursor-pointer'>
                                <Wrench size={15} /> Skills
                            </li>
                            <li className='flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white text-[13px] text-[#585858] cursor-pointer'>
                                <School size={15} /> Education
                            </li>
                            <li className='flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white text-[13px] text-[#585858] cursor-pointer'>
                                <Dock size={15} /> Blogs
                            </li>
                            <li className='flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white text-[13px] text-[#585858] cursor-pointer'>
                                <ChevronDown size={15} /> Recent chats
                            </li>
                        </ul>

                        <div className='bg-white rounded-3xl flex gap-2 p-3 mx-1 mb-1'>
                            <div className='p-1.5 text-[#585858]'><Brain size={18} /></div>
                            <div className='flex flex-col'>
                                <span className='text-[13px] font-medium text-[#1a1a1a]'>Bud 101</span>
                                <span className='text-[11px] text-[#9b9b9b]'>Learn what bud can do</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default TopNavBar