import React, { useState } from 'react';
import { Mail, Check, ArrowRight } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-16 bg-[#0E1014] border-t border-b border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#FFE600] font-semibold uppercase tracking-wider mb-4">
          <Mail className="w-3.5 h-3.5" />
          <span>The Weekly Dispatch</span>
        </div>

        <h2 className="font-display uppercase text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
          Get Better at HYROX.
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
          Weekly training ideas, race strategy, nutrition tips and HYROX insights. Read by over 24,000 hybrid racers worldwide.
        </p>

        {submitted ? (
          <div className="bg-[#FFE600]/10 border border-[#FFE600]/30 rounded-xl p-4 max-w-md mx-auto flex items-center justify-center gap-2 text-[#FFE600] text-sm font-medium">
            <Check className="w-5 h-5" />
            <span>You&apos;re subscribed. First dispatch arrives this Thursday.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 bg-zinc-900 border border-white/15 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFE600] transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#FFE600] hover:bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>Join the Newsletter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-zinc-500 mt-4">
          No spam. Evidence-based training only. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};
