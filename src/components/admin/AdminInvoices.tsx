import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Plus, Download, Printer, CheckCircle2, Clock, DollarSign, Search } from 'lucide-react';

export const AdminInvoices: React.FC = () => {
  const { invoices, setSelectedInvoice, setIsDepositModalOpen, markInvoicePaid } = useApp();
  const [filter, setFilter] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInvoices = invoices.filter(inv => {
    const matchesFilter = filter === 'Tous' || inv.status === filter;
    const matchesSearch = inv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inv.siteName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalInvoiced = invoices.reduce((s, i) => s + i.amountToPay, 0);
  const totalPaid = invoices.filter(i => i.status === 'Payée').reduce((s, i) => s + i.amountToPay, 0);
  const totalPending = invoices.filter(i => i.status === 'En attente').reduce((s, i) => s + i.amountToPay, 0);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Facturation & Trésorerie
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Suivi des acomptes 50%, factures soldes et encaissements Wave / Orange Money
          </p>
        </div>

        <button
          onClick={() => setIsDepositModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white font-bold text-xs shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Créer facture d'acompte</span>
        </button>
      </div>

      {/* 3 Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <p className="text-xs text-slate-500 font-bold">Total facturé</p>
          <p className="text-xl font-black text-slate-900 font-mono mt-1">
            {totalInvoiced.toLocaleString('fr-FR')} FCFA
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-emerald-300 shadow-xs">
          <p className="text-xs text-[#00A651] font-bold">Acomptes & Soldes encaissés</p>
          <p className="text-xl font-black text-[#00A651] font-mono mt-1">
            {totalPaid.toLocaleString('fr-FR')} FCFA
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-amber-300 shadow-xs">
          <p className="text-xs text-amber-700 font-bold">En attente de règlement</p>
          <p className="text-xl font-black text-amber-700 font-mono mt-1">
            {totalPending.toLocaleString('fr-FR')} FCFA
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 p-3.5 rounded-2xl shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Rechercher par facture, client..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651]"
          />
        </div>

        <div className="flex items-center gap-2">
          {['Tous', 'Payée', 'En attente'].map(st => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                filter === st
                  ? 'bg-[#00A651] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 text-[11px] uppercase tracking-wider font-semibold bg-slate-50/50">
                <th className="py-3.5 px-4">N° Pièce</th>
                <th className="py-3.5 px-4">Client</th>
                <th className="py-3.5 px-4">Projet lié</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Montant TTC</th>
                <th className="py-3.5 px-4">Statut</th>
                <th className="py-3.5 px-4">Date émission</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {inv.id}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div>{inv.clientName}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{inv.orderId}</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#00A651]">
                    {inv.siteName}
                  </td>
                  <td className="py-3.5 px-4 capitalize text-slate-700">
                    {inv.type === 'acompte' ? `Acompte 50%` : inv.type}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-black text-slate-900">
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
                  <td className="py-3.5 px-4 text-right space-x-2">
                    {inv.status === 'En attente' && (
                      <button
                        onClick={() => markInvoicePaid(inv.id)}
                        className="px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-[#00A651] hover:text-white transition-colors text-[11px] font-bold cursor-pointer"
                        title="Encaisser paiement"
                      >
                        Encaisser
                      </button>
                    )}
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
