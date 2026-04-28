import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
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
