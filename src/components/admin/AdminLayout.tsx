import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  FileText, 
  Globe, 
  BarChart2, 
  Settings, 
  LogOut, 
  ShieldCheck,
  Plus,
  Menu,
  X
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { 
    activeAdminTab, 
    setActiveAdminTab, 
    setViewMode, 
    setIsDepositModalOpen,
    logout,
    orders,
    invoices,
    clients,
    securityLogs 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'clients', label: 'Clients', icon: Users, count: clients.length },
    { id: 'orders', label: 'Commandes', icon: ShoppingCart, count: orders.length },
    { id: 'factures', label: 'Factures', icon: FileText, count: invoices.length },
    { id: 'sites', label: 'Sites', icon: Globe },
    { id: 'statistiques', label: 'Statistiques', icon: BarChart2 },
    { id: 'securite', label: 'Sécurité & Accès', icon: ShieldCheck, count: securityLogs.length },
    { id: 'parametres', label: 'Paramètres', icon: Settings },
  ];

  const handleSelectTab = (tabId: string) => {
    setActiveAdminTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-900 flex flex-col md:flex-row pb-16 md:pb-0">
      
      {/* Admin Desktop/Tablet Sidebar */}
      <aside className="hidden md:flex w-64 lg:w-72 bg-white border-r border-slate-200 shrink-0 flex-col justify-between py-6 px-4 shadow-sm sticky top-0 h-screen overflow-y-auto">
        <div className="space-y-6">
          
          {/* Logo & Admin Badge */}
          <div className="px-2">
            <div 
              onClick={() => setViewMode('public')}
              className="cursor-pointer"
              title="Retour au site public"
            >
              <Logo size="md" variant="dark" />
            </div>
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-800">
              <ShieldCheck className="w-3 h-3 text-[#00A651]" />
              <span>Back-office Direction Dakar</span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeAdminTab === item.id;

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

        {/* Quick Deposit Invoice shortcut & Logout */}
        <div className="pt-4 border-t border-slate-200 space-y-2">
          <button
            onClick={() => setIsDepositModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-[#00A651] hover:text-white text-xs font-bold transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Facture d'acompte</span>
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion sécurisée</span>
          </button>
        </div>

      </aside>

      {/* Admin Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="w-72 bg-white h-full shadow-2xl p-5 flex flex-col justify-between animate-in slide-in-from-left duration-200 overflow-y-auto">
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

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-800">
                <ShieldCheck className="w-3 h-3 text-[#00A651]" />
                <span>Administration Sunu Tech</span>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeAdminTab === item.id;
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
                onClick={() => { setIsDepositModalOpen(true); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Créer facture</span>
              </button>
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

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Admin Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-xs sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-2">
                <span>Administration</span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono font-bold hidden sm:inline">
                  Sénégal (FCFA)
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setViewMode('public')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
              title="Retour au site public"
            >
              <Globe className="w-3.5 h-3.5 text-[#00A651]" />
              <span className="hidden sm:inline">Site public</span>
            </button>

            <button
              onClick={() => setIsDepositModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00A651] hover:bg-emerald-600 text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Créer facture</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('securite')}
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Centre de Sécurité"
            >
              <ShieldCheck className="w-4 h-4 text-[#00A651]" />
            </button>

            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-emerald-400 font-black text-xs flex items-center justify-center">
                ST
              </div>
              <div className="hidden sm:block text-left text-xs">
                <p className="font-bold text-slate-900 leading-none">Direction Sunu Tech</p>
                <p className="text-[10px] text-slate-500">Sécurité SSL active</p>
              </div>
            </div>
          </div>
        </header>

        {/* Viewport Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>

      </div>

      {/* Admin Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-slate-200 px-3 flex items-center justify-around z-40 shadow-lg">
        <button
          onClick={() => setActiveAdminTab('dashboard')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            activeAdminTab === 'dashboard' ? 'text-[#00A651]' : 'text-slate-500'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Accueil</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('clients')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            activeAdminTab === 'clients' ? 'text-[#00A651]' : 'text-slate-500'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Clients</span>
        </button>

        <button
          onClick={() => setIsDepositModalOpen(true)}
          className="flex flex-col items-center -mt-5"
          title="Nouvelle facture d'acompte"
        >
          <div className="w-11 h-11 rounded-full bg-[#00A651] text-white flex items-center justify-center shadow-lg shadow-emerald-500/40">
            <Plus className="w-5 h-5" />
          </div>
        </button>

        <button
          onClick={() => setActiveAdminTab('orders')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            activeAdminTab === 'orders' ? 'text-[#00A651]' : 'text-slate-500'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Commandes</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('securite')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            activeAdminTab === 'securite' ? 'text-[#00A651]' : 'text-slate-500'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Sécurité</span>
        </button>
      </nav>

    </div>
  );
};
