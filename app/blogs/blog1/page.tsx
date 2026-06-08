"use client";

import React from "react";

const BlogPage = () => {
    return (
        <div className="bg-red-500 h-screen w-full flex flex-col">
            <div className="min-h-screen bg-white text-[#1a1a1a] overflow-y-auto">

                {/* Container */}
                <div className="max-w-3xl mx-auto px-4 py-10">

                    {/* Header */}
                    <div className="mb-8">
                        <p className="text-[11px] text-[#9b9b9b] uppercase tracking-widest">
                            Blog · Manoj Naik
                        </p>

                        <h1 className="text-[22px] font-semibold leading-snug mt-2">
                            Building an AI-powered Portfolio like ChatGPT
                        </h1>

                        <p className="text-[12px] text-[#585858] mt-2 leading-relaxed">
                            How I structured intent classification, dynamic UI rendering, and
                            conversational experience in a portfolio system.
                        </p>
                    </div>

                    {/* Hero Image */}
                    <div className="rounded-2xl overflow-hidden border border-[#e9ecef] mb-8">
                        <img
                            src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1600"
                            className="w-full h-56 object-cover"
                            alt="blog"
                        />
                    </div>

                    {/* Content */}
                    <div className="space-y-6 text-[13px] leading-relaxed text-[#2b2b2b]">

                        <p>
                            Building a conversational portfolio is not just about UI — it's about
                            structuring information like a system. Instead of static sections, I
                            used <b>intent classification</b> to dynamically render content.
                        </p>

                        <h2 className="text-[16px] font-medium mt-6">
                            1. Intent-based architecture
                        </h2>

                        <p>
                            Every user message is first processed through a classifier that maps
                            input into structured intents like:
                        </p>

                        <ul className="list-disc pl-5 space-y-1 text-[#585858]">
                            <li>projects</li>
                            <li>skills</li>
                            <li>education</li>
                            <li>blogs</li>
                            <li>askManoj</li>
                        </ul>

                        <h2 className="text-[16px] font-medium mt-6">
                            2. Component-driven response system
                        </h2>

                        <p>
                            Instead of returning plain text, the system returns React components
                            dynamically based on intent.
                        </p>

                        {/* Code block */}
                        <div className="bg-[#0f172a] text-[#e5e7eb] rounded-xl p-4 text-[12px] overflow-x-auto">

                            <pre>{`function getComponentForIntent(intent) {
  switch (intent) {
    case "projects":
      return <ChatProjects />;

    case "skills":
      return <ChatSkills />;

    case "education":
      return <ChatEducation />;

    default:
      return null;
  }
}`}</pre>

                        </div>

                        <h2 className="text-[16px] font-medium mt-6">
                            3. Why this approach works
                        </h2>

                        <p>
                            This architecture allows the portfolio to behave like a product —
                            not a static resume. It becomes interactive, extensible, and feels
                            alive.
                        </p>

                        <blockquote className="border-l-2 border-[#e9ecef] pl-3 text-[#585858] italic">
                            “A portfolio should not just describe you — it should respond like you.”
                        </blockquote>

                        <h2 className="text-[16px] font-medium mt-6">
                            4. Future improvements
                        </h2>

                        <ul className="list-disc pl-5 space-y-1 text-[#585858]">
                            <li>MDX-based blog system</li>
                            <li>AI summarization per section</li>
                            <li>Interactive code explanation</li>
                            <li>Tag-based filtering system</li>
                        </ul>

                        <p>
                            This system is still evolving — the goal is to make a portfolio that
                            behaves like a living product rather than a static website.
                        </p>

                    </div>

                    {/* Footer */}
                    <div className="mt-12 pt-6 border-t border-[#e9ecef] text-[11px] text-[#9b9b9b]">
                        Written by Manoj Naik · Built with Next.js + AI intent system
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BlogPage;