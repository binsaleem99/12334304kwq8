import { PricingTier, NavItem, CreditPackage } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'الرئيسية', href: '#' },
  { label: 'الميزات', href: '#features' },
  { label: 'القوالب', href: '#templates' },
  { label: 'الأسعار', href: '#pricing' },
  { label: 'المدونة', href: '#blog' },
];

export const CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: 'starter',
    name: 'باقة البداية',
    credits: 100,
    bonus: 0,
    price: '5.000',
    features: ['توليد AI أساسي', 'صلاحية 90 يوم', 'دعم فني قياسي'],
  },
  {
    id: 'popular',
    name: 'الباقة الشائعة',
    credits: 600,
    bonus: 100,
    price: '20.000',
    popular: true,
    savings: 'وفر 20%',
    features: ['+100 رصيد إضافي', 'صلاحية 90 يوم', 'دعم فني ذو أولوية', 'كل مميزات AI'],
  },
  {
    id: 'power',
    name: 'باقة القوة',
    credits: 1300,
    bonus: 300,
    price: '35.000',
    savings: 'وفر 30%',
    features: ['+300 رصيد إضافي', 'صلاحية 90 يوم', 'دعم فني ذو أولوية', 'قوالب متقدمة'],
  },
  {
    id: 'enterprise',
    name: 'باقة المؤسسات',
    credits: 7000,
    bonus: 2000,
    price: '150.000',
    savings: 'وفر 40%',
    features: ['+2000 رصيد إضافي', 'صلاحية 90 يوم', 'دعم خاص', 'تأهيل وتدريب خاص'],
  },
];

// Keeping for backward compatibility if needed temporarily, but ideally unused
export const PRICING_TIERS: PricingTier[] = [];