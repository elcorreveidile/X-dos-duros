# SostenWoman — Especificación técnica de proyecto

## Resumen del proyecto

Tienda online de moda sostenible. Entre 20 y 100 referencias con variantes de talla (S/M/L/XL) y color. Solo usuarios registrados pueden comprar. Gestión de inventario automática. Integración de envíos con transportista. Política de devolución con cargo.

---

## Stack recomendado

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 15 App Router |
| Base de datos | PostgreSQL (Supabase) |
| ORM | Prisma |
| Auth | NextAuth v5 (Credentials + Magic Link) |
| Pagos | Stripe Checkout |
| Imágenes | Cloudinary (upload + optimización) |
| Email | Resend |
| CSS | Tailwind CSS |
| Deploy | Vercel |

---

## Modelo de datos (Prisma)

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  password      String?
  phone         String?
  role          Role      @default(CLIENT)
  addresses     Address[]
  orders        Order[]
  createdAt     DateTime  @default(now())
}

model Address {
  id         String  @id @default(cuid())
  userId     String
  user       User    @relation(fields: [userId], references: [id])
  name       String
  line1      String
  line2      String?
  city       String
  province   String
  postalCode String
  country    String  @default("ES")
  isDefault  Boolean @default(false)
}

model Product {
  id          String    @id @default(cuid())
  slug        String    @unique
  name        String
  description String    @db.Text
  price       Float
  images      String[]  // Cloudinary URLs
  active      Boolean   @default(true)
  variants    Variant[]
  createdAt   DateTime  @default(now())
}

model Variant {
  id         String      @id @default(cuid())
  productId  String
  product    Product     @relation(fields: [productId], references: [id])
  size       Size
  color      String      // nombre del color: "negro", "blanco", etc.
  colorHex   String?     // "#000000"
  stock      Int         @default(0)
  sku        String?     @unique
  orderItems OrderItem[]
}

model Order {
  id              String      @id @default(cuid())
  userId          String
  user            User        @relation(fields: [userId], references: [id])
  items           OrderItem[]
  status          OrderStatus @default(PENDING)
  shippingAddress Json        // snapshot de la dirección en el momento del pedido
  shippingMethod  String      // "correos_24h" | "fixed"
  shippingCost    Float
  subtotal        Float
  total           Float
  stripeSessionId String?     @unique
  trackingNumber  String?
  notes           String?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  returns         Return[]
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id])
  variantId String
  variant   Variant @relation(fields: [variantId], references: [id])
  quantity  Int
  unitPrice Float   // precio en el momento de compra
}

model Return {
  id        String       @id @default(cuid())
  orderId   String
  order     Order        @relation(fields: [orderId], references: [id])
  reason    String
  status    ReturnStatus @default(REQUESTED)
  charge    Float        @default(3.95) // cargo por devolución
  createdAt DateTime     @default(now())
}

enum Role        { CLIENT ADMIN }
enum Size        { XS S M L XL XXL }
enum OrderStatus { PENDING PAID PROCESSING SHIPPED DELIVERED CANCELLED REFUNDED }
enum ReturnStatus { REQUESTED APPROVED REJECTED COMPLETED }
```

---

## Funcionalidades requeridas

### Tienda pública

- **Catálogo** — grid de productos, filtro por color y talla, ordenación por precio/novedad
- **Ficha de producto** — galería de imágenes, selector de talla + color, stock en tiempo real, descripción generada, botón añadir al carrito
- **Carrito** — persistente en `localStorage`, resumen de líneas, total + envío estimado
- **Checkout** — requiere login, selección/creación de dirección, selección de método de envío, pago vía Stripe Checkout
- **Página de pedido confirmado** — resumen, número de pedido, estimación de entrega

### Usuarios

- Registro con email + contraseña
- Login con magic link (sin contraseña)
- Panel de cliente: mis pedidos, estado, tracking, iniciar devolución
- Gestión de direcciones guardadas

### Inventario

- Al confirmar pago (`checkout.session.completed`): decrementar stock de cada variante
- Al aprobar devolución: incrementar stock
- Bloqueo optimista en checkout: reservar stock al crear sesión, liberar si expira sin pago

### Envíos

- **Opción A — Precio fijo**: tabla configurable por peso/zona (ej. €3.95 península, €7.95 islas)
- **Opción B — Integración transportista**: Correos API o Packlink para calcular precio real y generar etiqueta
- El número de tracking se guarda en `Order.trackingNumber` y se muestra al cliente

### Devoluciones

- Cliente solicita devolución desde su panel (máx. N días desde entrega, configurable)
- Admin aprueba/rechaza desde panel de admin
- Al aprobar: cargo fijo por devolución (€3.95 por defecto), Stripe refund parcial
- Stock se repone automáticamente al marcar devolución como COMPLETED

### Panel de administración

- Dashboard: ventas hoy/mes, pedidos pendientes de envío, stock bajo (< 5 unidades)
- Gestión de productos: crear/editar/archivar, subir imágenes a Cloudinary, editar descripciones
- Gestión de variantes: stock por talla/color, edición masiva
- Gestión de pedidos: cambiar estado, añadir tracking, imprimir albarán
- Gestión de devoluciones: aprobar/rechazar, reembolsar
- Generador de descripciones: botón que llama a la API de Claude con nombre + características de la prenda

---

## Flujo de compra detallado

```
1. Usuario navega catálogo → ficha de producto
2. Selecciona talla + color → stock disponible visible
3. Añade al carrito (sin login requerido aún)
4. Va al checkout → redirección a /login si no autenticado
5. Selecciona dirección + método de envío
6. Click "Pagar" → POST /api/checkout → Stripe Checkout Session
   - line_items con precio de cada variante
   - metadata: { orderId, userId }
   - success_url: /pedidos/{orderId}?session_id={CHECKOUT_SESSION_ID}
   - Stripe crea sesión con expiración de 30 min
