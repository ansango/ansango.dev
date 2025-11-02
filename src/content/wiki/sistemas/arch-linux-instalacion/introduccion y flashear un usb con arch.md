---
title: Introducción y flashear un usb con arch
description: "Flashear USB con Arch Linux: descarga ISO, comandos dd, Balena Etcher y preparación para instalación"
date: 2024-05-30
mod: 2025-10-25
published: true
tags: [arch-linux, balena-etcher, linux, terminal, tools, usb]
---

# Introducción y flashear un usb con arch

## Introducción

Antes de nada, recuerda tener una copia de tus dotfiles, o salvar los que sean más importantes. 

```shell
git clone https://github.com/ansango/dotfiles.git
```

Este es el índice de pasos a seguir para conseguir una instalación limpia de Arch Linux, con el mínimo de herramientas que normalmente suelo utilizar.

En el repositorio anterior también vienen uns scripts en bash que te permiten automatizar parte de este proceso.

Esta tarea no debería ser complicada, pero a veces puede serlo. En este caso, vamos a flashear un usb con Arch Linux desde un sistema operativo Linux. Pero con Balena Etcher, puedes hacerlo desde cualquier sistema operativo.

## Flashear un usb con Arch Linux

### Requisitos

- Un usb de al menos 8GB
- Un sistema operativo Linux
- Un archivo ISO de Arch Linux
- Balena Etcher
- Un terminal

### Pasos

1. Descarga el archivo ISO de Arch Linux desde la página oficial.
2. Inserta el usb en tu ordenador.
3. Abre un terminal y ejecuta el siguiente comando para ver la ruta de tu usb.

```bash
lsblk
```

1. Ahora, ejecuta el siguiente comando para flashear el usb con Arch Linux.

```bash
sudo dd bs=4M if=ruta_de_la_iso of=ruta_del_usb status=progress oflag=sync
```

Ejemplo de uso:

```bash
sudo dd bs=4M if=archlinux-2021.06.01-x86_64.iso of=/dev/sdb status=progress oflag=sync
```

1. Espera a que termine el proceso y ya tendrás tu usb listo para instalar Arch Linux.

### Balena Etcher

<div class="obsidian-meta-links" style="position: relative;"><a href="https://etcher.balena.io/" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://uploads-ssl.webflow.com/636ab6ba0e1bd250e3aaedaf/65ef146b4576693f0c5d825b_OG%20image.png); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">balenaEtcher - Flash OS images to SD cards & USB drives</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">A cross-platform tool to flash OS images onto SD cards and USB drives safely and easily. Free and open source for makers around the world.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://etcher.balena.io/</p></div></a></div>

Si prefieres una interfaz gráfica, puedes usar Balena Etcher. Descarga el archivo AppImage desde la página oficial y ejecútalo.

1. Selecciona la imagen ISO de Arch Linux.
2. Selecciona el usb.
3. Haz clic en "Flash!" y espera a que termine el proceso.
4. Ya tendrás tu usb listo para instalar Arch Linux.
