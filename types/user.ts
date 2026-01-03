export interface NavItem {
  label: string;
  href: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  tier: 'free' | 'pro' | 'enterprise';
  credits: number;
}