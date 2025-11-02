---
title: Instalar y eliminar paquetes en yay
description: description
date: 2024-05-09
mod: 2025-10-25
published: true
tags: [arch-linux, linux, operating-system, package-manager, yay]
---

# Instalar y eliminar paquetes en yay

## Instalar uno o varios paquetes por su nombre exacto

```shell
$ yay -S PAQUETE_1 [PAQUETE_2 PAQUETE_3 …]
```

## Eliminar uno o varios paquetes

```shell
$ yay -R PAQUETE_1 [PAQUETE_2 PAQUETE_3 …]
```

Si quieres hacer una eliminación poco mas exhaustiva puedes probar a usar este otro comando. Elimina el/los paquete/s incluyendo todas sus dependencias, siempre que no sean requeridos por otros paquetes; y no fueron instalados explícitamente por el ti. Esta operación es recursiva y ayuda a mantener un sistema limpio sin huérfanos.

```shell
$ yay -Rns PAQUETE_1 [PAQUETE_2 PAQUETE_3 …]
```

Y por último una forma un poco más bruta para eliminar paquetes seria esta otra. Elimina el/los paquete/s, así como todos los paquetes que dependen de uno o más de los paquetes de destino. Esta operación es recursiva y **debe usarse con cuidado, ya que puede eliminar muchos paquetes potencialmente necesarios**.

```shell
$ yay -Rnc PAQUETE_1 [PAQUETE_2 PAQUETE_3 …]
```

## Limpiar la memoria caché de los paquetes

Recordemos que los paquetes descargados no se eliminan automáticamente al instalar nuevas versiones, eso provoca que el sistema se infle indiscriminadamente. La razón, poder volver a una versión anterior si algo se complica.

```shell
$ yay -Sc
```