7. Stripe redirige a success_url
8. Dashboard page verifica session con Stripe → marca Order como PAID
9. Webhook checkout.session.completed → decrementa stock, envía email confirmación
```

---

## Emails transaccionales (Resend)

| Trigger | Destinatario | Asunto |
|---------|-------------|--------|
| Registro | Cliente | Bienvenida + verificación |
| Pedido confirmado | Cliente | Resumen de pedido |
| Pedido enviado | Cliente | Tu pedido está en camino + tracking |
| Devolución recibida | Cliente | Devolución en proceso |
| Devolución aprobada | Cliente | Reembolso procesado |
| Stock bajo (< 5) | Admin | Alerta de stock |

---

## Rutas de la aplicación

```
/                          → landing / hero + CTA tienda
/tienda                    → catálogo completo
/tienda/[slug]             → ficha de producto
/carrito                   → carrito
/checkout                  → checkout (requiere auth)
/pedidos/[id]              → confirmación + seguimiento
/cuenta                    → panel cliente
/cuenta/pedidos            → historial de pedidos
/cuenta/devoluciones       → gestionar devoluciones
/cuenta/direcciones        → mis direcciones
/login                     → login / registro
/admin                     → dashboard admin
/admin/productos           → listado de productos
/admin/productos/nuevo     → crear producto
/admin/productos/[id]      → editar producto + variantes
/admin/pedidos             → gestión de pedidos
/admin/pedidos/[id]        → detalle de pedido
/admin/devoluciones        → gestión de devoluciones
/admin/stock               → vista de inventario
```

---

## Generación de descripciones con IA

El admin tiene un botón en la ficha de producto que llama a `/api/admin/products/[id]/describe`:

```typescript
// POST /api/admin/products/[id]/describe
// Llama a Claude claude-haiku-4-5-20251001 con:
// - nombre del producto
// - tallas disponibles
// - colores
// - materiales (campo opcional en Product)
// Devuelve una descripción de ~80 palabras en tono sostenible y aspiracional
// El admin puede editarla antes de guardar
```

---

## Prioridades de desarrollo

### Fase 1 — MVP funcional

1. Modelos Prisma + migraciones
2. Auth (registro, login, magic link)
3. Catálogo + ficha de producto
4. Carrito (localStorage)
5. Checkout con Stripe + webhook inventario
6. Panel admin básico (productos, pedidos, stock)

### Fase 2 — Operaciones

7. Devoluciones (solicitud + aprobación + reembolso Stripe)
8. Emails transaccionales completos
9. Integración transportista / cálculo de envío
10. Tracking visible para el cliente

### Fase 3 — Mejoras

11. Generador de descripciones con IA
12. Dashboard admin con métricas de ventas
13. Alertas de stock bajo
14. Filtros avanzados en catálogo (precio, color, talla)

---

## Variables de entorno necesarias

```env
DATABASE_URL=
AUTH_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RESEND_API_KEY=
EMAIL_FROM=
ADMIN_EMAIL=
NEXT_PUBLIC_APP_URL=
```

---

*Este documento es suficiente para que un equipo empiece la Fase 1 sin preguntas adicionales. Los únicos datos que necesitan antes de empezar son las credenciales de Stripe, Cloudinary y Resend, y confirmar si usar precio fijo de envío o integración con transportista para la Fase 1.*
