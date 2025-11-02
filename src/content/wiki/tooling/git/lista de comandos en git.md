---
title: Lista de commands en git
description: "Comandos esenciales de Git: clone, push, pull, branches, stash y gestión de repositorios para desarrollo"
date: 2024-05-04
mod: 2025-10-25
published: true
tags: [git, productivity, terminal, tools]
---

# Lista de commands en git

## Para clonar el repositorio de GitHub

```shell
git clone https://github.com/susannalles/MinimalEditions.git
```

## Para subir nuevos materiales a GitHub

```shell
git init #inicia git al interno de la carpeta
```

```shell
git add nombre_archivo.txt #añade el documento (o carpeta) en el area de espera ("stage")
 ```

```shell
git commit -m "mi primer mensaje de cambios" #describe los cambios realizados
```

```shell
git remote add origin https://github.com/susannalles/MinimalEditions.git #apunta a la dirección donde deseáis subir el nuevo material
 ```

 ```shell
git push -u origin master # subís los cambios al repositorio remote en GitHub por primera vez
```

## Push & Pull

```shell
git add * #añade el documento (o carpeta) en el area de espera ("stage")
```

```shell
git commit -m "mensaje con los detalles del cambio" #describe los cambios realizados
```

```shell
git push origin master # subes los cambios a GitHub
```

```shell
git push origin [branch] # subes los cambios al repositorio remote en GitHub. Asegurar de escribir el nombre del branch que quieres subir sus cambios y **nunca subes al master** sin que todos revisamos sus cambios.
```

## Sincronizar nuestra copia con el original

```shell
git pull # bajas los cambios del repositorio remoteo a tu copia en local
```

## La Brújula

`git status`: señala lo que se ha modificado en la carpeta de trabajo

```shell
git status # muestra los cambios hechos en la carpeta de trabajo
```

## Branches

```shell
git branch # muestra en que branch estas trabajando
```

```shell
git branch [name] # crea un branch nuevo
```

```shell
git checkout [branch] # cambia de un branch a otro
```

```shell
git branch -d [name] # quita un branch
```

```shell
git checkout -b [name] # crea un branch nuevo y cambia a ese branch
```

```shell
git pull origin [branch] # bajas los cambios del repositorio remoteo a tu copia en local
```

  ```shell
git checkout -- [file] # descarta los cambios hechos en un archivo
  ```

### Guardar y recuperar cambios con

#### Guardar tus cambios

```shell
git stash #guardar tus cambios temporalmente sin hacer un `commit`
```

```shell
git stash push -m "Mensaje descriptivo para mis cambios" #añadir un mensaje a los cambios guardados
```

#### Ver los cambios guardados

```shell
git stash list #ver una lista de todos los "stashes" que has guardado
```

#### Recuperar los cambios

```shell
git stash pop #aplica cambios y los elmina de stashes
```

```shell
git stash apply #aplica los cambios guardados manteniéndolos en stashes
```

```shell
git stash apply stash@{1} #aplicar un stash en concretos de la lista usando índice
```

#### Eliminar un "stash"

```shell
git stash drop stash@{1} #eliminar un stash de la lista usando índice
```

```shell
git stash clear #eliminar todos los "stashes" de la lista
```
