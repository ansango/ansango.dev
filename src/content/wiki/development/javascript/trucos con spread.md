---
title: Trucos con spread
description: "Trucos prácticos con el operador spread en JavaScript: copiar arrays, eliminar duplicados, pasar argumentos y más"
date: 2021-05-02
mod: 2025-11-11
published: true
tags: [array, javascript, spread]
---

# Trucos con spread

`spread` permite a un elemento iterable como un array o cadena set expandido en lugares donde cero o más argumentos o elementos son esperados, o a un objeto set expandido en lugares donde cero o más pares de valores clave son esperados.

## Copiar

```javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1]; // [1,2,3]
```

## Merge

```javascript
const fruits = ["🍉", "🍎"];
const vegetables = ["🥕"];
const fruitsAndVeg = [...fruits, ...vegetables]; // ['🍉', '🍎','🥕']
```

## Eliminar duplicados

```javascript
const arr = [1, 1, 1, 2];
const uniqueArr = [...new Set(arr)]; // [1, 2]
```

## Pasar como argumentos

```javascript
const arr = [1, 2, 3, 4, 5];
const minNum = Math.min(...arr); // 1
```

## Convertir un string a char

```javascript
const firstName = "Anibal";
const arrSplit = [...firstName]; // ['A', 'n', 'i', 'b', 'a', 'l']
```

Espero que te hayan gustado estos pequeños tips para utilizar `spread`.
