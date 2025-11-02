---
title: Automatizar Directus en Desarrollo
description: Automatiza la configuración de Directus con nuestro script en Bash. Configura Directus, verifica Node.js 18.x y ajusta SQLite fácilmente. Ideal para desarrolladores que quieren optimizar su flujo de trabajo.
date: 2024-09-18
mod: 2025-11-02
published: true
tags: [automation, bash, development, directus, node, scripting, sqlite]
---

# Automatizar Directus en Desarrollo

![[30ca72a9d8902b5b263fa8a93cfebc45_MD5.jpeg]]

He creado un script en `bash` para **automatizar la configuración** de una instancia de Directus enfocada en el desarrollo. Si trabajas con Directus y quieres simplificar tu flujo de trabajo, este script te puede ahorrar tiempo y esfuerzo.

## Principales Características 🎯

- **Instalación automática** de la versión más reciente de Directus.
- Verificación de compatibilidad con **Node.js 18.x**, evitando problemas de versión.
- Configuración automática de una base de datos **SQLite**, ideal para entornos de desarrollo rápidos.
- Creación de un **usuario administrador** y configuración de variables de entorno.
- Instalación de herramientas de desarrollo como **nodemon** y **concurrently**.
- Soporte para **gestionar extensiones** de Directus, lo que te permite crear y ejecutar extensiones fácilmente durante el desarrollo.

## ¿Cómo Funciona? 🛠

1. **Descarga** el script a tu máquina local.
2. Hazlo **ejecutable**:  

   ```bash
   chmod +x directus-instance-dev.sh
   ```

3. **Ejecuta el script**:  

   ```bash
   ./directus-instance-dev.sh
   ```

4. Sigue las instrucciones para configurar tu instancia (usuario administrador, nombre del proyecto, puerto, etc.), ¡y listo!

## ¿Por Qué Usarlo? 🎉

Este script se encarga de todas las tareas repetitivas de configuración para que puedas centrarte en **desarrollar** en lugar de ajustar configuraciones. Ya sea que estés comenzando con Directus o construyendo un proyecto más complejo con extensiones, te ofrece una solución automatizada y limpia.

## Personalización 🧩

El script es fácil de modificar para que puedas:

- Cambiar la configuración de la base de datos.
- Ajustar variables de entorno.
- Pre-instalar extensiones específicas de Directus.
- Optimizar los scripts de desarrollo.

👉 [**Descarga el script aquí**](https://github.com/ansango/directus-instance-dev)
