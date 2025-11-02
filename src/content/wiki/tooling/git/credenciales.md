---
title: Credenciales
description: "Configurar credenciales en Git: guardar usuario y contraseña para evitar autenticación repetitiva"
date: 2025-08-04
mod: 2025-10-25
published: true
tags: [credentials, git]
---

# Credenciales

Para evitar que Git te pida las credenciales cada vez, puedes guardar tus credenciales usando el helper de credenciales de Git. Ejecuta este comando en tu terminal:

```bash
git config --global credential.helper store
```

La próxima vez que ingreses tu usuario y contraseña, Git los guardará en texto plano en `~/.git-credentials` y no te los volverá a pedir.

> **Nota:** Si usas autenticación con tokens o tienes requisitos de seguridad más altos, considera usar `credential.helper cache` (guarda en memoria por un tiempo) o configurar un gestor de credenciales más seguro como Git Credential Manager.
