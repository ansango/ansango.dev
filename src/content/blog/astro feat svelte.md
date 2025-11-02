---
title: Astro feat Svelte
description: Por qué combinar Astro con Svelte y TanStack Query es una decisión inteligente frente a SvelteKit y, sobre todo, Next.js.
date: 2025-10-19
mod: 2025-11-02
published: true
tags: [astro, static-sites, svelte, tanstack, web-dev]
---

# Astro feat Svelte

![[95cd6581849e3db8349d4eaba7716396_MD5.jpg]]

¿Por qué últimamente me gusta tanto trabajar con Astro, y Svelte y TanStack Query? No es solo por moda ni por seguir la última tendencia (seguramente la moda en este momento es *vibe-codear* todo con agentes). No he realizado tantisimos proyectos profesionales con este stack, sobre todo porque en la industria no hay tanto empleo para **Svelte**. Pero si es cierto que fusionar el rendimiento de Astro y Svelte, además de la suave curva de aprendizaje (para desarrolladores *pre-ia*) hacen que crear prototipos sea una experiencia gratificante.

Aún no he probado contextos con aplicaciones complejas, pero el diseño de arquitectura en islas, hace que sea muy sencillo librarse de todo el bundle de js innecesario. Astro te da justo eso: páginas estáticas que se sirven últra rápido y, si quieres algo dinámico, puedes añadir componentes Svelte en los puntos clave. Cero Javascript por defecto.

¿Qué me encanta de Svelte? Es cierto que la simplicidad, el rendimiento y una sintaxis clara hacen que Svelte se haya convertido en mi framework favorito. La parte que *"menos"* me encanta es que de base haya que utilizarlo en con **Kit**. SvelteKit me gusta, pero acostumbrado al ecosistema de React, me gusta tener granularidad y poder elegir algunas alternativas o piezas para experimentar (obviamente en producción nunca jamás de los jamases haría esto, entonces sí, parece innegable que **Kit**, es la opción correcta). Es en estos momentos, cuando quieres simplemente hacer una web estatica con el minimo js posible, cuando estás dos herramientas hacen un match alucinante.

¿Y los datos? Pues bueno, en Astro, easy peasy, SSG con Astro y ciao, pero ¿qué hay de las partes que hidratamos en cliente? ¿De esas partes que necesitan interactividad o revalizadción de datos? Bueno sin liarnos la manta a la cabeza, Tanstack Query ya está adaptado a Svelte 5, así que why not? Sencillo rápido y si vienes de React (o si lo has usado en Vue) es casi lo mismo. 

¿Por qué no usar SvelteKit o Next.js? No es que sean malos, pero a veces son como llevar un camión para hacer la compra del día. SvelteKit está genial si tu web es una app grande, con rutas y SSR, pero si solo quieres un sitio rápido con algunas zonas interactivas, Astro te ahorra tiempo y complicaciones. 

Next.js… antes de la versión 13 me encantaba, pero a partir de aquí se volvio inestable, cambió la api (que no está mal el enfoque ojo), y empezó a comerse la ram de mis ordenadores (me pasaba en todos los equipos), un auténtico rollazo. Por no hablar de desplegarlo fuera de Vercel, que aunque por ejemplo en Amplify se puede desplegar sin muchas complicaciones, en otros entornos, el hecho de ser isomórfico (y estar muy orientado al edge) hace que aumente la curva. 

Al final lo que queremos es divertirnos construyendo, (en el trabajo ir rápido y seguro), y creo que Next.js y Vercel se han alejado muchísimo de esto (también React, pero esto da para otro artículo).

En mi experiencia, para blogs, microsites, landings o dashboards ligeros, Astro + Svelte + TanStack Query es una receta que funciona. El SEO wins, perfomance de 100%, y experiencia de desarrollo que te dan ganas de picar código a 24/7.

¿Un consejo? Prerenderiza todo lo que puedas, usa TanStack Query para los datos que sí cambian y mide siempre con Lighthouse. Así sabes que no te has pasado de listo y que tu web sigue volando.

Happy no-vibe coding!  
