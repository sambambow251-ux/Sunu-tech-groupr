import React from 'react';
import { Sparkles, Compass, CheckCircle2, Smartphone, ShieldCheck, MessageSquare } from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const benefits = [
    {
      icon: Sparkles,
      title: 'Solutions sur mesure',
      desc: 'Adaptées à vos besoins et objectifs.',
    },
    {
      icon: Compass,
      title: 'Suivi personnalisé',
      desc: 'De la commande à la livraison.',
    },
    {
      icon: CheckCircle2,
      title: 'Paiements clairs',
      desc: 'Conditions commerciales transparentes (acompte 50%).',
    },
    {
      icon: Smartphone,
      title: 'Interfaces responsives',
      desc: 'Parfaites sur smartphone, tablette et ordinateur.',
    },
    {
      icon: ShieldCheck,
      title: 'Accompagnement technique',
      desc: 'Toujours à vos côtés depuis Dakar.',
    },
    {
      icon: MessageSquare,
      title: 'Communication claire',
      desc: 'Une équipe disponible et réactive par téléphone et WhatsApp.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#0B0F0E] border-b border-emerald-950/60 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Container matching Image 3 */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0f1b16] to-[#0c1411] border border-emerald-900/50 p-6 sm:p-10 lg:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#00A651] uppercase tracking-wider">
              POURQUOI NOUS CHOISIR ?
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-1">
              Votre partenaire digital de confiance
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Nous allions rigueur technique et expertise locale sénégalaise pour propulser votre entreprise sur internet.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Mockup Images */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Laptop container preview */}
                <div className="rounded-2xl overflow-hidden border border-emerald-500/30 shadow-2xl bg-slate-900 aspect-16/10 relative">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                    alt="Plateforme Sunu Tech"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#0B0F0E]/30" />
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-sm border border-emerald-500/30 text-[11px] font-bold text-white flex items-center gap-2 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#00A651]" />
                    <span>Déploiement haute performance</span>
                  </div>
                </div>

                {/* Floating Mobile Phone Mockup */}
                <div className="absolute -bottom-5 -right-3 w-32 sm:w-40 aspect-9/18 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl bg-black hidden sm:block">
                  <img
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80"
                    alt="Application mobile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right: 6 Benefits Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-4 rounded-xl bg-[#14201b]/60 border border-emerald-950/80 hover:border-emerald-500/30 transition-all hover:bg-[#182621]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/40 flex items-center justify-center text-[#00A651] shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {b.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
