'use client'

import { classifyUserInput } from "@/utils/intentClassifier";
import { ReactNode, createContext, useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
    message: string;
    setMessage: (msg: string) => void;
    sendUserMessage: (msg?: string, existingConvoId?: string) => Promise<void>;
    switchConversation: (id: string) => void;
    startNewConversation: () => void;

    editMessageId: string | null;
    startEditingMessage: (messageId: string, content: string) => void;
    saveEditedMessage: (convoId: string) => Promise<void>;

    setFeedback: (messageId: string, convoId: string, feedback: "like" | "dislike") => void;

    isResponseGenerating: boolean;
    stopResponse: () => void;

    isConversationOver: (convoId: string) => boolean;
    activeConvoId: string | null;
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

    const CHARACTER_LIMIT = 200;
    const router = useRouter();

    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [message, setMessage] = useState("");
    const [editMessageId, setEditMessageId] = useState<string | null>(null);
    const [isResponseGenerating, setIsResponseGenerating] = useState(false);
    const [activeConvoId, setActiveConvoId] = useState<string | null>(null);
    const stopRequestedRef = useRef(false);

    function isConversationOver(convoId: string): boolean {
        const convo = conversations.find(c => c.id === convoId);
        if (!convo) return false;
        const length = convo.messages.reduce((total, msg) => {
            if (typeof msg.content === "string") return total + msg.content.length;
            return total;
        }, 0);
        return length >= CHARACTER_LIMIT;
    }

    function stopResponse() {
        stopRequestedRef.current = true;
    }

    function setFeedback(messageId: string, convoId: string, feedback: "like" | "dislike") {
        setConversations(prev =>
            prev.map(convo => {
                if (convo.id !== convoId) return convo;
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

    async function saveEditedMessage(convoId: string) {
        if (!editMessageId) return;

        const convo = conversations.find(c => c.id === convoId);
        if (!convo) return;

        const editedIndex = convo.messages.findIndex(m => m.id === editMessageId);
        if (editedIndex === -1) return;

        const updatedMessages = convo.messages.slice(0, editedIndex + 1);
        updatedMessages[editedIndex] = { ...updatedMessages[editedIndex], content: message };

        setConversations(prev =>
            prev.map(c => c.id === convoId ? { ...c, messages: updatedMessages } : c)
        );

        const editedContent = message;
        setMessage("");
        setEditMessageId(null);

        const loadingId = crypto.randomUUID();

        setConversations(prev =>
            prev.map(c => {
                if (c.id !== convoId) return c;
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

        stopRequestedRef.current = false;
        setIsResponseGenerating(true);

        if (result.intent !== "unknown" && !result.hasSubIntent) {
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (stopRequestedRef.current) {
                replaceLoading(convoId, loadingId, {
                    id: crypto.randomUUID(), role: "assistant", type: "text", content: "Response interrupted.",
                });
                setIsResponseGenerating(false);
                return;
            }

            replaceLoading(convoId, loadingId, {
                id: crypto.randomUUID(),
                role: "assistant",
                type: result.intent as "projects" | "skills" | "education",
                content: getComponentForIntent(result.intent),
            });
            setIsResponseGenerating(false);
            return;
        }

        try {
            const history = buildHistory(convoId, editedContent);
            const [data] = await Promise.all([
                askClaude(history),
                new Promise(resolve => setTimeout(resolve, 2000)),
            ]);

            if (stopRequestedRef.current) {
                replaceLoading(convoId, loadingId, {
                    id: crypto.randomUUID(), role: "assistant", type: "text", content: "Response interrupted.",
                });
                setIsResponseGenerating(false);
                return;
            }

            replaceLoading(convoId, loadingId, {
                id: crypto.randomUUID(), role: "assistant", type: "text",
                content: data?.response ?? "Sorry, I couldn't find an answer.",
            });
        } catch {
            replaceLoading(convoId, loadingId, {
                id: crypto.randomUUID(), role: "assistant", type: "text", content: "Sorry, something went wrong.",
            });
        } finally {
            setIsResponseGenerating(false);
        }
    }

    function switchConversation(id: string) {
        setActiveConvoId(id);
        router.push(`/chat/${id}`);
    }

    function startNewConversation() {
        const newConvo = createConversation("New chat");

        setConversations(prev => [...prev, newConvo]);
        setActiveConvoId(newConvo.id);

        router.push(`/chat/${newConvo.id}`);
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

    async function sendUserMessage(msg?: string, existingConvoId?: string) {
        const content = msg ?? message;
        if (!content.trim()) return;
        if (isResponseGenerating) return;

        let convoId: string;

        if (existingConvoId) {
            const result = classifyUserInput(content);

            if (result.intent !== "unknown" && !result.hasSubIntent) {
                const currentConvo = conversations.find(c => c.id === existingConvoId);
                const existingMsg = currentConvo?.messages.find(m => m.type === result.intent);

                if (existingMsg) {
                    document.getElementById(`message-${existingMsg.id}`)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                    setMessage("");
                    return;
                }
            }

            convoId = existingConvoId;
            addMessages(convoId, [
                { id: crypto.randomUUID(), role: "user", type: "text", content },
            ]);
        } else {
            const newConvo = createConversation(content);
            convoId = newConvo.id;
            setActiveConvoId(convoId);
            setConversations(prev => [...prev, newConvo]);
            router.push(`/chat/${convoId}`);
            await new Promise(r => setTimeout(r, 0));
            addMessages(convoId, [
                { id: crypto.randomUUID(), role: "user", type: "text", content },
            ]);
        }

        // Check if same intent component already exists in this conversation
        const result = classifyUserInput(content);

        if (result.intent !== "unknown" && !result.hasSubIntent) {
            const currentConvo = conversations.find(c => c.id === convoId);
            const existingMsg = currentConvo?.messages.find(m => m.type === result.intent);

            if (existingMsg) {
                document.getElementById(`message-${existingMsg.id}`)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
                setMessage("");
                return;
            }
        }

        const loadingId = crypto.randomUUID();

        setConversations(prev =>
            prev.map(c =>
                c.id === convoId
                    ? {
                        ...c,
                        messages: [
                            ...c.messages,
                            { id: loadingId, role: "assistant", type: "loading", content: "Thinking..." },
                        ]
                    }
                    : c
            )
        );

        setMessage("");
        stopRequestedRef.current = false;
        setIsResponseGenerating(true);

        if (result.intent !== "unknown" && !result.hasSubIntent) {
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (stopRequestedRef.current) {
                replaceLoading(convoId, loadingId, {
                    id: crypto.randomUUID(), role: "assistant", type: "text", content: "Response interrupted.",
                });
                setIsResponseGenerating(false);
                return;
            }

            replaceLoading(convoId, loadingId, {
                id: crypto.randomUUID(),
                role: "assistant",
                type: result.intent as "projects" | "skills" | "education",
                content: getComponentForIntent(result.intent),
            });
            setIsResponseGenerating(false);
            return;
        }

        try {
            const history = existingConvoId
                ? buildHistory(existingConvoId, content)
                : [{ role: "user", content }];

            const [data] = await Promise.all([
                askClaude(history),
                new Promise(resolve => setTimeout(resolve, 2000)),
            ]);

            if (stopRequestedRef.current) {
                replaceLoading(convoId, loadingId, {
                    id: crypto.randomUUID(), role: "assistant", type: "text", content: "Response interrupted.",
                });
                setIsResponseGenerating(false);
                return;
            }

            replaceLoading(convoId, loadingId, {
                id: crypto.randomUUID(), role: "assistant", type: "text",
                content: data?.response ?? "Sorry, I couldn't find an answer.",
            });
        } catch (error) {
            console.error(error);
            replaceLoading(convoId, loadingId, {
                id: crypto.randomUUID(), role: "assistant", type: "text",
                content: "Sorry, something went wrong. Please try again.",
            });
        } finally {
            setIsResponseGenerating(false);
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
        // return;
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
            message,
            setMessage,
            sendUserMessage,
            editMessageId,
            startEditingMessage,
            saveEditedMessage,
            setFeedback,
            isResponseGenerating,
            stopResponse,
            switchConversation,
            startNewConversation,
            isConversationOver,
            activeConvoId,
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