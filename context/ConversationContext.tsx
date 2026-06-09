'use client'

import { classifyUserInput } from "@/utils/intentClassifier";
import { ReactNode, createContext, useContext, useRef, useState } from "react";
import ChatProjects from "@/app/components/ChatProjects";
import ChatSkills from "@/app/components/ChatSkills";
import ChatEducation from "@/app/components/ChatEducation";

export type Role = 'user' | 'assistant'

export type Message = {
    id: string;
    role: Role;
    type: "projects" | "skills" | "education" | "text" | "blogs" | "askManoj" | "resume" | "loading";
    content: string | ReactNode;
    feedback?: 'like' | 'dislike' | null;
}

export type Conversation = {
    id: string;
    title: string;
    messages: Message[];
    createdAt: Date;
}

type ConversationContextType = {
    conversations: Conversation[];
    activeConvoId: string | null;
    noChatsYet: boolean;
    message: string;
    setMessage: (msg: string) => void;
    sendUserMessage: (msg?: string) => Promise<void>;
    switchConversation: (id: string) => void;
    startNewConversation: () => void;

    editMessageId: string | null;
    startEditingMessage: (messageId: string, content: string) => void;
    saveEditedMessage: () => Promise<void>;

    setFeedback: (messageId: string, feedback: "like" | "dislike") => void;

    // ── new ──────────────────────────────────────────────────────────────────
    isResponseGenerating: boolean;
    stopResponse: () => void;
    // ─────────────────────────────────────────────────────────────────────────
}

const ConversationContext = createContext<ConversationContextType | null>(null);

function createConversation(firstMessage: string): Conversation {
    return {
        id: crypto.randomUUID(),
        title: firstMessage.slice(0, 40),
        messages: [],
        createdAt: new Date(),
    };
}

function getComponentForIntent(intent: string): ReactNode {
    switch (intent) {
        case "projects": return <ChatProjects />;
        case "skills": return <ChatSkills />;
        case "education": return <ChatEducation />;
        default: return null;
    }
}

