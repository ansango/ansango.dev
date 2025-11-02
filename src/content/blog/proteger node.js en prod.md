---
title: Proteger Node.js en producción
description: Consejos y buenas prácticas para proteger una aplicación Node.js en producción y reducir la superficie de ataque de tu aplicación.
date: 2024-06-01
mod: 2025-11-02
published: true
tags: [bcrypt, best-practices, express, helmet, https, linters, nodejs, npm, production, rate-limit, security, validation]
---

# Proteger Node.js en producción

![[fb61978e31261d5652410a0bd6f17950_MD5.jpeg]]

## Nada de amigos con "privilegios"

Ejecutar Node.js o cualquier servidor web como usuario root representa un riesgo significativo de seguridad. Un solo exploit podría otorgar a los atacantes control total sobre el servidor. 

Crear un usuario dedicado para su aplicación Node.js restringe el daño potencial.

```shell
adduser --disabled-login nodejsUser
```

Ejemplo de Dockerfile para una aplicación Node.js

```yaml
FROM node:18-alpine
RUN addgroup adx && adduser -S -G adx adx
WORKDIR /usr/src/app/backend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
USER adx
EXPOSE 5000
CMD ["npm", "start"]
```

Cambia a este usuario antes de iniciar su aplicación para asegurarte de que se ejecute con permisos limitados.

## Actualiza todas tus librerías y dependencias de npm

Las dependencias en el ecosistema de Node.js pueden ser un arma de doble filo. Aunque aceleran significativamente el desarrollo, también pueden introducir vulnerabilidades.

Use `npm audit` para un escaneo rápido de vulnerabilidades y solucione problemas automáticamente con `npm audit fix`. 

```shell
npm update && npm audit fix
```

Podríamos usar Snyk que escanea en busca de vulnerabilidades y proporcionando soluciones o alternativas.

```shell
npm install -g snyk
snyk auth
snyk test
```

> Podemos automatizar este proceso en una pipeline CI/CD.

## Personalización de Nombres de Cookies: Ocultando Detalles de la Tecnología

Los nombres de cookies predeterminados pueden revelar las tecnologías de tu aplicación, facilitando a los atacantes ajustar sus exploits.

Cambia los nombres de las cookies de sesión predeterminadas a algo único y no relacionado con la tecnología utilizada.

```js
const express = require('express');
const session = require('express-session');
app.use(session({
  // establecer un nombre personalizado para la cookie de sesión
  name: 'siteSessionId',
  // una clave secreta segura para el cifrado de sesiones
  secret: 'complex_secret_key',
  // Configuraciones adicionales de sesión…
}));
```

## Ponte el casco, usa Helmet para securizar tus cabeceras HTTP

Las cabeceras HTTP seguras son cruciales para proteger su aplicación de diversos tipos de ataques como XSS, clickjacking y otras inyecciones de sitios cruzados.

Helmet.js es un middleware que configura encabezados HTTP seguros automáticamente.

El middleware `helmet()` elimina automáticamente encabezados inseguros y añade nuevos, incluyendo `X-XSS-Protection`, `X-Content-Type-Options`, `Strict-Transport-Security` y `X-Frame-Options`. Super easy de aplicar:

```js
const helmet = require('helmet');

app.use(helmet({
  // Configuración personalizada de helmet aquí
}));
```

## Controla las requests

El control de las peticiones es esencial para proteger su aplicación contra ataques de fuerza bruta y DDoS, limitando la cantidad de solicitudes que un usuario puede hacer en un periodo de tiempo determinado.

Utiliza librerías como `express-rate-limit` para una configuración sencilla de limitación de tasas.

```js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limita cada IP a 100 solicitudes por windowMs
});

app.use(limiter);
```

## Algo más que passwords. Implementación de Políticas de Autenticación Fuertes

Los mecanismos de autenticación son frecuentemente objetivos de los atacantes. Implementar métodos de autenticación robustos es crucial para asegurar las cuentas de los usuarios.

Puedes usar librerías como bcrypt, que proporciona un método seguro para almacenar contraseñas. Establecer requisitos de complejidad de contraseñas y utilizar la autenticación multifactor (MFA) añade otra capa de seguridad.

Educa a tus usuarios sobre la importancia de contraseñas fuertes.

```js
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Hashing de una contraseña
bcrypt.hash('userPassword', saltRounds, function(err, hash) {
  // Almacenar hash en su base de datos de contraseñas.
});
```

