import { useState } from 'react';
import { AuthLayout } from './components/AuthLayout';
import { SignInForm } from './components/SignInForm';
import { SignUpForm } from './components/SignUpForm';
import { Dashboard } from './components/Dashboard';
import { LegalModal, PrivacyPolicyContent, TermsOfServiceContent } from './components/LegalModal';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [view, setView] = useState<'signin' | 'signup' | 'dashboard'>('signin');
  const [balance, setBalance] = useState<number>(0);
  const [legalModal, setLegalModal] = useState<{
    isOpen: boolean;
    type: 'privacy' | 'terms';
  }>({ isOpen: false, type: 'privacy' });

  const openPrivacy = () => setLegalModal({ isOpen: true, type: 'privacy' });
  const openTerms = () => setLegalModal({ isOpen: true, type: 'terms' });
  const closeLegal = () => setLegalModal(prev => ({ ...prev, isOpen: false }));
  
  const handleAuthSuccess = (initialBalance: number) => {
    setBalance(initialBalance);
    setView('dashboard');
  };
  const handleLogout = () => setView('signin');

  return (
    <>
      <AnimatePresence mode="wait">
        {view === 'signin' && (
          <motion.div
            key="signin"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <AuthLayout
              type="signin"
              title="Welcome back"
              subtitle="Please enter your details to sign in to your account."
              onToggle={() => setView('signup')}
            >
              <SignInForm onOpenPrivacy={openPrivacy} onSuccess={handleAuthSuccess} />
            </AuthLayout>
          </motion.div>
        )}
        
        {view === 'signup' && (
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AuthLayout
              type="signup"
              title="Create an account"
              subtitle="Join thousands of users and start building today."
              onToggle={() => setView('signin')}
            >
              <SignUpForm onOpenPrivacy={openPrivacy} onOpenTerms={openTerms} onSuccess={handleAuthSuccess} />
            </AuthLayout>
          </motion.div>
        )}

        {view === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Dashboard balance={balance} setBalance={setBalance} onLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>

      <LegalModal
        isOpen={legalModal.isOpen}
        onClose={closeLegal}
        title={legalModal.type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
        content={legalModal.type === 'privacy' ? <PrivacyPolicyContent /> : <TermsOfServiceContent />}
      />
    </>
  );
}
