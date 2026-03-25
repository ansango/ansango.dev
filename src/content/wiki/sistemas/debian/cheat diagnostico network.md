---
title: Debian Network Quick Cheat Sheet
description: Chuleta para el diagnóstico y solución de problemas de red
date: 2025-11-11
mod: 2026-03-25
published: true
tags: [cheatsheet, debian, linux, network, proxmox]
---

# Debian Network Quick Cheat Sheet

Aquí podrás ver un resumen de la wiki [[diagnostico de problemas de red]], para revisar y solucionar los problemas que tengas de una pasada. Si necesitas aclarar conceptos puedes acceder al enlace anterior para mayor explicación.

---

## 1️⃣ Ver interfaces y estado

```bash
ip link
```

- `state UP` → interfaz levantada
- `LOWER_UP` → enlace físico activo
- Observa luces en el puerto Ethernet

---

## 2️⃣ Identificar la NIC física real

```bash
ip link
# Busca la interfaz con LOWER_UP y luces encendidas
```

- Ejemplo: `emp3s0`
- Ignora bridges y taps (`vmbr0`, `tapXXXX`, `vethXXXX`)

---

## 3️⃣ Comprobar conectividad desde otro equipo

```bash
ping <IP_SERVIDOR>
nc -zv <IP_SERVIDOR> 8006
```

- `ping` falla → NIC no tiene enlace o red incorrecta
- `nc` se queda colgado → firewall o puente mal configurado
- `nc` succeed → puerto accesible

---

## 4️⃣ Comprobar Proxmox escucha en el puerto 8006

```bash
ss -tulpn | grep 8006
```

---

## 5️⃣ Revisar NIC física y link

```bash
ethtool <INTERFAZ_REAL>
```

- `Link detected: yes` → cable/puerto OK
- `Link detected: no` → revisar cable y switch/router

---

## 6️⃣ Levantar interfaz manualmente

```bash
ip link set <INTERFAZ_REAL> up
```

---

## 7️⃣ Configuración correcta del bridge

`/etc/network/interfaces`:

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

- `<INTERFAZ_REAL>` → NIC detectada con `LOWER_UP`
- `vmbr0` → interfaz que usa Proxmox para IP management

---

## 8️⃣ Reiniciar red 

```bash
systemctl restart networking
# o
reboot
```

---

## 9️⃣ Comprobaciones finales

```bash
ip link show <INTERFAZ_REAL>
ip link show vmbr0
ping <IP_SERVIDOR>
nc -zv <IP_SERVIDOR> 8006
```

- Debe mostrar `UP` y `LOWER_UP`
- `ping` y `nc` deben funcionar
- Abrir navegador: `https://<IP_SERVIDOR>:8006`

---

## 🔧 Tips rápidos

- Siempre verifica **nombre real de la NIC**
- Mantén cables y puertos de prueba
- Backup de `/etc/network/interfaces` antes de tocarlo:

```bash
cp /etc/network/interfaces /etc/network/interfaces.bak
```

- Para problemas recurrentes de NIC al arrancar → revisar **driver o firmware**
    

---

Esto lo puedes imprimir o tener abierto en tu portátil cuando trabajes con servidores Proxmox, y resuelve problemas de red **rápido y seguro**.
