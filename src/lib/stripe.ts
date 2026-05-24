import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test_placeholder', {
  apiVersion: '2025-02-24.acacia',
})

export const STRIPE_PLANS = {
  basic: {
    priceId: process.env.STRIPE_PRICE_BASIC ?? '',
    name: 'Mantenimiento Básico',
    amount: 2900,
  },
  pro: {
    priceId: process.env.STRIPE_PRICE_PRO ?? '',
    name: 'Mantenimiento Pro',
    amount: 4900,
  },
} as const

export type StripePlan = keyof typeof STRIPE_PLANS
