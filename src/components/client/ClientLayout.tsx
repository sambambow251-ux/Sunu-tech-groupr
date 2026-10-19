import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  FileText, 
  Globe, 
  User, 
  HelpCircle, 
  LogOut, 
  Bell, 
  ChevronRight,
  ShieldCheck,
  Menu,
  X,
  Plus
} from 'lucide-react';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const { 
    activeClientTab, 
    setActiveClientTab, 
    currentUser, 
    setViewMode,
    logout,
    orders,
    invoices
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'orders', label: 'Mes commandes', icon: ShoppingBag, count: orders.length },
    { id: 'new-order', label: 'Nouvelle commande', icon: Plus },
    { id: 'invoices', label: 'Mes factures', icon: FileText, count: invoices.length },
    { id: 'sites', label: 'Mes sites', icon: Globe },
    { id: 'profile', label: 'Mon profil', icon: User },
    { id: 'support', label: 'Support & Assistance', icon: HelpCircle },
  ];

  const handleSelectTab = (tabId: string) => {
    setActiveClientTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-900 flex flex-col md:flex-row pb-16 md:pb-0">
      
      {/* Desktop / Tablet Sidebar (hidden on mobile) */}
      <aside className="hidden md:flex w-64 lg:w-72 bg-white border-r border-slate-200 shrink-0 flex-col justify-between py-6 px-4 shadow-sm sticky top-0 h-screen overflow-y-auto">
        <div className="space-y-6">
          {/* Logo */}
          <div 
            onClick={() => setViewMode('public')}
            className="cursor-pointer px-2"
            title="Retour au site public"
          >
            <Logo size="md" variant="dark" />
          </div>

          <div className="px-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Espace Client
            </span>
          </div>

          {/* Navigation links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeClientTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#00A651] text-white shadow-xs shadow-emerald-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>

                  {item.count !== undefined && item.count > 0 && (
                    <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom logout & SSL Badge */}
        <div className="pt-6 border-t border-slate-200 space-y-2.5">
          <div className="px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00A651] shrink-0" />
            <span>Connexion SSL 256-bit vérifiée</span>
          </div>

          <button
            onClick={() => setViewMode('public')}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#00A651]" />
            <span>Retour au site public</span>
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer (Visible on small screens when open) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="w-72 bg-white h-full shadow-2xl p-5 flex flex-col justify-between animate-in slide-in-from-left duration-200">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <Logo size="sm" variant="dark" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeClientTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive ? 'bg-[#00A651] text-white' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.count !== undefined && item.count > 0 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-200">
              <button
                onClick={() => { setViewMode('public'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Retour au site public
              </button>
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-xs sticky top-0 z-30">
          <div className="flex items-center gap-3">
            {/* Hamburger on mobile */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">Espace Client</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
              <span className="text-xs sm:text-sm font-bold text-slate-900 capitalize">
                {navItems.find(i => i.id === activeClientTab)?.label || 'Tableau de bord'}
              </span>
            </div>
          </div>

          {/* User badge and actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setViewMode('public')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
              title="Retour au site public"
            >
              <Globe className="w-3.5 h-3.5 text-[#00A651]" />
              <span className="hidden sm:inline">Site public</span>
            </button>

            <button
              onClick={() => setActiveClientTab('new-order')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00A651] hover:bg-emerald-600 text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Commander</span>
            </button>

            <button
              onClick={() => setActiveClientTab('invoices')}
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Factures & Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00A651]" />
            </button>

            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-emerald-500/40"
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-none">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-emerald-800 font-bold mt-0.5">
                  Client Partenaire
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Viewport Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>

      </div>

      {/* Mobile Bottom Tab Navigation for Smartphone thumbs */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-slate-200 px-3 flex items-center justify-around z-40 shadow-lg">
        <button
          onClick={() => setActiveClientTab('dashboard')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            activeClientTab === 'dashboard' ? 'text-[#00A651]' : 'text-slate-500'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Accueil</span>
        </button>

        <button
          onClick={() => setActiveClientTab('orders')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            activeClientTab === 'orders' ? 'text-[#00A651]' : 'text-slate-500'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Commandes</span>
        </button>

        <button
          onClick={() => setActiveClientTab('new-order')}
          className="flex flex-col items-center -mt-5"
          title="Nouvelle commande"
        >
          <div className="w-11 h-11 rounded-full bg-[#00A651] text-white flex items-center justify-center shadow-lg shadow-emerald-500/40">
            <Plus className="w-5 h-5" />
          </div>
        </button>

        <button
          onClick={() => setActiveClientTab('invoices')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            activeClientTab === 'invoices' ? 'text-[#00A651]' : 'text-slate-500'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Factures</span>
        </button>

        <button
          onClick={() => setActiveClientTab('profile')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            activeClientTab === 'profile' ? 'text-[#00A651]' : 'text-slate-500'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profil</span>
        </button>
      </nav>

    </div>
  );
};
