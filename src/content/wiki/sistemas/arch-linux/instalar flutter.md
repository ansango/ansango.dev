---
title: Instalar Flutter en Arch Linux
description: "Instalar Flutter en Arch Linux: instalación con snap, configuración de Chrome, JDK, Android Studio y licencias"
date: 2024-05-02
mod: 2025-10-25
published: true
tags: [arch-linux, flutter, linux, snap]
---

# Instalar Flutter en Arch Linux

Para instalar Flutter en Arch Linux, sin mucho dolor, he optado por la instalación recomendada en la documentación que es mediante snap. Para ello deberemos instalar [[instalar snap|snap]]

## Instalar `flutter`

Instalamos `flutter` mediante `snap`

```bash
sudo snap install flutter --classic
```

Comprobamos que `flutter` está instalado

```bash
flutter sdk-path
```

Comprobamos que `flutter` está funcionando

```bash
flutter doctor
```

mEl commando `flutter doctor` nos mostrará los requisitos que necesitamos para poder desarrollar con `flutter`. En los siguientes apartados veremos como instalar las issues que seguramente nos aparezcan.

## Configurar Google Chrome

Yo he instalado Chrome con Yay entonces lo que he hecho es crear un enlace simbólico para que Flutter lo detecte.

```bash
sudo ln -s /usr/bin/google-chrome-stable /usr/local/bin/google-chrome
```

## Instalar `jdk`

```bash
sudo pacman -sS java | grep jdk
```

```bash
sudo pacman -S jdk-openjdk
```

## Instalar `android-studio`

```bash
git clone https://aur.archlinux.org/android-studio.git
```

```bash
cd android-studio
```

```bash
makepkg -si
```

Abrir `android-studio` e instalar dependencias por defecto. Una vez instaladas seleccionamos `Projects` y luego `More Actions -> SDK Manager`.

En Android SDK seleccionamos la pestaña `SDK Tools` y seleccionamos la opción `Android SDK Command-line Tools (latest)`.

Le damos a `Apply`, se instalará y luego le damos a `Finish` y `OK`.

## Licencias de Android

Por último, aceptamos las licencias de Android

```bash
flutter doctor --android-licenses
```
