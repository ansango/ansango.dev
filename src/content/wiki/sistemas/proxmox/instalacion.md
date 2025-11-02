---
title: Instalacion
description: "Instalar Proxmox VE: requisitos del sistema, preparación USB, proceso de instalación y acceso a la interfaz web"
date: 2025-09-03
mod: 2025-10-25
published: true
tags: [boot, debian, hardware, instalacion, iso, linux, proxmox, requisitos, usb]
---

# Instalacion

# Cómo instalar Proxmox VE

Para instalar Proxmox VE, necesitarás preparar una unidad USB de arranque y asegurarte de que tu hardware cumple con los requisitos del sistema. A continuación se detallan los pasos generales para la instalación.

## 1. Requisitos del Sistema

Antes de empezar, comprueba que tu sistema cumple con los siguientes requisitos:

- **CPU:** 64 bits (Intel 64 o AMD64) con soporte de virtualización Intel VT/AMD-V.
- **RAM:** Se recomienda un mínimo de 2 GB para el sistema operativo y los servicios de Proxmox VE. Para fines de evaluación, 1 GB de RAM es el mínimo.
- **Almacenamiento:** Se necesitan 16 GB de espacio en disco para la instalación. Para obtener los mejores resultados, se recomiendan discos SSD rápidos y redundantes.
- **Red:** Se requiere al menos una tarjeta de red.

## 2. Preparación de la Instalación

1. **Descarga la imagen ISO de Proxmox VE:** Ve a la página oficial de descargas de Proxmox y descarga la última imagen ISO.
2. **Crea una unidad USB de arranque:** Utiliza una herramienta como BalenaEtcher o Rufus para grabar la imagen ISO en una unidad USB.

## 3. Proceso de Instalación

1. **Arranca desde la unidad USB:** Inserta la unidad USB en el ordenador donde quieres instalar Proxmox y arranca desde ella. Es posible que tengas que cambiar el orden de arranque en la configuración de la BIOS/UEFI de tu sistema.
2. **Inicia el instalador:** En el menú de Proxmox VE, selecciona "Install Proxmox VE" para iniciar el asistente de instalación.
3. **Acuerdo de licencia:** Acepta el Acuerdo de Licencia de Usuario Final (EULA) para continuar.
4. **Selecciona el disco de destino:** Elige el disco duro donde se instalará Proxmox. Ten en cuenta que todos los datos existentes en el disco seleccionado serán eliminados.
5. **Configuración de la ubicación y la hora:** Selecciona tu país, zona horaria y distribución de teclado.
6. **Contraseña y correo electrónico:** Crea una contraseña para el usuario `root` y proporciona una dirección de correo electrónico.
7. **Configuración de red:** Configura la interfaz de gestión, el nombre de host del servidor, una dirección IP disponible, la puerta de enlace predeterminada y un servidor DNS.
8. **Resumen e instalación:** Revisa el resumen de las opciones seleccionadas y haz clic en "Install" para comenzar la instalación.
9. **Reinicio:** Una vez finalizada la instalación, retira la unidad USB y reinicia el sistema.

## 4. Acceso a la Interfaz Web

Después de reiniciar, podrás acceder a la interfaz de gestión web de Proxmox desde otro ordenador en la misma red. Abre un navegador web y navega a la dirección IP que configuraste durante la instalación, seguida del puerto 8006 (por ejemplo, `https://192.168.1.100:8006`). Inicia sesión con el nombre de usuario `root` y la contraseña que estableciste.

También existe la opción de instalar Proxmox sobre una instalación existente de Debian.
