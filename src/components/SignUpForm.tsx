import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

interface SignUpFormProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onSuccess: (balance: number) => void;
}

export function SignUpForm({ onOpenPrivacy, onOpenTerms, onSuccess }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSuccess(10); // New user gets 10 GHS
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1">
          Full Name
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-blue-600 transition-colors">
            <User size={18} />
          </div>
          <input
            type="text"
            required
            placeholder="John Doe"
            className="block w-full pl-10 pr-3 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600/5 focus:border-blue-600 transition-all text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1">
          Email Address
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-blue-600 transition-colors">
            <Mail size={18} />
          </div>
          <input
            type="email"
            required
            placeholder="name@company.com"
            className="block w-full pl-10 pr-3 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600/5 focus:border-blue-600 transition-all text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1">
          Password
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-blue-600 transition-colors">
            <Lock size={18} />
          </div>
          <input
            type="password"
            required
            placeholder="••••••••"
            className="block w-full pl-10 pr-3 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600/5 focus:border-blue-600 transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex items-start gap-3 px-1">
        <div className="mt-1">
          <ShieldCheck size={16} className="text-zinc-400" />
        </div>
        <p className="text-xs text-zinc-500 leading-relaxed">
          By creating an account, you agree to our{' '}
          <button 
            type="button" 
            onClick={onOpenTerms}
            className="text-blue-600 font-medium hover:underline"
          >
            Terms of Service
          </button> and{' '}
          <button 
            type="button" 
            onClick={onOpenPrivacy}
            className="text-blue-600 font-medium hover:underline"
          >
            Privacy Policy
          </button>.
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            Create account
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}
