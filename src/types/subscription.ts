export interface SubscriptionPlan {
  id: 'free' | 'pro';
  name: string;
  price: number;
  currency: string;
  interval: 'month';
  features: {
    maxListings: number | 'unlimited';
    featuredListings: boolean;
    certifiedBadge: boolean;
    dedicatedPage: boolean;
  };
}

export interface Subscription {
  id: string;
  userId: string;
  planId: 'free' | 'pro';
  status: 'active' | 'canceled' | 'past_due' | 'incomplete';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card';
  card: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
  isDefault: boolean;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Plan Gratuit',
    price: 0,
    currency: 'EUR',
    interval: 'month',
    features: {
      maxListings: 2,
      featuredListings: false,
      certifiedBadge: false,
      dedicatedPage: false,
    },
  },
  {
    id: 'pro',
    name: 'Plan Pro',
    price: 9.99,
    currency: 'EUR',
    interval: 'month',
    features: {
      maxListings: 'unlimited',
      featuredListings: true,
      certifiedBadge: true,
      dedicatedPage: true,
    },
  },
];