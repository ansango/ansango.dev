---
title: Listar paquetes
description: description
date: 2024-05-09
mod: 2025-10-25
published: true
tags: [arch-linux, linux, operating-system, package-manager, yay]
---

# Listar paquetes

## Buscar un paquete

Buscar un paquete con **yay** es tan sencillo como escribir el nombre del paquete o algunas palabras clave después de **yay** y él buscará esos terminios y presentará una lista de coincidencias.

```shell
yay searchterm
```

El resultado será una lista numerada paquetes para que podamos seleccionar cuales queremos instalar. Con tan solo escribir el número del paquete que queramos, **yay** lo seleccionará y lo instalará.

Para buscar un paquete tanto en los repositorios oficiales como en AUR, use el indicador -Ss:

```shell
yay -Ss google-chrome
```

## Listar los paquetes instalados desde **AUR**

```shell
$ yay -Qqm 
```
