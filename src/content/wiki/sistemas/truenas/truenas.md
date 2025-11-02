---
title: ¿Qué Es TrueNAS?
description: "TrueNAS: sistema operativo NAS con OpenZFS, versiones CORE y SCALE, protección de datos y virtualización"
date: 2025-09-03
mod: 2025-10-12
published: true
tags: [truenas, nas, zfs, freenas, storage, open-source, core, scale, enterprise, filesystem]
---

# ¿Qué Es TrueNAS?

TrueNAS es un sistema operativo de código abierto diseñado para crear y gestionar soluciones de almacenamiento de datos, conocidas como NAS (Network Attached Storage o Almacenamiento Conectado en Red). Permite convertir una computadora en un servidor de almacenamiento centralizado, accesible desde cualquier dispositivo conectado a la red.

Anteriormente, el proyecto se conocía como FreeNAS. En 2020, FreeNAS se unificó con la versión comercial para empresas, dando lugar a la familia de productos TrueNAS.

## Versiones de TrueNAS

Existen principalmente tres versiones de TrueNAS:

- **TrueNAS CORE:** Es el sucesor directo de FreeNAS. Es gratuito, de código abierto y está basado en el sistema operativo FreeBSD. Está orientado a usuarios domésticos, pequeñas y medianas empresas que buscan una solución estable y probada.
- **TrueNAS SCALE:** También es gratuito y de código abierto, pero se basa en Debian Linux. Ofrece mayor flexibilidad y escalabilidad, con soporte nativo para contenedores (como Docker) y máquinas virtuales (KVM), lo que la hace ideal para entornos más complejos y de gran escala.
- **TrueNAS Enterprise:** Es la versión comercial disponible con el hardware de iXsystems, el desarrollador de TrueNAS. Ofrece características avanzadas para empresas como alta disponibilidad (failover), soporte técnico profesional y optimizaciones de rendimiento específicas para su hardware.

## Características Principales

- **Sistema de archivos OpenZFS:** En el corazón de TrueNAS se encuentra el sistema de archivos OpenZFS, conocido por su alta fiabilidad, protección de datos contra la corrupción y capacidad de autorreparación.
- **Almacenamiento Unificado:** TrueNAS no es solo un NAS tradicional. Permite el acceso a los datos a través de diversos protocolos de archivos (SMB/CIFS para Windows, NFS para Linux), de bloques (iSCSI) y de objetos.
- **Protección de datos:** Ofrece funciones avanzadas como snapshots (instantáneas) ilimitadas, que permiten revertir el estado de los datos a un punto anterior, y replicación para crear copias de seguridad en otros sistemas.
- **Plugins y Virtualización:** Se puede ampliar su funcionalidad mediante plugins (como Plex Media Server o NextCloud) y la virtualización de sistemas operativos.
- **Seguridad:** Incluye características como encriptación de volúmenes, soporte para VPN y actualizaciones de seguridad.

En resumen, TrueNAS es una solución de almacenamiento potente y flexible que permite a los usuarios construir su propio servidor NAS adaptado a sus necesidades, ya sea para uso doméstico, profesional o empresarial, con un fuerte enfoque en la integridad y protección de los datos.

## Artículos

- [Instalación de TrueNAS](sites/ansango.com/content/wiki/sistemas/truenas/instalacion.md)
- [Crear un pool de almacenamiento](crear-storage-pool.md)
- [Crear un dataset](crear-dataset.md)
- [Compartir una carpeta](compartir-carpeta.md)
