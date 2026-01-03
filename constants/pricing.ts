export const creditPackages = [
  {
    id: "starter",
    name: "Starter",
    name_ar: "المبتدئة",
    credits: 100,
    price_kwd: 5.0,
    bonus_percentage: 0,
    effective_rate: 0.05,
    popular: false,
  },
  {
    id: "popular",
    name: "Popular",
    name_ar: "الشائعة",
    credits: 500,
    price_kwd: 20.0,
    bonus_percentage: 10,
    bonus_credits: 50,
    total_credits: 550,
    effective_rate: 0.036,
    popular: true,
  },
  {
    id: "power",
    name: "Power",
    name_ar: "القوية",
    credits: 1000,
    price_kwd: 35.0,
    bonus_percentage: 20,
    bonus_credits: 200,
    total_credits: 1200,
    effective_rate: 0.029,
    popular: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    name_ar: "المؤسسات",
    credits: 5000,
    price_kwd: 150.0,
    bonus_percentage: 40,
    bonus_credits: 2000,
    total_credits: 7000,
    effective_rate: 0.021,
    popular: false,
  },
];

export const FIRST_PURCHASE_BONUS = 20; // 20% extra on first purchase
export const CREDIT_EXPIRY_DAYS = 90;
export const TOKENS_PER_CREDIT = 1000;
export const PUBLISH_COST_FIRST = 10;
export const PUBLISH_COST_UPDATE = 3;