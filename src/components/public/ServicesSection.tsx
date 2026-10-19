import React, { useState } from 'react';
import { SERVICES_LIST } from '../../data/mockData';
import { ServiceItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  Globe, 
  ShoppingCart, 
  Smartphone, 
  RefreshCw, 
  Cloud, 
  Wrench, 
  Compass, 
  ArrowRight, 
  Check, 
  X,
  Sparkles,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Globe,
  ShoppingCart,
  Smartphone,
  RefreshCw,
  Cloud,
  Wrench,
  Compass,
};

export const ServicesSection: React.FC = () => {
  const { openQuoteForService } = useApp();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleOrderSite = (serviceTitle: string) => {
    openQuoteForService(serviceTitle);
  };

  return (
    <section id="services" className="py-16 sm:py-20 bg-white text-slate-900 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold text-[#00A651] uppercase tracking-wider">
              NOS SERVICES DIGITAUX
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-1">
              Commandez votre site web ou application
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Choisissez le type de site que vous souhaitez que Sunu Tech Groupe réalise pour vous. Remplissez votre devis personnalisé, transmettez-le via WhatsApp et validez votre commande en toute sécurité.
            </p>
          </div>

          <button
            onClick={() => openQuoteForService()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 hover:bg-[#00A651] text-[#00A651] hover:text-white border border-emerald-300 text-xs font-bold transition-all cursor-pointer group shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Devis personnalisé général</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((service) => {
            const Icon = iconMap[service.iconName] || Globe;

            return (
              <div
                key={service.id}
                className="bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between group"
              >
                <div>
                  {/* Top Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#00A651] group-hover:bg-[#00A651] group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/80">
                      Dès {service.startingPrice.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-[#00A651] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 space-y-2.5 mt-auto">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Acompte requis : <strong className="text-[#00A651]">50%</strong></span>
                    <button
                      onClick={() => setSelectedService(service)}
                      className="text-slate-600 hover:text-[#00A651] font-semibold underline underline-offset-2 cursor-pointer"
                    >
                      Détails de l'offre
                    </button>
                  </div>

                  {/* Primary Order Button */}
                  <button
                    onClick={() => handleOrderSite(service.title)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Commander ce site</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered CTA button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => openQuoteForService()}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/20 transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Commander mon site web personnalisé</span>
          </button>
        </div>

      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200 text-slate-900">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#00A651]">
                {React.createElement(iconMap[selectedService.iconName] || Globe, { className: 'w-6 h-6' })}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedService.title}</h3>
                <p className="text-xs text-[#00A651] font-mono font-semibold">Délai estimé : {selectedService.deliveryTime}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              {selectedService.fullDescription}
            </p>

            <div className="space-y-2 mb-6">
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Ce qui est inclus :</p>
              <div className="grid grid-cols-1 gap-2 pt-1">
                {selectedService.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-[#00A651] flex items-center justify-center text-[10px] shrink-0 font-bold">
                      ✓
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
              <div>
                <p className="text-[11px] text-slate-500">Tarif de base</p>
                <p className="text-lg font-black text-slate-900 font-mono">
                  {selectedService.startingPrice.toLocaleString('fr-FR')} FCFA
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-slate-500">Acompte à la commande</p>
                <p className="text-xs font-bold text-[#00A651]">50% au lancement</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  const srv = selectedService.title;
                  setSelectedService(null);
                  openQuoteForService(srv);
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Commander ce site & Remplir le devis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
