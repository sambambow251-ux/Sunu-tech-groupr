import { Client, Invoice, Order, ProjectShowcase, ServiceItem, ClientSite, SecurityLog } from '../types';

export const COMPANY_PHONE = '+221 77 291 50 06';
export const COMPANY_PHONE_RAW = '221772915006';
export const COMPANY_EMAIL = 'sunutechgroup@gmail.com';
export const COMPANY_ADDRESS = 'Sacré-Cœur 3, Dakar, Sénégal';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ST-001',
    clientName: 'Samba Mbow',
    clientEmail: 'sambambow251@gmail.com',
    clientPhone: '+221 77 291 50 06',
    siteName: 'MonEntreprise',
    type: 'Site vitrine',
    amount: 150000,
    status: 'En cours',
    orderDate: '03/10/2026',
    deliveryDate: '20/10/2026',
    description: 'Site vitrine moderne pour présentation des services d\'une entreprise dakaroise.',
    hasDepositInvoice: true,
  },
  {
    id: 'ST-002',
    clientName: 'Samba Mbow',
    clientEmail: 'sambambow251@gmail.com',
    clientPhone: '+221 77 291 50 06',
    siteName: 'BoutiqueStyle',
    type: 'Site e-commerce',
    amount: 300000,
    status: 'Livré',
    orderDate: '12/09/2026',
    deliveryDate: '25/09/2026',
    description: 'Boutique en ligne complète avec catalogue de mode et paiement Wave/Orange Money.',
    hasDepositInvoice: true,
  },
  {
    id: 'ST-003',
    clientName: 'Samba Mbow',
    clientEmail: 'sambambow251@gmail.com',
    clientPhone: '+221 77 291 50 06',
    siteName: 'Cabinet Médical',
    type: 'Site institutionnel',
    amount: 500000,
    status: 'Livré',
    orderDate: '05/08/2026',
    deliveryDate: '18/08/2026',
    description: 'Portail institutionnel pour cabinet médical avec module de prise de rendez-vous.',
    hasDepositInvoice: true,
  },
  {
    id: 'ST-004',
    clientName: 'Awa Diop',
    clientEmail: 'awa.diop@techsenegal.sn',
    clientPhone: '+221 78 456 12 34',
    siteName: 'Diop Cosmétiques',
    type: 'Site e-commerce',
    amount: 300000,
    status: 'Livré',
    orderDate: '10/09/2026',
    deliveryDate: '28/09/2026',
    description: 'E-commerce cosmétiques naturels made in Sénégal.',
  },
  {
    id: 'ST-005',
    clientName: 'Lamine Sarr',
    clientEmail: 'lamine.sarr@batiment.sn',
    clientPhone: '+221 70 890 45 67',
    siteName: 'Sarr BTP & Construction',
    type: 'Site institutionnel',
    amount: 500000,
    status: 'Livré',
    orderDate: '18/08/2026',
    deliveryDate: '05/09/2026',
    description: 'Site vitrine BTP avec portfolio de chantiers et formulaire de devis.',
  },
  {
    id: 'ST-006',
    clientName: 'Fatou B.',
    clientEmail: 'fatou.b@teranga.sn',
    clientPhone: '+221 77 345 89 01',
    siteName: 'Teranga Traiteur',
    type: 'Site vitrine',
    amount: 200000,
    status: 'En attente',
    orderDate: '14/10/2026',
    deliveryDate: '30/10/2026',
    description: 'Site vitrine traiteur événementiel.',
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'FAC-2026-004',
    orderId: 'ST-001',
    clientName: 'Samba Mbow',
    clientEmail: 'sambambow251@gmail.com',
    clientPhone: '+221 77 291 50 06',
    type: 'acompte',
    siteName: 'MonEntreprise',
    siteType: 'Site vitrine',
    totalAmount: 150000,
    depositPercentage: 50,
    amountToPay: 75000,
    status: 'Payée',
    issueDate: '03/10/2026',
    dueDate: '10/10/2026',
    items: [
      {
        description: 'Création site vitrine (Acompte de lancement 50%)',
        quantity: 1,
        unitPrice: 75000,
        total: 75000,
      }
    ]
  },
  {
    id: 'FAC-2026-003',
    orderId: 'ST-002',
    clientName: 'Samba Mbow',
    clientEmail: 'sambambow251@gmail.com',
    clientPhone: '+221 77 291 50 06',
    type: 'solde',
    siteName: 'BoutiqueStyle',
    siteType: 'Site e-commerce',
    totalAmount: 300000,
    amountToPay: 250000,
    status: 'Payée',
    issueDate: '25/08/2026',
    dueDate: '01/09/2026',
    items: [
      {
        description: 'Solde final développement Site E-commerce BoutiqueStyle',
        quantity: 1,
        unitPrice: 250000,
        total: 250000,
      }
    ]
  },
  {
    id: 'FAC-2026-002',
    orderId: 'ST-001',
    clientName: 'Samba Mbow',
    clientEmail: 'sambambow251@gmail.com',
    clientPhone: '+221 77 291 50 06',
    type: 'acompte',
    siteName: 'MonEntreprise',
    siteType: 'Site vitrine',
    totalAmount: 150000,
    depositPercentage: 50,
    amountToPay: 150000,
    status: 'Payée',
    issueDate: '15/08/2026',
    dueDate: '22/08/2026',
    items: [
      {
        description: 'Prestation création graphique & architecture UI',
        quantity: 1,
        unitPrice: 150000,
        total: 150000,
      }
    ]
  },
  {
    id: 'FAC-2026-001',
    orderId: 'ST-003',
    clientName: 'Samba Mbow',
    clientEmail: 'sambambow251@gmail.com',
    clientPhone: '+221 77 291 50 06',
    type: 'totale',
    siteName: 'Cabinet Médical',
    siteType: 'Site institutionnel',
    totalAmount: 500000,
    amountToPay: 500000,
    status: 'En attente',
    issueDate: '18/08/2026',
    dueDate: '25/08/2026',
    items: [
      {
        description: 'Développement complet plateforme Cabinet Médical Mame Diarra',
        quantity: 1,
        unitPrice: 500000,
        total: 500000,
      }
    ]
  }
];

