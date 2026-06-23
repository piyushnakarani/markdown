'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link2, List, Share2, Check } from 'lucide-react';
import type { ArticleHeading } from '@/lib/blog-seo';

export function BlogReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="blog-reading-progress"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div className="blog-reading-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}

export function BlogArticleTOC({ headings }: { headings: ArticleHeading[] }) {
  const t = useTranslations('blog');
  const [activeId, setActiveId] = useState(headings[0]?.id ?? '');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-96px 0px -65% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const tocList = (
    <ol className="blog-article-toc-list">
      {headings.map((heading) => (
        <li
          key={heading.id}
          className={heading.level === 3 ? 'blog-article-toc-item blog-article-toc-item--nested' : 'blog-article-toc-item'}
        >
          <a
            href={`#${heading.id}`}
            className={activeId === heading.id ? 'is-active' : undefined}
            onClick={() => setMobileOpen(false)}
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <div className="blog-article-toc-wrap">
      <aside className="blog-article-toc blog-article-toc--desktop" aria-label={t('tableOfContents')}>
        <p className="blog-article-toc-label">
          <List className="w-4 h-4" aria-hidden />
          {t('tableOfContents')}
        </p>
        <nav>{tocList}</nav>
      </aside>

      <div className="blog-article-toc-mobile">
        <button
          type="button"
          className="blog-article-toc-toggle"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <List className="w-4 h-4" aria-hidden />
          {t('tableOfContents')}
        </button>
        {mobileOpen && (
          <nav className="blog-article-toc-panel" aria-label={t('tableOfContents')}>
            {tocList}
          </nav>
        )}
      </div>
    </div>
  );
}

export function BlogArticleShare({ shareUrl, shareTitle }: { shareUrl: string; shareTitle: string }) {
  const t = useTranslations('blog');
  const [copied, setCopied] = useState(false);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [shareUrl]);

  const nativeShare = useCallback(async () => {
    if (typeof navigator.share !== 'function') {
      await copyLink();
      return;
    }

    try {
      await navigator.share({ title: shareTitle, url: shareUrl });
    } catch {
      /* user dismissed */
    }
  }, [copyLink, shareTitle, shareUrl]);

  return (
    <div className="blog-article-share">
      <p className="blog-article-share-label">
        <Share2 className="w-4 h-4" aria-hidden />
        {t('shareArticle')}
      </p>
      <div className="blog-article-share-actions">
        <button type="button" className="blog-article-share-btn" onClick={nativeShare}>
          <Share2 className="w-4 h-4" aria-hidden />
          {t('share')}
        </button>
        <button type="button" className="blog-article-share-btn" onClick={copyLink}>
          {copied ? <Check className="w-4 h-4" aria-hidden /> : <Link2 className="w-4 h-4" aria-hidden />}
          {copied ? t('linkCopied') : t('copyLink')}
        </button>
      </div>
    </div>
  );
}
