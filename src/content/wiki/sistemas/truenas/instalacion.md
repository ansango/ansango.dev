---
title: Cómo instalar TrueNAS
description: "Instalar TrueNAS: requisitos del sistema, descarga ISO, creación USB de arranque y proceso de instalación"
date: 2025-09-03
mod: 2025-10-25
published: true
tags: [truenas, instalacion, iso, usb, boot, requisitos, hardware, core, scale, freebsd, linux]
---

# Cómo instalar TrueNAS

Instalar TrueNAS implica preparar un medio de instalación, arrancar desde él y seguir las instrucciones en pantalla. Aquí tienes una guía paso a paso para empezar.

## 1. Elige tu versión de TrueNAS

Antes de empezar, tienes que decidir qué edición de TrueNAS es la adecuada para ti:

- **TrueNAS CORE**: La versión tradicional, basada en FreeBSD. Es conocida por su estabilidad y rendimiento para tareas relacionadas con el almacenamiento.
- **TrueNAS SCALE**: Una versión más reciente basada en Linux, que ofrece un mejor soporte para aplicaciones, contenedores Docker y virtualización (KVM).

La actualización de CORE a SCALE es una operación de un solo sentido.

## 2. Comprueba los requisitos del sistema

Asegúrate de que tu hardware cumple los requisitos mínimos para la versión que elijas.

**Requisitos mínimos de TrueNAS CORE:**
- **CPU**: procesador de 64 bits
- **RAM**: 8 GB (se recomiendan 16 GB para un mejor rendimiento, especialmente con ZFS)
- **Unidad de arranque**: Unidad de 16 GB para la instalación del sistema operativo. Se recomienda encarecidamente una unidad SSD en lugar de una memoria USB por fiabilidad.
- **Unidades de almacenamiento**: Al menos una unidad adicional para el almacenamiento de datos.

**Requisitos mínimos de TrueNAS SCALE:**
- **CPU**: Procesador de 64 bits de doble núcleo
- **RAM**: 8 GB (se recomiendan 16 GB)
- **Unidad de arranque**: SSD de 16 GB
- **Unidades de almacenamiento**: Al menos dos unidades de idéntico tamaño para una agrupación de almacenamiento básica.

## 3. Descarga el archivo ISO de TrueNAS

Descarga la imagen de instalación ISO adecuada desde el sitio web oficial de TrueNAS. Tendrás que registrarte o iniciar sesión para acceder a los enlaces de descarga.

## 4. Crea una unidad USB de arranque

Necesitarás escribir el archivo `.iso` descargado en una unidad USB (de al menos 1 GB). Esta unidad USB servirá como medio de instalación.

1. Inserta una memoria USB en tu ordenador.
2. Utiliza una herramienta como **balenaEtcher** o **Rufus** para flashear el archivo ISO de TrueNAS en la unidad USB.
3. Cuando utilices Rufus, asegúrate de seleccionar el "modo dd" cuando se te pida.

## 5. Instala TrueNAS

1. Inserta tanto el medio de instalación USB de arranque como la unidad separada en la que pretendes instalar el SO (tu dispositivo de arranque, por ejemplo, un SSD) en el servidor.
2. Arranca el servidor y entra en la configuración de la BIOS/UEFI.
3. Configura el sistema para que arranque desde el medio de instalación USB que acabas de crear.
4. En el menú del instalador de TrueNAS, selecciona la opción `Instalar/Actualizar`.
5. Elige la unidad donde quieres instalar el sistema operativo TrueNAS. **Advertencia: Se borrarán todos los datos de esta unidad.** Ten cuidado de seleccionar tu unidad de arranque dedicada, no una unidad de almacenamiento de datos.
6. Establece una contraseña segura para la cuenta `root` (administrador).
7. Elige arrancar a través de UEFI o BIOS, dependiendo de tu hardware.
8. Una vez finalizada la instalación, reinicia el sistema y retira el medio de instalación USB.

## 6. Post-instalación

Tras reiniciar, el sistema se iniciará en TrueNAS. La consola mostrará un menú y la dirección IP para acceder a la interfaz web.

1. En un ordenador distinto de la misma red, abre un navegador web.
2. Escribe la dirección IP que aparece en la consola de TrueNAS.
3. Inicia sesión con el nombre de usuario `root` y la contraseña que creaste durante la instalación.

Ahora puedes empezar a configurar tus pools de almacenamiento, compartidos y otros servicios a través de la interfaz web.
