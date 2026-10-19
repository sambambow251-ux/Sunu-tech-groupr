import React from 'react';
import { useApp } from '../../context/AppContext';
import { Globe, ExternalLink, Calendar, Server, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export const AdminSites: React.FC = () => {
  const { sites } = useApp();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          Suivi des déploiements & hébergements
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Surveillance des livraisons, des noms de domaine (.sn, .com) et de la maintenance serveurs
        </p>
      </div>

      {/* 3 Status Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#00A651] flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold">Sites en production</p>
            <p className="text-xl font-black text-slate-900 font-mono">
              {sites.filter(s => s.status === 'Livré').length} sites
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold">En cours de conception</p>
            <p className="text-xl font-black text-slate-900 font-mono">
              {sites.filter(s => s.status === 'En cours').length} sites
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#00A651] flex items-center justify-center">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold">Disponibilité serveurs</p>
            <p className="text-xl font-black text-[#00A651] font-mono">99.98%</p>
          </div>
        </div>
      </div>

      {/* Sites List */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 text-[11px] uppercase tracking-wider font-semibold bg-slate-50/50">
                <th className="py-3.5 px-4">Projet / Nom du site</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Nom de domaine</th>
                <th className="py-3.5 px-4">Statut livraison</th>
                <th className="py-3.5 px-4">Échéance de livraison</th>
                <th className="py-3.5 px-4">Hébergement</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sites.map((site) => (
                <tr key={site.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[#00A651]" />
                      <span>{site.siteName}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    {site.type}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {site.domain || `${site.siteName.toLowerCase()}.sn`}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        site.status === 'Livré'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}
                    >
                      {site.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    {site.deliveryDate}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200">
                      {site.hostingStatus || 'Actif'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <a
                      href={site.url || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 font-bold text-xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Voir en direct</span>
                    </a>
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
