'use client'

import { PanelLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import SidebarContent from './SideBarContent';
import { getUserEnvironment, UserEnvironment } from "@/utils/userMetaData";
import { Sun, Cloud, CloudRain, CloudSnow } from "lucide-react";
import ThemeToggle from './ThemeToggole';

export const fallbackWeather: UserEnvironment = {
    city: "India",
    temperature: 0,
    weather: "Cloudy",
    time: '0',
};

function getWeatherIcon(condition?: string) {
    switch (condition) {
        case "Clear": return <Sun size={14} className="text-yellow-500" />;
        case "Cloudy": return <Cloud size={14} style={{ color: "var(--color-text-muted)" }} />;
        case "Rainy": return <CloudRain size={14} className="text-blue-500" />;
        case "Snow": return <CloudSnow size={14} className="text-sky-400" />;
        default: return <Cloud size={14} style={{ color: "var(--color-text-muted)" }} />;
    }
}

const TopNavBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [weather, setWeather] = useState<UserEnvironment | null>(null);
    // const { sendUserMessage } = useConversation();

    useEffect(() => {
        async function loadWeather() {
            try {
                const data = await getUserEnvironment();
                setWeather(data ?? fallbackWeather);
            } catch {
                setWeather(fallbackWeather);
            }
        }
        loadWeather();
    }, []);

    const condition = weather?.weather ?? "Cloudy";

    return (
        <>
            {/* Top bar */}
            <nav
                className='fixed md:hidden top-0 left-0 right-0 z-40
          h-12 px-4 flex items-center justify-between overflow-hidden
          backdrop-blur-xl backdrop-saturate-200'
                style={{
                    backgroundColor: "var(--color-nav-bg)",
                    borderBottom: "1px solid var(--color-border)",
                }}
            >
                <button
                    onClick={() => setDrawerOpen(true)}
                    className='p-1.5 rounded-lg transition-colors'
                    style={{ color: "var(--color-text-secondary)" }}
                >
                    <PanelLeft size={17} />
                </button>

                {/* Center: location + weather */}
                {weather && (
                    <div
                        className='flex items-center gap-1.5 text-[12px]'
                        style={{ color: "var(--color-text-secondary)" }}
                    >
                        <span style={{ color: "var(--color-border)" }}>·</span>
                        <span>{weather.city} {weather.temperature}°</span>
                        {getWeatherIcon(condition)}
                    </div>
                )}

                {/* <div className='w-8' /> */}
                <ThemeToggle forMobile={true} />
            </nav>

            {/* Backdrop */}
            {drawerOpen && (
                <div
                    className='fixed inset-0 z-40 md:hidden'
                    style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
                    onClick={() => setDrawerOpen(false)}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 left-0 z-[999] md:hidden w-72 h-screen
          transition-transform duration-300 ease-in-out
          ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
                style={{ backgroundColor: "var(--color-sidebar-bg)" }}
            >
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