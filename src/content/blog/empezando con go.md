---
title: Empezar un micro con go
description: Empezar a construir un micro en go en minutos
date: 2025-11-12
mod: 2025-11-12
published: false
tags: [backend, go, microservice]
---

# Empezar un micro con go

Hace tiempo que quería empezar a montar alguna cosa con *go* pero tampoco sabía por donde empezar, así que aprovechando que estoy montando mi propio homelab, necesitaba un micro servicio con el que pueda consultar via api mis marcadores de raindrop.

El propósito de este artículo es simplemente montar un microservicio trasladando la generación del contenido de los marcadores de este sitio a un homelab donde estoy centralizando mis servicios.

Ni mucho menos es hacer una review completa del lenguaje ni todas sus herramientas, pero si aprender un 10% y trastear con algo nuevo.

## Instalar go

Desde la [documentación oficial](https://go.dev/doc/install) podemos ver como instalar *go* en linux muy facilmente de la siguiente manera:

```bash
# actualiza el sistema
sudo apt update && sudo apt upgrade -y
# descargamos go (verifica si exite alguna version nueva)
wget https://go.dev/dl/go1.25.4.linux-amd64.tar.gz
# eliminamos instalaciones previas
sudo rm -rf /usr/local/go 
# extraemos los archivos
sudo tar -C /usr/local -xzf go1.25.4.linux-amd64.tar.gz
# configuramos variables de entorno
sudo nano /etc/profile.d/go.sh
# añadimos go al PATH
export PATH=$PATH:/usr/local/go/bin
# guarda y cierra y dale permisos
sudo chmod +x /etc/profile.d/go.sh
# recarga los cambios
source /etc/profile.d/go.sh
# verifica la instalacion
go version
# -> go version go1.25.4 linux/amd64
```

## Crear el proyecto
