import React, { useState } from 'react';
import { LevelCalculator } from './LevelCalculator';
import { WeekPlanner } from './WeekPlanner';
import { PaceCalculator } from './PaceCalculator';
import { Gauge, Calendar, Timer } from 'lucide-react';

export const CalculatorsContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'level' | 'planner' | 'pace'>('level');

  return (
    <section id="calculators" className="py-16 border-t border-white/10 bg-[#0B0C0E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold tracking-widest text-[#FFE600] uppercase block mb-2">
            Performance Intelligence Tools
          </span>
          <h2 className="font-display uppercase text-3xl sm:text-4xl text-white tracking-tight">
            HYROX Training & Race Calculators
          </h2>
          <p className="text-zinc-400 text-sm mt-3">
            Dial in your training volume, determine your athletic baseline, and calculate realistic station splits for race day.
          </p>
        </div>

        {/* Tab switchers - Segmented control adhering to zero-pill discipline */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-zinc-900 border border-white/10 rounded-xl">
            <button
              onClick={() => setActiveTab('level')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'level'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Gauge className="w-4 h-4" />
              <span>Level Assessment</span>
            </button>
            <button
              onClick={() => setActiveTab('planner')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'planner'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Training Week Planner</span>
            </button>
            <button
              onClick={() => setActiveTab('pace')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'pace'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Timer className="w-4 h-4" />
              <span>Race Pace Splits</span>
            </button>
          </div>
        </div>

        {/* Active Calculator Component */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'level' && <LevelCalculator />}
          {activeTab === 'planner' && <WeekPlanner />}
          {activeTab === 'pace' && <PaceCalculator />}
        </div>
      </div>
    </section>
  );
};
