import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, ShieldCheck, Building, Phone, Mail, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_PHONE, COMPANY_EMAIL, COMPANY_ADDRESS } from '../../data/mockData';

export const AdminSettings: React.FC = () => {
  const [companyName, setCompanyName] = useState('Sunu Tech Groupe');
  const [slogan, setSlogan] = useState('Innovation • Technologie • Impact');
  const [phone, setPhone] = useState(COMPANY_PHONE);
  const [email, setEmail] = useState(COMPANY_EMAIL);
  const [address, setAddress] = useState(COMPANY_ADDRESS);
  const [currency, setCurrency] = useState('FCFA (XOF)');
  const [defaultDeposit, setDefaultDeposit] = useState(50);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 }
    });
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          Paramètres de l'entreprise
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configuration générale de Sunu Tech Groupe, devises et mentions légales
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        
        {saved && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center gap-3 text-xs text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-[#00A651] shrink-0" />
            <span className="font-bold">Paramètres enregistrés avec succès.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nom officiel de l'entreprise
              </label>
              <input
                type="text"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Slogan de marque
              </label>
              <input
                type="text"
                value={slogan}
                onChange={e => setSlogan(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Téléphone principal (Dakar)
              </label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email officiel de l'entreprise
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Adresse du siège social
              </label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Acompte par défaut (%)
              </label>
              <input
                type="number"
                value={defaultDeposit}
                onChange={e => setDefaultDeposit(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651] font-mono font-bold"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Enregistrer les paramètres</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
