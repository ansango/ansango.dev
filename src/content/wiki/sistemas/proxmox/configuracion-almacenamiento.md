---
title: Guía de Configuración de Almacenamiento en Proxmox VE
description: "Configuración de almacenamiento en Proxmox: LVM-Thin, ZFS, NFS, CIFS, iSCSI, Ceph y comparativa de tecnologías"
date: 2025-09-03
mod: 2025-10-25
published: true
tags: [backup, ceph, cifs, filesystem, iscsi, lvm, nfs, proxmox, raid, storage, zfs]
---

# Guía de Configuración de Almacenamiento en Proxmox VE

El modelo de almacenamiento de Proxmox VE es extremadamente flexible, permitiendo guardar imágenes de máquinas virtuales y contenedores en almacenamientos locales o compartidos en red. Toda la configuración del almacenamiento se gestiona en el archivo `/etc/pve/storage.cfg`, que se distribuye automáticamente a todos los nodos de un clúster.

## Tipos de Almacenamiento

Proxmox VE soporta una amplia variedad de tipos de almacenamiento, que se pueden clasificar en locales y de red.

### Almacenamiento Local

Se encuentra directamente en el servidor Proxmox.

- **LVM-Thin (Logical Volume Manager - Thin Provisioning):** Es una opción popular que ofrece asignación dinámica de espacio, lo que significa que el espacio en disco solo se utiliza cuando la VM realmente lo necesita. Permite snapshots y ofrece un rendimiento rápido con baja sobrecarga de recursos.
- **ZFS (Z File System):** Es un sistema de archivos avanzado que ofrece excelentes características de integridad de datos gracias a las sumas de verificación (checksums), compresión, y la capacidad de crear snapshots y replicarlos a otro host. Sin embargo, consume más recursos, especialmente memoria RAM (se recomiendan al menos 16 GB para un rendimiento óptimo).
- **Directory:** Es la forma más sencilla de almacenamiento. Se trata de un directorio en el sistema de archivos del anfitrión (como ext4 o xfs) donde se guardan las imágenes de disco, ISOs o copias de seguridad.

### Almacenamiento en Red (Compartido)

Permite que varios nodos de Proxmox accedan al mismo almacenamiento, lo cual es esencial para la alta disponibilidad y la migración en vivo.

- **NFS (Network File System):** Un protocolo estándar para compartir archivos en redes Linux/UNIX.
- **CIFS (Common Internet File System):** También conocido como SMB, es el protocolo estándar para compartir archivos en redes Windows y es compatible con la mayoría de los dispositivos NAS.
- **iSCSI:** Permite acceder a dispositivos de almacenamiento a nivel de bloque a través de una red IP, comúnmente utilizado en entornos SAN (Storage Area Network).
- **Ceph:** Una solución de almacenamiento distribuido de código abierto que proporciona almacenamiento de objetos, bloques y archivos. Es altamente escalable y resiliente.
- **Proxmox Backup Server:** Una solución de respaldo empresarial integrada directamente en Proxmox VE para realizar copias de seguridad de máquinas virtuales y contenedores de manera eficiente.

## Cómo Añadir Almacenamiento

La gestión del almacenamiento se realiza principalmente desde la interfaz web de Proxmox, en la sección **Datacenter > Storage**.

---

### **Ejemplo 1: Añadir un Disco Local como LVM-Thin**

Este proceso es útil cuando se agrega un nuevo disco físico al servidor.

1. **Identificar el nuevo disco:** Abre la consola de tu nodo Proxmox y usa el comando `fdisk -l` para listar los discos. El nuevo disco aparecerá probablemente sin una tabla de particiones válida (por ejemplo, `/dev/sdb`).
2. **Crear una partición:** Utiliza una herramienta como `cfdisk /dev/sdb` para crear una nueva partición primaria que ocupe todo el disco.
3. **Crear un Volumen Físico (PV):** Ejecuta `pvcreate /dev/sdb1` (suponiendo que la nueva partición es `sdb1`).
4. **Crear un Grupo de Volúmenes (VG):** Ejecuta `vgcreate nombre-del-vg /dev/sdb1`. Reemplaza `nombre-del-vg` con un nombre descriptivo, como `data_lvm`.
5. **Añadir el almacenamiento en Proxmox:**
    - Ve a **Datacenter > Storage > Add > LVM-Thin**.
    - **ID:** Dale un nombre único al almacenamiento.
    - **Volume group:** Selecciona el VG que creaste en el paso anterior.
    - **Thin Pool:** Dale un nombre al pool de thin provisioning.
    - Haz clic en **Add**.

---

### **Ejemplo 2: Añadir Almacenamiento de Red (CIFS/SMB)**

Este es un método común para usar un NAS o una carpeta compartida en la red.

1. **Preparar la carpeta compartida:** Asegúrate de tener una carpeta compartida en tu red y las credenciales de acceso (usuario y contraseña), si son necesarias.
2. **Añadir el almacenamiento en Proxmox:**
    - Ve a **Datacenter > Storage > Add > CIFS**.
    - **ID:** Dale un nombre único al almacenamiento.
    - **Server:** Introduce la dirección IP de tu servidor NAS o del equipo que comparte la carpeta.
    - **Username / Password:** Introduce las credenciales de acceso.
    - **Share:** Selecciona la carpeta compartida de la lista desplegable.
    - **Content:** Selecciona para qué se usará este almacenamiento (imágenes de disco, ISOs, backups, etc.).
    - **Nodes:** Elige si estará disponible en todos los nodos o solo en algunos.
    - Haz clic en **Add**.

El procedimiento para NFS es muy similar, pero no requiere credenciales de usuario en la mayoría de los casos.

## Comparativa: ZFS vs. LVM-Thin

La elección entre ZFS y LVM-Thin es una de las decisiones más importantes para el almacenamiento local.

| Característica | ZFS | LVM-Thin |
| :--- | :--- | :--- |
| **Integridad de Datos** | **Excelente**. Utiliza checksums para detectar y reparar corrupción de datos silenciosa ("bit rot"). | **Básica**. No tiene mecanismos integrados de verificación de integridad a nivel de sistema de archivos. |
| **Funcionalidades** | **Avanzadas**. Soporta compresión, snapshots, y replicación nativa de snapshots entre nodos. | **Buenas**. Soporta snapshots y asignación dinámica, pero carece de replicación nativa fácil. |
| **Rendimiento** | Bueno, pero con una sobrecarga mayor debido a sus funcionalidades. | **Excelente**. Generalmente más rápido y con menor sobrecarga de CPU. |
| **Uso de Recursos** | **Alto**. Requiere una cantidad considerable de memoria RAM para su caché (ARC). | **Bajo**. No tiene grandes requerimientos de memoria. |
| **Casos de Uso** | Ideal para datos críticos, bases de datos o cuando se necesita replicación y máxima integridad. | Perfecto para despliegues más simples, servidores con menos recursos o cuando se prioriza la velocidad. |

En resumen, si la integridad de los datos y las funciones avanzadas como la replicación son tu prioridad y tienes hardware suficiente (especialmente RAM), ZFS es una opción fantástica. Si prefieres la simplicidad, un rendimiento predecible y tienes recursos más limitados, LVM-Thin es una elección sólida y fiable.
