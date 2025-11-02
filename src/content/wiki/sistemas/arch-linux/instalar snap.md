---
title: Instalar Snap
description: "Instalar Snap en Arch Linux: clonar repositorio snapd, compilar con makepkg, habilitar servicios y configuración PATH"
date: 2024-05-26
mod: 2025-10-25
published: true
tags: [arch-linux, linux, snap]
---

# Instalar Snap

Clonamos el repositorio de `snapd` y lo instalamos.

```bash
git clone https://aur.archlinux.org/snapd.git
```

```bash
cd snapd
```

```bash
makepkg -si
```

Habilitamos el servicio de `snapd`

```bash
sudo systemctl enable --now snapd.socket
```

Comprobamos que el servicio está activo

```bash
sudo systemctl status snapd
```

Añadimos la ruta de `snap` a nuestro `PATH`

```bash
sudo ln -s /var/lib/snapd/snap /snap
```
