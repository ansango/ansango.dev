---
title: Alias en git
description: "Alias en Git: crear comandos personalizados para optimizar flujo de trabajo y productividad en desarrollo"
date: 2024-05-16
mod: 2025-10-25
published: true
tags: [git, productivity, terminal, tools]
---

# Alias en git

Para crear tus propios alias, use el siguiente comando git.

```shell
git config --global alias.somealias some-git-command
```

- `a = add .`: La ejecución `git add`agregará todos los archivos que hayan cambiado según lo preparado.

- `b = branch`—Enumera todas las sucursales de su repositorio en su máquina local.

- `bi = bisect`—Al ejecutar `git bi`se ejecutará git's [bisect](https://git-scm.com/docs/git-bisect) para ayudarte a determinar qué confirmación tiene un error.

- `ci = commit -m`—Esto enviará un archivo con el mensaje que especifique, por ejemplo `git ci "awesome commit!"`.

- `co = checkout`—Esto verificará la sucursal que especifique, por ejemplo`git co my-awesome-branch`

- `colast = checkout -`—Al ejecutar `git colast`se verificará la rama anterior en la que estaba trabajando.

- `db = branch -D`—Esto eliminará la rama que especifique, por ejemplo `git db my-not-so-awesome-branch`. Tenga en cuenta que esto sólo funcionará si la rama que está eliminando no es aquella en la que está trabajando actualmente.

- `laf = fsck --lost-found`—Correr `git laf`te llevará a los [objetos perdidos y encontrados de git](https://git-scm.com/docs/git-lost-found) . Admito que rara vez uso esto, por lo que tal vez no justifique un alias y solo una búsqueda profesional en Google.

- `last = log -1 HEAD`—Ejecutar `git last`te mostrará cuál fue tu último compromiso.

- `lc = diff HEAD^ HEAD`Compara el jefe de tu sucursal con la confirmación anterior.

- `pf = push --force-with-lease`—Correr `git pf`fuerza un empujón, pero es un poco menos destructivo que forzar un empujón. Consulte aquí para obtener más información sobre [—force-with-lease frente a —force](https://developer.atlassian.com/blog/2015/04/force-with-lease) .

- `psu = push --set-upstream`—Ejecute esto cuando desee enviar una rama por primera vez al control remoto (normalmente `origin`), por ejemplo `git psu origin my-awesome-branch`.

- `pr = pull --rebase`—Esto cambiará la base de su rama actual con la rama especificada, por ejemplo `git pr develop`.

- `ra = rebase --abort`—La ejecución `git ra`abortará una [rebase](https://git-scm.com/docs/git-rebase) . Ejecute esto cuando piense que mi rebase está actualmente en mal estado. ¡Sácame de aquí!

- `rc = rebase --continue`—La ejecución `git rc`continuará con una [rebase](https://git-scm.com/docs/git-rebase) . Normalmente ejecuta esto cuando ha manejado algún conflicto en una rebase.

- `remotes = remote -v`—En ejecución `git remotes`se muestran todos los controles remotos configurados actualmente para un repositorio.

- `renb = branch -m`—Cuando quieras cambiar el nombre de una rama, ejecuta, por ejemplo `git renb my-awesom-branch my-awesome-branch`, .

- `rhh = reset --hard HEAD`—La opción nuclear. Ejecute `git rhh`para borrar todos los cambios y comience desde el archivo `HEAD`.

- `rh = reset --hard`—Cuando especifica qué restablecer, se realiza un restablecimiento completo, por ejemplo `git rh HEAD~2`.

- `s = status -s`—Correr `git s`te dará un [estado](https://git-scm.com/docs/git-status) más conciso . En lugar de esto

```bash
On branch post/my-git-aliases
Your branch is up to date with 'origin/post/my-git-aliases'.

Changes not staged for commit:
 (use "git add <file>…" to update what will be committed)
 (use "git checkout -- <file>…" to discard changes in working directory)

       modified: src/pages/articles/2018-08-24-my-git-aliases/index.md

no changes added to commit (use "git add" and/or "git commit -a")
```

esto:

```
M src/pages/articles/2018-08-24-my-git-aliases/index.md
```

- `stashes = stash list`—Ejecutar te muestra todos los stash [de](https://git-scm.com/book/en/v1/Git-Tools-Stashing)`git stashes` tienes . p.ej[](https://git-scm.com/book/en/v1/Git-Tools-Stashing)

```
stash@{0}: WIP on upgrade: bff6257 Destructuring OCD…
stash@{1}: WIP on upgrade: 3d73199 Fixed LiceCap link.
stash@{2}: WIP on upgrade: c2f78g6 Update default title.
```

- `unstash = stash pop`—Al ejecutarlo, `git unstash`se saca un alijo de la lista de alijos guardados.

- `vc = clean -dfx`—La ejecución `git vc`limpia su repositorio de git, por lo que todo lo que no esté en git se borra, por ejemplo `node_modules`, archivos de configuración que no deberían estar en un repositorio, etc. Así que TENGA CUIDADO antes de ejecutar esto.

- `mend = commit --amend`—Ejecutar `git mend`te permite modificar una confirmación.

- `trigger = commit --allow-empty -m "Trigger Build"`—Crea una confirmación vacía. Esto es útil cuando necesita reiniciar una compilación de forma remota en su canal de CI/CD sin realizar cambios.

- `alias = ! git config --get-regexp ^alias\. | sed -e s/^alias\.// -e s/\ /\ =\ /`—La ejecución `git aliases`mostrará todos los alias que haya configurado globalmente en git.
