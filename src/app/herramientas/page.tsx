'use client'

import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import Link from 'next/link'
import { ImageIcon, FileText, Globe, Code, Paintbrush, Calculator, QrCode, Zap, Palette, Ruler, Copy, Minimize2, Wand2, Download, BarChart, Shield, FileSearch, Type, RefreshCw, Play, TrendingUp, FileBrief, ListChecks, Fingerprint, ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export const metadata: Metadata = {
  title: 'Herramientas gratuitas para web — Por 2 Duros',
  description:
    'Herramientas online gratuitas para optimizar tu presencia web: compresión de imágenes, conversión a WebP y más. Sin registros, sin límites.',
  alternates: {
    canonical: 'https://por2duros.com/herramientas',
  },
}

const CATEGORIES = {
  seo: {
    name: 'SEO y Posicionamiento',
    icon: Globe,
    tools: [
      { icon: Globe, title: 'Analizador de meta tags', desc: 'Analiza title, description, OG y canonical de cualquier URL.', href: '/herramientas/analizador-meta', tag: 'SEO · Técnico' },
      { icon: Code, title: 'Generador de robots.txt', desc: 'Genera un archivo robots.txt válido para tu sitio.', href: '/herramientas/robots-txt', tag: 'SEO · Crawlers' },
      { icon: Code, title: 'Validador de JSON-LD', desc: 'Valida la sintaxis y estructura de tus datos estructurados.', href: '/herramientas/validador-jsonld', tag: 'Schema.org · SEO' },
      { icon: Code, title: 'Generador de Schema.org', desc: 'Genera JSON-LD para WebSite, Organization, Article y más.', href: '/herramientas/generador-schema', tag: 'Schema.org · SEO' },
      { icon: Copy, title: 'Generador de meta tags', desc: 'Genera title, description, OG y Twitter Cards.', href: '/herramientas/generador-metatags', tag: 'SEO · Social' },
      { icon: BarChart, title: 'Analizador de densidad de palabras', desc: 'Analiza frecuencia de palabras clave en tu texto.', href: '/herramientas/densidad-palabras', tag: 'SEO · Contenido' },
      { icon: TrendingUp, title: 'Calculadora de ROI SEO', desc: 'Calcula retorno de inversión de proyectos SEO.', href: '/herramientas/calculadora-roi-seo', tag: 'SEO · Negocio' },
      { icon: FileSearch, title: 'Comprobar enlaces rotos', desc: 'Detecta enlaces 404 y errores en una página.', href: '/herramientas/comprobar-enlaces', tag: 'SEO · Mantenimiento' },
    ]
  },
  css: {
    name: 'CSS y Estilos',
    icon: Paintbrush,
    tools: [
      { icon: Palette, title: 'Generador de gradientes CSS', desc: 'Crea gradientes CSS con un visual picker.', href: '/herramientas/generador-gradientes', tag: 'CSS · Diseño' },
      { icon: Palette, title: 'Generador de paletas de colores', desc: 'Crea paletas de colores armoniosas desde un color base.', href: '/herramientas/generador-paletas', tag: 'Diseño · Colores' },
      { icon: Ruler, title: 'Generador de border-radius', desc: 'Crea esquinas redondeadas CSS con presets rápidos.', href: '/herramientas/generador-bordes', tag: 'CSS · UI' },
      { icon: Ruler, title: 'Generador de sombras CSS', desc: 'Crea sombras box-shadow con múltiples capas.', href: '/herramientas/generador-sombras', tag: 'CSS · UI' },
      { icon: Calculator, title: 'Calculadora de fuentes responsive', desc: 'Genera fórmulas clamp() para tipografía fluida.', href: '/herramientas/calculadora-fuentes', tag: 'CSS · Tipografía' },
      { icon: Ruler, title: 'Convertidor de unidades CSS', desc: 'Convierte entre px, rem, vw, vh y más.', href: '/herramientas/convertidor-unidades', tag: 'CSS · Responsive' },
      { icon: Play, title: 'Generador de animaciones CSS', desc: 'Crea animaciones @keyframes con visual picker.', href: '/herramientas/generador-animaciones', tag: 'CSS · Animaciones' },
      { icon: Type, title: 'Preview de fuentes web', desc: 'Compara Google Fonts con tu propio texto.', href: '/herramientas/preview-fuentes', tag: 'Tipografía · Diseño' },
    ]
  },
  contenido: {
    name: 'Contenido y Redacción',
    icon: FileText,
    tools: [
      { icon: FileText, title: 'Contador de palabras', desc: 'Cuenta palabras, caracteres, frases y tiempo de lectura.', href: '/herramientas/contador-palabras', tag: 'SEO · Contenido' },
      { icon: RefreshCw, title: 'Generador de Lorem Ipsum', desc: 'Genera texto placeholder en español y latín.', href: '/herramientas/generador-lorem', tag: 'Contenido · Wireframe' },
      { icon: FileText, title: 'Calculadora de lectura', desc: 'Analiza legibilidad con índice Flesch Reading Ease.', href: '/herramientas/calculadora-lectura', tag: 'Contenido · Readability' },
    ]
  },
  imagenes: {
    name: 'Imágenes',
    icon: ImageIcon,
    tools: [
      { icon: ImageIcon, title: 'Optimizar imagen para web', desc: 'Convierte a WebP, JPEG o PNG y reduce el peso de tus fotos.', href: '/herramientas/optimizar-imagen', tag: 'WebP · JPEG · PNG' },
      { icon: ImageIcon, title: 'Generador de favicon', desc: 'Genera favicon.ico, PNG y SVG desde tu imagen.', href: '/herramientas/generador-favicon', tag: 'Favicon · Iconos' },
      { icon: Download, title: 'Convertidor a Base64', desc: 'Convierte imágenes a Base64 para embedding.', href: '/herramientas/base64', tag: 'Imágenes · CSS' },
      { icon: QrCode, title: 'Generador de código QR', desc: 'Crea códigos QR descargables desde cualquier URL.', href: '/herramientas/generador-qr', tag: 'Marketing · Offline' },
    ]
  },
  codigo: {
    name: 'Código y Rendimiento',
    icon: Code,
    tools: [
      { icon: Minimize2, title: 'Minificador de CSS/JS', desc: 'Reduce el tamaño de archivos CSS y JavaScript.', href: '/herramientas/minificador', tag: 'Performance' },
      { icon: Wand2, title: 'Beautifier de código', desc: 'Formatea y embellece CSS, JavaScript y HTML.', href: '/herramientas/beautifier', tag: 'Código' },
      { icon: Shield, title: 'Validador de HTML', desc: 'Valida código HTML y detecta errores básicos.', href: '/herramientas/validador-html', tag: 'HTML · Calidad' },
      { icon: Zap, title: 'Test de velocidad básico', desc: 'Mide el tiempo de carga de cualquier URL.', href: '/herramientas/test-velocidad', tag: 'Performance' },
    ]
  },
  negocio: {
    name: 'Negocio y Gestión',
    icon: TrendingUp,
    tools: [
      { icon: FileBrief, title: 'Generador de brief web', desc: 'Genera documentos de brief para proyectos web.', href: '/herramientas/generador-brief', tag: 'Negocio · Documentación' },
      { icon: ListChecks, title: 'Checklist de launch', desc: 'Lista de verificación para lanzar sitios web.', href: '/herramientas/checklist-launch', tag: 'Launch · SEO' },
      { icon: Fingerprint, title: 'Comprobar mobile-friendly', desc: 'Vea cómo se ve tu web en móvil vs escritorio.', href: '/herramientas/mobile-friendly', tag: 'Diseño · Responsive' },
    ]
  },
}

export default function HerramientasPage() {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set(['seo', 'css']))

  const toggleCategory = (key: string) => {
    const newOpen = new Set(openCategories)
    if (newOpen.has(key)) {
      newOpen.delete(key)
    } else {
      newOpen.add(key)
    }
    setOpenCategories(newOpen)
  }

  const openAll = () => {
    setOpenCategories(new Set(Object.keys(CATEGORIES)))
  }

  const closeAll = () => {
    setOpenCategories(new Set())
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-16">

          <div className="space-y-4">
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

          {/* Expand/Collapse all */}
          <div className="flex gap-6 text-xs text-muted">
            <button onClick={openAll} className="hover:text-neon transition-colors">
              + Expandir todos
            </button>
            <button onClick={closeAll} className="hover:text-neon transition-colors">
              − Colapsar todos
            </button>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            {Object.entries(CATEGORIES).map(([key, category]) => {
              const Icon = category.icon
              const isOpen = openCategories.has(key)

              return (
                <div key={key} className="border border-border rounded-sm overflow-hidden">
                  <button
                    onClick={() => toggleCategory(key)}
                    className="w-full px-6 py-4 flex items-center justify-between bg-card hover:bg-card/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className="text-neon" />
                      <span className="font-bold text-sm uppercase tracking-wide">{category.name}</span>
                      <span className="text-xs text-muted">({category.tools.length})</span>
                    </div>
                    {isOpen ? <ChevronDown size={18} className="text-muted" /> : <ChevronRight size={18} className="text-muted" />}
                  </button>

                  {isOpen && (
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-background">
                      {category.tools.map((tool) => {
                        const ToolIcon = tool.icon
                        return (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            className="flex items-start gap-3 p-4 rounded border border-border hover:border-neon hover:bg-card transition-all group"
                          >
                            <div className="w-8 h-8 border border-border flex items-center justify-center group-hover:border-neon transition-colors flex-shrink-0">
                              <ToolIcon size={16} className="text-muted group-hover:text-neon transition-colors" />
                            </div>
                            <div className="flex-1 min-w-0 space-y-1">
                              <p className="font-bold text-xs uppercase tracking-tight group-hover:text-neon transition-colors">
                                {tool.title}
                              </p>
                              <p className="text-xs text-muted leading-relaxed line-clamp-2">{tool.desc}</p>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
