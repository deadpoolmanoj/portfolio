"use client";

import React from "react";
import { BookOpen, ExternalLink, Clock } from "lucide-react";
import { useRouter } from 'next/navigation';

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
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1600",
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

const BlogMeta = ({ tag, readTime }: { tag: string; readTime: string }) => (
  <div className="flex items-center gap-3 mt-2 text-[10px]" style={{ color: "var(--color-text-muted)" }}>
    <span
      className="px-2 py-0.5 rounded-md"
      style={{
        border: "1px solid var(--color-border)",
        backgroundColor: "var(--color-bg-card)",
        color: "var(--color-text-muted)",
      }}
    >
      {tag}
    </span>
    <span className="flex items-center gap-1">
      <Clock size={11} />
      {readTime}
    </span>
  </div>
);

const FeaturedBlog = ({ blog }: { blog: Blog }) => {
  const router = useRouter();

  return (
    <div
      className="w-full rounded-2xl overflow-hidden mb-3 cursor-pointer"
      style={{
        border: "1px solid var(--color-border)",
        backgroundColor: "var(--color-bg-card)",
      }}
      onClick={() => router.push('/blogs/blog1')}
    >
      {blog.image && (
        <div className="w-full h-40 overflow-hidden">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[13px] font-medium leading-snug" style={{ color: "var(--color-text-primary)" }}>
              {blog.title}
            </p>
            <p className="text-[11px] leading-relaxed mt-1" style={{ color: "var(--color-text-muted)" }}>
              {blog.desc}
            </p>
            <BlogMeta tag={blog.tag} readTime={blog.readTime} />
          </div>
          <ExternalLink size={14} style={{ color: "var(--color-text-muted)" }} className="mt-1 shrink-0" />
        </div>
      </div>
    </div>
  );
};

const CompactBlog = ({ blog }: { blog: Blog }) => (
  <div
    className="p-3 rounded-xl cursor-pointer transition-colors"
    style={{
      border: "1px solid var(--color-border)",
      backgroundColor: "var(--color-bg-card)",
    }}
    onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-bg-subtle)"}
    onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-bg-card)"}
  >
    <div className="flex justify-between gap-2">
      <div>
        <p className="text-[12px] font-medium leading-snug" style={{ color: "var(--color-text-primary)" }}>
          {blog.title}
        </p>
        <p className="text-[11px] leading-relaxed mt-1" style={{ color: "var(--color-text-muted)" }}>
          {blog.desc}
        </p>
        <BlogMeta tag={blog.tag} readTime={blog.readTime} />
      </div>
      <ExternalLink size={14} style={{ color: "var(--color-text-muted)" }} className="mt-1 shrink-0" />
    </div>
  </div>
);

const ChatBlogs = () => {
  const [featured, ...rest] = blogs;

  return (
    <div className="w-full">

      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="p-1.5 rounded-md"
            style={{
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-bg-card)",
            }}
          >
            <BookOpen size={14} style={{ color: "var(--color-text-secondary)" }} />
          </div>
          <p className="text-[12px] font-medium" style={{ color: "var(--color-text-primary)" }}>
            Blogs & Writing
          </p>
        </div>
        <p className="text-[12px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          Technical thoughts, system design notes, and product-building insights
          from real-world development experience.
        </p>
      </div>

      {/* Featured */}
      <FeaturedBlog blog={featured} />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {rest.map((blog, idx) => (
          <CompactBlog key={idx} blog={blog} />
        ))}
      </div>

      {/* Footer */}
      <div
        className="mt-4 p-3 rounded-xl"
        style={{
          border: "1px solid var(--color-border)",
          backgroundColor: "var(--color-bg-subtle)",
        }}
      >
        <p className="text-[11px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
          Writing more about{" "}
          <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>
            system design, AI engineering, and frontend architecture
          </span>.
        </p>
      </div>
    </div>
  );
};

export default ChatBlogs;