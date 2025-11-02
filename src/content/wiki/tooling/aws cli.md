---
title: AWS CLI
description: "AWS CLI: instalación en Arch Linux y macOS, configuración y comandos esenciales para gestión de servicios AWS"
date: 2024-05-16
mod: 2025-10-25
published: true
tags: [aws, platform]
---

# AWS CLI

# Instalar AWS CLI

## Instalar AWS CLI en Arch

```shell
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

## Instalar AWS en MacOS

```shell
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
```
