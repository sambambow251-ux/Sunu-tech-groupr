import React from 'react';
import { useApp } from '../../context/AppContext';
import { STATS_MONTHLY_ORDERS } from '../../data/mockData';
import { Users, ShoppingCart, FileText, DollarSign, TrendingUp, Plus, ShieldCheck } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    orders, 
    invoices, 
    clients, 
    setActiveAdminTab, 
    setIsDepositModalOpen 
  } = useApp();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.depositAmount || Math.round(o.amount * 0.5)), 0);

  const kpis = [
    {
      title: 'Clients',
      value: String(clients.length),
      icon: Users,
      color: 'bg-white text-emerald-800 border-slate-200 shadow-xs',
      iconBg: 'bg-emerald-50 text-[#00A651]',
    },
    {
      title: 'Commandes',
      value: String(orders.length),
      icon: ShoppingCart,
      color: 'bg-white text-blue-800 border-slate-200 shadow-xs',
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Factures',
      value: String(invoices.length),
      icon: FileText,
      color: 'bg-white text-purple-800 border-slate-200 shadow-xs',
      iconBg: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Acomptes Reçus',
      value: `${totalRevenue.toLocaleString('fr-FR')} FCFA`,
      icon: DollarSign,
      color: 'bg-white text-emerald-950 border-emerald-300 shadow-xs',
      iconBg: 'bg-emerald-100 text-[#00A651]',
    },
  ];

  const maxOrders = Math.max(...STATS_MONTHLY_ORDERS.map(s => s.orders));

  return (
    <div className="space-y-6 sm:space-y-8 max-w-6xl mx-auto">
      
      {/* 4 Admin KPI Cards */}
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

      {/* Main Charts & Recent Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Commandes par mois Bar Chart */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-black text-slate-900">
                Commandes par mois
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">Évolution des contrats digitaux signés en 2026</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-black text-[#00A651] font-mono">
              <TrendingUp className="w-3.5 h-3.5" />
              +28% ce mois
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-48 pt-6 pb-2 flex items-end justify-between gap-1 sm:gap-2 border-b border-slate-100">
            {STATS_MONTHLY_ORDERS.map((item, idx) => {
              const heightPercent = Math.round((item.orders / maxOrders) * 100);
              const isPeak = item.month === 'Sep' || item.month === 'Oct' || item.month === 'Déc';

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-slate-900 text-white px-1.5 py-0.5 rounded shadow-md pointer-events-none whitespace-nowrap font-mono font-bold">
                    {item.orders} cmd
                  </div>

                  {/* Bar */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full max-w-[24px] rounded-t-md transition-all duration-300 ${
                      isPeak
                        ? 'bg-[#00A651] shadow-xs'
                        : 'bg-emerald-200 group-hover:bg-[#00A651]'
                    }`}
                  />
                  
                  {/* Label */}
                  <span className="text-[10px] font-bold text-slate-500 group-hover:text-[#00A651] transition-colors">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <span>Moyenne mensuelle : 15 commandes</span>
            <span className="font-bold text-slate-700">Devise : FCFA (XOF)</span>
          </div>
        </div>

        {/* Right Column: Dernières commandes */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-black text-slate-900">
              Dernières commandes
            </h2>
            <button
              onClick={() => setActiveAdminTab('orders')}
              className="text-xs text-[#00A651] hover:text-emerald-700 font-bold cursor-pointer"
            >
              Voir tout
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500 text-[11px] uppercase tracking-wider font-semibold bg-slate-50/50">
                  <th className="py-2.5 px-2">Client</th>
                  <th className="py-2.5 px-2">Type</th>
                  <th className="py-2.5 px-2">Montant</th>
                  <th className="py-2.5 px-2 text-right">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.slice(0, 5).map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-2 font-medium text-slate-900">
                      <div className="font-bold">{ord.clientName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{ord.id}</div>
                    </td>
                    <td className="py-3 px-2 text-slate-600 text-[11px]">
                      {ord.type}
                    </td>
                    <td className="py-3 px-2 font-mono font-bold text-slate-900">
                      {ord.amount.toLocaleString('fr-FR')}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          ord.status === 'Livré'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : ord.status === 'En cours'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              onClick={() => setIsDepositModalOpen(true)}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-[#00A651] hover:text-white transition-all text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Générer une facture d'acompte (50%)</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
