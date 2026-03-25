---
title: Jellyfin en Proxmox con Docker
description: Jellyfin en Docker sobre Proxmox + GPU Intel N100
date: 2025-11-25
mod: 2026-03-25
published: true
tags: [docker, homelab, jellyfin, proxmox]
---

# Jellyfin en Proxmox con Docker

## Configuración del contenedor LXC

- Contenedor Ubuntu/Debian
- Activar **nesting, keyctl, fuse**:

### Configuración de la GPU Intel N100

1. Pasar la GPU al contenedor:

```
lxc.cgroup2.devices.allow: c 226:* rwm
lxc.mount.entry: /dev/dri dev/dri none bind,optional,create=dir
```

1. Reiniciar contenedor:

```bash
pct restart <ID>
```

1. Verificar dentro del contenedor:

```bash
pct enter <ID>
ls /dev/dri
```

Deberías ver:

```
card0  renderD128
```

Esto permite a Jellyfin usar **QuickSync / VAAPI** para transcodificación.

---

## 5️⃣ Docker Compose para Jellyfin

Crear carpetas:

```bash
mkdir -p /opt/jellyfin/config /opt/jellyfin/cache
cd /opt/jellyfin
```

`docker-compose.yml` final:

```yaml
services:
  jellyfin:
    image: jellyfin/jellyfin:latest
    container_name: jellyfin
    ports:
      - "8096:8096"
    volumes:
      - /opt/jellyfin/config:/config
      - /opt/jellyfin/cache:/cache
      - /media:/media       # Disco 1
      - /media2:/media2     # Disco 2
    devices:
      - /dev/dri:/dev/dri   # GPU Intel N100 para QuickSync/VAAPI
    restart: unless-stopped
```

Levantar Jellyfin:

```bash
docker-compose up -d
```

Acceso: `http://IP_DEL_CONTENEDOR:8096`
