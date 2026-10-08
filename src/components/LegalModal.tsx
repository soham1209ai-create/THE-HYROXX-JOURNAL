import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface LegalModalProps {
  topic: string | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ topic, onClose }) => {
  if (!topic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#121418] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#FFE600]" />
            <h3 className="font-display uppercase text-xl font-bold text-white">
              {topic}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-sm text-zinc-300 leading-relaxed">
          {topic === 'About' && (
            <>
              <p>
                <strong>The HYROX Journal</strong> is an independent editorial publication established in 2026 to provide unbiased, scientifically grounded training blueprints, station mechanics, pacing protocols, and recovery methodologies for functional hybrid fitness competitors.
              </p>
              <p>
                Our mission is to help athletes of all tiers—from first-time Open racers to World Championship qualifiers—train smarter and race stronger through meticulous sports science and authentic race data.
              </p>
            </>
          )}

          {topic === 'Contact' && (
            <>
              <p>
                <strong>Editorial Inquiries & Contributor Pitches:</strong><br />
                We welcome submissions from exercise physiologists, certified hybrid coaches, and elite competitors.
              </p>
              <p className="font-mono text-zinc-400 text-xs">
                editorial@thehyroxjournal.com
              </p>
              <p>
                <strong>Media & Partnership Requests:</strong><br />
                partnerships@thehyroxjournal.com
              </p>
            </>
          )}

          {topic === 'Privacy' && (
            <>
              <p>
                <strong>Privacy Policy:</strong><br />
                We respect your personal privacy. We collect minimal analytics purely to monitor publication traffic and readership engagement. We never sell, rent, or trade your personal email address.
              </p>
              <p>
                Any newsletter subscriptions are stored securely and may be cancelled with a single click at any time.
              </p>
            </>
          )}

          {topic === 'Terms' && (
            <>
              <p>
                <strong>Editorial & Medical Disclaimer:</strong><br />
                The training plans, pacing algorithms, and nutritional frameworks published in The HYROX Journal are intended for general athletic education only and do not constitute individual medical or clinical advice. Consult a licensed physician prior to undertaking high-intensity physical exertion or drastically modifying nutritional intake.
              </p>
              <p>
                <strong>Trademark Notice:</strong><br />
                HYROX® is a registered trademark of Upsolut Sports GmbH. The HYROX Journal is an independent media publication and is not affiliated with, sponsored by, or endorsed by Upsolut Sports GmbH.
              </p>
            </>
          )}
        </div>

        <div className="px-6 py-3 border-t border-white/10 bg-zinc-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-800 text-white rounded text-xs font-semibold hover:bg-zinc-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
