import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, Client, ClientSite, Invoice, Order, OrderStatus, SecurityLog, SiteType, UserRole, ProjectShowcase } from '../types';
import { 
  INITIAL_CLIENTS, 
  INITIAL_INVOICES, 
  INITIAL_ORDERS, 
  INITIAL_SITES, 
  INITIAL_SECURITY_LOGS,
  SHOWCASE_PROJECTS,
  COMPANY_PHONE,
  COMPANY_EMAIL 
} from '../data/mockData';

interface AppContextType {
  viewMode: 'public' | 'client' | 'admin';
  setViewMode: (mode: 'public' | 'client' | 'admin') => void;
  isMobileMockup: boolean;
  setIsMobileMockup: (val: boolean) => void;
  activeClientTab: string;
  setActiveClientTab: (tab: string) => void;
  activeAdminTab: string;
  setActiveAdminTab: (tab: string) => void;
  
  // Theme (default 'light' with white background as requested: "change le backeroun vert en blanc")
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;

  // Security & Authentication
  isAuthenticated: boolean;
  currentUser: AuthUser;
  securityLogs: SecurityLog[];
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authTargetRole: UserRole;
  setAuthTargetRole: (role: UserRole) => void;
  login: (email: string, password: string, role?: UserRole) => boolean;
  logout: () => void;
  requireAuthFor: (mode: 'client' | 'admin') => void;

  orders: Order[];
  invoices: Invoice[];
  sites: ClientSite[];
  clients: Client[];
  
  addOrder: (orderData: {
    siteName: string;
    type: SiteType;
    amount: number;
    deliveryDate: string;
    description: string;
    clientName?: string;
    clientPhone?: string;
    clientEmail?: string;
    depositAmount?: number;
    paymentMethod?: 'Wave' | 'Orange Money' | 'Espèces' | 'Virement';
    paymentPhone?: string;
    receiptTimestamp?: string;
    orderDate?: string;
  }) => Order;
  
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  
  createDepositInvoice: (data: {
    orderId: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    siteName: string;
    siteType: SiteType;
    totalAmount: number;
    depositPercentage: number;
    deliveryDate: string;
    issueDate?: string;
  }) => Invoice;
  
  markInvoicePaid: (invoiceId: string) => void;
  
  selectedInvoice: Invoice | null;
  setSelectedInvoice: (invoice: Invoice | null) => void;
  
  isDepositModalOpen: boolean;
  setIsDepositModalOpen: (open: boolean) => void;
  selectedOrderForDeposit: Order | null;
  setSelectedOrderForDeposit: (order: Order | null) => void;
  
  isQuoteModalOpen: boolean;
  setIsQuoteModalOpen: (open: boolean) => void;
  selectedServiceForQuote: string | null;
  setSelectedServiceForQuote: (service: string | null) => void;
  openQuoteForService: (service?: string) => void;
  
  showcaseProjects: ProjectShowcase[];
  updateProjectCover: (projectId: string, newImageUrl: string) => void;
  
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<'public' | 'client' | 'admin'>('public');
  const [isMobileMockup, setIsMobileMockup] = useState<boolean>(false);
  const [activeClientTab, setActiveClientTab] = useState<string>('dashboard');
  const [activeAdminTab, setActiveAdminTab] = useState<string>('dashboard');
  
