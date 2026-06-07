import { Download, MoveUpRight } from 'lucide-react'

const DownLoadResumeButton = () => {
  return (
    <button
      className='group flex items-center justify-between w-full
                       border border-[#e9ecef] rounded-xl px-4 py-3
                       hover:bg-[#f8f9fa] hover:border-[#dcdcdc]
                       transition-all duration-150'>
      <div className='flex items-center gap-3'>
        <div
          className='flex items-center justify-center
                               w-8 h-8 rounded-lg
                               bg-[#f8f9fa] border border-[#e9ecef]'>
          <Download size={14} className='text-[#585858]' />
        </div>

        <div className='text-left'>
          <p className='text-[12px] font-medium text-[#1a1a1a]'>
            Download Resume
          </p>
          <p className='text-[11px] text-[#9b9b9b]'>
            PDF · Updated recently
          </p>
        </div>
      </div>

      <MoveUpRight
        size={14}
        className='text-[#9b9b9b]
                           transition-transform duration-150
                           group-hover:translate-x-0.5
                           group-hover:-translate-y-0.5'
      />
    </button>
  )
}

export default DownLoadResumeButton