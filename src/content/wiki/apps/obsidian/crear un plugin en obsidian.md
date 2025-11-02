---
title: Crear un plugin en Obsidian
description: description
date: 2024-05-26
mod: 2025-10-14
published: true
tags: [javascript, obsidian, plugins]
---

# Crear un plugin en Obsidian

> Antes de comenzar crea un nuevo `vault`, ya que los plugins pueden causar cambios no deseados en tu `vault`.

## Descarga el plugin de muestra

1. Abre una terminal y cambia al directorio de tu `vault`.

```shell
cd path/to/vault
mkdir .obsidian/plugins
cd .obsidian/plugins
```

1. Clona el plugin de muestra usando Git.

```shell
git clone https://github.com/obsidianmd/obsidian-sample-plugin.git
```

## Construye el plugin

Navega al directorio del plugin, instala las dependencias y ejecuta el script de desarrollo.

```shell
cd obsidian-sample-plugin
npm install
npm run dev
```

## Habilita el plugin

1. Abre Obsidian y ve a `Settings` > `Community plugins`. 

2. Activa los `Community plugins`.

3. Bajo `Installed plugins`, activa el `Sample Plugin` seleccionando el botón de activación.

4. Ahora estás listo para usar el plugin en Obsidian.

### Actualiza el manifiesto

Aquí podremos cambiar el nombre del plugin actualizando el archivo `manifest.json`.

Cada vez que hagas cambios tienes que recargar Obsidian para ver los cambios.

### Hot reload

Clona el siguiente repositorio en tu carpeta de plugins:

```shell
git clone https://github.com/pjeby/hot-reload.git
``` 

Habilita el plugin en Obsidian y recarga automáticamente los cambios en tu plugin sin tener que reiniciar Obsidian.
