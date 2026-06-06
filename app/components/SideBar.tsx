'use client'

import { Brain, ChevronDown, CirclePlus, Dock, FolderKanban, PanelLeft, School, Wrench } from 'lucide-react';
import { useState } from 'react'

const SideBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className={`${sidebarOpen ? 'w-72' : 'w-16'} hidden md:flex p-2 bg-white h-screen transition-all duration-200 ease-in-out overflow-hidden`}>
            <div className='w-full flex-1 h-full border border-[#e9ecef] rounded-4xl p-[2px] flex flex-col'>
                <div className='h-full rounded-4xl bg-[#f8f9fa] p-1 flex flex-col'>

                    {/* Header */}
                    <div className={`flex p-2 items-center ${sidebarOpen ? "justify-between" : "justify-center"}`}>
                        {sidebarOpen && (
                            <button className='w-8 h-8 rounded-full bg-[#ffac81]' />
                        )}
                        <button
                            className='text-[#9b9b9b] hover:bg-white hover:text-[#1a1a1a] rounded-full p-2 transition-colors'
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <PanelLeft size={16} />
                        </button>
                    </div>

                    {/* Nav */}
                    <ul className='flex-1 flex flex-col gap-0.5 px-1 mt-1'>
                        <li className={`flex gap-2.5 items-center px-3 py-2.5 rounded-xl
                                       hover:bg-white text-[13px] text-[#585858] cursor-pointer
                                       transition-colors ${!sidebarOpen && 'justify-center'}`}>
                            <CirclePlus size={15} className='shrink-0' />
                            {sidebarOpen && 'New Chat'}
                        </li>
                        <li className={`flex gap-2.5 items-center px-3 py-2.5 rounded-xl
                                       hover:bg-white text-[13px] text-[#585858] cursor-pointer
                                       transition-colors ${!sidebarOpen && 'justify-center'}`}>
                            <FolderKanban size={15} className='shrink-0' />
                            {sidebarOpen && 'Projects'}
                        </li>
                        <li className={`flex gap-2.5 items-center px-3 py-2.5 rounded-xl
                                       hover:bg-white text-[13px] text-[#585858] cursor-pointer
                                       transition-colors ${!sidebarOpen && 'justify-center'}`}>
                            <Wrench size={15} className='shrink-0' />
                            {sidebarOpen && 'Skills'}
                        </li>
                        <li className={`flex gap-2.5 items-center px-3 py-2.5 rounded-xl
                                       hover:bg-white text-[13px] text-[#585858] cursor-pointer
                                       transition-colors ${!sidebarOpen && 'justify-center'}`}>
                            <School size={15} className='shrink-0' />
                            {sidebarOpen && 'Education'}
                        </li>
                        <li className={`flex gap-2.5 items-center px-3 py-2.5 rounded-xl
                                       hover:bg-white text-[13px] text-[#585858] cursor-pointer
                                       transition-colors ${!sidebarOpen && 'justify-center'}`}>
                            <Dock size={15} className='shrink-0' />
                            {sidebarOpen && 'Blogs'}
                        </li>
                        <li className={`flex gap-2.5 items-center px-3 py-2.5 rounded-xl
                                       hover:bg-white text-[13px] text-[#585858] cursor-pointer
                                       transition-colors ${!sidebarOpen && 'justify-center'}`}>
                            <ChevronDown size={15} className='shrink-0' />
                            {sidebarOpen && 'Recent chats'}
                        </li>
                    </ul>

                    {/* Bud card */}
                    {sidebarOpen && (
                        <div className='bg-white rounded-3xl flex gap-2.5 p-3 mx-1 mb-1'>
                            <div className='p-1.5 text-[#585858]'>
                                <Brain size={18} />
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-[13px] font-medium text-[#1a1a1a]'>Bud 101</span>
                                <span className='text-[11px] text-[#9b9b9b]'>Learn what bud can do</span>
                            </div>
                        </div>
                    )}

                </div>

                {/* Avatar */}
                <div className='px-4 py-2 flex items-center gap-2'>
                    <div className='w-6 h-6 rounded-full bg-[#1a1a1a] flex items-center
                                    justify-center text-white text-[10px] font-medium'>
                        N
                    </div>
                    {sidebarOpen && <span className='text-[12px] text-[#9b9b9b]'>Manoj</span>}
                </div>

            </div>
        </div>
    )
}

export default SideBar