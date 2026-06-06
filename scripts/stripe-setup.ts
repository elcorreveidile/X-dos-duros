/**
 * Run once to create Stripe products, prices and the LAUNCH20 coupon.
 * Usage: npx tsx scripts/stripe-setup.ts
 *
 * Add the printed price IDs to your .env:
 *   STRIPE_PRICE_BASIC=price_xxx
 *   STRIPE_PRICE_PRO=price_xxx
 */

import Stripe from 'stripe'

const key = process.env.STRIPE_SECRET_KEY
if (!key || key === 'sk_test_placeholder') {
  console.error('❌  Set STRIPE_SECRET_KEY in your environment before running this script.')
  process.exit(1)
}

const stripe = new Stripe(key, { apiVersion: '2025-02-24.acacia' })

async function main() {
  console.log('\n🔧  Por 2 Duros — Stripe setup\n')

  // ── 1. Mantenimiento Básico ──────────────────────────────────────────────
  const basicProduct = await stripe.products.create({
    name: 'Mantenimiento Básico',
    description: 'Actualizaciones de seguridad, backups semanales, monitorización uptime y soporte por email (72h).',
  })

  const basicPrice = await stripe.prices.create({
    product: basicProduct.id,
    currency: 'eur',
    unit_amount: 2900, // €29.00
    recurring: { interval: 'month' },
    nickname: 'Básico mensual',
  })

  console.log('✅  Mantenimiento Básico creado')
  console.log(`    Product ID : ${basicProduct.id}`)
  console.log(`    Price ID   : ${basicPrice.id}\n`)

  // ── 2. Mantenimiento Pro ─────────────────────────────────────────────────
  const proProduct = await stripe.products.create({
    name: 'Mantenimiento Pro',
    description: 'Todo lo del plan Básico + hosting (hasta 10 GB), dominio gratis primer año, SSL, soporte prioritario (24h) y 1h de cambios/mes.',
  })

  const proPrice = await stripe.prices.create({
    product: proProduct.id,
    currency: 'eur',
    unit_amount: 4900, // €49.00
    recurring: { interval: 'month' },
    nickname: 'Pro mensual',
  })

  console.log('✅  Mantenimiento Pro creado')
  console.log(`    Product ID : ${proProduct.id}`)
  console.log(`    Price ID   : ${proPrice.id}\n`)

  // ── 3. Cupón LAUNCH20 ────────────────────────────────────────────────────
  const coupon = await stripe.coupons.create({
    percent_off: 20,
    duration: 'once',
    max_redemptions: 20,
    name: 'Oferta de lanzamiento — 20%',
  })

  const promoCode = await stripe.promotionCodes.create({
    coupon: coupon.id,
    code: 'LAUNCH20',
    max_redemptions: 20,
  })

  console.log('✅  Cupón LAUNCH20 creado')
  console.log(`    Coupon ID  : ${coupon.id}`)
  console.log(`    Promo code : ${promoCode.code} (ID: ${promoCode.id})\n`)

  // ── Summary ──────────────────────────────────────────────────────────────
  console.log('─'.repeat(50))
  console.log('📋  Añade estas líneas a tu .env (y variables de entorno en producción):\n')
  console.log(`STRIPE_PRICE_BASIC=${basicPrice.id}`)
  console.log(`STRIPE_PRICE_PRO=${proPrice.id}`)
  console.log('\n✅  Setup completado.\n')
}

main().catch((err) => {
  console.error('❌  Error:', err.message)
  process.exit(1)
})
