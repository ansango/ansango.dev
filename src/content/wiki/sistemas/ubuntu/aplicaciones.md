---
title: Aplicaciones en Ubuntu
description: "Aplicaciones recomendadas para Ubuntu: Chrome, Firefox Developer, VS Code, Postman, Robo3T, VLC y herramientas de desarrollo"
date: 2024-05-02
mod: 2025-10-25
published: true
tags: [firefox, herramientas, linux, ubuntu]
---

# Aplicaciones en Ubuntu

## Google Chrome

```bash
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
```

```bash
sudo dpkg -i google-chrome-stable_current_amd64.deb
```

## Firefox Developer Edition

> Para instalar Firefox Developer Edition puedes ver esta [[instalar firefox developer|guía]]

## Htop

Htop es una herramienta que nos permite ver el consumo de recursos de nuestro equipo.

```bash
sudo apt -y install htop
```

## Byobu

Byobu es una herramienta que nos permite crear sesiones de terminal, es decir, podemos tener varias sesiones de terminal abiertas y poder cambiar entre ellas.

```bash
sudo apt -y install byobu
```

## VS Code

```bash
sudo snap install code --classic
```

Lo ideal es utilizar el plugin `Settings Sync` para tener sincronizados todos nuestros plugins de Visual Studio Code, así solo tendremos que descargarlos. O bien habilitar la opción de `Sync: Enable` para que se sincronicen automáticamente.

> Puedes ver una lista de [[plugins para vscode|plugins para VSCode]]

## Postman

Postman es una herramienta que nos permite realizar peticiones HTTP de forma sencilla. Guarda las peticiones que realizamos y nos permite exportarlas a otros formatos.

```bash
sudo snap install postman
```

## Robo 3T

Robo 3T es una herramienta que nos permite gestionar las bases de datos de MongoDB de forma sencilla. También nos permite realizar consultas a las bases de datos.

> Para instalar Robo 3T puedes seguir esta [[instalar mongodb y robo3T]]

Como alternativa a Robo 3T puedes utilizar [MongoDB Compass](https://www.mongodb.com/products/compass), o bien el plugin de [MongoDB para VS Code](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode).

## VLC

VLC es un reproductor de vídeo que soporta la mayoría de formatos de vídeo.

```bash
sudo snap install vlc
```

## Spotify

```bash
sudo snap install spotify
```

## Balena Etcher

Balena Etcher es una herramienta que nos permite grabar imágenes ISO. Es muy útil para grabar imágenes de sistemas operativos.

Descarga la última versión de Balena Etcher [aquí](https://www.balena.io/etcher/).

## Transmission

Transmission es un cliente de BitTorrent que nos permite descargar torrents de forma sencilla.

```bash
sudo apt install transmission
```

## Ghostwriter

Si quieres escribir markdown sin distracciones aquí tienes un editor genial que te ayudará a prescindir de editores

```bash
sudo add-apt-repository ppa:wereturtle/ppa
sudo apt update
sudo apt install ghostwriter
```
