import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  Bookmark,
  Share2,
  CheckCircle,
  HelpCircle,
  BookOpen,
  ArrowRight,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

interface ArticleDetailProps {
  article: Article;
  allArticles: Article[];
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  isSaved: boolean;
  onToggleSave: (articleId: string) => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({
  article,
  allArticles,
  onBack,
  onSelectArticle,
  isSaved,
  onToggleSave,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedShare, setCopiedShare] = useState(false);

  // Scroll depth tracking
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.slug]);

  // Find related articles
  const relatedArticles = allArticles.filter(
    (a) => article.relatedSlugs?.includes(a.slug) || (a.category === article.category && a.id !== article.id)
  ).slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C0E] pb-24 text-zinc-100">
      {/* Scroll reading progress bar */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-zinc-900 z-30">
        <div
          className="h-full bg-[#FFE600] transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Utility Nav */}
      <div className="border-b border-white/10 bg-[#0E1014]/60 backdrop-blur-sm sticky top-16 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journal</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(article.id)}
              className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-[#FFE600] text-black border-[#FFE600]'
                  : 'bg-zinc-900 text-zinc-300 border-white/10 hover:text-white'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-black' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save Article'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{copiedShare ? 'Copied Link!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        
        {/* Editorial Header */}
        <header className="mb-10">
          {/* Zero-Pill unboxed metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#FFE600] uppercase tracking-wider mb-4">
            <span>{article.category}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-zinc-400 font-normal font-mono-nums flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.readingTime}
            </span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-zinc-400 font-normal flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {article.date}
            </span>
          </div>

          <h1 className="font-display uppercase text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.04] tracking-tight mb-5">
            {article.title}
          </h1>

          <p className="text-zinc-300 text-lg sm:text-xl font-normal leading-relaxed max-w-3xl mb-6">
            {article.subtitle}
          </p>

          <div className="flex items-center gap-3 pt-6 border-t border-white/10 text-xs text-zinc-400">
            <div className="w-9 h-9 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-white font-bold font-display uppercase">
              {article.author.name.charAt(0)}
            </div>
            <div>
              <p className="text-zinc-200 font-semibold">{article.author.name}</p>
              <p className="text-zinc-500">{article.author.role}</p>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 mb-12 bg-zinc-900">
          <img
            src={article.heroImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Table of Contents */}
        {article.tableOfContents && article.tableOfContents.length > 0 && (
          <div className="p-6 rounded-xl bg-[#121418] border border-white/10 mb-12">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300 mb-3">
              <BookOpen className="w-4 h-4 text-[#FFE600]" />
              <span>In This Editorial</span>
            </div>
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {article.tableOfContents.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-zinc-400 hover:text-[#FFE600] py-1 transition-colors block truncate"
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </div>
        )}

        {/* Main Prose Content */}
        <div
          className="prose-editorial max-w-none text-zinc-200"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Key Takeaways Section */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <section className="my-14 p-6 sm:p-8 rounded-2xl bg-zinc-950 border-2 border-[#FFE600]/30 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FFE600] mb-4">
              <CheckCircle className="w-5 h-5" />
              <span>Key Takeaways</span>
            </div>
            <h3 className="font-display uppercase text-2xl text-white font-bold mb-4">
              The Critical Race Intelligence
            </h3>
            <ul className="space-y-3">
              {article.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-zinc-200 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] shrink-0 mt-2" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQ Accordion Section */}
        {article.faq && article.faq.length > 0 && (
          <section className="my-14 pt-10 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFE600] mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>Frequently Asked Questions</span>
            </div>
            <h3 className="font-display uppercase text-2xl sm:text-3xl text-white font-bold mb-6">
              Expert Answers & Rules Clarification
            </h3>
            <div className="space-y-3">
              {article.faq.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-white/10 rounded-xl overflow-hidden bg-[#121418] transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="font-display uppercase text-base sm:text-lg text-white font-semibold">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#FFE600] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-3">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Official Sources & Verification */}
        {article.sources && article.sources.length > 0 && (
          <div className="my-12 p-5 rounded-xl bg-zinc-950 border border-white/10 text-xs text-zinc-400">
            <span className="font-bold text-zinc-200 uppercase tracking-wider block mb-2">
              Editorial Verification & Official Sources
            </span>
            <ul className="space-y-1.5">
              {article.sources.map((src, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                  <span>{src.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Articles Recommender */}
        {relatedArticles.length > 0 && (
          <section className="my-16 pt-12 border-t border-white/10">
            <span className="text-xs font-semibold tracking-wider text-[#FFE600] uppercase block mb-1">
              Continue Your Preparation
            </span>
            <h3 className="font-display uppercase text-2xl sm:text-3xl text-white font-bold mb-6">
              Recommended Reading
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel)}
                  className="group p-4 bg-[#121418] hover:bg-zinc-800/80 border border-white/10 hover:border-white/20 rounded-xl cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-1.5">
                      <span className="text-[#FFE600] font-semibold uppercase">{rel.category}</span>
                      <span>·</span>
                      <span className="font-mono-nums">{rel.readingTime}</span>
                    </div>
                    <h4 className="font-display uppercase text-lg text-white group-hover:text-[#FFE600] transition-colors leading-tight mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-zinc-400 line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                  <span className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1 text-xs text-[#FFE600] font-semibold group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
};
