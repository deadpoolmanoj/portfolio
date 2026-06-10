"use client";

import React from "react";
import { BookOpen, ExternalLink, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { BLOGS } from "@/utils/blogs";

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

const FeaturedBlog = ({ blog }: { blog: (typeof BLOGS)[0] }) => {
  const router = useRouter();

  return (
    <div
      className="w-full rounded-2xl overflow-hidden mb-3 cursor-pointer"
      style={{
        border: "1px solid var(--color-border)",
        backgroundColor: "var(--color-bg-card)",
      }}
      onClick={() => router.push(`/blogs/${blog.id}`)}
    >
      <div className="w-full h-40 relative overflow-hidden">
        <img
          src={blog.headerImage}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <span className="absolute bottom-3 left-3 text-2xl z-10">
          {blog.headerEmoji}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[13px] font-medium leading-snug" style={{ color: "var(--color-text-primary)" }}>
              {blog.title}
            </p>
            <p className="text-[11px] leading-relaxed mt-1" style={{ color: "var(--color-text-muted)" }}>
              {blog.subtitle}
            </p>
            <BlogMeta tag={blog.tags[0]} readTime={blog.readTime} />
          </div>
          <ExternalLink size={14} style={{ color: "var(--color-text-muted)" }} className="mt-1 shrink-0" />
        </div>
      </div>
    </div>
  );
};

const CompactBlog = ({ blog }: { blog: (typeof BLOGS)[0] }) => {
  const router = useRouter();

  return (
    <div
      className="p-3 rounded-xl cursor-pointer transition-colors"
      style={{
        border: "1px solid var(--color-border)",
        backgroundColor: "var(--color-bg-card)",
      }}
      onClick={() => router.push(`/blogs/${blog.id}`)}
      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-bg-subtle)"}
      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-bg-card)"}
    >
      <div className="flex justify-between gap-2">
        <div>
          <p className="text-[12px] font-medium leading-snug" style={{ color: "var(--color-text-primary)" }}>
            {blog.title}
          </p>
          <p className="text-[11px] leading-relaxed mt-1" style={{ color: "var(--color-text-muted)" }}>
            {blog.subtitle}
          </p>
          <BlogMeta tag={blog.tags[0]} readTime={blog.readTime} />
        </div>
        <ExternalLink size={14} style={{ color: "var(--color-text-muted)" }} className="mt-1 shrink-0" />
      </div>
    </div>
  );
};

const ChatBlogs = () => {
  const [featured, ...rest] = BLOGS;

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
          Honest write-ups on building real projects — what worked, what didn't, and what I'd do differently.
        </p>
      </div>

      {/* Featured */}
      <FeaturedBlog blog={featured} />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {rest.map((blog) => (
          <CompactBlog key={blog.id} blog={blog} />
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
          More posts coming on{" "}
          <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>
            real-time systems, AI engineering, and building in public.
          </span>
        </p>
      </div>
    </div>
  );
};

export default ChatBlogs;