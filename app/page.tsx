'use client'

import { useEffect, useState } from "react";
import { getUserEnvironment, UserEnvironment } from "@/utils/userMetaData";
import { fallbackWeather } from "./components/TopNavBar";
import HomeIntro from "./components/IntroComponent";
import { useConversation } from "@/context/ConversationContext";

export default function Home() {
  const [weather, setWeather] = useState<UserEnvironment | null>(fallbackWeather);
  // const { sendUserMessage } = useConversation();

  useEffect(() => {
    async function loadWeather() {
      const data = await getUserEnvironment();
      setWeather(data);
    }
    loadWeather();
  }, []);

  return (
    <div
      className="relative pt-12 md:p-0 w-full h-[100dvh] flex flex-col items-center"
      style={{ backgroundColor: "var(--color-bg-page)" }}
    >
      <div className="w-full flex-1 min-h-0 chat-scroll overflow-y-auto md:px-6 flex flex-col items-center">
        <HomeIntro weather={weather} />
      </div>
    </div>
  );
}