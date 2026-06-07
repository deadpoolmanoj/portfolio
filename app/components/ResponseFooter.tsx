import { RotateCw, ThumbsDown, ThumbsUp } from 'lucide-react';
import React from 'react'

const ResponseFooter = () => {
    return (
        <div className='flex gap-3 mt-3 pt-3 border-t border-[#e9ecef]'>
            <button className='p-1.5 rounded-full hover:bg-[#f8f9fa] text-[#9b9b9b]
                                   transition-colors'>
                <RotateCw size={14} />
            </button>
            <button className='p-1.5 rounded-full hover:bg-[#f8f9fa] text-[#9b9b9b]
                                   transition-colors'>
                <ThumbsUp size={14} />
            </button>
            <button className='p-1.5 rounded-full hover:bg-[#f8f9fa] text-[#9b9b9b]
                                   transition-colors'>
                <ThumbsDown size={14} />
            </button>
        </div>
    )
}

export default ResponseFooter