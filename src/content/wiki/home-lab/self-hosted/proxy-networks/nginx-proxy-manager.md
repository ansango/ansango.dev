---
title: Nginx Proxy Manager
description: description
date: 2024-12-17
mod: 2025-10-25
published: true
tags: [containers, docker, load-balancer, networking, reverse-proxy, self-hosted, sysadmin]
---

# Nginx Proxy Manager

Nginx Proxy Manager es una herramienta de gestión de proxy inverso basada en Nginx con una interfaz de usuario web limpia y eficiente. Permite a los usuarios crear y gestionar hosts de proxy, configurar SSL y personalizar la configuración de Nginx sin necesidad de conocimientos avanzados en la línea de comandos.

## Funcionalidades clave

- **Interfaz de usuario web:** Una interfaz gráfica intuitiva para gestionar hosts, certificados SSL y configuraciones avanzadas de Nginx.
- **SSL/TLS automático:** Integración con Let's Encrypt para obtener y renovar certificados SSL de forma gratuita y automática.
- **Gestión de hosts:** Permite redirigir el tráfico a diferentes servidores y puertos basándose en el nombre de dominio.
- **Control de acceso:** Configuración de listas de control de acceso (ACL) para restringir el acceso a los servicios.
- **Configuración personalizada de Nginx:** Permite a los usuarios avanzados añadir configuraciones personalizadas de Nginx.
- **Métricas y monitoreo:** Proporciona registros de auditoría y notificaciones para un seguimiento detallado.

## Ventajas

- **Facilidad de uso:** Simplifica enormemente la configuración de un proxy inverso, incluso para usuarios sin experiencia en Nginx.
- **Gestión centralizada:** Permite gestionar todos los hosts de proxy y certificados SSL desde una única interfaz.
- **Seguridad mejorada:** Facilita la implementación de SSL/TLS, mejorando la seguridad de los servicios expuestos.
- **Flexibilidad:** Ofrece opciones de configuración tanto para usuarios principiantes como avanzados.
- **Código abierto:** Es un proyecto de código abierto con una comunidad activa que contribuye a su desarrollo.

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/NginxProxyManager/nginx-proxy-manager" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://repository-images.githubusercontent.com/133944969/25693380-5149-11ea-8230-3547a5e98830); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - NginxProxyManager/nginx-proxy-manager</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Expose your services easily and securely. Contribute to NginxProxyManager/nginx-proxy-manager development by creating an account on GitHub.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/NginxProxyManager/nginx-proxy-manager</p></div></a></div>

## Docker compose

```yml
services:
  nginx-proxy-manager:
    image: 'jc21/nginx-proxy-manager:latest'
    container_name: 'nginx-proxy-manager'
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```

- El puerto `80` se utiliza para el tráfico HTTP.
- El puerto `443` se utiliza para el tráfico HTTPS.
- El puerto `81` es para acceder a la interfaz de administración de Nginx Proxy Manager.
- El volumen `./data` almacena la configuración de los hosts y usuarios.
- El volumen `./letsencrypt` almacena los certificados SSL generados por Let's Encrypt.

## Como utilizar Nginx Proxy Manager con un dominio de Cloudflare

Para configurar Nginx Proxy Manager con un dominio de Cloudflare y obtener certificados SSL automáticamente, sigue estos pasos:

1. **Generar un Token de API en Cloudflare:**
    - Ve a tu perfil de Cloudflare, selecciona la pestaña "API Tokens" y crea un nuevo token.
    - El token necesita el permiso `Zone:DNS:Edit` para permitir que Nginx Proxy Manager realice los desafíos de DNS necesarios para la validación del certificado SSL.

2. **Configurar el certificado SSL en Nginx Proxy Manager:**
    - En la interfaz de Nginx Proxy Manager, ve a la sección de "SSL Certificates" y añade un nuevo certificado.
    - Introduce tu nombre de dominio (puedes incluir un comodín como `*.tu-dominio.com`).
    - Activa la opción "Use a DNS Challenge".

3. **Proporcionar las credenciales de Cloudflare:**
    - Selecciona "Cloudflare" como el proveedor de DNS.
    - Pega el Token de API que generaste en el campo de credenciales.
    - Guarda la configuración para completar el proceso.
