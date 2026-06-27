# Por 2 Duros — por2duros.com

Sitio web completo de **Por 2 Duros**, agencia de desarrollo web con sede en Andalucía (España). Entrega proyectos digitales en 48 horas desde €299, sin plantillas y con código propio.

## Qué es este proyecto

Aplicación Next.js con tres capas principales:

1. **Web pública** — landing page, blog, páginas de servicio y páginas SEO por ciudad andaluza.
2. **Panel de cliente** (`/dashboard`) — los clientes siguen el progreso de su proyecto en tiempo real: timer de 48h, briefing, mensajería con el equipo y gestión de suscripción.
3. **Panel de administración** (`/admin`) — gestión interna: kanban de proyectos, clientes, pagos, portfolio y blog.

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Estilos | Tailwind CSS — tema Neo-Retro Industrial (negro + neón verde `#39FF14`) |
| ORM | Prisma |
| Base de datos | PostgreSQL (Supabase en producción) |
| Auth | NextAuth v5 (magic link por email + Google OAuth) |
| Validación | Zod |
| Deploy | Vercel |
| Imágenes | Next.js Image (remote patterns: todos los dominios HTTPS) |

## Instalación local

```bash
npm install
cp .env.example .env.local
# Rellenar DATABASE_URL, AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET y EMAIL_* en .env.local
npm run db:push
npm run dev
```

## Estructura de rutas

```
src/app/
├── page.tsx                        # Landing page pública
├── blog/
│   ├── page.tsx                    # Listado de artículos
│   └── [slug]/page.tsx             # Artículo individual
├── landing-page/page.tsx           # Página de servicio: Landing Pages
├── mvp/page.tsx                    # Página de servicio: MVPs
├── ecommerce/page.tsx              # Página de servicio: E-commerce
├── agencia-web-[ciudad]/page.tsx   # 10 páginas SEO local (Málaga, Sevilla, etc.)
├── legal/                          # Privacidad, términos, cookies
├── login/                          # Magic link + verify
├── dashboard/                      # Panel del cliente (requiere auth)
│   ├── page.tsx                    # Vista principal con timer 48h
│   ├── briefing/                   # Formulario de briefing del proyecto
│   ├── tickets/                    # Mensajería cliente ↔ equipo
│   └── suscripcion/                # Gestión del plan mensual
├── admin/                          # Panel de administración (requiere rol admin)
│   ├── page.tsx                    # Dashboard + kanban de proyectos
│   ├── proyectos/                  # Vista kanban + detalle de proyecto
│   ├── clientes/                   # Listado de clientes
│   ├── pagos/                      # Historial de pagos
│   ├── portfolio/                  # CRUD del portfolio público
│   ├── blog/                       # CRUD del blog (nuevo, editar, listar)
│   └── ajustes/                    # Configuración del sistema
├── javier/page.tsx                 # Página personal del fundador
├── laclasedigital/page.tsx         # Landing de proyecto educativo
├── sitemap.ts                      # Sitemap XML dinámico
├── sitemap-images.xml/             # Sitemap de imágenes para Google Images
└── robots.ts                       # robots.txt
```

## Modelos de base de datos (Prisma)

- **User** — clientes y admins (email, role, OAuth accounts)
- **Project** — proyectos con estado (PENDING / BRIEFING / DEVELOPMENT / REVIEW / DELIVERED / PAUSED), timer de 48h y deadline
- **Briefing** — formulario de requisitos del proyecto
- **Ticket / TicketMessage** — sistema de mensajería interno
- **Payment** — registro de pagos por proyecto
- **PortfolioItem** — casos de éxito visibles en la web pública
- **BlogPost** — artículos del blog con slug, excerpt, metaDesc, coverImageUrl, contenido en Markdown y estado published/draft
- **Subscription** — gestión del plan mensual por cliente

## Blog

Los artículos del blog se escriben en **Markdown simplificado** y se almacenan en la base de datos. El campo `content` se convierte a HTML con `src/lib/markdown.ts`. Las imágenes de portada se guardan en `/public/images/blog/` y se referencian como `/images/blog/nombre.png`.

El blog incluye:
- Metadatos SEO (`<title>`, `<meta description>`, OpenGraph, Twitter Card)
- Canonical tag por artículo
- Imagen de portada en el artículo y en el sitemap de imágenes
- Reescritura de enlaces específicos post-render (e.g. CTAs a productos externos)

## SEO

- Canonical tags en todas las páginas públicas
- Sitemap XML dinámico con páginas estáticas + entradas de blog
- Sitemap de imágenes (`/sitemap-images.xml`) para indexación en Google Images
- `robots.txt` con reglas para crawlers (excluye `/admin`, `/dashboard`, `/api`, `/login`)
- 10 páginas de ciudad para posicionamiento local en Andalucía

## Reglas de negocio

- Las **48h empiezan** cuando el admin activa el timer manualmente (tras recibir briefing completo y pago)
- El **MVP incluye** lo acordado en el briefing; funcionalidades extra tienen coste adicional
- El **primer mes de hosting es gratuito**; a partir del segundo mes se gestiona via suscripción mensual
- Los admins gestionan proyectos desde el kanban; los clientes solo ven su propio proyecto
- **No añadir redirects www en `next.config.js`** — Vercel gestiona el dominio y causaría un loop infinito

## Variables de entorno

Ver `.env.example` para la lista completa. Las críticas son:

```
DATABASE_URL          # Supabase PostgreSQL connection string
AUTH_SECRET           # NextAuth secret (genera con: openssl rand -base64 32)
GOOGLE_CLIENT_ID      # Google OAuth (opcional, para login social)
GOOGLE_CLIENT_SECRET
EMAIL_SERVER_*        # SMTP para magic link
EMAIL_FROM
```
