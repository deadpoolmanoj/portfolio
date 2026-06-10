"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { getBlogById } from "@/utils/blogs";
import { Lora, Inter } from "next/font/google";

import { useRouter } from "next/navigation";


const lora = Lora({
    subsets: ["latin"],
    weight: ["400", "600"],
    variable: "--font-lora",
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-inter",
});

interface BlogPageProps {
    params: Promise<{ blogId: string }>;
}


export default function BlogPage({ params }: BlogPageProps) {
    const { blogId } = use(params);
    const blog = getBlogById(blogId);

    const router = useRouter();

    if (!blog) notFound();

    return (
        <div
            className={`${lora.variable} ${inter.variable} min-h-screen pt-2`}
            style={{ backgroundColor: "var(--color-bg-primary)" }}
        >
            {/* Header image / gradient hero */}
            {/* Header image / gradient hero */}
            <div className="w-full h-56 md:h-72 flex flex-col items-center justify-center relative overflow-hidden">

                {/* Image or gradient fallback */}
                {blog.headerImage ? (
                    <img
                        src={blog.headerImage}
                        alt={blog.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <div
                        className="absolute inset-0"
                        style={{ background: blog.headerGradient }}
                    />
                )}

                {/* Dark overlay so tags/emoji are readable */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Noise texture */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* Emoji */}
                {/* <div className="text-5xl md:text-6xl mb-4 z-10 select-none">
                    {blog.headerEmoji}
                </div> */}

                {/* Tags */}
                <div className="flex items-center gap-2 z-10 flex-wrap justify-center px-4">
                    {blog.tags.map((tag) => (
                        <span
                            key={tag}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-medium"
                            style={{
                                backgroundColor: "rgba(255,255,255,0.12)",
                                color: "rgba(255,255,255,0.75)",
                                border: "1px solid rgba(255,255,255,0.15)",
                            }}
                        >
                            <Tag size={9} />
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="max-w-2xl mx-auto px-5 py-10">

                {/* Back link */}
                {/* <button
                    onClick={() => router.back()}
                    className="inline-flex items-center gap-1.5 text-[12px] mb-8 transition-opacity hover:opacity-70"
                    style={{ color: "var(--color-text-muted)" }}
                >
                    <ArrowLeft size={13} />
                    Back
                </button> */}

                {/* Meta row */}
                <div className="flex items-center gap-3 mb-5">
                    <span
                        className="flex items-center gap-1.5 text-[11.5px]"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        <Calendar size={12} />
                        {blog.date}
                    </span>
                    <span style={{ color: "var(--color-border)" }}>·</span>
                    <span
                        className="flex items-center gap-1.5 text-[11.5px]"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        <Clock size={12} />
                        {blog.readTime}
                    </span>
                </div>

                {/* Title */}
                <h1
                    className="text-[22px] md:text-[26px] font-semibold leading-snug mb-3"
                    style={{ color: "var(--color-text-primary)" }}
                >
                    {blog.title}
                </h1>

                {/* Subtitle */}
                <p
                    className="text-[14px] leading-relaxed mb-10"
                    style={{ color: "var(--color-text-secondary)" }}
                >
                    {blog.subtitle}
                </p>

                {/* Divider */}
                <div
                    className="w-full h-px mb-10"
                    style={{ backgroundColor: "var(--color-border-light)" }}
                />

                {/* Sections */}
                <div className="flex flex-col gap-8">
                    {blog.sections.map((section, i) => (
                        <div key={i}>
                            {section.heading && (
                                <h2
                                    className="text-[15px] font-semibold mb-3"
                                    style={{ color: "var(--color-text-primary)" }}
                                >
                                    {section.heading}
                                </h2>
                            )}
                            {section.body.split("\n\n").map((para, j) => (
                                <p
                                    key={j}
                                    className="text-[13.5px] leading-[1.85] mb-4"
                                    style={{ color: "var(--color-text-secondary)" }}
                                >
                                    {para.trim()}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Footer divider */}
                <div
                    className="w-full h-px mt-12 mb-8"
                    style={{ backgroundColor: "var(--color-border-light)" }}
                />

                {/* Back to blogs */}
                {/* <button
                    onClick={() => router.back()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] transition-all"
                    style={{
                        backgroundColor: "var(--color-bg-card)",
                        border: "1px solid var(--color-border-light)",
                        color: "var(--color-text-primary)",
                    }}
                >
                    <ArrowLeft size={13} />
                    Back
                </button> */}
                <div className="text-center py-6">
                    <p
                        className="text-[12px] leading-relaxed"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        Built with curiosity, shared with intention.
                    </p>
                </div>
            </div>
        </div>
    );
}