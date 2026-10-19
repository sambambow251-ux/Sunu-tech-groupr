import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Globe, ExternalLink, ChevronDown, CheckCircle, Clock, Server, Settings } from 'lucide-react';

export const ClientSites: React.FC = () => {
  const { sites, setActiveClientTab } = useApp();
  const [selectedSiteAction, setSelectedSiteAction] = useState<string | null>(null);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Mes sites
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Retrouvez tous les sites web conçus et hébergés pour votre entreprise
          </p>
        </div>

        <button
          onClick={() => setActiveClientTab('new-order')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white font-bold text-xs shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Commander un site</span>
        </button>
      </div>

      {/* Sites Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 text-[11px] uppercase tracking-wider font-semibold bg-slate-50/50">
                <th className="py-3.5 px-4">Nom du site</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Statut</th>
                <th className="py-3.5 px-4">Date de livraison</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sites.map((site) => (
                <tr key={site.id} className="hover:bg-slate-50/70 transition-colors">
                  
                  {/* Nom du site */}
                  <td className="py-4 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#00A651]">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{site.siteName}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{site.domain || `${site.siteName.toLowerCase()}.sn`}</p>
                      </div>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="py-4 px-4 text-slate-700 font-medium">
                    {site.type}
                  </td>

                  {/* Statut pill */}
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold ${
                        site.status === 'Livré'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : site.status === 'En cours'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {site.status}
                    </span>
                  </td>

                  {/* Date de livraison */}
                  <td className="py-4 px-4 text-slate-600 font-mono">
                    {site.deliveryDate}
                  </td>

                  {/* Actions Dropdown Button */}
                  <td className="py-4 px-4 text-right relative">
                    <div className="inline-block text-left">
                      <button
                        onClick={() => setSelectedSiteAction(selectedSiteAction === site.id ? null : site.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold cursor-pointer"
                      >
                        <span>Voir</span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      </button>

                      {selectedSiteAction === site.id && (
                        <div className="absolute right-4 mt-2 w-48 rounded-2xl bg-white border border-slate-200 shadow-xl z-20 py-2 text-left text-xs animate-in fade-in-50 duration-150">
                          <a
                            href={site.url || '#'}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-emerald-50 hover:text-[#00A651]"
                            onClick={() => setSelectedSiteAction(null)}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Visiter le site</span>
                          </a>
                          <button
                            onClick={() => {
                              setSelectedSiteAction(null);
                              alert(`Statut d'hébergement pour ${site.siteName} : ${site.hostingStatus || 'Actif'} sur cluster Dakar Cloud.`);
                            }}
                            className="w-full text-left flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-emerald-50 hover:text-[#00A651] cursor-pointer"
                          >
                            <Server className="w-3.5 h-3.5" />
                            <span>Statut hébergement</span>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedSiteAction(null);
                              setActiveClientTab('support');
                            }}
                            className="w-full text-left flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-emerald-50 hover:text-[#00A651] cursor-pointer"
                          >
                            <Settings className="w-3.5 h-3.5" />
                            <span>Demande de modification</span>
                          </button>
                        </div>
                      )}
                    </div>
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
