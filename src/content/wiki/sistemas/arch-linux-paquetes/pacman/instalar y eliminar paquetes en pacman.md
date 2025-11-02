---
title: Instalar y eliminar paquetes en Pacman
description: description
date: 2024-05-16
mod: 2025-10-25
published: true
tags: [arch-linux, linux, package-manager, pacman]
---

# Instalar y eliminar paquetes en Pacman

> Antes de instalar cualquier paquete revisa la documentación para [[actualizar paquetes en yay|actualizar paquetes en Pacman]]

## Instalar paquetes

En la pagina de archlinux https://archlinux.org/packages/ podemos buscar paquetes disponibles, la versión, el repositorio y la arquitectura, simplemente buscamos el programa que necesitemos y luego procedemos a instalarlo.

```shell
sudo pacman -S firefox-developer-edition
```

## Desinstalar paquetes

```shell
sudo pacman -R firefox-developer-editio
```

si agregamos el flag "s" también eliminamos el programa con las dependencias que no son ocupadas por otro paquete, de esta manera:

```shell
sudo pacman -Rs firefox-developer-edition
```
