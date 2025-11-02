---
title: Javascript para React - Parte 2
description: "JavaScript para React Parte 2: operador spread, desestructuración, tipos primitivos y métodos de array"
date: 2024-05-02
mod: 2025-10-25
published: true
tags: [frontend, javascript, react]
---

# Javascript para React - Parte 2

## Operador spread

Permite que un iterable, como un array o una cadena, se expanda en lugares donde se esperan cero o más argumentos (para llamadas a funciones) o elementos (para literales de matriz), o que una expresión de objeto se expanda en lugares donde se esperan cero o más pares clave-valor (para literales de objeto). `spread` saca todos los elementos, todas las propiedades, y los distribuye en un nuevo array u objeto.

`spread` en array:

```javascript
// Arrays

const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4];

console.log(newNumbers); // output: [1,2,3,4]
```

`spread` en objetos:

```javascript
// Objects

const person = {
  name: "Anibal",
};

const newPerson = { ...person, age: 32 }; // output: {name: Anibal, age: 32}
```

`spread` en funciones:

```javascript
const filter = (...args) => {
  return args.filter((el) => el === 1);
};

filter([1, 2, 3]); // output: [1]
```

> Puedes ver algunos pequeños tricks con `spread` [aquí](/javascript/array/spread-tricks)

## Desestructuración

La desestructuración nos permite extraer fácilmente elementos de arrays o propiedades de objetos y almacenarlos en variables. La desestructuración nos permite sacar elementos individuales o propiedades y almacenarlos en variables para arrays y objetos.

**Desestructuración de arrays**:

```javascript
const numbers = [1, 2, 3];
const [num1, , num3] = numbers;
console.log(num1, num3); // output: 1, 3
```

**Desestructuración de objetos**:

```javascript
const person = { name: "Anibal", country: "Spain", job: "Frontend Developer" };
const { name, country, job } = person;
console.log(name, country, job); // output: Anibal, Spain, Frontend Developer
```

## Tipos primitivos

Los números, las cadenas, los booleanos son los llamados `tipos primitivos`. Siempre que reasignes o almacenes una variable en otra variable, se copiará el valor.

Si creo un número como `number1`, en el siguiente ejemplo, este es un tipo primitivo. Eso significa que si creo un segundo, `number2`, y lo hago igual a este número, entonces se creará una copia real del número, así que `number2`, también será uno, pero habrá copiado ese valor 1 en `number2`.

```javascript
const number1 = 1;
const number2 = number;
```

Sin embargo, los objetos y los arrays son de tipo referencia. Si creo un objeto `person` con un nombre y luego creo `secondPerson` y le asigno `person`tendrá el mismo valor que `person`, pero en realidad no habrá copiado `person`.

El objeto está almacenado en memoria y en la constante `person`, almacenamos un puntero a ese lugar en memoria y si luego asignamos `person` a `secondPerson` ese puntero será copiado.

```javascript
const person = {
  name: "Anibal",
};

const secondPerson = person;
console.log(secondPerson); // output: {name: Anibal}
```

Si cambiamos `person.name` después de haberlo copiado. Veremos el nuevo nombre modificado, a pesar de que imprimimos `secondPerson`. Así que para `secondPerson` el nombre también cambió.

```javascript
const person = {
  name: "Anibal",
};

const secondPerson = person;
person.name = "Manu";
console.log(secondPerson); // output: {name: Manu}
```

La razón de esto es que acaba de copiar el puntero y apunta al mismo objeto exacto en la memoria como lo have la persona. Así que si cambiamos el nombre en persona, automáticamente lo cambiamos para una segundaPersona.

Para evitar esto podemos utilizar `spread`. Simplemente crearemos `secondPperson` y extenderemos las propiedades de `person`. Esto sacará las propiedades y los valores de las propiedades de `person` y lo añadirá a `secondPerson`.

```javascript
const person = {
  name: "Anibal",
};

const secondPerson = {
  ...person,
};

person.name = "Manu";
console.log(secondPerson); // output: Anibal
```

Es importante tener en cuenta que los objetos y los arrays son de tipo referencia (sucede lo mismo con los arrays). Si los reasignamos, estamos copiando el puntero y no el valor. Por lo tanto, si queremos hacer una copia real, tendremos que crear un nuevo objeto y sólo copiar las propiedades, no todo el objeto.

## Métodos de array

Tanto en React como en ES6, utilizaremos mucho los array methods como, map, filter, sort, entre otros. Sobre todo utilizaremos `map` para renderizar listas en el DOM, es importante manejar todos estos métodos, ya que nos permitirán mostrar contenido de una manera más eficiente y entendible.

Un pequeño ejemplo sobre `map`

```javascript
const numbers = [1, 2, 3];
const doubleArray = numbers.map((num) => num * 2);
console.log(numbers); // output: [1, 2, 3]
console.log(doubleArray); // output: [2, 4, 6]
```

> Puedes repasar todos los métodos de array más usados [aquí](/javascript/array/array-methods)

Como ves todas estas mejoras nos ayudan a escribir un código más mantenible, y utilizable no sólo en React. Pero asegurate de tu navegador soporta esta sintáxis antes de utilizarla en producción.

❤️
