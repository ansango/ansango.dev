---
title: Rhythmbox
description: "Rhythmbox: reproductor de música para GNOME, instalación en Arch Linux, plugins de organización y soporte para formatos M4A"
date: 2024-12-17
mod: 2025-10-25
published: true
tags: [tag]
---

# Rhythmbox

Este es un programa para gestion de musica con interfaz, es el que viene normalmente en gnome.

Para instalarlo en Arch es recomendable hacer lo siguiente:

```bash
sudo pacman -S rhythmbox
```

Si quieres usar un disco externo para almacenar tu biblioteca o porque la tienes fuera, tienes que montar por defecto el volumen externo con permisos para lectura y escritura

Para que los archivos esten organizados por carpetas y albumes como hace iTunes internamente, tienes que que descargar el plugin file organizer para rythmbox.

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/lachlan-00/rb-fileorganizer" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/746fe88a8b937071b6b75ed9b0ee1fc6bc126d07a8dbf76cb4015bc6ad9cf4ba/lachlan-00/rb-fileorganizer); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - lachlan-00/rb-fileorganizer: Rhythmbox File Organizer - looking for a maintainer.</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Rhythmbox File Organizer - looking for a maintainer. - lachlan-00/rb-fileorganizer</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/lachlan-00/rb-fileorganizer</p></div></a></div>
Si quieres que los archivos de apple m4a funcionen tendras que instalar los siguientes plugins:

```bash
sudo pacman -S gstreamer gst-plugins-base gst-plugins-good gst-plugins-bad gst-plugins-ugly gst-libav ffmpeg
```
