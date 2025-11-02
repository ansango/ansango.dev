---
title: ansango.dev
description: Mi webiste en Astro 100% estática compatible con Obsidian, desplegada en Cloudflare y Git based
date: 2025-10-01
mod: 2025-11-02
published: true
tags: [astro, blogs, cloudflare, obsidian, project, static-site, template]
---

# ansango.dev

Desde hace tiempo quería construir algo que reuniera lo mejor de un blog técnico, una wiki personal y un portafolio de proyecto, pero sin depender de plataformas rígidas ni perder control del contenido. Así nació **ansango.dev**, una "plantilla" construida para mis propios sitios.

- Quieres tener un sitio personal con blog + wiki + portafolio sin fragmentarlo en múltiples herramientas.
- Te gusta escribir en Markdown / Obsidian y no depender de CMS complejos. Además puedes elegir si tener un repositorio con tu contenido de forma independiente o utilizar este template.
- Buscas rendimiento, SEO optimizado y arquitectura ligera.
- Te interesa la filosofía del Indie Web: feed RSS, backlinks, control total.
- Eres desarrollador, creador de contenido técnico, investigador, o alguien que disfruta de tener su contenido organizado y agrupado.
- Además quieres tener el control 100% de tu contenido

## Cómo conseguir ansango.dev

1. Clona el repositorio:

```bash
git clone https://github.com/ansango/ansango.dev.git
cd ansango.dev
```

1. Instala dependencias:

```bash
npm install
```

1. Levanta el entorno de desarrollo:

```bash
npm run dev
```

Abre `http://localhost:4321` para ver tu sitio en local.

1. Escribe contenido en **Markdown / Obsidian**, dentro de las carpetas correspondientes:
   - `src/content/blog/`
   - `src/content/wiki/`
   - `src/content/projects/`, etc.
2. Configura Frontmatter en cada archivo para que tenga título, descripción, fecha, etiquetas y publicación real.

---

## Cómo desplegar ansango.dev

Actualmente despliego esta plantilla con una `github action`, que básicamente lo que hace es clonar el contenido de un vault de Obsidian, para ellos simplemente tengo en el vault una carpeta llamada `sites/ansango.com/content/**` que sigue la estructura de contenido que comentaba anteriormente.

En el vault, tenemos la configuración de la `gh action`, que es parecida a esto:

```yml
#.github/workflows/ansango.yml
name: ansango.com
env:
  TEMPLATE_REPO: ansango/ansango.dev # Change this to your blog repo template
  CONTENT_DIR: sites/ansango.com/content
  ASSETS_DIR: system/assets
on:
  workflow_dispatch:
  push:
    branches: [main]
    paths:
      - "sites/ansango.com/content/**"
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4.1.1
        with:
          path: temp_md
      - name: Checkout linked blog starter repo
        uses: actions/checkout@v4.1.1
        with:
          repository: ${{ env.TEMPLATE_REPO }}
          token: ${{ secrets.PAT }}
          path: template_blog
      - name: Create a publish folder with content and asssets
        run: |
          mkdir -p temp_md/publish
          cp -r temp_md/${{ env.CONTENT_DIR }} temp_md/publish
          cp -r temp_md/${{ env.ASSETS_DIR }} temp_md/publish
      - name: Install obsidian-export
        run: |
          wget https://github.com/zoni/obsidian-export/releases/download/v22.11.0/obsidian-export_Linux-x86_64.bin
          chmod +x obsidian-export_Linux-x86_64.bin
      - name: Run obsidian-export
        run: |
          find template_blog/src/content -mindepth 1 -maxdepth 1 -type d -exec rm -rf {} \;
          ./obsidian-export_Linux-x86_64.bin ./temp_md/publish template_blog/src
      - name: Move blog dir to currDir
        run: |
          cp -r template_blog/. .
          rm -rf template_blog
          rm -rf temp_md
      - name: Build
        run: npm install && npm run build
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }} # Required
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }} # Required
          command: pages deploy dist --project-name=ansango-dev --commit-dirty=true # Required
```

este action lo que hace en resumidas cuentas es, clonar la plantilla `ansango.dev`, copiar los assets, convertir todos las entradas de obsidian con sus backlinks en markdown regulares y compilar el proyecto de astro con el contenido del vault. Por último se depliega directamente en Cloudflare cada vez que hagamos push en el repositorio (para ello utilizo el plugin Git de Obsidian), y la action se dispara cuando se ha hecho push en todo aquello que sea contenido.

---

## Futuras mejoras / roadmap

Algunas ideas que tengo para seguir expandiendo ansango.dev:

- [x] ~~Flujo completo ya automatizado de sincronización Obsidian → repo → build → despliegue~~ ✅ 2025-10-19
- [ ] Mejores plantillas para proyectos (portafolio más visual)
- [ ] Integración con comentarios o funcionalidades interactivas opcionales
- [ ] Integracion directa con este proyecto de obsidian y configuración de la gh action.
- [ ] Dejar un repositorio base como plantilla, es decir, hacer un fork y subir el contenido como vault independiente

---

Si te interesa verlo más de cerca o usarlo como base para tu proyecto, puedes encontrar todo el código y la documentación en GitHub:

👉 [Revisa el repositorio en GitHub](https://github.com/ansango/ansango.dev)
