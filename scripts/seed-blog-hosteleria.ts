import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.blogPost.upsert({
    where: { slug: 'web-para-restaurantes-hoteles-hosteleria' },
    update: {},
    create: {
      slug: 'web-para-restaurantes-hoteles-hosteleria',
      title: 'El desarrollador que sabe lo que es trabajar un sábado por la noche con el local lleno',
      excerpt: 'Uno de nuestros desarrolladores lleva más de 15 años en hostelería: camarero, cocinero y barman. Cuando hacemos tu web, no tienes que explicarnos cómo funciona tu negocio. Ya lo sabemos.',
      metaDesc: '¿Buscas una web para tu restaurante, hotel o bar? En Por 2 Duros uno de nuestros desarrolladores lleva más de 15 años en hostelería. Sabemos lo que necesitas porque lo hemos vivido.',
      coverImageUrl: '/images/blog/hosteleria-desarrollador.png',
      published: true,
      publishedAt: new Date('2026-06-26'),
      content: `## El desarrollador que sabe lo que es trabajar un sábado por la noche con el local lleno

Hay una pregunta que no se hace casi nadie cuando contrata una web:

**¿La persona que me la hace sabe cómo funciona mi negocio por dentro?**

En la mayoría de agencias, la respuesta es no. Te hacen preguntas genéricas, te mandan un formulario de "briefing" y te entregan algo que queda bonito en pantalla pero no encaja con cómo trabaja tu equipo.

En Por 2 Duros, la respuesta es diferente. Uno de nuestros desarrolladores lleva **más de 15 años en hostelería**: camarero, cocinero y barman. Ha abierto locales, ha cerrado cajas a la una de la madrugada, ha gestionado comandas con el local a reventar y ha recibido reservas por teléfono mientras sacaba una ronda.

Ese perfil no existe en casi ninguna agencia de desarrollo. En la nuestra, sí.

## Qué significa eso para ti

Cuando nos hablas de tu negocio, no tienes que explicar desde cero cómo funciona un pase, qué necesita ver un encargado de un vistazo en el móvil, o por qué actualizar la carta tiene que ser cosa de segundos y no de llamar a un técnico.

Ya lo sabemos.

Eso se nota en el resultado:

- 🍽️ Una carta digital que **se actualiza en 30 segundos** sin llamar a nadie — ideal cuando cambia el menú del día o se acaba un plato.
- 📅 Un sistema de **reservas online** que manda confirmaciones automáticas y te libera del teléfono en el servicio.
- 📱 Una web que **carga rápido en el móvil** — porque el 80% de tus clientes te busca desde el móvil justo antes de salir de casa.
- ⭐ Integración con **Google, TripAdvisor o TheFork** para que la información esté siempre actualizada.
- 🔔 Una sección de **eventos y menús especiales** que gestionas tú mismo, sin depender de nosotros.

## Lo que no vamos a hacer

No te vamos a vender una plantilla con fotos de stock de platos que no son los tuyos.

No te vamos a cobrar €4.000 por algo que puedes tener **desde €299**, funcionando en 48 horas.

Y no te vamos a dar una web que no puedas tocar porque "es muy técnica". Si llevas un restaurante, un hotel o un bar, ya gestionas cosas más complicadas cada día.

## Para quién es esto

Para **cualquier negocio de hostelería**:

🍕 Restaurantes y bares · 🏨 Hoteles y casas rurales · ☕ Cafeterías y pastelerías · 🍸 Coctelerías y bares de copas · 🎉 Caterings y eventos · 🏖️ Chiringuitos y terrazas

## Una última cosa

Hay una diferencia enorme entre una web que *parece* de hostelería y una que *funciona* para hostelería.

La primera la puede hacer cualquiera. La segunda, solo quien ha pasado por ello.

Cuéntanos cómo es tu negocio y te decimos exactamente qué necesitas, cuánto cuesta y cuándo lo tienes listo.

[Quiero una web para mi negocio →](/#contacto)`,
    },
  })
  console.log('✅ Artículo de hostelería publicado')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
