import React from 'react'
import { Message } from '../page';
import ChatProjects from './ChatProjects';
import ChatSkills from './ChatSkills';
import ChatEducation from './ChatEducation';
import { Copy, Edit, Pen } from 'lucide-react';

const Chats = ({ messages }: { messages: Message[] }) => {

    return (
        <div className='w-full h-full pt-4'>
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`flex ${msg.role === "user"
                        ? "justify-end"
                        : "justify-start"
                        }`}
                >
                    {(() => {
                        switch (msg.type) {
                            case "text":
                                return <TextMsg message={msg} />
                            case "projects":
                                return <ChatProjects />;

                            case "skills":
                                return <ChatSkills />

                            case "education":
                                return <ChatEducation />

                            default:
                                return null;
                        }
                    })()}
                </div>
            ))}
        </div>
    )
}

const TextMsg = ({ message }: { message: Message }) => {
    return (
        <>
            {message.role === 'assistant' ? (
                <div>
                    hello manojlear
                </div>
            ) : (
                <div className='w-full flex items-end flex-col group mt-6'>
                    <span
                        className="
            inline-block
            max-w-[80%]
            rounded-[20px]
            rounded-br-[4px]
            border
            border-zinc-200/70
            px-[18px]
            py-[11px]
            text-sm
            leading-[1.55]
            tracking-[-0.01em]
            text-zinc-900
            bg-zinc-100/60
            font-normal
            select-text
        "
                    >
                        {message.content}
                    </span>

                    <div
                        className="
            mt-1
            flex items-center gap-1

            opacity-0
            pointer-events-none

            transition-opacity
            duration-150
            ease-in-out

            group-hover:opacity-100
            group-hover:pointer-events-auto
        "
                    >
                        <button
                            className="
                flex items-center justify-center
                h-7 w-7
                rounded-full
                text-zinc-500
                hover:bg-zinc-100
                hover:text-zinc-900
                transition-colors
            "
                            aria-label="Copy message"
                        >
                            <Copy size={12} />
                        </button>

                        <button
                            className="
                flex items-center justify-center
                h-7 w-7
                rounded-full
                text-zinc-500
                hover:bg-zinc-100
                hover:text-zinc-900
                transition-colors
            "
                            aria-label="Edit message"
                        >
                            <Pen size={12} />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Chats