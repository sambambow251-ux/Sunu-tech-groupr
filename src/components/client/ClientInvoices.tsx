import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Download, QrCode, Plus, CheckCircle2, AlertCircle, Printer } from 'lucide-react';

export const ClientInvoices: React.FC = () => {
  const { invoices, setSelectedInvoice, setIsDepositModalOpen } = useApp();
  const [filter, setFilter] = useState<string>('Tous');

  const filteredInvoices = invoices.filter(inv => {
    if (filter === 'Tous') return true;
    return inv.status === filter;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Mes factures & acomptes
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Consultez, téléchargez vos reçus fiscaux et réglez vos acomptes Wave / Orange Money
          </p>
        </div>

        <button
          onClick={() => setIsDepositModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white font-bold text-xs shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle facture d'acompte</span>
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2">
        {['Tous', 'Payée', 'En attente'].map(st => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              filter === st
                ? 'bg-[#00A651] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Invoices List */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 text-[11px] uppercase tracking-wider font-semibold bg-slate-50/50">
                <th className="py-3.5 px-4">N° Facture</th>
                <th className="py-3.5 px-4">Commande</th>
                <th className="py-3.5 px-4">Projet</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Montant</th>
                <th className="py-3.5 px-4">Statut</th>
                <th className="py-3.5 px-4">Date d'émission</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {inv.id}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">
                    {inv.orderId}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {inv.siteName}
                  </td>
                  <td className="py-3.5 px-4 capitalize text-emerald-800 font-bold">
                    {inv.type === 'acompte' ? `Acompte (${inv.depositPercentage}%)` : inv.type}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {inv.amountToPay.toLocaleString('fr-FR')} FCFA
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        inv.status === 'Payée'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {inv.issueDate}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Voir & PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
