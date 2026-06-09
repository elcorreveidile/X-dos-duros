import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const articles = [
  {
    slug: 'senales-de-alarma-al-contratar-agencia-web',
    title: 'Señales de alarma al contratar una agencia web (y cómo evitar arrepentirte)',
    excerpt: 'No todas las agencias web son iguales. Estas son las señales que indican que vas a perder tiempo, dinero o ambos — y lo que deberías exigir en su lugar.',
    metaDesc: 'Aprende a detectar las señales de alarma al contratar una agencia web: falta de portfolio, contratos abusivos, WordPress para todo y más. Guía práctica.',
    content: `<h2>El problema con contratar una agencia web a ciegas</h2>
<p>Cada año, miles de empresas españolas pagan entre 2.000 y 15.000 euros por una web que no funciona como esperaban. Plazos que se multiplican por tres, funcionalidades que "no estaban incluidas", webs que tardan 8 segundos en cargar o código que nadie más puede tocar.</p>
<p>La buena noticia: la mayoría de estos problemas se pueden detectar antes de firmar nada. Solo hay que saber qué mirar.</p>

<h2>1. No tienen portfolio o no te lo quieren mostrar</h2>
<p>Cualquier agencia seria tiene proyectos reales que mostrar. Si la respuesta es "nuestros clientes prefieren confidencialidad" para <em>todos</em> los proyectos, es una señal de alarma. Exige ver al menos 3 proyectos terminados con URL funcional.</p>
<p>Cuando veas el portfolio, visita las webs en tu móvil. Comprueba si cargan rápido. Busca si están actualizadas. Una web de 2019 con diseño de 2010 dice mucho sobre cómo trabajan.</p>

<h2>2. El precio es sospechosamente bajo o sospechosamente alto</h2>
<p>Una landing page profesional por debajo de 200 euros es matemáticamente imposible si hay un profesional real detrás. Eso es trampa de precio para engancharte y luego cobrarte extras por todo.</p>
<p>Al contrario, pagar 8.000 euros por una web corporativa sin tienda ni funcionalidades complejas tampoco tiene justificación en 2026. El mercado tiene rangos razonables. Si algo se sale mucho de ellos en cualquier dirección, pregunta por qué.</p>

<h2>3. Usan WordPress para absolutamente todo</h2>
<p>WordPress no es malo. Es una herramienta válida para ciertos casos. El problema es cuando una agencia lo usa para todo sin preguntarte qué necesitas realmente, porque es lo que saben hacer y punto.</p>
<p>Una agencia web profesional te explica las opciones, los pros y contras de cada una, y te recomienda la tecnología según tu caso. Si la primera frase en toda conversación es "lo haremos en WordPress", empieza a hacer preguntas.</p>

<h2>4. No te dan el código o el acceso</h2>
<p>Este es el más grave. Hay agencias que alojan tu web en sus servidores con acceso restringido, de modo que si te vas, pierdes la web. O te entregan el código en un formato tan propietario que nadie más puede trabajar con él.</p>
<p>Exige por escrito: el código fuente en un repositorio tuyo, acceso completo al servidor, y confirmación de que puedes cambiar de proveedor en cualquier momento sin perder nada.</p>

<h2>5. Los plazos son vagos o el contrato no los recoge</h2>
<p>"En unas semanas estará listo" no es un plazo. Si el contrato no tiene fechas concretas con penalizaciones por incumplimiento, el incentivo para terminar a tiempo es cero.</p>
<p>Pide un calendario con hitos: fecha de entrega del prototipo, fecha de revisión, fecha de entrega final. Con consecuencias reales si no se cumple.</p>

<h2>6. No mencionan el SEO ni el RGPD en ningún momento</h2>
<p>Una web que no está optimizada para Google es invisible. Una web que no cumple el RGPD puede acarrear multas de hasta el 4% de la facturación anual. Si la agencia no menciona ninguno de los dos temas por iniciativa propia durante el briefing, pregunta directamente qué incluyen.</p>
<p>El SEO técnico básico (velocidad, metaetiquetas, estructura) y el cumplimiento legal (política de privacidad, cookies, aviso legal) deberían estar incluidos en cualquier proyecto sin coste adicional.</p>

<h2>7. Solo se comunican por email y tardan días en responder</h2>
<p>Durante el desarrollo necesitarás hacer cambios, aclarar dudas, aprobar elementos. Si ya en la fase de venta tardan 3 días en responderte un email, imagina durante el proyecto.</p>
<p>Pregunta cómo van a gestionar la comunicación: ¿hay un responsable de proyecto asignado? ¿Cuál es el tiempo de respuesta garantizado?</p>

<h2>Lo que deberías exigir siempre</h2>
<ul>
<li>Portfolio real con URLs funcionales</li>
<li>Contrato con fechas y penalizaciones</li>
<li>Código fuente en repositorio propio</li>
<li>SEO técnico incluido</li>
<li>Cumplimiento RGPD incluido</li>
<li>Garantía de devolución</li>
<li>Tiempo de respuesta garantizado</li>
</ul>

<p>En <strong>Por 2 Duros</strong> entregamos el código en tu repositorio desde el primer día, incluimos SEO técnico y cumplimiento RGPD en todos los proyectos, y garantizamos la entrega en 48 horas con devolución completa si no quedas satisfecho. <a href="/#contacto">Pídenos presupuesto gratis</a> — respondemos en menos de 2 horas.</p>`,
    publishedAt: new Date('2026-06-09'),
  },
  {
    slug: 'por-que-tu-negocio-necesita-una-web-y-no-solo-instagram',
    title: 'Por qué tu negocio necesita una web (y no solo Instagram)',
    excerpt: 'Instagram puede desaparecer mañana o silenciar tu cuenta sin aviso. Tu web no. Aquí por qué depender solo de las redes sociales es el error más caro que puede cometer un negocio en 2026.',
    metaDesc: 'Por qué tu negocio necesita una web propia y no solo Instagram o redes sociales. Razones concretas con datos reales para pymes y autónomos en España.',
    content: `<h2>El día que Meta apagó miles de negocios</h2>
<p>En octubre de 2021, Facebook, Instagram y WhatsApp estuvieron caídos durante más de 6 horas. Miles de negocios que dependían de estas plataformas para captar clientes ese día simplemente no existieron. Sin web propia, sin visibilidad, sin ventas.</p>
<p>No fue la primera vez. No será la última. Y ese día, los negocios con web propia siguieron funcionando con normalidad.</p>

<h2>El problema de fondo: no eres dueño de tu audiencia</h2>
<p>Cuando tienes 10.000 seguidores en Instagram, en realidad no tienes nada tuyo. Meta es el propietario de esa audiencia. Puede reducir tu alcance orgánico al 2% (como ha hecho progresivamente desde 2012). Puede cerrar tu cuenta por error algorítmico. Puede cambiar las reglas del juego mañana.</p>
<p>Con tu web, los visitantes son tuyos. Sus emails, si los capturas, son tuyos. El contenido que publicas no desaparece si cambia un algoritmo.</p>

<h2>Google no indexa Instagram</h2>
<p>Cuando alguien busca "fontanero urgente Sevilla" en Google, no aparecen perfiles de Instagram. Aparecen webs. Si no tienes web, no existes en la búsqueda más usada del mundo.</p>
<p>El 68% de las experiencias online empiezan con un buscador. Si tu único canal es Instagram, estás renunciando a la mayoría del tráfico potencial antes de empezar.</p>

<h2>Instagram no transmite profesionalidad en todos los sectores</h2>
<p>Un restaurante moderno puede funcionar bien solo con Instagram. Una clínica dental, un despacho de abogados, una empresa de reformas o un consultor financiero necesitan una web. Sus clientes la van a buscar, y si no la encuentran, se van a la competencia que sí la tiene.</p>
<p>La web no es solo marketing: es la validación de que eres un negocio serio.</p>

<h2>No puedes medir nada en Instagram (de verdad)</h2>
<p>Instagram te da likes y seguidores. Google Analytics te dice cuánta gente visitó tu página de precios, cuánto tiempo la leyeron, desde dónde vinieron, y en qué punto se fueron sin contactarte. Esa diferencia es la diferencia entre intuición y datos.</p>
<p>Con esos datos puedes mejorar tu web, tu propuesta y tu proceso de venta de forma continua.</p>

<h2>La web y las redes se complementan, no compiten</h2>
<p>Esto no es un argumento contra Instagram. Es un argumento para tener ambos, con cada uno haciendo lo que mejor sabe hacer:</p>
<ul>
<li><strong>Instagram:</strong> descubrimiento, comunidad, contenido visual, engagement</li>
<li><strong>Tu web:</strong> credibilidad, SEO, conversión, captación de leads, ventas</li>
</ul>
<p>El flujo ideal es que alguien te descubra en Instagram y vaya a tu web para contactar o comprar. Si no tienes web, el embudo se corta a la mitad.</p>

<h2>¿Cuánto cuesta tener una web propia?</h2>
<p>Mucho menos de lo que probablemente piensas. Una landing page profesional con código a medida, SEO técnico y formulario de contacto funcional cuesta desde 299 euros. Un pago único, sin cuotas mensuales.</p>
<p>Para la mayoría de negocios, una sola venta que llegue a través de la web amortiza el coste en días.</p>

<p>En <strong>Por 2 Duros</strong> desarrollamos tu web en 48 horas desde que confirmamos el briefing. Sin plantillas, sin WordPress, sin sorpresas. <a href="/#contacto">Pídenos presupuesto</a> — es gratis y respondemos en menos de 2 horas.</p>`,
    publishedAt: new Date('2026-06-09'),
  },
  {
    slug: 'como-elegir-agencia-web-en-espana-10-preguntas',
    title: 'Cómo elegir una agencia web en España: las 10 preguntas que debes hacer antes de firmar',
    excerpt: '¿Cómo saber si una agencia web vale lo que pide? Estas 10 preguntas te ayudan a separar las que entregan valor de las que solo entregan facturas.',
    metaDesc: 'Guía para elegir agencia web en España. 10 preguntas clave sobre portfolio, tecnología, plazos, propiedad del código y garantías antes de contratar.',
    content: `<h2>La pregunta que más cuesta hacer</h2>
<p>Contratar una agencia web debería ser fácil: tienes un proyecto, ellos tienen la habilidad, os ponéis de acuerdo en precio y plazo. En la práctica, el mercado está lleno de actores muy dispares y elegir mal puede costarte meses de retraso y miles de euros.</p>
<p>Estas 10 preguntas no garantizan que todo salga bien, pero sí eliminan a la mayoría de los malos proveedores antes de que hagas ningún pago.</p>

<h2>1. ¿Podéis mostrarme 3 proyectos terminados con URL funcional?</h2>
<p>La respuesta correcta es "sí" con los enlaces en menos de 24 horas. Cualquier otra respuesta es una señal de alarma. Visita esas URLs en tu móvil. Si cargan lento, tienen errores o tienen un diseño de hace 10 años, ya sabes lo que puedes esperar.</p>

<h2>2. ¿Con qué tecnología vais a desarrollar mi proyecto?</h2>
<p>No necesitas ser técnico para entender la respuesta. Lo que sí deberías saber: WordPress es una buena opción para blogs y webs de contenido. No lo es para aplicaciones complejas. Next.js, React o similar es la opción estándar para proyectos modernos. Si la respuesta es "Wix" o "Squarespace" y buscas algo profesional, sigue buscando.</p>

<h2>3. ¿El código será mío? ¿Puedo llevármelo en cualquier momento?</h2>
<p>Esta es innegociable. El código de tu web debe ser tuyo. Debe estar en un repositorio que controles tú. Debe poder ser tocado por cualquier otro desarrollador en el futuro. Si la respuesta implica que el código "vive en sus servidores" o que necesitas su permiso para migrar, no firmes.</p>

<h2>4. ¿Cuál es el plazo de entrega y qué pasa si no lo cumplen?</h2>
<p>Pide fechas concretas en el contrato. Si no las ponen por escrito, el plazo es infinito. Y pregunta específicamente qué mecanismo de compensación existe si se retrasan: descuento, semanas adicionales gratuitas, devolución parcial. Si no hay ninguno, el incentivo para cumplir es cero.</p>

<h2>5. ¿Qué incluye exactamente el precio y qué se cobra aparte?</h2>
<p>Las sorpresas más caras en proyectos web son los extras que "no estaban incluidos": el SEO ("eso es un servicio aparte"), el formulario de contacto ("eso tiene coste adicional"), la adaptación móvil ("habría que revisarlo"). Pide una lista exhaustiva de lo que está y lo que no está incluido antes de firmar.</p>

<h2>6. ¿Hay cuotas mensuales obligatorias después de la entrega?</h2>
<p>Algunos proveedores estructuran el precio inicial bajo y luego cobran cuotas de mantenimiento, hosting o licencias que son difíciles de cancelar sin perder funcionalidad. Aclara si el proyecto tiene algún coste recurrente obligatorio y cuánto es.</p>

<h2>7. ¿El proyecto incluye SEO técnico y cumplimiento RGPD?</h2>
<p>Una web que no aparece en Google y que viola la normativa de privacidad no es una web terminada. Ambas cosas deberían estar incluidas por defecto en cualquier proyecto profesional. Si te las ofrecen como extras de pago, recalcula el precio real.</p>

<h2>8. ¿Cómo va a ser la comunicación durante el proyecto?</h2>
<p>Pregunta: ¿tengo un responsable de proyecto asignado? ¿Por qué canal os contacto? ¿Cuál es el tiempo de respuesta garantizado? Saber que vas a tardar 3 días en tener respuesta a una duda durante el desarrollo es información importante antes de empezar.</p>

<h2>9. ¿Tenéis garantía de devolución?</h2>
<p>Una agencia que confía en su trabajo ofrece garantía. No tiene por qué ser incondicional, pero algo como "si al entregar el proyecto no cumple los requisitos acordados en el briefing, lo corregimos sin coste" es lo mínimo razonable. Sin garantía, todo el riesgo recae sobre ti.</p>

<h2>10. ¿Podéis darme referencias de clientes anteriores?</h2>
<p>El portfolio muestra el resultado visual. Una referencia te dice cómo fue el proceso: si cumplieron plazos, cómo gestionaron los cambios, si el presupuesto final coincidió con el inicial. Una agencia con clientes satisfechos no tiene problema en facilitarte el contacto.</p>

<h2>La respuesta rápida a las 10 preguntas</h2>
<p>En <strong>Por 2 Duros</strong> la respuesta a todas es sí: portfolio público, código en tu repositorio, entrega en 48 horas con fecha garantizada en el contrato, precio cerrado sin sorpresas, SEO y RGPD incluidos, y garantía de devolución de 15 días. <a href="/#contacto">Hablamos</a>.</p>`,
    publishedAt: new Date('2026-06-09'),
  },
  {
    slug: 'errores-que-cometen-las-pymes-con-su-web',
    title: 'Los 8 errores más caros que cometen las pymes con su web (y cómo evitarlos)',
    excerpt: 'Tener web no es suficiente. La mayoría de pymes tienen webs que no convierten, no aparecen en Google o directamente ahuyentan a los clientes. Estos son los errores más comunes y cómo corregirlos.',
    metaDesc: 'Los errores más frecuentes que cometen las pymes con su web: sin móvil, sin SEO, sin analytics, plantillas genéricas y más. Guía para pequeñas empresas.',
    content: `<h2>Tener web no es lo mismo que tener una web que funciona</h2>
<p>El 74% de las pymes españolas tiene presencia web. Pero tener un dominio activo no significa que esa web esté ayudando al negocio. En muchos casos, la web está haciendo exactamente lo contrario: transmitiendo desconfianza, siendo invisible en Google o perdiendo clientes en el proceso de contacto.</p>
<p>Estos son los 8 errores que vemos más frecuentemente — y todos tienen solución.</p>

<h2>Error 1: La web no funciona bien en móvil</h2>
<p>En 2026, el 70% del tráfico web en España viene de dispositivos móviles. Si tu web tiene textos diminutos, botones que no se pueden pulsar o hay que hacer scroll horizontal para ver el contenido, estás perdiendo a 7 de cada 10 visitantes antes de que lean nada.</p>
<p><strong>Solución:</strong> Diseño mobile-first desde el principio. No es un extra — es el mínimo exigible.</p>

<h2>Error 2: La web tarda más de 3 segundos en cargar</h2>
<p>Google usa la velocidad de carga como factor de posicionamiento. Además, el 53% de los usuarios abandona una web si tarda más de 3 segundos. Las webs en WordPress con 40 plugins activos o con imágenes sin optimizar suelen tener este problema.</p>
<p><strong>Solución:</strong> Optimiza imágenes, usa un hosting de calidad y elige la tecnología adecuada. Una web en Next.js bien construida carga en menos de 1 segundo.</p>

<h2>Error 3: No hay ninguna llamada a la acción clara</h2>
<p>El visitante llega a tu web, ve información sobre ti, pero no sabe qué hacer a continuación. ¿Te llama? ¿Rellena un formulario? ¿Compra directamente? Si no hay un botón visible que diga exactamente qué hacer, la mayoría no hace nada.</p>
<p><strong>Solución:</strong> Una CTA principal visible en la parte superior de la página, repetida a lo largo del contenido. "Pedir presupuesto", "Reservar cita", "Comprar ahora" — específica y en imperativo.</p>

<h2>Error 4: El formulario de contacto no funciona</h2>
<p>Es más común de lo que parece. El formulario existe pero los emails van a spam, o hay un error de servidor que nadie ha revisado en meses, o simplemente no está enlazado a ninguna bandeja de entrada activa. Cada semana se pierden clientes potenciales por esto.</p>
<p><strong>Solución:</strong> Prueba tu formulario tú mismo. Con una dirección de email real. Una vez al mes.</p>

<h2>Error 5: No hay analytics configurados</h2>
<p>Sin datos, cualquier decisión sobre tu web es una apuesta. ¿Qué página visita más la gente? ¿Desde dónde vienen? ¿En qué punto se van sin contactar? Sin Google Analytics o similar, nunca sabrás qué cambiar para mejorar.</p>
<p><strong>Solución:</strong> Instala Google Analytics 4. Es gratuito y tarda 15 minutos en configurar. A partir de ahí, tienes datos reales para tomar decisiones.</p>

<h2>Error 6: El contenido está desactualizado</h2>
<p>Precios de hace 3 años, servicios que ya no ofreces, el teléfono antiguo, fotos de antes de la renovación del local. Google penaliza el contenido obsoleto y los visitantes pierden confianza cuando ven una web que nadie actualiza.</p>
<p><strong>Solución:</strong> Auditoría de contenido cada 6 meses. Revisa precios, servicios, datos de contacto y fotos. Media hora de trabajo, gran impacto en la percepción.</p>

<h2>Error 7: No hay ninguna estrategia de SEO</h2>
<p>Tener web no es suficiente para aparecer en Google. Si nadie ha trabajado las palabras clave, los títulos, las metadescripciones y la estructura, la web es invisible para los buscadores. El 91% de las páginas web no recibe ningún tráfico orgánico de Google.</p>
<p><strong>Solución:</strong> SEO técnico básico (velocidad, estructura, metaetiquetas) desde el primer día, y contenido útil publicado de forma regular. Esto último es lo que marca la diferencia a largo plazo.</p>

<h2>Error 8: Copiar el diseño de la competencia</h2>
<p>Mirar a la competencia está bien para entender el mercado. Copiar su web es un error. Tu diferenciación desaparece, y encima lo más probable es que estés copiando los errores que ellos no saben que tienen.</p>
<p><strong>Solución:</strong> Define qué te hace diferente y diseña la web alrededor de eso. El diseño debe reflejar tu propuesta de valor, no la del vecino.</p>

<h2>¿Tu web tiene alguno de estos errores?</h2>
<p>En <strong>Por 2 Duros</strong> construimos webs sin estos problemas desde el principio: mobile-first, carga rápida, CTAs claras, formulario funcional, analytics incluido, SEO técnico y diseño 100% a medida. En 48 horas. <a href="/#contacto">Pídenos presupuesto gratis</a>.</p>`,
    publishedAt: new Date('2026-06-09'),
  },
  {
    slug: 'seo-local-como-aparecer-en-google-si-tienes-negocio-en-tu-ciudad',
    title: 'SEO local: cómo aparecer en Google si tienes un negocio en tu ciudad',
    excerpt: 'El SEO local es la forma más efectiva de conseguir clientes para negocios físicos. Sin gastar en publicidad. Estas son las acciones concretas que funcionan en 2026.',
    metaDesc: 'Guía de SEO local para negocios en España. Cómo aparecer en Google Maps, optimizar Google Business Profile, palabras clave locales y más para pymes.',
    content: `<h2>Por qué el SEO local es diferente (y más fácil)</h2>
<p>Cuando alguien busca "fontanero urgente Málaga" o "restaurante japonés Sevilla", Google no muestra los mismos resultados que para búsquedas genéricas. Muestra negocios locales. Y la competencia para aparecer ahí es mucho menor que para palabras clave nacionales.</p>
<p>Para un negocio con presencia física o que atiende a clientes en una zona geográfica concreta, el SEO local es probablemente la acción de marketing con mejor retorno de inversión disponible.</p>

<h2>Paso 1: Crea y optimiza tu Google Business Profile</h2>
<p>Google Business Profile (antes Google My Business) es el perfil que aparece en Google Maps y en el panel derecho cuando alguien busca tu negocio. Si no lo tienes, no apareces en Maps. Punto.</p>
<p>Cómo optimizarlo:</p>
<ul>
<li>Nombre exacto del negocio (sin keywords artificiales)</li>
<li>Categoría principal correcta</li>
<li>Horario actualizado</li>
<li>Teléfono y web funcionando</li>
<li>Al menos 10 fotos de calidad (del local, del equipo, de los productos)</li>
<li>Descripción con las palabras clave de tu servicio y ciudad</li>
</ul>
<p>Esto solo, bien hecho, ya te pone por delante del 80% de la competencia local.</p>

<h2>Paso 2: Consigue reseñas reales</h2>
<p>Las reseñas en Google son el factor de posicionamiento local más potente. No hay truco: hay que pedirlas activamente. El cliente sale satisfecho, tú le mandas un enlace directo a tu perfil de Google y le pides que escriba 2 líneas.</p>
<p>Responde a todas las reseñas, positivas y negativas. Google valora la actividad del perfil. Y los clientes potenciales leen las respuestas tanto como las reseñas.</p>

<h2>Paso 3: Tu web debe mencionar dónde estás</h2>
<p>Si tu web dice que eres una "agencia de marketing" pero no menciona en ningún lugar que estás en Córdoba, Google no sabe que eres relevante para búsquedas en Córdoba.</p>
<p>Incluye tu ciudad y provincia en:</p>
<ul>
<li>El título de la página principal</li>
<li>La metadescripción</li>
<li>El texto del hero o primera sección</li>
<li>El pie de página</li>
<li>La página de contacto con dirección completa</li>
</ul>

<h2>Paso 4: Páginas específicas para cada ciudad o zona</h2>
<p>Si atiendes varias ciudades, crea una página dedicada para cada una. No copies el contenido — escribe algo específico para cada lugar, aunque sea diferente en un 30-40%.</p>
<p>Por ejemplo: "Agencia web en Málaga", "Agencia web en Marbella", "Agencia web en Estepona". Cada una optimizada para su ciudad, con contenido relevante para ese mercado local.</p>

<h2>Paso 5: Consistencia de NAP en toda la web</h2>
<p>NAP son las siglas de Name, Address, Phone (nombre, dirección, teléfono). Google compara los datos de tu web con los de tu Google Business Profile y con los de directorios locales. Si hay inconsistencias (un teléfono diferente aquí, una dirección con error allá), tu posicionamiento local se resiente.</p>
<p>Revisa que el nombre, dirección y teléfono son idénticos en todos los sitios donde apareces.</p>

<h2>Paso 6: Añade schema LocalBusiness a tu web</h2>
<p>El schema markup es código invisible que le dice a Google exactamente qué tipo de negocio eres, dónde estás y qué haces. Implementar LocalBusiness schema en tu web es una señal técnica directa que mejora el posicionamiento local.</p>
<p>Si tu web está bien desarrollada, esto lo añade el programador en minutos. Si tienes WordPress, hay plugins que lo hacen automáticamente.</p>

<h2>Paso 7: Consigue menciones locales (citations)</h2>
<p>Aparece en directorios locales relevantes: Páginas Amarillas, Yelp, TripAdvisor (si aplica), directorios de tu sector, la Cámara de Comercio local, asociaciones empresariales. Cada mención con tu nombre, dirección y teléfono correctos refuerza tu presencia local ante Google.</p>

<h2>¿Cuánto tiempo tarda en funcionar?</h2>
<p>El SEO local no es inmediato. Los resultados típicos aparecen entre 2 y 6 meses después de implementar estas acciones. Pero una vez que estás bien posicionado, el tráfico orgánico es gratuito y consistente.</p>

<p>Si quieres que tu web esté lista para SEO local desde el primer día — con schema markup, estructura correcta, velocidad optimizada y páginas por ciudad si las necesitas — en <strong>Por 2 Duros</strong> lo incluimos en todos los proyectos sin coste adicional. <a href="/#contacto">Cuéntanos tu caso</a>.</p>`,
    publishedAt: new Date('2026-06-09'),
  },
]

async function main() {
  console.log('Insertando 5 artículos de blog...')
  for (const article of articles) {
    const post = await prisma.blogPost.upsert({
      where: { slug: article.slug },
      update: { ...article, published: true },
      create: { ...article, published: true },
    })
    console.log(`✅ ${post.title}`)
  }
  console.log('Listo.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
