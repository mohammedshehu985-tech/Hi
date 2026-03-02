import React from 'react';
import { motion } from 'motion/react';
import { LogIn, UserPlus } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  type: 'signin' | 'signup';
  onToggle: () => void;
}

export function AuthLayout({ children, title, subtitle, type, onToggle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
          <div className="p-8 pb-0">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
              {type === 'signin' ? (
                <LogIn className="text-white w-6 h-6" />
              ) : (
                <UserPlus className="text-white w-6 h-6" />
              )}
            </div>
            <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">{title}</h1>
            <p className="text-zinc-500 mt-2 text-sm">{subtitle}</p>
          </div>
          
          <div className="p-8">
            {children}
            
            <div className="mt-8 pt-6 border-t border-zinc-100 text-center">
              <p className="text-sm text-zinc-600">
                {type === 'signin' ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  onClick={onToggle}
                  className="font-medium text-blue-600 hover:underline underline-offset-4 transition-all"
                >
                  {type === 'signin' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-center mt-8 text-xs text-zinc-400 uppercase tracking-widest font-medium">
          &copy; 2026 AuthFlow Inc.
        </p>
      </motion.div>
    </div>
  );
}
