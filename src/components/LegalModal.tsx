import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

export function LegalModal({ isOpen, onClose, title, content }: LegalModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl border border-zinc-200 flex flex-col pointer-events-auto overflow-hidden">
              <div className="p-6 border-bottom border-zinc-100 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-zinc-900">{title}</h2>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-500 hover:text-zinc-900"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto prose prose-zinc prose-sm max-w-none">
                {content}
              </div>
              
              <div className="p-6 border-t border-zinc-100 flex justify-end">
                <button
                  onClick={onClose}
                  className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition-all"
                >
                  Got it
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export const PrivacyPolicyContent = () => (
  <div className="space-y-4 text-zinc-600">
    <section>
      <h3 className="text-zinc-900 font-semibold">1. Information We Collect</h3>
      <p>We collect information you provide directly to us, such as when you create or modify your account, request customer support, or otherwise communicate with us.</p>
    </section>
    <section>
      <h3 className="text-zinc-900 font-semibold">2. How We Use Information</h3>
      <p>We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect our company and our users.</p>
    </section>
    <section>
      <h3 className="text-zinc-900 font-semibold">3. Information Sharing</h3>
      <p>We do not share your personal information with companies, organizations, or individuals outside of our company except in the following cases: with your consent, for external processing, or for legal reasons.</p>
    </section>
    <section>
      <h3 className="text-zinc-900 font-semibold">4. Data Security</h3>
      <p>We use reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
    </section>
  </div>
);

export const TermsOfServiceContent = () => (
  <div className="space-y-4 text-zinc-600">
    <section>
      <h3 className="text-zinc-900 font-semibold">1. Acceptance of Terms</h3>
      <p>By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
    </section>
    <section>
      <h3 className="text-zinc-900 font-semibold">2. Use License</h3>
      <p>Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.</p>
    </section>
    <section>
      <h3 className="text-zinc-900 font-semibold">3. Disclaimer</h3>
      <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties.</p>
    </section>
    <section>
      <h3 className="text-zinc-900 font-semibold">4. Limitations</h3>
      <p>In no event shall we or our suppliers be liable for any damages arising out of the use or inability to use the materials on our website.</p>
    </section>
  </div>
);
