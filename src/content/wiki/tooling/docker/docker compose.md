---
title: Docker Compose
description: "description"
draft: false
date: 2025-07-30
mod: 2025-08-28
published: true
order: 0
tags: [tag]
---

# Docker Compose

## Instalar Docker Compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

```bash
docker-compose --version
```

```bash
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

### Levantar un docker con docker-compose

Cuando tengamos un archivo `docker-compose.yml`, lo levantamos con:

```bash
docker-compose up -d
```

## **Para detenerlo:**
