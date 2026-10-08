import React, { useState } from 'react';
import { Calendar, Clock, Activity, Dumbbell, Flame } from 'lucide-react';
import { WeekPlannerInput, DailyWorkout } from '../../types';

export const WeekPlanner: React.FC = () => {
  const [plannerInput, setPlannerInput] = useState<WeekPlannerInput>({
    daysPerWeek: 4,
    runningExperience: 'intermediate',
    strengthExperience: 'intermediate',
    weeksUntilRace: 8,
  });

  const getSchedule = (): DailyWorkout[] => {
    const days = plannerInput.daysPerWeek;

    if (days === 3) {
      return [
        {
          day: 'Monday',
          title: 'Hybrid Conditioning & Compromised Run',
          focus: 'Aerobic threshold under leg fatigue',
          duration: '60 mins',
          intensity: 'High',
          details: [
            'Warm-up: 10 mins easy jog + dynamic hip mobility',
            '4 Rounds: 800m Run (Target Race Pace) + 250m SkiErg + 20m Sled Push (Race Weight)',
            'Cooldown: 5 mins walk + couch stretch',
          ],
        },
        {
          day: 'Wednesday',
          title: 'Lower Body Strength & Ergs',
          focus: 'Posterior chain force development',
          duration: '55 mins',
          intensity: 'Moderate',
          details: [
            'Trap Bar Deadlift: 4 sets x 6 reps (Heavy controlled)',
            'Walking Lunges with Dumbbells: 3 sets x 30 meters',
            'Concept2 Row: 4 x 500m at race pace with 60s active rest',
            'Core: 3 x 45s Weighted Plank',
          ],
        },
        {
          day: 'Friday',
          title: 'Aerobic Base Long Run',
          focus: 'Mitochondrial density and fat oxidation',
          duration: '50–65 mins',
          intensity: 'Low',
          details: [
            'Continuous steady road or trail run in strict Zone 2',
            'Pacing rule: must be able to hold conversational breathing',
            'Finish with 4 x 100m strides to maintain turnover',
          ],
        },
        {
          day: 'Tue / Thu / Sat / Sun',
          title: 'Recovery & Active Rest',
          focus: 'Tissue repair and autonomic regulation',
          duration: '—',
          intensity: 'Rest',
          details: ['Light walking, mobility drills, proper hydration with electrolytes, 8+ hours sleep'],
        },
      ];
    } else if (days === 4) {
      return [
        {
          day: 'Monday',
          title: 'HYROX Station Density',
          focus: 'Ergs, Sleds & Transitions',
          duration: '65 mins',
          intensity: 'High',
          details: [
            'SkiErg: 1,000m steady pace calibration',
            'Sled Push / Pull superset: 4 x 25m at competition weight',
            'Burpee Broad Jump technique: 4 sets x 15m unbroken',
            'Wall Balls: 3 sets of 25 reps with strict squat depth',
          ],
        },
        {
          day: 'Tuesday',
          title: 'Zone 2 Foundation Run',
          focus: 'Aerobic capacity & recovery flush',
          duration: '45 mins',
          intensity: 'Low',
          details: [
            'Continuous easy conversational run (Heart Rate < 75% max)',
            'Smooth terrain, focusing on midfoot landing and 175-180 cadence',
          ],
        },
        {
          day: 'Thursday',
          title: 'Functional Hypertrophy & Posterior Power',
          focus: 'Carries, Grip & Lunges',
          duration: '55 mins',
          intensity: 'Moderate',
          details: [
            'Front Squats: 4 x 8 reps',
            'Heavy Farmers Carry: 5 x 50m with race weights or +10%',
            'Sandbag Lunges: 4 x 25m focus on tall torso posture',
            'Concept2 Row: 3 x 750m steady intervals',
          ],
        },
        {
          day: 'Saturday',
          title: 'Compromised Race Simulation',
          focus: 'Brick running & mental resilience',
          duration: '70 mins',
          intensity: 'High',
          details: [
            '3 Rounds: 1,000m Run + 30m Sled Push + 1,000m Run + 30 Wall Balls',
            'Strictly time Roxzone transitions under 30 seconds',
          ],
        },
        {
          day: 'Wed / Fri / Sun',
          title: 'Rest & Soft Tissue Care',
          focus: 'Deliberate down-regulation',
          duration: '—',
          intensity: 'Rest',
          details: ['Complete rest or 20 min easy swim/cycle, foam rolling on quads and calves.'],
        },
      ];
    } else if (days === 5) {
      return [
        {
          day: 'Monday',
          title: 'HYROX Stations Block A',
          focus: 'SkiErg + Sleds + Core',
          duration: '60 mins',
          intensity: 'High',
          details: [
            '5 x 300m SkiErg intervals (60s rest)',
            'Sled Push 4 x 25m (Race Weight)',
            'Sled Pull 4 x 25m (Strict box posture)',
          ],
        },
        {
          day: 'Tuesday',
          title: 'Threshold Interval Running',
          focus: 'Lactate clearance & VO2 stimulus',
          duration: '50 mins',
          intensity: 'High',
          details: [
            '2km warm-up + drills',
            '5 x 1,000m at 10-15s faster than HYROX race pace (90s jog recovery)',
            '1.5km cooldown flush',
          ],
        },
        {
          day: 'Wednesday',
          title: 'Strength & Structural Integrity',
          focus: 'Kettlebells, Sandbags & Grip',
          duration: '50 mins',
          intensity: 'Moderate',
          details: [
            'Trap Bar Deadlift: 5 x 5',
            'Farmers Walk: 6 x 40m unbroken',
            'Overhead Barbell Holds & Hanging Knee Raises',
          ],
        },
        {
          day: 'Friday',
          title: 'Compromised Engine Simulation',
          focus: 'Row + Lunges + Wall Balls',
          duration: '65 mins',
          intensity: 'High',
          details: [
            '1,000m Row + 80m Burpee Broad Jumps + 100m Sandbag Lunges + 75 Wall Balls (timed block)',
          ],
        },
        {
          day: 'Saturday',
          title: 'Aerobic Long Run',
          focus: 'Endurance capacity & fat oxidation',
          duration: '60–75 mins',
          intensity: 'Low',
          details: [
            '10–13 km continuous easy running in Zone 2',
            'Practice race hydration with electrolytes',
          ],
        },
        {
          day: 'Thu / Sun',
          title: 'Full Recovery Days',
          focus: 'Autonomic nervous system recovery',
          duration: '—',
          intensity: 'Rest',
          details: ['Quality sleep, contrast showers, mobility work, magnesium glycinate.'],
        },
      ];
    } else {
      // 6 days
      return [
        {
          day: 'Monday',
          title: 'Compromised Running Intervals',
          focus: 'Race pace on pre-fatigued quads',
          duration: '60 mins',
          intensity: 'High',
          details: ['6 x 800m running alternating with 20m sled pushes'],
        },
        {
          day: 'Tuesday',
          title: 'Erg Power & Upper Pulling',
          focus: 'SkiErg, Row & Lats',
          duration: '50 mins',
          intensity: 'Moderate',
          details: ['Concept2 Ski & Row pyramid sets + weighted pullups and face pulls'],
        },
        {
          day: 'Wednesday',
          title: 'Zone 2 Recovery Run',
          focus: 'Capillarization & active flush',
          duration: '45 mins',
          intensity: 'Low',
          details: ['Easy continuous 7–8km conversational jog'],
        },
        {
          day: 'Thursday',
          title: 'Heavy Strength & Grip Overload',
          focus: 'Posterior chain density',
          duration: '55 mins',
          intensity: 'Moderate',
          details: ['Heavy front squats, Romanian deadlifts, 250m farmers walks'],
        },
        {
          day: 'Friday',
          title: 'HYROX Station Benchmark',
          focus: 'Lunges, Burpees & Wall Balls',
          duration: '60 mins',
          intensity: 'High',
          details: ['High volume test: 100m Sandbag lunges + 100 Wall balls for time'],
        },
        {
          day: 'Saturday',
          title: 'Long Aerobic Run',
          focus: 'Endurance engine',
          duration: '75 mins',
          intensity: 'Low',
          details: ['12–14km steady endurance run with strides'],
        },
        {
          day: 'Sunday',
          title: 'Total Rest & Regeneration',
          focus: 'Cellular and tendon recovery',
          duration: '—',
          intensity: 'Rest',
          details: ['Zero training, high-protein nutrition, sauna/stretching.'],
        },
      ];
    }
  };

  const schedule = getSchedule();

  return (
    <div className="bg-[#121418] border border-white/10 rounded-xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-2">
        <Calendar className="w-5 h-5 text-[#FFE600]" />
        <h3 className="font-display uppercase text-2xl tracking-wide text-white">
          HYROX Training Week Planner
        </h3>
      </div>
      <p className="text-zinc-400 text-sm mb-6">
        Generate a personalized 7-day microcycle structured around your weekly availability, running background, and race timeline.
      </p>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-zinc-900/60 rounded-xl border border-white/5 mb-6">
        <div>
          <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
            Training Days / Week
          </label>
          <div className="grid grid-cols-4 gap-1">
            {[3, 4, 5, 6].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setPlannerInput({ ...plannerInput, daysPerWeek: num })}
                className={`py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                  plannerInput.daysPerWeek === num
                    ? 'bg-[#FFE600] text-black'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {num} Days
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
            Running Background
          </label>
          <select
            value={plannerInput.runningExperience}
            onChange={(e) => setPlannerInput({ ...plannerInput, runningExperience: e.target.value as any })}
            className="w-full bg-zinc-800 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
          >
            <option value="beginner">Beginner (&lt;10km/wk)</option>
            <option value="intermediate">Intermediate (15-30km/wk)</option>
            <option value="experienced">Experienced (30km+/wk)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
            Strength Background
          </label>
          <select
            value={plannerInput.strengthExperience}
            onChange={(e) => setPlannerInput({ ...plannerInput, strengthExperience: e.target.value as any })}
            className="w-full bg-zinc-800 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
          >
            <option value="beginner">Novice Lifter</option>
            <option value="intermediate">Intermediate Gym</option>
            <option value="advanced">Advanced / CrossFit</option>
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
            Weeks Out From Race
          </label>
          <select
            value={plannerInput.weeksUntilRace}
            onChange={(e) => setPlannerInput({ ...plannerInput, weeksUntilRace: parseInt(e.target.value) || 8 })}
            className="w-full bg-zinc-800 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
          >
            <option value={12}>12 Weeks (Base Period)</option>
            <option value={8}>8 Weeks (Build Period)</option>
            <option value={4}>4 Weeks (Peak Specificity)</option>
            <option value={2}>2 Weeks (Taper Window)</option>
          </select>
        </div>
      </div>

      {/* Generated Schedule */}
      <div className="space-y-3">
        {schedule.map((item, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border transition-all ${
              item.intensity === 'Rest'
                ? 'bg-zinc-950/40 border-white/5 opacity-80'
                : 'bg-zinc-900/60 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="font-display uppercase text-lg text-[#FFE600] font-bold">
                  {item.day}
                </span>
                <span className="text-zinc-500 font-mono text-xs">/</span>
                <span className="text-sm font-semibold text-white">{item.title}</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-zinc-400">
                {item.duration !== '—' && (
                  <span className="flex items-center gap-1 font-mono-nums">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    {item.duration}
                  </span>
                )}
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide uppercase ${
                    item.intensity === 'High'
                      ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                      : item.intensity === 'Moderate'
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      : item.intensity === 'Low'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {item.intensity}
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 mb-2 italic">Focus: {item.focus}</p>

            <ul className="text-xs text-zinc-300 space-y-1 pl-4 list-disc marker:text-[#FFE600]">
              {item.details.map((detail, dIdx) => (
                <li key={dIdx}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
