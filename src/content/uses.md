---
title: "Uses - Tools and Technologies"
description: "Las herramientas y tecnologías que utilizo."
index: true
date: 2025-06-18
published: true
---

# Uses

Esta página describe mi setup: hardware, software, flujo de trabajo, accesos y dotfiles. Está pensada para quien quiera reproducir mi entorno o sacar ideas prácticas. Uso lo que me hace más productivo y lo que me permite iterar rápido en proyectos personales y profesionales.

---

## Hardware

- Portátil: Lenovo ThinkPad (X1 Carbon / X13 o similar). Prioridad en teclado, robustez y batería.
- Monitor principal: Dell UltraSharp 27" 4K (o 1440p) — trabajo con espacio suficiente para editores y terminales.
- Monitor secundario: pantalla más pequeña para documentación, chat o video.
- Teclado: Keychron / mechanical compact — uso esquema TKL o 75% según ergonomía.
- Ratón: Logitech MX Master — botones programables y buena ergonomía.
- Almacenamiento: NVMe SSD (1TB) para sistema y proyectos; backup en NAS/Cloud.
- Audio: auriculares con micrófono de buena calidad para llamadas (Shure / Sony / Sennheiser).

## Sistema operativo y entorno base

- GNU/Linux (distribución basada en Debian/Ubuntu o Arch según preferencia). Uso zsh como shell con Oh My Zsh / dotfiles personalizados.
- Gestor de ventanas/entorno: GNOME o i3/Hyprland para setups tiling — depende del foco (productividad vs. estética).
- Virtualización/containers: Docker para entornos reproducibles; Multipass/LXD para VMs livianas cuando lo necesito.

## Desarrollo y herramientas principales

- Editor: VS Code (con configuraciones y extensiones mínimas) o Neovim para edición ligera y scripting.
- Node.js (LTS) y npm/pnpm para proyectos web; uso pnpm cuando busco instalaciones más rápidas y monorepos.
- Python 3.11+ con pyenv/venv para entornos aislados; uso poetry para gestión de paquetes en proyectos más formales.
- Git: flujo trunk-based o feature-branches según el equipo; uso GitHub (o GitLab) para repos remotos.
- Terminal: Alacritty / Kitty con tmux para sesiones persistentes y multiplexación.

## Notas sobre web / frontend

- Frameworks: Astro para sitios estáticos (este sitio está construido con Astro), React para UIs interactivas cuando hace falta.
- CSS: Tailwind para prototipado rápido y utilidades; añado variables y clases reutilizables cuando el proyecto crece.
- Testing: Jest / Vitest para unitarios; Playwright para end-to-end.

## Flujo de trabajo diario

1. Revisar tareas y prioridades en mi board (GitHub Projects / Notion).
2. Crear una rama por tarea/feature usando convenciones claras (feature/<descripción>).
3. Desarrollar en small increments, commits pequeños y descriptivos.
4. PRs con descripción, checklist y capturas si aplican; pedir revisión antes de merge.
5. Deploys automáticos con CI/CD (GitHub Actions / other) y monitorización básica.

## Accesos y seguridad

- Autenticación: 2FA en cuentas críticas (GitHub, correo, plataformas en la nube).
- Gestión de secretos: usar vaults o secrets de CI; nunca poner credenciales en repositorios.
- Backups: copias periódicas del home y del directorio de proyectos importantes en un NAS y en un servicio cloud.

## Dotfiles y configuración

Puedes ver mis dotfiles y configuraciones en los siguientes enlaces (ejemplos):

- Dotfiles (zsh, vim, tmux, gitconfig): https://github.com/tu-usuario/dotfiles
- Config de VS Code / extensiones: https://github.com/tu-usuario/vscode-settings

Sustituye "tu-usuario" por el nombre de usuario correspondiente o enlaza tus repositorios reales.
