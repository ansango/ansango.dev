---
title: Cómo crear un Dataset en TrueNAS
description: "Crear dataset en TrueNAS: interfaz web, línea de comandos, tipos de compartir y configuración de permisos"
date: 2025-09-03
mod: 2025-10-25
published: true
tags: [truenas, dataset, filesystem, smb, nfs, multiprotocol, apps, cli, storage, permissions]
---

# Cómo crear un Dataset en TrueNAS

Un dataset en TrueNAS es un sistema de archivos que se crea dentro de un pool de almacenamiento de datos. Antes de poder compartir una carpeta, debes crear un dataset. A continuación te explico cómo puedes crear un dataset tanto a través de la interfaz web como de la línea de comandos.

## Crear un Dataset a través de la Interfaz Web

La forma más común de crear un dataset es a través de la interfaz de usuario web de TrueNAS.

1. **Accede a la interfaz web de TrueNAS.**
2. Haz clic en **Storage** en el panel de la izquierda y luego en **Pools**.
3. Busca el pool en el que deseas crear el dataset, haz clic en el menú de los tres puntos y selecciona **Add Dataset**.
4. **Asigna un nombre** al dataset.
5. En la sección "Share Type", puedes seleccionar una de las siguientes opciones:
    - **Generic:** Para datasets que no son para compartir con SMB, como iSCSI y NFS.
    - **Multiprotocol:** Para datasets optimizados para compartición SMB y NFS.
    - **SMB:** Para datasets optimizados para compartición SMB.
    - **Apps:** Para datasets optimizados para el almacenamiento de aplicaciones.
6. Haz clic en **Submit**.

Una vez creado el dataset, puedes editar sus permisos para controlar el acceso.

## Crear un Dataset desde la Línea de Comandos (CLI)

También puedes crear datasets utilizando la línea de comandos de TrueNAS.

El comando para crear un dataset es `storage dataset create`. Este comando tiene una propiedad obligatoria (`name`) y varias opcionales.

A continuación, se muestra un ejemplo básico:

```bash
storage dataset create name="tu-pool/nombre-del-dataset"
```

Reemplaza `"tu-pool/nombre-del-dataset"` con el nombre de tu pool y el nombre que deseas para tu nuevo dataset.

Para una configuración más sencilla, puedes usar el editor interactivo (TUI) ejecutando `storage dataset create --` y presionando Enter.

Existen también scripts creados por la comunidad que simplifican la creación de datasets, especialmente para aplicaciones, con una sola línea de comando.
