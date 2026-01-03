export interface PricingTier {
  id: string;
  name: string;
  price: string;
  credits: string;
  accent: string;
  features: string[];
  notIncluded: string[];
  ctaText: string;
  popular?: boolean;
}

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  bonus: number;
  price: string;
  features: string[];
  popular?: boolean;
  color?: string;
  savings?: string;
}

export type ViewState = 
  | 'landing' 
  | 'login' 
  | 'signup' 
  | 'forgot-password' 
  | 'reset-password' 
  | 'verify-email'
  | 'blog'
  | 'blog-post'
  | 'hiring'
  | 'about'
  | 'contact'
  | 'changelog'
  | 'terms'
  | 'privacy'
  | 'refund'
  | 'public-help'
  | 'system-status'
  | 'dashboard'
  | 'dashboard-projects'
  | 'dashboard-new-project'
  | 'dashboard-settings'
  | 'dashboard-templates'
  | 'dashboard-published'
  | 'dashboard-account'
  | 'dashboard-billing'
  | 'dashboard-domains'
  | 'dashboard-help'
  | 'dashboard-analytics'
  | 'dashboard-publish'
  | 'builder'
  | 'dashboard-preview'
  | 'checkout-payment'
  | 'checkout-success'
  | 'checkout-failed'
  | '404'
  | '500'
  | 'maintenance'
  | 'debug-insufficient-credits'
  | 'admin'
  | 'admin-users'
  | 'admin-projects'
  | 'admin-templates'
  | 'admin-billing'
  | 'admin-packages'
  /* Rename 'analytics' to 'admin-analytics' to match ViewState usage in App.tsx and AdminSidebar */
  | 'admin-analytics'
  | 'admin-blog'
  | 'admin-logs'
  | 'admin-referrals'
  | 'admin-affiliates'
  | 'admin-settings'
  | 'admin-system';

export interface NavItem {
  label: string;
  href: string; // Used for hash navigation
}

export interface Project {
  id: string;
  name: string;
  thumbnail?: string; // Color or image URL
  status: 'draft' | 'published';
  lastModified: string;
  type: 'restaurant' | 'store' | 'portfolio' | 'business' | 'other';
}