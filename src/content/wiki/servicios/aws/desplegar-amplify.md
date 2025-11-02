---
title: Desplegar Next.js 14 en Amplify
description: "Desplegar Next.js 14 en AWS Amplify: configuración GitHub, archivo amplify.yml, SSG con output export y redirecciones 404"
date: 2025-07-30
mod: 2025-10-25
published: true
tags: [amplify, aws, nextjs]
---

# Desplegar Next.js 14 en Amplify

## Configuración inicial

En el panel de control de AWS, selecciona la barra de búsqueda y busca **Amplify**.

Desplázate hacia abajo, bajo **Amplify Hosting**, y selecciona **Empezar** (o **Get started**). 

**Amplify** te pedirá que elijas dónde se encuentra el código fuente. Aquí seleccionamos **GitHub**.

Si es la primera vez que usas el servicio de **Amplify**, te redirigirá a **GitHub** para solicitar permiso de acceso a tu código fuente. Aquí, selecciona la **Organización** o tu **cuenta personal** que contenga el código fuente que subiste a GitHub.

Podemos darle permiso a **Amplify** para acceder a múltiples repositorios o solo a uno. Aquí seleccionamos **Todos los repositorios**.

## Configuración de depliegue

Después de configurar **Amplify** con GitHub, seleccionaremos el repositorio que queremos construir en **Repositorios actualizados recientemente** y haremos clic en **Siguiente** para continuar.

Selecciona **Editar** para modificar el archivo **amplify.yml**.

### Static Site configuración

Configuramos el archivo **amplify.yml** de la siguiente manera:

```yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install -g pnpm
        - pnpm install
    build:
      commands:
        - pnpm build
  artifacts:
    baseDirectory: out
    files:
      - '**/*'
  cache:
    paths:
      - 'node_modules/**/*'
      - '.next/cache/**/*'
```

Hemos completado la compilación correcta de la aplicación SSG. Esto se debe a que en **package.json** lo configuré de la siguiente manera.

```json
"scripts": {
    "dev": "next dev",
    "build": "next build && next export",
    "start": "next start",
    "format": "prettier -c --write \"*/**\"",
    "lint": "eslint . --ext .ts,.tsx,",
    "lint:fix": "eslint . --ext .ts,.tsx, --fix"
  },
```

## Prueba final

**Next.js 14** se construirá incorrectamente porque **el comando "next export" ha sido eliminado en favor de "output: export" en next.config.js**. Por favor, lee el registro de la etapa de construcción para ver la razón. Este es un error de construcción de **Next.js 14**. Para solucionarlo, corregiremos el archivo **package.json** según la configuración de construcción estándar de **Next.js 14**.

En la **carpeta** `blog` de tu ordenador, editamos 2 archivos: **package.json** y **next.config.mjs**.

```json
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "format": "prettier -c --write \"*/**\"",
    "lint": "eslint . --ext .ts,.tsx,",
    "lint:fix": "eslint . --ext .ts,.tsx, --fix"
  },
```

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

Comprueba las diferencias después de modificar los archivos con el comando `git diff`. Luego, crea un nuevo commit y sube el código al repositorio. **Amplify** activará una nueva compilación de CI/CD para construir y desplegar el código.

```
git diff 
git add . 
git commit -m "fixed(config): SSG correct build"
git push -f origin main
```

En la barra lateral, selecciona **Rewrites and redirect** (Reescrituras y redirecciones). Luego, selecciona **Editar**. En la sección **Type** (Tipo), elige **404(Redirect)** y en la sección **Target address** (Dirección de destino), apunta al archivo **404.html**.

**Amplify** ha desplegado la aplicación SSG en Internet.
