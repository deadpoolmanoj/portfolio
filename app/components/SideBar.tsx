'use client'

import { useState } from 'react';
import SidebarContent from './SideBarContent';
import { usePathname } from "next/navigation";

const SideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pathname = usePathname();

  const isBlogPage = pathname.startsWith("/blogs");

  if(isBlogPage) return

  return (
    <div
      className={`${sidebarOpen ? "w-64" : "w-[60px]"} hidden md:flex flex-col h-screen transition-all duration-200 ease-in-out overflow-hidden`}
      style={{
        backgroundColor: "var(--color-sidebar-bg)",
        borderRight: "1px solid var(--color-sidebar-border)",
      }}
    >
      <SidebarContent
        sidebarOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
    </div>
  );
};

export default SideBar;