"use client";

import React from "react";
import { BookOpen, ExternalLink, Clock } from "lucide-react";
import { useRouter } from 'next/navigation'

type Blog = {
    title: string;
    desc: string;
    tag: string;
    readTime: string;
    image?: string;
};

const blogs: Blog[] = [
    {
        title: "Building an AI-powered portfolio like ChatGPT",
        desc: "How I structured intent classification, dynamic components, and conversational UI.",
        tag: "AI + Frontend",
        readTime: "5 min",
        image:
            "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1600",
    },
    {
        title: "Designing scalable React component systems",
        desc: "My approach to building reusable UI blocks with clean architecture.",
        tag: "React",
        readTime: "6 min",
    },
    {
        title: "From static resume to interactive experience",
        desc: "Why portfolios should behave like products instead of documents.",
        tag: "Product Thinking",
        readTime: "4 min",
    },
    {
        title: "How I structure backend APIs for scalability",
        desc: "Patterns I use for clean Node.js + Express architecture.",
        tag: "Backend",
        readTime: "7 min",
    },
];

const BlogMeta = ({
    tag,
    readTime,
}: {
    tag: string;
    readTime: string;
}) => (
    <div className="flex items-center gap-3 mt-2 text-[10px] text-[#9b9b9b]">
        <span className="px-2 py-0.5 border border-[#e9ecef] rounded-md bg-white">
            {tag}
        </span>

        <span className="flex items-center gap-1">
            <Clock size={11} />
            {readTime}
        </span>
    </div>
);

const FeaturedBlog = ({ blog }: { blog: Blog }) => {

    const router = useRouter()

    return (
        <div className="w-full rounded-2xl border border-[#e9ecef] bg-white overflow-hidden mb-3" 
        onClick={() => router.push('/blogs/blog1')}>

            {/* Image */}
            {blog.image && (
                <div className="w-full h-40 overflow-hidden">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Content */}
            <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-[13px] font-medium text-[#1a1a1a] leading-snug">
                            {blog.title}
                        </p>

                        <p className="text-[11px] text-[#9b9b9b] leading-relaxed mt-1">
                            {blog.desc}
                        </p>

                        <BlogMeta tag={blog.tag} readTime={blog.readTime} />
                    </div>

                    <ExternalLink size={14} className="text-[#9b9b9b] mt-1" />
                </div>
            </div>
        </div>
    );
};

const CompactBlog = ({ blog }: { blog: Blog }) => {
    return (
        <div className="p-3 rounded-xl border border-[#e9ecef] bg-white hover:bg-[#fafafa] transition-colors cursor-pointer">

            <div className="flex justify-between gap-2">
                <div>
                    <p className="text-[12px] font-medium text-[#1a1a1a] leading-snug">
                        {blog.title}
                    </p>

                    <p className="text-[11px] text-[#9b9b9b] leading-relaxed mt-1">
                        {blog.desc}
                    </p>

                    <BlogMeta tag={blog.tag} readTime={blog.readTime} />
                </div>

                <ExternalLink size={14} className="text-[#9b9b9b] mt-1" />
            </div>
        </div>
    );
};

const ChatBlogs = () => {
    const [featured, ...rest] = blogs;

    return (
        <div className="w-full">

            {/* Header */}
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-md border border-[#e9ecef] bg-white">
                        <BookOpen size={14} className="text-[#585858]" />
                    </div>

                    <p className="text-[12px] font-medium text-[#1a1a1a]">
                        Blogs & Writing
                    </p>
                </div>

                <p className="text-[12px] text-[#585858] leading-relaxed">
                    Technical thoughts, system design notes, and product-building insights
                    from real-world development experience.
                </p>
            </div>

            {/* Featured blog */}
            <FeaturedBlog blog={featured} />

            {/* Grid blogs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {rest.map((blog, idx) => (
                    <CompactBlog key={idx} blog={blog} />
                ))}
            </div>

            {/* Footer */}
            <div className="mt-4 p-3 rounded-xl border border-[#e9ecef] bg-[#fafafa]">
                <p className="text-[11px] text-[#9b9b9b] leading-relaxed">
                    Writing more about{" "}
                    <span className="text-[#1a1a1a] font-medium">
                        system design, AI engineering, and frontend architecture
                    </span>.
                </p>
            </div>

        </div>
    );
};

export default ChatBlogs;