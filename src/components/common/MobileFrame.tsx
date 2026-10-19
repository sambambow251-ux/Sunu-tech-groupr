import React from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';
import { 
  Home, 
  ShoppingBag, 
  FileText, 
  User, 
  Plus, 
  Search, 
  X
} from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const { 
    isMobileMockup, 
    setIsMobileMockup, 
    viewMode, 
    setViewMode, 
    activeClientTab, 
    setActiveClientTab,
    requireAuthFor 
  } = useApp();

  if (!isMobileMockup) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-900/90 py-4 sm:py-6 px-2 sm:px-4 flex flex-col items-center justify-center">
      
      {/* Mobile top controls */}
      <div className="w-full max-w-[420px] mb-3 flex items-center justify-between text-xs text-white">
        <span className="font-bold text-emerald-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#00A651] animate-ping" />
          Aperçu Smartphone Réactif (Maquette 100% conforme)
        </span>
        <button
          onClick={() => setIsMobileMockup(false)}
          className="flex items-center gap-1 text-slate-300 hover:text-white px-2.5 py-1 rounded-md bg-white/10 cursor-pointer text-[11px] font-semibold"
        >
          <X className="w-3.5 h-3.5" />
          <span>Fermer aperçu</span>
        </button>
      </div>

      {/* Realistic Mobile Device Mockup */}
      <div className="w-full max-w-[400px] h-[780px] bg-white rounded-[44px] border-[10px] border-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col relative text-slate-900">
        
        {/* Dynamic Island / Notch */}
        <div className="h-6 bg-slate-950 flex items-center justify-center shrink-0">
          <div className="w-24 h-4 bg-slate-800 rounded-full" />
        </div>

        {/* Mobile Header matching Image 1 bottom right */}
        <div className="px-4 py-2.5 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 shadow-xs">
          <Logo size="sm" variant="dark" />
          <div className="flex items-center gap-2">
            <button 
              onClick={() => requireAuthFor('client')}
              className="p-1.5 text-slate-600 hover:text-[#00A651]"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Mobile Body */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50/50">
          {children}
        </div>

        {/* Mobile Bottom Navigation Bar matching Image 1 bottom right */}
        <nav className="h-16 bg-white border-t border-slate-200 px-4 flex items-center justify-around shrink-0 shadow-lg">
          <button
            onClick={() => { setViewMode('public'); }}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
              viewMode === 'public' ? 'text-[#00A651]' : 'text-slate-500'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Accueil</span>
          </button>

          <button
            onClick={() => { requireAuthFor('client'); setActiveClientTab('orders'); }}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
              viewMode === 'client' && activeClientTab === 'orders' ? 'text-[#00A651]' : 'text-slate-500'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Commandes</span>
          </button>

          <button
            onClick={() => { requireAuthFor('client'); setActiveClientTab('new-order'); }}
            className="flex flex-col items-center -mt-5"
          >
            <div className="w-11 h-11 rounded-full bg-[#00A651] text-white flex items-center justify-center shadow-lg shadow-emerald-500/40">
              <Plus className="w-5 h-5" />
            </div>
          </button>

          <button
            onClick={() => { requireAuthFor('client'); setActiveClientTab('invoices'); }}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
              viewMode === 'client' && activeClientTab === 'invoices' ? 'text-[#00A651]' : 'text-slate-500'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Factures</span>
          </button>

          <button
            onClick={() => { requireAuthFor('client'); setActiveClientTab('profile'); }}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
              viewMode === 'client' && activeClientTab === 'profile' ? 'text-[#00A651]' : 'text-slate-500'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profil</span>
          </button>
        </nav>

        {/* Home Indicator line */}
        <div className="h-3 bg-white flex items-center justify-center shrink-0">
          <div className="w-32 h-1 bg-slate-300 rounded-full" />
        </div>

      </div>

    </div>
  );
};
