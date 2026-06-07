'use client'

import { ArrowUp, ChevronRight, Cloud, Plug2 } from "lucide-react";
import Image from "next/image";
import { JSX, ReactNode, useState } from "react";
import Chats from "./components/Chats";
import { SYSTEM_PROMPT } from "@/utils/prompts";
import ChatProjects from "./components/ChatProjects";

export type Message =
  | {
    id: string;
    role: "user" | "assistant";
    type: "text";
    content: string;
  }
  | {
    id: string;
    role: "assistant";
    type: "loading";
    content: string;
  }
  | {
    id: string;
    role: "user" | "assistant";
    type: "projects" | "skills" | "education";
    content: ReactNode;
  };

export default function Home() {
  const [noChatsYet, setNoChatsYet] = useState(true);
  const [message, setMessage] = useState("")

  const [messages, setMessages] = useState<Message[]>([]);

  type Intent = 'projects' | 'skills' | 'education' | 'text';

  function x(message: string): Intent {
    const text = message.toLowerCase();

    if (text.includes('project')) return 'projects';
    if (text.includes('skill')) return 'skills';
    if (text.includes('education')) return 'education';

    return 'text';
  }

  async function sendUserMessage(msg?: string) {
    const content = msg ?? message;

    if (!content.trim()) return;

    const intent = x(content);
    const loadingId = crypto.randomUUID();

    setMessages(prev => [
      ...prev,
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

    setTimeout(() => {
      setMessages(prev =>
        prev.map(message => {
          if (message.id !== loadingId) return message;

          if (intent === "projects") {
            return {
              id: crypto.randomUUID(),
              role: "assistant",
              type: "projects",
              content: <ChatProjects />,
            };
          }

          return {
            id: crypto.randomUUID(),
            role: "assistant",
            type: "text",
            content: "I couldn't find a matching section yet.",
          };
        })
      );
    }, 2000);
  }

  async function askClaude() {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: "user", content: 'monojs projects' }
        ]
      }),
    });

    const data = await res.json();
    console.log(data);
    return data;
  }

  return (
    <div className="p-4 pt-16 md:pt-0 md:p-0  max-w-3xl w-full h-screen flex flex-col">
      <div className="w-full flex-1 overflow-y-auto">
        {noChatsYet && (
          <div className="w-full flex justify-center items-start h-full overflow-y-auto py-6 px-4">
            <div className="flex flex-col text-center items-center w-full max-w-md">

              {/* Plug icon */}
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
              <h1 className='text-[17px] font-semibold text-[#1a1a1a] leading-snug mb-1'>
                What would you like to know about Manoj?
              </h1>
              <p className='text-[12px] text-[#9b9b9b] leading-relaxed mb-6'>
                Type a question below or pick a suggested topic to get started.
              </p>

              {/* Suggestions */}
              <div className='bg-[#f8f9fa] rounded-2xl w-full p-1.5 border border-[#e9ecef]'>
                <span className='text-[11px] text-[#9b9b9b] px-2 pt-1 pb-2 block text-left'>
                  Top Suggestions
                </span>
                <ul className='bg-white rounded-xl border border-[#e9ecef] overflow-hidden'>
                  <li className='w-full flex justify-between items-center px-3 py-2.5 gap-2
                       hover:bg-[#f8f9fa] text-[13px] text-[#1a1a1a] cursor-pointer
                       border-b border-[#f0f0f0]'
                    onClick={() => {
                      // setMessage("Tell me about Manoj's technical background.");
                      sendUserMessage("Tell me about Manoj's technical background.");
                    }}>
                    <span className='flex items-center gap-2.5'>
                      <span>⚡</span> Tell me about Manoj's technical background.
                    </span>
                    <ChevronRight size={13} className='text-[#9b9b9b] shrink-0' />
                  </li>
                  <li className='w-full flex justify-between items-center px-3 py-2.5 gap-2
                       hover:bg-[#f8f9fa] text-[13px] text-[#1a1a1a] cursor-pointer
                       border-b border-[#f0f0f0]'
                    onClick={() => {
                      setMessage("What projects has he built recently?");
                      sendUserMessage("What projects has he built recently?");
                    }}>
                    <span className='flex items-center gap-2.5'>
                      <span>📂</span> What projects has he built recently?
                    </span>
                    <ChevronRight size={13} className='text-[#9b9b9b] shrink-0' />
                  </li>
                  <li className='w-full flex justify-between items-center px-3 py-2.5 gap-2
                       hover:bg-[#f8f9fa] text-[13px] text-[#1a1a1a] cursor-pointer
                       border-b border-[#f0f0f0]'>
                    <span className='flex items-center gap-2.5'
                      onClick={() => {
                        setMessage("Can I see or download a copy of his resume?");
                        sendUserMessage("Can I see or download a copy of his resume?");
                      }}>
                      <span>📄</span> Can I see or download a copy of his resume?
                    </span>
                    <ChevronRight size={13} className='text-[#9b9b9b] shrink-0' />
                  </li>
                  <li className='w-full flex justify-between items-center px-3 py-2.5 gap-2
                       hover:bg-[#f8f9fa] text-[13px] text-[#1a1a1a] cursor-pointer'>
                    <span className='flex items-center gap-2.5'
                      onClick={() => {
                        setMessage("How is his expertise in Data Structures and Algorithms (DSA)?");
                        sendUserMessage("How is his expertise in Data Structures and Algorithms (DSA)?");
                      }}>
                      <span>🧠</span> How is his expertise in Data Structures and Algorithms (DSA)?
                    </span>
                    <ChevronRight size={13} className='text-[#9b9b9b] shrink-0' />
                  </li>
                </ul>
              </div>

            </div>
          </div>
        )}
        {!noChatsYet && (
          <Chats messages={messages} />
        )}
      </div>
      <div className="w-full">
        <div className="rounded-3xl flex flex-col border border-[#e9ecef] bg-white
                  shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-[2px]">

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendUserMessage();
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
              onClick={() => sendUserMessage()}
              disabled={!message.trim()}
              className="bg-[#ffac81] disabled:opacity-40 disabled:cursor-not-allowed
                   p-2 rounded-full text-white transition-all duration-150
                   hover:bg-[#ff9561] active:scale-95"
            >
              <ArrowUp size={16} strokeWidth={2.5} />
            </button>
          </div>

        </div>

        <p className="text-[11px] text-[#9b9b9b] text-center py-1.5 select-none">
          Manoj's AI assistant · responses may not always be accurate
        </p>
      </div>
    </div>
  );
}
