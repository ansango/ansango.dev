---
title: Cómo compartir una carpeta en TrueNAS
description: "Compartir carpetas en TrueNAS: SMB para Windows, NFS para Linux/macOS, usuarios, permisos ACL y configuración de servicios"
date: 2025-09-03
mod: 2025-10-25
published: true
tags: [truenas, sharing, smb, nfs, windows, linux, macos, acl, permissions, users, groups]
---

# Cómo compartir una carpeta en TrueNAS

Para compartir una carpeta en TrueNAS, primero debes crear un "dataset" (conjunto de datos), que es el espacio de almacenamiento que vas a compartir. Luego, creas el recurso compartido utilizando un protocolo como SMB (ideal para redes con Windows) o NFS (para sistemas tipo Unix como Linux y macOS).

Aquí tienes los pasos generales y luego los específicos para cada tipo de recurso compartido:

## Pasos Preliminares

1. **Crear un Dataset**: Es la práctica recomendada en lugar de compartir un pool de almacenamiento completo, ya que te da más control.
    - Ve a `Storage > Pools`.
    - Busca tu pool, haz clic en los tres puntos y selecciona `Add Dataset`.
    - Dale un nombre a tu dataset (por ejemplo, "documentos_compartidos").
    - En "Share Type", puedes seleccionar `SMB` si solo lo usarás para Windows/SMB. Si no, déjalo como `Generic`.

2. **Crear Usuarios y Grupos**: Es fundamental crear cuentas de usuario para quienes accederán a la carpeta.
    - Ve a `Credentials > Local Users` y haz clic en `Add`.
    - Crea un usuario y una contraseña.
    - Puedes crear grupos en `Credentials > Local Groups` para gestionar permisos de varios usuarios a la vez.

## Opción 1: Compartir con SMB (Para Windows, macOS y Linux)

SMB es el protocolo más común y versátil para redes domésticas y de oficina.

**1. Crear el Recurso Compartido SMB:**
- Ve a `Sharing > Windows Shares (SMB)` y haz clic en `ADD`.
- En `Path`, selecciona el dataset que creaste anteriormente (ej: `/mnt/tu_pool/documentos_compartidos`).
- Dale un nombre al recurso compartido (este es el nombre que verás en la red, por ejemplo, "Documentos").
- Haz clic en `SUBMIT`.

**2. Habilitar el Servicio SMB:**
- El sistema te preguntará si deseas habilitar el servicio. Haz clic en `ENABLE SERVICE`.
- Si no te lo pregunta, ve a `System Settings > Services` y activa el servicio `SMB`. Asegúrate de marcar `Start Automatically` para que el recurso compartido esté disponible después de reiniciar.

**3. Configurar Permisos (ACL):**
Este es el paso más importante para controlar quién puede leer, escribir o modificar archivos.
- Ve a `Storage > Pools`, busca tu dataset, haz clic en los tres puntos y selecciona `Edit Permissions`.
- Se abrirá el editor de la Lista de Control de Acceso (ACL). Una forma sencilla de empezar es usar una plantilla predefinida. Haz clic en `SELECT AN ACL PRESET` y elige una opción como `OPEN` o `RESTRICTED`.
- Para un control más detallado, puedes añadir entradas (`ADD ITEM`):
    - **Who**: Selecciona `User` o `Group`.
    - **User/Group**: Elige el usuario o grupo al que quieres dar permisos.
    - **Permissions**: Define si pueden leer (`READ`), modificar (`MODIFY`) o tener control total (`FULL CONTROL`).
- Es una buena práctica eliminar el acceso por defecto a `everyone@` o `builtin_users` si quieres restringir el acceso solo a usuarios específicos.
- Haz clic en `SAVE`.

**4. Conectarse desde Windows:**
- Abre el Explorador de Archivos.
- En la barra de direcciones, escribe `\\<IP_DE_TU_TRUENAS>` y presiona Enter.
- Te pedirá el nombre de usuario y la contraseña que creaste en TrueNAS.
- Verás la carpeta compartida.

## Opción 2: Compartir con NFS (Para Linux y macOS)

NFS es el estándar para sistemas basados en Unix.

**1. Crear el Recurso Compartido NFS:**
- Ve a `Sharing > Unix Shares (NFS)` y haz clic en `ADD`.
- En `Path`, selecciona el dataset que deseas compartir.
- Puedes añadir una descripción para identificar el recurso.
- Haz clic en `SUBMIT`.

**2. Habilitar el Servicio NFS:**
- El sistema te preguntará si deseas habilitar el servicio. Haz clic en `ENABLE SERVICE`.
- Si no, ve a `System Settings > Services`, activa `NFS` y marca `Start Automatically`.

**3. Configurar Permisos y Acceso:**
- A diferencia de SMB, los permisos de NFS se basan en gran medida en los permisos del sistema de archivos Unix y en la configuración de la red.
- Al editar el recurso NFS, en `Advanced Options`, puedes restringir el acceso a IPs o rangos de red específicos en la sección `Networks`.
- Los permisos de lectura/escritura se gestionan principalmente a través de los permisos del dataset (`Edit Permissions`), asegurándote de que los UID/GID del cliente Linux/macOS coincidan o tengan permisos sobre los archivos en TrueNAS.

**4. Conectarse desde un cliente Linux:**
- Primero, instala el cliente NFS si no lo tienes: `sudo apt install nfs-common` (en Debian/Ubuntu).
- Crea un directorio local donde montarás el recurso: `sudo mkdir /mnt/truenas_share`.
- Monta el recurso compartido con el comando: `sudo mount -t nfs <IP_DE_TU_TRUENAS>:/mnt/tu_pool/tu_dataset /mnt/truenas_share`.
