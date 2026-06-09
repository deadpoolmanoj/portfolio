'use client'

import React, { useEffect, useRef } from 'react'
import ChatProjects from './ChatProjects';
import ChatSkills from './ChatSkills';
import ChatEducation from './ChatEducation';
import { Copy, Pen } from 'lucide-react';
import ChatLoadingAnimation from './ChatloadingAnimation';
import ReactMarkdown from "react-markdown";
import { Message, useConversation } from '@/context/ConversationContext';
import ResponseFooter from './ResponseFooter';
import ChatBlogs from './ChatBlogs';
import AskManoj from './AskManoj';
import ChatResume from './ChatResume';

const Chats = ({ messages, convoId }: { messages: Message[]; convoId: string }) => {
    const lastScrolledUserMessage = useRef<string | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        const latestUserMessage = [...messages].reverse().find(msg => msg.role === "user");
        if (!latestUserMessage) return;
        if (lastScrolledUserMessage.current === latestUserMessage.id) return;
        lastScrolledUserMessage.current = latestUserMessage.id;
        document
            .getElementById(`message-${latestUserMessage.id}`)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [messages]);

    return (
        <div className='w-full h-full pt-4'>
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    id={`message-${msg.id}`}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                    {(() => {
                        switch (msg.type) {
                            case "text":
                                return <TextMsg message={msg} convoId={convoId} />;
                            case "projects":
                                return (
                                    <div className="w-full">
                                        <ChatProjects />
                                        <ResponseFooter messageId={msg.id} convoId={convoId} feedback={msg.feedback} />
                                    </div>
                                );
                            case "skills":
                                return (
                                    <div className="w-full">
                                        <ChatSkills />
                                        <ResponseFooter messageId={msg.id} convoId={convoId} feedback={msg.feedback} />
                                    </div>
                                );
                            case "education":
                                return (
                                    <div className="w-full">
                                        <ChatEducation />
                                        <ResponseFooter messageId={msg.id} convoId={convoId} feedback={msg.feedback} />
                                    </div>
                                );
                            case "blogs":
                                return (
                                    <div className='w-full'>
                                        <ChatBlogs />
                                        <ResponseFooter messageId={msg.id} convoId={convoId} feedback={msg.feedback} />
                                    </div>
                                );
                            case "askManoj":
                                return (
                                    <div className='w-full'>
                                        <AskManoj />
                                        <ResponseFooter messageId={msg.id} convoId={convoId} feedback={msg.feedback} />
                                    </div>
                                );
                            case "resume":
                                return (
                                    <div className='w-full'>
                                        <ChatResume />
                                        <ResponseFooter messageId={msg.id} convoId={convoId} feedback={msg.feedback} />
                                    </div>
                                );
                            case "loading":
                                return <ChatLoadingAnimation />;
                            default:
                                return null;
                        }
                    })()}
                </div>
            ))}
            <div ref={bottomRef} />
        </div>
    );
};

const TextMsg = ({ message, convoId }: { message: Message; convoId: string }) => {
    const { startEditingMessage } = useConversation();

    return (
        <>
            {message.role === "assistant" ? (
                <div className="w-full py-2">
                    <ReactMarkdown
                        components={{
                            h1: ({ children }) => (
                                <h1 className="text-[16px] font-semibold mb-2" style={{ color: "var(--color-text-primary)" }}>{children}</h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-[15px] font-medium mb-2 mt-4" style={{ color: "var(--color-text-primary)" }}>{children}</h2>
                            ),
                            p: ({ children }) => (
                                <p className="text-[12px] leading-relaxed mb-3" style={{ color: "var(--color-text-secondary)" }}>{children}</p>
                            ),
                            strong: ({ children }) => (
                                <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>{children}</span>
                            ),
                            em: ({ children }) => <span className="italic">{children}</span>,
                            ul: ({ children }) => (
                                <ul className="list-disc pl-5 space-y-1 mb-3 text-[12px]" style={{ color: "var(--color-text-secondary)" }}>{children}</ul>
                            ),
                            ol: ({ children }) => (
                                <ol className="list-decimal pl-5 space-y-1 mb-3 text-[12px]" style={{ color: "var(--color-text-secondary)" }}>{children}</ol>
                            ),
                            li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                            blockquote: ({ children }) => (
                                <div className="pl-3 my-3" style={{ borderLeft: "2px solid var(--color-border)" }}>
                                    <p className="text-[12px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>{children}</p>
                                </div>
                            ),
                        }}
                    >
                        {message.content as string}
                    </ReactMarkdown>
                    <ResponseFooter messageId={message.id} convoId={convoId} feedback={message.feedback} />
                </div>
            ) : (
                <div className='w-full flex items-end flex-col group mt-6'>
                    <span
                        className="inline-block max-w-[80%] rounded-[20px] rounded-br-[4px] px-[18px] py-[11px] text-sm leading-[1.55] tracking-[-0.01em] font-normal select-text"
                        style={{
                            backgroundColor: "var(--color-user-bubble-bg)",
                            border: "1px solid var(--color-user-bubble-border)",
                            color: "var(--color-text-primary)",
                        }}
                    >
                        {message.content}
                    </span>

                    <div className="mt-1 flex items-center gap-1 opacity-0 pointer-events-none transition-opacity duration-150 ease-in-out group-hover:opacity-100 group-hover:pointer-events-auto">
                        <button
                            className="flex items-center justify-center h-7 w-7 rounded-full transition-colors"
                            style={{ color: "var(--color-text-muted)" }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-bg-subtle)"; (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)"; }}
                            aria-label="Copy message"
                        >
                            <Copy size={12} />
                        </button>
                        <button
                            className="flex items-center justify-center h-7 w-7 rounded-full transition-colors"
                            style={{ color: "var(--color-text-muted)" }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-bg-subtle)"; (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)"; }}
                            aria-label="Edit message"
                            onClick={() => startEditingMessage(message.id, message.content as string)}
                        >
                            <Pen size={12} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chats;