export const INITIAL_SITES: ClientSite[] = [
  {
    id: 'site-1',
    siteName: 'FermePro',
    type: 'Application web & mobile',
    status: 'Livré',
    deliveryDate: '11/10/2026',
    url: 'https://fermepro.sn',
    domain: 'fermepro.sn',
    hostingStatus: 'Actif',
  },
  {
    id: 'site-2',
    siteName: 'Prime Store (BNPL)',
    type: 'Application web & mobile',
    status: 'Livré',
    deliveryDate: '15/09/2026',
    url: 'https://primestore.sn',
    domain: 'primestore.sn',
    hostingStatus: 'Actif',
  },
  {
    id: 'site-3',
    siteName: 'Daayira Ahiba-ou Cheikhoul Khadim',
    type: 'Site institutionnel',
    status: 'Livré',
    deliveryDate: '25/09/2026',
    url: 'https://ahibaou-cheikhoulkhadim.sn',
    domain: 'ahibaou-cheikhoulkhadim.sn',
    hostingStatus: 'Actif',
  },
  {
    id: 'site-4',
    siteName: 'Prestige Bâches & Décoration',
    type: 'Site vitrine',
    status: 'Livré',
    deliveryDate: '02/10/2026',
    url: 'https://prestige-baches-dakar.sn',
    domain: 'prestige-baches-dakar.sn',
    hostingStatus: 'Actif',
  },
  {
    id: 'site-5',
    siteName: 'Linguera Glam Sport',
    type: 'Site e-commerce',
    status: 'Livré',
    deliveryDate: '08/10/2026',
    url: 'https://lingueraglam.sn',
    domain: 'lingueraglam.sn',
    hostingStatus: 'Actif',
  }
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'CL-001',
    name: 'Samba Mbow',
    company: 'MonEntreprise SARL',
    email: 'sambambow251@gmail.com',
    phone: '+221 77 291 50 06',
    address: 'Sacré-Cœur 3, Dakar, Sénégal',
    totalOrders: 3,
    totalSpent: 1250000,
    joinDate: '15/07/2026',
    status: 'Actif',
  },
  {
    id: 'CL-002',
    name: 'Fatou Diallo',
    company: 'Teranga Traiteur',
    email: 'fatou.diallo@teranga.sn',
    phone: '+221 77 345 89 01',
    address: 'Almadies, Dakar, Sénégal',
    totalOrders: 2,
    totalSpent: 450000,
    joinDate: '01/08/2026',
    status: 'Actif',
  },
  {
    id: 'CL-003',
    name: 'Predige SARL',
    company: 'Predige Consulting',
    email: 'contact@predige.sn',
    phone: '+221 77 654 32 10',
    address: 'Plateau, Dakar, Sénégal',
    totalOrders: 1,
    totalSpent: 850000,
    joinDate: '12/08/2026',
    status: 'Actif',
  },
  {
    id: 'CL-004',
    name: 'Awa Diop',
    company: 'Diop Cosmétiques',
    email: 'awa.diop@techsenegal.sn',
    phone: '+221 78 456 12 34',
    address: 'Point E, Dakar, Sénégal',
    totalOrders: 1,
    totalSpent: 300000,
    joinDate: '05/09/2026',
    status: 'Actif',
  },
  {
    id: 'CL-005',
    name: 'Lamine Sarr',
    company: 'Sarr BTP',
    email: 'lamine.sarr@batiment.sn',
    phone: '+221 70 890 45 67',
    address: 'Mermoz, Dakar, Sénégal',
    totalOrders: 1,
    totalSpent: 500000,
    joinDate: '10/08/2026',
    status: 'Actif',
  }
];

