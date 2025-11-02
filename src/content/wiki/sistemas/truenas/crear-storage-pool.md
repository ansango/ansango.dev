---
title: Cómo crear un Pool de Almacenamiento en TrueNAS
description: "Crear pool de almacenamiento en TrueNAS: configuración ZFS, diseños RAID, redundancia y planificación de capacidad"
date: 2025-09-03
mod: 2025-10-25
published: true
tags: [truenas, storage, pool, zfs, raid, mirror, stripe, raidz, vdev, redundancy, capacity]
---

# Cómo crear un Pool de Almacenamiento en TrueNAS

Un pool de almacenamiento en TrueNAS es una colección de discos organizados en dispositivos virtuales (VDEVs) que almacenan tus datos de manera eficiente y segura utilizando el sistema de archivos ZFS.

## Planificación del Pool de Almacenamiento

Antes de crear un pool, es muy recomendable planificar su uso. Considera lo siguiente:

- **Redundancia:** Asignar más discos a un pool aumenta la redundancia, lo cual es crítico para proteger tu información.
- **Capacidad:** Para maximizar el almacenamiento total, puedes usar discos de gran volumen con una configuración de redundancia mínima.
- **Rendimiento:** Para maximizar el rendimiento del pool, considera usar unidades de estado sólido (SSD) de alta velocidad.
- **Seguridad:** Puedes encriptar el pool, aunque se recomienda crear pools sin encriptar y luego encriptar los datasets que lo necesiten.

## Cómo Crear un Pool de Almacenamiento

1. **Accede al Administrador de Pools:**
    - En la interfaz web de TrueNAS, ve a **Storage** en el panel de navegación principal.
    - Haz clic en **Create Pool** para abrir el Administrador de Pools.

2. **Configuración del Pool:**
    - **Nombre:** Ingresa un nombre para tu pool.
    - **Discos:** Selecciona los discos que deseas agregar al pool y muévelos a un VDEV de datos.

3. **Diseño de VDEV (Virtual Device):**
    El Administrador de Pools te sugerirá un diseño de VDEV basado en la cantidad de discos que agregues. Por ejemplo, si agregas dos discos, TrueNAS configurará automáticamente el VDEV como un espejo (mirror). Aquí tienes un resumen de los diseños de VDEV más comunes:

| Diseño | Descripción | Ventajas | Desventajas |
| :--- | :--- | :--- | :--- |
| **Stripe (RAID 0)** | Combina todos los discos en un solo volumen grande. | Máximo rendimiento y capacidad. | Sin redundancia. Si un disco falla, se pierden todos los datos. |
| **Mirror (RAID 1)** | Crea una copia exacta de los datos en dos o más discos. | Alta redundancia y buen rendimiento de lectura. | La capacidad total es la del disco más pequeño del espejo. |
| **RAID-Z1** | Similar a RAID 5. Utiliza un disco para paridad. | Buen equilibrio entre capacidad y redundancia. | Requiere al menos 3 discos. |
| **RAID-Z2** | Similar a RAID 6. Utiliza dos discos para paridad. | Puede soportar el fallo de hasta dos discos. | Requiere al menos 4 discos. |
| **RAID-Z3** | Similar a RAID 7. Utiliza tres discos para paridad. | Puede soportar el fallo de hasta tres discos. | Requiere al menos 5 discos. |

1. **Creación del Pool:**
    - Una vez que hayas configurado los VDEVs, haz clic en **Create**.
    - TrueNAS comenzará a crear el pool de almacenamiento. Una vez completado, serás redirigido al **Storage Dashboard**, donde podrás ver los detalles de tu nuevo pool.

## Pasos Siguientes

Una vez que hayas creado tu pool de almacenamiento, el siguiente paso es crear **datasets**. Los datasets te permiten organizar y almacenar diferentes tipos de datos por separado.
