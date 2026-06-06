import { Plus } from 'lucide-react';
import React from 'react'
import Badge from './Badge';

const SkillCard = () => {
    return (
        <div className='border border-[#e9ecef] rounded-2xl p-3.5
                        hover:border-[#ccc] transition-colors duration-150'>

            {/* Top row — icon + level */}
            <div className='flex justify-between items-start mb-3'>
                <div className='p-1.5 bg-[#fff0eb] rounded-xl'>
                    <Plus size={14} className='text-[#ffac81]' />
                </div>
                <span className='text-[10px] font-medium text-[#3B6D11]
                                 bg-[#f0f7e6] px-2 py-0.5 rounded-full'>
                    Strong
                </span>
            </div>

            {/* Title */}
            <h3 className='text-[13px] font-medium text-[#1a1a1a] mb-1'>
                Databases
            </h3>

            {/* Description — desktop only */}
            <p className='hidden md:block text-[11px] text-[#585858]
                          leading-relaxed mb-2.5'>
                Designing schemas, writing complex queries, data at scale.
            </p>

            {/* Progress bar */}
            {/* <div className='w-full h-1 bg-[#e9ecef] rounded-full mb-3'>
                <div className='h-1 bg-[#3B6D11] rounded-full' style={{ width: '85%' }} />
            </div> */}

            {/* Badges */}
            <div className='flex flex-wrap gap-1.5'>
                <Badge text='MongoDB' />
                <Badge text='MySQL' />
            </div>
        </div>
    )
}

export default SkillCard