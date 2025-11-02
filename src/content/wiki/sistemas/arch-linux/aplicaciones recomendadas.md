---
title: Programas recomendados en Arch Linux
description: "Aplicaciones recomendadas para Arch Linux: Alacritty, zsh, Oh My Zsh, Powerlevel10k, GNOME, NVM, Chrome, VS Code y herramientas de desarrollo"
date: 2024-06-01
mod: 2025-10-25
published: true
tags: [arch, linux, programas]
---

# Programas recomendados en Arch Linux

## Alacritty

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/alacritty/alacritty" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://repository-images.githubusercontent.com/51980455/c6857780-448b-11ea-95ed-00fdbc59eb0b); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - alacritty/alacritty: A cross-platform, OpenGL terminal emulator.</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">A cross-platform, OpenGL terminal emulator. Contribute to alacritty/alacritty development by creating an account on GitHub.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/alacritty/alacritty</p></div></a></div>

```shell
sudo pacman -S alacritty
```

## ZSH y Oh My Zsh

### Zsh

- [Zsh](https://www.zsh.org/)

```shell
sudo pacman -S zsh zsh-completions
```

```shell
chsh -s /bin/zsh
```

### Oh My Zsh

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/ohmyzsh/ohmyzsh" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://repository-images.githubusercontent.com/291137/fb009080-6110-11e9-82c2-b21ca7831f5c); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - ohmyzsh/ohmyzsh: 🙃 A delightful community-driven (with 2,300+ contributors) framework for managing your zsh configuration. Includes 300+ optional plugins (rails, git, macOS, hub, docker, homebrew, node, php, python, etc), 140+ themes to spice up your morning, and an auto-update tool so that makes it easy to keep up with the latest updates from the community.</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">🙃 A delightful community-driven (with 2,300+ contributors) framework for managing your zsh configuration. Includes 300+ optional plugins (rails, git, macOS, hub, docker, homebrew, node, php, pyth…</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/ohmyzsh/ohmyzsh</p></div></a></div>

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

#### Powerlevel10k

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/romkatv/powerlevel10k" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/842f62ebec54493f85be29ab81833a65e66996a18b2d2c8ad6da35cc66d5eab2/romkatv/powerlevel10k); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - romkatv/powerlevel10k: A Zsh theme</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">A Zsh theme. Contribute to romkatv/powerlevel10k development by creating an account on GitHub.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/romkatv/powerlevel10k</p></div></a></div>

```shell
yay -S --noconfirm zsh-theme-powerlevel10k-git
```

```shell
echo 'source /usr/share/zsh-theme-powerlevel10k/powerlevel10k.zsh-theme' >>~/.zshrc
```

#### Fuentes

```shell
sudo pacman -S --noconfirm powerline-common awesome-terminal-fonts ttf-fira-code noto-fonts noto-fonts-cjk noto-fonts-emoji noto-fonts-extra
yay -S --noconfirm ttf-meslo-nerd-font-powerlevel10k
```

## Gnome extensions y tweaks

<div class="obsidian-meta-links" style="position: relative;"><a href="https://gitlab.gnome.org/GNOME/gnome-tweaks" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://gitlab.gnome.org/GNOME/gnome-tweaks/-/avatar); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GNOME / GNOME Tweaks · GitLab</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Welcome to GNOME GitLab</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://gitlab.gnome.org/GNOME/gnome-tweaks</p></div></a></div>

```shell
sudo pacman -S --noconfirm gnome-tweaks
```

<div class="obsidian-meta-links" style="position: relative;"><a href="https://extensions.gnome.org/extension/307/dash-to-dock/" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(undefined); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">Dash to Dock - GNOME Shell Extensions</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;"></p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://extensions.gnome.org/extension/307/dash-to-dock/</p></div></a></div>

```shell
yay -S --noconfirm gnome-shell-extension-dash-to-dock
```

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/Leleat/Tiling-Assistant" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://opengraph.githubassets.com/1f32cdf615259426d4f17c4ddafadd66f7692f1fa86f7ede708db22ef7ce0137/Leleat/Tiling-Assistant); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - Leleat/Tiling-Assistant: An extension which adds a Windows-like snap assist to GNOME. It also expands GNOME's 2 column tiling layout.</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">An extension which adds a Windows-like snap assist to GNOME. It also expands GNOME's 2 column tiling layout. - Leleat/Tiling-Assistant</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/Leleat/Tiling-Assistant</p></div></a></div>

## Nvm

<div class="obsidian-meta-links" style="position: relative;"><a href="https://github.com/nvm-sh/nvm" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://repository-images.githubusercontent.com/612230/53a0c44a-1f6e-4f8d-918f-89762fafe369); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub - nvm-sh/nvm: Node Version Manager - POSIX-compliant bash script to manage multiple active node.js versions</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Node Version Manager - POSIX-compliant bash script to manage multiple active node.js versions - nvm-sh/nvm</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://github.com/nvm-sh/nvm</p></div></a></div>

```shell
yay -S --noconfirm nvm
```

```shell
echo 'source /usr/share/nvm/init-nvm.sh' >>~/.zshrc
```

## Chrome

<div class="obsidian-meta-links" style="position: relative;"><a href="https://www.google.com/chrome/" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://www.google.com/chrome/static/images/homepage/homepage-v2.png); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">Google Chrome - The Fast & Secure Web Browser Built to be Yours</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Chrome is the official web browser from Google, built to be fast, secure, and customizable. Download now and make it yours.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://www.google.com/chrome/</p></div></a></div>

```shell
yay -S google-chrome
```

## VSCode

<div class="obsidian-meta-links" style="position: relative;"><a href="https://code.visualstudio.com/" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://code.visualstudio.com/opengraphimg/opengraph-home.png); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">Visual Studio Code - Code Editing. Redefined</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications.  Visual Studio Code is free and available on your favorite platform - Linux, macOS, and Windows.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://code.visualstudio.com/</p></div></a></div>

```shell
yay -S visual-studio-code-bin
```

## Github CLI

<div class="obsidian-meta-links" style="position: relative;"><a href="https://cli.github.com/" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://cli.github.com/assets/images/social-card.png); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">GitHub CLI</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Take GitHub to the command line</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://cli.github.com/</p></div></a></div>

```shell
sudo pacman -S github-cli
```

```shell
gh auth login
```

## Obsidian

<div class="obsidian-meta-links" style="position: relative;"><a href="https://obsidian.md/" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://obsidian.md/images/banner.png); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">Obsidian - Sharpen your thinking</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">Obsidian is the private and flexible note‑taking app that adapts to the way you think.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://obsidian.md/</p></div></a></div>

```shell
yay -S obsidian
```

## Balena Etcher

<div class="obsidian-meta-links" style="position: relative;"><a href="https://etcher.balena.io/" target="_blank" style="border: 1px solid var(--background-modifier-border); margin: 20px 0; border-radius: 3px; width: 100%; display: flex; text-decoration: none !important; background-color: var(--background-primary);"><div style="height: 100%; width: 35%; min-width: 120px; overflow: hidden; border-right: 1px solid var(--background-modifier-border);"><div style="background-image: url(https://uploads-ssl.webflow.com/636ab6ba0e1bd250e3aaedaf/65ef146b4576693f0c5d825b_OG%20image.png); background-position: center center; background-size: cover; background-repeat: no-repeat; padding-bottom: 120px; background-color: var(--background-secondary);"></div></div><div style="padding: 8px; width: 75%; overflow: hidden;"><h5 style="font-family: sans-serif; font-size: 1.125rem; margin: 0 0 4px 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-normal);">balenaEtcher - Flash OS images to SD cards & USB drives</h5><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">A cross-platform tool to flash OS images onto SD cards and USB drives safely and easily. Free and open source for makers around the world.</p><p style="font-family: sans-serif; font-size: 1rem; margin: 0; color: var(--text-faint); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">https://etcher.balena.io/</p></div></a></div>

## Docker

Puedes ver como instalar docker en Arch Linux en [[instalar docker en linux]].
