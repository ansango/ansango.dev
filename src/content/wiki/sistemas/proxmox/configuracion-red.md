---
title: Guía de Configuración de Red en Proxmox VE
description: "Configuración de red en Proxmox: Linux Bridge, Open vSwitch, bonding, VLANs y escenarios de red"
date: 2025-09-03
mod: 2025-10-25
published: true
tags: [bonding, bridge, linux-bridge, nat, networking, proxmox, red, routing, vlan, vswitch]
---

# Guía de Configuración de Red en Proxmox VE

La configuración de red en Proxmox VE es un aspecto fundamental para el correcto funcionamiento de las máquinas virtuales (VMs) y contenedores. A continuación, se presenta una guía con los conceptos y escenarios de configuración más comunes.

## Conceptos Clave de Redes en Proxmox

Proxmox gestiona las redes a nivel de cada nodo del clúster. La configuración se puede realizar a través de la interfaz web (GUI) o editando manualmente el archivo `/etc/network/interfaces`. Se recomienda usar la GUI para minimizar errores. Los cambios no se aplican directamente, sino que se guardan en un archivo temporal (`/etc/network/interfaces.new`), permitiendo una revisión antes de aplicar la configuración.

**Componentes principales:**

- **Linux Bridge:** Es un conmutador (switch) virtual implementado por software. Permite que las VMs compartan una única interfaz de red física, comportándose como si estuvieran conectadas directamente a la red local. Por defecto, Proxmox crea un bridge llamado `vmbr0` conectado a la primera interfaz de red del servidor.
- **Open vSwitch (OVS):** Es una alternativa más avanzada al Linux Bridge, con funcionalidades adicionales como QoS (Calidad de Servicio) y mejor soporte para VLANs. OVS puede ofrecer un mayor rendimiento en entornos con alta carga de red o un gran número de VMs.
- **Bonding (Agregación de Enlaces):** Permite agrupar dos o más interfaces de red físicas para que funcionen como una sola. Esto puede usarse para aumentar el ancho de banda o para proporcionar tolerancia a fallos.
- **VLAN (Red de Área Local Virtual):** Permite segmentar el tráfico de red, aislando grupos de VMs en diferentes redes lógicas aunque compartan la misma infraestructura física.

## Escenarios de Configuración de Red

La elección de la configuración de red depende de la infraestructura y los requisitos específicos. Los tres modelos principales son:

### 1. Red en Puente (Bridged Networking)

Es la configuración predeterminada y más común.

- **Funcionamiento:** Las VMs se conectan a un bridge (como `vmbr0`) que está enlazado a una interfaz de red física del host Proxmox. Esto hace que las VMs aparezcan en la red local como si fueran dispositivos físicos independientes, obteniendo su propia dirección IP del servidor DHCP de la red.
- **Uso ideal:** Para redes locales (LAN) donde las VMs necesitan ser accesibles directamente desde otros dispositivos en la misma red.
- **Configuración:**
    1. Desde la interfaz web, vaya a `Centro de datos > Nodo > Sistema > Red`.
    2. Por defecto, `vmbr0` ya estará creado y enlazado a la interfaz de red principal.
    3. Al crear una VM o contenedor, simplemente seleccione `vmbr0` como la interfaz de red.

### 2. Enmascaramiento (NAT - Network Address Translation)

Esta configuración se utiliza cuando se dispone de una única dirección IP pública y se necesita dar acceso a internet a múltiples VMs.

- **Funcionamiento:** Las VMs se conectan a un bridge separado (por ejemplo, `vmbr1`) que no está enlazado a una interfaz física. El host Proxmox actúa como un router, utilizando `iptables` para "enmascarar" el tráfico de las VMs, que salen a internet usando la IP del host.
- **Uso ideal:** Para aislar las VMs de la red local o cuando las direcciones IP públicas son limitadas.
- **Configuración básica:**
    1. Cree un nuevo Linux Bridge (ej. `vmbr1`) sin asignarle un puerto de puente físico, pero sí una dirección IP y máscara de subred (ej. `10.10.10.1/24`).
    2. Habilite el reenvío de IP en el host Proxmox.
    3. Configure reglas de `iptables` para enmascarar el tráfico que sale de la red interna de las VMs.

### 3. Red Enrutada (Routed Networking)

Es una configuración más compleja, utilizada habitualmente por proveedores de hosting.

- **Funcionamiento:** El tráfico de las VMs se enruta a través del host Proxmox, pero sin usar NAT. Cada VM tiene su propia IP pública.
- **Uso ideal:** Cuando el proveedor de red asigna un bloque de IPs públicas para ser utilizadas por las VMs.

## Pasos Generales para la Configuración

1. **Acceder a la configuración de red:** En la interfaz web de Proxmox, seleccione el nodo y vaya a la pestaña `Sistema > Red`.
2. **Crear un Bridge, Bond o VLAN:** Utilice los botones "Crear" para añadir nuevos componentes de red según sus necesidades.
    - Para un **Bridge**, asígnele un nombre (ej. `vmbr1`) y, si es para acceso externo, un puerto físico (ej. `eth1`).
    - Para un **Bond**, seleccione las interfaces de red esclavas y el modo de balanceo (ej. `802.3ad` para LACP o `active-backup` para tolerancia a fallos).
    - Para una **VLAN**, se crea sobre una interfaz existente añadiendo un punto y el número de la VLAN al nombre (ej. `eno1.50`).
3. **Asignar red a las VMs:** Al crear o editar una VM, en la pestaña de "Red", seleccione el bridge apropiado (ej. `vmbr0`, `vmbr1`) y, si aplica, especifique la etiqueta de VLAN.
4. **Aplicar cambios:** Después de realizar modificaciones en la configuración de red del nodo, es necesario hacer clic en "Aplicar configuración" para que los cambios surtan efecto.
