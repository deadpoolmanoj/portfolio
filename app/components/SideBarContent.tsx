'use client'

import { Conversation, useConversation } from '@/context/ConversationContext';
import { useTheme } from '@/context/ThemeContext';
import { truncateText } from '@/utils/textFormatingHelper';
import { Brain, CirclePlus, Dock, DockIcon, File, FolderKanban, Moon, PanelLeft, School, Sun, Wrench, X } from 'lucide-react';
import { usePathname } from "next/navigation";

type SidebarContentProps = {
    sidebarOpen: boolean;
    onToggle?: () => void;
    onClose?: () => void;
    isMobile?: boolean;
}

const SidebarContent = ({ sidebarOpen, onToggle, onClose, isMobile = false }: SidebarContentProps) => {
    const { toggleTheme, isDark } = useTheme();

    const {
        conversations,
        activeConvoId,
        startNewConversation,
        sendUserMessage,
        switchConversation,
        isResponseGenerating,
    } = useConversation();

    function typeSelected(type: "projects" | "skills" | "education" | "blogs" | "resume" | "askManoj") {
        const currentConversation = conversations.find(c => c.id === activeConvoId);
        const existingMessage = currentConversation?.messages.find(m => m.type === type);

        if (existingMessage) {
            document.getElementById(`message-${existingMessage.id}`)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            return;
        }

        sendUserMessage(type, activeConvoId ?? undefined); // ← pass activeConvoId here
    }

    const handleSidebarAction = (callback: () => void) => {
        callback();

        if (isMobile) {
            onClose?.();
        }
    };

    function getConvoTitle(convo: Conversation): string {
        const firstUserMessage = convo.messages?.find(m => m.role === "user")?.content as string;
        return firstUserMessage?.slice(0, 40) || "New Chat";
    }

    return (
        <div
            className="w-full h-[100dvh] flex flex-col"
            style={{ backgroundColor: "var(--color-sidebar-bg)" }}
        >
            {/* Header */}
            <div className={`flex items-center px-3 pt-4 pb-3 ${sidebarOpen ? "justify-between" : "justify-center"}`}>
                {sidebarOpen && (
                    <div className="flex items-center gap-2">
                        {/* <div className="w-7 h-7 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} /> */}
                        <span className="text-[13px] font-medium" style={{ color: "var(--color-text-primary)" }}>
                            AskManoj
                        </span>
                    </div>
                )}
                {isMobile ? (
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg transition-colors"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        <X size={15} />
                    </button>
                ) : (
                    <button
                        onClick={onToggle}
                        className="p-1.5 rounded-lg transition-colors"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        <PanelLeft size={15} />
                    </button>
                )}
            </div>

            {/* New chat */}
            <div className={`px-2 mb-3 ${!sidebarOpen && "flex justify-center"}`}>
                <button
                    onClick={() =>
                        handleSidebarAction(() => startNewConversation())
                    }
                    className={`flex items-center gap-2 text-[12px] font-medium rounded-lg transition-colors
                        ${sidebarOpen ? "w-full px-3 py-2" : "p-2 justify-center"}`}
                    style={{ color: "var(--color-text-secondary)" }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-sidebar-hover)";
                        (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)";
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                        (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
                    }}
                >
                    <CirclePlus size={14} className="shrink-0" style={{ color: "var(--color-text-muted)" }} />
                    {sidebarOpen && "New Chat"}
                </button>
            </div>

            <div className="mx-3 mb-3 border-t" style={{ borderColor: "var(--color-border-light)" }} />

            {/* Nav items */}
            <ul className="flex flex-col gap-0.5 px-2">
                <li>
                    <button
                        disabled={isResponseGenerating}
                        onClick={() =>
                            handleSidebarAction(() => typeSelected("projects"))
                        }
                        className={`w-full flex items-center gap-2.5 text-[12px] font-medium rounded-lg transition-colors
                            ${sidebarOpen ? "px-3 py-2" : "p-2 justify-center"}`}
                        style={{ color: "var(--color-text-secondary)" }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-sidebar-hover)";
                            (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                            (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
                        }}
                    >
                        <FolderKanban size={14} className="shrink-0" style={{ color: "var(--color-text-muted)" }} />
                        {sidebarOpen && "Projects"}
                    </button>
                </li>
                <li>
                    <button
                        onClick={() =>
                            handleSidebarAction(() => typeSelected("skills"))
                        }
                        className={`w-full flex items-center gap-2.5 text-[12px] font-medium rounded-lg transition-colors
                            ${sidebarOpen ? "px-3 py-2" : "p-2 justify-center"}`}
                        style={{ color: "var(--color-text-secondary)" }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-sidebar-hover)";
                            (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                            (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
                        }}
                    >
                        <Wrench size={14} className="shrink-0" style={{ color: "var(--color-text-muted)" }} />
                        {sidebarOpen && "Skills"}
                    </button>
                </li>
                <li>
                    <button
                        onClick={() =>
                            handleSidebarAction(() => typeSelected("education"))
                        }
                        className={`w-full flex items-center gap-2.5 text-[12px] font-medium rounded-lg transition-colors
                            ${sidebarOpen ? "px-3 py-2" : "p-2 justify-center"}`}
                        style={{ color: "var(--color-text-secondary)" }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-sidebar-hover)";
                            (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                            (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
                        }}
                    >
                        <School size={14} className="shrink-0" style={{ color: "var(--color-text-muted)" }} />
                        {sidebarOpen && "Education"}
                    </button>
                </li>
                <li>
                    <button
                        onClick={() =>
                            handleSidebarAction(() => typeSelected("blogs"))
                        }
                        className={`w-full flex items-center gap-2.5 text-[12px] font-medium rounded-lg transition-colors
                            ${sidebarOpen ? "px-3 py-2" : "p-2 justify-center"}`}
                        style={{ color: "var(--color-text-secondary)" }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-sidebar-hover)";
                            (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                            (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
                        }}
                    >
                        <Dock size={14} className="shrink-0" style={{ color: "var(--color-text-muted)" }} />
                        {sidebarOpen && "Blogs"}
                    </button>
                </li>
                <li>
                    <button
                        onClick={() =>
                            handleSidebarAction(() => typeSelected("resume"))
                        }
                        className={`w-full flex items-center gap-2.5 text-[12px] font-medium rounded-lg transition-colors
                            ${sidebarOpen ? "px-3 py-2" : "p-2 justify-center"}`}
                        style={{ color: "var(--color-text-secondary)" }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-sidebar-hover)";
                            (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                            (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
                        }}
                    >
                        <File size={14} className="shrink-0" style={{ color: "var(--color-text-muted)" }} />
                        {sidebarOpen && "Resume"}
                    </button>
                </li>
            </ul>

            <div className="mx-3 my-3 border-t" style={{ borderColor: "var(--color-border-light)" }} />

            {/* Recent chats */}
            {sidebarOpen && (
                <div className="flex-1 px-2 overflow-y-auto">
                    <p className="text-[10px] font-medium uppercase tracking-widest px-3 mb-1.5"
                        style={{ color: "var(--color-text-muted)" }}>
                        Recent chats
                    </p>
                    <ul className="flex flex-col gap-0.5">
                        {conversations.map((c) => (
                            <li key={c.id}>
                                <button
                                    onClick={() =>
                                        handleSidebarAction(() => switchConversation(c.id))
                                    }
                                    className="w-full text-left px-3 py-2 rounded-lg text-[12px] transition-colors"
                                    style={{
                                        backgroundColor: activeConvoId === c.id ? "var(--color-sidebar-active)" : "transparent",
                                        color: activeConvoId === c.id ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                                        fontWeight: activeConvoId === c.id ? "500" : "400",
                                    }}
                                    onMouseEnter={e => {
                                        if (activeConvoId !== c.id) {
                                            (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-sidebar-hover)";
                                            (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)";
                                        }
                                    }}
                                    onMouseLeave={e => {
                                        if (activeConvoId !== c.id) {
                                            (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                                            (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
                                        }
                                    }}
                                >
                                    {truncateText(getConvoTitle(c), 24)}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {!sidebarOpen && <div className="flex-1" />}

            {/* AskManoj card */}
            {sidebarOpen && (
                <div
                    onClick={() =>
                        handleSidebarAction(() => sendUserMessage("Ask Manoj", activeConvoId ?? undefined))
                    }
                    className="mx-2 mb-2 p-3 rounded-xl flex items-center gap-2.5 cursor-pointer active:scale-[0.98] transition-all duration-150"
                    style={{
                        border: "1px solid var(--color-border-light)",
                        backgroundColor: "var(--color-bg-subtle)",
                    }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-bg-accent)";
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-accent)";
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-bg-subtle)";
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-light)";
                    }}
                >
                    <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                            backgroundColor: "var(--color-bg-accent)",
                            border: "1px solid var(--color-border-accent)",
                        }}
                    >
                        <Brain size={14} style={{ color: "var(--color-accent)" }} />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-[12px] font-medium" style={{ color: "var(--color-text-primary)" }}>
                            AskManoj
                        </span>
                        <span className="text-[11px] truncate" style={{ color: "var(--color-text-muted)" }}>
                            Click to learn what I can do
                        </span>
                    </div>
                </div>
            )}

            {/* Avatar */}
            <div
                className={`px-3 py-3 flex items-center gap-2.5 border-t ${!sidebarOpen && "justify-center"}`}
                style={{ borderColor: "var(--color-border-light)" }}
            >
                <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-medium shrink-0"
                    style={{ backgroundColor: "var(--color-text-primary)" }}
                >
                    M
                </div>
                {sidebarOpen && (
                    <div className="flex flex-col min-w-0">
                        <span className="text-[12px] font-medium" style={{ color: "var(--color-text-primary)" }}>
                            Manoj Naik
                        </span>
                        <span className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>
                            Open to work
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SidebarContent;