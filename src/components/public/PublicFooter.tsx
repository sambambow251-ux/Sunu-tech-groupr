import React from 'react';
import { Logo } from '../common/Logo';
import { Mail, Phone, MapPin, ArrowUp, MessageCircle } from 'lucide-react';
import { COMPANY_PHONE, COMPANY_PHONE_RAW, COMPANY_EMAIL, COMPANY_ADDRESS } from '../../data/mockData';

interface PublicFooterProps {
  onNavigate: (sectionId: string) => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info (4 cols) with exact new logo */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="md" variant="light" showSubtitle={true} />
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm pt-2">
              Sunu Tech Groupe accompagne les entreprises, les commerçants et les entrepreneurs dans la création de solutions numériques innovantes et durables.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#00A651] hover:border-emerald-500/50 transition-colors"
                aria-label="Facebook"
              >
                <span className="font-bold text-xs">f</span>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#00A651] hover:border-emerald-500/50 transition-colors"
                aria-label="TikTok"
              >
                <span className="font-bold text-xs">tk</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#00A651] hover:border-emerald-500/50 transition-colors"
                aria-label="LinkedIn"
              >
                <span className="font-bold text-xs">in</span>
              </a>
              <a
                href={`https://wa.me/${COMPANY_PHONE_RAW}?text=Bonjour%20Sunu%20Tech%20Groupe`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#00A651] hover:border-[#00A651]/50 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              {['Accueil', 'Services', 'Réalisations', 'À propos', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate(item === 'Accueil' ? 'hero' : item === 'À propos' ? 'about' : item.toLowerCase())}
                    className="hover:text-[#00A651] transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Nos services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Nos services
            </h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('services')} className="hover:text-[#00A651] cursor-pointer">Sites vitrines</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-[#00A651] cursor-pointer">E-commerce</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-[#00A651] cursor-pointer">Applications web & mobile</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-[#00A651] cursor-pointer">Refonte de sites</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-[#00A651] cursor-pointer">Hébergement & domaines</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-[#00A651] cursor-pointer">Maintenance & infogérance</button></li>
            </ul>
          </div>

          {/* Contact & Slogan (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Contact Sénégal
            </h4>
            <div className="space-y-2.5 text-xs">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#00A651]" />
                <a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-white transition-colors">{COMPANY_EMAIL}</a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#00A651]" />
                <a href={`tel:${COMPANY_PHONE_RAW}`} className="hover:text-white font-mono transition-colors">{COMPANY_PHONE}</a>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#00A651]" />
                <span>{COMPANY_ADDRESS}</span>
              </p>
            </div>

            {/* Handwritten script slogan */}
            <div className="pt-2">
              <span className="font-script text-xl text-[#00A651] font-bold block transform -rotate-1">
                Ensemble, vers le digital !
              </span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 Sunu Tech Groupe. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Mentions légales</span>
            <span className="hover:text-slate-400 cursor-pointer">Politique de confidentialité & Sécurité SSL</span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-[#00A651] text-white flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-md cursor-pointer ml-2"
              title="Retour en haut"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
