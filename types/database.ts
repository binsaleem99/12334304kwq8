// Supabase database types will be generated here
// For now, using placeholder types

export interface User {
  id: string;
  email: string;
  phone?: string;
  full_name?: string;
  avatar_url?: string;
  role: "user" | "admin" | "super_admin";
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  name_ar?: string;
  description?: string;
  template_id?: string;
  industry?: string;
  status: "draft" | "published" | "archived";
  subdomain?: string;
  custom_domain?: string;
  site_settings: Record<string, unknown>;
  contact_email?: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface CreditPackage {
  id: string;
  name: string;
  name_ar: string;
  credits: number;
  price_kwd: number;
  bonus_percentage: number;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export interface UserCredits {
  id: string;
  user_id: string;
  credits_remaining: number;
  total_credits_purchased: number;
  first_purchase_bonus_used: boolean;
  created_at: string;
  updated_at: string;
}