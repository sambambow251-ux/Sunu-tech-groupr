import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';
import { Plus, Search, Filter, Eye, DollarSign, Calendar, FileText } from 'lucide-react';

export const ClientOrders: React.FC = () => {
  const { orders, setActiveClientTab, setIsDepositModalOpen, setSelectedOrderForDeposit } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Tous');

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Tous' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Mes commandes
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Suivez l'avancement de vos projets et commandez de nouvelles fonctionnalités
          </p>
        </div>

        <button
          onClick={() => setActiveClientTab('new-order')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white font-bold text-xs shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle commande</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 p-3.5 rounded-2xl shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Rechercher par nom, réf..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['Tous', 'En cours', 'Livré', 'En attente'].map(st => (
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
                <th className="py-3.5 px-4">Référence</th>
                <th className="py-3.5 px-4">Type de site</th>
                <th className="py-3.5 px-4">Nom du projet</th>
                <th className="py-3.5 px-4">Montant</th>
                <th className="py-3.5 px-4">Statut</th>
                <th className="py-3.5 px-4">Date commande</th>
                <th className="py-3.5 px-4">Livraison prévue</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {ord.id}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">
                    {ord.type}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {ord.siteName}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {ord.amount.toLocaleString('fr-FR')} FCFA
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        ord.status === 'En cours'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : ord.status === 'Livré'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {ord.orderDate}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono">
                    {ord.deliveryDate}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setSelectedOrderForDeposit(ord);
                        setIsDepositModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-[#00A651] hover:text-white transition-all text-xs font-bold cursor-pointer"
                      title="Facture d'acompte"
                    >
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>Acompte</span>
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
