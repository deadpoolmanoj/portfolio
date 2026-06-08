'use client'

import { classifyUserInput } from "@/utils/intentClassifier";
import { ReactNode, createContext, useContext, useState } from "react";
import ChatProjects from "@/app/components/ChatProjects";
import ChatSkills from "@/app/components/ChatSkills";
import ChatEducation from "@/app/components/ChatEducation";

export type Role = 'user' | 'assistant'

export type Message = {
    id: string;
    role: Role;
    type: "projects" | "skills" | "education" | "text" | "loading";
    content: string | ReactNode;
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

        if (el) {
            el.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }

    async function sendUserMessage(msg?: string) {
        const content = msg ?? message;
        if (!content.trim()) return;

        let convoId = activeConvoId;

        if (!convoId) {
            const newConvo = createConversation(content);
            convoId = newConvo.id;
            setActiveConvoId(convoId);
            setConversations(prev => [...prev, newConvo]);
        }

        const result = classifyUserInput(content);

        // Check if this section already exists in the current conversation
        if (result.intent !== "unknown" && !result.hasSubIntent) {
            const currentConversation = conversations.find(
                c => c.id === convoId
            );

            const existingMessage = currentConversation?.messages.find(
                m => m.type === result.intent
            );

            if (existingMessage) {
                scrollToMessage(existingMessage.id);
                return;
            }
        }

        const loadingId = crypto.randomUUID();
        const capturedConvoId = convoId;

        addMessages(capturedConvoId, [
            {
                id: crypto.randomUUID(),
                role: "user",
                type: "text",
                content,
            },
            {
                id: loadingId,
                role: "assistant",
                type: "loading",
                content: "Thinking...",
            },
        ]);

        setMessage("");
        setNoChatsYet(false);

        if (result.intent !== "unknown" && !result.hasSubIntent) {
            replaceLoading(capturedConvoId, loadingId, {
                id: crypto.randomUUID(),
                role: "assistant",
                type: result.intent as "projects" | "skills" | "education",
                content: getComponentForIntent(result.intent),
            });

            return;
        }

        try {
            const data = await askClaude(
                result.hasSubIntent && result.context
                    ? result.context
                    : content
            );

            replaceLoading(capturedConvoId, loadingId, {
                id: crypto.randomUUID(),
                role: "assistant",
                type: "text",
                content: data.response ?? "Sorry, I couldn't find an answer.",
            });
        } catch (error) {
            console.error(error);

            replaceLoading(capturedConvoId, loadingId, {
                id: crypto.randomUUID(),
                role: "assistant",
                type: "text",
                content: "Sorry, something went wrong. Please try again.",
            });
        }
    }

    async function askClaude(content: string) {
        return 'hi';
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                messages: [{ role: "user", content }],
            }),
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