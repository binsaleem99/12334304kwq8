export interface User {
  id: string;
  email: string;
  full_name: string;
  tier: 'free' | 'pro' | 'enterprise';
  role: 'user' | 'admin' | 'super_admin';
  phone?: string;
  credits?: number;
  joinedAt?: string;
  status?: 'active' | 'suspended' | 'pending';
}

export interface Project {
  id: string;
  name: string;
  status: 'draft' | 'published' | 'archived';
  industry: string;
  updatedAt: string;
  subdomain?: string;
  thumbnail?: string;
  views?: number;
  owner?: string;
}

export interface Log {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  source: string;
  message: string;
  user?: string | null;
  details?: Record<string, unknown>;
  stackTrace?: string | null;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string;
  commission: number;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
}

export interface Affiliate {
  id: string;
  name: string;
  email: string;
  code: string;
  referrals: number;
  activeReferrals: number;
  earnings: string;
  status: 'active' | 'pending' | 'inactive';
}

export interface Invoice {
  id: string;
  user: string;
  email: string;
  package: string;
  credits: number;
  amount: string;
  provider: string;
  date: string;
  status: 'paid' | 'failed' | 'pending';
  method?: string;
  time?: string;
  plan?: string;
}

export type ViewState =
  | 'landing'
  | 'login'
  | 'signup'
  | 'dashboard'
  | 'admin'
  | 'builder'
  | 'verify-email'
  | 'forgot-password'
  | 'reset-password'
  | 'dashboard-analytics'
  | 'dashboard-new-project'
  | 'dashboard-billing'
  | 'dashboard-projects'
  | 'dashboard-templates'
  | 'dashboard-account'
  | 'dashboard-help'
  | 'dashboard-published'
  | 'dashboard-preview'
  | 'dashboard-settings'
  | 'dashboard-publish'
  | 'dashboard-domains'
  | 'checkout-payment'
  | 'checkout-success'
  | 'checkout-failed'
  | 'admin-users'
  | 'admin-projects'
  | 'admin-templates'
  | 'admin-billing'
  | 'admin-packages'
  | 'admin-analytics'
  | 'admin-blog'
  | 'admin-logs'
  | 'admin-referrals'
  | 'admin-affiliates'
  | 'admin-settings'
  | 'admin-system'
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
  | 'system-status';
