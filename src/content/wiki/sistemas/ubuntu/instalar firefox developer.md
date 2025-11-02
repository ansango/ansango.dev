---
title: Instalar Firefox Developer en Ubuntu
description: "Instalar Firefox Developer Edition en Ubuntu: descarga, permisos, configuración PATH y acceso directo"
date: 2024-05-02
mod: 2025-10-25
published: true
tags: [firefox, linux, ubuntu]
---

# Instalar Firefox Developer en Ubuntu

## Descarga

Descarga el archivo `.tar` de [Mozilla](https://www.mozilla.org/en-US/firefox/developer/). Ten en cuenta el nombre del archivo `.tar` porque cambia con cada actualización.

Abre tu terminal y accede a `Downloads`. Copia el archivo `.tar` en la carpeta `/opt`:

```bash
sudo cp -rp firefox-67.0b10.tar.bz2 /opt
# cambiar firefox-67.0b10.tar.bz2 por el nombre del archivo que hayas descargado
```

Borra el archivo `.tar`:

```bash
sudo rm -rf firefox-67.0b10.tar.bz2
```

Accede a la carpeta `/opt`:

```bash
cd /opt
```

Descomprime el archivo `.tar`:

```bash
sudo tar xjf firefox-67.0b10.tar.bz2
```

Elimina el `.tar`:

```bash
sudo rm -rf firefox-67.0b10.tar.bz2
```

## Permisos

Vamos a darle permisos a la carpeta de Firefox:

```bash
sudo chown -R $USER /opt/firefox
```

Abrimos el archivo de configuración de `bash`:

```bash
nano ~/.bashrc
```

Copia y pega al final del archivo la siguiente línea:

```bash
export PATH=/opt/firefox/firefox:$PATH
```

Cierra el archivo con `ctrl+x` y guarda los cambios.

## Acceso directo

Lo último es ejecutar un commando para crear un acceso directo de Unity. Después de crear este archivo, podremos buscar "Firefox Developer Edition" nuestro Dashboard:

```bash
cat > ~/.local/share/applications/firefoxDeveloperEdition.desktop <<EOL
[Desktop Entry]
Encoding=UTF-8
Name=Firefox Developer Edition
Exec=/opt/firefox/firefox
Icon=/opt/firefox/browser/chrome/icons/default/default128.png
Terminal=false
Type=Application
Categories=Network;WebBrowser;Favorite;
MimeType=text/html;text/xml;application/xhtml_xml;x-scheme-handler/http;x-scheme-handler/https;x-scheme-handler/ftp; X-Ayatana-Desktop-Shortcuts=NewWindow;NewIncognitos;
EOL
```
