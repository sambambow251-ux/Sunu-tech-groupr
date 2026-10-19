import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SiteType } from '../../types';
import { 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  MessageCircle, 
  Smartphone, 
  CreditCard,
  Calendar,
  User,
  Clock,
  Copy,
  Check,
  Send,
  Building,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_PHONE, COMPANY_PHONE_RAW } from '../../data/mockData';

export const QuoteModal: React.FC = () => {
  const { 
    isQuoteModalOpen, 
    setIsQuoteModalOpen, 
    selectedServiceForQuote,
    setSelectedServiceForQuote,
    addOrder, 
    currentUser 
  } = useApp();

  // Wizard Steps:
  // 'form' -> Remplir le devis personnalisé
  // 'sent_to_whatsapp' -> Message automatique de confirmation : la discussion se fait sur WhatsApp, et c'est l'entreprise qui valide l'acompte
  const [currentStep, setCurrentStep] = useState<'form' | 'sent_to_whatsapp'>('form');

  // Form Fields
  const [clientName, setClientName] = useState<string>(currentUser?.name || '');
  const [clientPhone, setClientPhone] = useState<string>(currentUser?.phone || '');
  const [clientEmail, setClientEmail] = useState<string>(currentUser?.email || '');
  const [siteType, setSiteType] = useState<SiteType>('Site vitrine');
  const [siteName, setSiteName] = useState<string>('');
  const [hasEcommerce, setHasEcommerce] = useState<boolean>(false);
  const [hasWaveOM, setHasWaveOM] = useState<boolean>(true);
  const [hasMaintenance, setHasMaintenance] = useState<boolean>(true);
  const [deliveryDate, setDeliveryDate] = useState<string>('20/10/2026');
  const [description, setDescription] = useState<string>('');

  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);
  const [finalProjectName, setFinalProjectName] = useState<string>('');
  const [finalDeposit, setFinalDeposit] = useState<number>(0);
  const [sentTimestamp, setSentTimestamp] = useState<string>('');
  const [createdOrderId, setCreatedOrderId] = useState<string>('');

  // Synchronize preselected service when opened from ServicesSection
  useEffect(() => {
    if (selectedServiceForQuote) {
      if (selectedServiceForQuote.toLowerCase().includes('e-commerce')) {
        setSiteType('Site e-commerce');
        setHasEcommerce(true);
      } else if (selectedServiceForQuote.toLowerCase().includes('application')) {
        setSiteType('Application web & mobile');
      } else if (selectedServiceForQuote.toLowerCase().includes('institutionnel')) {
        setSiteType('Site institutionnel');
      } else if (selectedServiceForQuote.toLowerCase().includes('refonte')) {
        setSiteType('Refonte de site');
      } else if (selectedServiceForQuote.toLowerCase().includes('sur mesure')) {
        setSiteType('Sur mesure');
      } else {
        setSiteType('Site vitrine');
      }
    }
  }, [selectedServiceForQuote]);

  if (!isQuoteModalOpen) return null;

  // Real-time calculation in FCFA (No pages count)
  const basePrices: Record<SiteType, number> = {
    'Site vitrine': 150000,
    'Site e-commerce': 300000,
    'Site institutionnel': 500000,
    'Application web & mobile': 750000,
    'Refonte de site': 120000,
    'Hébergement & nom de domaine': 50000,
    'Sur mesure': 400000,
  };

  let estimatedTotal = basePrices[siteType] || 150000;
  if (hasEcommerce && siteType !== 'Site e-commerce') {
    estimatedTotal += 120000;
  }
  if (hasMaintenance) {
    estimatedTotal += 40000;
  }

  const deposit50 = Math.round(estimatedTotal * 0.5);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('772915006');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  // CLIENT ENVOIE LE DEVIS SUR WHATSAPP
  // Toute la discussion se fait ensuite sur WhatsApp, c'est l'entreprise qui valide l'acompte
  const handleSendQuoteViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const now = new Date();
    const formattedDate = now.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const formattedTime = now.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const fullDateTimestamp = `${formattedDate} à ${formattedTime}`;

    // Enregistrement immédiat dans l'espace admin en statut "En attente"
    const newOrder = addOrder({
      clientName: clientName || 'Client Partenaire',
      clientPhone: clientPhone || COMPANY_PHONE,
      clientEmail: clientEmail || 'client@sunutech.sn',
      siteName: siteName || `Projet ${siteType}`,
      type: siteType,
      amount: estimatedTotal,
      depositAmount: deposit50,
      paymentMethod: 'Wave',
      paymentPhone: '772915006',
      receiptTimestamp: fullDateTimestamp,
      deliveryDate: deliveryDate || '20/10/2026',
      description: description || `Demande de devis pour ${siteType}. Discussion en cours sur WhatsApp. Acompte prévisionnel 50% : ${deposit50.toLocaleString('fr-FR')} FCFA.`,
    });

    const formattedQuoteWhatsApp = encodeURIComponent(
      `Bonjour Sunu Tech Groupe, je souhaite commander mon site.\nVoici ma demande de devis personnalisé :\n\n` +
      `• Client : ${clientName || 'Client'}\n` +
      `• Téléphone : ${clientPhone || 'Non précisé'}\n` +
      `• Type de site : ${siteType}\n` +
      `• Nom du projet : ${siteName || 'Mon Projet'}\n` +
      `• Date de livraison souhaitée : ${deliveryDate || '20/10/2026'}\n` +
      `• Ce que je souhaite : ${description || 'Création d\'un site moderne et adapté'}\n` +
      `• Estimation budgétaire : ${estimatedTotal.toLocaleString('fr-FR')} FCFA\n` +
      `• Acompte de 50% : ${deposit50.toLocaleString('fr-FR')} FCFA\n\n` +
      `Merci de m'indiquer la suite et la validation de ma commande.`
    );

    // Ouvre la discussion WhatsApp directe avec Sunu Tech Groupe
    window.open(`https://wa.me/${COMPANY_PHONE_RAW}?text=${formattedQuoteWhatsApp}`, '_blank');

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });

    setFinalProjectName(siteName || `Projet ${siteType}`);
    setFinalDeposit(deposit50);
    setSentTimestamp(fullDateTimestamp);
    setCreatedOrderId(newOrder.id);
    setCurrentStep('sent_to_whatsapp');
  };

  const handleClose = () => {
    setIsQuoteModalOpen(false);
    setSelectedServiceForQuote(null);
    setCurrentStep('form');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 border border-slate-200 rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl relative my-6">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer z-10"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ========================================================================= */}
        {/* ÉTAPE 1 : FORMULAIRE DE COMMANDE DE SITE & DEVIS PERSONNALISÉ             */}
        {/* ========================================================================= */}
        {currentStep === 'form' && (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#00A651]">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  Commander votre site web
                </h3>
                <p className="text-xs text-slate-500">
                  Remplissez votre devis personnalisé puis envoyez-le directement sur WhatsApp
                </p>
              </div>
            </div>

            <form onSubmit={handleSendQuoteViaWhatsApp} className="space-y-4 mt-5">
              
              {/* Coordonnées Client */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#00A651]" />
                  <span>Vos coordonnées de contact</span>
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nom complet / Entreprise <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Samba Mbow ou Entreprise SARL"
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#00A651]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Téléphone / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex: 77 123 45 67"
                      value={clientPhone}
                      onChange={e => setClientPhone(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#00A651]"
                    />
                  </div>
                </div>
              </div>

              {/* Service & Nom du Projet */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Service / Type de site souhaité <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={siteType}
                    onChange={e => setSiteType(e.target.value as SiteType)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651] cursor-pointer"
                  >
                    <option value="Site vitrine">Site vitrine (dès 150 000 FCFA)</option>
                    <option value="Site e-commerce">Site e-commerce (dès 300 000 FCFA)</option>
                    <option value="Site institutionnel">Site institutionnel (dès 500 000 FCFA)</option>
                    <option value="Application web & mobile">Application web & mobile (dès 750 000 FCFA)</option>
                    <option value="Refonte de site">Refonte de site (dès 120 000 FCFA)</option>
                    <option value="Sur mesure">Solution sur mesure (dès 400 000 FCFA)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nom prévisionnel du site/projet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: SenBusiness SARL"
                    value={siteName}
                    onChange={e => setSiteName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Date de livraison souhaitée
                  </label>
                  <input
                    type="text"
                    value={deliveryDate}
                    onChange={e => setDeliveryDate(e.target.value)}
                    placeholder="20/10/2026"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email de contact (optionnel)
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={e => setClientEmail(e.target.value)}
                    placeholder="contact@votreentreprise.sn"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651]"
                  />
                </div>
              </div>

              {/* Description détaillée des besoins */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ce que vous souhaitez que Sunu Tech Groupe fasse pour vous <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Décrivez votre activité, vos fonctionnalités souhaitées (boutique en ligne, formulaire, espace membre, catalogue...)..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651]"
                />
              </div>

              {/* Options */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasWaveOM}
                    onChange={e => setHasWaveOM(e.target.checked)}
                    className="rounded text-[#00A651] focus:ring-emerald-500"
                  />
                  <span>Intégration paiements locaux (Wave & Orange Money Sénégal)</span>
                </label>

                <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasMaintenance}
                    onChange={e => setHasMaintenance(e.target.checked)}
                    className="rounded text-[#00A651] focus:ring-emerald-500"
                  />
                  <span>Pack maintenance & infogérance continue (+40 000 FCFA)</span>
                </label>
              </div>

              {/* Estimation Budget & Acompte indicatif */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-600 block font-semibold">Estimation budgétaire</span>
                  <span className="text-lg font-black text-slate-900 font-mono">
                    {estimatedTotal.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-emerald-800 font-bold block">Acompte requis (50%)</span>
                  <span className="text-base font-black text-[#00A651] font-mono">
                    {deposit50.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
              </div>

              {/* Bouton d'envoi vers WhatsApp de l'entreprise */}
              <button
                type="submit"
                className="w-full py-4 px-4 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Envoyer le devis à l'entreprise via WhatsApp</span>
                <Send className="w-4 h-4 ml-1" />
              </button>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ÉTAPE 2 : CONFIRMATION D'ENVOI & MESSAGE AUTOMATIQUE DE SUNU TECH GROUPE  */}
        {/* TOUTE LA DISCUSSION SE FAIT SUR WHATSAPP - L'ENTREPRISE VALIDE L'ACOMPTE  */}
        {/* ========================================================================= */}
        {currentStep === 'sent_to_whatsapp' && (
          <div className="py-2 space-y-5">
            
            {/* Message Automatique Officiel de Sunu Tech Groupe */}
            <div className="p-5 rounded-2xl bg-[#0b1411] text-white border border-emerald-500/50 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00A651] animate-ping" />
                <span>Message automatique de Sunu Tech Groupe</span>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
                <p className="text-base font-bold text-white">
                  « Merci d’avoir contacté l’entreprise Sunu Tech Groupe ! »
                </p>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Votre devis personnalisé pour <strong>{finalProjectName}</strong> (Réf: {createdOrderId}) a bien été transmis à notre équipe sur WhatsApp.
                </p>
                <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-300 font-medium">
                  💬 <strong>Toute la discussion se déroule directement sur WhatsApp.</strong> Notre responsable examine vos besoins avec vous.
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Pour que nous puissions réaliser le travail, il faudra valider votre acompte de 50% ({finalDeposit.toLocaleString('fr-FR')} FCFA) via <strong>Wave</strong> ou <strong>Orange Money</strong> après notre échange sur WhatsApp.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-emerald-950/80">
                <span>Demande enregistrée le {sentTimestamp}</span>
                <span className="text-emerald-400 font-bold">Réf: {createdOrderId}</span>
              </div>
            </div>

            {/* Rappel du numéro officiel pour le règlement */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-[#00A651]" />
                  <span>Numéro officiel pour le règlement de l'acompte :</span>
                </span>
                <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                  Wave & Orange Money
                </span>
              </div>

              <div className="flex items-center justify-between bg-white border border-slate-300 p-3 rounded-xl shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#00A651] text-white flex items-center justify-center font-bold text-xs">
                    🇸🇳
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block font-semibold">Numéro de l'entreprise :</span>
                    <span className="text-lg font-black font-mono text-slate-900 tracking-wider">
                      77 291 50 06
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#00A651] border border-emerald-300 font-bold text-xs transition-colors cursor-pointer"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#00A651]" />
                      <span>Copié !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-600 leading-relaxed italic">
                * Dès réception de votre acompte par notre responsable sur WhatsApp, votre facture officielle de validation vous sera envoyée et votre date de livraison vous sera confirmée.
              </p>
            </div>

            {/* Actions : Poursuivre sur WhatsApp ou Fermer */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a
                href={`https://wa.me/${COMPANY_PHONE_RAW}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3.5 px-4 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Poursuivre la discussion sur WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleClose}
                className="py-3.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
