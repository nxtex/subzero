export type BadgeType = 'zombie' | 'renewal' | 'info' | null;

export interface Subscription {
  id: string;
  name: string;
  category: string;
  price: number;
  frequency: 'monthly' | 'yearly';
  renewalDate: string;
  renewalDay: number;
  badge: BadgeType;
  daysUntilRenewal: number | null;
  color: string;
  icon: string;
  lastUsed: string | null;
  isConnected: boolean;
  cancellationUrl: string;
  cancellationEmail: string;
  cancellationSteps: string[];
}

export const subscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    category: 'Divertissement',
    price: 17,
    frequency: 'monthly',
    renewalDate: '28 avr.',
    renewalDay: 28,
    badge: null,
    daysUntilRenewal: 13,
    color: '#E50914',
    icon: 'N',
    lastUsed: 'il y a 2 jours',
    isConnected: true,
    cancellationUrl: 'https://www.netflix.com/account',
    cancellationEmail: '',
    cancellationSteps: [
      'Connecte-toi sur netflix.com',
      'Va dans "Compte"',
      'Clique sur "Annuler l\'abonnement"',
      'Confirme l\'annulation',
    ],
  },
  {
    id: '2',
    name: 'Spotify',
    category: 'Musique',
    price: 10,
    frequency: 'monthly',
    renewalDate: '3 mai',
    renewalDay: 3,
    badge: null,
    daysUntilRenewal: 7,
    color: '#1DB954',
    icon: 'S',
    lastUsed: 'il y a 1 jour',
    isConnected: true,
    cancellationUrl: 'https://www.spotify.com/account',
    cancellationEmail: '',
    cancellationSteps: [
      'Va sur spotify.com/account',
      'Clique sur "Gérer l\'abonnement"',
      'Sélectionne "Annuler Premium"',
      'Confirme la résiliation',
    ],
  },
  {
    id: '3',
    name: 'Salle de sport',
    category: 'Sport & Bien-être',
    price: 30,
    frequency: 'monthly',
    renewalDate: '16 mai',
    renewalDay: 16,
    badge: 'renewal',
    daysUntilRenewal: 16,
    color: '#FF9F43',
    icon: '🏋',
    lastUsed: 'il y a 12 jours',
    isConnected: false,
    cancellationUrl: '',
    cancellationEmail: 'contact@sallesport.fr',
    cancellationSteps: [
      'Envoie un email recommandé à la salle',
      'Mentionne ton numéro de membre',
      'Demande confirmation écrite',
      'Garde la preuve d\'envoi',
    ],
  },
  {
    id: '4',
    name: 'Amazon Prime',
    category: 'E-commerce',
    price: 9,
    frequency: 'monthly',
    renewalDate: '20 mai',
    renewalDay: 20,
    badge: null,
    daysUntilRenewal: 20,
    color: '#FF9900',
    icon: 'A',
    lastUsed: 'il y a 5 jours',
    isConnected: false,
    cancellationUrl: 'https://www.amazon.fr/prime',
    cancellationEmail: '',
    cancellationSteps: [
      'Va sur amazon.fr',
      'Clique sur "Compte & Listes"',
      'Sélectionne "Gérer Prime"',
      'Clique sur "Mettre fin à l\'adhésion"',
    ],
  },
  {
    id: '5',
    name: 'Canva Pro',
    category: 'Créativité',
    price: 13,
    frequency: 'monthly',
    renewalDate: '25 mai',
    renewalDay: 25,
    badge: 'zombie',
    daysUntilRenewal: 25,
    color: '#7B61FF',
    icon: 'C',
    lastUsed: 'il y a 21 jours',
    isConnected: false,
    cancellationUrl: 'https://www.canva.com/account',
    cancellationEmail: '',
    cancellationSteps: [
      'Connecte-toi sur canva.com',
      'Va dans les paramètres du compte',
      'Clique sur "Facturation & Plans"',
      'Annule l\'abonnement Pro',
    ],
  },
  {
    id: '6',
    name: 'iCloud+',
    category: 'Stockage',
    price: 3,
    frequency: 'monthly',
    renewalDate: '1 mai',
    renewalDay: 1,
    badge: null,
    daysUntilRenewal: 3,
    color: '#0071e3',
    icon: '☁',
    lastUsed: 'il y a 0 jours',
    isConnected: false,
    cancellationUrl: 'https://appleid.apple.com',
    cancellationEmail: '',
    cancellationSteps: [
      'Va dans Réglages sur ton iPhone',
      'Appuie sur ton nom > iCloud',
      'Sélectionne "Gérer le stockage"',
      'Modifie le forfait',
    ],
  },
  {
    id: '7',
    name: 'Disney+',
    category: 'Divertissement',
    price: 9,
    frequency: 'monthly',
    renewalDate: '10 mai',
    renewalDay: 10,
    badge: 'zombie',
    daysUntilRenewal: 10,
    color: '#113CCF',
    icon: 'D',
    lastUsed: 'il y a 34 jours',
    isConnected: false,
    cancellationUrl: 'https://www.disneyplus.com/account',
    cancellationEmail: '',
    cancellationSteps: [
      'Va sur disneyplus.com',
      'Clique sur ton profil',
      'Sélectionne "Compte"',
      'Clique sur "Annuler l\'abonnement"',
    ],
  },
  {
    id: '8',
    name: 'Notion Pro',
    category: 'Productivité',
    price: 8,
    frequency: 'monthly',
    renewalDate: '12 mai',
    renewalDay: 12,
    badge: null,
    daysUntilRenewal: 12,
    color: '#000000',
    icon: 'n',
    lastUsed: 'il y a 3 jours',
    isConnected: false,
    cancellationUrl: 'https://www.notion.so/billing',
    cancellationEmail: '',
    cancellationSteps: [
      'Va sur notion.so',
      'Clique sur Paramètres',
      'Va dans "Plans"',
      'Sélectionne "Annuler le plan"',
    ],
  },
  {
    id: '9',
    name: 'YouTube Premium',
    category: 'Divertissement',
    price: 14,
    frequency: 'monthly',
    renewalDate: '18 mai',
    renewalDay: 18,
    badge: null,
    daysUntilRenewal: 18,
    color: '#FF0000',
    icon: 'Y',
    lastUsed: 'il y a 1 jour',
    isConnected: false,
    cancellationUrl: 'https://music.youtube.com/paid_memberships',
    cancellationEmail: '',
    cancellationSteps: [
      'Va sur youtube.com',
      'Clique sur ton profil > Achats',
      'Sélectionne Premium',
      'Clique sur "Annuler l\'abonnement"',
    ],
  },
];

export const estimatedMonthly = 55;
export const realMonthly = subscriptions.reduce((sum, s) => sum + s.price, 0);

export const upcomingRenewals = subscriptions.filter(
  (s) => s.daysUntilRenewal !== null && s.daysUntilRenewal <= 7
);

export const zombieSubscriptions = subscriptions.filter(
  (s) => s.badge === 'zombie'
);
