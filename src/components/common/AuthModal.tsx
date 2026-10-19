import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  KeyRound, 
  Smartphone,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_EMAIL } from '../../data/mockData';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authTargetRole, 
    setAuthTargetRole, 
    login 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'client' | 'admin'>(authTargetRole);
  const [email, setEmail] = useState<string>(authTargetRole === 'client' ? 'sambambow251@gmail.com' : COMPANY_EMAIL);
  const [password, setPassword] = useState<string>('••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [resetSent, setResetSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Sync tab with authTargetRole
  React.useEffect(() => {
    setActiveTab(authTargetRole);
    if (authTargetRole === 'client') {
      setEmail('sambambow251@gmail.com');
    } else {
      setEmail(COMPANY_EMAIL);
    }
  }, [authTargetRole]);

  if (!isAuthModalOpen) return null;

  const handleTabChange = (tab: 'client' | 'admin') => {
    setActiveTab(tab);
    setAuthTargetRole(tab);
    if (tab === 'client') {
      setEmail('sambambow251@gmail.com');
      setPassword('client123');
    } else {
      setEmail(COMPANY_EMAIL);
      setPassword('admin2026');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      login(email, password, activeTab);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
      setLoading(false);
    }, 600);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setIsForgotPassword(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header with Stacked Logo */}
        <div className="pt-8 pb-4 px-6 text-center border-b border-slate-100 bg-slate-50/70">
          <Logo layout="stacked" size="md" showSubtitle={false} />
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold mt-4 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00A651]" />
            <span>Portail de connexion sécurisé SSL 256-bit</span>
          </div>
        </div>

        {/* Tab Switcher: Client vs Admin */}
        <div className="p-6">
          {!isForgotPassword ? (
            <>
              <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl mb-6">
                <button
                  type="button"
                  onClick={() => handleTabChange('client')}
                  className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    activeTab === 'client'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Espace Client
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange('admin')}
                  className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    activeTab === 'admin'
                      ? 'bg-white text-emerald-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Administration
                </button>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Adresse email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="votre-email@domaine.com"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651] focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">
                      Mot de passe
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651] focus:ring-2 focus:ring-emerald-500/20 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="rounded text-[#00A651] focus:ring-emerald-500"
                    />
                    <span>Garder ma session active</span>
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-[#00A651] hover:bg-emerald-600 active:scale-[0.99] text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {loading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Se connecter en tant que {activeTab === 'client' ? 'Client' : 'Administrateur'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                {/* Fast One-Click Test Logins */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
                    Accès rapide démonstration :
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        handleTabChange('client');
                        login('sambambow251@gmail.com', 'client123', 'client');
                      }}
                      className="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-left transition-colors cursor-pointer"
                    >
                      <p className="text-[11px] font-bold text-slate-800">Compte Samba Mbow</p>
                      <p className="text-[10px] text-emerald-700 font-mono">Client Espace</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleTabChange('admin');
                        login(COMPANY_EMAIL, 'admin2026', 'admin');
                      }}
                      className="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-left transition-colors cursor-pointer"
                    >
                      <p className="text-[11px] font-bold text-slate-800">Direction Sunu Tech</p>
                      <p className="text-[10px] text-emerald-700 font-mono">Administration</p>
                    </button>
                  </div>
                </div>

              </form>
            </>
          ) : (
            /* Forgot Password Sub-view */
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                Réinitialisation sécurisée du mot de passe
              </h3>
              <p className="text-xs text-slate-600">
                Saisissez votre adresse email enregistrée. Un lien d'authentification à usage unique vous sera expédié.
              </p>

              {resetSent ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#00A651] mx-auto" />
                  <p className="text-xs font-bold text-emerald-900">Email de réinitialisation envoyé !</p>
                  <p className="text-[11px] text-emerald-700">Consultez votre boîte de réception.</p>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#00A651] text-white font-bold text-xs"
                  >
                    Envoyer le lien de réinitialisation
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(false)}
                    className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    Retour à la connexion
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Security Guarantee Footer */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#00A651]" />
              Connexion chiffrée SSL / TLS
            </span>
            <span>Sunu Tech Groupe • Dakar</span>
          </div>

        </div>

      </div>
    </div>
  );
};
