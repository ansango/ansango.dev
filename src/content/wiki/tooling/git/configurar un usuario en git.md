---
title: Configurar un usuario en git
description: "Configurar usuario en Git: establecer nombre y email globalmente para commits y colaboración"
date: 2024-05-03
mod: 2025-10-25
published: true
tags: [git, productivity, terminal, tools]
---

# Configurar un usuario en git

Mientras configuras `git` ejecuta estos dos commandos:

```shell
git config --global user.name "My Name"
git config --global user.email "myemail@example.com"
```

El commando [`git config --list`](https://git-scm.com/docs/git-config#Documentation/git-config.txt---list) enumerará las configuraciones. Allí también deberías encontrar `user.name`y `user.email`.

Para saber el nombre de usuario, escribe:

```shell
git config user.name
```

Para conocer el correo electrónico escribe:

```shell
git config user.email
```

Estos dos generan solo el nombre y el correo electrónico respectivamente y no es necesario revisar la lista completa. Viene muy bien.
