import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Clock, CheckCircle2, DollarSign, Plus, Eye, FileText, ShieldCheck } from 'lucide-react';

export const ClientDashboard: React.FC = () => {
  const { 
    currentUser, 
    orders, 
    invoices, 
    setActiveClientTab, 
    setSelectedInvoice 
  } = useApp();

  const totalCommandes = orders.length;
  const enCoursCount = orders.filter(o => o.status === 'En cours').length;
  const livreesCount = orders.filter(o => o.status === 'Livré').length;
  const totalDepense = invoices
    .filter(i => i.status === 'Payée')
    .reduce((sum, i) => sum + i.amountToPay, 0);

  const kpis = [
    {
      title: 'Total commandes',
      value: totalCommandes,
      icon: ShoppingBag,
      color: 'bg-white text-emerald-800 border-slate-200 shadow-xs',
      iconBg: 'bg-emerald-50 text-[#00A651]',
    },
    {
      title: 'En cours',
      value: enCoursCount,
      icon: Clock,
      color: 'bg-white text-blue-800 border-slate-200 shadow-xs',
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Livrées',
      value: livreesCount,
      icon: CheckCircle2,
      color: 'bg-white text-teal-800 border-slate-200 shadow-xs',
      iconBg: 'bg-teal-50 text-teal-600',
    },
    {
      title: 'Total dépensé',
      value: `${totalDepense.toLocaleString('fr-FR')} FCFA`,
      icon: DollarSign,
      color: 'bg-white text-purple-800 border-slate-200 shadow-xs',
      iconBg: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 max-w-6xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>Bonjour, {currentUser.name}</span>
            <span className="text-xl">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Voici un aperçu de votre activité avec Sunu Tech Groupe.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-[#00A651]" />
          <span>Compte vérifié : {currentUser.email}</span>
        </div>
      </div>

      {/* 4 KPI Cards matching Image 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl border ${kpi.color} flex items-center justify-between transition-all hover:-translate-y-0.5 hover:shadow-md`}
            >
              <div>
                <p className="text-xs font-bold text-slate-500">{kpi.title}</p>
                <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-mono">
                  {kpi.value}
                </p>
              </div>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${kpi.iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Section: Mes dernières commandes */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-slate-900">
            Mes dernières commandes
          </h2>
          <button
            onClick={() => setActiveClientTab('orders')}
            className="text-xs text-[#00A651] hover:text-emerald-700 font-bold cursor-pointer"
          >
            Voir tout
          </button>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 text-[11px] uppercase tracking-wider font-semibold bg-slate-50/50">
                <th className="py-3 px-3">#</th>
                <th className="py-3 px-3">Type de site</th>
                <th className="py-3 px-3">Montant</th>
                <th className="py-3 px-3">Statut</th>
                <th className="py-3 px-3">Date de commande</th>
                <th className="py-3 px-3">Livraison prévue</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.slice(0, 4).map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900">
                    {order.id}
                  </td>
                  <td className="py-3.5 px-3 font-medium text-slate-900">
                    <div className="font-bold">{order.type}</div>
                    <div className="text-[10px] text-slate-500 font-normal">{order.siteName}</div>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900">
                    {order.amount.toLocaleString('fr-FR')} FCFA
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        order.status === 'En cours'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : order.status === 'Livré'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600">
                    {order.orderDate}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 font-mono">
                    {order.deliveryDate}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => setActiveClientTab('sites')}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-[#00A651] hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Voir le site"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Button "+ Nouvelle commande" */}
        <div className="pt-2">
          <button
            onClick={() => setActiveClientTab('new-order')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white font-bold text-xs shadow-sm shadow-emerald-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nouvelle commande</span>
          </button>
        </div>
      </div>

      {/* Section: Dernières factures */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-slate-900">
            Dernières factures
          </h2>
          <button
            onClick={() => setActiveClientTab('invoices')}
            className="text-xs text-[#00A651] hover:text-emerald-700 font-bold cursor-pointer"
          >
            Voir tout
          </button>
        </div>

        {/* Invoices Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 text-[11px] uppercase tracking-wider font-semibold bg-slate-50/50">
                <th className="py-3 px-3">N° facture</th>
                <th className="py-3 px-3">Client</th>
                <th className="py-3 px-3">Montant</th>
                <th className="py-3 px-3">Statut</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.slice(0, 4).map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900">
                    {inv.id}
                  </td>
                  <td className="py-3.5 px-3 text-slate-700 font-medium">
                    {inv.clientName}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900">
                    {inv.amountToPay.toLocaleString('fr-FR')} FCFA
                  </td>
                  <td className="py-3.5 px-3">
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
                  <td className="py-3.5 px-3 text-slate-600">
                    {inv.issueDate}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#00A651] text-slate-700 hover:text-white text-xs font-bold transition-all cursor-pointer border border-slate-200 hover:border-[#00A651]"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Voir facture</span>
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
