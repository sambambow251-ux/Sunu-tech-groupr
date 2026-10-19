import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { useApp } from '../../context/AppContext';
import { Menu, X, ArrowRight, User, Lock, Phone, MessageCircle, ShieldCheck } from 'lucide-react';
import { COMPANY_PHONE, COMPANY_PHONE_RAW } from '../../data/mockData';

interface PublicHeaderProps {
  onNavigate: (sectionId: string) => void;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({ onNavigate }) => {
  const { requireAuthFor, setIsQuoteModalOpen, isAuthenticated, currentUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Accueil', id: 'hero' },
    { label: 'Services', id: 'services' },
    { label: 'Réalisations', id: 'realisations' },
    { label: 'À propos', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F0E]/95 backdrop-blur-md border-b border-emerald-950/60 shadow-lg transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Exact Logo matching uploaded image (light text on dark green) */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="cursor-pointer transition-transform hover:scale-[1.02]"
        >
          <Logo size="md" variant="light" />
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-[#00A651] transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Direct Phone / WhatsApp pill */}
          <a
            href={`https://wa.me/${COMPANY_PHONE_RAW}?text=Bonjour%20Sunu%20Tech%20Groupe,%20je%20souhaite%20un%20devis.`}
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all"
            title="Assistance WhatsApp direct"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#00A651]" />
            <span>{COMPANY_PHONE}</span>
          </a>

          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#00A651] hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-[0_2px_12px_rgba(0,166,81,0.35)] cursor-pointer"
          >
            <span>Demander un devis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Accès sécurisé confidentiel sous format d'icône discrète (Sans texte 'Espace client') */}
          <button
            onClick={() => requireAuthFor('client')}
            aria-label="Accès sécurisé"
            title={isAuthenticated ? `Session active : ${currentUser.name}` : "Accès sécurisé"}
            className="w-10 h-10 rounded-xl bg-[#131d19] hover:bg-[#1b2a24] text-emerald-400 hover:text-white border border-emerald-900/60 hover:border-emerald-500/50 transition-all cursor-pointer flex items-center justify-center shadow-xs group"
          >
            {isAuthenticated ? (
              <User className="w-4 h-4 text-[#00A651] group-hover:scale-110 transition-transform" />
            ) : (
              <Lock className="w-4 h-4 text-[#00A651] group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => requireAuthFor('client')}
            className="w-9 h-9 rounded-xl bg-[#131d19] text-emerald-400 border border-emerald-900/60 flex items-center justify-center cursor-pointer"
            title="Accès sécurisé"
            aria-label="Accès sécurisé"
          >
            {isAuthenticated ? <User className="w-4 h-4 text-[#00A651]" /> : <Lock className="w-4 h-4 text-[#00A651]" />}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer (Responsive Smartphone / Tablette) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1513] border-b border-emerald-900/60 px-5 py-4 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left py-2.5 text-sm font-bold text-slate-200 hover:text-[#00A651] border-b border-emerald-950/80"
            >
              {item.label}
            </button>
          ))}

          <div className="pt-3 border-t border-emerald-950 flex flex-col gap-2.5">
            <a
              href={`https://wa.me/${COMPANY_PHONE_RAW}?text=Bonjour%20Sunu%20Tech%20Groupe`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-bold text-center flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#00A651]" />
              <span>WhatsApp : {COMPANY_PHONE}</span>
            </a>

            <button
              onClick={() => { setIsQuoteModalOpen(true); setMobileMenuOpen(false); }}
              className="w-full py-3 rounded-xl bg-[#00A651] text-white text-xs font-bold text-center shadow-md cursor-pointer"
            >
              Demander un devis en ligne
            </button>

            <button
              onClick={() => { requireAuthFor('client'); setMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-xl bg-[#131d19] text-slate-400 hover:text-emerald-400 text-xs font-semibold text-center border border-emerald-950/80 shadow-xs cursor-pointer flex items-center justify-center gap-2 transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-[#00A651]" />
              <span>Accès sécurisé</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
