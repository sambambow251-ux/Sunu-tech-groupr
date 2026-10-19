import React, { useState } from 'react';
import { Invoice } from '../../types';
import { Logo } from './Logo';
import html2canvas from 'html2canvas';
import { 
  Printer, 
  MessageCircle, 
  CheckCircle2, 
  QrCode, 
  X, 
  ArrowLeft, 
  CreditCard, 
  Copy, 
  Check, 
  Calendar, 
  Share2,
  FileImage,
  Download,
  Loader2,
  Paperclip,
  ExternalLink
} from 'lucide-react';
import { COMPANY_PHONE, COMPANY_PHONE_RAW, COMPANY_EMAIL, COMPANY_ADDRESS } from '../../data/mockData';

interface InvoiceDocumentProps {
  invoice: Invoice;
  onClose?: () => void;
  isModal?: boolean;
}

export const InvoiceDocument: React.FC<InvoiceDocumentProps> = ({
  invoice,
  onClose,
  isModal = false,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isGeneratingPhysical, setIsGeneratingPhysical] = useState(false);
  const [physicalFileGenerated, setPhysicalFileGenerated] = useState<string | null>(null);
  const [showShareGuideModal, setShowShareGuideModal] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString('fr-FR') + ' FCFA';
  };

  // 1. Calculs financiers conformes à la demande du client
  const sitePrice = invoice.totalAmount || (invoice.type === 'acompte' ? invoice.amountToPay * 2 : invoice.amountToPay);
  const depositPercentage = invoice.depositPercentage || 50;
  const depositPrice = invoice.type === 'acompte' ? invoice.amountToPay : Math.round(sitePrice * (depositPercentage / 100));
  const isPaid = invoice.status === 'Payée';
  const remainingToPay = Math.max(0, sitePrice - depositPrice);

  // 2. Coordonnées WhatsApp du client
  const clientCleanPhone = (invoice.clientPhone || '').replace(/[^0-9]/g, '');
  const targetWhatsAppNumber = clientCleanPhone.length >= 9 
    ? (clientCleanPhone.startsWith('221') ? clientCleanPhone : '221' + clientCleanPhone)
    : COMPANY_PHONE_RAW;

  const whatsappMessage = encodeURIComponent(
    `Bonjour ${invoice.clientName},\n\n` +
    `Voici votre Facture d'acompte physique officielle Sunu Tech Groupe (ci-jointe en image) :\n` +
    `📄 Facture N° : ${invoice.id}\n` +
    `🌐 Projet / Site : ${invoice.siteName} (${invoice.siteType})\n` +
    `📦 Réf Commande : ${invoice.orderId}\n\n` +
    `💰 DÉCOMPTE OFFICIEL :\n` +
    `• Sous-total du site : ${formatCurrency(sitePrice)}\n` +
    `• Prix du site : ${formatCurrency(sitePrice)}\n` +
    `• Prix de l'acompte (${depositPercentage}%) : ${formatCurrency(depositPrice)} ${isPaid ? '👉 [ PAYÉ ✓ ]' : '👉 [ EN ATTENTE ]'}\n` +
    `• Reste à payer (à la livraison) : ${formatCurrency(remainingToPay)}\n\n` +
    `📅 Émise le : ${invoice.issueDate} | Livraison prévue : ${invoice.dueDate}\n` +
    `Merci de trouver ci-joint le document physique officiel de votre facture.\n\n` +
    `Sunu Tech Groupe - Dakar, Sénégal (Tél: 77 291 50 06)`
  );

  const whatsappShareUrl = `https://wa.me/${targetWhatsAppNumber}?text=${whatsappMessage}`;

  // 3. GÉNÉRATION & ENVOI DE LA FICHE PHYSIQUE DE LA FACTURE SUR WHATSAPP
  const handleSendPhysicalInvoiceToWhatsApp = async () => {
    const element = document.getElementById('invoice-print-area');
    if (!element) return;

    setIsGeneratingPhysical(true);

    try {
      // Capture haute définition de la fiche physique de la facture (2x scale)
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imageDataUrl = canvas.toDataURL('image/png');
      setPhysicalFileGenerated(imageDataUrl);

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setIsGeneratingPhysical(false);
          return;
        }

        const fileName = `Facture_Acompte_${invoice.id}_${invoice.clientName.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
        const file = new File([blob], fileName, { type: 'image/png' });

        // A. Si le navigateur supporte le partage direct de fichiers (ex: smartphone Android, iPhone, Mac Safari)
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: `Facture d'acompte ${invoice.id} - ${invoice.clientName}`,
              text: `Bonjour ${invoice.clientName}, voici la fiche physique de votre Facture d'acompte Sunu Tech Groupe pour le projet "${invoice.siteName}".`,
            });
            setIsGeneratingPhysical(false);
            return;
          } catch (shareErr: any) {
            if (shareErr.name !== 'AbortError') {
              console.log('Partage direct annulé ou non disponible, bascule vers téléchargement + WhatsApp', shareErr);
            }
          }
        }

        // B. Copie de l'image de la facture dans le presse-papiers pour collage direct (Ctrl+V) dans WhatsApp Web
        try {
          if (navigator.clipboard && window.ClipboardItem) {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
          }
        } catch (clipErr) {
          console.log('Presse-papiers image non supporté', clipErr);
        }

        // C. Téléchargement immédiat du fichier physique de la facture sur l'appareil
        const downloadLink = document.createElement('a');
        downloadLink.href = imageDataUrl;
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        // D. Ouverture de la discussion WhatsApp du client
        window.open(whatsappShareUrl, '_blank');

        // E. Affichage du guide de confirmation visuelle
        setShowShareGuideModal(true);
        setIsGeneratingPhysical(false);
      }, 'image/png');

    } catch (err) {
      console.error('Erreur lors de la capture de la facture physique :', err);
      setIsGeneratingPhysical(false);
      // Fallback vers le lien WhatsApp direct
      window.open(whatsappShareUrl, '_blank');
    }
  };

  const handleCopySummary = () => {
    const textToCopy = 
      `FACTURE D'ACOMPTE OFFICIELLE - SUNU TECH GROUPE\n` +
      `Facture N°: ${invoice.id} | Client: ${invoice.clientName}\n` +
      `Projet: ${invoice.siteName} (${invoice.siteType})\n` +
      `• Sous-total du site: ${formatCurrency(sitePrice)}\n` +
      `• Prix du site: ${formatCurrency(sitePrice)}\n` +
      `• Prix de l'acompte (50%): ${formatCurrency(depositPrice)} ${isPaid ? '(PAYÉ ✓)' : '(À régler)'}\n` +
      `• Reste à payer: ${formatCurrency(remainingToPay)}\n` +
      `• Émise le: ${invoice.issueDate} | Livraison: ${invoice.dueDate}\n` +
      `Paiements Wave & OM: ${COMPANY_PHONE}`;
    
    navigator.clipboard.writeText(textToCopy);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className={isModal ? "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto" : "w-full"}>
      <div className={`bg-white text-slate-900 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-200 ${isModal ? 'my-6 sm:my-8' : ''}`}>
        
        {/* ========================================================================= */}
        {/* BARRE D'ACTIONS SUPÉRIEURE (no-print)                                     */}
        {/* ========================================================================= */}
        <div className="no-print bg-slate-900 text-white px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs sm:text-sm">Facture d'acompte N° {invoice.id}</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wide ${
              isPaid 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
            }`}>
              {isPaid ? 'ACOMPTE PAYÉ ✓' : 'EN ATTENTE'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Bouton d'action principal : Envoyer la fiche physique sur WhatsApp */}
            <button
              onClick={handleSendPhysicalInvoiceToWhatsApp}
              disabled={isGeneratingPhysical}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-75"
              title="Génère et transmet la fiche physique de la facture sur le WhatsApp du client"
            >
              {isGeneratingPhysical ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Génération fiche physique...</span>
                </>
              ) : (
                <>
                  <FileImage className="w-3.5 h-3.5" />
                  <span>Envoyer la fiche physique sur WhatsApp</span>
                </>
              )}
            </button>

            {/* Imprimer la facture */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-colors shadow-xs cursor-pointer"
              title="Imprimer ou enregistrer en PDF"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" />
              <span>Imprimer</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ml-1"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ZONE IMPRIMABLE / CAPTURABLE DE LA FACTURE PHYSIQUE                       */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-10 md:p-12 space-y-6 sm:space-y-8 bg-white" id="invoice-print-area">
          
          {/* En-tête officiel de l'entreprise */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <Logo variant="dark" size="md" showSubtitle={true} />
              <div className="mt-3 text-xs text-slate-600 space-y-0.5">
                <p className="font-semibold text-slate-800">{COMPANY_ADDRESS}</p>
                <p>Téléphone : <strong className="font-mono">{COMPANY_PHONE}</strong></p>
                <p>Email : {COMPANY_EMAIL}</p>
                <p className="text-slate-400 text-[11px]">NINEA / RCCM : SN-DKR-2026-B-8910</p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="inline-block bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl mb-2">
                <span className="text-xs font-black text-[#00A651] uppercase tracking-wider">
                  FACTURE D'ACOMPTE (50%)
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-mono">
                {invoice.id}
              </h1>
              <div className="mt-2 text-xs text-slate-600 space-y-1">
                <p><span className="font-bold text-slate-800">Date d'émission :</span> {invoice.issueDate}</p>
                <p><span className="font-bold text-slate-800">Date de livraison prévue :</span> {invoice.dueDate}</p>
                <p><span className="font-bold text-slate-800">Réf commande liée :</span> <span className="font-mono font-bold text-emerald-800">{invoice.orderId}</span></p>
              </div>
            </div>
          </div>

          {/* Informations Client & Projet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Facturé au client
              </p>
              <h2 className="text-base font-bold text-slate-900">{invoice.clientName}</h2>
              <p className="text-xs text-slate-700 mt-1 font-mono font-semibold flex items-center gap-1">
                <span>WhatsApp :</span>
                <span className="text-[#00A651]">{invoice.clientPhone}</span>
              </p>
              {invoice.clientEmail && (
                <p className="text-xs text-slate-600 mt-0.5">{invoice.clientEmail}</p>
              )}
            </div>

            <div className="sm:text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Détails du site commandé
              </p>
              <p className="text-base font-bold text-slate-900">{invoice.siteName}</p>
              <p className="text-xs text-[#00A651] font-semibold mt-0.5">{invoice.siteType}</p>
              <p className="text-xs text-slate-500 mt-1">
                Mode de règlement officiel : <strong>Wave & Orange Money</strong>
              </p>
            </div>
          </div>

          {/* Tableau des prestations : Description, Prix et Sous-total du site */}
          <div className="overflow-x-auto border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#00A651] text-white">
                  <th className="py-3 px-4 font-bold">Désignation des prestations</th>
                  <th className="py-3 px-4 text-center font-bold">Quantité</th>
                  <th className="py-3 px-4 text-right font-bold">Prix unitaire</th>
                  <th className="py-3 px-4 text-right font-bold">Sous-total du site</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr>
                  <td className="py-4 px-4">
                    <p className="font-bold text-slate-900 text-sm">
                      Conception, développement & mise en ligne de site web
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Projet : <strong>{invoice.siteName}</strong> ({invoice.siteType}) — Intégration responsive, sécurité SSL et paiement mobile.
                    </p>
                  </td>
                  <td className="py-4 px-4 text-center text-slate-600 font-mono font-semibold">
                    1
                  </td>
                  <td className="py-4 px-4 text-right text-slate-700 font-mono font-bold">
                    {formatCurrency(sitePrice)}
                  </td>
                  <td className="py-4 px-4 text-right font-black text-slate-900 font-mono text-sm">
                    {formatCurrency(sitePrice)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ========================================================================= */}
          {/* RÉCAPITULATIF FINANCIER COMPLET : SOUS-TOTAL, PRIX DU SITE, ACOMPTE PAYÉ,  */}
          {/* ET PRIX DU RESTE À PAYER (DEMANDÉ PAR L'UTILISATEUR)                       */}
          {/* ========================================================================= */}
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 pt-2">
            
            {/* Colonne Gauche : Mode de règlement et instructions de paiement */}
            <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-[#00A651]" />
                  <span>Règlement de l'acompte</span>
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Règlement par <strong>Wave</strong> ou <strong>Orange Money</strong> au numéro marchand officiel de Sunu Tech Groupe :
                </p>
                <div className="my-2.5 p-2.5 bg-white border border-emerald-300 rounded-xl flex items-center justify-between shadow-2xs">
                  <span className="text-xs text-slate-600 font-semibold">Numéro Wave / OM :</span>
                  <span className="text-base font-black font-mono text-[#00A651] tracking-wider">
                    77 291 50 06
                  </span>
                </div>
              </div>

              {/* Tampon officiel sur la fiche physique */}
              {isPaid ? (
                <div className="mt-3 p-3 rounded-xl bg-emerald-100 border-2 border-emerald-400 flex items-center gap-2.5 text-emerald-950 shadow-xs">
                  <CheckCircle2 className="w-6 h-6 text-[#00A651] shrink-0" />
                  <div>
                    <span className="text-xs font-black block tracking-wide text-emerald-900">
                      TAMPON OFFICIEL : ACOMPTE 50% ACQUITTÉ & VALIDÉ ✓
                    </span>
                    <span className="text-[11px] text-emerald-800">
                      Paiement validé par Sunu Tech Groupe. Projet en production.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-300 flex items-center gap-2 text-amber-900 text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 animate-ping" />
                  <span>En attente de réception de l'acompte au 77 291 50 06.</span>
                </div>
              )}
            </div>

            {/* Colonne Droite : Décompte financier complet et transparent */}
            <div className="w-full md:w-80 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
              
              {/* 1. Sous-total du site */}
              <div className="flex justify-between items-center py-1 text-slate-600">
                <span className="font-semibold">Sous-total du site :</span>
                <span className="font-mono font-bold text-slate-900">{formatCurrency(sitePrice)}</span>
              </div>

              {/* 2. Prix du site */}
              <div className="flex justify-between items-center py-1 text-slate-600 border-t border-slate-200/80">
                <span className="font-semibold">Prix du site :</span>
                <span className="font-mono font-bold text-slate-900">{formatCurrency(sitePrice)}</span>
              </div>

              {/* 3. Prix de l'acompte avec mention [ PAYÉ ✓ ] à côté */}
              <div className="flex justify-between items-center py-2 border-t border-slate-200/80 bg-emerald-50/80 -mx-3 px-3 rounded-xl">
                <div>
                  <span className="font-bold text-emerald-950 block">Prix de l'acompte ({depositPercentage}%) :</span>
                  <span className="text-[10px] text-emerald-700">Acompte de lancement</span>
                </div>

                <div className="text-right flex items-center gap-2">
                  <span className="font-mono font-black text-slate-900 text-sm">
                    {formatCurrency(depositPrice)}
                  </span>
                  
                  {/* Mention à côté du prix de l'acompte si payé */}
                  {isPaid ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#00A651] text-white shadow-2xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>PAYÉ ✓</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900">
                      À payer
                    </span>
                  )}
                </div>
              </div>

              {/* 4. Prix du reste à payer */}
              <div className="flex justify-between items-center py-2 border-t border-slate-200/80">
                <div>
                  <span className="font-bold text-slate-800 block">Prix du reste à payer :</span>
                  <span className="text-[10px] text-slate-500">Solde dû à la livraison</span>
                </div>
                <span className="font-mono font-black text-slate-900 text-sm">
                  {formatCurrency(remainingToPay)}
                </span>
              </div>

              {/* Total net de la pièce comptable */}
              <div className="pt-2 border-t-2 border-slate-900 flex justify-between items-center">
                <span className="text-xs font-black text-slate-900 uppercase">
                  Montant acompte 50%
                </span>
                <span className="font-mono text-base font-black text-[#00A651]">
                  {formatCurrency(depositPrice)}
                </span>
              </div>

            </div>

          </div>

          {/* Mentions légales & Remerciements */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <p className="font-bold text-slate-700">
              Merci pour votre confiance ! Sunu Tech Groupe — Solutions Digitales au Sénégal
            </p>
            <p className="text-[11px] text-slate-400">
              Fiche physique officielle générée électroniquement • Valable sans signature
            </p>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* BARRE D'ACTIONS INFÉRIEURE (no-print) AVEC BOUTON FICHE PHYSIQUE WHATSAPP */}
        {/* ========================================================================= */}
        <div className="no-print bg-slate-50 px-5 sm:px-8 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onClose && (
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer py-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Retour</span>
              </button>
            )}

            <button
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#00A651] cursor-pointer py-2"
              title="Copier le résumé texte de la facture"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#00A651]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Résumé copié !' : 'Copier le récapitulatif'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            {/* Bouton Fiche Physique sur WhatsApp */}
            <button
              onClick={handleSendPhysicalInvoiceToWhatsApp}
              disabled={isGeneratingPhysical}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-75"
            >
              {isGeneratingPhysical ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Préparation de la fiche...</span>
                </>
              ) : (
                <>
                  <FileImage className="w-4 h-4" />
                  <span>Envoyer la fiche physique sur WhatsApp</span>
                </>
              )}
            </button>

            {/* Bouton Imprimer la facture */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer (PDF)</span>
            </button>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODALE D'ASSISTANCE DE TRANSMISSION DE LA FICHE PHYSIQUE                  */}
      {/* ========================================================================= */}
      {showShareGuideModal && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 text-slate-900 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowShareGuideModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#00A651] border-2 border-emerald-300 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Fiche physique générée avec succès !
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  La fiche officielle de la facture d'acompte N° <strong>{invoice.id}</strong> a été préparée.
                </p>
              </div>

              {/* Aperçu miniature de la fiche capturée */}
              {physicalFileGenerated && (
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-inner max-h-48 bg-slate-100 flex items-center justify-center p-1">
                  <img
                    src={physicalFileGenerated}
                    alt="Aperçu de la fiche physique"
                    className="max-h-44 object-contain rounded"
                  />
                </div>
              )}

              {/* Instructions claires */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-left text-xs text-emerald-950 space-y-1.5">
                <p className="font-bold flex items-center gap-1.5">
                  <Paperclip className="w-4 h-4 text-[#00A651]" />
                  <span>Comment transmettre la fiche physique :</span>
                </p>
                <ul className="list-disc list-inside text-[11px] text-emerald-900 space-y-1">
                  <li>L'image a été <strong>téléchargée automatiquement</strong> sur votre appareil.</li>
                  <li>Elle est aussi <strong>copiée dans votre presse-papiers</strong>.</li>
                  <li>Dans WhatsApp, faites simplement <strong>Coller (Ctrl+V)</strong> ou cliquez sur le trombone 📎 pour joindre l'image au client !</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Ouvrir WhatsApp du client</span>
                </a>

                <button
                  type="button"
                  onClick={() => setShowShareGuideModal(false)}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer"
                >
                  Terminer
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
