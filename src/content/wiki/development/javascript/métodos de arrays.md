---
title: Métodos de arrays
description: "Guía completa de métodos de arrays en JavaScript: push, pop, map, filter, reduce y más con ejemplos prácticos"
date: 2021-10-14
mod: 2025-11-11
published: true
tags: [arrays, javascript]
---

# Métodos de arrays

Las matrices son objetos tipo lista cuyo prototipo tiene métodos para realizar operaciones de

recorrido y mutación. Ni la longitud de una matriz de JavaScript ni los tipos de sus elementos son

fijos.

## Declaración de arrays

Existen dos formas de declarar un array:

```javascript
let arrayName = [item1, item2, item3];
let arrayName2 = new Array(item1, item2, item3);
```

Los elementos dela array están indexados, empezando por el cero.

Podemos obtener un elemento por su índice entre corchetes:

```javascript
let arrayName = ["ansango", 1, false];

console.log(arrayName[0]); // Output: "ansango"
console.log(arrayName[1]); // Output:  1
console.log(arrayName[2]); // Output:  false
```

Un array puede almacenar elementos de cualquier tipo:

```javascript
let arrayName = [
  "ansango", // string
  1, // number
  false, // boolean
  { name: "JavaScript" }, // Object
  function () {}, //function
];
```

## Los métodos de array más utilizados

⭐ `pop()` - Elimina el último elemento de un array y devuelve ese elemento. Este método cambia la longitud del array.

```javascript
const plants = ["broccoli", "cauliflower", "cabbage", "kale", "tomato"];

console.log(plants.pop());
// Output: "tomato"
console.log(plants);
// Output: Array ["broccoli", "cauliflower", "cabbage", "kale"]
```

⭐ `push()` - añade uno o más elementos al final de un array y devuelve la nueva longitud del mismo.

```javascript
const animals = ["pigs", "goats", "sheep"];

const count = animals.push("cows");
console.log(count);
// Output: 4
console.log(animals);
// Output: Array ["pigs", "goats", "sheep", "cows"]
```

⭐ `shift()` - Elimina el primer elemento del array y devuelve el elemento eliminado. Este método cambia la longitud del array

```javascript
const array1 = [1, 2, 3];

const firstElement = array1.shift();

console.log(array1);
// expected output: Array [2, 3]

console.log(firstElement);
// expected output: 1
```

⭐ `unshift()` - Añade un elemento al principio del array y también devuelve la nueva longitud del array.

```javascript
const array1 = [1, 2, 3];

console.log(array1.unshift(4, 5));
// Output: 5

console.log(array1);
// Output: Array [4, 5, 1, 2, 3]
```

> Los métodos `push()` y `pop()` son rápidos, mientras que `shift()` y `unshift()` son lentos.

⭐ `toString` - Devuelve una lista de elementos separados por comas.

```javascript
let arr = [1, 2, 3, 4, 5];

console.log(arr.toString());
// Output: 1,2,3,4,5
```

⭐ `join()` - Crea y devuelve una nueva cadena concatenando todos los elementos de un array, separados por comas o por una cadena especificada.

```javascript
const elements = ["Fire", "Air", "Water"];

console.log(elements.join());
// Output: "Fire,Air,Water"

console.log(elements.join(""));
// Output: "FireAirWater"

console.log(elements.join("-"));
// Output: "Fire-Air-Water"
```

⭐ `forEach()` - Ejecuta una función proporcionada una vez por cada elemento del array.

```javascript
const array1 = ["a", "b", "c"];

array1.forEach((element) => console.log(element));

// Output: "a"
// Output: "b"
// Output: "c"
```

⭐ `filter()` - Crea un nuevo array con todos los elementos que pasan la condición.

```javascript
const words = [
  "spray",
  "limit",
  "elite",
  "exuberant",
  "destruction",
  "present",
];

const result = words.filter((word) => word.length > 6);

console.log(result);
// Output: Array ["exuberant", "destruction", "present"]
```

⭐ `map()` - Crea un nuevo array relleno con los resultados de llamar a una función proporcionada en cada elemento de la matriz de llamada.

```javascript
const array1 = [1, 4, 9, 16];

const map1 = array1.map((x) => x * 2);

console.log(map1);
// Output: Array [2, 8, 18, 32]
```

⭐ `find()` - Devuelve el valor del primer elemento del array proporcionado que cumple con la condición proporcionada. Si ningún valor satisface la función de comprobación, se devuelve undefined.

```javascript
const array1 = [5, 12, 8, 130, 44];

const found = array1.find((element) => element > 10);

console.log(found);
// Output: 12
```

⭐ `includes()` - Determina si un array incluye un determinado valor entre sus entradas, devolviendo true o false según corresponda.

```javascript
const array1 = [1, 2, 3];

console.log(array1.includes(2));
// Output: true

const pets = ["cat", "dog", "bat"];

console.log(pets.includes("cat"));
// Output: true

console.log(pets.includes("at"));
// Output: false
```

⭐ `reduce()` - Ejecuta una función reductora (que tú proporcionas) en cada elemento del array, dando como resultado un único valor de salida.

```javascript
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// Output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// Output: 15
```

> Si quieres saber más sobre reduce, puedes revisar [este artículo](/javascript/array/reduce)

⭐ `flat()` - Crea un nuevo array con todos los elementos del array concatenados en él recursivamente hasta la profundidad especificada.

```javascript
const arr1 = [0, 1, 2, [3, 4]];

console.log(arr1.flat());
// Output: [0, 1, 2, 3, 4]

const arr2 = [0, 1, 2, [[[3, 4]]]];

console.log(arr2.flat(2));
// Output: [0, 1, 2, [3, 4]]
```

## La propiedad Length

La propiedad length establece o devuelve el número de elementos de un array.

```javascript
let countries = [“Azerbaijan”, “Turkey”, “Russia”, “Germany”];
console.log(countries.length);
// Output: 4
countries.length = 5;
console.log(countries.length);
// Output: 5
```

Estos son todos los métodos y algo de información básica sobre arrays. Todas estas herramientas nos facilitan mucho la vida a la hora, sobre todo, de manejar datos y obtener información.
