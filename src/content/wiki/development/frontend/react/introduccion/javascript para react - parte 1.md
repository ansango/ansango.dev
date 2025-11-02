---
title: Javascript para React - Parte 1
description: "JavaScript para React Parte 1: let/const, arrow functions, export/import y clases ES6 para desarrollo frontend"
date: 2024-05-02
mod: 2025-10-25
published: true
tags: [frontend, javascript, react]
---

# Javascript para React - Parte 1

## Entendiendo let y const

`var`, `let` y `const` son diferentes formas de crear variables.

Con `ES6` se introdujeron dos palabras clave diferentes, `let` y `const`.

`var` crea una variable en JavaScript, pero algunas variables nunca cambian realmente, y estas son las llamadas constantes. Técnicamente, sin embargo, son todas variables porque JavaScript sólo conoce `var`.

`var` todavía funciona, pero se recomienda encarecidamente el uso de `let` y `const`.

```javascript
var name = "Aníbal"; // output: Aníbal
name = "Manu"; // output: Manu
```

`let` es, por así decirlo, el nuevo var, úsalo para los valores de las variables. `let` y `const` también están cambiando algo detrás de las escenas sobre el alcance de las variables. Pero lo más importante aquí es usar `let` si quieres crear una variable que realmente sea variable.

```javascript
let name = "Aníbal"; // output: Aníbal
name = "Manu"; // output: Manu
```

Usa `const` si planeas crear un valor constante, así que algo que sólo asignas una vez y nunca cambias y ese es el caso más a menudo de lo que podrías pensar.

```javascript
const name = "Aníbal"; // output: Aníbal
name = "Manu"; // output: "TypeError: Assignment to constant variable"
```

## Arrow functions

`Arrow function`, es una sintaxis diferente para crear funciones de JavaScript. Una función normal se ve así con la palabra clave function.

Una función normal se ve así con la palabra clave `function`:

```javascript
function printName(name) {
  console.log(name);
}

printName("Aníbal"); // output: Aníbal
```

La sintaxis de `arrow function` flecha es un poco más corta que la sintaxis normal, ya que omite la palabra clave de la función y también, y ese es el gran beneficio.

```javascript
const printName = (name) => {
  console.log(name);
};

printName("Aníbal"); // output: Aníbal
```

```javascript
const duplicate = (number) => number * 2;

duplicate(2); // output: 4
```

Resuelve muchos de los problemas que a menudo teníamos con la palabra `this` Esta palabra clave no siempre se refiere a lo que podríamos haber esperado que se refiriera durante la escritura de nuestro código. Cuando la usamos dentro de una `arrow function`, siempre mantendrá su contexto y no lo cambiará tiempo de ejecución.

## Export e import

Otra característica que ofrece `ES6` es la de escribir código modular. Podemos dividir nuestro código en múltiples archivos. Sólo tenemos que importarlos en el orden correcto en nuestros archivos HTML.

La idea detrás de las declaraciones de exportación e importación y los llamados módulos, es que dentro de un archivo JavaScript, podemos importar contenido de otro archivo, de modo que tus archivos JavaScript mismos conocen sus dependencias.

Tenemos un `persona.js` y allí tenemos una `const` persona que almacena un objeto. Exportamos esto, con la palabra clave `deafult` que marca esto como la exportación por defecto de este archivo y luego podemos importar esto en otro lugar y la declaración de importación se mostrará en un segundo.

```javascript
// person.js

const person = {
  name: "Anibal",
};

export default person;
```

`person.js` como ves usa la palabra clave `default`, significa que siempre será nuestra exportación por defecto.

También podríamos tener un número de archivo donde exportamos varias cosas, en este caso `clean` y `data` que contiene un array.

```javascript
// utility.js

export const clean = () => {}; //...
export const data = []; //...
```

No exportamos nada por defecto, para que JavaScript sepa a qué estamos apuntando exactamente. A la hora de importarlo tenemos que darle el nombre exacto y el nombre va entre llaves.

En un tercer archivo, podríamos necesitar importar de `person.js` y `utility.js` así que en `app.js` importaremos nuestros módulos, de las siguientes maneras posibles:

```javascript
// app.js

import person from "./person.js";
import prs from "./person.js";

import { data, clean } from "./utility.js";
import { clean as cleanUtil } from "./utility.js";
import * as utilities from "./utility.js";
```

## Entendiendo clases

Las clases son esencialmente planos para objetos. Una clase se crea con la palabra clave `class` y puede tener tanto propiedades como métodos. Los métodos son simplemente funciones adjuntas a las clases.

Una clase es instanciada con la palabra clave `new` y así creamos objetos con clases.

Las clases también soportan la herencia, lo que significa que, tenemos otra clase de la que heredamos tomando todas sus propiedades y métodos y potencialmente añadiendo nuevas propiedades y métodos. Para indicarle a nuestra clase que hereda de otra simplemente añadimos la palabra `extends` y la clase de la que queramos heredar. Deberemos añadir en el `constructor` la palabra reservada `super()`, para hacer acceder a las propiedades de la clase de la cual heredamos.

```javascript
class Human {
  constructor() {
    this.gender = "Male";
  }
  printGender() {
    console.log(this.gender);
  }
}

class Person extends Human {
  constructor() {
    super();
    this.name = "Aníbal";
  }

  printName() {
    console.log(this.name);
  }
}

const person = new Person();
person.printName(); //output: Aníbal
person.printGender(); //output: Male
```

- **Propiedades**: son como variables adjuntas a las clases.
- **Métodos**: son como funciones adjuntas a las clases.
- **Constructor**: es la función donde configuramos las propiedades.

## Clases, propiedades y métodos en > ES6

`ES6` ofrece una sintaxis diferente para inicializar propiedades y métodos. Ahora nos ahorramos el uso de esta función constructora. Y los métodos podemos escribirlos con arrow functions.

```javascript
class Human {
  gender = "Male";
  printGender = () => {
    console.log(this.gender);
  };
}

class Person extends Human {
  name = "Aníbal";

  printName = () => {
    console.log(this.name);
  };
}

const person = new Person();
person.printName(); //output: Aníbal
person.printGender(); //output: Male
```

Como ves todas estas mejoras nos ayudan a escribir un código más mantenible, y utilizable no sólo en React. Pero asegurate de tu navegador soporta esta sintáxis antes de utilizarla en producción.

❤️
