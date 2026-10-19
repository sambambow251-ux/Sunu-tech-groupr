import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, AlertTriangle, KeyRound, CheckCircle2, Server, Smartphone, Laptop } from 'lucide-react';
import { COMPANY_EMAIL } from '../../data/mockData';

export const AdminSecurity: React.FC = () => {
  const { securityLogs } = useApp();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-[#00A651]" />
          <span>Sécurité du système & Journal des connexions</span>
        </h1>
        <p className="text-xs text-slate-600 mt-0.5">
          Surveillance en temps réel des accès, certificats SSL/TLS et détection des intrusions
        </p>
      </div>

      {/* 3 Security Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#00A651] flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Chiffrement en transit</p>
            <p className="text-base font-black text-slate-900">TLS 1.3 / SSL 256-bit</p>
            <p className="text-[10px] text-emerald-800 font-bold">Certificat Let's Encrypt Actif</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#00A651] flex items-center justify-center shrink-0">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Politique de mots de passe</p>
            <p className="text-base font-black text-slate-900">Hashage Argon2id</p>
            <p className="text-[10px] text-emerald-800 font-bold">Salage cryptographique</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#00A651] flex items-center justify-center shrink-0">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Pare-feu applicatif (WAF)</p>
            <p className="text-base font-black text-slate-900">Anti-DDoS & Bruteforce</p>
            <p className="text-[10px] text-emerald-800 font-bold">0 intrusion détectée</p>
          </div>
        </div>
      </div>

      {/* Security Audit Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">
            Journal d'audit des connexions récentes
          </h2>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
            Temps réel
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 text-[11px] uppercase tracking-wider font-semibold bg-slate-50/50">
                <th className="py-3 px-4">Date & Heure</th>
                <th className="py-3 px-4">Utilisateur</th>
                <th className="py-3 px-4">Événement</th>
                <th className="py-3 px-4">Adresse IP</th>
                <th className="py-3 px-4">Appareil / Navigateur</th>
                <th className="py-3 px-4 text-right">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {securityLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-600">
                    {log.timestamp}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {log.userEmail}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {log.action}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    {log.ipAddress}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {log.device}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        log.status === 'Sécurisé'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-red-100 text-red-800 border border-red-200'
                      }`}
                    >
                      {log.status}
                    </span>
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
