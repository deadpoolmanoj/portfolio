import { Download, MoveUpRight } from 'lucide-react'

const DownLoadResumeButton = () => {
  return (
    <button
      className='group flex items-center justify-between w-full rounded-xl px-4 py-3 transition-all duration-150'
      style={{
        border: "1px solid var(--color-border)",
        backgroundColor: "var(--color-bg-card)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-bg-subtle)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-text-muted)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-bg-card)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
      }}
    >
      <div className='flex items-center gap-3'>
        <div
          className='flex items-center justify-center w-8 h-8 rounded-lg'
          style={{
            backgroundColor: "var(--color-bg-subtle)",
            border: "1px solid var(--color-border)",
          }}
        >
          <Download size={14} style={{ color: "var(--color-text-secondary)" }} />
        </div>
        <div className='text-left'>
          <p className='text-[12px] font-medium' style={{ color: "var(--color-text-primary)" }}>
            Download Resume
          </p>
          <p className='text-[11px]' style={{ color: "var(--color-text-muted)" }}>
            PDF · Updated recently
          </p>
        </div>
      </div>
      <MoveUpRight
        size={14}
        style={{ color: "var(--color-text-muted)" }}
        className='transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
      />
    </button>
  )
}

export default DownLoadResumeButton