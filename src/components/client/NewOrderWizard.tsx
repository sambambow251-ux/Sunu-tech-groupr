import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SiteType } from '../../types';
import { Check, ArrowRight, ArrowLeft, Calendar, FileText, CheckCircle2, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';

export const NewOrderWizard: React.FC = () => {
  const { addOrder, setActiveClientTab, setIsDepositModalOpen, setSelectedOrderForDeposit } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [siteType, setSiteType] = useState<SiteType>('Site vitrine');
  const [siteName, setSiteName] = useState<string>('MonEntreprise');
  const [description, setDescription] = useState<string>('');
  const [deliveryDate, setDeliveryDate] = useState<string>('20/10/2026');
  
  const [targetAudience, setTargetAudience] = useState<string>('Particuliers & Entreprises au Sénégal');
  const [primaryColor, setPrimaryColor] = useState<string>('Vert Émeraude & Blanc Moderne');

  const basePrices: Record<SiteType, number> = {
    'Site vitrine': 150000,
    'Site e-commerce': 300000,
    'Site institutionnel': 500000,
    'Application web & mobile': 750000,
    'Refonte de site': 120000,
    'Hébergement & nom de domaine': 50000,
    'Sur mesure': 400000,
  };

  const estimatedPrice = basePrices[siteType] || 150000;
  const depositPrice = Math.round(estimatedPrice * 0.5);

  const steps = [
    { num: 1, label: 'Informations' },
    { num: 2, label: 'Détails du site' },
    { num: 3, label: 'Récapitulatif' },
    { num: 4, label: 'Confirmation' },
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 3) {
      const newOrder = addOrder({
        siteName: siteName || 'MonEntreprise',
        type: siteType,
        amount: estimatedPrice,
        deliveryDate: deliveryDate || '20/10/2026',
        description: description || `Commande de ${siteType}`,
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setSelectedOrderForDeposit(newOrder);
      setCurrentStep(4);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          Nouvelle commande
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Créez un nouveau projet digital en quelques étapes simples
        </p>
      </div>

      {/* Stepper matching Image 1 */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {steps.map((st, idx) => {
            const isCompleted = currentStep > st.num;
            const isCurrent = currentStep === st.num;

            return (
              <React.Fragment key={st.num}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCompleted
                        ? 'bg-emerald-100 text-[#00A651] border border-emerald-300'
                        : isCurrent
                        ? 'bg-[#00A651] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isCompleted ? '✓' : st.num}
                  </div>
                  <span
                    className={`text-xs font-bold hidden sm:inline ${
                      isCurrent
                        ? 'text-slate-900 font-black'
                        : isCompleted
                        ? 'text-slate-700'
                        : 'text-slate-400'
                    }`}
                  >
                    {st.label}
                  </span>
                </div>

                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 sm:mx-4 ${
                      currentStep > st.num ? 'bg-[#00A651]' : 'bg-slate-200'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Wizard Form Grid */}
      {currentStep < 4 ? (
        <form onSubmit={handleNext}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left / Center form container (8 cols) */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 space-y-5 shadow-xs">
              
              {currentStep === 1 && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Type de site <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={siteType}
                      onChange={e => setSiteType(e.target.value as SiteType)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651] cursor-pointer"
                    >
                      <option value="Site vitrine">Site vitrine</option>
                      <option value="Site e-commerce">Site e-commerce</option>
                      <option value="Site institutionnel">Site institutionnel</option>
                      <option value="Application web & mobile">Application web & mobile</option>
                      <option value="Refonte de site">Refonte de site</option>
                      <option value="Hébergement & nom de domaine">Hébergement & nom de domaine</option>
                      <option value="Sur mesure">Sur mesure</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Nom du site <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={siteName}
                      onChange={e => setSiteName(e.target.value)}
                      placeholder="ex : MonEntreprise"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Description / Fonctionnalités <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="Décrivez votre projet (pages, design, fonctionnalités...)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Date souhaitée de livraison <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={deliveryDate}
                        onChange={e => setDeliveryDate(e.target.value)}
                        placeholder="20/10/2026"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651]"
                      />
                      <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">Précisions techniques & design</h3>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Public cible & audience
                    </label>
                    <input
                      type="text"
                      value={targetAudience}
                      onChange={e => setTargetAudience(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Ambiance graphique souhaitée
                    </label>
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={e => setPrimaryColor(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651]"
                    />
                  </div>

                  <div className="pt-2">
                    <p className="text-xs font-bold text-slate-700 mb-2">Modules optionnels souhaités :</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {['Paiement Wave & OM', 'Formulaire devis', 'Module WhatsApp', 'Blog / Actualités', 'Espace Membre', 'Multi-langue'].map(mod => (
                        <label key={mod} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 cursor-pointer">
                          <input type="checkbox" defaultChecked className="accent-[#00A651]" />
                          <span className="font-medium">{mod}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">Validation de votre demande</h3>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                    <p><span className="text-slate-500">Nom du site :</span> <strong className="text-slate-900">{siteName}</strong></p>
                    <p><span className="text-slate-500">Type de prestation :</span> <strong className="text-[#00A651]">{siteType}</strong></p>
                    <p><span className="text-slate-500">Livraison estimée :</span> <strong className="text-slate-900">{deliveryDate}</strong></p>
                    <p><span className="text-slate-500">Description :</span> <span className="text-slate-700">{description || 'Création conforme'}</span></p>
                  </div>
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-medium">
                    Un acompte légal de 50% ({depositPrice.toLocaleString('fr-FR')} FCFA) sera émis pour démarrer la production dès validation.
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Précédent</span>
                  </button>
                ) : <div />}

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/25 transition-all cursor-pointer"
                >
                  <span>{currentStep === 3 ? 'Confirmer la commande' : 'Continuer'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Right Card: Récapitulatif matching Image 1 */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900">
                Récapitulatif
              </h3>

              <div className="space-y-3 text-xs border-y border-slate-100 py-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Type de site :</span>
                  <span className="font-bold text-slate-900">{siteType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Prix estimé :</span>
                  <span className="font-mono font-black text-slate-900">
                    {estimatedPrice.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Acompte initial (50%) :</span>
                  <span className="font-mono font-black text-[#00A651]">
                    {depositPrice.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Suivant</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </form>
      ) : (
        /* Confirmation Screen */
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#00A651] border border-emerald-200 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="text-xl font-black text-slate-900">Commande enregistrée avec succès !</h2>
          <p className="text-xs text-slate-600">
            Votre commande pour le site <strong>{siteName}</strong> a été transmise à l'équipe technique de Sunu Tech Groupe.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left space-y-1">
            <p><span className="text-slate-500">Prestation :</span> <strong>{siteType}</strong></p>
            <p><span className="text-slate-500">Montant total :</span> <strong className="font-mono">{estimatedPrice.toLocaleString('fr-FR')} FCFA</strong></p>
            <p><span className="text-slate-500">Acompte à régler :</span> <strong className="font-mono text-[#00A651] font-black">{depositPrice.toLocaleString('fr-FR')} FCFA</strong></p>
            <p><span className="text-slate-500">Date cible :</span> <strong>{deliveryDate}</strong></p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setIsDepositModalOpen(true)}
              className="flex-1 py-3 px-4 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Générer facture d'acompte</span>
            </button>

            <button
              onClick={() => setActiveClientTab('orders')}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-all cursor-pointer"
            >
              Voir mes commandes
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
