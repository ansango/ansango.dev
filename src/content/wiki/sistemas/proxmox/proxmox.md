---
title: ¿Qué Es Proxmox?
description: "Proxmox VE: plataforma de virtualización con KVM y LXC, gestión de clústeres, alta disponibilidad y almacenamiento flexible"
date: 2025-09-03
mod: 2025-11-25
published: true
tags: [clustering, ha, hypervisor, kvm, lxc, open-source, proxmox, storage, virtualizacion]
---

# ¿Qué Es Proxmox?

Proxmox Virtual Environment (VE) es una potente plataforma de virtualización de código abierto diseñada para la gestión de infraestructuras de servidores. Permite a los usuarios ejecutar y administrar tanto máquinas virtuales (VMs) como contenedores en un único servidor físico, optimizando el uso de los recursos de hardware.

Construido sobre la sólida base de Debian GNU/Linux, Proxmox VE integra dos tecnologías de virtualización clave:

- **KVM (Kernel-based Virtual Machine):** Para una virtualización completa, KVM permite ejecutar sistemas operativos como Windows y Linux en máquinas virtuales aisladas, cada una con su propio hardware virtualizado (tarjeta de red, disco, etc.).
- **LXC (Linux Containers):** Para una virtualización ligera a nivel de sistema operativo, LXC permite ejecutar múltiples sistemas Linux aislados en un único host, lo que consume menos recursos que las máquinas virtuales completas.

Una de las características más destacadas de Proxmox VE es su interfaz de usuario web centralizada, que simplifica enormemente la administración de máquinas virtuales, contenedores, almacenamiento y redes desde un único punto de control.

## Características Principales

- **Código Abierto:** Al ser una solución de código abierto, Proxmox VE no tiene costos de licencia, lo que lo convierte en una opción atractiva para reducir gastos en TI.
- **Gestión de Clústeres:** Permite agrupar varios servidores en un clúster, lo que mejora la escalabilidad y la redundancia del sistema.
- **Alta Disponibilidad (HA):** En un clúster, si un servidor (nodo) falla, las máquinas virtuales y contenedores se pueden mover automáticamente a otro nodo para minimizar el tiempo de inactividad.
- **Migración en Vivo:** Es posible mover máquinas virtuales en funcionamiento entre diferentes nodos del clúster sin interrumpir los servicios.
- **Almacenamiento Flexible:** Soporta diversas tecnologías de almacenamiento como LVM, ZFS, Ceph, NFS e iSCSI. La integración con Ceph permite construir una infraestructura hiperconvergente.
- **Copia de Seguridad y Restauración:** Incluye herramientas para realizar copias de seguridad y restaurar datos de máquinas virtuales y contenedores. También se integra con Proxmox Backup Server para una solución de respaldo más avanzada.
- **Redes Definidas por Software (SDN):** Ofrece flexibilidad para crear topologías de red complejas y seguras.

En resumen, Proxmox VE es una solución de virtualización completa, flexible y rentable, que se presenta como una alternativa robusta a otras plataformas de virtualización como VMware o Hyper-V.

## Artículos

- [Instalación de Proxmox](sites/ansango.com/content/wiki/sistemas/proxmox/instalacion.md)
- [Crear máquinas virtuales](crear-maquinas-virtuales.md)
- [Crear contenedores](crear-contenedores.md)
- [Configuración de red](configuracion-red.md)
- [Configuración de almacenamiento](configuracion-almacenamiento.md)
