---
title: Actualizar paquetes en yay
description: description
date: 2024-05-09
mod: 2025-10-25
published: true
tags: [arch-linux, linux, package-manager, yay]
---

# Actualizar paquetes en yay

## Actualizar base de datos de paquetes

Con este comando **yay** se descargará la última versión de la base datos de paquetes.

```shell
yay -Sy
```

## Actualizar sistema y opcionalmente los paquetes instalados en AUR

Después de actualizar el sistema busca automáticamente si hay actualizaciones en AUR, lo ejecuta por separado por cuestiones de seguridad.

```shell
yay -Syu
```

## Actualizar base de datos de paquetes e instalar actualizaciones, todo en uno

```shell
yay
```
