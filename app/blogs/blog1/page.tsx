"use client";

import { ArrowBigLeft, ArrowLeft } from "lucide-react";
import React from "react";
import { useRouter } from 'next/navigation'

const BlogPage = () => {

    const router = useRouter()

    return (
        <>
            <div className="fixed top-4 left-4 z-50">
                <button
                    onClick={() => router.push("/")}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200"
                    style={{
                        backgroundColor: "var(--color-bg-card)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text-primary)",
                        backdropFilter: "blur(8px)",
                    }}
                >
                    <ArrowLeft size={14} />
                    <span className="text-[12px] font-medium">
                        Back to Chat
                    </span>
                </button>
            </div>

            <div className="min-h-screen"
                style={{
                    backgroundColor: "var(--color-bg-primary)",
                }}>
                <div className="min-h-screen overflow-y-auto"
                    style={{
                        backgroundColor: "var(--color-bg-primary)",
                        color: "var(--color-text-primary)",
                    }}>

                    {/* Container */}
                    <div className="max-w-3xl mx-auto px-4 py-10">

                        {/* Header */}
                        <div className="mb-8">
                            <p className="text-[11px] uppercase tracking-widest"
                                style={{ color: "var(--color-text-muted)" }}>
                                Blog · Manoj Naik
                            </p>

                            <h1 className="text-[22px] font-semibold leading-snug mt-2">
                                Building an AI-powered Portfolio like ChatGPT
                            </h1>

                            <p className="text-[12px] mt-2 leading-relaxed"
                                style={{ color: "var(--color-text-secondary)" }}>
                                How I structured intent classification, dynamic UI rendering, and
                                conversational experience in a portfolio system.
                            </p>
                        </div>

                        {/* Hero Image */}
                        <div className="rounded-2xl overflow-hidden mb-8"
                            style={{
                                border: "1px solid var(--color-border)",
                            }}>
                            <img
                                src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1600"
                                className="w-full h-56 object-cover"
                                alt="blog"
                            />
                        </div>

                        {/* Content */}
                        <div className="space-y-6 text-[13px] leading-relaxed"
                            style={{ color: "var(--color-text-secondary)" }}>

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

                            <ul className="list-disc pl-5 space-y-1"
                                style={{ color: "var(--color-text-secondary)" }}>
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
                            <div className="rounded-xl p-4 text-[12px] overflow-x-auto"
                                style={{
                                    backgroundColor: "var(--color-bg-subtle)",
                                    border: "1px solid var(--color-border)",
                                    color: "var(--color-text-primary)",
                                }}>

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

                            <blockquote className="pl-3 italic"
                                style={{
                                    borderLeft: "2px solid var(--color-border)",
                                    color: "var(--color-text-secondary)",
                                }}>
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
                        <div className="mt-12 pt-6 text-[11px]"
                            style={{
                                borderTop: "1px solid var(--color-border)",
                                color: "var(--color-text-muted)",
                            }}>
                            Written by Manoj Naik · Built with Next.js + AI intent system
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogPage;