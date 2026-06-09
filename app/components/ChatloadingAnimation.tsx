'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const messages = [
  'Thinking...',
  'Fetching projects...',
  'Looking through experience...',
  'Reviewing technical background...',
  'Gathering relevant information...',
];

const ChatLoadingAnimation = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % messages.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 py-2">
      <div
        className="flex items-center justify-center w-8 h-8 rounded-full"
        style={{
          backgroundColor: "var(--color-bg-accent)",
          border: "1px solid var(--color-border-accent)",
        }}
      >
        <Loader2
          size={16}
          className="animate-spin"
          strokeWidth={2.5}
          style={{ color: "var(--color-accent)" }}
        />
      </div>

      <div className="flex flex-col">
        <span
          className="text-[13px] font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          {messages[index]}
        </span>
        <span
          className="text-[11px]"
          style={{ color: "var(--color-text-muted)" }}
        >
          Please wait a moment
        </span>
      </div>
    </div>
  );
};

export default ChatLoadingAnimation;