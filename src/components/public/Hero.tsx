import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Globe, Smartphone, Cog, Headphones, CheckCircle, MapPin } from 'lucide-react';
import { COMPANY_PHONE, COMPANY_PHONE_RAW } from '../../data/mockData';

interface HeroProps {
  onExploreServices: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreServices, onContactClick }) => {
  const { setIsQuoteModalOpen } = useApp();

  // 4 Feature Pillars strictly aligned with official Sunu Tech Groupe branding
  const featurePills = [
    {
      icon: Globe,
      title: 'Sites web vitrine & e-commerce',
      desc: 'Boutiques en ligne, vitrines modernes & catalogue',
    },
    {
      icon: Smartphone,
      title: 'Applications sur mesure',
      desc: 'Web & mobile adaptées à vos activités réelles',
    },
    {
      icon: Cog,
      title: 'Gestion & Automatisation',
      desc: 'Comptabilité, stocks, facturation & processus',
    },
    {
      icon: Headphones,
      title: 'Accompagnement & Support',
      desc: 'Formation, hébergement et maintenance continue',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#070B0A] pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 border-b border-emerald-950/50">
      
      {/* Background Graphic Image behind the text with refined dark overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/src/assets/images/sunu_tech_hero_branding_1792365397806.jpg"
          alt="Sunu Tech Groupe - Skyline Dakar & Digital Sénégal"
          className="w-full h-full object-cover object-center opacity-25 scale-105 filter blur-[1px] brightness-75 contrast-125"
          referrerPolicy="no-referrer"
        />
        {/* Layered gradients to guarantee 100% contrast & reading comfort */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070B0A] via-[#070B0A]/90 to-[#070B0A]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B0A] via-transparent to-[#070B0A]/80" />
      </div>

      {/* Emerald ambient radial lights */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-emerald-500/15 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-emerald-600/10 blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#102019]/90 backdrop-blur-md border border-emerald-500/35 text-emerald-400 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#00A651] animate-pulse" />
              <span className="font-bold tracking-wide">Sunu Tech Groupe</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Le partenaire de vos projets digitaux au Sénégal</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.14] tracking-tight">
              Des solutions digitales{' '}
              <span className="text-[#00A651] drop-shadow-[0_0_25px_rgba(0,166,81,0.4)] block sm:inline">
                pour un avenir meilleur.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Sunu Tech Groupe accompagne les entreprises, commerçants et entrepreneurs au Sénégal dans la création et le déploiement de leurs solutions numériques. De la conception de sites web à la maintenance et aux applications sur mesure, nous transformons vos ambitions en réussites concrètes.
            </p>

            {/* Action Button */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreServices}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#00A651] hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-[0_4px_20px_rgba(0,166,81,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Découvrir nos services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust checkmarks */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#00A651]" />
                Wave & Orange Money
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#00A651]" />
                Acomptes 50% conformes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#00A651]" />
                Support local Dakar : {COMPANY_PHONE}
              </span>
            </div>

          </div>

          {/* Right Column: Hero Visual with official Sunu Tech Groupe branding image (Fully visible, uncropped) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="w-full max-w-[440px] rounded-2xl overflow-hidden border border-emerald-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)] bg-[#070B0A] p-1.5 transition-all hover:border-emerald-400 group">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
                {/* Official Sunu Tech Key Visual Image - uncropped and 100% visible */}
                <img
                  src="/src/assets/images/sunu_tech_hero_branding_1792365397806.jpg"
                  alt="Sunu Tech Groupe - Le partenaire de vos projets digitaux au Sénégal"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Discreet caption bar below the image so it doesn't cover any part of the photo */}
              <div className="mt-2 px-2 pb-1 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 font-semibold text-emerald-400">
                  <MapPin className="w-3 h-3 text-[#00A651]" />
                  Dakar, Sénégal 🇸🇳
                </span>
                <span className="font-script text-sm text-emerald-300">
                  « Ensemble, construisons le digital »
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Feature Pillars Row matching user branding */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 sm:mt-16">
          {featurePills.map((pill, idx) => {
            const Icon = pill.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#0e1713]/85 backdrop-blur-md border border-emerald-950/80 hover:border-emerald-500/50 transition-all hover:bg-[#13221b] group cursor-default shadow-xs"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-950/80 border border-emerald-700/40 flex items-center justify-center text-[#00A651] group-hover:scale-110 group-hover:bg-[#00A651] group-hover:text-white transition-all shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                    {pill.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate">
                    {pill.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
