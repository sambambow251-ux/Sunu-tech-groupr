import React from 'react';
import { Target, Lightbulb, Users2, Award, CheckCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-[#080d0b] border-b border-emerald-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Mission & Narrative */}
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-[#00A651] uppercase tracking-wider">
              À PROPOS DE NOUS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
              Une agence tech sénégalaise au service de votre croissance
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Fondée au Sénégal, <strong>Sunu Tech Groupe</strong> s'est donné pour mission de démocratiser l'accès aux technologies numériques de pointe pour les PME, commerçants, startups et institutions d'Afrique de l'Ouest.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Nous allions créativité graphique, robustesse technique et intégration transparente des modes de paiement locaux (Wave, Orange Money) pour vous offrir des outils qui génèrent une véritable valeur commerciale.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#121916] border border-emerald-950/80 shadow-md">
                <p className="text-2xl font-black text-[#00A651] font-mono">+120</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">Projets digitaux livrés</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#121916] border border-emerald-950/80 shadow-md">
                <p className="text-2xl font-black text-[#00A651] font-mono">99.2%</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">Satisfaction clients</p>
              </div>
            </div>
          </div>

          {/* Right Column: Values */}
          <div className="lg:col-span-6 space-y-3.5">
            <div className="p-5 rounded-2xl bg-[#121916] border border-emerald-950/80 flex items-start gap-4 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-[#00A651] shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Innovation continue</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Des technologies web modernes (React, Next, Tailwind) garantissant une vitesse de chargement instantanée sur mobile et ordinateur.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#121916] border border-emerald-950/80 flex items-start gap-4 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-[#00A651] shrink-0">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Pragmatisme & Clarté</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Pas de jargon incompréhensible ni de frais cachés. Un cahier des charges clair, des acomptes 50% transparents et des livraisons garanties dans les temps.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#121916] border border-emerald-950/80 flex items-start gap-4 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-[#00A651] shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Accompagnement de proximité</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Une équipe joignable directement par téléphone et WhatsApp à Dakar pour répondre à chaque étape de votre évolution.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
