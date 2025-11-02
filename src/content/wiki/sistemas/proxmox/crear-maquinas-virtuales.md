---
title: Cómo crear una Máquina Virtual (VM) en Proxmox
description: "Crear máquinas virtuales en Proxmox: subir ISOs, configuración de hardware, red y gestión de VMs"
date: 2025-09-03
mod: 2025-10-25
published: true
tags: [gui, hardware, iso, kvm, maquinas-virtuales, proxmox, red, storage, vm]
---

# Cómo crear una Máquina Virtual (VM) en Proxmox

Aquí tienes una guía paso a paso para crear una máquina virtual (VM) en Proxmox VE.

## 1. Sube una imagen ISO

Antes de poder crear una máquina virtual, necesitas la imagen de instalación del sistema operativo (un archivo .ISO).

1. **Accede a la interfaz web de Proxmox:** Abre tu navegador y ve a `https://<DIRECCIÓN-IP-PROXMOX>:8006`.
2. **Selecciona tu almacenamiento:** En el panel de la izquierda, selecciona tu nodo Proxmox y luego el almacenamiento donde deseas guardar la ISO (normalmente `local`).
3. **Sube la ISO:** Haz clic en "ISO Images" y luego en el botón "Upload". Selecciona el archivo ISO de tu ordenador y súbelo.

## 2. Crea la Máquina Virtual

1. **Inicia el asistente:** Haz clic en el botón azul "Crear VM" en la esquina superior derecha de la interfaz de Proxmox.
2. **Pestaña General:**
    - **Nodo:** Selecciona el nodo Proxmox donde se creará la VM.
    - **VM ID:** Asigna un número de identificación único a tu VM (mayor de 100).
    - **Nombre:** Dale un nombre descriptivo a tu máquina virtual.

3. **Pestaña OS (Sistema Operativo):**
    - Selecciona la imagen ISO que subiste anteriormente.
    - Define el tipo y la versión del sistema operativo que vas a instalar.

4. **Pestaña Sistema:**
    - Puedes dejar la configuración por defecto en la mayoría de los casos. Si vas a instalar un sistema operativo que requiere TPM (como Windows 11), puedes habilitarlo aquí.

5. **Pestaña Discos:**
    - **Bus/Dispositivo:** Generalmente, "SCSI" o "SATA" son buenas opciones.
    - **Tamaño del disco (GiB):** Asigna el espacio de almacenamiento que necesitará tu VM.

6. **Pestaña CPU:**
    - **Cores:** Define el número de núcleos de CPU que asignas a la VM.

7. **Pestaña Memoria:**
    - **Memoria (MiB):** Asigna la cantidad de RAM para tu VM en megabytes.

8. **Pestaña Red:**
    - **Puente:** Selecciona el puente de red al que se conectará la VM. `vmbr0` es el más común y le dará acceso a tu red local.
    - **Modelo:** "VirtIO (paravirtualizado)" ofrece el mejor rendimiento, pero puede requerir controladores adicionales en sistemas como Windows.

9. **Pestaña Confirmar:**
    - Revisa todas las configuraciones. Si todo es correcto, haz clic en "Finalizar".

## 3. Inicia la VM e instala el Sistema Operativo

1. **Selecciona la VM:** En el panel izquierdo, verás tu nueva VM. Haz clic en ella.
2. **Inicia la VM:** Haz clic en el botón "Start" en la parte superior derecha.
3. **Abre la consola:** Haz clic en "Console" para ver la pantalla de la máquina virtual.
4. **Instala el SO:** Sigue las instrucciones del instalador del sistema operativo que has elegido.

Una vez finalizada la instalación, tendrás tu máquina virtual funcionando en Proxmox.