export const INITIAL_SECURITY_LOGS: SecurityLog[] = [
  {
    id: 'LOG-001',
    timestamp: '17/10/2026 15:42:10',
    userEmail: 'sunutechgroup@gmail.com',
    action: 'Connexion réussie',
    ipAddress: '196.207.24.89 (Dakar, SN)',
    device: 'Chrome sur macOS • Session sécurisée SSL',
    status: 'Sécurisé'
  },
  {
    id: 'LOG-002',
    timestamp: '17/10/2026 14:18:22',
    userEmail: 'sambambow251@gmail.com',
    action: 'Connexion réussie',
    ipAddress: '197.149.200.12 (Dakar, SN)',
    device: 'Safari sur iPhone 15 • 2FA Vérifié',
    status: 'Sécurisé'
  },
  {
    id: 'LOG-003',
    timestamp: '16/10/2026 19:04:15',
    userEmail: 'admin@unknown.com',
    action: 'Tentative échouée',
    ipAddress: '41.82.112.5 (Thiès, SN)',
    device: 'Firefox sur Windows • Tentative bloquée',
    status: 'Alerte'
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'vitrine',
    title: 'Création de sites vitrines',
    description: 'Présentez votre entreprise avec un site moderne et professionnel.',
    fullDescription: 'Conception sur mesure d\'un site web vitrine élégant, optimisé pour les moteurs de recherche (SEO), responsive sur tous les écrans (ordinateur, tablette, smartphone) et intégrant vos formulaires de contact direct et liens WhatsApp.',
    features: [
      'Design sur mesure & ergonomique',
      '100% adapté smartphone, tablette & ordinateur',
      'Optimisation SEO Google Sénégal',
      'Boutons WhatsApp & appel direct au +221 77 291 50 06',
      'Formulaire de contact avec notification temps réel',
      'Hébergement & certificat SSL sécurisé 256-bit'
    ],
    startingPrice: 150000,
    iconName: 'Globe',
    deliveryTime: '7 à 14 jours'
  },
  {
    id: 'ecommerce',
    title: 'Sites e-commerce',
    description: 'Vendez vos produits en ligne avec une boutique sécurisée et performante.',
    fullDescription: 'Plateforme de vente en ligne complète permettant de présenter vos articles, gérer vos stocks et encaisser directement par Wave, Orange Money et cartes bancaires avec une expérience client sans friction.',
    features: [
      'Paiement Wave & Orange Money intégré',
      'Gestion simple des produits & catégories',
      'Suivi des commandes en direct',
      'Calcul automatique des frais de livraison',
      'Panier et paiement 100% sécurisé',
      'Tableau de bord de gestion des ventes'
    ],
    startingPrice: 300000,
    iconName: 'ShoppingCart',
    deliveryTime: '15 à 25 jours'
  },
  {
    id: 'apps',
    title: 'Applications web & mobile',
    description: 'Des applications sur mesure pour répondre à vos besoins spécifiques.',
    fullDescription: 'Développement d\'outils métiers, portails clients, CRM ou applications SaaS sur mesure pour digitaliser vos processus d\'entreprise et fluidifier vos échanges avec vos clients.',
    features: [
      'Architecture cloud évolutive & ultra-rapide',
      'Authentification sécurisée des utilisateurs & RBAC',
      'Gestion de rôles & permissions (Admin / Client)',
      'Export PDF, facturation & tableau de bord',
      'Notifications SMS / WhatsApp / Email',
      'Compatibilité web & PWA mobile'
    ],
    startingPrice: 500000,
    iconName: 'Smartphone',
    deliveryTime: '20 à 45 jours'
  },
  {
    id: 'refonte',
    title: 'Refonte de site',
    description: 'Modernisez votre site pour plus de performance et de visibilité.',
    fullDescription: 'Donnez une seconde jeunesse à votre présence digitale. Nous reprenons votre site existant pour le rendre plus moderne, beaucoup plus rapide et convertissant.',
    features: [
      'Audit technique et graphique complet',
      'Modernisation du design et de la charte',
      'Accélération spectaculaire de la vitesse de chargement',
      'Migration sans perte de données',
      'Refonte de l\'expérience utilisateur (UX/UI)',
      'Mise en conformité mobile & tablette'
    ],
    startingPrice: 120000,
    iconName: 'RefreshCw',
    deliveryTime: '5 à 10 jours'
  },
  {
    id: 'hebergement',
    title: 'Hébergement & nom de domaine',
    description: 'Un site rapide, sécurisé et toujours en ligne.',
    fullDescription: 'Configuration et hébergement haute performance sur des serveurs sécurisés avec messagerie professionnelle personnalisée (@sunutechgroupe.com ou votre domaine).',
    features: [
      'Nom de domaine en .sn, .com, .org inclus',
      'Certificat SSL HTTPS gratuit et actif',
      'Adresses emails professionnelles illimitées',
      'Sauvegardes quotidiennes automatiques',
      'Serveurs avec disponibilité 99.9%',
      'Support technique réactif à Dakar'
    ],
    startingPrice: 50000,
    iconName: 'Cloud',
    deliveryTime: 'Immédiat (24h)'
  },
  {
    id: 'maintenance',
    title: 'Maintenance & assistance',
    description: 'Nous assurons la mise à jour et la sécurité de vos outils.',
    fullDescription: 'Déléguez l\'entretien technique de votre site web pour vous concentrer sur votre cœur de métier. Mises à jour, corrections rapides et surveillance continue.',
    features: [
      'Mises à jour régulières de sécurité',
      'Monitoring anti-piratage 24/7',
      'Corrections rapides de bugs ou anomalies',
      'Modifications légères de textes & images',
      'Rapport mensuel de performance',
      'Assistance dédiée prioritaire'
    ],
    startingPrice: 40000,
    iconName: 'Wrench',
    deliveryTime: 'Sous contrat mensuel'
  },
  {
    id: 'conseil',
    title: 'Conseil & accompagnement',
    description: 'Une expertise pour booster votre présence en ligne.',
    fullDescription: 'Bénéficiez des conseils stratégiques d\'experts du digital en Afrique pour définir vos besoins, choisir les bons outils et maximiser votre retour sur investissement.',
    features: [
      'Stratégie de transformation digitale',
      'Cahier des charges & cadrage projet',
      'Formation de vos équipes aux outils',
      'Conseil en acquisition client & acquisition locale',
      'Audit de sécurité & conformité',
      'Accompagnement continu personnalisé'
    ],
    startingPrice: 75000,
    iconName: 'Compass',
    deliveryTime: 'Sur mesure'
  }
];

