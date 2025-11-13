---
title: Configurar Cloudflare tunnels
description: Guía rápida sobre como configurar tunnels en Cloudflare
date: 2025-11-13
mod: 2025-11-13
published: true
tags: [cloudflare, tunnel, web]
---

# Configurar Cloudflare tunnels

Esta guía rápida muestra cómo configurar túneles Cloudflared con un solo comando en el espacio de usuario. Esto te da una forma segura de acceder a tus aplicaciones web desde cualquier lugar utilizando tu propio dominio sin necesidad de configuración de red.

## Prerequisitos

- Una cuenta gratuita de Cloudflare con un nombre de dominio registrado en Cloudflare
- Un token de túnel de Cloudflare desde su panel de Zero Trust
- Acceso a un entorno Linux en ejecución con permisos de usuario

## Configuración

Aquí deberás acceder en `Network/Tunnels` y crear un tunnel seleccionando la opción de *clodflared*, dale un nombre a tu aplicación y deberían de aparecerte los comandos necesarios para instalar *cloudlared* (en tu maquina remota) en el caso de que no lo tengas instalado.

Debería ser algo así:

```bash
# Add cloudflare gpg key
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-public-v2.gpg | sudo tee /usr/share/keyrings/cloudflare-public-v2.gpg >/dev/null

# Add this repo to your apt repositories
echo 'deb [signed-by=/usr/share/keyrings/cloudflare-public-v2.gpg] https://pkg.cloudflare.com/cloudflared any main' | sudo tee /etc/apt/sources.list.d/cloudflared.list

# install cloudflared
sudo apt-get update && sudo apt-get install cloudflared
```

Después de instalarlo ejecuta

```bash
# el token lo autogenera cloduflare
sudo cloudflared service install eyJhIjoiYTcx... 
```

Cuando le des a siguiente te permitirá utilizar un dominio que tengas asociado, o un subdominio. Además deberás apuntar el tipo de servicio y url que quedará expuesto al mundo exterior.

Et voilá, ya estaría todo, Cloudflare se encarga del SSL. Ya tendríamos acceso a nuestra aplicación, servicio o whatever sin abrir puerto ni exponer nada más.
