---
applyTo: 'README.md'
description: 'Refactor the README by separating each section into individual markdown files in the /docs directory, while keeping the README concise with essential information and a table of contents.'
---

# Refactoriar README

## Requisitos:

- Separar cada seccion en un archivo .md con el siguiente formato, "01-nombre-de-la-seccion-1.md".
- los archivos de cada seccion tienen que estar en la carpeta /docs,
- en el Readme.md vamos a dejar lo esencial que son:
    - introduccion
    - feats (breve resumen)
    - stack tecnologico
    - integracion con terceros
    - como escribir contenido a traves de obsidian (brevemente)
    - comandos para empezar (clone, install, run) a desarrollar en astro
    - tabla de contenidos con cada enlace a la seccion completa

### Pasos

1. Listar las sacciones que se van a crear.
2. Validar con el usuario si esta de acuerdo con las secciones.
3. Crear la carpeta /docs en el proyecto si no existe.
4. Crear archivos .md para cada seccion del README original, siguiendo el formato "01-nombre-de-la-seccion-1.md", "02-nombre-de-la-seccion-2.md", etc.
5. Mover el contenido de cada seccion del README original a su respectivo archivo en /docs.
6. Actualizar el README.md para incluir solo la informacion esencial mencionada anteriormente.
7. Agregar una tabla de contenidos en el README.md con enlaces a cada archivo.

## Notas:

Es importante que mantengas el contenido en cada seccion, solo que lo organices en los archivos correspondientes y dejes el readme con lo esencial. 

La documentacion debe ser en ingles, manten y/o agrega emojis donde sea necesario para mejorar la experiencia del usuario.