export const SHOWCASE_PROJECTS: ProjectShowcase[] = [
  {
    id: 'proj-1',
    title: 'FermePro - Gestion de Ferme & Élevage',
    category: 'Application web & mobile',
    client: 'Entrepreneur en Agronomie & Élevage • Sénégal',
    tagline: '« Gérer aujourd\'hui, produire demain »',
    metrics: '48 animaux • 198 L lait/jour • 285 000 FCFA bénéfice/semaine',
    image: '/src/assets/images/fermepro_cover_1792257616516.jpg',
    description: 'Système complet et intuitif conçu pour piloter toutes les activités d\'une exploitation agro-pastorale au Sénégal : suivi individuel des animaux (48 vaches, moutons, chèvres, lapins avec historique et carnet de santé), production laitière quotidienne (198 L de lait cru et pasteurisé avec suivi par vache), gestion des stocks d\'aliments et rations avec alertes de déficit, calendrier des cultures et parcelles, rappels vétérinaires automatisés (vaccination, vermifuge, vêlage), gestion des salariés et édition des bons de commande, livraison et rapports de rentabilité.',
    highlights: [
      'Suivi individuel du bétail (numéro, race, âge, sexe, reproduction, santé)',
      'Production laitière : collecte quotidienne, transformation & rendement par bête',
      'Stocks d\'aliments (granulés, ensilage, paille) et calcul automatique du déficit',
      'Calendrier des parcelles et cultures fourragères',
      'Comptabilité intégrée : achats, dépenses, salaires & ventes (2 940 000 FCFA)',
      'Génération instantanée de bons de commande, bons de livraison et rapports PDF'
    ],
    technologies: ['Application Web & Mobile', 'Tableau de bord Agronomie', 'Gestion Troupeau & Lait', 'Rappels Vétérinaires SMS', 'Bons de Commande PDF'],
    link: 'https://fermepro.sn'
  },
  {
    id: 'proj-2',
    title: 'Prime Store - Paiement Fractionné Salariés (BNPL)',
    category: 'Application web & mobile',
    client: 'Prime Store & Réseau de Boutiques Partenaires',
    tagline: '« Le paiement en 2, 3 ou 4 fois pour les salariés, chez les boutiques partenaires »',
    metrics: 'Paiement échelonné 2x, 3x, 4x • QR Code instantané • 1 250 000 FCFA volume',
    image: '/src/assets/images/primestore_cover_1792258289353.jpg',
    description: 'Plateforme FinTech et application mobile novatrice au Sénégal facilitant le paiement en 2, 3 ou 4 fois pour les employés d\'entreprises conventionnées auprès d\'un réseau de boutiques partenaires (mode, santé, restauration). Système de paiement sans contact par QR Code dynamique généré au panier, espace salarié avec solde disponible et suivi des échéances, espace commerçant avec tableau de bord des encours à recouvrer (435 000 FCFA) et interconnexion avec Wave, Orange Money et cartes bancaires.',
    highlights: [
      'Paiement fractionné en 2x, 3x ou 4 fois avec calcul transparent des frais',
      'Scan de QR Code dynamique à la caisse pour règlement immédiat',
      'Espace Salarié complet : consultation du solde, historique d\'achats et prélèvements',
      'Espace Boutique Partenaire : volume des ventes (1 250 000 FCFA) et commissions',
      'Gestion des salariés éligibles par entreprise avec limites de crédit',
      'Notifications automatisées de rappel d\'échéance par SMS et WhatsApp'
    ],
    technologies: ['FinTech Mobile PWA', 'Génération QR Code Dynamique', 'Algorithme Fractionnement BNPL', 'Passerelle Wave & OM', 'Portail Multi-Rôles'],
    link: 'https://primestore.sn'
  },
  {
    id: 'proj-3',
    title: 'Daayra AHIBA-OU CHEIKHOUL KHADIM - Plateforme Digitale',
    category: 'Site institutionnel',
    client: 'Daayira AHIBA-OU CHEIKHOUL KHADIM • Touba & Dakar',
    tagline: '« Une gestion spirituelle et organisationnelle digitale, au service de votre daayra »',
    metrics: '245 membres actifs • Carte 3 000 FCFA • 6 commissions actives',
    image: '/src/assets/images/daayra_cover_1792258489105.jpg',
    description: 'Plateforme moderne et application mobile dédiée à la gestion spirituelle et organisationnelle du Daayra AHIBA-OU CHEIKHOUL KHADIM : gestion informatisée des membres et de leurs cotisations mensuelles, coordination des commissions (organisation, culturel, sonorisation, finance, communication), émission des cartes de membres officielles avec QR Code (3 000 FCFA), génération instantanée des rapports financiers et procès-verbaux en PDF, médiathèque Jotayu mouride avec vidéos et contenus religieux, publication du Yobalou bis bi et annonces des rendez-vous spirituels en communion avec Touba, Serigne Arona Mbacké et le Khalife Général.',
    highlights: [
      'Gestion centralisée des membres et cotisations avec suivi transparent',
      'Organisation des commissions (organisation, culturel, sonorisation, finance)',
      'Carte de membre officielle (3 000 FCFA) avec QR Code d\'identification sécurisé',
      'Édition et archivage des rapports d\'activités et bilans financiers en PDF',
      'Médiathèque Jotayu mouride : vidéos des cérémonies et enseignements religieux',
      'Yobalou bis bi (pensées spirituelles et rappels quotidiens)',
      'Liaison d\'information Touba / Serigne Arona Mbacké / Khalife général'
    ],
    technologies: ['Plateforme Web & Application Mobile', 'Gestion Cotisations & Trésorerie', 'Carte Membre Numérique QR', 'Rapports & Bilans PDF', 'Médiathèque Vidéos Jotayu'],
    link: 'https://ahibaou-cheikhoulkhadim.sn'
  },
  {
    id: 'proj-4',
    title: 'Prestige Bâches & Décoration Événementielle',
    category: 'Site vitrine',
    client: 'Prestataire Événementiel Bâches & Décoration • Dakar',
    tagline: '« Sublimez vos cérémonies avec des décors et chapiteaux de prestige »',
    metrics: '+180 réceptions & mariages aménagés • Bâches VIP de 50 à 1 500 places',
    image: '/src/assets/images/evenementiel_cover_1792284602912.jpg',
    description: 'Site vitrine haut de gamme et catalogue digital interactif pour une agence dakaroise spécialisée dans la location de chapiteaux climatisés, bâches VIP blanches, tentes pagodes, mobilier de fête (chaises Chiavari, tables rondes, nappage luxe) et scénographie florale pour mariages, baptêmes, galas et séminaires d\'entreprise. Comprend un simulateur de devis instantané selon la superficie et le nombre de convives, une galerie photos haute définition et une mise en relation immédiate sur WhatsApp.',
    highlights: [
      'Catalogue interactif de chapiteaux, bâches VIP et matériel de réception',
      'Calculateur de devis instantané selon le nombre d\'invités et la configuration',
      'Galerie photos immersive des plus beaux décors de mariages et baptêmes',
      'Réservation d\'équipements (chaises, tables, podiums, sonorisation, lustres)',
      'Bouton WhatsApp flottant pour un conseil direct avec le décorateur en chef',
      'Référencement local optimisé pour les cérémonies sur Dakar et tout le Sénégal'
    ],
    technologies: ['Site Vitrine Immersif', 'Simulateur de Devis Événementiel', 'Galerie Photos Haute Résolution', 'Réservation Directe WhatsApp', 'Optimisation SEO Cérémonies Dakar'],
    link: 'https://prestige-baches-dakar.sn'
  },
  {
    id: 'proj-5',
    title: 'Linguera Glam - Ensembles Sport & Chic Féminins',
    category: 'Site e-commerce',
    client: 'Entrepreneur E-Commerce Mode Féminine • Dakar',
    tagline: '« Confort, style et féminité en un seul look »',
    metrics: 'Ensembles 18 500 à 21 000 FCFA • +15 coloris disponibles • Tailles S à XXL',
    image: '/src/assets/images/sport_ecommerce_cover_1792284603100.jpg',
    description: 'Boutique e-commerce moderne conçue pour une marque sénégalaise de prêt-à-porter féminin vendant des ensembles de sport et tenues décontractées élégantes (Ensemble 1 zippé stretch, Ensemble 2 côtelé évasé taille haute, Ensemble 3 cache-cœur croisé). La boutique propose un nuancier de coloris interactif (Marron, Noir, Gris, Bleu marine, Vert olive, Beige, Lavande, Corail...), une sélection fluide des tailles (S à XXL), un tunnel d\'achat simplifié en 1 clic, le paiement par Wave, Orange Money ou à la livraison et l\'expédition en 24h sur Dakar.',
    highlights: [
      'Catalogue de collections avec sélecteur de couleurs et pastilles interactives',
      'Fiches produits détaillées avec guide des tailles adaptées (S, M, L, XL, XXL)',
      'Panier express et commande simplifiée en 2 clics sans inscription obligatoire',
      'Paiement sécurisé par Wave, Orange Money ou règlement à la livraison',
      'Calcul instantané des frais de livraison selon les communes de Dakar & régions',
      'Avis clients avec notation étoilée et confirmation de commande via WhatsApp'
    ],
    technologies: ['Boutique E-Commerce Réactive', 'Sélecteur de Nuanciers de Couleurs', 'Passerelle Wave & Orange Money', 'Gestion de Stock Multi-Tailles', 'Commande Express Mobile'],
    link: 'https://lingueraglam.sn'
  }
];

export const STATS_MONTHLY_ORDERS = [
  { month: 'Jan', orders: 8, revenue: 950000 },
  { month: 'Fév', orders: 11, revenue: 1200000 },
  { month: 'Mar', orders: 14, revenue: 1450000 },
  { month: 'Avr', orders: 9, revenue: 1100000 },
  { month: 'Mai', orders: 15, revenue: 1600000 },
  { month: 'Juin', orders: 12, revenue: 1350000 },
  { month: 'Juil', orders: 18, revenue: 1900000 },
  { month: 'Août', orders: 16, revenue: 1750000 },
  { month: 'Sep', orders: 20, revenue: 2100000 },
  { month: 'Oct', orders: 18, revenue: 1850000 },
  { month: 'Nov', orders: 14, revenue: 1500000 },
  { month: 'Déc', orders: 22, revenue: 2400000 },
];
