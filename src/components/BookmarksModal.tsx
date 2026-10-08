import React from 'react';
import { X, Trash2, ArrowUpRight, Bookmark } from 'lucide-react';
import { Article } from '../types';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-[#121418] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#FFE600] fill-[#FFE600]" />
            <h3 className="font-display uppercase text-xl font-bold text-white">
              Saved Race Articles ({savedArticles.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {savedArticles.length === 0 ? (
            <div className="text-center py-12 text-zinc-500">
              <p className="text-sm font-medium text-zinc-400">No saved articles yet.</p>
              <p className="text-xs mt-1">Bookmark training guides, station breakdowns, and pacing playbooks to review before race day.</p>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div
                key={article.id}
                className="group p-4 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-white/15 flex items-start justify-between gap-3 transition-colors"
              >
                <div
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                  className="cursor-pointer flex-1"
                >
                  <div className="flex items-center gap-2 text-[11px] text-[#FFE600] mb-1 font-semibold uppercase">
                    <span>{article.category}</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-zinc-400 font-mono-nums">{article.readingTime}</span>
                  </div>
                  <h4 className="font-display uppercase text-base text-white group-hover:text-[#FFE600] transition-colors leading-tight">
                    {article.title}
                  </h4>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    title="Open Article"
                    className="p-1.5 text-zinc-400 hover:text-[#FFE600] rounded hover:bg-white/5"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveBookmark(article.id)}
                    title="Remove from Saved"
                    className="p-1.5 text-zinc-500 hover:text-red-400 rounded hover:bg-white/5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedArticles.length > 0 && (
          <div className="px-6 py-3 border-t border-white/10 bg-zinc-950 flex justify-between items-center text-xs">
            <button
              onClick={onClearAll}
              className="text-zinc-500 hover:text-red-400 transition-colors"
            >
              Clear All Saved
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-zinc-800 text-white rounded font-medium hover:bg-zinc-700"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
