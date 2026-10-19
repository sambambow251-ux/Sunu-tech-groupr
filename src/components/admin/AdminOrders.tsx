import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus, Order } from '../../types';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Eye, 
  ArrowRight,
  MessageCircle,
  Smartphone,
  Calendar,
  CreditCard,
  Check,
  X,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_PHONE } from '../../data/mockData';

export const AdminOrders: React.FC = () => {
  const { 
    orders, 
    updateOrderStatus, 
    setIsDepositModalOpen, 
    setSelectedOrderForDeposit,
    invoices,
    setSelectedInvoice,
    createDepositInvoice
  } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');

  // Admin validation modal state
  const [validatedOrder, setValidatedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (o.clientPhone && o.clientPhone.includes(searchTerm));
    const matchesStatus = statusFilter === 'Tous' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenPhysicalInvoice = (order: Order) => {
    let inv = invoices.find(i => i.orderId === order.id);
    if (!inv) {
      inv = createDepositInvoice({
        orderId: order.id,
        clientName: order.clientName,
        clientEmail: order.clientEmail,
        clientPhone: order.clientPhone,
        siteName: order.siteName,
        siteType: order.type,
        totalAmount: order.amount,
        depositPercentage: 50,
        deliveryDate: order.deliveryDate,
      });
    }
    setSelectedInvoice(inv);
  };

  // Action reserved for the Admin: Validate that the deposit was received via Wave/OM after WhatsApp discussion
  const handleAdminValidateDeposit = (order: Order) => {
    updateOrderStatus(order.id, 'En cours');
    setValidatedOrder(order);

    // Ensure invoice is generated for physical delivery
    let inv = invoices.find(i => i.orderId === order.id);
    if (!inv) {
      createDepositInvoice({
        orderId: order.id,
        clientName: order.clientName,
        clientEmail: order.clientEmail,
        clientPhone: order.clientPhone,
        siteName: order.siteName,
        siteType: order.type,
        totalAmount: order.amount,
        depositPercentage: 50,
        deliveryDate: order.deliveryDate,
      });
    }

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const getConfirmationWhatsAppLink = (order: Order) => {
    const cleanPhone = (order.clientPhone || '').replace(/[^0-9]/g, '');
    const deposit = order.depositAmount || Math.round(order.amount * 0.5);
    const text = encodeURIComponent(
      `Bonjour ${order.clientName},\n\n` +
      `Merci, on a bien reçu votre acompte de ${deposit.toLocaleString('fr-FR')} FCFA pour votre projet "${order.siteName}" (Réf: ${order.id}) !\n` +
      `Votre facture vous sera envoyée et la date de livraison vous sera communiquée bientôt.\n\n` +
      `Merci d’avoir contacté Sunu Tech Groupe pour vos solutions digitales.`
    );
    return `https://wa.me/${cleanPhone.startsWith('221') ? cleanPhone : '221' + cleanPhone}?text=${text}`;
  };

  const getDirectChatWhatsAppLink = (order: Order) => {
    const cleanPhone = (order.clientPhone || '').replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Bonjour ${order.clientName}, c'est Samba Mbow de Sunu Tech Groupe concernant votre demande de devis pour le projet "${order.siteName}" (Réf: ${order.id}). Nous pouvons échanger ici sur les détails de votre site.`
    );
    return `https://wa.me/${cleanPhone.startsWith('221') ? cleanPhone : '221' + cleanPhone}?text=${text}`;
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>Commandes & Devis WhatsApp</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-[#00A651] font-bold">
              {orders.length} au total
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Espace d'administration réservé : échangez sur WhatsApp avec les clients et validez les acomptes reçus au 77 291 50 06
          </p>
        </div>

        <button
          onClick={() => setIsDepositModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white font-bold text-xs shadow-sm transition-all cursor-pointer shrink-0"
        >
          <DollarSign className="w-4 h-4" />
          <span>+ Créer facture d'acompte</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 p-3.5 rounded-2xl shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Rechercher par client, téléphone, projet, réf..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['Tous', 'En attente', 'En cours', 'Livré'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#00A651] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 text-[11px] uppercase tracking-wider font-semibold bg-slate-50/50">
                <th className="py-3.5 px-4">Réf & Date</th>
                <th className="py-3.5 px-4">Client & WhatsApp</th>
                <th className="py-3.5 px-4">Projet & Service</th>
                <th className="py-3.5 px-4">Montant & Acompte 50%</th>
                <th className="py-3.5 px-4">Statut</th>
                <th className="py-3.5 px-4 text-center">Discussion WhatsApp</th>
                <th className="py-3.5 px-4 text-right">Validation Acompte (Admin)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((ord) => {
                const deposit = ord.depositAmount || Math.round(ord.amount * 0.5);
                const hasWhatsApp = ord.clientPhone && ord.clientPhone.length > 5;
                const isPending = ord.status === 'En attente';

                return (
                  <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 text-slate-900">
                      <div className="font-mono font-bold text-slate-900">{ord.id}</div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-[#00A651]" />
                        <span>{ord.receiptTimestamp || ord.orderDate}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-900">
                      <div className="font-bold text-slate-900">{ord.clientName}</div>
                      <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                        <Smartphone className="w-3 h-3 text-[#00A651]" />
                        <span>{ord.clientPhone || COMPANY_PHONE}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#00A651]">{ord.siteName}</div>
                      <div className="text-[11px] text-slate-500">{ord.type}</div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-900">
                      <div className="font-mono font-bold text-slate-900">
                        {ord.amount.toLocaleString('fr-FR')} FCFA
                      </div>
                      <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-50 text-[#00A651] text-[10px] font-bold mt-0.5">
                        <CreditCard className="w-3 h-3" />
                        <span>Acompte 50% : {deposit.toLocaleString('fr-FR')} FCFA</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          ord.status === 'Livré'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : ord.status === 'En cours'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {ord.status === 'En attente' ? 'Devis reçu - En attente acompte' : ord.status}
                      </span>
                    </td>

                    {/* Discuter sur WhatsApp */}
                    <td className="py-3.5 px-4 text-center">
                      {hasWhatsApp ? (
                        <a
                          href={getDirectChatWhatsAppLink(ord)}
                          target="_blank"
                          rel="noreferrer"
                          title={`Discuter avec ${ord.clientName} sur WhatsApp`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-xs transition-colors cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Discuter WhatsApp</span>
                        </a>
                      ) : (
                        <span className="text-[10px] text-slate-400">Sans tél</span>
                      )}
                    </td>

                    {/* Validation par l'administrateur */}
                    <td className="py-3.5 px-4 text-right">
                      {isPending ? (
                        <button
                          onClick={() => handleAdminValidateDeposit(ord)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                          title="C'est vous qui validez l'acompte après discussion sur WhatsApp"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Valider l'acompte reçu</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleOpenPhysicalInvoice(ord)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-[#00A651] text-emerald-900 hover:text-white border border-emerald-200 text-xs font-bold transition-all cursor-pointer shadow-xs"
                          title="Voir la fiche physique, l'imprimer ou l'envoyer sur WhatsApp au client"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#00A651]" />
                          <span>Fiche physique facture</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALE DE CONFIRMATION DE VALIDATION D'ACOMPTE PAR L'ADMIN */}
      {validatedOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative text-slate-900 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setValidatedOrder(null)}
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
                  Acompte validé avec succès !
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Le projet "{validatedOrder.siteName}" passe au statut <strong>En cours de réalisation</strong>.
                </p>
              </div>

              {/* Message officiel de confirmation pour le client */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left space-y-2 text-xs">
                <p className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-[#00A651]" />
                  <span>Message de confirmation prêt pour le client :</span>
                </p>
                <div className="p-3 rounded-xl bg-white border border-emerald-200/80 text-slate-700 leading-relaxed font-sans">
                  « <strong>Merci, on a bien reçu votre acompte !</strong><br />
                  Votre facture vous sera envoyée et la date de livraison sera communiquée bientôt.<br />
                  <strong>Merci d’avoir contacté Sunu Tech Groupe pour vos solutions digitales.</strong> »
                </div>
              </div>

              {/* Actions pour envoyer la confirmation ou la facture physique sur WhatsApp */}
              <div className="flex flex-col gap-2 pt-2">
                <a
                  href={getConfirmationWhatsAppLink(validatedOrder)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Envoyer la confirmation au client via WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    const ord = validatedOrder;
                    setValidatedOrder(null);
                    handleOpenPhysicalInvoice(ord);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Ouvrir la fiche physique de la facture (Pour partage WhatsApp & Impression)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setValidatedOrder(null)}
                  className="w-full py-2 px-4 rounded-xl text-slate-500 hover:text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
