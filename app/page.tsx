'use client'

import { ArrowUp, ChevronRight, Cloud } from "lucide-react";
import Chats from "./components/Chats";
import { useConversation } from "@/context/ConversationContext";

export default function Home() {
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
    <div className="relative pt-16 md:pt-0 md:p-0  w-full h-[100dvh] flex flex-col items-center">
      <div className="w-full flex-1 chat-scroll overflow-y-auto md:px-6 flex flex-col items-center">
        {noChatsYet && (
          <div className="w-full flex justify-center items-center h-full px-4 pb-20">
            <div className="flex flex-col items-center w-full max-w-sm">

              {/* Cloud icon */}
              <div className='p-3 rounded-2xl bg-[#fff0eb] border border-[#ffe0d0] mb-3'>
                <Cloud size={22} className='text-[#ffac81]' />
              </div>

              {/* Time + location */}
              <div className='flex items-center gap-1.5 mb-4'>
                <span className='text-[12px] font-medium text-[#1a1a1a]'>
                  6:21<sup className='text-[9px] font-normal'>PM</sup>
                </span>
                <span className='text-[#ccc]'>·</span>
                <span className='text-[12px] text-[#585858]'>Bengaluru 24°</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="#9b9b9b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
                </svg>
              </div>

              {/* Heading */}
              <h1 className='text-[16px] font-semibold text-[#1a1a1a] leading-snug mb-1 text-center'>
                What would you like to know about Manoj?
              </h1>
              <p className='text-[12px] text-[#9b9b9b] leading-relaxed mb-8 text-center'>
                Ask me anything — his work, skills, or background.
              </p>

              {/* Suggestions */}
              <div className='w-full flex flex-col gap-1.5'>
                <span className='text-[10px] font-medium uppercase tracking-widest text-[#9b9b9b] mb-1'>
                  Suggested
                </span>

                <button
                  onClick={() => sendUserMessage("Tell me about Manoj's technical background.")}
                  className='w-full flex items-center justify-between px-4 py-3 rounded-xl
                   bg-white border border-[#efefef] hover:border-[#e0e0e0]
                   hover:shadow-[0_1px_4px_rgba(0,0,0,0.06)]
                   text-[12px] text-[#1a1a1a] text-left transition-all group'
                >
                  <span className='flex items-center gap-3'>
                    <span className='text-[15px]'>⚡</span>
                    Tell me about Manoj's technical background.
                  </span>
                  <ChevronRight size={13} className='text-[#ccc] group-hover:text-[#9b9b9b] shrink-0 transition-colors' />
                </button>

                <button
                  onClick={() => sendUserMessage("What projects has he built recently?")}
                  className='w-full flex items-center justify-between px-4 py-3 rounded-xl
                   bg-white border border-[#efefef] hover:border-[#e0e0e0]
                   hover:shadow-[0_1px_4px_rgba(0,0,0,0.06)]
                   text-[12px] text-[#1a1a1a] text-left transition-all group'
                >
                  <span className='flex items-center gap-3'>
                    <span className='text-[15px]'>📂</span>
                    What projects has he built recently?
                  </span>
                  <ChevronRight size={13} className='text-[#ccc] group-hover:text-[#9b9b9b] shrink-0 transition-colors' />
                </button>

                <button
                  onClick={() => sendUserMessage("Can I see or download a copy of his resume?")}
                  className='w-full flex items-center justify-between px-4 py-3 rounded-xl
                   bg-white border border-[#efefef] hover:border-[#e0e0e0]
                   hover:shadow-[0_1px_4px_rgba(0,0,0,0.06)]
                   text-[12px] text-[#1a1a1a] text-left transition-all group'
                >
                  <span className='flex items-center gap-3'>
                    <span className='text-[15px]'>📄</span>
                    Can I see or download a copy of his resume?
                  </span>
                  <ChevronRight size={13} className='text-[#ccc] group-hover:text-[#9b9b9b] shrink-0 transition-colors' />
                </button>

                <button
                  onClick={() => sendUserMessage("How is his expertise in Data Structures and Algorithms (DSA)?")}
                  className='w-full flex items-center justify-between px-4 py-3 rounded-xl
                   bg-white border border-[#efefef] hover:border-[#e0e0e0]
                   hover:shadow-[0_1px_4px_rgba(0,0,0,0.06)]
                   text-[12px] text-[#1a1a1a] text-left transition-all group'
                >
                  <span className='flex items-center gap-3'>
                    <span className='text-[15px]'>🧠</span>
                    How is his expertise in DSA?
                  </span>
                  <ChevronRight size={13} className='text-[#ccc] group-hover:text-[#9b9b9b] shrink-0 transition-colors' />
                </button>

              </div>
            </div>
          </div>
        )}

        {!noChatsYet && (
          <div className="pb-32 max-w-3xl w-full px-4 md:px-4 ">
            <Chats messages={conversations.find(c => c.id === activeConvoId)?.messages ?? []} />
          </div>
        )}
      </div>

      <div className="absolute bottom-0  max-w-3xl w-full px-2 md:px-0 gap-00 ">
        <div className="bg-white border-b-white">
          <div className="rounded-3xl flex flex-col border border-[#e9ecef] bg-white
                  shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-[2px]">
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
                 text-[13px] text-[#1a1a1a] placeholder:text-[#9b9b9b]
                 outline-none ring-0 border-0 focus:border-0
                 resize-none focus:outline-none focus:ring-0
                 min-h-[44px] max-h-[120px] leading-relaxed"
            />
            <div className="w-full flex justify-between items-center px-3 pb-2 pt-1">
              <span className="text-[11px] text-[#9b9b9b] select-none">
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
                className="bg-[#ffac81] disabled:opacity-40 disabled:cursor-not-allowed
                   p-2 rounded-full text-white transition-all duration-150
                   hover:bg-[#ff9561] active:scale-95"
              >
                <ArrowUp size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
        <p className="text-[11px] bg-white text-[#9b9b9b] text-center py-1.5 select-none">
          Manoj's AI assistant · responses may not always be accurate
        </p>
      </div>
    </div>
  );
}