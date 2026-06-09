'use client'

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { useConversation } from "@/context/ConversationContext";
import Chats from "@/app/components/Chats";
import InputBar from "@/app/components/InputBar";

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default function ChatPage({ params }: ChatPageProps) {
  const { id } = use(params);
  const { conversations, switchConversation, activeConvoId } = useConversation();
  const [ready, setReady] = useState(false);

  const convo = conversations.find((c) => c.id === id);

  useEffect(() => {
    if (convo && activeConvoId !== id) {
      switchConversation(id);
    }
    // Give context one tick to hydrate before deciding 404
    setReady(true);
  }, [id, convo, activeConvoId, switchConversation]);

  // Still hydrating — render nothing yet
  if (!ready) return null;

  // Context is ready but no matching convo found
  if (!convo) notFound();

  return (
    <div
      className="relative pt-12 md:p-0 w-full h-[100dvh] flex flex-col items-center"
      style={{ backgroundColor: "var(--color-bg-page)" }}
    >
      <div className="w-full flex-1 min-h-0 chat-scroll overflow-y-auto md:px-6 flex flex-col items-center">
        <div className="pb-32 max-w-3xl w-full px-4 md:px-4">
          <Chats messages={convo!.messages} />
        </div>
      </div>

      <InputBar />
    </div>
  );
}

