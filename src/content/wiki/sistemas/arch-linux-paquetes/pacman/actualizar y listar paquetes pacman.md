---
title: Actualizar y listar paquetes Pacman
description: description
date: 2024-05-16
mod: 2025-10-25
published: true
tags: [arch-linux, linux, pacman]
---

# Actualizar y listar paquetes Pacman

## Actualizar paquetes

```shell
sudo pacman -Syu
```

**Advertencia:** En lugar de actualizar inmediatamente tan pronto como las actualizaciones están disponibles, los usuarios deben tener presente que siendo Arch un distribución rolling release, una actualización puede tener consecuencias imprevistas. Esto significa que no es prudente actualizar si, por ejemplo, se necesitará tener el sistema estable por motivos de trabajo. Más bien, actualizar durante el tiempo libre y estar preparados para hacer frente a cualquier problema que pueda surgir.

Pues bien el flag "y" lo que hace es **descargar las bases de datos de paquetes del servidor**, para que nuestro sistema sepa cuales son los programas mas actuales que están disponibles, entonces tenemos una nueva opción:

```shell
sudo pacman -Sy
```

Y el flag "u" lo que hace es **actualizar todos los paquetes del sistema**.

## Buscar paquetes disponibles y paquetes instalados

Ahora para buscar los paquetes instalados en nuestro equipo lo hacemos con pacman acompañado con el flag "-Q", de la siguiente forma:

```shell
sudo pacman -Q
```

esto nos devuelve una lista con todos los paquetes instalados en el sistema. Y si ahora queremos saber si un determinado paquete/programa esta instalado en el sistema solamente agregamos el nombre del paquete:

```shell
sudo pacman -Q firefox
```

En caso de que Firefox este instalado, nos devolverá el nombre del programa y su versión, en caso contrario nos avisara que nos se ha encontrado el paquete.

Puedes revisar como [[instalar y eliminar paquetes en pacman|instalar y eliminar paquetes en Pacman]].
