'use client'

import { ArrowUp, ChevronRight, Cloud } from "lucide-react";
import Chats from "./components/Chats";
import { useConversation } from "@/context/ConversationContext";
import { useEffect, useState } from "react";
import { getUserEnvironment, UserEnvironment } from "@/utils/userMetaData";
import { fallbackWeather } from "./components/TopNavBar";
import InputBar from "./components/InputBar";
import HomeIntro from "./components/IntroComponent";

export default function Home() {

  const [weather, setWeather] = useState<UserEnvironment | null>(fallbackWeather);

  useEffect(() => {
    async function loadWeather() {
      const data = await getUserEnvironment();
      setWeather(data);
    }
    loadWeather();
  }, []);

  const {
    conversations,
    activeConvoId,
    noChatsYet,
    message,
    setMessage,
    sendUserMessage,
    editMessageId,
    saveEditedMessage,
    isResponseGenerating,
    stopResponse
  } = useConversation();

  return (
    <div
      className="relative pt-12 md:p-0 w-full h-[100dvh] flex flex-col items-center"
      style={{ backgroundColor: "var(--color-bg-page)" }}
    >
      <div className="w-full flex-1 min-h-0 chat-scroll overflow-y-auto md:px-6 flex flex-col items-center">

        {/* ── Welcome screen ── */}
        {noChatsYet && (
         <HomeIntro sendUserMessage={sendUserMessage}  weather={weather}/>
        )}

        {/* ── Chat area ── */}
        {!noChatsYet && (
          <div className="pb-32 max-w-3xl w-full px-4 md:px-4 ">
            <Chats messages={conversations.find(c => c.id === activeConvoId)?.messages ?? []} />
          </div>
        )}
      </div>

      {/* ── Input bar ── */}
      <InputBar/>
    </div>
  );
}