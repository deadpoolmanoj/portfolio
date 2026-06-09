import { X } from "lucide-react";

type LimitBannerProps = {
    onDismiss: () => void;
    onNewConversation: () => void;
};

export default function LimitBanner({
    onDismiss,
    onNewConversation,
}: LimitBannerProps) {
    return (
        <div
            className="relative rounded-3xl p-4"
            style={{
                backgroundColor: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
            }}
        >
            <button
                onClick={onDismiss}
                className="absolute top-3 right-3 p-1 rounded-md"
            >
                <X size={14} />
            </button>

            <div className="flex items-start gap-3">
                <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                        backgroundColor: "var(--color-bg-accent)",
                        border: "1px solid var(--color-border-accent)",
                    }}
                >
                    💬
                </div>

                <div className="flex-1">
                    <p
                        className="text-[13px] font-medium"
                        style={{ color: "var(--color-text-primary)" }}
                    >
                        You've reached this conversation's limit
                    </p>

                    <p
                        className="text-[11px] mt-1"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        Start a new conversation to continue.
                    </p>

                    <button
                        onClick={onNewConversation}
                        className="mt-3 px-3 py-2 rounded-xl text-[12px] font-medium"
                        style={{
                            backgroundColor: "var(--color-accent)",
                            color: "#fff",
                        }}
                    >
                        Start New Conversation
                    </button>
                </div>
            </div>
        </div>
    );
}