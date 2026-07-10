# Handoff por2duros → espanias · Reto Mundial 2026

**Fecha:** 10 jul 2026  
**De:** agente por2duros.com  
**Para:** agente espanias.com

---

## Lo que está hecho en por2duros

### `/reto-mundial` — página de captación de leads ✅

Es el destino del botón de campaña de espanias (`espanias.com/mundial` → `por2duros.com/reto-mundial`).

Implementado:
- Descuento en vivo desde `GET https://www.espanias.com/api/mundial-reto` (cacheado 10 min con `next: { revalidate: 600 }`)
- Texto de la mecánica idéntico al brief (✅ Asegúratelo / 🎲 Arriésgate / si campeona → GRATIS)
- Aviso "Última oportunidad": apuntarse antes de la semifinal España–Francia (14 jul)
- Formulario completo: nombre, email (obligatorio), teléfono/WhatsApp (opcional), nombre del negocio (opcional), elección "Asegurar mi web con el X% ahora" / "Arriesgarme al siguiente partido"
- CTA de WhatsApp directo para cerrar ventas
- Lead guardado en BD con **timestamp** (`joinedAt`) y **descuento en el momento del alta** (`pctAtJoin`)

### `/ecr` ✅

Redirige a `/agencia-web-granada/ecr`. El CTA de espanias "Quiero sumarme al ECR" puede apuntar a cualquiera de las dos URLs.

### `/mundial` — canje de cupones HMAC ⚠️ pendiente de configuración

El código está listo pero necesita que `MUNDIAL_COUPON_SECRET` esté configurado en Vercel con el mismo valor que espanias. Sin ese secreto todos los cupones se rechazan.

---

## Contratos técnicos

### Contrato A — Descuento en vivo (por2duros consume a espanias)

por2duros llama a este endpoint en cada carga de `/reto-mundial`:

```
GET https://www.espanias.com/api/mundial-reto
→ { "pct": 75, "champion": false, "wins": 5 }
```

- `pct` = descuento actual que se muestra en la página
- `champion: true` → muestra "web GRATIS"
- `wins` → contador de victorias en el texto
- Necesita CORS abierto (`Access-Control-Allow-Origin: *`) — ya está en espanias

### Contrato B — Cupones firmados (espanias envía a por2duros)

espanias genera enlaces de cupón con este formato:

```
https://www.por2duros.com/mundial?code=CODE&pct=PCT&sig=HEX&email=EMAIL
```

- La firma es HMAC-SHA256 de `"${code}.${pct}"` con el secreto compartido, en hex
- `email` va sin firmar — por2duros lo usa solo para registrar el lead, nunca para autorizar
- por2duros valida con `timingSafeEqual` y marca cada cupón de un solo uso

**⚠️ Acción requerida:** comunicar el valor de `MUNDIAL_COUPON_SECRET` al admin de por2duros para configurarlo en Vercel. Debe ser exactamente el mismo string que tiene espanias.

### Contrato C — Página ECR (espanias enlaza a por2duros)

```
https://www.por2duros.com/ecr
→ redirige a https://www.por2duros.com/agencia-web-granada/ecr
```

---

## Datos que guarda por2duros de cada lead

Cada registro `RetoMundialLead` contiene:

| Campo | Tipo | Descripción |
|---|---|---|
| `email` | string | Obligatorio |
| `name` | string | Obligatorio |
| `phone` | string? | WhatsApp / teléfono (opcional) |
| `company` | string? | Nombre del negocio (opcional) |
| `preference` | `'secure'` \| `'risk'` | Elección del usuario |
| `pctAtJoin` | int | Descuento vigente en el momento del alta |
| `joinedAt` | DateTime | Timestamp UTC automático |

El `joinedAt` es la referencia para determinar si un lead es elegible: solo cuentan los apuntados **antes del pitido inicial de cada partido**.

**Fase 1 es manual:** no hay automatización de descuentos en Stripe. El admin de por2duros aplica el descuento manualmente al construir la web o al cobrar.

---

## Checklist para espanias

- [ ] El botón de campaña en `espanias.com/mundial` apunta a `https://www.por2duros.com/reto-mundial`
- [ ] Comunicar el valor de `MUNDIAL_COUPON_SECRET` al admin de por2duros
- [ ] Confirmar que `GET /api/mundial-reto` responde con `{ pct, champion, wins }` y CORS abierto
- [ ] Los cupones (penaltis, rasca, porra) generan URLs con el formato del Contrato B apuntando a `por2duros.com/mundial`
- [ ] El CTA "Quiero sumarme al ECR" enlaza a `https://www.por2duros.com/ecr`
