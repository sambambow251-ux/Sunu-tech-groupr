import React, { useState } from 'react';
import { HelpCircle, MessageCircle, Phone, Mail, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_PHONE, COMPANY_PHONE_RAW, COMPANY_EMAIL } from '../../data/mockData';

export const ClientSupport: React.FC = () => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [priority, setPriority] = useState('Normale');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setTicketSubject('');
      setTicketMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          Support & Assistance technique
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Notre équipe technique est joignable 6j/7 pour vous accompagner sur vos outils digitaux
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 WhatsApp */}
        <a
          href={`https://wa.me/${COMPANY_PHONE_RAW}?text=Bonjour%20Support%20Sunu%20Tech,%20j'ai%20besoin%20d'aide%20pour%20mon%20site.`}
          target="_blank"
          rel="noreferrer"
          className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-[#00A651] transition-all flex flex-col justify-between group shadow-xs hover:shadow-md"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#00A651] group-hover:bg-[#00A651] group-hover:text-white transition-all">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Assistance WhatsApp</p>
              <p className="text-[11px] text-[#00A651] font-bold">Réponse ~15 min</p>
            </div>
          </div>
          <span className="text-xs text-slate-500">Échange direct avec votre développeur dédié</span>
        </a>

        {/* Card 2 Phone */}
        <a
          href={`tel:${COMPANY_PHONE_RAW}`}
          className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-[#00A651] transition-all flex flex-col justify-between group shadow-xs hover:shadow-md"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#00A651] group-hover:bg-[#00A651] group-hover:text-white transition-all">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Ligne directe Dakar</p>
              <p className="text-[11px] text-[#00A651] font-mono font-bold">{COMPANY_PHONE}</p>
            </div>
          </div>
          <span className="text-xs text-slate-500">Disponibilité : Lun - Sam de 08h30 à 19h</span>
        </a>

        {/* Card 3 Email */}
        <a
          href={`mailto:${COMPANY_EMAIL}`}
          className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-[#00A651] transition-all flex flex-col justify-between group shadow-xs hover:shadow-md"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#00A651] group-hover:bg-[#00A651] group-hover:text-white transition-all">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Email officiel</p>
              <p className="text-[11px] text-[#00A651] font-bold">{COMPANY_EMAIL}</p>
            </div>
          </div>
          <span className="text-xs text-slate-500">Pour l'envoi de documents et maquettes</span>
        </a>
      </div>

      {/* Ticket form */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-1">
          Ouvrir un ticket d'incident ou de demande
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Un ticket sécurisé est automatiquement créé et assigné à un ingénieur système.
        </p>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-[#00A651] mx-auto" />
            <h3 className="text-sm font-bold text-emerald-950">Ticket #TK-2026-089 ouvert avec succès</h3>
            <p className="text-xs text-emerald-800">
              Notre équipe a pris en charge votre demande. Vous recevrez une notification par email dès résolution.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Sujet du ticket <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Ajout d'une nouvelle page sur MonEntreprise"
                  value={ticketSubject}
                  onChange={e => setTicketSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Niveau d'urgence
                </label>
                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651] cursor-pointer"
                >
                  <option value="Normale">Normale (Sous 24h)</option>
                  <option value="Urgente">Urgente (Site indisponible / Problème paiement)</option>
                  <option value="Basse">Basse (Évolution mineure)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Description détaillée du besoin <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Décrivez précisément ce que vous souhaitez modifier, ajouter ou corriger..."
                value={ticketMessage}
                onChange={e => setTicketMessage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#00A651]"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Transmettre le ticket</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
