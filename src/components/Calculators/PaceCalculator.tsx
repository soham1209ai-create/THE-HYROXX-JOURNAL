import React, { useState } from 'react';
import { Timer, ArrowRight, TrendingUp, Info } from 'lucide-react';

export const PaceCalculator: React.FC = () => {
  const [targetTotalMinutes, setTargetTotalMinutes] = useState<number>(85);

  // Benchmarking calculation formulas based on aggregate HYROX race split data
  // Generally, ~50-52% of total time is running, ~40-42% is stations, ~6-8% is Roxzone transitions
  const totalSeconds = targetTotalMinutes * 60;
  
  // Running allocation (~51% of total)
  const totalRunSeconds = totalSeconds * 0.51;
  const perKmRunSeconds = Math.round(totalRunSeconds / 8);
  const runMinutes = Math.floor(perKmRunSeconds / 60);
  const runRemainderSec = perKmRunSeconds % 60;
  const formattedPerKmPace = `${runMinutes}:${runRemainderSec < 10 ? '0' : ''}${runRemainderSec}/km`;

  // Roxzone transition allocation (~7% of total)
  const roxzoneSeconds = Math.round(totalSeconds * 0.07);
  const roxzoneMinutes = Math.floor(roxzoneSeconds / 60);
  const roxzoneRemainderSec = roxzoneSeconds % 60;
  const formattedRoxzoneTime = `${roxzoneMinutes}m ${roxzoneRemainderSec < 10 ? '0' : ''}${roxzoneRemainderSec}s`;

  // Station allocations (~42% distributed proportionally by historical mean duration)
  // Relative station weights:
  // 1. SkiErg: 10%
  // 2. Sled Push: 11%
  // 3. Sled Pull: 12%
  // 4. Burpee Broad Jumps: 15%
  // 5. Row: 10.5%
  // 6. Farmers Carry: 8.5%
  // 7. Sandbag Lunges: 17%
  // 8. Wall Balls: 16%
  const totalStationSeconds = totalSeconds * 0.42;

  const stationWeights = [
    { name: '1. SkiErg (1,000m)', weight: 0.10, tip: 'Steady 500m split at 80% effort' },
    { name: '2. Sled Push (50m)', weight: 0.11, tip: 'Unbroken four 12.5m lengths' },
    { name: '3. Sled Pull (50m)', weight: 0.12, tip: 'Rhythmic whole-body hip hinge' },
    { name: '4. Burpee Broad Jumps (80m)', weight: 0.15, tip: 'Step-up and consistent 1.2m bounds' },
    { name: '5. Row (1,000m)', weight: 0.105, tip: 'Active recovery at 26-28 spm' },
    { name: '6. Farmers Carry (200m)', weight: 0.085, tip: 'Target zero dropped weights' },
    { name: '7. Sandbag Lunges (100m)', weight: 0.17, tip: 'Continuous strides with upright torso' },
    { name: '8. Wall Balls (100 reps)', weight: 0.16, tip: 'Planned sets of 20 or 25 reps' },
  ];

  const formatSec = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.round(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const presetTimes = [65, 75, 85, 95, 105, 115];

  return (
    <div className="bg-[#121418] border border-white/10 rounded-xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-2">
        <Timer className="w-5 h-5 text-[#FFE600]" />
        <h3 className="font-display uppercase text-2xl tracking-wide text-white">
          HYROX Race Pace Calculator
        </h3>
      </div>
      <p className="text-zinc-400 text-sm mb-6">
        Input your targeted finish time to calculate estimated station splits, sustainable 1,000m running paces, and Roxzone buffer allocations.
      </p>

      {/* Target Time Slider & Presets */}
      <div className="p-5 bg-zinc-900/60 rounded-xl border border-white/5 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <label className="text-xs uppercase tracking-wider text-zinc-300 font-medium">
            Target Finish Time
          </label>
          <div className="flex items-baseline gap-1 text-white">
            <span className="font-display text-3xl font-bold text-[#FFE600] font-mono-nums">
              {Math.floor(targetTotalMinutes / 60)}h {targetTotalMinutes % 60}m
            </span>
            <span className="text-xs text-zinc-400">({targetTotalMinutes} total minutes)</span>
          </div>
        </div>

        <input
          type="range"
          min="55"
          max="135"
          step="1"
          value={targetTotalMinutes}
          onChange={(e) => setTargetTotalMinutes(parseInt(e.target.value) || 85)}
          className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#FFE600]"
        />

        {/* Preset quick buttons */}
        <div className="flex flex-wrap items-center gap-1.5 mt-4">
          <span className="text-xs text-zinc-500 mr-1">Presets:</span>
          {presetTimes.map((mins) => (
            <button
              key={mins}
              type="button"
              onClick={() => setTargetTotalMinutes(mins)}
              className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${
                targetTotalMinutes === mins
                  ? 'bg-[#FFE600] text-black font-semibold'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins}m`}
            </button>
          ))}
        </div>
      </div>

      {/* Top summary metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-zinc-900/80 rounded-xl border border-white/5">
          <span className="text-xs uppercase tracking-wider text-zinc-400 block mb-1">
            Avg 1,000m Run Pace
          </span>
          <p className="font-mono-nums text-2xl font-bold text-white">{formattedPerKmPace}</p>
          <p className="text-[11px] text-zinc-500 mt-1">Total Running: ~{Math.round(totalRunSeconds / 60)} mins across 8km</p>
        </div>

        <div className="p-4 bg-zinc-900/80 rounded-xl border border-white/5">
          <span className="text-xs uppercase tracking-wider text-zinc-400 block mb-1">
            Total Station Target
          </span>
          <p className="font-mono-nums text-2xl font-bold text-white">
            {Math.round(totalStationSeconds / 60)} mins
          </p>
          <p className="text-[11px] text-zinc-500 mt-1">Cumulative across all 8 stations</p>
        </div>

        <div className="p-4 bg-zinc-900/80 rounded-xl border border-white/5">
          <span className="text-xs uppercase tracking-wider text-zinc-400 block mb-1">
            Roxzone Buffer
          </span>
          <p className="font-mono-nums text-2xl font-bold text-white">{formattedRoxzoneTime}</p>
          <p className="text-[11px] text-zinc-500 mt-1">Transitions & timing arches</p>
        </div>
      </div>

      {/* Detailed Station Split Breakdown */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse border border-zinc-800">
          <thead>
            <tr className="bg-zinc-900 text-zinc-300 uppercase tracking-wider">
              <th className="p-3 border border-zinc-800">Workout Station</th>
              <th className="p-3 border border-zinc-800 font-mono text-right">Est. Split Target</th>
              <th className="p-3 border border-zinc-800 hidden sm:table-cell">Key Execution Cue</th>
            </tr>
          </thead>
          <tbody className="text-zinc-300">
            {stationWeights.map((st, i) => (
              <tr key={i} className={i % 2 === 1 ? 'bg-zinc-900/40' : ''}>
                <td className="p-3 border border-zinc-800 font-medium text-white">{st.name}</td>
                <td className="p-3 border border-zinc-800 font-mono-nums font-bold text-[#FFE600] text-right text-sm">
                  {formatSec(totalStationSeconds * st.weight)}
                </td>
                <td className="p-3 border border-zinc-800 text-zinc-400 hidden sm:table-cell">
                  {st.tip}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pacing Advice Box */}
      <div className="mt-6 p-4 rounded-xl bg-zinc-950 border border-white/5 flex items-start gap-3 text-xs text-zinc-400">
        <Info className="w-4 h-4 text-[#FFE600] shrink-0 mt-0.5" />
        <div>
          <p className="text-zinc-300 font-semibold mb-1">Pacing Rule for Race Day</p>
          <p>
            Avoid starting Run 1 faster than your target {formattedPerKmPace} pace. Athletes who sprint Run 1 typically lose 3 to 5 minutes on the Sandbag Lunges and Wall Balls due to acute quadriceps lactate accumulation.
          </p>
        </div>
      </div>
    </div>
  );
};
