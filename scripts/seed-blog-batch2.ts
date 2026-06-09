import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const posts = [
  {
    slug: 'landing-page-vs-pagina-web',
    title: 'Landing Page vs Página Web: Cuál Necesitas Para Tu Negocio',
    excerpt: 'No son lo mismo y elegir mal puede costarte tiempo y dinero. Te explicamos las diferencias reales y cuándo necesitas cada una.',
    metaDesc: 'Landing page vs página web: diferencias, cuándo usar cada una y cuál necesita tu negocio según tu objetivo. Guía práctica para 2026.',
    published: true,
    publishedAt: new Date('2026-06-09'),
    content: `Cuando alguien te dice "necesito una web", en realidad puede estar describiendo dos cosas completamente distintas. Y construir la equivocada es uno de los errores más caros que cometen las empresas.

## Qué es una página web

Una página web es un sitio con múltiples secciones: inicio, sobre nosotros, servicios, blog, contacto. Es tu presencia digital completa. El objetivo es informar, generar confianza y cubrir múltiples audiencias a la vez.

Una tienda de muebles, un despacho de abogados o una clínica dental necesitan una página web. Tienen servicios variados, diferentes tipos de clientes y necesitan que la gente encuentre información sobre ellos.

**Características de una página web:**
- Múltiples páginas y secciones
- Navegación compleja
- Objetivo: informar y generar confianza
- Tiempo de desarrollo: semanas o meses
- Coste: mayor

## Qué es una landing page

Una landing page es una página única con un solo objetivo: conseguir que el visitante haga una acción concreta. Que compre, que deje su email, que pida un presupuesto, que descargue algo.

Todo en la página está diseñado para guiar al visitante hacia esa acción. Sin distracciones, sin menús innecesarios, sin links que lleven a otro sitio.

**Características de una landing page:**
- Una sola página, un solo mensaje
- Un único botón de llamada a la acción
- Objetivo: conversión
- Tiempo de desarrollo: horas o días
- Coste: menor

## Cuándo necesitas cada una

Necesitas una **landing page** si:
- Estás lanzando un producto o servicio nuevo y quieres validarlo rápido
- Tienes una campaña de publicidad en Google o redes sociales
- Quieres capturar leads para una lista de email
- Estás organizando un evento o webinar
- Quieres probar si hay demanda antes de construir algo grande

Necesitas una **página web** si:
- Tu negocio ya existe y necesita presencia digital completa
- Tienes varios productos o servicios distintos
- Quieres posicionarte en Google con SEO
- Tus clientes necesitan información detallada antes de contactarte

## El error más común

La mayoría de negocios que lanzan campañas de publicidad cometen el mismo error: mandan el tráfico a su página web general en lugar de a una landing page específica.

Si alguien hace clic en un anuncio de "clases de yoga online" y llega a una web con menú, sobre nosotros, blog y diez opciones distintas, se va. Si llega a una página que dice exactamente lo que buscaba con un botón para apuntarse, se queda.

**La regla:** publicidad → landing page. SEO y marca → página web.

## ¿Y si necesito las dos?

Muchos negocios necesitan las dos. Tienen su página web para su presencia general y lanzan landing pages específicas para cada campaña o producto nuevo.

No son excluyentes. Son herramientas distintas para objetivos distintos.

En Por 2 Duros hacemos las dos. Una landing page en 24 horas desde €299, una web completa en 48 horas desde €499. Si no tienes claro cuál necesitas, cuéntanos tu caso y te decimos qué tiene más sentido para ti.`,
  },
  {
    slug: 'como-lanzar-tienda-online-2026',
    title: 'Cómo Lanzar una Tienda Online en 2026: Guía Sin Rodeos',
    excerpt: 'Sin plantillas genéricas ni plataformas de suscripción cara. Lo que necesitas realmente para vender online desde el primer día.',
    metaDesc: 'Guía práctica para lanzar una tienda online en 2026: tecnología, costes reales, errores a evitar y cómo empezar a vender desde el primer día.',
    published: true,
    publishedAt: new Date('2026-06-09'),
    content: `Hay miles de tutoriales que te dicen cómo abrir una tienda en Shopify en cinco minutos. Este no es uno de esos. Esto es lo que necesitas saber si quieres una tienda que realmente venda.

## El problema con las plataformas de suscripción

Shopify, Wix Ecommerce, Squarespace. Todos tienen algo en común: te cobran cada mes aunque no vendas nada, se quedan un porcentaje de cada transacción y cuando quieres salir, tus datos son un rehén.

Para un negocio que empieza con poco volumen de ventas, pagar €30-80 al mes desde el primer día es quemar dinero. Y cuando crezcas, ese porcentaje por transacción se convierte en un impuesto permanente a tu éxito.

Hay una alternativa mejor.

## La stack correcta para 2026

Una tienda seria hoy se construye con tecnología que tú controlas:

**WooCommerce + WordPress** si ya tienes contenido y SEO es tu canal principal. Es gratuito, hay miles de plugins y el ecosistema es maduro. El problema: requiere mantenimiento y puede volverse lento si no se gestiona bien.

**Next.js + Stripe** si quieres rendimiento máximo y control total. Carga en milisegundos, no pagas comisiones por transacción más allá de lo que cobra Stripe (1,4% + 0,25€ en Europa), y es tuya al 100%. El problema: necesita desarrollo a medida.

**Shopify** tiene sentido solo si vendes físico a escala, necesitas gestión de inventario compleja o quieres internacionalizarte rápido.

## Lo que necesitas antes de construir nada

Antes de gastar un euro en desarrollo, responde estas preguntas:

**¿Cuántos productos tienes?** Si son menos de 50, cualquier solución funciona. Si son miles, necesitas un sistema de gestión de catálogo serio.

**¿Dónde están tus clientes?** Si vienen de Instagram, necesitas que la integración con Instagram Shopping sea fluida. Si vienen de Google, el SEO de tu tienda es crítico.

**¿Cuál es tu margen?** Si vendes productos de €10 con margen del 20%, un 2% de comisión por transacción destruye tu negocio. Si vendes servicios de €500, ese 2% es irrelevante.

**¿Qué pasa después de la venta?** Gestión de devoluciones, envíos, facturas, atención al cliente. Una tienda no es solo el botón de comprar.

## Los costes reales

Esto es lo que nadie te dice:

- **Dominio y hosting:** €10-20 al año si usas Vercel o similar
- **Pasarela de pago:** Stripe cobra 1,4% + 0,25€ por transacción europea. Sin cuota mensual
- **Diseño y desarrollo:** entre €599 y €2.000 según complejidad. Pago único, no recurrente
- **Fotografía de producto:** si vendes físico, esto marca más la diferencia que cualquier otra cosa. No escatimes aquí

Total para una tienda funcional: €700-2.500 de inicio, sin costes recurrentes significativos.

Compara eso con Shopify Basic: €29/mes + 2% de comisión. En dos años has pagado más de €700 solo en cuotas, sin contar comisiones.

## Los errores que cuestan más caro

**Empezar con demasiados productos.** Lanza con 10-20 productos estrella. Añade más cuando funcione.

**No tener fotos buenas.** Una foto mala vende menos que ninguna foto. Invierte en esto antes que en cualquier otra cosa.

**Ignorar el SEO desde el principio.** Las URLs de producto, los títulos, las descripciones. Si lo construyes mal al principio, rehacer eso cuando ya tienes cien productos es una pesadilla.

**No tener claro el proceso de envío antes de lanzar.** El primer pedido siempre llega antes de estar listo. Ten resuelto el packaging, el mensajero y las etiquetas antes de abrir.

## Cuándo lanzar

La respuesta es: antes de lo que crees que estás listo. Una tienda con diez productos y buenas fotos que lanza hoy aprende más en un mes que una tienda perfecta que lleva seis meses en desarrollo.

En Por 2 Duros construimos tiendas desde €599 con Next.js y Stripe, listas en 48 horas desde que confirmamos requisitos. Sin suscripciones, sin comisiones ocultas, con el código en tu repositorio.`,
  },
  {
    slug: 'seo-basico-para-pequenas-empresas',
    title: 'SEO Básico Para Pequeñas Empresas: Lo Que Puedes Hacer Tú Mismo',
    excerpt: 'No necesitas una agencia de €2.000 al mes para aparecer en Google. Estas acciones concretas las puedes hacer hoy, sin conocimientos técnicos.',
    metaDesc: 'SEO básico para pequeñas empresas en 2026: acciones concretas que puedes hacer tú mismo para aparecer en Google sin contratar a nadie.',
    published: true,
    publishedAt: new Date('2026-06-09'),
    content: `El SEO tiene fama de ser complicado, caro y lento. En parte es verdad. Pero hay cosas concretas que cualquier negocio puede hacer hoy que marcan una diferencia real en los próximos meses.

## Por qué el SEO importa más que nunca

Google sigue siendo donde la gente busca cuando tiene intención de comprar. Redes sociales sirven para descubrir, pero cuando alguien busca "fontanero en Madrid" o "diseñadora gráfica para logos", está listo para contratar.

Aparecer en esa búsqueda vale más que mil seguidores en Instagram.

## Lo que puedes hacer tú mismo esta semana

### 1. Reclama tu ficha de Google Business

Si tienes un negocio local y no tienes Google Business Profile, esto es lo primero. Es gratis, tarda veinte minutos en configurarse y hace que aparezcas en Google Maps cuando alguien busca tu servicio en tu zona.

Rellena todo: descripción, horario, fotos, categorías. Las fichas completas posicionan mejor.

### 2. Escribe el título y la descripción de cada página

Cada página de tu web tiene un título (lo que aparece en la pestaña del navegador) y una meta descripción (el texto que aparece en los resultados de Google). La mayoría de webs tienen esto mal o vacío.

El título debe incluir la keyword principal de esa página y el nombre de tu negocio. La descripción debe resumir qué hace esa página en menos de 160 caracteres e invitar a hacer clic.

Ejemplo malo: "Inicio — Mi Empresa"
Ejemplo bueno: "Fontanero urgente en Madrid 24h — Fontanería García"

### 3. Consigue links de otros sitios

Google interpreta los links de otros sitios hacia el tuyo como votos de confianza. No necesitas cientos. Necesitas unos pocos relevantes.

Empieza por lo fácil: di a tus proveedores que te enlacen en su web, inscríbete en directorios del sector, si perteneces a una asociación profesional asegúrate de que te enlacen.

### 4. Escribe contenido que responda preguntas reales

El blog no es para hablar de tu empresa. Es para responder las preguntas que tus potenciales clientes hacen en Google.

Si eres abogado especialista en divorcios, escribe "cuánto cuesta un divorcio en España", "cuánto tiempo tarda un divorcio de mutuo acuerdo", "documentos necesarios para tramitar un divorcio". Esas son búsquedas reales con intención clara.

Cada artículo bien escrito es una puerta de entrada desde Google que funciona mientras duermes.

### 5. Asegúrate de que tu web carga rápido

Google penaliza las webs lentas. Puedes comprobarlo gratis con PageSpeed Insights. Si tu web tarda más de tres segundos en cargar en móvil, estás perdiendo posicionamiento y clientes.

Las causas más comunes son imágenes sin comprimir y hosting lento. Ambas tienen solución.

## Lo que NO merece tu tiempo

**Comprar links.** Google lo detecta y puede penalizarte. No lo hagas.

**Obsesionarte con la densidad de keywords.** Escribir de forma natural para personas posiciona mejor que repetir la keyword cada dos párrafos.

**Cambiar cosas constantemente.** El SEO es lento. Un cambio tarda meses en reflejarse. Haz los cambios correctos y deja que el tiempo actúe.

**Las herramientas de pago si empiezas.** Google Search Console y Google Analytics son gratuitos y suficientes para empezar. No necesitas Ahrefs ni Semrush hasta que tengas un volumen serio de tráfico.

## El marco temporal real

El SEO no es publicidad de pago donde pagas y ves resultados al día siguiente. Es una inversión a medio plazo.

En condiciones normales:
- **1-3 meses:** Google indexa tus páginas, empieza a entender tu sitio
- **3-6 meses:** Empiezas a ver movimiento en búsquedas de cola larga (menos competidas)
- **6-12 meses:** Resultados significativos en búsquedas principales

Por eso la mejor estrategia es empezar hoy, aunque no lo veas hasta dentro de seis meses.

## Una nota sobre la base técnica

Todo lo anterior funciona mejor sobre una base técnica sólida: web rápida, código limpio, estructura de URLs correcta, certificado SSL, versión móvil optimizada.

En Por 2 Duros construimos todas las webs con SEO técnico incluido desde el principio: sitemap automático, metadatos en todas las páginas, datos estructurados para Google. No es un extra, es parte de cómo trabajamos.`,
  },
  {
    slug: 'rgpd-para-tu-web-2026',
    title: 'RGPD Para Tu Web: Lo Que Necesitas Sí o Sí en 2026',
    excerpt: 'Las multas por incumplir el RGPD llegan a millones. La mayoría de webs de pequeñas empresas tienen al menos tres infracciones. Aquí lo que necesitas tener.',
    metaDesc: 'RGPD para webs en 2026: qué necesitas obligatoriamente, cómo hacer el aviso de cookies correctamente y qué pasa si no cumples.',
    published: true,
    publishedAt: new Date('2026-06-09'),
    content: `El RGPD lleva en vigor desde 2018 pero la mayoría de pequeñas empresas siguen teniendo su web en infracción. No porque sean irresponsables, sino porque nadie les ha explicado de forma clara qué se necesita exactamente.

Esto es esa explicación.

## Qué es el RGPD y por qué te afecta

El Reglamento General de Protección de Datos es la normativa europea que regula cómo las empresas recogen, almacenan y usan datos personales. Si tu web tiene un formulario de contacto, Google Analytics, un píxel de Facebook o cualquier cookie que no sea estrictamente técnica, el RGPD te afecta.

No importa el tamaño de tu empresa. Una web con un formulario de contacto tiene las mismas obligaciones básicas que una multinacional.

Las multas pueden llegar al 4% de la facturación anual o 20 millones de euros, lo que sea mayor. En la práctica, para pequeños negocios suelen ser advertencias o multas de €3.000-50.000, pero existen y se imponen.

## Lo que necesitas obligatoriamente

### Política de privacidad

Es el documento más importante. Debe explicar:
- Qué datos recoge tu web y por qué
- Quién los trata (tú y los terceros que uses: Google, Mailchimp, etc.)
- Cuánto tiempo los conservas
- Qué derechos tienen los usuarios sobre sus datos
- Cómo pueden ejercer esos derechos

No vale copiar la política de otra web. Tiene que ser específica de tu caso.

### Aviso de cookies

Si usas cualquier cookie que no sea estrictamente necesaria para que la web funcione, necesitas pedir consentimiento **antes** de instalarlas. No después. No en la misma carga. Antes.

Un banner que diga "al seguir navegando aceptas las cookies" no cumple el RGPD. Necesitas un banner con botón de aceptar y botón de rechazar igual de visibles. El rechazo no puede ser más difícil que la aceptación.

### Política de cookies

Un documento aparte (o una sección clara) que explique qué cookies usa tu web, para qué sirven y cómo desactivarlas.

### Formularios con consentimiento explícito

Cada formulario de tu web que recoja datos debe:
- Tener una casilla de consentimiento **desmarcada por defecto**
- Explicar para qué se van a usar los datos
- Tener un link a la política de privacidad

Un formulario de contacto sin casilla de consentimiento es una infracción.

## Las cosas que la mayoría hace mal

**Google Analytics sin consentimiento previo.** Si cargas Google Analytics antes de que el usuario acepte cookies, estás incumpliendo el RGPD. El píxel de Facebook tiene el mismo problema.

**Banner de cookies decorativo.** Tener un banner que solo tiene "Aceptar" sin opción de rechazar o sin granularidad (poder rechazar unas y aceptar otras) no cumple.

**Política de privacidad genérica.** Una plantilla copiada que no menciona los servicios que usas realmente (tu CRM, tu herramienta de email marketing, tu plataforma de pagos) no es válida.

**No mencionar los encargados del tratamiento.** Si usas Mailchimp para email marketing, tienes que mencionarlo en tu política de privacidad como encargado del tratamiento.

## Cómo implementarlo sin volverte loco

La parte técnica se resuelve con una plataforma de gestión de consentimiento (CMP). Las más usadas son Cookiebot y CookieYes, con planes gratuitos para webs pequeñas. Se integran en tu web y gestionan automáticamente qué cookies cargar según el consentimiento del usuario.

La parte legal es diferente: necesitas que alguien con conocimiento jurídico redacte o revise tu política de privacidad. No es cara. Muchos abogados especializados tienen servicios de €150-300 para documentos de privacidad para pequeñas empresas.

## Lo que pasa si no cumples

La Agencia Española de Protección de Datos (AEPD) puede actuar por:
- Denuncia de un usuario o competidor
- Inspección propia (menos frecuente para webs pequeñas)
- Notificación de una brecha de seguridad

Para pequeños negocios, el proceso suele empezar con un requerimiento de subsanación. Si no corriges en el plazo dado, llega la sanción.

La mejor estrategia no es esperar a que llegue el requerimiento.

## En Por 2 Duros

Todas las webs que construimos incluyen la base técnica del RGPD: gestor de consentimiento de cookies integrado, formularios con consentimiento explícito y estructura preparada para las políticas legales.

La parte jurídica (redacción de políticas) la recomendamos hacer con un abogado especializado, porque cada negocio tiene particularidades que un texto genérico no cubre correctamente.`,
  },
]

async function main() {
  console.log('Creando artículos del blog...')

  for (const post of posts) {
    const existing = await prisma.blogPost.findUnique({ where: { slug: post.slug } })
    if (existing) {
      console.log(`⏭  Ya existe: ${post.slug}`)
      continue
    }
    await prisma.blogPost.create({ data: post })
    console.log(`✅ Creado: ${post.title}`)
  }

  console.log('¡Listo!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
