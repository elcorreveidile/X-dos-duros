# Por 2 Duros — por2duros.com

Agencia de desarrollo web de bajo coste y entrega ultra-rápida (48 horas).

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** — diseño Neo-Retro Industrial
- **Prisma** + PostgreSQL
- **NextAuth v5** (credentials + Google OAuth)
- **Zod** para validación

## Instalación

```bash
npm install
cp .env.example .env.local
# Configura DATABASE_URL y AUTH_SECRET en .env.local
npm run db:push
npm run dev
```

## Estructura

```
src/
├── app/
│   ├── page.tsx              # Landing page pública
│   ├── login/                # Página de login
│   ├── dashboard/            # Panel de cliente
│   │   ├── page.tsx          # Vista principal (timer 48h)
│   │   ├── briefing/         # Formulario de briefing
│   │   ├── tickets/          # Mensajería con el equipo
│   │   └── suscripcion/      # Gestión del plan mensual
│   ├── admin/                # Panel de administración
│   │   ├── page.tsx          # Dashboard + Kanban
│   │   ├── proyectos/        # Vista Kanban completa
│   │   ├── clientes/         # Listado de clientes
│   │   ├── pagos/            # Historial de pagos
│   │   └── ajustes/          # Configuración del sistema
│   └── api/                  # API Routes
│       ├── auth/             # NextAuth handlers
│       ├── projects/         # CRUD proyectos + timer
│       ├── briefings/        # Envío de briefing
│       ├── tickets/          # Sistema de mensajería
│       └── contact/          # Formulario público
├── components/
│   ├── landing/              # Componentes de la landing page
│   ├── dashboard/            # Componentes del panel de cliente
│   ├── admin/                # Componentes del panel de admin
│   └── ui/                   # Componentes base (Button, Badge)
├── lib/
│   ├── auth.ts               # Configuración NextAuth
│   ├── db.ts                 # Cliente Prisma
│   └── utils.ts              # Utilidades y formatters
└── types/
    └── index.ts              # Tipos TypeScript del dominio
```

## Variables de entorno

Ver `.env.example` para la lista completa de variables necesarias.

## Reglas de negocio

- Las **48h empiezan** cuando el admin activa el timer (tras recibir el briefing completo)
- El **MVP incluye** lo pactado en el briefing; extras tienen coste adicional
- El **hosting es gratuito el primer mes**; luego se gestiona via suscripción mensual
