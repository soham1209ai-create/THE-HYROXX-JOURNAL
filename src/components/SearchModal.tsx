import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowUpRight, Tag, BookOpen } from 'lucide-react';
import { Article, Category } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onSelectCategory: (category: Category) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredArticles = query.trim()
    ? articles.filter(
        (art) =>
          art.title.toLowerCase().includes(query.toLowerCase()) ||
          art.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          art.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          art.category.toLowerCase().includes(query.toLowerCase()) ||
          art.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
          art.content.toLowerCase().includes(query.toLowerCase())
      )
    : articles.slice(0, 5);

  const categories: Category[] = [
    'HYROX 101',
    'Training',
    'Workouts',
    'Race Strategy',
    'Running',
    'Nutrition',
    'Recovery',
    'Gear',
    'Race Guides',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#121418] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-[#FFE600] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, stations, workouts, pacing, gear..."
            className="w-full bg-transparent text-white placeholder-zinc-500 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-zinc-500 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs text-zinc-400 hover:text-white px-2 py-1 bg-zinc-800 rounded border border-white/10"
          >
            ESC
          </button>
        </div>

        {/* Quick Category Badges */}
        {!query && (
          <div className="p-4 border-b border-white/5 bg-zinc-950/60">
            <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold block mb-2">
              Browse by Section
            </span>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onSelectCategory(cat);
                    onClose();
                  }}
                  className="px-2.5 py-1 text-xs text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-white/5 rounded-md transition-colors cursor-pointer"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12 text-zinc-500">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40 text-zinc-400" />
              <p className="text-sm">No articles found matching &ldquo;{query}&rdquo;</p>
              <p className="text-xs mt-1 text-zinc-600">Try searching for &quot;sled&quot;, &quot;nutrition&quot;, &quot;shoes&quot;, or &quot;pacing&quot;</p>
            </div>
          ) : (
            filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className="group p-3 rounded-xl hover:bg-zinc-800/70 border border-transparent hover:border-white/10 transition-colors cursor-pointer flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-1">
                    <span className="text-[#FFE600] font-semibold">{article.category}</span>
                    <span>·</span>
                    <span className="font-mono-nums">{article.readingTime}</span>
                  </div>
                  <h4 className="font-display uppercase text-base text-white group-hover:text-[#FFE600] transition-colors leading-tight">
                    {article.title}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-1 mt-1">
                    {article.excerpt}
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-[#FFE600] shrink-0 mt-1" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