  // Default White theme as requested ("change le backeroun vert en blanc")
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('sunu_tech_theme') === 'dark';
  });

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('sunu_tech_auth') === 'true';
  });

  const [currentUser, setCurrentUser] = useState<AuthUser>(() => {
    const saved = localStorage.getItem('sunu_tech_user');
    return saved ? JSON.parse(saved) : {
      id: 'USR-001',
      name: 'Samba Mbow',
      email: 'sambambow251@gmail.com',
      phone: COMPANY_PHONE,
      role: 'client',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      company: 'MonEntreprise SARL',
      lastLogin: '17/10/2026 à 15:30',
    };
  });

  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>(() => {
    const saved = localStorage.getItem('sunu_tech_security_logs');
    return saved ? JSON.parse(saved) : INITIAL_SECURITY_LOGS;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authTargetRole, setAuthTargetRole] = useState<UserRole>('client');

  // Business state
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('sunu_tech_orders_v2');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('sunu_tech_invoices_v2');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });
  
  const [sites, setSites] = useState<ClientSite[]>(() => {
    const saved = localStorage.getItem('sunu_tech_sites_v2');
    return saved ? JSON.parse(saved) : INITIAL_SITES;
  });
  
  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem('sunu_tech_clients_v2');
    return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
  });
  
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState<boolean>(false);
  const [selectedOrderForDeposit, setSelectedOrderForDeposit] = useState<Order | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string | null>(null);

  const openQuoteForService = (serviceTitle?: string) => {
    setSelectedServiceForQuote(serviceTitle || null);
    setIsQuoteModalOpen(true);
  };

  // Showcase Projects State (persisted so custom user photos are saved)
  const [showcaseProjects, setShowcaseProjects] = useState<ProjectShowcase[]>(() => {
    try {
      const saved = localStorage.getItem('sunu_tech_showcase_projects_v3');
      if (saved) return JSON.parse(saved);
      const v2 = localStorage.getItem('sunu_tech_showcase_projects_v2');
      if (v2) {
        const parsed: ProjectShowcase[] = JSON.parse(v2);
        return SHOWCASE_PROJECTS.map(defProj => {
          const userProj = parsed.find(p => p.id === defProj.id);
          if (userProj && userProj.image && userProj.image.startsWith('data:')) {
            return { ...defProj, image: userProj.image };
          }
          return defProj;
        });
      }
    } catch {
      // Fallback to default
    }
    return SHOWCASE_PROJECTS;
  });

  const updateProjectCover = (projectId: string, newImageUrl: string) => {
    setShowcaseProjects(prev => prev.map(p => p.id === projectId ? { ...p, image: newImageUrl } : p));
  };

  useEffect(() => {
    localStorage.setItem('sunu_tech_showcase_projects_v3', JSON.stringify(showcaseProjects));
  }, [showcaseProjects]);

  useEffect(() => {
    localStorage.setItem('sunu_tech_orders_v2', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('sunu_tech_invoices_v2', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('sunu_tech_sites_v2', JSON.stringify(sites));
  }, [sites]);

  useEffect(() => {
    localStorage.setItem('sunu_tech_clients_v2', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('sunu_tech_auth', isAuthenticated ? 'true' : 'false');
    localStorage.setItem('sunu_tech_user', JSON.stringify(currentUser));
  }, [isAuthenticated, currentUser]);

  useEffect(() => {
    localStorage.setItem('sunu_tech_security_logs', JSON.stringify(securityLogs));
  }, [securityLogs]);

  useEffect(() => {
    localStorage.setItem('sunu_tech_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Auth methods
  const login = (email: string, password: string, role?: UserRole): boolean => {
    const now = new Date().toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const isClient = email.toLowerCase().includes('samba') || role === 'client';
    const resolvedRole: UserRole = isClient ? 'client' : 'admin';

    const newUser: AuthUser = {
      id: isClient ? 'USR-001' : 'ADM-001',
      name: isClient ? 'Samba Mbow' : 'Direction Sunu Tech',
      email: isClient ? 'sambambow251@gmail.com' : COMPANY_EMAIL,
      phone: COMPANY_PHONE,
      role: resolvedRole,
      avatar: isClient 
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      company: isClient ? 'MonEntreprise SARL' : 'Sunu Tech Groupe Dakar',
      lastLogin: now,
    };

    setCurrentUser(newUser);
    setIsAuthenticated(true);

    // Record Security Audit Log
    const newLog: SecurityLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: now,
      userEmail: email,
      action: 'Connexion réussie',
      ipAddress: '196.207.24.89 (Dakar, Sénégal)',
      device: `${navigator.platform || 'Desktop/Mobile'} • Certificat SSL vérifié`,
      status: 'Sécurisé',
    };
    setSecurityLogs(prev => [newLog, ...prev]);

    setIsAuthModalOpen(false);
    setViewMode(resolvedRole);
    return true;
  };

  const logout = () => {
    const now = new Date().toLocaleString('fr-FR');
    const newLog: SecurityLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: now,
      userEmail: currentUser.email,
      action: 'Déconnexion',
      ipAddress: '196.207.24.89 (Dakar, Sénégal)',
      device: 'Session fermée avec succès',
      status: 'Sécurisé',
    };
    setSecurityLogs(prev => [newLog, ...prev]);

    setIsAuthenticated(false);
    setViewMode('public');
  };

  const requireAuthFor = (mode: 'client' | 'admin') => {
    if (!isAuthenticated) {
      setAuthTargetRole(mode);
      setIsAuthModalOpen(true);
      return;
    }

    if (mode === 'admin' && currentUser.role !== 'admin') {
      setAuthTargetRole('admin');
      setIsAuthModalOpen(true);
      return;
    }

    setViewMode(mode);
  };

  const addOrder = (orderData: {
    siteName: string;
    type: SiteType;
    amount: number;
    deliveryDate: string;
    description: string;
    clientName?: string;
    clientPhone?: string;
    clientEmail?: string;
    depositAmount?: number;
    paymentMethod?: 'Wave' | 'Orange Money' | 'Espèces' | 'Virement';
    paymentPhone?: string;
    receiptTimestamp?: string;
    orderDate?: string;
  }) => {
    const orderCount = orders.length + 1;
    const newId = `ST-00${orderCount}`;
    const now = new Date();
    const today = orderData.orderDate || now.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const timestamp = orderData.receiptTimestamp || `${now.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })} à ${now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;

    const effectiveClientName = orderData.clientName || currentUser.name || 'Client Sunu Tech';
    const effectiveClientPhone = orderData.clientPhone || currentUser.phone || COMPANY_PHONE;
    const effectiveClientEmail = orderData.clientEmail || currentUser.email || 'client@sunutech.sn';

    const newOrder: Order = {
      id: newId,
      clientName: effectiveClientName,
      clientEmail: effectiveClientEmail,
      clientPhone: effectiveClientPhone,
      siteName: orderData.siteName,
      type: orderData.type,
      amount: orderData.amount,
      status: 'En cours',
      orderDate: today,
      deliveryDate: orderData.deliveryDate || '20/10/2026',
      description: orderData.description,
      hasDepositInvoice: false,
      depositAmount: orderData.depositAmount || Math.round(orderData.amount * 0.5),
      paymentMethod: orderData.paymentMethod || 'Wave',
      paymentPhone: orderData.paymentPhone || '772915006',
      receiptTimestamp: timestamp,
      validationInvoiceSent: false,
    };

    setOrders(prev => [newOrder, ...prev]);

    // Ensure client is also listed in Admin Clients
    setClients(prev => {
      const exists = prev.some(c => c.name.toLowerCase() === effectiveClientName.toLowerCase() || c.phone === effectiveClientPhone);
      if (!exists) {
        return [
          {
            id: `CLI-00${prev.length + 1}`,
            name: effectiveClientName,
            email: effectiveClientEmail,
            phone: effectiveClientPhone,
            company: orderData.siteName,
            address: 'Dakar, Sénégal',
            totalOrders: 1,
            totalSpent: orderData.amount,
            joinDate: today,
            status: 'Actif',
          },
          ...prev
        ];
      }
      return prev;
    });

    const newSite: ClientSite = {
      id: `site-${Date.now()}`,
      siteName: orderData.siteName,
      type: orderData.type,
      status: 'En cours',
      deliveryDate: orderData.deliveryDate || '20/10/2026',
      domain: `${orderData.siteName.toLowerCase().replace(/[^a-z0-9]/g, '')}.sn`,
      hostingStatus: 'En attente',
    };
    setSites(prev => [newSite, ...prev]);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (newStatus === 'Livré') {
      const ord = orders.find(o => o.id === orderId);
      if (ord) {
        setSites(prev => prev.map(s => s.siteName.toLowerCase() === ord.siteName.toLowerCase() ? { ...s, status: 'Livré', hostingStatus: 'Actif' } : s));
      }
    }
  };

  const createDepositInvoice = (data: {
    orderId: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    siteName: string;
    siteType: SiteType;
    totalAmount: number;
    depositPercentage: number;
    deliveryDate: string;
    issueDate?: string;
  }) => {
    const invoiceCount = invoices.length + 1;
    const invId = `FAC-2026-00${invoiceCount}`;
    const depositAmount = Math.round((data.totalAmount * data.depositPercentage) / 100);
    const dateToday = data.issueDate || new Date().toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const newInvoice: Invoice = {
      id: invId,
      orderId: data.orderId,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone,
      type: 'acompte',
      siteName: data.siteName,
      siteType: data.siteType,
      totalAmount: data.totalAmount,
      depositPercentage: data.depositPercentage,
      amountToPay: depositAmount,
      status: 'Payée',
      issueDate: dateToday,
      dueDate: data.deliveryDate,
      items: [
        {
          description: `Création ${data.siteType.toLowerCase()} (Acompte 50%)`,
          quantity: 1,
          unitPrice: depositAmount,
          total: depositAmount,
        }
      ]
    };

    setInvoices(prev => [newInvoice, ...prev]);
    setOrders(prev => prev.map(o => o.id === data.orderId ? { ...o, hasDepositInvoice: true } : o));

    return newInvoice;
  };

  const markInvoicePaid = (invoiceId: string) => {
    setInvoices(prev => prev.map(inv => inv.id === invoiceId ? { ...inv, status: 'Payée' } : inv));
  };

  const resetToDefaultData = () => {
    localStorage.removeItem('sunu_tech_orders_v2');
    localStorage.removeItem('sunu_tech_invoices_v2');
    localStorage.removeItem('sunu_tech_sites_v2');
    localStorage.removeItem('sunu_tech_clients_v2');
    localStorage.removeItem('sunu_tech_security_logs');
    localStorage.removeItem('sunu_tech_showcase_projects_v2');
    localStorage.removeItem('sunu_tech_showcase_projects_v3');
    setOrders(INITIAL_ORDERS);
    setInvoices(INITIAL_INVOICES);
    setSites(INITIAL_SITES);
    setClients(INITIAL_CLIENTS);
    setSecurityLogs(INITIAL_SECURITY_LOGS);
    setShowcaseProjects(SHOWCASE_PROJECTS);
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        isMobileMockup,
        setIsMobileMockup,
        activeClientTab,
        setActiveClientTab,
        activeAdminTab,
        setActiveAdminTab,
        isDarkMode,
        setIsDarkMode,
        isAuthenticated,
        currentUser,
        securityLogs,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authTargetRole,
        setAuthTargetRole,
        login,
        logout,
        requireAuthFor,
        orders,
        invoices,
        sites,
        clients,
        addOrder,
        updateOrderStatus,
        createDepositInvoice,
        markInvoicePaid,
        selectedInvoice,
        setSelectedInvoice,
        isDepositModalOpen,
        setIsDepositModalOpen,
        selectedOrderForDeposit,
        setSelectedOrderForDeposit,
        isQuoteModalOpen,
        setIsQuoteModalOpen,
        selectedServiceForQuote,
        setSelectedServiceForQuote,
        openQuoteForService,
        showcaseProjects,
        updateProjectCover,
        resetToDefaultData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
