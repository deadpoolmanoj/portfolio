'use client'

import { PanelLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import SidebarContent from './SideBarContent';
import { getUserEnvironment, UserWeather } from "@/utils/userMetaData";

import {
    Sun,
    Cloud,
    CloudRain,
    CloudSnow,
} from "lucide-react";

export const fallbackWeather: UserWeather = {
    city: "India",
    temperature: 0,
    weather: "Cloudy", // safest neutral default
    time: {
        time: "--:--",
        period: "AM",
    },
};


function getWeatherIcon(condition?: string) {
    switch (condition) {
        case "Clear":
            return <Sun size={14} className="text-yellow-500" />;

        case "Cloudy":
            return <Cloud size={14} className="text-gray-500" />;

        case "Rainy":
            return <CloudRain size={14} className="text-blue-500" />;

        case "Snow":
            return <CloudSnow size={14} className="text-sky-400" />;

        default:
            return <Cloud size={14} className="text-gray-400" />;
    }
}

const TopNavBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [weather, setWeather] = useState<UserWeather | null>(fallbackWeather);

    useEffect(() => {
        async function loadWeather() {
            const data = await getUserEnvironment()
            setWeather(data)
        }
        loadWeather();
    }, []);

    const condition = weather?.condition ?? "Cloudy";

    return (
        <>
            {/* Top bar */}
            <nav className='fixed md:hidden top-0 left-0 right-0 z-40
                      flex items-center justify-between
                      h-12 px-4 bg-white '>

                <button
                    onClick={() => setDrawerOpen(true)}
                    className='p-1.5 rounded-lg text-[#585858] hover:bg-[#f8f9fa]'
                >
                    <PanelLeft size={17} />
                </button>

                {/* Center: time + location + weather */}
                <div className='flex items-center gap-1.5 text-[12px] text-[#585858]'>
                    <span className='text-[#ccc]'>·</span>
                    <span>{weather?.city} {weather?.temperature}°</span>

                    {getWeatherIcon(condition)}
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
            <div className={`fixed top-0 left-0 z-[999] md:hidden w-72 h-screen bg-white
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