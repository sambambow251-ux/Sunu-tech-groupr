import React from 'react';
import { MessageSquare, FileText, CreditCard, Code, Rocket } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      stepNumber: 1,
      icon: MessageSquare,
      title: 'Présentation du projet',
      desc: 'Vous décrivez votre besoin via le formulaire ou lors d\'un échange direct avec notre équipe.',
    },
    {
      stepNumber: 2,
      icon: FileText,
      title: 'Étude et devis',
      desc: 'Nous analysons votre projet et vous proposons un devis clair et une solution technique adaptée.',
    },
    {
      stepNumber: 3,
      icon: CreditCard,
      title: 'Validation et acompte',
      desc: 'Vous validez le devis et versez l\'acompte convenu (50%) pour initier la phase de production.',
    },
    {
      stepNumber: 4,
      icon: Code,
      title: 'Conception et développement',
      desc: 'Nous créons, intégrons, testons sur mobile, tablette et ordinateur puis nous vous présentons le résultat.',
    },
    {
      stepNumber: 5,
      icon: Rocket,
      title: 'Livraison',
      desc: 'Après les ajustements, vous réglez le solde, recevez tous vos accès et votre site est en ligne.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 text-slate-900 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#00A651] uppercase tracking-wider">
            NOTRE PROCESSUS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-1">
            Comment travaillons-nous ?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Un processus simple et transparent pour la réussite de votre projet.
          </p>
        </div>

        {/* 5 Steps Grid on white background */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.stepNumber}
                className="bg-white border border-slate-200 hover:border-emerald-500/50 rounded-2xl p-5 relative flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md group shadow-xs"
              >
                {/* Step badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#00A651] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    {st.stepNumber}
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50 text-[#00A651]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2 group-hover:text-[#00A651] transition-colors">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] text-emerald-800 font-semibold">
                  <span>Étape {st.stepNumber}/5</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
