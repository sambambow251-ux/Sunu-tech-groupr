import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SiteType } from '../../types';
import { X, CheckCircle2, ChevronRight, FileText, Calendar, DollarSign, User, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_PHONE } from '../../data/mockData';

export const DepositInvoiceWizard: React.FC = () => {
  const {
    isDepositModalOpen,
    setIsDepositModalOpen,
    orders,
    createDepositInvoice,
    setSelectedInvoice,
    selectedOrderForDeposit,
    setSelectedOrderForDeposit,
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(2); // 1: Commande, 2: Facture d'acompte, 3: Confirmation

  // Selected Order
  const [selectedOrderId, setSelectedOrderId] = useState<string>('ST-001');

  // Form Fields
  const [clientName, setClientName] = useState<string>('Samba Mbow');
  const [clientPhone, setClientPhone] = useState<string>(COMPANY_PHONE);
  const [clientEmail, setClientEmail] = useState<string>('sambambow251@gmail.com');
  const [siteName, setSiteName] = useState<string>('MonEntreprise');
  const [siteType, setSiteType] = useState<SiteType>('Site vitrine');
  const [totalAmount, setTotalAmount] = useState<number>(150000);
  const [depositPercentage, setDepositPercentage] = useState<number>(50);
  const [deliveryDate, setDeliveryDate] = useState<string>('20/10/2026');
  const [issueDate, setIssueDate] = useState<string>('03/10/2026');

  useEffect(() => {
    const targetOrder = orders.find(o => o.id === selectedOrderId) || orders[0];
    if (targetOrder) {
      setClientName(targetOrder.clientName);
      setClientPhone(targetOrder.clientPhone);
      setClientEmail(targetOrder.clientEmail);
      setSiteName(targetOrder.siteName);
      setSiteType(targetOrder.type);
      setTotalAmount(targetOrder.amount);
      setDeliveryDate(targetOrder.deliveryDate);
    }
  }, [selectedOrderId, orders]);

  useEffect(() => {
    if (selectedOrderForDeposit) {
      setSelectedOrderId(selectedOrderForDeposit.id);
    }
  }, [selectedOrderForDeposit]);

  if (!isDepositModalOpen) return null;

  const depositAmount = Math.round((totalAmount * depositPercentage) / 100);

  const handleGenerateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const newInv = createDepositInvoice({
      orderId: selectedOrderId,
      clientName,
      clientEmail,
      clientPhone,
      siteName,
      siteType,
      totalAmount,
      depositPercentage,
      deliveryDate,
      issueDate,
    });

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    setCurrentStep(3);
    setTimeout(() => {
      setIsDepositModalOpen(false);
      setSelectedInvoice(newInv);
    }, 1200);
  };

  const handleClose = () => {
    setIsDepositModalOpen(false);
    setSelectedOrderForDeposit(null);
    setCurrentStep(2);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 border border-slate-200 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#00A651]" />
              <span>Créer une facture d'acompte (50%)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Générez une facture d'acompte conforme pour validation du projet client
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps indicator matching the screenshot */}
        <div className="px-6 py-3.5 bg-slate-100/60 border-b border-slate-200">
          <div className="flex items-center justify-center max-w-lg mx-auto">
            {/* Step 1: Commande */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#00A651] border border-emerald-300 flex items-center justify-center text-xs font-bold">
                ✓
              </div>
              <span className="text-xs font-medium text-slate-600">Commande</span>
            </div>

            <div className="w-10 sm:w-16 h-0.5 bg-emerald-500/40 mx-2" />

            {/* Step 2: Facture d'acompte */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#00A651] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                2
              </div>
              <span className="text-xs font-bold text-[#00A651]">Facture d'acompte</span>
            </div>

            <div className="w-10 sm:w-16 h-0.5 bg-slate-300 mx-2" />

            {/* Step 3: Confirmation */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-semibold">
                3
              </div>
              <span className="text-xs font-medium text-slate-500">Confirmation</span>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleGenerateInvoice} className="p-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Colonne 1 : Informations client */}
            <div className="space-y-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#00A651]" />
                <span>Informations client</span>
              </h3>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#00A651]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Téléphone <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={clientPhone}
                  onChange={e => setClientPhone(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#00A651]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={e => setClientEmail(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#00A651]"
                />
              </div>
            </div>

            {/* Colonne 2 : Détails de la facture */}
            <div className="space-y-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-[#00A651]" />
                <span>Détails de la facture</span>
              </h3>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Commande liée
                </label>
                <select
                  value={selectedOrderId}
                  onChange={e => setSelectedOrderId(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#00A651]"
                >
                  {orders.map(ord => (
                    <option key={ord.id} value={ord.id}>
                      {ord.id} - {ord.type} ({ord.siteName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Sous-total & Prix total du site
                </label>
                <div className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900">
                  {totalAmount.toLocaleString('fr-FR')} FCFA
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Prix de l'acompte ({depositPercentage}%)
                </label>
                <div className="w-full bg-emerald-50 border border-emerald-300 rounded-xl px-3 py-2 text-xs font-mono font-black text-emerald-800 flex items-center justify-between">
                  <span>{depositAmount.toLocaleString('fr-FR')} FCFA</span>
                  <span className="text-[10px] bg-[#00A651] text-white px-2 py-0.5 rounded-full font-bold">Payé ✓</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Prix du reste à payer (à la livraison)
                </label>
                <div className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-700">
                  {(totalAmount - depositAmount).toLocaleString('fr-FR')} FCFA
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Date d'envoi de l'acompte
                </label>
                <input
                  type="text"
                  value={issueDate}
                  onChange={e => setIssueDate(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#00A651]"
                />
              </div>
            </div>

            {/* Colonne 3 : Informations supplémentaires */}
            <div className="space-y-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between">
              <div className="space-y-3.5">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#00A651]" />
                  <span>Informations supplémentaires</span>
                </h3>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Date de livraison prévue
                  </label>
                  <input
                    type="text"
                    value={deliveryDate}
                    onChange={e => setDeliveryDate(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#00A651]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Type de site
                  </label>
                  <select
                    value={siteType}
                    onChange={e => setSiteType(e.target.value as SiteType)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#00A651]"
                  >
                    <option value="Site vitrine">Site vitrine</option>
                    <option value="Site e-commerce">Site e-commerce</option>
                    <option value="Site institutionnel">Site institutionnel</option>
                    <option value="Application web & mobile">Application web & mobile</option>
                    <option value="Refonte de site">Refonte de site</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Nom du projet / site
                  </label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={e => setSiteName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#00A651]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Générer la facture d'acompte</span>
                </button>
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
