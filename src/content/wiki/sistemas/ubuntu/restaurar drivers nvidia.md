---
title: Restaurar drivers Nvidia
description: "Restaurar drivers Nvidia en Ubuntu: búsqueda de controladores, instalación de repositorios y configuración"
date: 2024-05-02
mod: 2025-10-25
published: true
tags: [drivers, linux, nvidia, ubuntu]
---

# Restaurar drivers Nvidia

## Buscar el controlador

En primer lugar, busca qué controlador necesitas. ¿Cómo lo averiguas? Consultando según el modelo de tarjeta que tengas y seleccionando obviamente la opción de *Linux 64-bit* en **Sistema Operativo** [aquí](https://www.nvidia.es/Download/index.aspx?lang=es).

Es recomendable utilizar en **Tipo de descarga** la opción de *Rama de producción*, que suele set la versión ya testeada y que da menos problemas.

En mi caso tengo una GeForce GTX 1060, así que seleccionaría estas opciones:

- Tipo de producto: GeForce
- Series del producto: GeForce 10 Series
- Familia del producto: GeForce 1060
- Sistema operativo: Linux 64-bit
- Tipo de descarga: Rama de producción
- Idioma: Español (España)

A continuación le damos a buscar, y podremos descargarlo, pero si no te apetece ejecutar un .run, es más fácil quedarnos con el número de versión del driver. En mi caso la **470.63.01**

## Instalar repositorios y reiniciar

Abrimos un terminal y ejecutamos:

```bash
sudo add-apt-repository ppa:graphics-drivers/ppa
sudo apt update
sudo apt install nvidia-driver-470
```

Después de la instalación reiniciamos, y ya deberíamos tener aplicado el controlador de nuevo.

```bash
# Guarda cambios de lo que tengas abierto antes!
sudo reboot
```
