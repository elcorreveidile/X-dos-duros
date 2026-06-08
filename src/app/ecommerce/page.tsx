import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { CheckCircle, ArrowRight, Clock, Code, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tienda online profesional en 48 horas desde €599 — Por 2 Duros',
  description:
    'Creamos tu tienda online completa en 48 horas: catálogo, carrito, pagos con Stripe y gestión de pedidos. Código a medida, sin plantillas. Desde €599.',
  keywords: ['tienda online', 'ecommerce barato', 'crear tienda online', 'tienda online rápida', 'ecommerce profesional', 'tienda online 48 horas'],
  openGraph: {
    title: 'Tienda online profesional en 48 horas desde €599',
    description: 'Catálogo, carrito y pagos con Stripe. Entrega en 48 horas. Código a medida.',
    url: 'https://por2duros.com/ecommerce',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

const INCLUDES = [
  'Catálogo de productos con categorías y filtros',
  'Carrito de compra y checkout optimizado',
  'Pagos seguros con Stripe (tarjeta y más)',
  'Gestión básica de pedidos y estados',
  'Panel de administración de productos',
  'Diseño responsive y optimizado para conversión',
  'Código a medida: Next.js + Stripe + Supabase',
  'Cumplimiento RGPD y normativa de cookies',
]

const FAQS = [
  {
    q: '¿Incluye sistema de inventario?',
    a: 'El MVP de e-commerce incluye gestión básica de stock por producto. Funcionalidades avanzadas (variantes, almacenes múltiples, sincronización con ERP) se presupuestan por separado.',
  },
  {
    q: '¿Qué métodos de pago admite?',
    a: 'Stripe soporta tarjeta de crédito/débito, Apple Pay, Google Pay y transferencia bancaria. También podemos integrar Bizum o PayPal si lo necesitas.',
  },
  {
    q: '¿Las comisiones de Stripe son vuestras?',
    a: 'No. Conectamos tu propio cuenta de Stripe, así que las comisiones (1,5% + 0,25€ por transacción en España) van directamente a ti.',
  },
  {
    q: '¿Puedo añadir más productos yo solo después?',
    a: 'Sí. El panel de administración te permite añadir, editar y desactivar productos sin tocar código. No necesitas llamarnos para el día a día.',
  },
]

export default function EcommerceService() {
  return (
    <>
      <Navbar />
      <main className="pt-16">

        {/* Hero */}
        <section className="grid-bg py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <span className="text-neon text-xs uppercase tracking-widest font-mono mb-6 block">
            — E-commerce —
          </span>
          <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
            Tu tienda online lista{' '}
            <span className="neon-text">en 48 horas.</span>
          </h1>
          <p className="section-subtitle mx-auto mb-4">
            Catálogo, carrito, checkout con Stripe y panel de administración.
            Desde <strong className="text-white">€599</strong> con entrega garantizada.
          </p>
          <p className="text-sm text-muted mb-10">
            Código 100% propio · Sin comisiones nuestras · Tú eres dueño de la tienda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contacto"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Pedir mi tienda online <ArrowRight size={16} />
            </Link>
            <Link
              href="/"
              className="border border-border px-6 py-3 text-sm uppercase tracking-widest hover:border-neon/40 transition-colors"
            >
              Ver todos los servicios
            </Link>
          </div>
        </section>

        {/* Qué incluye */}
        <section className="py-24 border-t border-border px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-neon text-xs uppercase tracking-widest font-mono mb-4 block">
              — Sin sorpresas —
            </span>
            <h2 className="section-title">
              Todo lo que incluye{' '}
              <span className="neon-text">el precio.</span>
            </h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {INCLUDES.map((item) => (
              <li key={item} className="flex items-start gap-3 border border-border p-4 bg-card">
                <CheckCircle size={18} className="text-neon mt-0.5 shrink-0" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Proceso */}
        <section className="py-24 border-t border-border bg-card px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-neon text-xs uppercase tracking-widest font-mono mb-4 block">
                — Cómo funciona —
              </span>
              <h2 className="section-title">
                De cero a vendiendo{' '}
                <span className="neon-text">en 3 pasos.</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {[
                { icon: Zap, step: '01', title: 'Brief de productos', body: 'Nos mandas el catálogo inicial (nombre, precio, descripción, fotos). Con eso arrancamos el desarrollo.' },
                { icon: Code, step: '02', title: 'Desarrollo', body: 'Montamos la tienda sobre Next.js con Stripe integrado. Cada producto, categoría y checkout funciona de verdad.' },
                { icon: Clock, step: '03', title: 'Entrega en 48 h', body: 'Recibes la tienda en staging. Pruebas un pago de test. Cuando das el OK, publicamos y ya puedes vender.' },
              ].map(({ icon: Icon, step, title, body }) => (
                <div key={step} className="bg-background p-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-neon font-mono text-xs">{step}</span>
                    <Icon size={20} className="text-neon" />
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-tight">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 border-t border-border px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-neon text-xs uppercase tracking-widest font-mono mb-4 block">
              — Preguntas frecuentes —
            </span>
            <h2 className="section-title">
              Lo que todo el mundo{' '}
              <span className="neon-text">pregunta.</span>
            </h2>
          </div>
          <div className="divide-y divide-border">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="py-6">
                <h3 className="font-bold mb-2">{q}</h3>
                <p className="text-muted text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="py-24 border-t border-border bg-card px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title mb-4">
            ¿Listo para empezar{' '}
            <span className="neon-text">a vender?</span>
          </h2>
          <p className="section-subtitle mx-auto mb-10">
            Desde €599. Entrega en 48 horas. Sin plantillas ni comisiones ocultas.
          </p>
          <Link href="/#contacto" className="btn-primary inline-flex items-center gap-2">
            Empezar ahora <ArrowRight size={16} />
          </Link>
        </section>

      </main>
      <Footer />
    </>
  )
}
