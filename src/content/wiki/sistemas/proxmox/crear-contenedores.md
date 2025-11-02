---
title: Cómo crear un Contenedor LXC en Proxmox
description: "Crear contenedores LXC en Proxmox: plantillas, comandos pct, configuración de red y gestión de contenedores"
date: 2025-09-03
mod: 2025-10-25
published: true
tags: [cli, contenedores, linux, lxc, pct, plantillas, proxmox, terminal, virtualization]
---

# Cómo crear un Contenedor LXC en Proxmox

Para crear un contenedor LXC en Proxmox a través de la línea de comandos, puedes usar la herramienta `pct` (Proxmox Container Toolkit). A continuación se detallan los pasos y comandos necesarios.

## 1. Actualizar y Listar Plantillas Disponibles

Primero, es recomendable actualizar la lista de plantillas disponibles. Las plantillas son imágenes de sistemas operativos base para los contenedores.

Ejecuta el siguiente comando en la shell de tu nodo Proxmox:

```bash
pveam update
```

Para ver todas las plantillas que puedes descargar, usa:

```bash
pveam available
```

## 2. Descargar una Plantilla

Una vez que hayas elegido una plantilla de la lista, descárgala a un almacenamiento. El almacenamiento `local` suele usarse para este propósito.

La sintaxis del comando es: `pveam download <storage> <template-filename>`

Por ejemplo, para descargar la plantilla estándar de Debian 11:

```bash
pveam download local debian-11-standard_11.3-1_amd64.tar.zst
```

## 3. Crear el Contenedor LXC

Con la plantilla descargada, ya puedes crear el contenedor. El comando básico para crear un contenedor es `pct create`.

La sintaxis general es:

```bash
pct create <vmid> <template-path> [options]
```

**Argumentos:**
- `<vmid>`: Un ID numérico único para el contenedor.
- `<template-path>`: La ruta a la plantilla que descargaste. Por ejemplo: `local:vztmpl/debian-11-standard_11.3-1_amd64.tar.zst`.
- `[options]`: Diversas opciones para configurar los recursos y la red del contenedor.

**Ejemplo completo de creación de un contenedor:**

Este comando crea un contenedor con ID 101, basado en una plantilla de Debian, con una contraseña, 512MB de RAM, 1 núcleo de CPU, un disco raíz de 8GB y una interfaz de red.

```bash
pct create 101 local:vztmpl/debian-11-standard_11.3-1_amd64.tar.zst \
  --hostname my-debian-ct \
  --password "unaContraseñaSegura" \
  --memory 512 \
  --cores 1 \
  --rootfs local-lvm:8 \
  --net0 name=eth0,bridge=vmbr0,ip=192.168.1.101/24,gw=192.168.1.1
```

**Opciones comunes:**
- `--hostname`: El nombre de host del contenedor.
- `--password`: La contraseña para el usuario `root`.
- `--memory`: La cantidad de RAM en MB.
- `--cores`: El número de núcleos de CPU.
- `--rootfs`: Define el disco raíz. La sintaxis es `<storage>:<size_in_GB>`.
- `--net0`: Configura la interfaz de red. Puedes especificar el nombre, el puente (bridge), la dirección IP (con CIDR) y la puerta de enlace (gateway).
- `--ssh-public-keys`: Ruta a un archivo con claves públicas SSH para permitir el acceso.
- `--unprivileged`: Crea el contenedor sin privilegios para mayor seguridad.

## 4. Iniciar y Acceder al Contenedor

Una vez creado, puedes iniciar el contenedor con:

```bash
pct start 101
```

Y acceder a su consola con:

```bash
pct enter 101
```

También puedes crear contenedores usando la interfaz web de Proxmox, que ofrece un asistente gráfico que te guía a través de los mismos pasos.
