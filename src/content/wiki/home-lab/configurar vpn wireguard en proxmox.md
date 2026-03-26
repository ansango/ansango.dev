---
title: WireGuard en Proxmox (LXC + Dashboard)
description: Configura WireGuard en Proxmox y accede a tus servicios fuera de casa con un único tunel
date: 2026-03-26
mod: 2026-03-26
published: true
tags: [cloudflare, network, networking, proxmox, tailscale, tunnel, vpn, wireguard]
---

# WireGuard en Proxmox (LXC + Dashboard)

Esta guía detalla cómo desplegar un servidor VPN WireGuard en Proxmox utilizando contenedores LXC y una interfaz de gestión web. 

Con estos pasos podemos olvidarnos de configurar manualmente tuneles en Cloudflare y exponerlos a todo el internet (aunque hayamos configurado Access Control) o utilizar Tailscale.

## Instalación del contenedor LXC

El script de la comunidad automatiza la creación del contenedor y la instalación de las dependencias.

1. Ve a [Proxmox Helper Scripts - WireGuard](https://community-scripts.org/scripts/wireguard).
2. Copia el comando de instalación (suelen ser comandos `bash -c "$(wget …)"`).
3. En tu nodo de Proxmox, abre la **Shell** y pega el comando.
4. **Proceso de instalación:**
	- Selecciona "Yes" para crear un nuevo contenedor.
    - Usa la configuración por defecto o personaliza (ID, almacenamiento).
    - **Dashboard:** Durante el proceso, el script te preguntará: *¿Deseas instalar el WireGuard Dashboard?*. Selecciona **Sí**.

## Configuración Inicial del Dashboard

Una vez finalizado el script, se te proporcionará la dirección IP del contenedor y las credenciales por defecto.

1. Accede vía navegador a: `http://IP_DEL_CONTENEDOR:10086 (o el puerto indicado).
2. **Credenciales iniciales:** Generalmente `admin` / `admin`.
3. **Configuración de cuenta:** El sistema te pedirá crear un nuevo usuario administrador y una contraseña segura de inmediato.
4. (Opcional) Configura la autenticación de dos factores (MFA) si lo deseas.

![[6b129e8131282959cadf9902b5a8d361_MD5.webp]]

## Configuración de Red Crítica (IP Estática)

Para que el VPN sea estable y el router de tu operador sepa a dónde enviar el tráfico, el contenedor **debe** tener una IP fija.

1. En la interfaz de Proxmox, selecciona el contenedor de WireGuard.
2. Ve a **Network** (Red) -> selecciona la interfaz de red -> **Edit**.
3. Cambia de **IPv4/DHCP** a **Static**.
4. Asigna una IP (ej: `192.168.1.60/24`) y la puerta de enlace (Gateway) de tu router (ej: `192.168.0.1`).

![[7141dbeddcef54015345b8e7f2d56ef8_MD5.webp]]

## Apertura de Puertos en el Router (Port Forwarding)

Para conectar desde fuera de tu casa, debes abrir el puerto de WireGuard.

- **Puerto por defecto:** `51820`
- **Protocolo:** `UDP` (Muy importante: WireGuard no usa TCP).
- **Destino:** La IP estática que asignaste al contenedor en el paso anterior.

En mi caso se vería así en el router de Lowi

![[029c6ab9be655f4a748aa3ded4bf2756_MD5.webp]]

## 6. Creación de Clientes (Peers)

En lugar de editar cada cliente a mano, configuraremos el Dashboard para que use tu IP pública (o dominio) automáticamente.

1. En el menú lateral, ve a **Settings** y selecciona la pestaña **Peers Settings**.
2. Busca el campo **Peer Remote Endpoint**.
3. **Introduce aquí tu IP Pública** (ej: `1.111.111.111`) o tu dominio de **DuckDNS/DDNS**.
    - *Nota:* Como indica el aviso en naranja de tu captura, este cambio es global y se aplicará a todos los códigos QR y archivos de configuración que generes a partir de ahora.
4. Asegúrate de que los otros valores sean correctos:
    - **DNS:** `1.1.1.1` (o el de tu preferencia).
    - **Endpoint Allowed IPs:** `0.0.0.0/0` (si quieres que **todo** el tráfico del cliente pase por la VPN).
5. Ahora ve a la sección **Clients**, crea un nuevo Peer y verás que el archivo de configuración ya viene listo para conectar desde el exterior sin tocar nada más.

![[b8072d4815b53bc9f293926dcdbbc246_MD5.webp]]

![[5f4c1cce40f8b49af10dda9e3675ad6c_MD5.webp]]

## 7. Verificación y Diagnóstico

- **Ping:** Una vez conectado, intenta hacer ping a la IP interna de la VPN o a la IP del servidor Proxmox.
- **Estado:** El Dashboard mostrará en tiempo real si el cliente está transfiriendo datos (Active Transfer).

Para probar en Android por ejemplo puedes utilizar la aplicación oficial de [WireGuard APK](https://download.wireguard.com/android-client/com.wireguard.android-1.0.20260315.apk), yo particularmente uso [WG Tunnel](https://github.com/wgtunnel)
