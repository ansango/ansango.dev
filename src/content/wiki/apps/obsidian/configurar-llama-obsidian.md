---
title: Configurar llama con obsidian
description: Utiliza llama3.2 con obsidian para completar y mejorar tus notas de una manera sencilla y rápida, incluyendo embedding models que trabajen con tus llms favoritos.
date: 2024-12-18
mod: 2025-10-12
published: true
tags: [ai, llama, obsidian, ollama]
---

# Configurar llama con obsidian

## Descargar obsidian

Primero descarga obsidian e instalalo en tu ordenador

<div class="obsidian-meta-links" style="position: relative;"><a href="https://obsidian.md/download" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://obsidian.md/images/banner.png); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">Download - Obsidian</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Obsidian is available on all major platforms. Download Obsidian for iOS, Android, macOS, Windows and Linux.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://obsidian.md/download</p></div></a></div>
en Arch Linux a través de `yay` puedes usar:

```bash
yay -S obsidian
```

## Descargar ollama

A continuación descarga ollama para tu maquina:

<div class="obsidian-meta-links" style="position: relative;"><a href="https://ollama.com/download/mac" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://ollama.com/public/og.png); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">Download Ollama on macOS</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Download Ollama for macOS</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://ollama.com/download/mac</p></div></a></div>
En linux puedes usar:

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### Descargar un LLM, llama 3.2

Después de instalar ollama, abre una terminal y ejecuta:

```bash
ollama run llama3.2
```

A continuación se descargará el modelo de llama 3.2, y si no tienes ninguno instalado se utilizará este por defecto.

Para descargarnos cualquier otro modelo simplemente ejecuta el mismo comando seguido del modelo que quieres utilizar:

```bash
ollama run llama3.3
```

Puedes ver [aqui](https://ollama.com/search) el resto de modelos.

### Descargar un Embedding model

Podemos descargar un modelo de embedding que nos permitirá mejorar la precisión de las predicciones, reducir el ruido y la variabilidad en los resultados y aumentar la eficiencia computacional.

En este caso descargaremos `nomic-embed-text`

```bash
ollama pull nomic-embed-text
```

## Configurar obsidian con llama

A continuación abre obsidian, y en `settings > community plugins` busca **Local GPT** e instala este plugin.

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/pfrankov/obsidian-local-gpt" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/4491b8e4cb4a34393b6f9a6e8214a68cfead12b7b226f0e6ecf3d44add0aa1b2/pfrankov/obsidian-local-gpt); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - pfrankov/obsidian-local-gpt: Local Ollama and OpenAI-like GPT's assistance for maximum privacy and offline access</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Local Ollama and OpenAI-like GPT's assistance for maximum privacy and offline access - pfrankov/obsidian-local-gpt</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/pfrankov/obsidian-local-gpt</p></div></a></div>
Una vez instalado, activaló y selecciona como AI Provider, Ollama. En Providers Configuration puedes seleccionar el modelo que quieres usar en **Default Model**, y posteriormente si descargaste un embedding model configuraló en **Embedding Model**.

Te recomiendo seleccionar un atajo de teclado, como por ejemplo `crtl + space`, para poder utilizar las opciones que este plugin nos ofrece por defecto.
