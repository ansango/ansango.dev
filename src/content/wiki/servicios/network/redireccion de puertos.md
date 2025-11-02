---
title: Redirección de puertos
description: "Redirección de puertos en router: averiguar IPs privada y pública, acceder al router, configurar redirección TCP y aplicación de cambios"
date: 2024-12-17
mod: 2025-10-25
published: true
tags: [network, ports, router]
---

# Redirección de puertos

## Averiguamos Ips

Para usar el comando `ifconfig` necesitaremos tener le paquete net-tools instalado

```bash
# en Arch no está instalado por defecto
sudo pacman -S net-tools
```

## Averiguar ips privada y publica para conexiones

```bash
# ip privada
ifconfig
# inet 192.168.0.21
```

```bash
# ip publica
curl ifconfig.me
# 2.154.115.243
```

## Acceder al router

```
http://192.168.0.1/
```

El usuario y el pass normalmente están en la parte posterior del router.

## Redirección de puertos

Hay que entrar en la sección de redireccion de puertos y agregar lo siguiente:

- Nombre del servicio: xxx
- Dispositivo: (tu maquina)
- LAN IP: 192.168.0.21
- Protocolo: TCP
- Tipo: Puerto
- Puerto Publico: (8080) (el que sirva tu aplicacion)
- Puerto Lan: (8080) (el que sirva tu aplicacion)

Guardamos y aplicamos en el router
