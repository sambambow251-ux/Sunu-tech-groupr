import React from 'react';
import { useApp } from '../../context/AppContext';
import { STATS_MONTHLY_ORDERS } from '../../data/mockData';
import { BarChart3, TrendingUp, DollarSign, PieChart, ShieldCheck } from 'lucide-react';

export const AdminStats: React.FC = () => {
  const { orders, invoices, clients } = useApp();

  const serviceBreakdown = [
    { type: 'Sites vitrines', percentage: 40, revenue: '1 200 000 FCFA' },
    { type: 'Sites e-commerce', percentage: 35, revenue: '900 000 FCFA' },
    { type: 'Applications sur mesure', percentage: 25, revenue: '750 000 FCFA' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          Statistiques & Analyses financières
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Indicateurs de croissance et ventilation du chiffre d'affaires en FCFA
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Revenue Breakdown */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#00A651]" />
              <span>Répartition par type de prestation</span>
            </h2>
          </div>

          <div className="space-y-3.5 pt-2">
            {serviceBreakdown.map((s, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 font-bold">{s.type}</span>
                  <span className="font-mono text-[#00A651] font-black">{s.revenue} ({s.percentage}%)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    style={{ width: `${s.percentage}%` }}
                    className="h-full bg-[#00A651] rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
          <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#00A651]" />
            <span>Moyens de paiements utilisés (Sénégal)</span>
          </h2>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-600">Wave Sénégal</span>
                <span className="text-xs font-mono font-black text-slate-900">62%</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Acomptes instantanés par QR</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-600">Orange Money</span>
                <span className="text-xs font-mono font-black text-slate-900">28%</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Transferts marchands</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Virement bancaire</span>
                <span className="text-xs font-mono font-black text-slate-900">8%</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Grands comptes & SARL</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#00A651]">Espèces / Chèque</span>
                <span className="text-xs font-mono font-black text-slate-900">2%</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Paiement au siège Dakar</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
