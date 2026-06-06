import React from 'react'

const Badge = ({ text }: { text: string }) => {
    return (
        <span className='px-2.5 py-0.5 border border-[#e9ecef] rounded-full
                         text-[10px] font-medium text-[#585858] bg-[#f8f9fa]
                         tracking-wide whitespace-nowrap'>
            {text}
        </span>
    )
}

export default Badge