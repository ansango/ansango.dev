---
title: Instalar y configurar Docker en Proxmox
description: Configura rapidamente docker en un contendor lxc de en proxmox
date: 2026-03-25
mod: 2026-03-25
published: true
tags: [docker, lxc, proxmox]
---

# Instalar y configurar Docker en Proxmox

Instalar Docker en un LXC manualmente es un proceso sencillo, para ello configuramos un CT con una imagen de `debian` con los requisitos por defecto, si necesitamos ampliar más podemos hacerlo sin problema. 

Con 4GB de disco, 1 core y 512 de ram podemos empezar sin problema. En Network configuramos el IPv4 en DHCP para que lo autoasigne. Aquí igual, si posteriormente necesitamos fijar la IP y el Gateway podemos hacerlo a posteriori.

Una vez creado el CT, actualizamos el sistema, instalamos sudo y empezamos con la configuración de Docker.

```bash
apt update && apt upgrade -y && apt install sudo
```

```bash
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

```bash
sudo systemctl status docker
```

```bash
sudo systemctl start docker
```
