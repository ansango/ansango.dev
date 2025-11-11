---
title: Proxmox LXC Networking–Guía Completa
description: Configurar correctamente la red en un contenedor LXC de Proxmox
date: 2025-11-11
mod: 2025-11-11
published: true
tags: [containers, debian, linux, lxc, networking, proxmox]
---

# Proxmox LXC Networking–Guía Completa

## ✅ Objetivo

Configurar correctamente la red en un contenedor **LXC** de Proxmox, resolver el error:

```
ping: connect: Network is unreachable
```

y asegurar que el contenedor accede a Internet y a la LAN.

---

## 📌 Conceptos clave

|Componente|Función|
|---|---|
|**Bridge (vmbr0)**|Interfaz virtual de Proxmox que actúa como "switch" para dar red a VMs/CTs|
|**LXC CT (Contenedor)**|Puede usar IP estática o DHCP, depende del bridge para conectarse|
|**veth**|Interfaz virtual usada por LXC para conectar contenedor ↔ bridge|
|**gateway (gw)**|IP del router local para salir a Internet|

---

## ⚙️ 1. Ver configuración de red del contenedor (desde el host Proxmox)

```bash
pct config <ID>
```

Ejemplo:

```
net0: name=eth0,bridge=vmbr0,firewall=1,hwaddr=BC:24:11:2B:DD:96,type=veth
```

⚠️ Si **no aparece `ip=`**, el contenedor no recibe IP → la red no funcionará.

---

---

## ⚙️ 2. Asignar red al contenedor

### 📡 Opción A: DHCP (recomendado si tu router asigna IPs automáticamente)

```bash
pct set 100 -net0 name=eth0,bridge=vmbr0,firewall=1,type=veth,ip=dhcp
pct restart 100
```

---

### 🧠 Opción B: IP estática

Ejemplo para:

- IP: `192.168.0.19`
- Máscara: `/24`
- Router/Gateway: `192.168.0.1`

```bash
pct set 100 -net0 name=eth0,bridge=vmbr0,firewall=1,type=veth,ip=192.168.0.19/24,gw=192.168.0.1
pct restart 100
```

---

---

## 🧪 3. Comprobar red dentro del contenedor

```bash
ip a
ip route
ping 1.1.1.1
ping google.com
```

✅ Esperado:

- `eth0` debe estar **UP**
- Debe tener una IP
- Debe existir una ruta `default via <gateway>`

Ejemplo correcto:

```
default via 192.168.0.1 dev eth0
```

---

## ⚠️ Problemas comunes y solución

### ❌ eth0 aparece `DOWN`

Levantarla manualmente:

```bash
ip link set eth0 up
```

Si no recibe IP (con DHCP):

```bash
dhclient eth0
```

---

### ❌ No hay gateway

Añadir manualmente (temporal):

```bash
ip route add default via 192.168.0.1
```

---

### ❌ No resuelve dominios (pero sí IPs)

Añadir DNS:

```bash
echo "nameserver 1.1.1.1" > /etc/resolv.conf
```

---

## 🌉 4. Comprobar el bridge desde el host Proxmox

```bash
ip a
brctl show
ping 192.168.0.1
```

`vmbr0` debe estar **UP** y conectado a la interfaz física (ej: `enp2s0`, `eno1`…)

---

## 🔁 5. Reiniciar red del contenedor

Desde el host:

```bash
pct restart 100
```

O desde dentro del CT:

```bash
systemctl restart networking
```

(según distro)

---

## 🧰 Bonus: Fichero de red persistente dentro del CT (Debian/Ubuntu)

Editar:

```bash
nano /etc/network/interfaces
```

Añadir:

```ini
auto eth0
iface eth0 inet dhcp
```

o para IP estática:

```ini
auto eth0
iface eth0 inet static
  address 192.168.0.19/24
  gateway 192.168.0.1
  dns-nameservers 1.1.1.1 8.8.8.8
```

---

## 🧾 Resumen rápido

| Tarea                    | Comando                            |
| ------------------------ | ---------------------------------- |
| Ver red CT               | `pct config 100`                   |
| Asignar DHCP             | `pct set 100 -net0 …,ip=dhcp`      |
| Asignar IP fija          | `pct set 100 -net0 …,ip=X/24,gw=Y` |
| Reiniciar CT             | `pct restart 100`                  |
| Ver IP dentro CT         | `ip a`                             |
| Probar salida a Internet | `ping 1.1.1.1`                     |
