'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { BlogPost } from '@/content/blog';
import { Calendar, Clock, ArrowRight, Search, Sparkles, BookOpen, Tag } from 'lucide-react';
import { formatBlogDate } from '@/lib/blog-seo';
import ScrollReveal from '@/components/ScrollReveal';

interface BlogClientProps {
  posts: BlogPost[];
}

const CATEGORIES = ['All', 'Tools', 'Tutorial', 'Guide', 'Productivity'] as const;

const CATEGORY_COLORS: Record<string, { text: string; bg: string; border: string; accent: string }> = {
  Tools: { text: '#ef4444', bg: 'rgba(239, 68, 68, 0.08)', border: 'rgba(239, 68, 68, 0.15)', accent: 'bg-red-500' },
  Tutorial: { text: '#f59e0b', bg: 'rgba(245, 158, 11, 0.08)', border: 'rgba(245, 158, 11, 0.15)', accent: 'bg-amber-500' },
  Guide: { text: '#3b82f6', bg: 'rgba(59, 130, 246, 0.08)', border: 'rgba(59, 130, 246, 0.15)', accent: 'bg-blue-500' },
  Productivity: { text: '#10b981', bg: 'rgba(16, 185, 129, 0.08)', border: 'rgba(16, 185, 129, 0.15)', accent: 'bg-emerald-500' },
};

export default function BlogClient({ posts }: BlogClientProps) {
  const t = useTranslations('blog');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter posts based on search query and selected category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.titleKey.toLowerCase().includes(search.toLowerCase()) ||
        post.excerptKey.toLowerCase().includes(search.toLowerCase()) ||
        post.keywords.some((k) => k.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, search, selectedCategory]);

  // The first post of the filtered list is the "featured" post
  const [featuredPost, displayPosts] = useMemo(() => {
    if (filteredPosts.length === 0) return [null, []];
    const [first, ...rest] = filteredPosts;
    return [first, rest];
  }, [filteredPosts]);

  return (
    <div className="w-full relative">
      {/* Search & Category Filter Section */}
      <section className="relative z-10 -mt-6 mb-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-glass p-4 sm:p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl border border-[var(--border-color)]">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-[#3b82f6] text-white shadow-md shadow-[#3b82f6]/25'
                      : 'text-[var(--text-secondary)] hover:bg-white/[0.04] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {cat === 'All' ? 'All Articles' : `${cat}s`}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-[var(--text-tertiary)]" />
            </span>
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-medium rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)]/60 text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[#3b82f6]/50 focus:bg-[var(--bg-primary)] transition-all"
            />
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 card-glass rounded-2xl">
            <BookOpen className="w-12 h-12 text-[var(--text-tertiary)] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[var(--text-primary)]">No articles found</h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1">Try refining your search keyword or selected category.</p>
          </div>
        ) : (
          <>
            {/* Featured Post Card */}
            {featuredPost && (
              <ScrollReveal className="mb-12">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group blog-card blog-card-featured block relative overflow-hidden rounded-3xl border border-[var(--border-color)] bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] p-6 sm:p-8 hover:border-[#3b82f6]/40 transition-all duration-500"
                >
                  {/* Decorative glowing accent */}
                  <div
                    className={`absolute top-0 left-0 w-full h-[3px] transition-all ${
                      CATEGORY_COLORS[featuredPost.category]?.accent || 'bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]'
                    }`}
                  />
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#3b82f6]/5 via-[#8b5cf6]/2 to-transparent blur-3xl rounded-full pointer-events-none" />

                  <div className="relative z-10 flex flex-col justify-between h-full min-h-[220px]">
                    <div>
                      {/* Meta badge */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-tertiary)] mb-5">
                        <span
                          className="px-3 py-1 rounded-full font-bold text-[10px] tracking-wider uppercase border"
                          style={{
                            color: CATEGORY_COLORS[featuredPost.category]?.text,
                            backgroundColor: CATEGORY_COLORS[featuredPost.category]?.bg,
                            borderColor: CATEGORY_COLORS[featuredPost.category]?.border,
                          }}
                        >
                          Featured · {featuredPost.category}
                        </span>
                        <time dateTime={featuredPost.date} className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatBlogDate(featuredPost.date)}
                        </time>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {featuredPost.readTime} min read
                        </span>
                      </div>

                      {/* Header */}
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] mb-3 group-hover:text-[#3b82f6] transition-colors leading-tight">
                        {featuredPost.titleKey}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed max-w-3xl mb-6 line-clamp-3">
                        {featuredPost.excerptKey}
                      </p>
                    </div>

                    {/* CTA link */}
                    <div className="inline-flex items-center gap-2 text-sm font-bold text-[#3b82f6]">
                      <span>Read Full Article</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            )}

            {/* Grid of Regular Posts */}
            {displayPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayPosts.map((post, i) => (
                  <ScrollReveal key={post.slug} delay={i * 60}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group blog-card flex flex-col h-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/40 p-5 hover:bg-[var(--bg-secondary)]/80 hover:border-[#3b82f6]/20 transition-all duration-300"
                    >
                      <div className="flex-1">
                        {/* Tag/Category */}
                        <span
                          className="px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-widest rounded-lg border w-fit block mb-4"
                          style={{
                            color: CATEGORY_COLORS[post.category]?.text,
                            backgroundColor: CATEGORY_COLORS[post.category]?.bg,
                            borderColor: CATEGORY_COLORS[post.category]?.border,
                          }}
                        >
                          {post.category}
                        </span>

                        {/* Title */}
                        <h3 className="blog-card-title text-base font-extrabold text-[var(--text-primary)] mb-2 group-hover:text-[#3b82f6] transition-colors line-clamp-2 leading-snug">
                          {post.titleKey}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-xs text-[var(--text-secondary)] mb-5 line-clamp-3 leading-relaxed">
                          {post.excerptKey}
                        </p>
                      </div>

                      {/* Footer Info */}
                      <div className="flex items-center justify-between text-[11px] text-[var(--text-tertiary)] pt-4 border-t border-[var(--border-color)]">
                        <div className="flex items-center gap-3">
                          <time dateTime={post.date} className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatBlogDate(post.date)}
                          </time>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime} min
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#3b82f6] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
