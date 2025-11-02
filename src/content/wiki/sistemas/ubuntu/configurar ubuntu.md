---
title: Configurar Ubuntu
description: "Configurar Ubuntu 22.04: Git, fuentes, zsh, powerlevel10k, NVM, MongoDB y personalización del escritorio"
date: 2024-05-02
mod: 2025-10-25
published: true
tags: [fonts, git, linux, node, settings, ubuntu, zsh]
---

# Configurar Ubuntu

> Esta configuración está probada en la versión 22.04

## Actualización de repositorios

```bash
sudo apt update
```

```bash
sudo apt -y upgrade
```

## Instalación de Git

```bash
sudo apt -y install git
```

## Soporte para exFAT

Si estamos en una versión inferior a Ubuntu 22.04 necesitaremos instalar el soporte para exFAT

```bash
sudo apt -y install exfat-fuse exfat-utils
```

Si estamos en Ubuntu 22.04 o superior `exfat-utils` ha sido sustituido por `exfat-propgs`

```bash
sudo apt install exfatprogs
```

## Instalación de fuentes

### Powerline

Fonts Powerline es una colección de fuentes que nos permiten utilizar símbolos especiales en la terminal.

```bash
sudo apt -y install fonts-powerline
```

### FiraCode

FiraCode es una fuente de código que nos permite utilizar ligaduras en la terminal.

```bash
sudo apt -y install fonts-firacode
```

## Instalación y configuración de `zsh`

### `curl`

Si no lo tenemos instalado, lo instalamos

```bash
sudo apt -y install curl
```

### `zsh`

Después instalamos `zsh`

```bash
sudo apt -y install git-core zsh
```

```bash
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

Accede al archivo de configuración de `zsh`

```bash
nano ~/.zshrc
```

Busca la variable `ZSH_THEME` y actualiza el valor a `agnoster`. Debería quedarte algo así:

```bash
# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH="/home/ansango/.oh-my-zsh"

# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="agnoster"

```

Guarda el anterior archivo y a continuación hacemos `zsh` nuestra terminal por defecto

```bash
chsh -s $(which zsh)
```

Necesitaremos reiniciar la sesión para que `zsh` sea nuestra terminal predeterminada.

### `powerlevel10k`

`powerlevel10k` es un tema para `zsh` que nos permite personalizar la terminal. Ejecutmamos el siguiente commando para instalarlo:

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

Abrimos el archivo de configuración de `zsh` de nuevo:

```bash
nano ~/.zshrc
```

Buscamos la variable `ZSH_THEME` y actualizamos el valor a `powerlevel10k/powerlevel10k`:

```bash
ZSH_THEME="powerlevel10k/powerlevel10k"
```

Abre un nuevo terminal, y deberías ver que el tema. Si el asistente de configuración p10k no se inicia automáticamente, puedes ejecutarlo con:

```bash
p10k configure
```

## Node Version Manager

NVM es un gestor de versiones de Node.js, nos permite instalar y cambiar entre diferentes versiones de Node.js.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash
```

Abrimos el archivo configuración de `zsh` de nuevo:

```bash
nano ~/.zshrc
```

Copiamos y pegamos al final del archivo el siguiente código:

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

Necesitaremos reiniciar la sesión para que `nvm` funcione

### Instalar Node.js

Podemos obtener el listado de todas las versiones con:

```bash
nvm ls-remote
```

Para instalar `Node.js` y `npm` simplemente ejecutamos:

```bash
nvm install --lts # Para instalar la última versión de larga duración
```

## Instalación de MongoDB

> Para instalar MongoDB puedes seguir [[instalar mongodb y robo3T]]

##vDashboard

Have tiempo utilizaba OSX y me encantaba la interfaz gráfica, básicamente por el Dock y Mission Control. Pero puedes configurar tu distribución de Ubuntu para que tenga esas funcionalidades.

### Dconf Editor

Dconf Editor es una herramienta que nos permite editar la configuración de Gnome, para ello ejecutamos:

```bash
sudo apt -y install dconf-editor
```

Podremos configurar a mano el Dock por ejemplo. Entramos en Dconf Editor y accedemos a la siguiente ruta para customizar a nuestro gusto el Dock en Ubuntu:

```bash
org/gnome/shell/extensions/dash-to-dock
```

### Gnome Tweaks

Gnome Tweaks es una herramienta que nos permite personalizar la interfaz gráfica de Ubuntu, para ello ejecutamos:

```bash
sudo apt -y install gnome-tweaks
```

### Custom Hot Corners Extended

Custom Hot Corners Extended es una extensión que nos permite configurar las acciones que se lanzan al poner el puntero en cada esquina de la pantalla.

```bash
wget https://github.com/G-dH/custom-hot-corners-extended/releases/latest/download/custom-hot-corners-extended@G-dH.github.com.zip
```

```bash
gnome-extensions install --force custom-hot-corners-extended@G-dH.github.com.zip
```

Puedes seguir con las [[aplicaciones|aplicaciones recomendadas para Ubuntu]], [[restaurar drivers nvidia]], [[restaurar touchpad]].
