'use client'

import Chats from "@/app/components/Chats";
import InputBar from "@/app/components/InputBar";
import { useConversation } from "@/context/ConversationContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ChatPageClient({ convoId }: { convoId: string }) {
  const { conversations } = useConversation();
  const router = useRouter();

  const conversation = conversations.find(c => c.id === convoId);

  // const noConversation = conversation?.messages.length > 0 ? false : true;
  
  useEffect(() => {
    if (!conversation) {
      router.replace("/");
    }
  }, [conversation, router]);

  if (!conversation) return null;

  const messages = conversation.messages;

  return (
    <div
      className="relative pt-12 md:p-0 w-full h-[100dvh] flex flex-col items-center"
      style={{ backgroundColor: "var(--color-bg-page)" }}
    >
      <div className="w-full flex-1 min-h-0 chat-scroll overflow-y-auto md:px-6 flex flex-col items-center">
        <div className="pb-32 max-w-3xl w-full px-4 md:px-4">
          <Chats messages={messages} convoId={convoId} />
        </div>
      </div>

      <InputBar convoId={convoId} />
    </div>
  );
} 