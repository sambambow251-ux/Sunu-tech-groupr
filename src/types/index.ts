export type SiteType = 
  | 'Site vitrine' 
  | 'Site e-commerce' 
  | 'Site institutionnel' 
  | 'Application web & mobile' 
  | 'Refonte de site'
  | 'Hébergement & nom de domaine'
  | 'Sur mesure';

export type OrderStatus = 
  | 'Nouvelle'
  | 'En attente'
  | 'En cours'
  | 'Livré'
  | 'Annulé';

export type InvoiceStatus = 
  | 'Payée' 
  | 'En attente' 
  | 'Partielle' 
  | 'Annulée';

export type UserRole = 'client' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  company?: string;
  lastLogin?: string;
}

export interface SecurityLog {
  id: string;
  timestamp: string;
  userEmail: string;
  action: 'Connexion réussie' | 'Tentative échouée' | 'Déconnexion' | 'Changement mot de passe';
  ipAddress: string;
  device: string;
  status: 'Sécurisé' | 'Alerte';
}

export interface Order {
  id: string; // ST-001, ST-002, etc.
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  siteName: string;
  type: SiteType;
  amount: number; // in FCFA
  status: OrderStatus;
  orderDate: string;
  deliveryDate: string;
  description?: string;
  hasDepositInvoice?: boolean;
  depositAmount?: number;
  paymentMethod?: 'Wave' | 'Orange Money' | 'Espèces' | 'Virement';
  paymentPhone?: string;
  receiptTimestamp?: string;
  validationInvoiceSent?: boolean;
}

export interface Invoice {
  id: string; // FAC-2026-001, etc.
  orderId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  type: 'acompte' | 'solde' | 'totale';
  siteName: string;
  siteType: SiteType;
  totalAmount: number;
  depositPercentage?: number; // e.g. 50
  amountToPay: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
}

export interface ClientSite {
  id: string;
  siteName: string;
  type: SiteType;
  status: 'En cours' | 'Livré' | 'Maintenance';
  deliveryDate: string;
  url?: string;
  domain?: string;
  hostingStatus?: 'Actif' | 'En attente' | 'Renouvellement';
}

export interface Client {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  joinDate: string;
  status: 'Actif' | 'Inactif';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  features: string[];
  startingPrice: number;
  iconName: string;
  deliveryTime: string;
}

export interface ProjectShowcase {
  id: string;
  title: string;
  category: SiteType;
  client: string;
  image: string;
  tagline?: string;
  metrics?: string;
  description: string;
  highlights?: string[];
  technologies: string[];
  link?: string;
}
