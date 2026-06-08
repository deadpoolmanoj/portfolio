'use client'

import { useConversation } from '@/context/ConversationContext';
import { truncateText } from '@/utils/textFormatingHelper';
import { Brain, ChevronDown, CirclePlus, Dock, FolderKanban, PanelLeft, School, Wrench } from 'lucide-react';
import { useState } from 'react'

const SideBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const {
        conversations,
        activeConvoId,
        startNewConversation,
        sendUserMessage,
        switchConversation,
    } = useConversation();

    function typeSelected(type: "projects" | "skills" | "education") {
        const currentConversation = conversations.find(
            c => c.id === activeConvoId
        );

        const existingMessage = currentConversation?.messages.find(
            m => m.type === type
        );

        if (existingMessage) {
            const el = document.getElementById(
                `message-${existingMessage.id}`
            );

            el?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            return;
        }

        sendUserMessage(type);
    }

    const navItems = [
        {
            icon: <FolderKanban size={14} className="shrink-0" />,
            label: "Projects",
            onClick: () => typeSelected("projects"),
        },
        {
            icon: <Wrench size={14} className="shrink-0" />,
            label: "Skills",
            onClick: () => typeSelected("skills"),
        },
        {
            icon: <School size={14} className="shrink-0" />,
            label: "Education",
            onClick: () => typeSelected("education"),
        },
        {
            icon: <Dock size={14} className="shrink-0" />,
            label: "Blogs",
            onClick: () => {},
        },
    ];

    return (
        <div
            className={`${sidebarOpen ? "w-64" : "w-[60px]"} hidden md:flex flex-col h-screen bg-white border-r border-[#f0f0f0] transition-all duration-200 ease-in-out overflow-hidden`}
        >
            {/* Top: logo + toggle */}
            <div className={`flex items-center px-3 pt-4 pb-3 ${sidebarOpen ? "justify-between" : "justify-center"}`}>
                {sidebarOpen && (
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#ffac81]" />
                        <span className="text-[13px] font-medium text-[#1a1a1a]">bud 101</span>
                    </div>
                )}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-1.5 rounded-lg text-[#9b9b9b] hover:bg-[#f5f5f5] hover:text-[#1a1a1a] transition-colors"
                >
                    <PanelLeft size={15} />
                </button>
            </div>

            {/* New chat button */}
            <div className={`px-2 mb-3 ${!sidebarOpen && "flex justify-center"}`}>
                <button
                    onClick={() => startNewConversation()}
                    className={`flex items-center gap-2 text-[12px] font-medium text-[#585858]
                        hover:text-[#1a1a1a] hover:bg-[#f5f5f5] rounded-lg transition-colors
                        ${sidebarOpen ? "w-full px-3 py-2" : "p-2 justify-center"}`}
                >
                    <CirclePlus size={14} className="shrink-0 text-[#9b9b9b]" />
                    {sidebarOpen && "New Chat"}
                </button>
            </div>

            {/* Divider */}
            <div className="mx-3 mb-3 border-t border-[#f0f0f0]" />

            {/* Nav items */}
            <ul className="flex flex-col gap-0.5 px-2">
                {navItems.map((item) => (
                    <li key={item.label}>
                        <button
                            onClick={item.onClick}
                            className={`w-full flex items-center gap-2.5 text-[12px] text-[#585858]
                                font-medium hover:text-[#1a1a1a] hover:bg-[#f5f5f5] rounded-lg
                                transition-colors
                                ${sidebarOpen ? "px-3 py-2" : "p-2 justify-center"}`}
                        >
                            <span className="text-[#9b9b9b]">{item.icon}</span>
                            {sidebarOpen && item.label}
                        </button>
                    </li>
                ))}
            </ul>

            {/* Divider */}
            <div className="mx-3 my-3 border-t border-[#f0f0f0]" />

            {/* Recent chats */}
            {sidebarOpen && (
                <div className="flex-1 px-2 overflow-y-auto">
                    <p className="text-[10px] font-medium uppercase tracking-widest text-[#9b9b9b] px-3 mb-1.5">
                        Recent chats
                    </p>
                    <ul className="flex flex-col gap-0.5">
                        {conversations.map((c) => (
                            <li key={c.id}>
                                <button
                                    onClick={() => switchConversation(c.id)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-[12px] transition-colors
                                        ${activeConvoId === c.id
                                            ? "bg-[#f5f5f5] text-[#1a1a1a] font-medium"
                                            : "text-[#585858] hover:bg-[#f5f5f5] hover:text-[#1a1a1a]"
                                        }`}
                                >
                                    {truncateText(c.title, 24)}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {!sidebarOpen && <div className="flex-1" />}

            {/* Bud card */}
            {sidebarOpen && (
                <div className="mx-2 mb-2 p-3 rounded-xl border border-[#f0f0f0] bg-[#fafafa] flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#fff0eb] border border-[#ffe0d0] flex items-center justify-center shrink-0">
                        <Brain size={14} className="text-[#ffac81]" />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-[12px] font-medium text-[#1a1a1a]">Bud 101</span>
                        <span className="text-[11px] text-[#9b9b9b] truncate">Learn what bud can do</span>
                    </div>
                </div>
            )}

            {/* Avatar */}
            <div className={`px-3 py-3 border-t border-[#f0f0f0] flex items-center gap-2.5 ${!sidebarOpen && "justify-center"}`}>
                <div className="w-6 h-6 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white text-[10px] font-medium shrink-0">
                    N
                </div>
                {sidebarOpen && (
                    <div className="flex flex-col min-w-0">
                        <span className="text-[12px] font-medium text-[#1a1a1a]">Manoj</span>
                        <span className="text-[11px] text-[#9b9b9b]">Portfolio</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SideBar;