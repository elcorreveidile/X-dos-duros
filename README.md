# Por 2 Duros — por2duros.com

Sitio web completo de **Por 2 Duros**, agencia de desarrollo web con sede en Andalucía (España). Entrega proyectos digitales en 24–48 horas desde €297, sin plantillas y con código propio.

## Qué es este proyecto

Aplicación Next.js con tres capas principales:

1. **Web pública** — landing page, blog, páginas de servicio y páginas SEO por ciudad andaluza.
2. **Panel de cliente** (`/dashboard`) — los clientes siguen el progreso de su proyecto en tiempo real: timer de 48h, briefing, mensajería con el equipo y gestión de suscripción.
3. **Panel de administración** (`/admin`) — gestión interna: kanban de proyectos, clientes, pagos, portfolio y blog.

## Productos

| Producto | Precio | Entrega |
|---|---|---|
| Landing Page | €297 | 24h |
| E-commerce | €497 | 48h |
| MVP Web App | €797 | 48h |

## Promociones Mundial 2026

### Premio Mundial (rasca y gana)
Los usuarios con cupón físico de la mecánica "rasca y gana" obtienen un descuento fijo sobre cualquier producto. El cupón se valida con HMAC-SHA256 (`MUNDIAL_COUPON_SECRET`) y se almacena en `MundialCoupon`. Solo puede canjearse una vez.

### Reto Mundial (descuento dinámico)
Cualquier usuario puede apuntarse en `/reto-mundial`. El descuento crece con cada victoria de España en el Mundial 2026 y se obtiene en tiempo real desde `espanias.com/api/mundial-reto` (servidor a servidor, nunca desde el cliente). Si España gana el Mundial, la web es gratis (100%). El descuento se calcula en el servidor en el momento del canje — no puede manipularse desde el navegador.

**Flujo de ambas promociones:**
1. Usuario elige producto y envía briefing.
2. Se crea un proyecto (`status: LEAD`) con el precio descontado almacenado.
3. El admin revisa el briefing y envía el enlace de pago (Stripe) manualmente.

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Estilos | Tailwind CSS — tema Neo-Retro Industrial (negro `#0a0a0a` + neón verde `#39FF14`) |
| ORM | Prisma |
| Base de datos | PostgreSQL (Supabase en producción) |
| Auth | NextAuth v5 (magic link por email + Google OAuth) |
| Email | Resend |
| Pagos | Stripe (activado manualmente por el admin tras revisar el briefing) |
| Validación | Zod |
| Deploy | Vercel |

## Instalación local

```bash
npm install
cp .env.example .env.local
# Rellenar variables de entorno (ver sección de abajo)
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
├── concurso-mundial-2026/page.tsx  # Premio Mundial (rasca y gana)
├── reto-mundial/page.tsx           # Reto Mundial (descuento dinámico por victorias)
├── legal/                          # Privacidad, términos, cookies
├── login/                          # Magic link + verify
├── dashboard/                      # Panel del cliente (requiere auth)
│   ├── page.tsx                    # Vista principal con timer 48h y widgets de descuento
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
├── api/
│   ├── mundial/claim/              # Canjear cupón Premio Mundial
│   ├── reto-mundial/join/          # Apuntarse al Reto Mundial
│   └── reto-mundial/claim/         # Activar descuento del Reto Mundial
├── javier/page.tsx                 # Página personal del fundador
├── laclasedigital/page.tsx         # Landing de proyecto educativo
├── sitemap.ts                      # Sitemap XML dinámico
├── sitemap-images.xml/             # Sitemap de imágenes para Google Images
└── robots.ts                       # robots.txt
```

## Modelos de base de datos (Prisma)

- **User** — clientes y admins (email, role, OAuth accounts, `retoMundial` boolean)
- **Project** — proyectos con estado (PENDING / BRIEFING / DEVELOPMENT / REVIEW / DELIVERED / PAUSED), timer de 48h y deadline
- **Briefing** — formulario de requisitos del proyecto
- **Ticket / TicketMessage** — sistema de mensajería interno
- **Payment** — registro de pagos por proyecto
- **PortfolioItem** — casos de éxito visibles en la web pública
- **BlogPost** — artículos del blog con slug, excerpt, metaDesc, coverImageUrl, contenido en Markdown y estado published/draft
- **Subscription** — gestión del plan mensual por cliente
- **MundialCoupon** — cupones del Premio Mundial (código, pct de descuento, userId, redeemedAt, projectId)

## Blog

Los artículos del blog se escriben en **Markdown simplificado** y se almacenan en la base de datos. El campo `content` se convierte a HTML con `src/lib/markdown.ts`. Las imágenes de portada se guardan en `/public/images/blog/` y se referencian como `/images/blog/nombre.png`.

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
- El **precio de proyectos con descuento** se almacena al crear el proyecto; el pago lo activa el admin después del briefing

## Variables de entorno

Ver `.env.example` para la lista completa. Las críticas son:

```
DATABASE_URL              # Supabase PostgreSQL connection string
AUTH_SECRET               # NextAuth secret (genera con: openssl rand -base64 32)
GOOGLE_CLIENT_ID          # Google OAuth (opcional, para login social)
GOOGLE_CLIENT_SECRET
RESEND_API_KEY            # Resend — envío de magic links y emails transaccionales
RESEND_FROM               # Dirección remitente (ej: hola@por2duros.com)
STRIPE_SECRET_KEY         # Stripe — pagos (activados manualmente por el admin)
STRIPE_WEBHOOK_SECRET
MUNDIAL_COUPON_SECRET     # HMAC secret compartido con espanias.com para validar cupones
```
