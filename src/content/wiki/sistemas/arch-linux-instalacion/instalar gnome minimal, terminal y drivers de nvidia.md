---
title: Instalar Gnome minimal y un terminal
description: "Instalar GNOME minimal en Arch Linux: paquetes esenciales, terminal Alacritty, servicios, drivers Nvidia y configuración"
date: 2024-06-01
mod: 2025-10-25
published: true
tags: [arch-linux, drivers, gnome, linux, nvidia, terminal, tools]
---

# Instalar Gnome minimal y un terminal

## Instalación de gnome

```shell
sudo pacman -S --noconfirm gdm gnome-control-center gnome-session gnome-settings-daemon gnome-shell gnome-keyring nautilus gnome-characters gnome-color-manager gnome-disk-utility gnome-menus gnome-shell-extensions grilo-plugins gvfs gvfs-afc gvfs-dnssd gvfs-goa gvfs-google gvfs-gphoto2 gvfs-mtp gvfs-nfs gvfs-smb loupe sushi tracker3-miners xdg-desktop-portal-gnome xdg-user-dirs-gtk
```

### Instalación de un terminal

Como no hemos elegido la terminal de gnome, instalamos algun emulador de terminal como alacritty.

```shell
sudo pacman -S alacritty
```

### Habilitando servicios

#### Bluetooth

```shell
sudo systemctl start bluetooth.service
sudo systemctl enable bluetooth.service
```

#### GDM

```shell
sudo systemctl enable gdm.service
sudo systemctl start gdm.service
```

## Instalar drivers de Nvidia en Arch Linux

Actualizar el sistema

```bash
sudo pacman -Syyuu && yay -Syyuu
```

### Instalar Xorg y controladores de Nvidia

 
- Instalar Xorg

```bash
sudo pacman -S xorg-server xorg-xinit xorg-apps --noconfirm
```

- Instalar controladores de Nvidia

```bash
sudo pacman -S nvidia nvidia-utils nvidia-settings --noconfirm

```

Reiniciamos el sistema para ver los cambios aplicados.

Setea el monitor primario y las configuraciones que estimes, rotación si tienes vertical, etc…

Abre la terminal y ejecuta esto para copiar la configuración de tu monitor a la carpeta de gdm

```shell
cp ~/.config/monitors.xml ~gdm/.config/
```

Reinicia el sistema y listo.
