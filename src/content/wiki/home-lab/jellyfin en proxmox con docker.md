---
title: Jellyfin en Proxmox con Docker
description: Jellyfin en Docker sobre Proxmox con discos separados y acceso desde Linux + GPU Intel N100
date: 2025-11-25
mod: 2025-11-25
published: true
tags: [docker, homelab, jellyfin, proxmox]
---

# Jellyfin en Proxmox con Docker

## 1️⃣ Preparación del servidor Proxmox

- Servidor con **Intel N100**
- Proxmox instalado en **nvme0n1**
- Discos adicionales: `sda` y `sdb`

### Ver discos

```bash
lsblk -f
```

---

## 2️⃣ Formateo de discos

```bash
# Limpiar discos
wipefs -a /dev/sda
sgdisk --zap-all /dev/sda
wipefs -a /dev/sdb
sgdisk --zap-all /dev/sdb

# Crear tabla GPT y partición
parted /dev/sda mklabel gpt
parted /dev/sda mkpart primary ext4 0% 100%
mkfs.ext4 /dev/sda1

parted /dev/sdb mklabel gpt
parted /dev/sdb mkpart primary ext4 0% 100%
mkfs.ext4 /dev/sdb1
```

- Crear puntos de montaje y montar manualmente:

```bash
mkdir -p /mnt/disk1 /mnt/disk2
mount /dev/sda1 /mnt/disk1
mount /dev/sdb1 /mnt/disk2
```

- Añadir a fstab para montaje automático:

```
/dev/sda1 /mnt/disk1 ext4 defaults 0 0
/dev/sdb1 /mnt/disk2 ext4 defaults 0 0
```

- Recargar fstab:

```bash
systemctl daemon-reload
mount -a
```

---

## 3️⃣ Configuración del contenedor LXC

- Contenedor Ubuntu/Debian
- Activar **nesting, keyctl, fuse**:

```bash
pct set <ID> -features nesting=1,keyctl=1,fuse=1
```

### Montar discos en el contenedor

```bash
nano /etc/pve/lxc/<ID>.conf
```

Añadir:

```
mp0: /mnt/disk1,mp=/media
mp1: /mnt/disk2,mp=/media2
```

---

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

## 4️⃣ Instalación de Docker y Docker Compose en LXC

```bash
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

```bash
sudo systemctl status docker
```

```bash
sudo systemctl start docker
```

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

---

## 6️⃣ Acceso a los discos desde Linux personal (SSHFS)

```bash
sudo apt install sshfs -y
mkdir -p ~/disk1 ~/disk2
sshfs usuario@192.168.0.22:/mnt/disk1 ~/disk1
sshfs usuario@192.168.0.22:/mnt/disk2 ~/disk2
```

- Desmontar:

```bash
fusermount -u ~/disk1
fusermount -u ~/disk2
```

---

## 7️⃣ Consideraciones finales

- `/media` → Disco 1 (por ejemplo, Películas)
- `/media2` → Disco 2 (por ejemplo, Series)
- GPU Intel N100 permite **transcodificación eficiente**
- Discos independientes: seguro si eliminas contenedor
- SSHFS garantiza acceso seguro desde Linux personal
