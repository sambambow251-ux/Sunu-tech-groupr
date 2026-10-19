import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { COMPANY_PHONE, COMPANY_PHONE_RAW } from '../../data/mockData';

export const CtaBanner: React.FC = () => {
  const { setIsQuoteModalOpen } = useApp();

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${COMPANY_PHONE_RAW}?text=Bonjour%20Sunu%20Tech%20Groupe,%20je%20souhaite%20lancer%20un%20projet%20digital.`, '_blank');
  };

  return (
    <section className="py-14 sm:py-16 bg-[#080d0b] border-b border-emerald-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl overflow-hidden border border-emerald-900/60 p-8 sm:p-12 lg:p-16 shadow-2xl bg-gradient-to-br from-[#0c1913] to-[#080f0c] text-white">
          {/* Background image & gradient */}
          <div className="absolute inset-0 z-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80"
              alt="Bureaux Sunu Tech"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Emerald accent radial */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[100px] pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 max-w-3xl">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-emerald-400 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PRÊT À LANCER VOTRE PROJET ?</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
              Vous avez un projet digital ? <br className="hidden sm:inline" />
              <span className="text-[#00A651]">Construisons-le ensemble.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-2xl leading-relaxed">
              Présentez-nous votre idée et découvrons ensemble la solution numérique adaptée à vos objectifs et à votre budget.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 mt-8">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Demander un devis</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppClick}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#00A651]" />
                <span>WhatsApp : {COMPANY_PHONE}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
