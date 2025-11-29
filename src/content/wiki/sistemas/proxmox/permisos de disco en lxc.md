---
title: Permisos de Disco para LXC + Docker en Proxmox
description: Permitir que un contenedor LXC no privilegiado que ejecuta Docker pueda leer y escribir en un disco físico montado en el host Proxmox.
date: 2025-11-25
mod: 2025-11-25
published: true
tags: [docker, proxmox, sysadmin, users]
---

# Permisos de Disco para LXC + Docker en Proxmox

## 📌 Objetivo

Permitir que un contenedor **LXC no privilegiado** que ejecuta **Docker** pueda **leer y escribir** en un disco físico montado en el host Proxmox.

---

## 1️⃣ Montar el disco en el host

Ejemplo:

```bash
mkdir /mnt/disk2
mount /dev/sdX1 /mnt/disk2
```

---

## 2️⃣ Agregar el disco al LXC

Editar `/etc/pve/lxc/<ID>.conf`:

```
mp0: /mnt/disk2,mp=/media
```

Esto hace que `/mnt/disk2` (host) aparezca como `/media` dentro del LXC.

---

## 3️⃣ Entender el problema de permisos

Los contenedores **no privilegiados** usan un mapeo de UIDs/GIDs:

- Dentro del contenedor: `root = 0`
- En el host: ese root ES en realidad `100000` (o el inicio del rango en `/etc/subuid` y `/etc/subgid`)
    

Por eso no pueden escribir en el disco aunque "sean root".

---

## 4️⃣ Ver el rango de UID/GID usado por LXC

En el host:

```bash
cat /etc/subuid
cat /etc/subgid
```

Ejemplo típico:

```
root:100000:65536
```

Esto significa:

- UID 0 del contenedor → UID 100000 en el host
    

---

## 5️⃣ Dar permisos al contenedor

En el host:

```bash
chown -R 100000:100000 /mnt/disk2
chmod -R 775 /mnt/disk2
```

Ahora el contenedor tiene permisos de escritura en `/media`.

---

## 6️⃣ Usar el disco desde Docker dentro del LXC

Ejemplo:

```bash
docker run -v /media:/data …
```

Los contenedores Docker ya pueden escribir sin problemas.

---

## 🟩 Resultado

✔ LXC no privilegiado accede al disco  
✔ Docker dentro del LXC puede escribir  
✔ Seguridad del contenedor no se compromete (a diferencia de usar un LXC privilegiado)
