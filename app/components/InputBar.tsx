"use client";

import { ArrowUp, Square } from "lucide-react";
import { useConversation } from "@/context/ConversationContext";
import { useEffect, useState } from "react";
import LimitBanner from "./LimitBanner";

export default function InputBar({ convoId }: { convoId: string }) {
    const {
        message,
        setMessage,
        sendUserMessage,
        editMessageId,
        saveEditedMessage,
        isResponseGenerating,
        stopResponse,
        startNewConversation,
        isConversationOver,
        isAiResponding,
    } = useConversation();

    const conversationOver = isConversationOver(convoId);
    const [dismissedBanner, setDismissedBanner] = useState(false);

    useEffect(() => {
        if (!conversationOver) setDismissedBanner(false);
    }, [conversationOver]);

    const shouldShowLimitBanner = conversationOver && !dismissedBanner;

    return (
        <div className="absolute bottom-0 max-w-3xl w-full px-2 md:px-2 gap-0 z-30 rounded-t-full">
            {shouldShowLimitBanner && (
                <div className="absolute bottom-full left-2 right-2 mb-3 z-40">
                    <LimitBanner
                        onDismiss={() => setDismissedBanner(true)}
                        onNewConversation={() => {
                            setDismissedBanner(false);
                            startNewConversation();
                        }}
                    />
                </div>
            )}

            <div className="rounded-t-3xl" style={{ backgroundColor: "var(--color-bg-page)" }}>
                <div
                    className="rounded-3xl flex flex-col p-[2px]"
                    style={{
                        border: "1px solid var(--color-border)",
                        backgroundColor: "var(--color-bg-input)",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    }}
                >
                    <textarea
                        disabled={conversationOver || isResponseGenerating || isAiResponding}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                if (isResponseGenerating || isAiResponding) return;
                                if (editMessageId) {
                                    saveEditedMessage(convoId);
                                } else {
                                    sendUserMessage(undefined, convoId || undefined);
                                }
                            }
                        }}
                        placeholder="Ask anything about Manoj..."
                        rows={1}
                        className="rounded-t-3xl px-5 pt-4 pb-2 bg-transparent outline-none ring-0 border-0 focus:border-0 resize-none focus:outline-none focus:ring-0 min-h-[44px] max-h-[120px] leading-relaxed text-[13px]"
                        style={{ color: "var(--color-text-primary)" }}
                    />

                    <div className="w-full flex justify-between items-center px-3 pb-2 pt-1">
                        <span className="text-[11px] select-none" style={{ color: "var(--color-text-muted)" }}>
                            ↵ enter to send · shift+enter for new line
                        </span>

                        {(isResponseGenerating || isAiResponding) ? (
                            <button
                                onClick={stopResponse}
                                className="p-2 rounded-full text-white transition-all duration-150 active:scale-95"
                                style={{ backgroundColor: "var(--color-text-primary)" }}
                                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
                                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                            >
                                <Square size={14} fill="white" strokeWidth={0} />
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    if (editMessageId) {
                                        saveEditedMessage(convoId);
                                    } else {
                                        sendUserMessage(undefined, convoId || undefined);
                                    }
                                }}
                                disabled={!message.trim()}
                                className="p-2 rounded-full text-white transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                                style={{ backgroundColor: "var(--color-accent)" }}
                                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-accent-hover)")}
                                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-accent)")}
                            >
                                <ArrowUp size={16} strokeWidth={2.5} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <p
                className="text-[11px] text-center py-1.5 select-none"
                style={{ color: "var(--color-text-muted)", backgroundColor: "var(--color-bg-page)" }}
            >
                Manoj's AI assistant · responses may not always be accurate
            </p>
        </div>
    );
}