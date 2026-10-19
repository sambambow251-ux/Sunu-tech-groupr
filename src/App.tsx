import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { MobileFrame } from './components/common/MobileFrame';
import { InvoiceDocument } from './components/common/InvoiceDocument';
import { DepositInvoiceWizard } from './components/common/DepositInvoiceWizard';
import { QuoteModal } from './components/public/QuoteModal';
import { AuthModal } from './components/common/AuthModal';

// Public site components
import { PublicHeader } from './components/public/PublicHeader';
import { Hero } from './components/public/Hero';
import { ServicesSection } from './components/public/ServicesSection';
import { ProjectsSection } from './components/public/ProjectsSection';
import { ProcessSection } from './components/public/ProcessSection';
import { WhyUsSection } from './components/public/WhyUsSection';
import { CtaBanner } from './components/public/CtaBanner';
import { ContactSection } from './components/public/ContactSection';
import { AboutSection } from './components/public/AboutSection';
import { PublicFooter } from './components/public/PublicFooter';

// Client components
import { ClientLayout } from './components/client/ClientLayout';
import { ClientDashboard } from './components/client/ClientDashboard';
import { ClientOrders } from './components/client/ClientOrders';
import { NewOrderWizard } from './components/client/NewOrderWizard';
import { ClientInvoices } from './components/client/ClientInvoices';
import { ClientSites } from './components/client/ClientSites';
import { ClientProfile } from './components/client/ClientProfile';
import { ClientSupport } from './components/client/ClientSupport';

// Admin components
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminClients } from './components/admin/AdminClients';
import { AdminOrders } from './components/admin/AdminOrders';
import { AdminInvoices } from './components/admin/AdminInvoices';
import { AdminSites } from './components/admin/AdminSites';
import { AdminStats } from './components/admin/AdminStats';
import { AdminSecurity } from './components/admin/AdminSecurity';
import { AdminSettings } from './components/admin/AdminSettings';

const MainAppContent: React.FC = () => {
  const { 
    viewMode, 
    activeClientTab, 
    activeAdminTab, 
    selectedInvoice, 
    setSelectedInvoice 
  } = useApp();

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderClientView = () => {
    switch (activeClientTab) {
      case 'dashboard':
        return <ClientDashboard />;
      case 'orders':
        return <ClientOrders />;
      case 'new-order':
        return <NewOrderWizard />;
      case 'invoices':
        return <ClientInvoices />;
      case 'sites':
        return <ClientSites />;
      case 'profile':
        return <ClientProfile />;
      case 'support':
        return <ClientSupport />;
      default:
        return <ClientDashboard />;
    }
  };

  const renderAdminView = () => {
    switch (activeAdminTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'clients':
        return <AdminClients />;
      case 'orders':
        return <AdminOrders />;
      case 'factures':
        return <AdminInvoices />;
      case 'sites':
        return <AdminSites />;
      case 'statistiques':
        return <AdminStats />;
      case 'securite':
        return <AdminSecurity />;
      case 'parametres':
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${viewMode === 'public' ? 'bg-[#0B0F0E] text-slate-100' : 'bg-slate-100/80 text-slate-900'}`}>
      <MobileFrame>
        {/* Public Landing Page Mode */}
        {viewMode === 'public' && (
          <div className="flex flex-col min-h-screen bg-[#0B0F0E] text-slate-100">
            <PublicHeader onNavigate={handleNavigate} />
            <main className="flex-1">
              <div id="hero">
                <Hero 
                  onExploreServices={() => handleNavigate('services')}
                  onContactClick={() => handleNavigate('contact')}
                />
              </div>
              <ServicesSection />
              <ProjectsSection />
              <ProcessSection />
              <WhyUsSection />
              <CtaBanner />
              <ContactSection />
              <AboutSection />
            </main>
            <PublicFooter onNavigate={handleNavigate} />
          </div>
        )}

        {/* Espace Client (Samba Mbow) Mode */}
        {viewMode === 'client' && (
          <ClientLayout>
            {renderClientView()}
          </ClientLayout>
        )}

        {/* Administration Mode */}
        {viewMode === 'admin' && (
          <AdminLayout>
            {renderAdminView()}
          </AdminLayout>
        )}
      </MobileFrame>

      {/* Global Modals */}
      {selectedInvoice && (
        <InvoiceDocument
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          isModal={true}
        />
      )}

      <DepositInvoiceWizard />
      <QuoteModal />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
