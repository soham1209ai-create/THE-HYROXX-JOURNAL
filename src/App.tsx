import React, { useState, useEffect } from 'react';
import { ARTICLES, HERO_ARENA_IMAGE, RUNNING_TRACK_IMAGE, SLED_PUSH_IMAGE, SKIERG_IMAGE } from './data/articles';
import { Article, Category } from './types';
import { updatePageSeo } from './utils/seo';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetail } from './components/ArticleDetail';
import { CategoryArchive } from './components/CategoryArchive';
import { SearchModal } from './components/SearchModal';
import { BookmarksModal } from './components/BookmarksModal';
import { LegalModal } from './components/LegalModal';
import { Newsletter } from './components/Newsletter';
import { CalculatorsContainer } from './components/Calculators';
import {
  ArrowRight,
  BookOpen,
  Dumbbell,
  Flag,
  Flame,
  Award,
  Clock,
  Sparkles,
  Zap,
  TrendingUp,
  SlidersHorizontal,
  Compass,
} from 'lucide-react';

export default function App() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All' | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [legalTopic, setLegalTopic] = useState<string | null>(null);
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('hyrox_saved_articles');
      return stored ? JSON.parse(stored) : ['art-1', 'art-6'];
    } catch {
      return ['art-1', 'art-6'];
    }
  });

  // Discovery filter tab on homepage
  const [discoveryFilter, setDiscoveryFilter] = useState<'latest' | 'trending' | 'editors' | 'beginner'>('latest');

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hyrox_saved_articles', JSON.stringify(savedArticleIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedArticleIds]);

  // Synchronize initial URL state & listen to browser back/forward buttons
  useEffect(() => {
    const parseUrlAndRoute = () => {
      const params = new URLSearchParams(window.location.search);
      const articleSlug = params.get('article');
      const categoryParam = params.get('category');

      if (articleSlug) {
        const found = ARTICLES.find((a) => a.slug === articleSlug);
        if (found) {
          setSelectedArticle(found);
          setSelectedCategory(null);
          return;
        }
      }

      if (categoryParam) {
        setSelectedCategory(categoryParam as Category | 'All');
        setSelectedArticle(null);
        return;
      }

      setSelectedArticle(null);
      setSelectedCategory(null);
    };

    parseUrlAndRoute();
    window.addEventListener('popstate', parseUrlAndRoute);
    return () => window.removeEventListener('popstate', parseUrlAndRoute);
  }, []);

  // Update dynamic SEO and browser URL history when state changes
  useEffect(() => {
    if (selectedArticle) {
      const targetQuery = `?article=${selectedArticle.slug}`;
      if (window.location.search !== targetQuery) {
        window.history.pushState({ type: 'article', slug: selectedArticle.slug }, '', targetQuery);
      }
      updatePageSeo({
        title: selectedArticle.metaTitle || `${selectedArticle.title} | The HYROX Journal`,
        description: selectedArticle.metaDescription || selectedArticle.excerpt,
        canonicalPath: `/article/${selectedArticle.slug}`,
        image: selectedArticle.heroImage,
        type: 'article',
        articleData: selectedArticle,
      });
    } else if (selectedCategory) {
      const targetQuery = `?category=${encodeURIComponent(selectedCategory)}`;
      if (window.location.search !== targetQuery) {
        window.history.pushState({ type: 'category', cat: selectedCategory }, '', targetQuery);
      }
      updatePageSeo({
        title: `${selectedCategory} Guides & Training Intelligence | The HYROX Journal`,
        description: `Comprehensive ${selectedCategory} insights, station breakdowns, and training strategies from The HYROX Journal.`,
        canonicalPath: `/category/${selectedCategory.toLowerCase().replace(/\s+/g, '-')}`,
        type: 'website',
      });
    } else {
      if (window.location.search !== '') {
        window.history.pushState({ type: 'home' }, '', window.location.pathname);
      }
      updatePageSeo({
        title: 'The HYROX Journal – Train Smarter. Race Stronger.',
        description: 'Premium editorial publication and training authority on HYROX racing, programming, station strategy, nutrition, and recovery.',
        canonicalPath: '/',
        type: 'website',
      });
    }
  }, [selectedArticle, selectedCategory]);

  const toggleSaveArticle = (articleId: string) => {
    setSavedArticleIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const savedArticles = ARTICLES.filter((a) => savedArticleIds.includes(a.id));

  // Handler for navigation
  const navigateHome = () => {
    setSelectedArticle(null);
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleStartHere = () => {
    const beginnerGuide = ARTICLES.find((a) => a.slug === 'what-is-hyrox-beginners-guide');
    if (beginnerGuide) {
      setSelectedArticle(beginnerGuide);
    } else {
      setSelectedCategory('HYROX 101');
    }
  };

  // Featured article is Article 1 or 6
  const featuredArticle = ARTICLES.find((a) => a.isFeatured) || ARTICLES[0];

  // Latest 6 articles
  const latestArticles = [...ARTICLES].slice(0, 6);

  // Discovery filtered articles
  const getDiscoveryArticles = () => {
    switch (discoveryFilter) {
      case 'trending':
        return ARTICLES.filter((a) => a.isTrending);
      case 'editors':
        return ARTICLES.filter((a) => a.isEditorsPick);
      case 'beginner':
        return ARTICLES.filter((a) => a.isBeginnerFriendly);
      case 'latest':
      default:
        return latestArticles;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-zinc-100 flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      {/* Navigation */}
      <Navbar
        onNavigateHome={navigateHome}
        onSelectCategory={(cat) => {
          setSelectedArticle(null);
          setSelectedCategory(cat);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onOpenSearch={() => setSearchOpen(true)}
        onStartHere={handleStartHere}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        savedCount={savedArticleIds.length}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {selectedArticle ? (
          <ArticleDetail
            article={selectedArticle}
            allArticles={ARTICLES}
            onBack={() => setSelectedArticle(null)}
            onSelectArticle={handleSelectArticle}
            isSaved={savedArticleIds.includes(selectedArticle.id)}
            onToggleSave={toggleSaveArticle}
          />
        ) : selectedCategory ? (
          <CategoryArchive
            category={selectedCategory}
            articles={ARTICLES}
            onSelectArticle={handleSelectArticle}
            onBackToHome={navigateHome}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
          />
        ) : (
          /* HOMEPAGE */
          <>
            {/* Section 2: Hero Section */}
            <section className="relative border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#111317] to-[#0B0C0E] py-16 sm:py-24 lg:py-28">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Hero Copy */}
                <div className="lg:col-span-7 z-10">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FFE600] mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#FFE600] animate-pulse" />
                    <span>The Premier HYROX Performance Journal</span>
                  </div>

                  <h1 className="font-display uppercase text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-6">
                    Train Smarter. <br />
                    <span className="text-white">Race Stronger.</span>
                  </h1>

                  <p className="text-zinc-300 text-lg sm:text-xl font-normal leading-relaxed max-w-xl mb-8">
                    Your practical guide to HYROX training, racing, nutrition and performance. Tested strategies and sports science for hybrid endurance athletes.
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={handleStartHere}
                      className="px-7 py-3.5 bg-[#FFE600] hover:bg-yellow-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-yellow-500/10"
                    >
                      <span>Start With HYROX 101</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setSelectedCategory('Training')}
                      className="px-7 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/15 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                    >
                      <span>Explore Training</span>
                    </button>
                  </div>

                  {/* Trust markers */}
                  <div className="flex items-center gap-6 mt-10 pt-8 border-t border-white/10 text-xs text-zinc-400">
                    <div>
                      <span className="font-mono-nums font-bold text-white text-base block">8x1km</span>
                      <span>Race Architecture</span>
                    </div>
                    <div className="w-px h-7 bg-white/10" />
                    <div>
                      <span className="font-mono-nums font-bold text-white text-base block">12 Guides</span>
                      <span>Full Curriculum</span>
                    </div>
                    <div className="w-px h-7 bg-white/10" />
                    <div>
                      <span className="font-mono-nums font-bold text-[#FFE600] text-base block">100%</span>
                      <span>Evidence-Based</span>
                    </div>
                  </div>
                </div>

                {/* Hero Athlete Image with subtle border and aspect ratio */}
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl aspect-[4/3] lg:aspect-[5/4] bg-zinc-900 group">
                    <img
                      src={HERO_ARENA_IMAGE}
                      alt="HYROX competitor pushing sled in arena"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#FFE600] block mb-1">
                        Race Day Atmosphere
                      </span>
                      <p className="text-sm font-semibold text-white leading-tight">
                        Standardized 8km Running & 8 Functional Stations Worldwide
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Section 3: Featured Article */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FFE600] block mb-1">
                    Editor&apos;s Lead Feature
                  </span>
                  <h2 className="font-display uppercase text-3xl sm:text-4xl font-extrabold text-white">
                    Cover Story
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-[#FFE600] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>View All 12 Articles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <ArticleCard
                article={featuredArticle}
                onSelect={handleSelectArticle}
                variant="featured"
              />
            </section>

            {/* Section 4: Start Here Section */}
            <section className="py-16 bg-[#0E1014] border-t border-b border-white/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="max-w-2xl mb-12">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FFE600] block mb-1">
                    First Time In The Roxzone?
                  </span>
                  <h2 className="font-display uppercase text-3xl sm:text-4xl font-extrabold text-white mb-3">
                    Start Here
                  </h2>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    HYROX is a standardized indoor fitness race open to everyone. You don&apos;t need complex Olympic lifting or gymnastic skills to compete. Here is how to navigate your journey from first run to the finish corral.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: HYROX 101 */}
                  <div
                    onClick={() => {
                      const art = ARTICLES.find((a) => a.slug === 'what-is-hyrox-beginners-guide');
                      if (art) handleSelectArticle(art);
                    }}
                    className="group bg-[#121418] border border-white/10 hover:border-white/25 rounded-2xl p-6 sm:p-8 cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#FFE600] mb-6 group-hover:scale-110 transition-transform">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Step 01</span>
                      <h3 className="font-display uppercase text-2xl font-bold text-white group-hover:text-[#FFE600] transition-colors mt-1 mb-3">
                        HYROX 101
                      </h3>
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                        Learn the 8x1km race sequence, equipment weights for Open and Pro divisions, doubles formats, and what fitness standards are required before entering.
                      </p>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FFE600] group-hover:translate-x-1 transition-transform">
                      Read Beginner Guide <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Card 2: Training */}
                  <div
                    onClick={() => {
                      const art = ARTICLES.find((a) => a.slug === 'hyrox-workout-plan-for-beginners');
                      if (art) handleSelectArticle(art);
                    }}
                    className="group bg-[#121418] border border-white/10 hover:border-white/25 rounded-2xl p-6 sm:p-8 cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#FFE600] mb-6 group-hover:scale-110 transition-transform">
                        <Dumbbell className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Step 02</span>
                      <h3 className="font-display uppercase text-2xl font-bold text-white group-hover:text-[#FFE600] transition-colors mt-1 mb-3">
                        Training
                      </h3>
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                        Adopt a 4-week or 8-week structured training cycle. Build your aerobic running engine in Zone 2 and adapt to running on heavy quadriceps.
                      </p>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FFE600] group-hover:translate-x-1 transition-transform">
                      View Workout Blueprint <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Card 3: Race Day */}
                  <div
                    onClick={() => {
                      const art = ARTICLES.find((a) => a.slug === 'hyrox-race-strategy-how-to-pace-every-station');
                      if (art) handleSelectArticle(art);
                    }}
                    className="group bg-[#121418] border border-white/10 hover:border-white/25 rounded-2xl p-6 sm:p-8 cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#FFE600] mb-6 group-hover:scale-110 transition-transform">
                        <Flag className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Step 03</span>
                      <h3 className="font-display uppercase text-2xl font-bold text-white group-hover:text-[#FFE600] transition-colors mt-1 mb-3">
                        Race Day
                      </h3>
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                        Master station-by-station pacing, negative split strategies, Roxzone transitions, and eliminate rookie mistakes that cost minutes.
                      </p>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FFE600] group-hover:translate-x-1 transition-transform">
                      Master Race Strategy <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Discovery & Latest Articles */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FFE600] block mb-1">
                    Editorial Archive
                  </span>
                  <h2 className="font-display uppercase text-3xl sm:text-4xl font-extrabold text-white">
                    Latest Publications
                  </h2>
                </div>

                {/* Segmented controls for discovery */}
                <div className="inline-flex p-1 bg-zinc-900 rounded-lg border border-white/10 text-xs">
                  <button
                    onClick={() => setDiscoveryFilter('latest')}
                    className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer ${
                      discoveryFilter === 'latest' ? 'bg-white text-black shadow-sm' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Latest
                  </button>
                  <button
                    onClick={() => setDiscoveryFilter('trending')}
                    className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer ${
                      discoveryFilter === 'trending' ? 'bg-white text-black shadow-sm' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Trending
                  </button>
                  <button
                    onClick={() => setDiscoveryFilter('editors')}
                    className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer ${
                      discoveryFilter === 'editors' ? 'bg-white text-black shadow-sm' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Editor&apos;s Picks
                  </button>
                  <button
                    onClick={() => setDiscoveryFilter('beginner')}
                    className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer ${
                      discoveryFilter === 'beginner' ? 'bg-white text-black shadow-sm' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Beginner Friendly
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getDiscoveryArticles().map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onSelect={handleSelectArticle}
                  />
                ))}
              </div>
            </section>

            {/* Section 6: Training Pillars Section */}
            <section className="py-16 bg-[#0E1014] border-t border-b border-white/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#FFE600] block mb-1">
                      Periodization & Programming
                    </span>
                    <h2 className="font-display uppercase text-3xl sm:text-4xl font-extrabold text-white">
                      The Five Training Pillars
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedCategory('Training')}
                    className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-[#FFE600] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View All Training Guides</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {[
                    { title: 'Running Engine', desc: 'Zone 2 volume, interval thresholds, and compromised leg turnover.', slug: 'how-to-improve-your-hyrox-running' },
                    { title: 'Posterior Strength', desc: 'Trap bar pulls, front squats, and suitcase grip density.', slug: 'hyrox-workout-plan-for-beginners' },
                    { title: 'Sled Biomechanics', desc: 'Traction angles, momentum physics, and continuous cadence.', slug: 'the-8-hyrox-stations-explained' },
                    { title: 'Ergometer Pacing', desc: 'SkiErg whole-body hinge and Concept2 rowing stroke efficiency.', slug: 'hyrox-8-week-training-plan' },
                    { title: 'Hybrid Workouts', desc: 'Multi-modality brick simulations matching race intensity.', slug: 'how-to-train-for-your-first-hyrox-race' },
                  ].map((pillar, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        const art = ARTICLES.find((a) => a.slug === pillar.slug);
                        if (art) handleSelectArticle(art);
                      }}
                      className="p-5 bg-[#121418] border border-white/10 hover:border-[#FFE600]/40 rounded-xl cursor-pointer transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <span className="font-mono text-xs text-zinc-500 font-bold block mb-2">0{i + 1}</span>
                        <h3 className="font-display uppercase text-lg font-bold text-white group-hover:text-[#FFE600] transition-colors leading-tight mb-2">
                          {pillar.title}
                        </h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                      <span className="mt-4 pt-3 border-t border-white/5 text-[11px] font-semibold text-[#FFE600] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Explore <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 7: Race Strategy Section */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FFE600] block mb-1">
                    Tactical Execution
                  </span>
                  <h2 className="font-display uppercase text-3xl sm:text-4xl font-extrabold text-white">
                    Race Strategy
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedCategory('Race Strategy')}
                  className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-[#FFE600] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Explore Race Playbook</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { title: 'Even Pacing', desc: 'Avoiding the Run 1 adrenaline trap to preserve glycogen.', slug: 'hyrox-race-strategy-how-to-pace-every-station' },
                  { title: 'Fast Transitions', desc: 'Saving 3 to 5 minutes by optimizing your Roxzone transits.', slug: '12-common-hyrox-mistakes-beginners-make' },
                  { title: 'Cornering Strategy', desc: 'Taking tight indoor arena turns without kinetic energy loss.', slug: 'how-to-improve-your-hyrox-running' },
                  { title: 'Station Tactics', desc: 'Unbroken sleds and pre-scheduled wall ball rep schemes.', slug: 'the-8-hyrox-stations-explained' },
                  { title: 'Race-Day Warmup', desc: 'Warming up without burning high-intensity glycogen before Start Corral.', slug: 'how-to-train-for-your-first-hyrox-race' },
                ].map((strat, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      const art = ARTICLES.find((a) => a.slug === strat.slug);
                      if (art) handleSelectArticle(art);
                    }}
                    className="p-5 bg-[#121418] border border-white/10 hover:border-white/20 rounded-xl cursor-pointer transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <h4 className="font-display uppercase text-lg font-bold text-white group-hover:text-[#FFE600] transition-colors leading-tight mb-2">
                        {strat.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {strat.desc}
                      </p>
                    </div>
                    <span className="mt-4 pt-3 border-t border-white/5 text-[11px] font-semibold text-zinc-400 group-hover:text-white flex items-center gap-1">
                      Read Strategy <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 8: Nutrition & Recovery Section */}
            <section className="py-16 bg-[#0E1014] border-t border-b border-white/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
                  <div className="lg:col-span-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#FFE600] block mb-1">
                      Sports Science & Physiology
                    </span>
                    <h2 className="font-display uppercase text-3xl sm:text-4xl font-extrabold text-white">
                      Nutrition & Recovery
                    </h2>
                    <p className="text-zinc-400 text-sm mt-2 max-w-xl">
                      Fueling the hybrid engine and restoring nervous system readiness. Practical protocols for glycogen storage, sodium balance, and deep sleep.
                    </p>
                  </div>
                  <div className="lg:col-span-4 flex lg:justify-end gap-3">
                    <button
                      onClick={() => setSelectedCategory('Nutrition')}
                      className="px-4 py-2 bg-zinc-900 border border-white/10 text-xs text-white rounded-lg hover:border-white/20 cursor-pointer"
                    >
                      Nutrition Guides
                    </button>
                    <button
                      onClick={() => setSelectedCategory('Recovery')}
                      className="px-4 py-2 bg-zinc-900 border border-white/10 text-xs text-white rounded-lg hover:border-white/20 cursor-pointer"
                    >
                      Recovery Protocols
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      category: 'Nutrition',
                      title: 'Pre-Race & Training Nutrition',
                      desc: '5-7g carbs per kg bodyweight, optimal meal timings, and avoiding gastrointestinal issues during high-intensity runs.',
                      slug: 'hyrox-nutrition-pre-during-post',
                    },
                    {
                      category: 'Hydration',
                      title: 'Sodium & Electrolyte Strategy',
                      desc: 'Compensating for high arena sweat rates with 500-800mg sodium per liter to prevent catastrophic quad cramping.',
                      slug: 'hyrox-nutrition-pre-during-post',
                    },
                    {
                      category: 'Recovery',
                      title: 'Sleep, HRV & Tendon Longevity',
                      desc: 'Managing autonomic nervous system fatigue, slow-wave sleep cycles, and protecting patellar tendons from impact.',
                      slug: 'hyrox-recovery-guide',
                    },
                  ].map((card, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        const art = ARTICLES.find((a) => a.slug === card.slug);
                        if (art) handleSelectArticle(art);
                      }}
                      className="p-6 bg-[#121418] border border-white/10 hover:border-white/20 rounded-xl cursor-pointer transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <span className="text-xs font-semibold text-[#FFE600] uppercase tracking-wider block mb-2">
                          {card.category}
                        </span>
                        <h3 className="font-display uppercase text-xl font-bold text-white group-hover:text-[#FFE600] transition-colors leading-tight mb-2">
                          {card.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                      <span className="mt-5 pt-3 border-t border-white/5 text-xs font-semibold text-zinc-300 group-hover:text-[#FFE600] flex items-center gap-1">
                        Read Guide <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 9: Interactive Calculators */}
            <CalculatorsContainer />

            {/* Section 10: Newsletter */}
            <Newsletter />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedArticle(null);
          setSelectedCategory(cat);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onNavigateHome={navigateHome}
        onOpenLegal={(topic) => setLegalTopic(topic)}
      />

      {/* Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        articles={ARTICLES}
        onSelectArticle={handleSelectArticle}
        onSelectCategory={(cat) => {
          setSelectedArticle(null);
          setSelectedCategory(cat);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      />

      <BookmarksModal
        isOpen={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
        savedArticles={savedArticles}
        onSelectArticle={handleSelectArticle}
        onRemoveBookmark={toggleSaveArticle}
        onClearAll={() => setSavedArticleIds([])}
      />

      <LegalModal
        topic={legalTopic}
        onClose={() => setLegalTopic(null)}
      />
    </div>
  );
}
