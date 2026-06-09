'use client'

import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useConversation } from "@/context/ConversationContext";

type Props = {
    messageId: string;
    convoId: string;
    feedback?: "like" | "dislike" | null;
};

const ResponseFooter = ({
    messageId,
    feedback,
    convoId
}: Props) => {
    const { setFeedback } = useConversation();

    return (
        <div className="flex items-center gap-1 mt-3">
            <button
                onClick={() => setFeedback(messageId, convoId, "like")}
                className="
      h-7 w-7
      flex items-center justify-center
      rounded-full
      text-zinc-500
      hover:bg-zinc-100
      hover:text-zinc-900
      transition-colors
    "
            >
                <ThumbsUp
                    size={13}
                    className={
                        feedback === "like"
                            ? "fill-current text-zinc-900"
                            : ""
                    }
                />
            </button>

            <button
                onClick={() => setFeedback(messageId, convoId, "dislike")}
                className="
      h-7 w-7
      flex items-center justify-center
      rounded-full
      text-zinc-500
      hover:bg-zinc-100
      hover:text-zinc-900
      transition-colors
    "
            >
                <ThumbsDown
                    size={13}
                    className={
                        feedback === "dislike"
                            ? "fill-current text-zinc-900"
                            : ""
                    }
                />
            </button>
        </div>
    );
};

export default ResponseFooter;