---
title: Diagnóstico y solución de problemas de red
description: descripcion
date: 2025-11-11
mod: 2025-11-11
published: false
tags: [debian, fix, linux, network, proxmox]
---

# Diagnóstico y solución de problemas de red

---

## Introducción

Cuando Proxmox o Debian no es accesible por red, aunque el servidor tenga IP configurada, el problema casi siempre está relacionado con:

- La interfaz física (NIC) que no tiene link
- El bridge (`vmbr0`) mal configurado
- Firewall o aislamiento de red
- Naming de interfaces "predictable network names" que cambia entre hardware

Esta guía explica cómo **diagnosticar paso a paso y corregir problemas de red** en Proxmox.

---

## Comprobaciones iniciales

1. Ver si la interfaz física y el bridge existen:

```bash
ip link
```

- `state UP` → la interfaz está activada
- `LOWER_UP` → hay enlace físico (cable, switch/router correcto)
- Si `state DOWN` y `LOWER_UP` no aparece → NIC inactiva o cable/puerto desconectado

1. Comprobar conectividad desde otro equipo en la misma LAN:

```bash
ping <IP_SERVIDOR>
nc -zv <IP_SERVIDOR> 8006
```

1. Verificar que Proxmox está escuchando en el puerto 8006:

```bash
ss -tulpn | grep 8006
```

---

## Diagnóstico de la interfaz física

1. Lista todas las interfaces:

```bash
ip link
```

- Identifica la interfaz física real por **LOWER_UP** y/o luces del puerto
- Ignora las interfaces virtuales (`vmbr0`, `tap`, `veth`)

1. Si no hay luz en el puerto:

- Revisa el cable
- Cambia de puerto en el switch/router
- Comprueba `ethtool <INTERFAZ>`:

```bash
ethtool emp3s0
# Output esperado: Link detected: yes
```

1. Si la interfaz está DOWN pero el cable funciona, se debe **levantar la interfaz**:

```bash
ip link set <INTERFAZ> up
```

---

## Problemas comunes y soluciones

|Problema|Síntoma|Solución|
|---|---|---|
|Interfaz física incorrecta en la configuración|Puertos se apagan al arrancar Proxmox|Identificar la NIC real con `ip link` y usarla en `bridge-ports`|
|NIC está DOWN|No hay enlace, `ping` falla|`ip link set <INTERFAZ> up` y revisar cables/puertos|
|Bridge mal configurado|IP configurada pero no hay acceso|Configurar `/etc/network/interfaces` correctamente|
|Firewall bloqueando puertos|`nc` o ping fallan|Revisar reglas de iptables/ufw|
|Naming predictible confuso|Configuración usa `enp3s0` pero la interfaz real es `emp3s0`|Revisar `ip link` para identificar la NIC correcta|

---

## Configuración correcta de un bridge (`vmbr0`)

Ejemplo de configuración funcional en `/etc/network/interfaces`:

```text
auto lo
iface lo inet loopback

auto <INTERFAZ_REAL>
iface <INTERFAZ_REAL> inet manual

auto vmbr0
iface vmbr0 inet static
    address 192.168.0.22/24
    gateway 192.168.0.1
    bridge-ports <INTERFAZ_REAL>
    bridge-stp off
    bridge-fd 0
```

- `<INTERFAZ_REAL>` → la interfaz física detectada con `LOWER_UP`
- `bridge-ports` → **siempre** la NIC física, no otra que no exista
- `vmbr0` → interfaz que Proxmox usará para la IP de management y VMs

---

## Comprobaciones finales

1. Reiniciar red:

```bash
systemctl restart networking
```

1. Verificar estado de la interfaz y el bridge:

```bash
ip link show <INTERFAZ_REAL>
ip link show vmbr0
```

- Debe mostrar `state UP … LOWER_UP` en la interfaz física
- `vmbr0` debe estar `UP … LOWER_UP` y con la IP asignada
    

1. Comprobar conectividad desde otro equipo:

```bash
ping 192.168.0.22
nc -zv 192.168.0.22 8006
```

1. Abrir Proxmox en navegador:

```
https://192.168.0.22:8006
```

---

## Tips y buenas prácticas

- Siempre revisa el **nombre real de la interfaz** con `ip link`, no confíes en nombres predeterminados (`enp3s0`, `enp2s0`, etc.)
- Mantén un **cable y puerto de prueba** disponibles para descartar fallos físicos
- Documenta tus IPs y bridges para cada servidor
- Si tienes múltiples NICs, etiqueta cada cable en el rack
- Antes de tocar `/etc/network/interfaces`, haz un **backup**:

```bash
cp /etc/network/interfaces /etc/network/interfaces.bak
```

- Para problemas recurrentes de NIC que se apaga al arrancar, revisa el **firmware de la tarjeta de red** o el **driver** en Proxmox

---

✅ Con esta guía puedes diagnosticar y arreglar cualquier problema de red en Proxmox o Debian, desde interfaces físicas hasta bridges mal configurados.