## Controla esos logs en producción y evitando la fuga de información

Los mensajes de error verbosos pueden proporcionar a los atacantes información sobre la arquitectura de su aplicación, facilitando ataques dirigidos.

Asegúrese de que los entornos de producción no expongan trazas detalladas a los usuarios. Reserva esos registros detallados para el server side manteniendo los mensajes orientados al usuario genéricos.

```js
app.use((err, req, res, next) => {
  res.status(500).json({ error: "Internal Server Error" });
});
```

## Con un ojo puesto

Monitorea tu aplicación. Integra herramientas de Monitoreo del Rendimiento de Aplicaciones para rastrear el comportamiento de la aplicación e identificar anomalías indicativas de brechas de seguridad.

```js
const apmTool = require('apm-tool-of-choice');

apmTool.start({
  // Opciones de configuración
});
```

<div class="obsidian-meta-links" style="position: relative;"><a href="https://blog.logrocket.com/top-tools-node-js-monitoring/" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://blog.logrocket.com/wp-content/uploads/2023/03/top-tools-node.js-monitoring-nocdn.png); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">Top 6 tools for Node.js monitoring - LogRocket Blog</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Learn about top tools for Node.js monitoring. Identify and address issues faster for enhanced reliability and improved UX.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://blog.logrocket.com/top-tools-node-js-monitoring/</p></div></a></div>

## Solo HTTPS

HTTPS asegura que los datos entre su servidor y el usuario estén encriptados. Redirige todo el tráfico HTTP a HTTPS y asegúrate de que las cookies se configuren con el atributo `Secure`.

Puedes usar herramientas como como **Let's Encrypt** para obtener certificados SSL/TLS gratuitos. 

```js
app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});
```

> [[securizar nginx con let's encrypt]]

## Validación de Entrada del Usuario: Protegiéndose contra Inyecciones

Validar la entrada del usuario es fundamental para prevenir ataques de inyección, como la inyección SQL, XSS, y más.

Puedes usar librerías clásicas como `express-validator`, u otras más modernas como `zod`. Pero sobre todos define reglas estrictas basadas en el formato esperado de los datos.

```js
const { body, validationResult } = require('express-validator');

app.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Proceder con la lógica de registro
});
```

Puedes ver algunas librerías como:

<div class="obsidian-meta-links" style="position: relative;"><a href="https://vinejs.dev" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://vinejs.dev/vine_og_image.jpeg); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">Introduction</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">VineJS is a form data validation library for Node.js. You may use it to validate the HTTP request body in your backend applications.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://vinejs.dev</p></div></a></div>

<div class="obsidian-meta-links" style="position: relative;"><a href="https://joi.dev/" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(undefined); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">joi.dev</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">The most powerful schema description language and data validator for JavaScript.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://joi.dev/</p></div></a></div>

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/colinhacks/zod" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/1cac1150838995e1f7d1643c00eee51a5d884f2054f995c9d3225b07b0eddb39/colinhacks/zod); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">TypeScript-first schema validation with static type inference</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">TypeScript-first schema validation with static type inference</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/colinhacks/zod</p></div></a></div>

## Aprovechando Linters de Seguridad

Usa herramientas para detectar automáticamente riesgos de seguridad en tu código.

1. Usa **eslint**: combinado con el `eslint-plugin-security`, ofrece un enfoque centrado en identificar riesgos de seguridad en el código Node.js.
2. Ejecuta el linter para encontrar problemas de seguridad y corregirlos antes de que se conviertan en vulnerabilidades.
3. Incorpora el linting en tus desarrollos para detectar y corregir problemas rápidamente.

```shell
npm install eslint eslint-plugin-security --save-dev
```

```json
{
  "extends": ["eslint:recommended", "plugin:security/recommended"],
  "plugins": ["security"]
}
```

```shell
npx eslint .
```

## Conclusiones

Proteger una aplicación Node.js en producción es un proceso continuo. La seguridad no es un estado, sino un proceso. 

Mantén tus dependencias actualizadas, implementa políticas de autenticación robustas, controla las entradas de los usuarios y monitorea tu aplicación para detectar anomalías.

Con estas prácticas, puedes reducir significativamente la superficie de ataque de tu aplicación y protegerla contra una amplia gama de amenazas.
