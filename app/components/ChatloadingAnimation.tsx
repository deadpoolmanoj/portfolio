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
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#fff0eb] border border-[#ffe0d0]">
        <Loader2
          size={16}
          className="text-[#ffac81] animate-spin"
          strokeWidth={2.5}
        />
      </div>

      <div className="flex flex-col">
        <span className="text-[13px] font-medium text-[#1a1a1a]">
          {messages[index]}
        </span>

        <span className="text-[11px] text-[#9b9b9b]">
          Please wait a moment
        </span>
      </div>
    </div>
  );
};

export default ChatLoadingAnimation;