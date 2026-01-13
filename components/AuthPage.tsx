
import React, { useState } from 'react';
import { Leaf, Mail, Lock, User, ArrowRight, Github } from 'lucide-react';

interface AuthPageProps {
  onAuthComplete: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthComplete }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthComplete();
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[50px] overflow-hidden shadow-2xl border border-emerald-100">
        
        {/* Left Side: Illustration/Text */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-emerald-600 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12">
              <Leaf className="w-8 h-8" />
              <span className="text-2xl font-black">The Herb</span>
            </div>
            <h2 className="text-4xl font-black mb-6 leading-tight">Welcome back to your local pharmacy portal.</h2>
            <p className="text-emerald-100/80 leading-relaxed text-lg">
              Manage your health, your stock, and your peer network with the most advanced pharmacy platform ever built.
            </p>
          </div>
          <div className="relative z-10">
            <p className="text-sm font-bold text-emerald-200/60 uppercase tracking-widest">Trusted by 500+ Chemists</p>
          </div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-20 -left-20 w-60 h-60 bg-emerald-400/20 rounded-full blur-2xl" />
        </div>

        {/* Right Side: Form */}
        <div className="p-10 lg:p-20 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full space-y-8">
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-slate-900">{isLogin ? 'Log In' : 'Sign Up'}</h3>
              <p className="text-slate-400 text-sm font-medium">
                {isLogin ? "Don't have an account?" : "Already have an account?"} 
                <button onClick={() => setIsLogin(!isLogin)} className="text-emerald-600 font-bold ml-1 hover:underline">
                  {isLogin ? 'Sign up for free' : 'Log in here'}
                </button>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                    <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" required />
                  </div>
                </div>
              )}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  <input type="email" placeholder="name@company.com" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" required />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                  <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" required />
                </div>
              </div>

              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-100 transition-all flex items-center justify-center gap-2 group">
                {isLogin ? 'Log In' : 'Create Account'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-300 font-bold tracking-widest">Or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors font-bold text-slate-600 text-sm">
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="google" />
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors font-bold text-slate-600 text-sm">
                <Github className="w-4 h-4" />
                Github
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
