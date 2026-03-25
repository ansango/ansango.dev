---
title: Formateo de discos y montaje automático
description: descripcion
date: 2026-03-25
mod: 2026-03-25
published: false
tags: [tag]
---

# Formateo de discos y montaje automático

-  Ver discos

```bash
lsblk -f
```

```bash
# Limpiar discos
wipefs -a /dev/sda
sgdisk --zap-all /dev/sda

# Crear tabla GPT y partición
parted /dev/sda mklabel gpt
parted /dev/sda mkpart primary ext4 0% 100%
mkfs.ext4 /dev/sda1
```

- Crear puntos de montaje y montar manualmente:

```bash
mkdir -p /mnt/disk1
mount /dev/sda1 /mnt/disk1
```

- Añadir a fstab para montaje automático:

```
/dev/sda1 /mnt/disk1 ext4 defaults 0 0
```

- Recargar fstab:

```bash
systemctl daemon-reload
mount -a
```
