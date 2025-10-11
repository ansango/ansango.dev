---
title: Instalar docker en linux
description: "description"
draft: false
date: 2024-12-17
mod: 2025-08-28
published: true
order: 0
tags: [arch, docker, linux, sysadmin, ubuntu]
---

# Instalar docker en linux

## Instalación en Arch Linux

Antes de nada actualizamos repositorios:

```bash
sudo pacman -Syy
```

Instalamos Docker:

```bash
sudo pacman -S docker
```

Posteriormente iniciamos Docker y lo habilitamos para que se inicie al reiniciar el sistema:

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

Y comprobamos la versión de docker y si está instalado

```bash
docker -v
```

## Instalación en Ubuntu

```bash
sudo apt update
```

```shell
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

```shell
sudo usermod -aG docker <username>
```

Cerramos sesión y volvemos a iniciar

```shell
docker -v
docker run hello-world
```

### Problemas

Si después de lo anterior al ejecutar `docker-compose --version`, aparece el siguiente log:

```bash
[6283] Error loading Python lib '/tmp/_MEIZv22hT/libpython3.7m.so.1.0': dlopen: libcrypt.so.1: cannot open shared object file: No such file or directory
```

Prueba a ejecutar lo siguiente

```shell
cd /usr/lib
sudo ln ./libcrypt.so libcrypt.so.1
docker-compose -v
```

## Añadir usuario en Docker

Creamos el grupo docker:

```bash
sudo groupadd docker
```

Añadimos al usuario:

```bash
sudo usermod -aG docker $USER
```

### Problemas

```shell
docker: permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Head "http://%2Fvar%2Frun%2Fdocker.sock/_ping": dial unix /var/run/docker.sock: connect: permission denied. See 'docker run --help'.
```

Checkea los permisos

```shell
ls -l /var/run/docker.sock
```

Si no sale root en docker.sock, tendremos que ajustarlo:

```shell
sudo chmod 666 /var/run/docker.sock
```

Reiniciamos docker

```shell
sudo systemctl restart docker
```

Y volvemos a probar

```bash
docker run hello-world
```

Puedes ver como instalar y levantar imagenes de docker con [[docker compose]].
