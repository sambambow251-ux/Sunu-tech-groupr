import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Globe, 
  UserCheck, 
  ShieldCheck, 
  Smartphone, 
  Monitor, 
  Tablet, 
  FileSpreadsheet, 
  RotateCcw, 
  Lock, 
  LogOut,
  Sun,
  Moon,
  Shield
} from 'lucide-react';
import { COMPANY_PHONE, COMPANY_EMAIL } from '../../data/mockData';

export const EnvironmentSwitcher: React.FC = () => {
  const { 
    viewMode, 
    setViewMode, 
    isMobileMockup, 
    setIsMobileMockup, 
    isDarkMode,
    setIsDarkMode,
    isAuthenticated,
    currentUser,
    logout,
    requireAuthFor,
    setIsDepositModalOpen,
    setIsAuthModalOpen,
    resetToDefaultData 
  } = useApp();

  return (
    <aside aria-label="Sélecteur d'environnement & Sécurité" className="no-print sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3 sm:px-6 py-2 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5 text-xs">
        
        {/* Environment mode buttons */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => { setViewMode('public'); setIsMobileMockup(false); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              viewMode === 'public'
                ? 'bg-[#00A651] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Site Public</span>
          </button>

          <button
            onClick={() => requireAuthFor('client')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              viewMode === 'client'
                ? 'bg-[#00A651] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Espace Client</span>
            <span className="sm:hidden">Client</span>
          </button>

          <button
            onClick={() => requireAuthFor('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              viewMode === 'admin'
                ? 'bg-[#00A651] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Administration</span>
            <span className="sm:hidden">Admin</span>
          </button>
        </div>

        {/* Security & Device Tools */}
        <div className="flex items-center gap-2">
          
          {/* Auth status badge */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2 bg-emerald-50 text-emerald-900 px-2.5 py-1 rounded-lg border border-emerald-200 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#00A651] animate-pulse" />
              <span>Session : {currentUser.name} ({currentUser.role})</span>
              <button
                onClick={logout}
                title="Déconnexion sécurisée"
                className="text-red-600 hover:text-red-800 ml-1 cursor-pointer"
              >
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3 text-[#00A651]" />
              <span>Connexion sécurisée</span>
            </button>
          )}

          {/* Mobile frame toggle */}
          <button
            onClick={() => setIsMobileMockup(!isMobileMockup)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-semibold border transition-colors cursor-pointer ${
              isMobileMockup
                ? 'bg-emerald-100 border-[#00A651] text-[#00A651]'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            title="Aperçu mobile smartphone conforme à la photo"
          >
            {isMobileMockup ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span className="hidden lg:inline">{isMobileMockup ? 'Vue Écran' : 'Aperçu Mobile'}</span>
          </button>

          {/* Quick Invoice Creator */}
          <button
            onClick={() => setIsDepositModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#00A651]" />
            <span>Facture d'acompte</span>
          </button>

          {/* Reset button */}
          <button
            onClick={resetToDefaultData}
            title="Réinitialiser les données de démo"
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
};
