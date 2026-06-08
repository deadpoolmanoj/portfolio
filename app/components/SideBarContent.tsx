'use client'

import { useConversation } from '@/context/ConversationContext';
import { truncateText } from '@/utils/textFormatingHelper';
import { Brain, CirclePlus, Dock, FolderKanban, PanelLeft, School, Wrench, X } from 'lucide-react';

type SidebarContentProps = {
    sidebarOpen: boolean;
    onToggle?: () => void;
    onClose?: () => void;
    isMobile?: boolean;
}

const SidebarContent = ({ sidebarOpen, onToggle, onClose, isMobile = false }: SidebarContentProps) => {
    const {
        conversations,
        activeConvoId,
        startNewConversation,
        sendUserMessage,
        switchConversation,
    } = useConversation();

    function typeSelected(type: "projects" | "skills" | "education") {
        const currentConversation = conversations.find(c => c.id === activeConvoId);
        const existingMessage = currentConversation?.messages.find(m => m.type === type);

        if (existingMessage) {
            document.getElementById(`message-${existingMessage.id}`)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            return;
        }

        sendUserMessage(type);
    }

    return (
        <div className="w-full h-full flex flex-col">

            {/* Header */}
            <div className={`flex items-center px-3 pt-4 pb-3 ${sidebarOpen ? "justify-between" : "justify-center"}`}>
                {sidebarOpen && (
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#ffac81]" />
                        <span className="text-[13px] font-medium text-[#1a1a1a]">AskManoj </span>
                    </div>
                )}
                {isMobile ? (
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-[#9b9b9b] hover:bg-[#f5f5f5] hover:text-[#1a1a1a] transition-colors"
                    >
                        <X size={15} />
                    </button>
                ) : (
                    <button
                        onClick={onToggle}
                        className="p-1.5 rounded-lg text-[#9b9b9b] hover:bg-[#f5f5f5] hover:text-[#1a1a1a] transition-colors"
                    >
                        <PanelLeft size={15} />
                    </button>
                )}
            </div>

            {/* New chat */}
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

            <div className="mx-3 mb-3 border-t border-[#f0f0f0]" />

            {/* Nav items */}
            <ul className="flex flex-col gap-0.5 px-2">
                <li>
                    <button
                        onClick={() => typeSelected("projects")}
                        className={`w-full flex items-center gap-2.5 text-[12px] text-[#585858]
              font-medium hover:text-[#1a1a1a] hover:bg-[#f5f5f5] rounded-lg transition-colors
              ${sidebarOpen ? "px-3 py-2" : "p-2 justify-center"}`}
                    >
                        <span className="text-[#9b9b9b]"><FolderKanban size={14} className="shrink-0" /></span>
                        {sidebarOpen && "Projects"}
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => typeSelected("skills")}
                        className={`w-full flex items-center gap-2.5 text-[12px] text-[#585858]
              font-medium hover:text-[#1a1a1a] hover:bg-[#f5f5f5] rounded-lg transition-colors
              ${sidebarOpen ? "px-3 py-2" : "p-2 justify-center"}`}
                    >
                        <span className="text-[#9b9b9b]"><Wrench size={14} className="shrink-0" /></span>
                        {sidebarOpen && "Skills"}
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => typeSelected("education")}
                        className={`w-full flex items-center gap-2.5 text-[12px] text-[#585858]
              font-medium hover:text-[#1a1a1a] hover:bg-[#f5f5f5] rounded-lg transition-colors
              ${sidebarOpen ? "px-3 py-2" : "p-2 justify-center"}`}
                    >
                        <span className="text-[#9b9b9b]"><School size={14} className="shrink-0" /></span>
                        {sidebarOpen && "Education"}
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => typeSelected("blogs")}
                        className={`w-full flex items-center gap-2.5 text-[12px] text-[#585858]
              font-medium hover:text-[#1a1a1a] hover:bg-[#f5f5f5] rounded-lg transition-colors
              ${sidebarOpen ? "px-3 py-2" : "p-2 justify-center"}`}
                    >
                        <span className="text-[#9b9b9b]"><Dock size={14} className="shrink-0" /></span>
                        {sidebarOpen && "Blogs"}
                    </button>
                </li>
            </ul>

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
                <div
                    onClick={() => sendUserMessage("ask manoj")}
                    className="mx-2 mb-2 p-3 rounded-xl border border-[#f0f0f0] bg-[#fafafa]
               flex items-center gap-2.5 cursor-pointer
               hover:bg-[#fff0eb] hover:border-[#ffe0d0]
               active:scale-[0.98]
               transition-all duration-150"
                >
                    <div className="w-7 h-7 rounded-lg bg-[#fff0eb] border border-[#ffe0d0]
                    flex items-center justify-center shrink-0">
                        <Brain size={14} className="text-[#ffac81]" />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-[12px] font-medium text-[#1a1a1a]">AskManoj</span>
                        <span className="text-[11px] text-[#9b9b9b] truncate">Click to learn what I can do</span>
                    </div>
                </div>
            )}

            {/* Avatar */}
            <div className={`px-3 py-3 border-t border-[#f0f0f0] flex items-center gap-2.5 ${!sidebarOpen && "justify-center"}`}>
                <div className="w-6 h-6 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white text-[10px] font-medium shrink-0">
                    M
                </div>
                {sidebarOpen && (
                    <div className="flex flex-col min-w-0">
                        <span className="text-[12px] font-medium text-[#1a1a1a]">Manoj Naik</span>
                        <span className="text-[11px] text-[#9b9b9b]">Open to work · Bengaluru</span>
                    </div>
                )}
            </div>

        </div>
    );
};

export default SidebarContent;