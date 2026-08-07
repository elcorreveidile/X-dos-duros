import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import Link from 'next/link'
import { ImageIcon, FileText, Globe, Fingerprint, Code, Paintbrush, Calculator, QrCode, Zap, Palette, Ruler } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Herramientas gratuitas para web — Por 2 Duros',
  description:
    'Herramientas online gratuitas para optimizar tu presencia web: compresión de imágenes, conversión a WebP y más. Sin registros, sin límites.',
  alternates: {
    canonical: 'https://por2duros.com/herramientas',
  },
}

const TOOLS = [
  {
    icon: ImageIcon,
    title: 'Optimizar imagen para web',
    desc: 'Convierte a WebP, JPEG o PNG y reduce el peso de tus fotos. Sin subir nada a ningún servidor.',
    href: '/herramientas/optimizar-imagen',
    tag: 'WebP · JPEG · PNG',
  },
  {
    icon: FileText,
    title: 'Contador de palabras',
    desc: 'Cuenta palabras, caracteres, frases, párrafos y tiempo de lectura. Ideal para redactores SEO.',
    href: '/herramientas/contador-palabras',
    tag: 'SEO · Contenido',
  },
  {
    icon: Globe,
    title: 'Analizador de meta tags',
    desc: 'Analiza title, description, OG, canonical y más de cualquier URL. Optimiza tu SEO técnico.',
    href: '/herramientas/analizador-meta',
    tag: 'SEO · Técnico',
  },
  {
    icon: Fingerprint,
    title: 'Comprobar mobile-friendly',
    desc: 'Vea cómo se ve tu web en móvil vs escritorio. Comprueba la responsividad de tu diseño.',
    href: '/herramientas/mobile-friendly',
    tag: 'Diseño · Responsive',
  },
  {
    icon: Code,
    title: 'Generador de robots.txt',
    desc: 'Genera un archivo robots.txt válido para tu sitio. Copia y pega, sin complicaciones.',
    href: '/herramientas/robots-txt',
    tag: 'SEO · Crawlers',
  },
  {
    icon: Palette,
    title: 'Generador de gradientes CSS',
    desc: 'Crea gradientes CSS con un visual picker. Copia el código y listo para usar.',
    href: '/herramientas/generador-gradientes',
    tag: 'CSS · Diseño',
  },
  {
    icon: Calculator,
    title: 'Calculadora de fuentes responsive',
    desc: 'Genera fórmulas clamp() para tipografía fluida. Desktop a móvil sin media queries.',
    href: '/herramientas/calculadora-fuentes',
    tag: 'CSS · Tipografía',
  },
  {
    icon: Code,
    title: 'Validador de JSON-LD',
    desc: 'Valida la sintaxis y estructura de tus datos estructurados. Encuentra errores antes que Google.',
    href: '/herramientas/validador-jsonld',
    tag: 'Schema.org · SEO',
  },
  {
    icon: QrCode,
    title: 'Generador de código QR',
    desc: 'Crea códigos QR descargables desde cualquier URL. Sin límites, sin marcas de agua.',
    href: '/herramientas/generador-qr',
    tag: 'Marketing · Offline',
  },
  {
    icon: Zap,
    title: 'Test de velocidad básico',
    desc: 'Mide el tiempo de carga de cualquier URL. Primer filtro para detectar problemas de rendimiento.',
    href: '/herramientas/test-velocidad',
    tag: 'Performance',
  },
  {
    icon: Palette,
    title: 'Generador de paletas de colores',
    desc: 'Crea paletas de colores armoniosas a partir de un color base. Para diseño web y branding.',
    href: '/herramientas/generador-paletas',
    tag: 'Diseño · Colores',
  },
  {
    icon: Ruler,
    title: 'Convertidor de unidades CSS',
    desc: 'Convierte entre px, rem, vw, vh y más. Ideal para diseño responsive y moderno.',
    href: '/herramientas/convertidor-unidades',
    tag: 'CSS · Responsive',
  },
]

export default function HerramientasPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest font-mono text-neon">Gratuitas · Sin registro</p>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-none">
              Herramientas<br />
              <span className="neon-text">para tu web</span>
            </h1>
            <p className="text-muted text-sm max-w-lg leading-relaxed">
              Pequeñas utilidades que usamos a diario. Las compartimos gratis porque creemos en hacer
              la web más rápida para todos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
            {TOOLS.map((tool) => {
              const Icon = tool.icon
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="bg-background p-8 flex flex-col gap-4 group hover:bg-card transition-colors"
                >
                  <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-neon transition-colors">
                    <Icon size={18} className="text-muted group-hover:text-neon transition-colors" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="font-bold text-sm uppercase tracking-tight group-hover:text-neon transition-colors">
                      {tool.title}
                    </p>
                    <p className="text-xs text-muted leading-relaxed">{tool.desc}</p>
                  </div>
                  <p className="text-xs font-mono text-neon/70">{tool.tag}</p>
                </Link>
              )
            })}
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
