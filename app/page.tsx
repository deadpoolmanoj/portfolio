'use client'

import { ArrowUp, ChevronRight, Cloud } from "lucide-react";
import Chats from "./components/Chats";
import { useConversation } from "@/context/ConversationContext";
import { useEffect, useState } from "react";
import { getUserEnvironment, UserEnvironment } from "@/utils/userMetaData";
import { fallbackWeather } from "./components/TopNavBar";

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
  } = useConversation();

  return (
    <div
      className="relative pt-10 md:pt-16 md:pt-0 md:p-0 w-full h-[100dvh] flex flex-col items-center"
      style={{ backgroundColor: "var(--color-bg-page)" }}
    >
      <div className="w-full flex-1 chat-scroll overflow-y-auto md:px-6 flex flex-col items-center">

        {/* ── Welcome screen ── */}
        {noChatsYet && (
          <div className="w-full flex justify-center items-center h-full px-4 pb-20">
            <div className="flex flex-col items-center w-full max-w-sm">

              {/* Cloud icon */}
              <div
                className='p-3 rounded-2xl mb-3'
                style={{
                  backgroundColor: "var(--color-bg-accent)",
                  border: "1px solid var(--color-border-accent)",
                }}
              >
                <Cloud size={22} style={{ color: "var(--color-accent)" }} />
              </div>

              {/* Time + location */}
              <div className='flex items-center gap-1.5 mb-4'>
                <span style={{ color: "var(--color-border)" }}>·</span>
                <span className='text-[12px]' style={{ color: "var(--color-text-secondary)" }}>
                  {weather?.city} {weather?.temperature}°
                </span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
                </svg>
              </div>

              {/* Heading */}
              <h1
                className='text-[16px] font-semibold leading-snug mb-1 text-center'
                style={{ color: "var(--color-text-primary)" }}
              >
                What would you like to know about Manoj?
              </h1>
              <p
                className='text-[12px] leading-relaxed mb-8 text-center'
                style={{ color: "var(--color-text-muted)" }}
              >
                Ask me anything — his work, skills, or background.
              </p>

              {/* Suggestions */}
              <div className='w-full flex flex-col gap-1.5'>
                <span
                  className='text-[10px] font-medium uppercase tracking-widest mb-1'
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Suggested
                </span>

                {[
                  { emoji: "⚡", text: "Tell me about Manoj's technical background." },
                  { emoji: "📂", text: "What projects has he built recently?" },
                  { emoji: "📄", text: "Can I see or download a copy of his resume?" },
                  { emoji: "🧠", text: "How is his expertise in DSA?" },
                ].map((item) => (
                  <button
                    key={item.text}
                    onClick={() => sendUserMessage(item.text)}
                    className='w-full flex items-center justify-between px-4 py-3 rounded-xl text-[12px] text-left transition-all group'
                    style={{
                      backgroundColor: "var(--color-bg-card)",
                      border: "1px solid var(--color-border-light)",
                      color: "var(--color-text-primary)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-light)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <span className='flex items-center gap-3'>
                      <span className='text-[15px]'>{item.emoji}</span>
                      {item.text}
                    </span>
                    <ChevronRight size={13} className='shrink-0' style={{ color: "var(--color-border)" }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Chat area ── */}
        {!noChatsYet && (
          <div className="pb-32 max-w-3xl w-full px-4 md:px-4">
            <Chats messages={conversations.find(c => c.id === activeConvoId)?.messages ?? []} />
          </div>
        )}
      </div>

      {/* ── Input bar ── */}
      <div
        className="absolute bottom-0 max-w-3xl w-full px-2 md:px-2 gap-0 z-30"
        style={{ backgroundColor: "var(--color-bg-page)" }}
      >
        <div
          className="rounded-3xl flex flex-col p-[2px]"
          style={{
            border: "1px solid var(--color-border)",
            backgroundColor: "var(--color-bg-input)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (editMessageId) {
                  saveEditedMessage();
                } else {
                  sendUserMessage();
                }
              }
            }}
            placeholder="Ask anything about Manoj..."
            rows={1}
            className="rounded-t-3xl px-5 pt-4 pb-2 bg-transparent
               outline-none ring-0 border-0 focus:border-0
               resize-none focus:outline-none focus:ring-0
               min-h-[44px] max-h-[120px] leading-relaxed text-[13px]"
            style={{
              color: "var(--color-text-primary)",
            }}
          />
          <div className="w-full flex justify-between items-center px-3 pb-2 pt-1">
            <span className="text-[11px] select-none" style={{ color: "var(--color-text-muted)" }}>
              ↵ enter to send · shift+enter for new line
            </span>
            <button
              onClick={() => {
                if (editMessageId) {
                  saveEditedMessage();
                } else {
                  sendUserMessage();
                }
              }}
              disabled={!message.trim()}
              className="p-2 rounded-full text-white transition-all duration-150 active:scale-95"
              style={{ backgroundColor: "var(--color-accent)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-accent-hover)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-accent)"}
            >
              <ArrowUp size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
        <p
          className="text-[11px] text-center py-1.5 select-none"
          style={{
            color: "var(--color-text-muted)",
            backgroundColor: "var(--color-bg-page)",
          }}
        >
          Manoj's AI assistant · responses may not always be accurate
        </p>
      </div>
    </div>
  );
}