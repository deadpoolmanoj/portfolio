import React from 'react'
import { Message } from '../page';
import ChatProjects from './ChatProjects';
import ChatSkills from './ChatSkills';
import ChatEducation from './ChatEducation';

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
hello manoj
                </div>
            ) : (
                <span
                    className="
                        inline-block
                        max-w-[85%]
                        rounded-3xl
                        rounded-br-sm
                        border
                        border-zinc-200
                        px-5
                        py-3
                        text-[15px]
                        text-zinc-900
                        bg-zinc-400/10
                    ">
                    {message.content}
                </span>
            )}
        </>
    )
}

export default Chats