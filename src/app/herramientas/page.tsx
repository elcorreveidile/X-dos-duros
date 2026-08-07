import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import Link from 'next/link'
import { ImageIcon, FileText, Globe, Fingerprint, Code, Paintbrush, Calculator, QrCode, Zap, Palette, Ruler, Copy, Minimize2, Wand2, Download, BarChart, CheckCircle, Shield, FileSearch, Type, RefreshCw, Play, Link, TrendingUp, FileText as FileBrief, ListChecks } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Herramientas gratuitas para web — Por 2 Duros',
  description:
    'Herramientas online gratuitas para optimizar tu presencia web: compresión de imágenes, conversión a WebP y más. Sin registros, sin límites.',
  alternates: {
    canonical: 'https://por2duros.com/herramientas',
  },
}

const TOOLS = [
  { icon: ImageIcon, title: 'Optimizar imagen para web', desc: 'Convierte a WebP, JPEG o PNG y reduce el peso de tus fotos.', href: '/herramientas/optimizar-imagen', tag: 'WebP · JPEG · PNG' },
  { icon: FileText, title: 'Contador de palabras', desc: 'Cuenta palabras, caracteres, frases y tiempo de lectura.', href: '/herramientas/contador-palabras', tag: 'SEO · Contenido' },
  { icon: Globe, title: 'Analizador de meta tags', desc: 'Analiza title, description, OG y canonical de cualquier URL.', href: '/herramientas/analizador-meta', tag: 'SEO · Técnico' },
  { icon: Fingerprint, title: 'Comprobar mobile-friendly', desc: 'Vea cómo se ve tu web en móvil vs escritorio.', href: '/herramientas/mobile-friendly', tag: 'Diseño · Responsive' },
  { icon: Code, title: 'Generador de robots.txt', desc: 'Genera un archivo robots.txt válido para tu sitio.', href: '/herramientas/robots-txt', tag: 'SEO · Crawlers' },
  { icon: Palette, title: 'Generador de gradientes CSS', desc: 'Crea gradientes CSS con un visual picker.', href: '/herramientas/generador-gradientes', tag: 'CSS · Diseño' },
  { icon: Calculator, title: 'Calculadora de fuentes responsive', desc: 'Genera fórmulas clamp() para tipografía fluida.', href: '/herramientas/calculadora-fuentes', tag: 'CSS · Tipografía' },
  { icon: Code, title: 'Validador de JSON-LD', desc: 'Valida la sintaxis y estructura de tus datos estructurados.', href: '/herramientas/validador-jsonld', tag: 'Schema.org · SEO' },
  { icon: QrCode, title: 'Generador de código QR', desc: 'Crea códigos QR descargables desde cualquier URL.', href: '/herramientas/generador-qr', tag: 'Marketing · Offline' },
  { icon: Zap, title: 'Test de velocidad básico', desc: 'Mide el tiempo de carga de cualquier URL.', href: '/herramientas/test-velocidad', tag: 'Performance' },
  { icon: Palette, title: 'Generador de paletas de colores', desc: 'Crea paletas de colores armoniosas desde un color base.', href: '/herramientas/generador-paletas', tag: 'Diseño · Colores' },
  { icon: Ruler, title: 'Convertidor de unidades CSS', desc: 'Convierte entre px, rem, vw, vh y más.', href: '/herramientas/convertidor-unidades', tag: 'CSS · Responsive' },
  { icon: Ruler, title: 'Generador de border-radius', desc: 'Crea esquinas redondeadas CSS con presets rápidos.', href: '/herramientas/generador-bordes', tag: 'CSS · UI' },
  { icon: Ruler, title: 'Generador de sombras CSS', desc: 'Crea sombras box-shadow con múltiples capas.', href: '/herramientas/generador-sombras', tag: 'CSS · UI' },
  { icon: RefreshCw, title: 'Generador de Lorem Ipsum', desc: 'Genera texto placeholder en español y latín.', href: '/herramientas/generador-lorem', tag: 'Contenido · Wireframe' },
  { icon: Minimize2, title: 'Minificador de CSS/JS', desc: 'Reduce el tamaño de archivos CSS y JavaScript.', href: '/herramientas/minificador', tag: 'Performance' },
  { icon: Wand2, title: 'Beautifier de código', desc: 'Formatea y embellece CSS, JavaScript y HTML.', href: '/herramientas/beautifier', tag: 'Código' },
  { icon: Download, title: 'Convertidor a Base64', desc: 'Convierte imágenes a Base64 para embedding.', href: '/herramientas/base64', tag: 'Imágenes · CSS' },
  { icon: Copy, title: 'Generador de meta tags', desc: 'Genera title, description, OG y Twitter Cards.', href: '/herramientas/generador-metatags', tag: 'SEO · Social' },
  { icon: BarChart, title: 'Analizador de densidad de palabras', desc: 'Analiza frecuencia de palabras clave en tu texto.', href: '/herramientas/densidad-palabras', tag: 'SEO · Contenido' },
  { icon: Shield, title: 'Validador de HTML', desc: 'Valida código HTML y detecta errores básicos.', href: '/herramientas/validador-html', tag: 'HTML · Calidad' },
  { icon: Code, title: 'Generador de Schema.org', desc: 'Genera JSON-LD para WebSite, Organization, Article y más.', href: '/herramientas/generador-schema', tag: 'Schema.org · SEO' },
  { icon: FileText, title: 'Calculadora de lectura', desc: 'Analiza legibilidad con índice Flesch Reading Ease.', href: '/herramientas/calculadora-lectura', tag: 'Contenido · Readability' },
  { icon: TrendingUp, title: 'Calculadora de ROI SEO', desc: 'Calcula retorno de inversión de proyectos SEO.', href: '/herramientas/calculadora-roi-seo', tag: 'SEO · Negocio' },
  { icon: FileBrief, title: 'Generador de brief web', desc: 'Genera documentos de brief para proyectos web.', href: '/herramientas/generador-brief', tag: 'Negocio · Documentación' },
  { icon: ListChecks, title: 'Checklist de launch', desc: 'Lista de verificación para lanzar sitios web.', href: '/herramientas/checklist-launch', tag: 'Launch · SEO' },
  { icon: Type, title: 'Preview de fuentes web', desc: 'Compara Google Fonts con tu propio texto.', href: '/herramientas/preview-fuentes', tag: 'Tipografía · Diseño' },
  { icon: Play, title: 'Generador de animaciones CSS', desc: 'Crea animaciones @keyframes con visual picker.', href: '/herramientas/generador-animaciones', tag: 'CSS · Animaciones' },
  { icon: FileSearch, title: 'Comprobar enlaces rotos', desc: 'Detecta enlaces 404 y errores en una página.', href: '/herramientas/comprobar-enlaces', tag: 'SEO · Mantenimiento' },
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
