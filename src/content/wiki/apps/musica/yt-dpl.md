---
title: Yt-dpl
description: "yt-dlp: descargar playlists de YouTube Music como álbumes, configuración de cookies, metadatos y formato MP3"
date: 2024-12-17
mod: 2025-10-25
published: true
tags: [tag]
---

# Yt-dpl

Esta herramienta nos permite descargar una playlist de yt music como si fuera un album, para los discos o temas que tengan control parental hay que iniciar sesion en youtube en firefox (ya que en chrome no tira bien), y pasarle el cookies from browser

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/yt-dlp/yt-dlp" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://repository-images.githubusercontent.com/307260205/b6a8d716-9c7b-40ec-bc44-6422d8b741a0); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - yt-dlp/yt-dlp: A feature-rich command-line audio/video downloader</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">A feature-rich command-line audio/video downloader - yt-dlp/yt-dlp</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/yt-dlp/yt-dlp</p></div></a></div>

```bash
yt-dlp --ignore-errors --format bestaudio --extract-audio --audio-format mp3 --audio-quality 160K --write-thumbnail --embed-metadata --parse-metadata "playlist_index:%(track_number)s" --add-metadata --output "%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s" --yes-playlist --cookies-from-browser firefox https://music.youtube.com/playlist?list=OLAK5uy_lu4WynTrRIHFOMHoQnr-T7sy4EFentOG4
```
