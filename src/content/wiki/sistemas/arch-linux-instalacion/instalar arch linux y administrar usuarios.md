---
title: Instalar Arch Linux y administrar usuarios
description: "Instalar Arch Linux con archinstall: configuración del sistema, administración de usuarios, sudo y permisos wheel"
date: 2024-06-01
mod: 2025-10-25
published: true
tags: [arch-linux, installation, linux, sudo, terminal, user, wheel]
---

# Instalar Arch Linux y administrar usuarios

## Instalar Arch Linux desde un usb

En una unidad USB de Arch Linux Live arrancada, abre una terminal y ejecuta el siguiente commando para iniciar el proceso de instalación:

```bash
archinstall
```

1. Archinstall Language - English
2. Mirror region - 'spain' (or your country)
3. Locales - us
4. Disk configuration
	1. Use a best effort defualt partition layout - elige tu disco
	2. Filesystem - ext4
	3. Partition /home - no
5. Disk encryption - none
6. Bootloader - grub-install
7. Swap - true
8. Hostname - arch_ansango
9. Root pass - \*\*\*
10. User account - none
11. Profile - minimal
12. Audio - pipewire
13. Kernels: linux
14. Additional packages - nano git
15. Network configuration - Use Networkmanager
16. Timezone - UTC
17. Automatic Time Sync (NTP) - true
18. Optional repositories - multilib

Would you like to chroot into the newly created installation?

> Yes

## Administrar usuarios en Arch Linux

### Agregar usuario

Aquí simplemente agregaremos un nuevo usuario a nuestro sistema y le daremos acceso a wheel.

- Agregar usuario

```sh
useradd -m -g wheel <your_user>
```

- Crear contraseña para el usuario

```sh
passwd <your_user>
```

### Cambiar a tu usuario

Para cambiar a tu usuario ejecuta el siguiente commando:

```sh
su - <your_user>
```

### Darle acceso a sudo

en usuario root ejecuta el siguiente commando

```sh
EDITOR=nano visudo
```

y descomenta esta línea para que se vea así

```sh
%wheel ALL=(ALL) ALL
```

si no quieres escribir tu contraseña cada vez, haz esto en su lugar

```sh
%wheel ALL=(ALL) NOPASSWD: ALL
```

Inicia sesión en el usuario recién creado

```bash
su - your_user_name
```
