---
title: Configuración de Nginx Proxy Manager con Cloudflare (Certificados Wildcard)
description: Configura de forma sencilla subdominios con certificados con Nginx Proxy Manager y Cloudflare
date: 2026-03-26
mod: 2026-03-26
published: true
tags: [cloudflare, nginx, proxmox, tunnel, wireguard]
---

# Configuración de Nginx Proxy Manager con Cloudflare (Certificados Wildcard)

Esta guía asume que ya tienes un dominio en Cloudflare y NPM instalado (preferiblemente en otro contenedor LXC o Docker).

Si no tienes instalado NPM, puedes hacerlo vía [Proxmox VE Scripts](https://community-scripts.org/scripts/nginxproxymanager), simplemente con la instalación por defecto es suficiente.

## 1. Obtención del Token de API en Cloudflare

Para que NPM pueda renovar los certificados automáticamente sin abrir puertos adicionales (DNS Challenge), necesitamos un Token.

1. Entra en tu panel de [Cloudflare](https://www.google.com/search?q=https://dash.cloudflare.com/).
2. Ve a **Perfil de usuario** (icono arriba a la derecha) -> **Mis tokens de API**.
3. Haz clic en **Crear token** -> Usa la plantilla **"Editar zona DNS"**.
4. En **Permisos**, asegúrate de que diga: `Zona - DNS - Editar`.
5. En **Recursos de zona**, selecciona: `Incluir - Todas las zonas` (o tu dominio específico).
6. Copia el Token generado (solo se muestra una vez). **Guárdalo bien**.

## 2. Configuración del Certificado SSL "Wildcard" en NPM

Un certificado Wildcard (`*.tudominio.com`) te permite proteger todos tus subdominios con un solo certificado.

1. Entra en tu panel de **Nginx Proxy Manager** (puerto `81`).
2. Ve a la pestaña **Certificates** -> **Add Certificate** -> **Let's Encrypt via DNS**.
3. Configura lo siguiente:
    
    - **Domain Names:** Escribe `tudominio.com` (si también quieres tu root) y `*.tudominio.com` (para subdominios). as
    - **DNS Provider:** Selecciona `Cloudflare`.
    - **Credentials File Content:** Pega tu Token de Cloudflare donde dice `dns_cloudflare_api_token = TU_TOKEN_AQUI`.
4. Acepta los términos y dale a **Save**. Tardará un minuto en validar y generar el certificado.

![[f01ad42158b84b96a7cd9923aeb344c7_MD5.webp]]

## 3. Redirección de Subdominios (Proxy Hosts)

Ahora vamos a hacer que `vpn.tudominio.com` apunte al Dashboard de WireGuard que configuramos en la wiki de [[configurar vpn wireguard en proxmox]].

1. Ve a la pestaña **Hosts** -> **Proxy Hosts** -> **Add Proxy Host**.
2. **Details:**
    
    - **Domain Names:** `vpn.tudominio.com`
    - **Scheme:** `http` (ya que el LXC de WireGuard suele ir por HTTP internamente).
    - **Forward Hostname / IP:** La IP estática de tu LXC de WireGuard (ej: `192.168.0.60`).
    - **Forward Port:** `10086` (puerto del Dashboard).
    - Activa **Block Common Exploits** y **Websockets Support**.
3. **SSL:**
    - Selecciona el certificado que creamos en el paso anterior (`*.tudominio.com`).
    - Activa **Force SSL** y **HTTP/2 Support**.
4. **Save.**

## 4. Apuntar el DNS en Cloudflare

Para que internet sepa dónde está tu Nginx Proxy Manager:

1. En Cloudflare, ve a **DNS** -> **Records**.
2. Crea un registro tipo **A**:
    - **Name:** `*` para configurar todos los subdominios por defecto.
    - **Content:** Dirección privada local de `nginx`, en este caso `192.168.0.63`
    - **Proxy status:** Déjalo en DNS only (Cloudflare te forzará a ello).

![[b4c10d1b435c99b66a90f66347503268_MD5.webp]]

Ahora si accedemos a `vpn.tudominio.com`, deberíamos poder ver ya todo configurado. También si accedemos desde el móvil con el tunnel encendido podremos entrar (recuerda actualizar el archivo de configuración via QR o descargarlo).
