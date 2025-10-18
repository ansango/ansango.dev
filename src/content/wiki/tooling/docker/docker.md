---
title: Docker
description: "description"
draft: false
date: 2024-12-17
mod: 2025-08-28
published: true
order: 0
tags: [docker, sysadmin]
---

# Docker

## Definición

Docker es una popular herramienta de creación de contenedores de código abierto que se utiliza para proporcionar un entorno de ejecución portátil y consistente para aplicaciones de software, al tiempo que consume menos recursos que un servidor o una máquina virtual tradicional. a

Docker utiliza contendores entornos de espacio de usuario aislados que se ejecutan a nivel del sistema operativo y comparten recursos del sistema, como el kernel y el sistema de archivos.

## Contenedores

Un contenedor es un entorno de espacio de usuario aislado y minimalista que se ejecuta a nivel del sistema operativo y comparte recursos del sistema con otras instancias. Los contenedores están diseñados para proporcionar un entorno de ejecución portátil y consistente para aplicaciones, al tiempo que consumen menos recursos que un servidor o una máquina virtual tradicional.

Esto permite un mejor uso general de los recursos informáticos en aplicaciones distribuidas de múltiples componentes y sistemas de alta disponibilidad.

A diferencia de maquina virtual, los contenedores comparten recursos del host, como el kernel y el sistema de archivos, lo que resulta en una huella más pequeña.

## Imágenes

Una **imagen** es un *paquete*, en el que se encuentra una aplicación o servicio y **todo lo necesario** (código, ejecutables, librerías, configuración, etc) para que esta aplicación pueda funcionar.

Un contenedor no es mas que una imagen en funcionamiento.

Es el mismo concepto de un ejecutable. La **imagen es el ejecutable**, y el **contenedor** es cada una de las **instancias** o procesos que hay en funcionamiento. Si has lanzado el ejecutable tres veces, por ejemplo, tendrás tres instancias del ejecutable. Lo mismo, para contenedores, puedes tener tres contenedores corriendo de la misma imagen.

Cuando terminas la ejecución de una instancia de la aplicación esta desaparece, \*\*al detener un contenedor este queda en tu equipo, porque por un lado puedes iniciar el contenedor de nuevo, y en segundo lugar, porque es posible que en el interior de ese contenedor tengas archivos que te sean de utilidad.

## Máquina virtual

Una máquina virtual, también conocida comúnmente como **VM** , es un sistema invitado que se ejecuta sobre un software de virtualización o *hipervisor* .

VirtualBox, VMWare y QEMU son ejemplos de herramientas populares que pueden emular redes, discos y otros recursos de hardware para crear entornos virtualizados que se comportan como computadoras físicas.

Estos entornos están aislados entre sí y del host donde está instalado el software de virtualización, y cada uno ejecuta sistemas operativos distintos.

## Por qué usar Docker

- Docker es rápido a diferencia de una máquina virtual
- Docker es multiplataforma.
- Los contenedores pueden construirse y destruirse más rápido que en una máquina virtual.
- Una vez configurado tu Docker, no tendrás que volver a instalar tus dependencias manualmente.
- Mantendrás tu espacio de trabajo limpio, ya que cada uno de tus entornos estará aislado.
- Será más fácil desplegar tu proyecto en tu servidor para ponerlo en línea.

Puedes continuar con [[instalar docker en linux]] o [[instalar docker en mac]]

## Self hosted

Estas son algunas de las imágenes que puedes desplegar con [[docker compose|docker-compose]]

- [[dozzle]]
- [[flaresolverr]]
- [[gonic]]
- [[jellyfin]]
- [[portainer]]
