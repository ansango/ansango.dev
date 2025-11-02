---
title: Buenas prácticas en el desarrollo con IA
description: Una pequeña guía y repaso sobre cómo utilizar correctamente la ia generativa en el desarrollo de software
date: 2025-10-25
mod: 2025-11-02
published: true
tags: [code, ia, ia-engineering, ide, programming]
---

# Buenas prácticas en el desarrollo con IA

![[b6443e6f224752aaa3ac468ae891bf6b_MD5.jpg]]

La IA generativa ~~está cambiando la forma en la que programamos~~, está cambiando la industria del software y algunas otras digitales. No tengo una opinión muy negativa de esta herramienta/tecnología, pero estamos siendo conducidos a la hipérbole maximizando unas bondades y necesidades que no son reales ni necesitamos. Separarse de las masas y el ruido, para ver con claridad qué nos aporta es en este momento una necesidad. He recogido algunas de las prácticas que nos ayudarán a utilizar mejor esta tecnología y sobre todo a ser conscientes de lo que hacemos con ella.

---

Hace poco tuve la oportunidad realizar un webinar en [innusual](https://innusual.tech), sobre herramientas, curva de aprendizaje y buenas prácticas en el desarrollo de software con ia generativa. Y bueno si bien tenía alguna "vaga idea", acerca del conglomerado de productos que existen en el mercado, preparar esta charla me hizo adentrarme más en él y probar una tonelada de herramientas, obviamente no en profundidad pero si como para generarme una idea global de que existen demasiadas herramientas para tan poco tiempo disponible.

Hace 2 o 3 años eran los frameworks y herramientas del ecosistema de Javascript los que estaban en la ola de bombardeo constante. Hoy son los IDEs, los agentes, los LLMs, el vibe coding, App Builders, AI Platform y demás parafernalia.

Ante tanto ruido y "vibras", no está demás tomar ~~algunas precauciones~~ un DESCANSO! Y protección 😊

## Prompts, la única ui hacia los LLMs

La calidad de lo que obtienes depende de lo que uno pide. Un prompt vago como "hazme una función" te dará resultados genéricos. Si somos específicos (nombres de archivos, frameworks, restricciones), la IA "entenderá" mejor. Haz prompts claros, divide tareas grandes y nunca pongas *secrets* (tokens, contraseñas). **Un ejemplo sería algo así:**

```markdown
"Genera tests unitarios en Vitest, para la función {{}}. Cubre casos límite: inputs nulos, valores extremos, errores esperados."
```

Aprovechar aquellos comandos que funcionan o que te dan buenos resultados la mayor parte del tiempo es una buena estrategia. Por lo que tener un repositorio a nivel personal o incluso corporativo como un recurso más es imprescindible. Tener 10-15 plantillas para testing, refactor, revisión de seguridad, etc., puede ser de gran utilidad aunque nunca es infalible.

Normalmente utilizo los atajos del editor porque sobre todo suelo documentar y en casi todos es el mismo atajo ```/doc```, pero además de los shortcuts, y las preguntas rápidas, cuando necesito hacer algo más especifico o largo utilizo el cuadro de diálogo.

Así a modo de checklist, el must de un buen ```prompt``` puede ser algo como esto:

- Especificidad (archivos, funciones, frameworks)
- División de tareas grandes
- Contexto y ejemplos
- Explicar restricciones
- Nunca pongas *secrets*
- Iterar y documentar y validar (repeat)

> Recuerda aquí el que conduces eres tú, no puedes echarle la culpa a tu copiloto

## Itinerario para no tropezar y repetir lo que no deberíamos hacer

La primera cosa que suelo hacer cuando una herramienta escribe código, es revisarlo, primero con actitud curiosa, a veces aprendo algo, patrones o tricks que no había visto, o incluso formas de organizar que pueden ser interesantes. Pero tras esos primeros momentos si te huele a quemado, entonces es ahí. El código generado no es automáticamente correcto, ni siempre funciona por muy buena pinta que tenga. Antes o después tendrás que entender que estás haciendo con o sin ia.

Antes de subir cualquier cosa o desplegarla, procura:

- Revisar el diff manualmente
- Ejecutar todos los tests
- Usar linters y herramientas de seguridad (ESLint, SonarQube, Snyk)
- Verificar que cumple los requisitos de negocio

Y sobre todo aquello que deberíamos evitar y que pueden ser consideraros como **anti-patrones**

- Prompts vagos ("hazme una función")
- Copiar y pegar código sin revisar
- Dejar que la IA decida arquitectura del proyecto
- No auditar por seguridad
- Merge sin tests 

## Trazabilidad, auditoría y tratamiento de datos

El siguiente punto nos ayudará a ver como revertir cuando sucede el desastre. Cuando todo estalla en producción o se rompe el entorno es importante tener buena trazabilidad. Usa las herramientas necesarias para ello. Guarda el prompt en la PR o en el commit, ejecuta todos los tests, documenta y ten diseñado algún sistema de rollback que te salve del apuro, no es ideal que se den estas situaciones pero si están prevenidas es más fácil y rápido ponerles remedio. 

Ya hemos hablado del los *secrets*, pero tampoco deberíamos de enviar, datos de clientes o información sensible. Si trabajas con datos críticos, considera agentes on-premise.

## Productividad vs aprendizaje

Se dice que la IA acelera, y sí, acelera en algunas tareas, como la primera búsqueda, el brainstorming, agrupar y cribar información, documentar, escribir algunas baterías de test bien planteadas, y seguramente algún post sintético en Linkedin. Pero recuerda que todo lo que dejas de hacer y/o practicar se atrofia y se olvida.

Llegados a este punto puede parecer trivial aprender a programar o sistemas o cualquier ámbito que pueda automatizarse medianamente, pero la realidad es que no, aprender habilidades aunque puedan automatizarse nos capacita para entender qué sucede y este propósito nos ayuda a poder mantener y crear nuevas soluciones, que la IA no puede crear porque no existen en su dataset (solo puede alucinarlas). 

La IA acelera, pero no debe reemplazar el aprendizaje. Haz pair programming, rota tareas y documenta lo que funciona. Un equipo que solo acepta código generado se atrofia.

¿Cuándo es el momento de hacer un descanso de la IA?

- 🚩 Bugs frecuentes en producción por código IA
- 🚩 Nadie entiende los cambios generados
- 🚩 Deuda técnica y regresiones aumentan
- 🚩 Fugas de seguridad

Espero que todas estas buenas prácticas y sugerencias te ayuden en tu camino. Actualmente sigo programando tanto o más que antes, la única diferencia de usar agentes, tabulaciones y chatbots es que accedo a más información y puedo capacitarme en otras cosas, pero sigo con el mismo interés sobre saber como funcionan las cosas. Este sin duda es el último y mejor consejo que puedo darte.

Espero que te haya gustado el artículo ❤️
