import React, { useState } from 'react';
import { ShieldAlert, Award, ArrowRight, Gauge, CheckCircle } from 'lucide-react';
import { TrainingLevelInput, TrainingLevelResult } from '../../types';

export const LevelCalculator: React.FC = () => {
  const [formData, setFormData] = useState<TrainingLevelInput>({
    age: 30,
    gender: 'men',
    division: 'open',
    fiveKmTime: '22-26',
    strengthLevel: 'intermediate',
    weeklyHours: 5,
    raceExperience: 'first-timer',
  });

  const [result, setResult] = useState<TrainingLevelResult | null>(null);

  const calculateLevel = (e: React.FormEvent) => {
    e.preventDefault();

    let score = 0;

    // Running score
    if (formData.fiveKmTime === 'sub-22') score += 3;
    else if (formData.fiveKmTime === '22-26') score += 2;
    else if (formData.fiveKmTime === '26-30') score += 1;
    else score += 0;

    // Strength score
    if (formData.strengthLevel === 'advanced') score += 3;
    else if (formData.strengthLevel === 'intermediate') score += 2;
    else score += 1;

    // Weekly volume score
    if (formData.weeklyHours >= 7) score += 2;
    else if (formData.weeklyHours >= 4) score += 1;

    // Race experience
    if (formData.raceExperience === 'veteran') score += 3;
    else if (formData.raceExperience === '1-2-races') score += 1;

    let level: 'Beginner' | 'Intermediate' | 'Advanced' = 'Beginner';
    let estimatedFinishTime = '1 hr 35 min – 1 hr 55 min';
    let primaryFocus = 'Aerobic running consistency & basic sled push biomechanics';
    let recommendedWeeklyVolume = '3 to 4 sessions / ~18–22 km running';
    let stationPriorities = ['Sled Push Form & Traction', 'Continuous SkiErg Pacing', 'Wall Ball Sets of 15-20'];

    if (score >= 8) {
      level = 'Advanced';
      estimatedFinishTime = formData.gender === 'men' ? '1 hr 03 min – 1 hr 12 min' : '1 hr 08 min – 1 hr 18 min';
      primaryFocus = 'Compromised threshold running & sub-4:15/km transition cadence';
      recommendedWeeklyVolume = '5 to 6 sessions / ~32–42 km running';
      stationPriorities = ['Unbroken Farmers Carry & Lunges', 'Aggressive Roxzone Transits', 'Sub-4:00 Sled Push/Pull Combinations'];
    } else if (score >= 4) {
      level = 'Intermediate';
      estimatedFinishTime = formData.gender === 'men' ? '1 hr 18 min – 1 hr 30 min' : '1 hr 22 min – 1 hr 34 min';
      primaryFocus = 'Lactate threshold management & unbroken station transitions';
      recommendedWeeklyVolume = '4 to 5 sessions / ~24–30 km running';
      stationPriorities = ['Compromised Running Drills', 'Burpee Broad Jump Efficiency', 'Strict 4-set Wall Balls'];
    }

    setResult({
      level,
      estimatedFinishTime,
      primaryFocus,
      recommendedWeeklyVolume,
      stationPriorities,
    });
  };

  return (
    <div className="bg-[#121418] border border-white/10 rounded-xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-2">
        <Gauge className="w-5 h-5 text-[#FFE600]" />
        <h3 className="font-display uppercase text-2xl tracking-wide text-white">
          HYROX Training Level Calculator
        </h3>
      </div>
      <p className="text-zinc-400 text-sm mb-6">
        Assess your current athletic conditioning across running speed, posterior strength, and race experience to determine your starting benchmark.
      </p>

      <form onSubmit={calculateLevel} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
              Age & Gender
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="16"
                max="75"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 30 })}
                className="w-20 bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFE600]"
              />
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'men' | 'women' })}
                className="flex-1 bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFE600]"
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
              Target Division
            </label>
            <select
              value={formData.division}
              onChange={(e) => setFormData({ ...formData, division: e.target.value as 'open' | 'pro' | 'doubles' })}
              className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFE600]"
            >
              <option value="open">Open (Standard Weights)</option>
              <option value="pro">Pro (Heavy Weights)</option>
              <option value="doubles">Doubles (Split Stations)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
              Standalone 5K Run Time
            </label>
            <select
              value={formData.fiveKmTime}
              onChange={(e) => setFormData({ ...formData, fiveKmTime: e.target.value })}
              className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFE600]"
            >
              <option value="sub-22">Sub 22:00 (Fast)</option>
              <option value="22-26">22:00 – 26:00 (Moderate)</option>
              <option value="26-30">26:00 – 30:00 (Steady)</option>
              <option value="30+">Over 30:00 (Developing)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
              Strength & Gym Experience
            </label>
            <select
              value={formData.strengthLevel}
              onChange={(e) => setFormData({ ...formData, strengthLevel: e.target.value as any })}
              className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFE600]"
            >
              <option value="novice">Novice (Under 1 year lifting)</option>
              <option value="intermediate">Intermediate (Regular barbell/sled work)</option>
              <option value="advanced">Advanced (Heavy squatter / CrossFit background)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
              Current Weekly Training (Hours)
            </label>
            <input
              type="number"
              min="2"
              max="20"
              value={formData.weeklyHours}
              onChange={(e) => setFormData({ ...formData, weeklyHours: parseInt(e.target.value) || 4 })}
              className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFE600]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
              HYROX Race History
            </label>
            <select
              value={formData.raceExperience}
              onChange={(e) => setFormData({ ...formData, raceExperience: e.target.value as any })}
              className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FFE600]"
            >
              <option value="first-timer">First-time Racer</option>
              <option value="1-2-races">1–2 Completed Races</option>
              <option value="veteran">3+ Races (Veteran)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#FFE600] text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Calculate Athletic Classification</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {result && (
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="bg-black/50 border border-white/10 rounded-xl p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">Your Profile Assessment</span>
                <h4 className="font-display uppercase text-3xl text-[#FFE600] flex items-center gap-2">
                  <Award className="w-6 h-6 text-[#FFE600]" />
                  {result.level} Competitor
                </h4>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">Projected Finish Window</span>
                <p className="font-mono-nums text-lg font-bold text-white">{result.estimatedFinishTime}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-sm">
              <div className="p-3 bg-zinc-900/60 rounded-lg border border-white/5">
                <span className="text-zinc-400 block text-xs uppercase mb-1">Primary Training Priority</span>
                <p className="text-zinc-200 font-medium">{result.primaryFocus}</p>
              </div>
              <div className="p-3 bg-zinc-900/60 rounded-lg border border-white/5">
                <span className="text-zinc-400 block text-xs uppercase mb-1">Recommended Weekly Volume</span>
                <p className="text-zinc-200 font-medium">{result.recommendedWeeklyVolume}</p>
              </div>
            </div>

            <div className="mt-4">
              <span className="text-xs uppercase tracking-wider text-zinc-400 block mb-2 font-medium">
                High-Yield Station Focus
              </span>
              <div className="flex flex-wrap gap-2">
                {result.stationPriorities.map((item, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-1.5 text-xs text-zinc-300 bg-zinc-800/80 px-3 py-1.5 rounded-md border border-white/5"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-[#FFE600]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 mt-4 text-xs text-zinc-500 bg-zinc-950 p-3 rounded-lg border border-white/5">
            <ShieldAlert className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-zinc-400">Educational Disclaimer:</strong> This calculation provides an educational estimate based on historical race distributions and physiological models. Actual performance varies with arena temperature, sleep quality, and pacing adherence.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