export function ConversationProvider({ children }: { children: ReactNode }) {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConvoId, setActiveConvoId] = useState<string | null>(null);
    const [noChatsYet, setNoChatsYet] = useState(true);
    const [message, setMessage] = useState("");
    const [editMessageId, setEditMessageId] = useState<string | null>(null);

    // ── new ──────────────────────────────────────────────────────────────────
    const [isResponseGenerating, setIsResponseGenerating] = useState(false);
    const stopRequestedRef = useRef(false);
    // ─────────────────────────────────────────────────────────────────────────

    function stopResponse() {
        stopRequestedRef.current = true;
    }

    function setFeedback(messageId: string, feedback: "like" | "dislike") {
        if (!activeConvoId) return;
        setConversations(prev =>
            prev.map(convo => {
                if (convo.id !== activeConvoId) return convo;
                return {
                    ...convo,
                    messages: convo.messages.map(msg =>
                        msg.id === messageId ? { ...msg, feedback } : msg
                    ),
                };
            })
        );
    }

    function startEditingMessage(messageId: string, content: string) {
        setEditMessageId(messageId);
        setMessage(content);
    }

    async function saveEditedMessage() {
        if (!editMessageId || !activeConvoId) return;

        const convo = conversations.find(c => c.id === activeConvoId);
        if (!convo) return;

        const editedIndex = convo.messages.findIndex(m => m.id === editMessageId);
        if (editedIndex === -1) return;

        const updatedMessages = convo.messages.slice(0, editedIndex + 1);
        updatedMessages[editedIndex] = { ...updatedMessages[editedIndex], content: message };

        setConversations(prev =>
            prev.map(c => c.id === activeConvoId ? { ...c, messages: updatedMessages } : c)
        );

        const editedContent = message;
        setMessage("");
        setEditMessageId(null);

        const loadingId = crypto.randomUUID();

        setConversations(prev =>
            prev.map(c => {
                if (c.id !== activeConvoId) return c;
                return {
                    ...c,
                    messages: [
                        ...updatedMessages,
                        { id: loadingId, role: "assistant", type: "loading", content: "Thinking..." },
                    ],
                };
            })
        );

        const result = classifyUserInput(editedContent);

        // ── flag on ───────────────────────────────────────────────────────────
        stopRequestedRef.current = false;
        setIsResponseGenerating(true);
        // ─────────────────────────────────────────────────────────────────────

        if (result.intent !== "unknown" && !result.hasSubIntent) {
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (stopRequestedRef.current) {
                replaceLoading(activeConvoId, loadingId, {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    type: "text",
                    content: "Response interrupted.",
                });
                setIsResponseGenerating(false);
                return;
            }

            replaceLoading(activeConvoId, loadingId, {
                id: crypto.randomUUID(),
                role: "assistant",
                type: result.intent as "projects" | "skills" | "education",
                content: getComponentForIntent(result.intent),
            });
            setIsResponseGenerating(false);
            return;
        }

        try {
            const history = buildHistory(activeConvoId, editedContent);
            const [data] = await Promise.all([
                askClaude(history),
                new Promise(resolve => setTimeout(resolve, 2000)),
            ]);

            if (stopRequestedRef.current) {
                replaceLoading(activeConvoId, loadingId, {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    type: "text",
                    content: "Response interrupted.",
                });
                setIsResponseGenerating(false);
                return;
            }

            replaceLoading(activeConvoId, loadingId, {
                id: crypto.randomUUID(),
                role: "assistant",
                type: "text",
                content: data?.response ?? "Sorry, I couldn't find an answer.",
            });
        } catch {
            replaceLoading(activeConvoId, loadingId, {
                id: crypto.randomUUID(),
                role: "assistant",
                type: "text",
                content: "Sorry, something went wrong.",
            });
        } finally {
            // ── flag off ──────────────────────────────────────────────────────
            setIsResponseGenerating(false);
            // ─────────────────────────────────────────────────────────────────
        }
    }

    function switchConversation(id: string) {
        setActiveConvoId(id);
        setNoChatsYet(false);
    }

    function startNewConversation() {
        setActiveConvoId(null);
        setNoChatsYet(true);
    }

    function addMessages(convoId: string, newMsgs: Message[]) {
        setConversations(prev =>
            prev.map(c =>
                c.id === convoId
                    ? { ...c, messages: [...c.messages, ...newMsgs] }
                    : c
            )
        );
    }

    function replaceLoading(convoId: string, loadingId: string, newMsg: Message) {
        setConversations(prev =>
            prev.map(c =>
                c.id === convoId
                    ? { ...c, messages: [...c.messages.filter(m => m.id !== loadingId), newMsg] }
                    : c
            )
        );
    }

    function scrollToMessage(messageId: string) {
        const el = document.getElementById(`message-${messageId}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    async function sendUserMessage(msg?: string) {
        const content = msg ?? message;
        if (!content.trim()) return;

        // ── block while generating ────────────────────────────────────────────
        if (isResponseGenerating) return;
        // ─────────────────────────────────────────────────────────────────────

        let convoId = activeConvoId;

        if (!convoId) {
            const newConvo = createConversation(content);
            convoId = newConvo.id;
            setActiveConvoId(convoId);
            setConversations(prev => [...prev, newConvo]);
        }

        const result = classifyUserInput(content);

        if (result.intent !== "unknown" && !result.hasSubIntent) {
            const currentConversation = conversations.find(c => c.id === convoId);
            const existingMessage = currentConversation?.messages.find(m => m.type === result.intent);

            if (existingMessage) {
                scrollToMessage(existingMessage.id);
                return;
            }
        }

        const loadingId = crypto.randomUUID();
        const capturedConvoId = convoId;

        addMessages(capturedConvoId, [
            { id: crypto.randomUUID(), role: "user", type: "text", content },
            { id: loadingId, role: "assistant", type: "loading", content: "Thinking..." },
        ]);

        setMessage("");
        setNoChatsYet(false);

        // ── flag on ───────────────────────────────────────────────────────────
        stopRequestedRef.current = false;
        setIsResponseGenerating(true);
        // ─────────────────────────────────────────────────────────────────────

        if (result.intent !== "unknown" && !result.hasSubIntent) {
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (stopRequestedRef.current) {
                replaceLoading(capturedConvoId, loadingId, {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    type: "text",
                    content: "Response interrupted.",
                });
                setIsResponseGenerating(false);
                return;
            }

            replaceLoading(capturedConvoId, loadingId, {
                id: crypto.randomUUID(),
                role: "assistant",
                type: result.intent as "projects" | "skills" | "education",
                content: getComponentForIntent(result.intent),
            });
            setIsResponseGenerating(false);
            return;
        }

        try {
            const history = buildHistory(capturedConvoId, content);
            const [data] = await Promise.all([
                askClaude(history),
                new Promise(resolve => setTimeout(resolve, 2000)),
            ]);

            if (stopRequestedRef.current) {
                replaceLoading(capturedConvoId, loadingId, {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    type: "text",
                    content: "Response interrupted.",
                });
                setIsResponseGenerating(false);
                return;
            }

            replaceLoading(capturedConvoId, loadingId, {
                id: crypto.randomUUID(),
                role: "assistant",
                type: "text",
                content: data?.response ?? "Sorry, I couldn't find an answer.",
            });
        } catch (error) {
            console.error(error);
            replaceLoading(capturedConvoId, loadingId, {
                id: crypto.randomUUID(),
                role: "assistant",
                type: "text",
                content: "Sorry, something went wrong. Please try again.",
            });
        } finally {
            // ── flag off ──────────────────────────────────────────────────────
            setIsResponseGenerating(false);
            // ─────────────────────────────────────────────────────────────────
        }
    }

    function buildHistory(convoId: string, newUserMessage: string) {
        const convo = conversations.find(c => c.id === convoId);
        return [
            ...(convo?.messages ?? [])
                .filter(m => m.type === "text")
                .map(m => ({ role: m.role, content: m.content as string })),
            { role: "user", content: newUserMessage },
        ];
    }

    async function askClaude(history: { role: string; content: string }[]) {
        return;
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: history }),
        });
        return await res.json();
    }

    return (
        <ConversationContext.Provider value={{
            conversations,
            activeConvoId,
            noChatsYet,
            message,
            setMessage,
            sendUserMessage,

            editMessageId,
            startEditingMessage,
            saveEditedMessage,

            setFeedback,

            // ── new ───────────────────────────────────────────────────────────
            isResponseGenerating,
            stopResponse,
            // ─────────────────────────────────────────────────────────────────

            switchConversation,
            startNewConversation,
        }}>
            {children}
        </ConversationContext.Provider>
    );
}

export function useConversation() {
    const ctx = useContext(ConversationContext);
    if (!ctx) throw new Error("useConversation must be used inside ConversationProvider");
    return ctx;
}