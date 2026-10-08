import React, { useState } from 'react';
import { Article } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  variant?: 'standard' | 'compact' | 'featured';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  variant = 'standard',
}) => {
  const [imageError, setImageError] = useState(false);

  if (variant === 'featured') {
    return (
      <article
        onClick={() => onSelect(article)}
        className="group relative bg-[#121418] border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 grid grid-cols-1 lg:grid-cols-12"
      >
        <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-zinc-900">
          {!imageError ? (
            <img
              src={article.heroImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black text-zinc-600 font-mono text-xs">
              THE HYROX JOURNAL
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121418] via-transparent to-transparent lg:hidden" />
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            {/* Zero-Pill unboxed metadata */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#FFE600] uppercase tracking-wider mb-3">
              <span>{article.category}</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-400 font-normal font-mono-nums">{article.readingTime}</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-400 font-normal">{article.date}</span>
            </div>

            <h2 className="font-display uppercase text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white group-hover:text-[#FFE600] transition-colors leading-[1.08] mb-3">
              {article.title}
            </h2>

            <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6">
              {article.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs">
            <span className="text-zinc-400">
              By <strong className="text-zinc-200 font-medium">{article.author.name}</strong>
            </span>
            <span className="flex items-center gap-1 text-[#FFE600] font-semibold group-hover:translate-x-0.5 transition-transform">
              Read Editorial <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article
        onClick={() => onSelect(article)}
        className="group flex gap-4 p-3 bg-[#121418]/60 hover:bg-[#121418] border border-white/5 hover:border-white/15 rounded-xl cursor-pointer transition-all"
      >
        <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-zinc-900 relative">
          {!imageError ? (
            <img
              src={article.heroImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-zinc-800" />
          )}
        </div>
        <div className="flex flex-col justify-center min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-1">
            <span className="text-[#FFE600] font-medium">{article.category}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="font-mono-nums">{article.readingTime}</span>
          </div>
          <h4 className="font-display uppercase text-base text-white group-hover:text-[#FFE600] transition-colors line-clamp-2 leading-tight">
            {article.title}
          </h4>
        </div>
      </article>
    );
  }

  // Standard Card
  return (
    <article
      onClick={() => onSelect(article)}
      className="group flex flex-col bg-[#121418] border border-white/10 hover:border-white/20 rounded-xl overflow-hidden cursor-pointer transition-all duration-200"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
        {!imageError ? (
          <img
            src={article.heroImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600 font-mono text-xs">
            THE HYROX JOURNAL
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Zero-Pill unboxed metadata with dot separators */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2.5">
            <span className="text-[#FFE600] font-semibold uppercase tracking-wider">{article.category}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="font-mono-nums">{article.readingTime}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>{article.date}</span>
          </div>

          <h3 className="font-display uppercase text-xl font-bold text-white group-hover:text-[#FFE600] transition-colors leading-tight mb-2.5">
            {article.title}
          </h3>

          <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500">
          <span>By {article.author.name}</span>
          <span className="text-[#FFE600] font-medium flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
            Read <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};
