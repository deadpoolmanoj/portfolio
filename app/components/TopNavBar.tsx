'use client'

import { PanelLeft } from 'lucide-react';
import { useState } from 'react';
import SidebarContent from './SideBarContent';

const TopNavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <nav className='fixed md:hidden top-0 left-0 right-0 z-40
                      flex items-center justify-between
                      h-12 px-4 bg-white'>

        <button
          onClick={() => setDrawerOpen(true)}
          className='p-1.5 rounded-lg text-[#585858] hover:bg-[#f8f9fa]'
        >
          <PanelLeft size={17} />
        </button>

        {/* Center: time + location + weather */}
        <div className='flex items-center gap-1.5 text-[12px] text-[#585858]'>
          <span className='font-medium text-[#1a1a1a]'>
            2:36<sup className='text-[9px] font-normal'>PM</sup>
          </span>
          <span className='text-[#ccc]'>·</span>
          <span>Bengaluru 28°</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="#9b9b9b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
          </svg>
        </div>

        <div className='w-8' />
      </nav>

      {/* Backdrop */}
      {drawerOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/10 md:hidden'
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 left-0 z-50 md:hidden w-72 h-screen bg-white
                      transition-transform duration-300 ease-in-out
                      ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent
          sidebarOpen={true}
          isMobile={true}
          onClose={() => setDrawerOpen(false)}
        />
      </div>
    </>
  );
};

export default TopNavBar;