**GUÍA DEFINITIVA, paso a paso**, para montar:

* **OPNsense en Proxmox**
* **AdGuard Home como DNS global**
* **Forzar todo el tráfico DNS**
* **Que el router Lowi NO estorbe**
* **Que todos los dispositivos usen AdGuard sin configurarlos uno a uno**

# 🟥 **PARTE 1 — Crear la red interna en Proxmox (LAN)**

OPNsense necesita una red separada del router Lowi para actuar como router real.
Por eso crearemos un **bridge interno** llamado `vmbr1`.

## **Paso 1.1 — Abrir la configuración de red en Proxmox**

En la interfaz web:

```
Datacenter → (tu nodo Proxmox) → System → Network
```

## **Paso 1.2 — Crear Linux Bridge (vmbr1)**

Arriba → **Create** → **Linux Bridge**

Configurar así:

| Campo        | Valor   |
| ------------ | ------- |
| Name         | `vmbr1` |
| IPv4/CIDR    | *vacío* |
| IPv6         | none    |
| Bridge ports | *vacío* |
| Autostart    | ✔       |

**Guardar → Aceptar → Apply Configuration.**

> Este bridge será la **LAN interna** donde vivirán OPNsense, AdGuard y tus dispositivos virtuales.

---

# 🟥 **PARTE 2 — Crear e instalar OPNsense en Proxmox**

Necesitas la ISO de OPNsense (descargada previamente).

## **Paso 2.1 — Crear VM para OPNsense**

En Proxmox:

```
Create VM
```

### **Pestaña 1 → General**

* Name: `OPNsense`
* ISO: seleccionar la ISO de OPNsense

### **Pestaña 2 → System**

Dejar valores por defecto.

### **Pestaña 3 → Hard Disk**

* Bus/Device: **VirtIO**
* Disk size: **20GB**
* Cache: write back (opcional)

### **Pestaña 4 → CPU**

* Sockets: 1
* Cores: **2**
* Type: host

### **Pestaña 5 → Memory**

* RAM: **2048 MB**
* Ballooning: desactivado

### **Pestaña 6 → Network**

* **NIC 1**

  * Bridge: `vmbr0`
  * Name: `net0`

Haz clic en **Add** para añadir la 2ª NIC:

* **NIC 2**

  * Bridge: `vmbr1`
  * Name: `net1`

Finalizar.

---

# 🟥 **PARTE 3 — Configuración inicial desde la consola**

Arranca la VM.
Espera a que OPNsense cargue.

## **Paso 3.1 — Identificar WAN y LAN**

OPNsense detectará así:

* `em0` = conectado a `vmbr0` → WAN (router Lowi)
* `em1` = conectado a `vmbr1` → LAN

Si te lo pregunta, selecciona:

```
WAN: em0
LAN: em1
```

## **Paso 3.2 — Asignar IP de LAN**

Cuando pregunte si quieres configurar LAN IP:

**YES**

Rellena así:

* IP Address: `10.0.0.1`
* Subnet mask: `24` (para /24)
* Upstream Gateway: *vacío*
* IPv6: none
* DHCP server: NO (lo activaremos desde GUI)
* HTTP/HTTPS: habilita HTTPS

Termina.

La consola mostrará:

```
LAN: https://10.0.0.1
```

Perfecto.

---

# 🟥 **PARTE 4 — Acceso a la interfaz web de OPNsense**

En un PC, desde la red LAN interna (o desde consola Proxmox → opción 8 para habilitar GUI temporal), abre:

```
https://10.0.0.1
```

Ignora el aviso de certificado no seguro.

Entrar con:

```
User: root
Pass: opnsense
```

---

# 🟥 **PARTE 5 — Configurar DHCP en OPNsense**

En menú:

```
Services → DHCPv4 → LAN
```

Configura:

* Enable: ✔
* Range:

  ```
  10.0.0.100 – 10.0.0.200
  ```
* DNS servers:

  ```
  10.0.0.1 (temporalmente)
  ```
* Gateway:

  ```
  10.0.0.1
  ```

Guardar.

> Esto ya convierte OPNsense en un servidor DHCP completo.

---

# 🟥 **PARTE 6 — Crear el contenedor AdGuard Home**

## **Paso 6.1 — Crear LXC en Proxmox**

En Proxmox:

```
Create CT
```

### **General**

* Hostname: `adguard`
* Template: Debian 12

### **Root Disk**

8GB es suficiente.

### **CPU**

1 core

### **Memory**

1024 MB

### **Network**

* Bridge: `vmbr1`
* IPv4: Static
* IP: `10.0.0.2/24`
* Gateway: `10.0.0.1`

Crear.

## **Paso 6.2 — Instalar AdGuard**

Entra por consola:

```bash
apt update && apt upgrade -y
apt install curl -y
curl -s -S -L https://static.adguard.com/adguardhome/release/AdGuardHome_linux_amd64.tar.gz -o adguard.tar.gz
tar -xvf adguard.tar.gz
cd AdGuardHome
./AdGuardHome -s install
```

Accede al setup inicial:

```
http://10.0.0.2:3000
```

Configura:

* DNS ports: 53
* Admin: como quieras

---

# 🟥 **PARTE 7 — Integrar DNS: OPNsense → AdGuard**

En OPNsense:

```
Services → DHCPv4 → LAN
```

Cambia DNS servers a:

```
10.0.0.2
```

Guardar.

> Ahora cualquier dispositivo que obtenga DHCP usará AdGuard automáticamente.

---

# 🟥 **PARTE 8 — NAT DNS Redirection (Forzar DNS para todos los dispositivos)**

Así evitas que:

* móviles Android usen 8.8.8.8
* televisores usen DNS del fabricante
* IoT ignore tu DNS

### Ir a:

```
Firewall → NAT → Port Forward → Add
```

Configura:

| Campo                | Valor    |
| -------------------- | -------- |
| Interface            | LAN      |
| Protocol             | TCP/UDP  |
| Source               | LAN net  |
| Destination          | any      |
| Destination port     | 53       |
| Redirect target IP   | 10.0.0.2 |
| Redirect target port | 53       |
| NAT reflection       | Disable  |

Guardar → Apply.

**Resultado:**
Todo el tráfico DNS de tu red se fuerza a pasar por AdGuard, sin excepción.

---

# 🟥 **PARTE 9 — Integrar la red física**

## **Qué hacer físicamente**

Tu router Lowi queda así:

* Sigue dando internet al puerto WAN del Proxmox (vmbr0).
* NO controla DHCP (queda ignorado).
* NO controla DNS.

Tu LAN real debe conectarse a la LAN del OPNsense.

### Si tu N100 tiene más de un puerto Ethernet:

* WAN → puerto 1 conectado al router Lowi
* LAN → puerto 2 conectado a un switch → todos tus dispositivos van ahí

### Si tu N100 solo tiene 1 puerto Ethernet:

* Se usa VLAN trunking o un adaptador USB3–Ethernet (funciona perfecto)
* O lo más simple:

  * Conectar el router Lowi → Proxmox
  * Conectar un switch después del puerto del Proxmox que representa LAN
    (puedo ayudarte a dibujarlo según tu hardware)

---

# 🟢 **RESULTADO FINAL**

Toda tu red pasa por:

```
Router Lowi (solo modem)
      ↓
Proxmox
      ↓
OPNsense (router real)
      ↓
AdGuard (DNS global)
      ↓
Dispositivos conectados a LAN
```

* Sin tocar el router Lowi
* Sin configurar cada dispositivo
* DNS unificado
* Control total de tu red

