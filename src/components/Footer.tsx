import React from 'react';
import { Category } from '../types';

interface FooterProps {
  onSelectCategory: (category: Category) => void;
  onNavigateHome: () => void;
  onOpenLegal: (topic: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigateHome,
  onOpenLegal,
}) => {
  return (
    <footer className="bg-[#07080A] border-t border-white/10 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <button
              onClick={onNavigateHome}
              className="font-display uppercase text-2xl font-black text-white hover:text-[#FFE600] transition-colors cursor-pointer text-left block mb-3"
            >
              THE HYROX JOURNAL
            </button>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm mb-4">
              An independent premium fitness publication dedicated to high-performance HYROX training, racing biomechanics, sports science, nutrition, and recovery.
            </p>
            <div className="text-[11px] text-zinc-500 leading-normal">
              Not officially affiliated with or endorsed by Upsolut Sports GmbH or HYROX®. All trademarks remain property of their respective owners.
            </div>
          </div>

          {/* Training & Race Strategy */}
          <div>
            <h4 className="font-display uppercase text-sm font-bold text-white tracking-wider mb-4">
              Editorial Sections
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onSelectCategory('HYROX 101')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  HYROX 101
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Training')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Training & Periodization
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Race Strategy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Race Strategy & Pacing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Running')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Compromised Running
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Workouts')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Workout Blueprints
                </button>
              </li>
            </ul>
          </div>

          {/* Nutrition, Recovery & Gear */}
          <div>
            <h4 className="font-display uppercase text-sm font-bold text-white tracking-wider mb-4">
              Performance Science
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onSelectCategory('Nutrition')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Nutrition & Fueling
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Recovery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Recovery & Tendon Health
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Gear')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shoe Guides & Gear
                </button>
              </li>
              <li>
                <a
                  href="#calculators"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Interactive Calculators
                </a>
              </li>
            </ul>
          </div>

          {/* Organization & Legal */}
          <div>
            <h4 className="font-display uppercase text-sm font-bold text-white tracking-wider mb-4">
              Publication
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onOpenLegal('About')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About The Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('Contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Submissions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('Privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('Terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms & Disclaimers
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} The HYROX Journal. Built for endurance & functional hybrid athletes worldwide.
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <span>Editorial Standards Verified</span>
            <span>·</span>
            <span>Evidence-Focused Fitness</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
