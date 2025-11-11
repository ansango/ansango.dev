---
title: Explicando Array Reduce
description: Explicación detallada del método reduce en JavaScript con ejemplos prácticos de suma, formateo y contadores
date: 2021-10-14
mod: 2025-11-11
published: true
tags: [arrays, javascript]
---

# Explicando Array Reduce

## Qué have reduce?

Mientras que map o filter crean un nuevo array mediante la transformación de cada elemento o eliminando los elementos que no pertenecen, **`reduce` toma todos esos elementos en un array y valga la redundancia, los reduce en un solo valor**.

## Qué recibe reduce?

1. El valor actual
2. El valor anterior
3. El indice actual
4. El array del que llamas a reduce

En la vuelta del callback obtenemos un el valor anterior en cada iteración. Como en la primera vuelta no tenemos valor anterior, esta es la razón, por la que reduce puede recibir un valor inicial.

## Que devuelve reduce?

Reduce devuelve un solo valor, no un array que contiene un único elemento.

> El método `reduce` aplica una función a un acumulador y a cada valor de una array (de izquierda a derecha) para reducirlo a un único valor.

## Ejemplos

### Suma de lista de numeros

```javascript
const numbers = [1, 2, 3, 4];
let result = 0;

numbers.forEach((number) => {
  result += number; // vamos acumulando y sumando en cada vuelta
});

console.log(result); // output: 10
```

Vale `forEach` es una buena opción, seguramente es la que usaría, no me complicaría mucho mas. Pero veamos ahora el el mismo ejemplo con reduce:

```javascript
const numbers = [1, 2, 3, 4];

const result = numbers.reduce((accumulator, number) => {
  return accumulator + number;
}, 0);

console.log(result); // output: 10
```

el `acumulador` es el valor anterior, resultante de la operación que se devuelve, el `número` es el elemento actual de la iteración, todo esto es pasado como primer argumento de la función. Como segundo argumento tenemos el valor inicial sobre el cual se comienza.

### Formatear un array de objetos

Casos de la vida diaria, en los que necesitamos x information pero no viene en el formato que queremos.

```javascript
const animales = [
  { id: 1, nombre: "perro", localizaciones: ["salamanca", "madrid"] },
  { id: 2, nombre: "gato", localizaciones: ["salamanca", "madrid"] },
  { id: 3, nombre: "conejo", localizaciones: ["salamanca", "madrid"] },
];

const resultado = animales.reduce((animalAnterior, animalActual) => {
  animalAnterior[animalActual.id] = {
    nombre: animalActual.nombre,
    ubicaciones: animalActual.localizaciones,
  };
  return animalAnterior;
}, {});

console.log(resultado);

/* 
 output:
{ 1: { nombre: 'perro', ubicaciones: [ 'salamanca', 'madrid' ] }, 
  2: { nombre: 'gato', ubicaciones: [ 'salamanca', 'madrid' ] }, 
  3: { nombre: 'conejo', ubicaciones: [ 'salamanca', 'madrid' ] } } 
*/
```

### Contador de nombres

```javascript
const nombres = [
  "Anibal",
  "Sergio",
  "Miguel",
  "Juan Carlos",
  "Thomas",
  "Manuel",
  "Laura",
  "Miguel",
  "Sergio",
];

const cantidadNombres = nombres.reduce((acumuladorNombre, nombreActual) => {
  acumuladorNombre[nombreActual] = (acumuladorNombre[nombreActual] || 0) + 1;
  return acumuladorNombre;
}, {});

console.log(cantidadNombres);

/**
 * Output: { Anibal: 1, Sergio: 2, Miguel: 2, Carlos: 1, Thomas: 1, Manuel: 1, Laura: 1, }
 */
```

La función se ejecuta de esta manera:

```javascript
// Primera ejecución
1 - contadorNombre = {} // Objecto vacío
2 - nombre = Jorge // Primer elemento del array
3 - {Anibal: 1}
4 - Se retorna el objecto existen -> {Anibal: 1}
5 - contadorNombre = {Anibal: 1} // Se repite el ciclo
```

La función `reduce` permite lograr objetivos que generalmente de manera estructurada cuestan un poco de trabajo lograr. El dominio de este tipo de funciones nos permitirán logra una código más limpio y mucho más fácil de leer. Al principio puede costar entender como funciona, pero todo es práctica.
