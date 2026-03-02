import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface SignInFormProps {
  onOpenPrivacy: () => void;
  onSuccess: (balance: number) => void;
}

export function SignInForm({ onOpenPrivacy, onSuccess }: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSuccess(10); // Users get 10 GHS on sign in/up
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
        <div className="flex justify-between items-center px-1">
          <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Password
          </label>
          <button type="button" className="text-xs font-medium text-zinc-400 hover:text-blue-600 transition-colors">
            Forgot?
          </button>
        </div>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-blue-600 transition-colors">
            <Lock size={18} />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            required
            placeholder="••••••••"
            className="block w-full pl-10 pr-10 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600/5 focus:border-blue-600 transition-all text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-blue-600 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
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
            Sign in
            <ArrowRight size={18} />
          </>
        )}
      </button>

      <p className="text-center text-xs text-zinc-400 mt-4">
        By signing in, you agree to our{' '}
        <button 
          type="button" 
          onClick={onOpenPrivacy}
          className="text-zinc-500 hover:text-blue-600 underline underline-offset-2 transition-colors"
        >
          Privacy Policy
        </button>
      </p>
    </form>
  );
}
