import React from 'react';
import { Article, Category } from '../types';
import { ArticleCard } from './ArticleCard';
import { ArrowLeft } from 'lucide-react';

interface CategoryArchiveProps {
  category: Category | 'All';
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onBackToHome: () => void;
  onSelectCategory: (cat: Category | 'All') => void;
}

export const CategoryArchive: React.FC<CategoryArchiveProps> = ({
  category,
  articles,
  onSelectArticle,
  onBackToHome,
  onSelectCategory,
}) => {
  const allCategories: (Category | 'All')[] = [
    'All',
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

  const filteredArticles =
    category === 'All'
      ? articles
      : articles.filter((a) => a.category === category);

  const categoryDescriptions: Record<string, string> = {
    'All': 'Explore the complete archive of HYROX training, pacing, fueling, and recovery intelligence.',
    'HYROX 101': 'Foundational rules, format explanations, baseline standards, and rookie error avoidance.',
    'Training': 'Periodized endurance frameworks, strength volume, and hybrid gym programming.',
    'Workouts': 'High-yield hybrid simulation workouts, 4-week blueprints, and progressive overload cycles.',
    'Race Strategy': 'Negative splits, Roxzone transits, station energy economics, and pacing calculators.',
    'Running': 'Mastering compromised running, Zone 2 mitochondrial base building, and arena cornering.',
    'Nutrition': 'Evidence-based carbohydrate loading, sodium architecture, and race-morning fueling.',
    'Recovery': 'Autonomic HRV regulation, deep sleep protocols, and tendon longevity.',
    'Gear': 'Outsole turf friction, stability requirements, shoe guides, and competition apparel.',
    'Race Guides': 'Detailed station movement standards, judging criteria, and penalty prevention.',
  };

  return (
    <div className="min-h-screen bg-[#0B0C0E] py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Back navigation */}
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </button>

        {/* Section Title & Description */}
        <div className="border-b border-white/10 pb-8 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FFE600] block mb-2">
            Editorial Archive
          </span>
          <h1 className="font-display uppercase text-4xl sm:text-5xl font-black text-white tracking-tight">
            {category === 'All' ? 'All Editorial Articles' : category}
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-3">
            {categoryDescriptions[category] || 'Curated high-performance HYROX insights.'}
          </p>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  category === cat
                    ? 'bg-[#FFE600] text-black shadow-sm'
                    : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of articles */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            <p className="text-base font-semibold text-zinc-400">No articles found in this category.</p>
            <button
              onClick={() => onSelectCategory('All')}
              className="mt-4 px-4 py-2 bg-zinc-800 text-white rounded-lg text-xs"
            >
              View All Articles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onSelect={onSelectArticle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
