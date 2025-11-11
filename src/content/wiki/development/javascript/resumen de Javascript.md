---
title: Resumen de Javascript
description: "Resumen completo de JavaScript: sintaxis, tipos de datos, arrays, objetos, funciones, clases y programación asíncrona"
date: 2022-05-02
mod: 2025-11-11
published: true
tags: [javascript]
---

# Resumen de Javascript

## Comentarios

```javascript
// Comentario en una sola línea

/* Comentario en
varias líneas */
```

## Tipos de datos

JavaScript proporciona siete tipos de datos diferentes:

| Data Types  | Examples                                                                    |
| ----------- | --------------------------------------------------------------------------- |
| `undefined` | Una variable a la que no se le ha asignado un valor es de tipo `undefined`. |
| `null`      | sin valor.                                                                  |
| `string`    | `'a', 'aa', 'aaa', 'Hello!', '11 cats'`                                     |
| `number`    | `12, -1, 0.4`                                                               |
| `boolean`   | `true, false`                                                               |
| `object`    | Una colección de propiedades.                                               |
| `symbol`    | Representa un identificador único.                                          |

## Variables

```javascript
// declara una variable
var ourName;

// almacena valores
myNumber = 5;
myString = "myVar";

// declarar variables con el operador de asignación
var myNum = 0;

// sumar, restar, multiplicar y dividir
myVar = 5 + 10; // 15
myVar = 12 - 6; // 6
myVar = 13 * 13; // 169
myVar = 16 / 2; // 8

// incrementar o decrecer el valor
i++; // the equivalent of i = i + 1
i--; // the equivalent of i = i - 1;

// decimales
var ourDecimal = 5.7; // float
```

### ES6 var, let y const

- A diferencia de `var`, `let` arroja un error si se declara la misma variable dos veces.
- Las variables declaradas con `let` dentro de un bloque, sentencia o expresión, su alcance está limitado a ese bloque, sentencia o expresión.
- Las variables declaradas con `const` son de sólo lectura y no pueden set reasignadas.
- Los objetos (incluyendo arrays y funciones) asignados a una variable usando `const` siguen siendo mutables y sólo se impide la reasignación del identificador de la variable.

Para asegurar que los datos no cambian, JavaScript proporciona una función Object.freeze para prevenir la mutación de datos.

```javascript
let obj = {
  name: "FreeCodeCamp",
  review: "Awesome",
};

Object.freeze(obj);
obj.review = "bad"; //se ignorará. Mutación no permitida
obj.newProp = "Test"; //se ignorará. Mutación no permitida
console.log(obj);
// { name: "FreeCodeCamp", review: "Awesome"}
```

## Strings

```javascript
// escapar de las comillas literales
var sampleStr = 'Alan dijo: "Pedro está aprendiendo JavaScript".';
// esto imprime: Alan dijo, "Peter está aprendiendo JavaScript".

// concatenar string
var ourStr = "Yo voy primero. " + "Yo soy el segundo.";

// concatenando strings con +=
var ourStr = "Yo voy primero. ";
nuestroStr += "Vengo segundo.";

// construyendo strings con variables
var ourName = "freeCodeCamp";
var ourStr = "Hola, nuestro nombre es " + ourName + ", ¿cómo estás?";

// añadiendo variables a strings
var anAdjective = "Impresionante";
var ourStr = "freeCodeCamp es ";
ourStr += anAdjective;
```

### Secuencias de escape

| Código | Salida                 |
| ------ | ---------------------- |
| `\'`   | comillas simples (`'`) |
| `\"`   | comillas doubles (`"`) |
| `\\`   | backslash (`\`)        |
| `\n`   | nueva línea            |
| `\r`   | carriage return        |
| `\t`   | tab                    |
| `\b`   | backspace              |
| `\f`   | form feed              |

### Longitud de un string

```javascript
"Alan Peter".length; // 10
```

### Split y Join

```javascript
let str = "a string";
let splittedStr = str.split("");
// ​​​​​[ 'a', ' ', 's', 't', 'r', 'i', 'n', 'g' ]​​​​​

let joinedStr = splittedStr.join("");
// a string​​​​​
```

### Índice de una string

```javascript
//el primer elemento tiene un índice de 0
var firstLetterOfFirstName = "";
var firstName = "Ada";
firstLetterOfFirstName = firstName[0]; // A

// encontrar el último carácter de un string
var firstName = "Ada";
var lastLetterOfFirstName = firstName[firstName.length - 1]; // a
```

### ES6 Template Literals

```javascript
const person = {
  name: "Zodiac Hasbro",
  age: 56,
};

// Template literal con interpolación de varias líneas y strings
const greeting = `Hello, my name is ${person.name}!
I am ${person.age} years old.`;

console.log(greeting);
// Hello, my name is Zodiac Hasbro!
// I am 56 years old.
```

## Arrays

```javascript
var sandwich = ["peanut butter", "jelly", "bread"][
  // arrays anidados
  (["Bulls", 23], ["White Sox", 45])
];
```

### Índice de un array

```javascript
var ourArray = [50, 60, 70];
var ourData = ourArray[0]; // 50

// modificar un array con índices
var ourArray = [50, 40, 30];
ourArray[0] = 15; // equals [15,40,30]

// acceder a matrices multidimensionales con índices
var arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [[10, 11, 12], 13, 14],
];
arr[3]; // [[10,11,12], 13, 14]
arr[3][0]; // [10,11,12]
arr[3][0][1]; // 11
```

### Manipular arrays con reverse, push, pop, shift and unshift

```javascript
// reverse() le da la vuelta al array
[1, "two", 3].reverse(); // ​​​​​[ 3, 'two', 1 ]

// push() añade un elemento al final del array
var arr = [1, 2, 3];
arr.push(4); // arr is now [1,2,3,4]

// pop() para eliminar el último valor del array
var threeArr = [1, 4, 6];
var oneDown = threeArr.pop();
console.log(oneDown); // 6
console.log(threeArr); // [1, 4]

// shift() elimina el primer elemento del array
var ourArray = [1, 2, [3]];
var removedFromOurArray = ourArray.shift();
// [2, [3]].

// unshift() añade un elemento al principio del array
var ourArray = ["Stimpson", "J", "cat"];
ourArray.shift(); // ["J", "cat"]
ourArray.unshift("Happy"); // ["Happy", "J", "cat"]
```

### Eliminar cualquier elemento con splice

```javascript
// el primer parámetro es el índice, el segundo indica el número de elementos a eliminar.
let array = ["today", "was", "not", "so", "great"];
array.splice(2, 2);
// elimina 2 elementos empezando por el tercer elemento
// ['today', 'was', 'great']

// también devuelve un nuevo array que contiene el valor de los elementos eliminados
let array = ["I", "am", "feeling", "really", "happy"];
let newArray = array.splice(3, 2); // ['really', 'happy']

// el tercer parámetro, representa uno o más elementos
function colorChange(arr, index, newColor) {
  arr.splice(index, 1, newColor);
  return arr;
}
let colorScheme = ["#878787", "#a08794", "#bb7e8c", "#c9b6be", "#d1becf"];
colorScheme = colorChange(colorScheme, 2, "#332327");
// hemos eliminado '#bb7e8c' y añadido '#332327' en su lugar
// colorScheme es ahora igual a ['#878787', '#a08794', '#332327', '#c9b6be', '#d1becf']
```

### Copiar un array con slice

```javascript
// Copia un número determinado de elementos a un nuevo array y deja el array original intacto
let weatherConditions = ["rain", "snow", "sleet", "hail", "clear"];
let todaysWeather = weatherConditions.slice(1, 3);
// todaysWeather es igual a ['snow', 'sleet'];
// weatherConditions sigue siendo igual a ['rain', 'snow', 'sleet', 'hail', 'clear']
```

### indexOf

```javascript
let fruits = ["apples", "pears", "oranges", "peaches", "pears"];
fruits.indexOf("dates"); // -1
fruits.indexOf("oranges"); // 2
fruits.indexOf("pears"); // 1, el primer índice en el que existe el elemento
```

### Acceder a arrays anidados

```javascript
var ourPets = [
  {
    animalType: "cat",
    names: ["Meowzer", "Fluffy", "Kit-Cat"],
  },
  {
    animalType: "dog",
    names: ["Spot", "Bowser", "Frankie"],
  },
];
ourPets[0].names[1]; // "Fluffy"
ourPets[1].names[0]; // "Spot"
```

### ES6 Includes para saber si un array tiene un determinado elemento

```javascript
let fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.includes("Mango"); // true
```

### ES6 Operador Spread

```javascript
// El código ES5 de abajo utiliza apply() para calcular el valor máximo de un array.
var arr = [6, 89, 3, 45];
var maximus = Math.max.apply(null, arr); // 89

// ...arr devuelve un array sin empaquetar. En otras palabras, extiende el array.
const arr = [6, 89, 3, 45];
const maximus = Math.max(...arr); // 89

// [...new Set(arr)] = array de valores únicos
const arr = [1, 2, 2, 3, 3, 4, 5, 5];
const uniq = [...new Set(arr)]; // [1,2,3,4,5]

// copiar un array
let thisArray = [true, true, undefined, false, null];
let thatArray = [...thisArray];
// thatArray es igual a [true, true, undefined, false, null]
// thisArray no se modifica y es idéntico a thatArray

// combinar arrays
let thisArray = ["sage", "rosemary", "parsley", "thyme"];
let thatArray = ["basil", "cilantro", ...thisArray, "coriander"];
// thatArray now equals  ['basil', 'cilantro', 'sage', 'rosemary', 'parsley', 'thyme', 'coriander']
```

### ES6 Desestructuración de arrays para asignar variables

```javascript
const [a, b] = [1, 2, 3, 4, 5, 6];
console.log(a, b); // 1, 2

// acceder a cualquier valor utilizando comas para llegar al índice deseado
const [a, b, , , c] = [1, 2, 3, 4, 5, 6];
console.log(a, b, c); // 1, 2, 5

// recoger el resto de los elementos en un array separado.
const [a, b, ...arr] = [1, 2, 3, 4, 5, 7];
console.log(a, b); // 1, 2
console.log(arr); // [3, 4, 5, 7]
```

## Métodos de array

### Map

```javascript
var watchList = [
  {
    Title: "Inception",
    imdbRating: "8.8",
    Type: "movie",
  },
  {
    Title: "Interstellar",
    imdbRating: "8.6",
    Type: "movie",
  },
  {
    Title: "The Dark Knight",
    imdbRating: "9.0",
    Type: "movie",
  },
  {
    Title: "Batman Begins",
    imdbRating: "7.9",
    Type: "movie",
  },
];

const rating = watchList.map(function (movie) {
  return { title: movie.Title, rating: movie.imdbRating };
});
/* [ { title: 'Inception', rating: '8.8' }, 
  { title: 'Interstellar', rating: '8.6' }, 
  { title: 'The Dark Knight', rating: '9.0' }, 
  { title: 'Batman Begins', rating: '7.9' } ]  */

// or...
const rating = watchList.map((movie) => ({
  title: movie.Title,
  rating: movie.imdbRating,
}));
/* [ { title: 'Inception', rating: '8.8' }, 
  { title: 'Interstellar', rating: '8.6' }, 
  { title: 'The Dark Knight', rating: '9.0' }, 
  { title: 'Batman Begins', rating: '7.9' } ]  */
```

> Puedes ver más acerca de los métodos de array [aquí](/javascript/array/array-methods).

## Objetos

```javascript
var cat = {
  name: "Whiskers",
  legs: 4,
  tails: 1,
  enemies: ["Water", "Dogs"],
};
```

### Acceso a las propiedades de los objetos

Acceder con (`.`)

```javascript
var myObj = {
  prop1: "val1",
  prop2: "val2",
};

var prop1val = myObj.prop1; // val1
var prop2val = myObj.prop2; // val2
```

Acceder con (`[]`)

```javascript
var myObj = {
  "Space Name": "Kirk",
  "More Space": "Spock",
  NoSpace: "USS Enterprise",
};

myObj["Space Name"]; // Kirk
myObj["More Space"]; // Spock
myObj["NoSpace"]; // USS Enterprise
```

Acceder con variables

```javascript
var dogs = {
  Fido: "Mutt",
  Hunter: "Doberman",
  Snoopie: "Beagle",
};

var myDog = "Hunter";
var myBreed = dogs[myDog];
console.log(myBreed); // "Doberman"
```

Acceder y modificar objetos anidados

```javascript
let userActivity = {
  id: 23894201352,
  date: "January 1, 2017",
  data: {
    totalUsers: 51,
    online: 42,
  },
};

userActivity.data.online = 45; // o
userActivity["data"].online = 45; // o
userActivity["data"]["online"] = 45;
```

Creación de un array a partir de las claves de un objeto

```javascript
let users = {
  Alan: {
    age: 27,
    online: false,
  },
  Jeff: {
    age: 32,
    online: true,
  },
  Sarah: {
    age: 48,
    online: false,
  },
  Ryan: {
    age: 19,
    online: true,
  },
};

function getArrayOfUsers(obj) {
  let arr = [];
  for (let key in obj) {
    arr.push(key);
  }
  return arr;
}
```

### Modificación de las propiedades de los objetos

```javascript
// Actualización de las propiedades del objeto
var ourDog = {
  name: "Camper",
  legs: 4,
  tails: 1,
  friends: ["everything!"],
};

ourDog.name = "Happy Camper"; // o
ourDog["name"] = "Happy Camper";

// añadir nuevas propiedades
ourDog.bark = "bow-wow"; // o
ourDog["bark"] = "bow-wow";

// eliminar properties
delete ourDog.bark;
```

### Objetos para búsquedas

```javascript
var alpha = {
  1:"Z",
  2:"Y",
  3:"X",
  4:"W",
  ...
  24:"C",
  25:"B",
  26:"A"
};
alpha[2]; // "Y"
alpha[24]; // "C"

var value = 2;
alpha[value]; // "Y"
```

### Comprobar propiedades de los objetos

```javascript
var myObj = {
  top: "hat",
  bottom: "pants",
};

myObj.hasOwnProperty("top"); // true
myObj.hasOwnProperty("middle"); // false
```

### Acceso a objetos anidados

```javascript
var ourStorage = {
  desk: {
    drawer: "stapler",
  },
  cabinet: {
    "top drawer": {
      folder1: "a file",
      folder2: "secrets",
    },
    "bottom drawer": "soda",
  },
};

ourStorage.cabinet["top drawer"].folder2; // "secrets"
ourStorage.desk.drawer; // "stapler"
```

### Desestructuración de variables a partir de objetos

```javascript
// Teniendo en cuenta el siguiente código ES5:
var voxel = { x: 3.6, y: 7.4, z: 6.54 };
var x = voxel.x; // x = 3.6
var y = voxel.y; // y = 7.4
var z = voxel.z; // z = 6.54

// la misma sentencia de asignación con la sintaxis de desestructuración de ES6
const { x, y, z } = voxel; // x = 3.6, y = 7.4, z = 6.54

// para almacenar los valores de voxel.x en a, voxel.y en b, y voxel.z en c, también tienes esa libertad
const { x: a, y: b, z: c } = voxel; // a = 3.6, b = 7.4, c = 6.54

// Desestructuración de variables de objetos anidados
const a = {
  start: { x: 5, y: 6 },
  end: { x: 6, y: -9 },
};

const {
  start: { x: startX, y: startY },
} = a;

console.log(startX, startY); // 5, 6
```

### ES6 Desestructuración para pasar un objeto como parámetro de una función

```javascript
// Desestructurar el objeto en un argumento propio de la función.
const profileUpdate = (profileData) => {
  const { name, age, nationality, location } = profileData;
};

// también se puede hacer así:
const profileUpdate = ({ name, age, nationality, location }) => {};
```

### ES6 Declaraciones literales de objetos mediante campos simples

```javascript
const getMousePosition = (x, y) => ({
  x: x,
  y: y,
});

// la misma función reescrita para utilizar esta nueva sintaxis:
const getMousePosition = (x, y) => ({ x, y });
```

## Booleanos

Los booleanos sólo pueden tener uno de dos valores: verdadero o falso. Son básicamente pequeños interruptores de encendido y apagado,

donde verdadero es "on" y falso es "off". Estos dos estados son mutuamente excluyentes.

```javascript
true;
false;
```

## If/Else

### If

```javascript
if (condition is true) {
  // se ejecuta la declaración
}
```

### Else

```javascript
if (num > 10) {
  return "Bigger than 10";
} else {
  return "10 or Less";
}
```

### Else if

```javascript
if (num > 15) {
  return "Bigger than 15";
} else if (num < 5) {
  return "Smaller than 5";
} else {
  return "Between 5 and 15";
}
```

### Operador Condicional (ternario)

```javascript
// esta declaración if...
function findGreater(a, b) {
  if (a > b) {
    return "a is greater";
  } else {
    return "b is greater";
  }
}

// equivale a este operador ternario
function findGreater(a, b) {
  return a > b ? "a is greater" : "b is greater";
}
```

### Operadores condicionales múltiples (ternarios)

```javascript
// esta declaración if...
function findGreaterOrEqual(a, b) {
  if (a === b) {
    return "a and b are equal";
  } else if (a > b) {
    return "a is greater";
  } else {
    return "b is greater";
  }
}

// equivale a este operador ternario
function findGreaterOrEqual(a, b) {
  return a === b
    ? "a and b are equal"
    : a > b
    ? "a is greater"
    : "b is greater";
}
```

## Switch

```javascript
switch(num) {
  case value1:
    statement1;
    break;
  case value2:
    statement2;
    break;
...
  case valueN:
    statementN;
    break;
}
```

### Declaración Switch por defecto

```javascript
switch (num) {
  case value1:
    statement1;
    break;
  case value2:
    statement2;
    break;
...
  default:
    defaultStatement;
    break;
}
```

### Multiples opciones con la declaración Switch

```javascript
switch (val) {
  case 1:
  case 2:
  case 3:
    result = "1, 2, or 3";
    break;
  case 4:
    result = "4 alone";
}
```

## Operadores de comparación

| Operador | Significado          |
| -------- | -------------------- |
| `==`     | Igualdad             |
| `===`    | Igualdad estricta    |
| `!=`     | Desigualdad          |
| `!==`    | Desigualdad estricta |
| `>`      | Mayor que            |
| `>=`     | Mayor o igual que    |
| `<`      | Menos que            |
| `<=`     | Menor o igual que    |
| `&&`     | Y                    |
| <code>   |                      | </code> | O |

## Bucles

### While

```javascript
var ourArray = [];
var i = 0;
while (i < 5) {
  ourArray.push(i);
  i++;
}
```

### Do…While

```javascript
var ourArray = [];
var i = 0;
do {
  ourArray.push(i);
  i++;
} while (i < 5);
```

### For

```javascript
var ourArray = [];
var i = 0;
while (i < 5) {
  ourArray.push(i);
  i++;
}

// Contar hacia atrás con un bucle For
var ourArray = [];
for (var i = 10; i > 0; i -= 2) {
  ourArray.push(i);
}

// Iterar a través de un array
var arr = [10, 9, 8, 7, 6];
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// Bucles for anidados
var arr = [
  [1, 2],
  [3, 4],
  [5, 6],
];
for (var i = 0; i < arr.length; i++) {
  for (var j = 0; j < arr[i].length; j++) {
    console.log(arr[i][j]);
  }
}
```

### ES6 for-of

```javascript
for (let value of myArray) {
  console.log(value);
}
```

## Funciones

```javascript
function functionName() {
  console.log("Hello World");
}

functionName(); // llamada a la función
```

### Argumentos de la función

```javascript
function ourFunctionWithArgs(a, b) {
  console.log(a - b);
}
ourFunctionWithArgs(10, 5); // 5
```

### Return

```javascript
function plusThree(num) {
  return num + 3;
}
var answer = plusThree(5); // 8
```

### Funciones autoinvocadas

```javascript
(function () {
  console.log("A cozy nest is ready");
})();
```

### ES6 Arrow Functions

```javascript
const myFunc = function () {
  const myVar = "value";
  return myVar;
};

// se puede reescribir así
const myFunc = () => {
  const myVar = "value";
  return myVar;
};

// y así si no hay cuerpo de la función, y sólo un valor de retorno
const myFunc = () => "value";

// para pasar parámetros
const doubler = (item) => item * 2;
```

### ES6 Arrow Functions de orden superior

```javascript
FBPosts.filter(function (post) {
  return post.thumbnail !== null && post.shares > 100 && post.likes > 500;
});

// la función anterior se puede reescribir así
FBPosts.filter(
  (post) => post.thumbnail !== null && post.shares > 100 && post.likes > 500
);
```

### ES6 Opetador Spread con parámetros de función

Con el operador spread, se pueden crear funciones que toman un número variable de argumentos. Estos argumentos se almacenan en una matriz a la que se puede acceder posteriormente desde el interior de la función.

```javascript
function howMany(...args) {
  return "You have passed " + args.length + " arguments.";
}
console.log(howMany(0, 1, 2)); // Has pasado 3 argumentos
console.log(howMany("string", null, [1, 2, 3], {})); // Has pasado 4 argumentos.
```

### ES6 Funciones Declarativas dentro de Objetos

```javascript
// Al definir funciones dentro de los objetos en ES5, tenemos que utilizar la palabra clave function
const person = {
  name: "Taylor",
  sayHello: function () {
    return `Hello! My name is ${this.name}.`;
  },
};

// Con ES6, se puede eliminar la palabra clave function y los dos puntos
const person = {
  name: "Taylor",
  sayHello() {
    return `Hello! My name is ${this.name}.`;
  },
};
```

## Regex

| Char       | Descripción                                                                                                                        |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `\`        | Escapa a un carácter especial.                                                                                                     |
| <code>     | </code>                                                                                                                            | Búsqueda de patrones múltiples. Para que coincida con "sí" o "no", la regex es `/sí - no/`. |
| `i`        | Esta bandera se utilize para ignorar las mayúsculas y minúsculas. `/ignorecase/i`.                                                 |
| `g`        | Buscar o extraer un patrón más de una vez.                                                                                         |
| `.`        | El carácter comodín `.` coincidirá con cualquier carácter excepto con las líneas nuevas.                                           |
| `[]`       | Permite definir los caracteres que deben coincidir. `/b[au]g/` coincidirá con "bag", "bug" pero no con "bog".                      |
| `[a-z]`    | Coinciden con todos los caracteres entre la a y la z.                                                                              |
| `[1-9]`    | Coinciden con todos los números entre el 1 y el 9.                                                                                 |
| `[a-z1-9]` | Coinciden con todos los caracteres entre la a y la z, y los números entre el 1 y el 9.                                             |
| `[^]`      | Coincidir con los caracteres que no están en el conjunto. `[^a-e]` coincide con todos los demás caracteres excepto A, B, C, D y E. |
| `+`        | Coinciden con 1 o más apariciones del carácter anterior en una fila.                                                               |
| `*`        | Coinciden con 0 o más apariciones del carácter anterior.                                                                           |
| `?`        | Coincide con 0 o 1 ocurrencia del carácter anterior. Útil para las coincidencias perezosas.                                        |
| `^`        | Buscar patrones al principio de las cadenas.                                                                                       |
| `$`        | Buscar patrones al final de una cadena.                                                                                            |
| `\w`       | Igual a `[A-Za-z0-9_]`. Coincide con mayúsculas, minúsculas, números y el carácter de subrayado (-).                               |
| `\W`       | Coincide con cualquier carácter que no sea una palabra. Equivale a `[^a-za-z0-9_]`.                                                |
| `\d`       | Equivale a `[0-9]`. Coincide con un dígito.                                                                                        |
| `\D`       | Equivale a `[^0-9]`. Coincide con un no dígito.                                                                                    |
| `\s`       | Coincide con un espacio en blanco.                                                                                                 |
| `\S`       | Coinciden con todo excepto los espacios en blanco.                                                                                 |
| `a{2,5}`   | Coincidir con la letra `a` entre 3 y 5 veces.                                                                                      |
| `a{2,}`    | Especifique sólo el número menor de coincidencias.                                                                                 |
| `a{5}`     | Especificar el número exacto de coincidencias.                                                                                     |
| `(…)`      | Especificar un grupo al que se puede acceder con número (desde 1)                                                                  |

### Métodos Regex

| Método      | Descripción                                                      |
| ----------- | ---------------------------------------------------------------- |
| `test()`    | Devuelve true o false si el patrón coincide con una cadena o no. |
| `match()`   | Extrae las coincidencias reales encontradas.                     |
| `replace()` | Buscar y reemplazar texto en una cadena.                         |

### Ejemplos

```javascript
// el método test devuelve true o false si el patrón coincide con una cadena o no
let myString = "Hello, World!";
let myRegex = /Hello/;
let result = myRegex.test(myString);

// extrae las coincidencias de un regex con el método match
let extractStr = "Extract the word 'coding' from this string.";
let codingRegex = /coding/;
let result = extractStr.match(codingRegex);

// Search and replace
let wrongText = "The sky is silver.";
let silverRegex = /silver/;
wrongText.replace(silverRegex, "blue"); // devuelve "El cielo es azul".

// buscar varios patrones utilizando el operador de alternancia u OR: |
let petString = "James has a pet cat.";
let petRegex = /dog|cat|bird|fish/;
let result = petRegex.test(petString);

// ignora las mayúsculas o minúsculas
let myString = "freeCodeCamp";
let fccRegex = /freeCodeCamp/i; // flag i
let result = fccRegex.test(myString);

// Buscar o extraer un patrón más de una vez
let twinkleStar = "Twinkle, twinkle, little star";
let starRegex = /Twinkle/gi; // a regex can have multiple flags
let result = twinkleStar.match(starRegex);

// El carácter comodín . coincidirá con cualquier carácter, excepto las líneas nuevas.
let exampleStr = "Let's have fun with regular expressions!";
let unRegex = /.un/;
let result = unRegex.test(exampleStr);

// Definir los caracteres a coincidir, en este ejemplo todas las vocales en quoteSample
let quoteSample =
  "Beware of bugs in the above code; I have only proved it correct, not tried it.";
let vowelRegex = /[aeiou]/gi;
let result = quoteSample.match(vowelRegex);

// Coincidir con todos los caracteres en quoteSample (entre a y z)
let quoteSample = "The quick brown fox jumps over the lazy dog.";
let alphabetRegex = /[a-z]/gi;
let result = quoteSample.match(alphabetRegex);

// Coincidir con todos los caracteres entre dos caracteres y números
let quoteSample = "Blueberry 3.141592653s are delicious.";
let myRegex = /[h-s2-6]/gi;
let result = quoteSample.match(myRegex);

// Coincidir con todo lo que no sea un número o una vocal
let quoteSample = "3 blind mice.";
let myRegex = /[^aeiou0-9]/gi;
let result = quoteSample.match(myRegex);

// Coincidir con 1 o más apariciones del carácter anterior (* para 0 o más)
let difficultSpelling = "Mississippi";
let myRegex = /s+/g;
let result = difficultSpelling.match(myRegex);

// ? Coincide con 0 o 1 ocurrencia del carácter anterior. Útil para la concordancia perezosa
let text = "titanic";
let myRegex = /t[a-z]*?i/;
let result = text.match(myRegex);

// Buscar patrones al principio de las cadenas
let rickyAndCal = "Cal and Ricky both like racing.";
let calRegex = /^Cal/;
let result = calRegex.test(rickyAndCal);

// Buscar patrones al final de una cadena
let caboose = "The last car on a train is the caboose";
let lastRegex = /caboose$/;
let result = lastRegex.test(caboose);

// \w es igual a [A-Za-z0-9_]
let quoteSample = "The five boxing wizards jump quickly.";
let alphabetRegexV2 = /\w/g;
let result = quoteSample.match(alphabetRegexV2).length;

// Coincidir sólo con las h de 3 a 6 letras en la palabra "Oh no"
let ohStr = "Ohhh no";
let ohRegex = /Oh{3,6} no/;
let result = ohRegex.test(ohStr);

// Coincide con la versión en inglés americano (favorite) y en inglés británico (favorite) de la palabra
let favWord = "favorite";
let favRegex = /favou?rite/;
let result = favRegex.test(favWord);

// Los grupos () le permiten reutilizar patrones
let repeatNum = "42 42 42";
let reRegex = /^(\d+)\s\1\s\1$/; // cada 1 representa el grupo (\d+)
let result = reRegex.test(repeatNum);

// Elimina todos los espacios al principio y al final de una cadena
let hello = "   Hello, World!  ";
let wsRegex = /^\s+(.*\S)\s+$/;
let result = hello.replace(wsRegex, "$1"); // devuelve 'Hello, World!'
```

## Orientación a objetos

```javascript
let duck = {
  name: "Aflac",
  numLegs: 2,
  sayName: function () {
    return "The name of this duck is " + this.name + ".";
  },
};

duck.sayName(); // Devuelve "El nombre de este pato es Aflac".
```

### Constructores y nuevos objetos

Los constructores siguen algunas convenciones:

- Los constructores se definen con un nombre en mayúsculas para distinguirlos de otras funciones que no son constructores.
- Los constructores utilizan la palabra clave this para establecer las propiedades del objeto que van a crear. Dentro del constructor, this se refiere al nuevo objeto que creará.
- Los constructores definen propiedades y comportamientos en lugar de devolver un valor como pueden hacer otras funciones.

```javascript
// constructor
function Bird(name, color) {
  this.name = name;
  this.color = color;
}

// crear una nueva instancia de Bird
let cardinal = new Bird("Bruce", "red");
let duck = new Bird("Donald", "blue");

// acceder y modificar el objeto blueBird
cardinal.name; // Bruce
cardinal.color; // red
cardinal.color = green;
cardinal.color; // green

// comprobar si un objeto es una instancia de un constructor
cardinal instanceof Bird; // true
crow instanceof Bird; // false

// comprueba las propiedades de los objetos (nombre, color, número de patas)
cardinal.hasOwnProperty("color"); // true
cardinal.hasOwnProperty("age"); // false

// comprobar las propiedades de un objeto con la propiedad del constructor
cardinal.constructor === Bird; // true

// utilizar constructor.prototype para añadir nuevas propiedades a los constructores de objetos
Bird.prototype.cute = true;
cardinal.cute; // true
crow.cute; // true

// añadir más de una propiedad y método a un constructor
Bird.prototype = {
  constructor: Bird, // especificar el constructor
  numLegs: 2, // nueva propiedad

  eat: function () {
    // new method
    console.log("nom nom nom");
  },

  describe: function () {
    // new method
    console.log("My name is " + this.name);
  },
};

let chicken = new Bird("Dinner", "brown");
chicken.numLegs; // 2
chicken.eat(); // nom nom nom
chicken.describe(); // My name is Dinner
```

### Herencia

```javascript
function Animal() {}

Animal.prototype = {
  constructor: Animal,
  eat: function () {
    console.log("nom nom nom");
  },
};

function Cat(name) {
  this.name = name;
}

// hacer que el constructor Gato herede la función eat() de Animal
Cat.prototype = Object.create(Animal.prototype);

let myCat = new Cat("charles");
myCat.eat(); // nom nom nom
```

Add methods after Inheritance and override them

```javascript
function Animal() {}
Animal.prototype.eat = function () {
  console.log("nom nom nom");
};

// Constructor Perro
function Dog() {}

// hacer que el constructor de Gog herede la función eat() de Animal
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  console.log("wof wof!");
};

// el nuevo objeto tendrá tanto el método heredado eat() como su propio método bark()
let beagle = new Dog();
beagle.eat(); // "nom nom nom"
beagle.bark(); // "Woof!"

// anula un método heredado
Dog.prototype.eat = function () {
  return "nice meeeeat!";
};

let doberman = new Dog();
doberman.eat(); // nice meeeeat!
```

### Mixins

Un mixin permite que objetos no relacionados utilicen una colección de funciones.

```javascript
let bird = {
  name: "Donald",
  numLegs: 2,
};

let boat = {
  name: "Warrior",
  type: "race-boat",
};

// este mixin contiene el método glide
const glideMixin = function (obj) {
  obj.glide = function () {
    console.log("gliding...");
  };
};

// el objeto se pasa al mixin y se le asigna el método glide
glideMixin(bird);
glideMixin(boat);

bird.glide(); // "gliding..."
boat.glide(); // "gliding..."
```

### Closures para proteger las propiedades

En JavaScript, una función siempre tiene acceso al contexto en el que fue creada. Esto se llama closure. Ahora bien, la propiedad sólo puede set accedida y modificada por métodos también dentro de la función constructora.

```javascript
function Bird() {
  // en lugar de this.hatchedEgg...
  let hatchedEgg = 10; // private property

  this.getHatchedEggCount = function () {
    // método disponible públicamente que un objeto pájaro puede utilizar
    return hatchedEgg;
  };
}

let ducky = new Bird();
ducky.hatchedEgg = 2; // no pasa nada
ducky.getHatchedEggCount; // 10
```

### Modules

Una expresión de función inmediatamente invocada (IIFE) se utilize a menudo para agrupar la funcionalidad relacionada en un solo objeto o módulo.

```javascript
let funModule = (function () {
  return {
    isCuteMixin: function (obj) {
      obj.isCute = function () {
        return true;
      };
    },

    singMixin: function (obj) {
      obj.sing = function () {
        console.log("Singing to an awesome tune");
      };
    },
  };
})();

function Dog() {}
let goodBoy = new Dog();

// asignar el método singMixin al objeto goodBoy
funModule.singMixin(goodBoy);
goodBoy.sing(); // Cantando con una melodía impresionante
```

## ES6 Orientación a objetos

ES6 proporciona una nueva sintaxis para ayudar a crear objetos, la palabra clave `class`.

es sólo una sintaxis, y no una implementación completa basada en clases del paradigma orientado a objetos,

a diferencia de lenguajes como Java, o Python, o Ruby, etc.

### ES6 Classes

```javascript
class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  getSummary() {
    return `${this.title} was written by ${this.author} in ${this.year}`;
  }

  getAge() {
    const years = new Date().getFullYear() - this.year;
    return `${this.title} is ${years} years old`;
  }
}

book = new Book("Book One", "John Doe", 2016);
book.getSummary(); // Book One fue escrito por John Doe en 2016
book.getAge(); // Book One tiene 3 años
```

### ES6 getters y setters

```javascript
class Book {
  constructor(author) {
    this._author = author;
  }
  // getter
  get writer() {
    return this._author;
  }
  // setter
  set writer(updatedAuthor) {
    this._author = updatedAuthor;
  }
}
const lol = new Book("anonymous");
console.log(lol.writer); // anonymous
lol.writer = "wut";
console.log(lol.writer); // wut
```

### ES6 Métodos estáticos

Los métodos estáticos permiten utilizar métodos sin instanciar un objeto

```javascript
class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  static sayHi() {
    return "Hi!";
  }
}

Book.sayHi(); // Hi!
```

### ES6 Herencia

```javascript
class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  getSummary() {
    return `${this.title} was written by ${this.author} in ${this.year}`;
  }
}

class Magazine extends Book {
  constructor(title, author, year, month) {
    super(title, author, year);
    this.month = month;
  }

  sayHi() {
    return "Hi!";
  }
}

mag = new Magazine("Mag", "People", 2019, "jan");
mag.getSummary(); // Mag was written by People in 2019
mag.sayHi(); // Hi!
```

## Import y export ES6

> Las lecciones en esta sección manejan características no relacionadas con el navegador. La importación no funcionará en un navegador directamente.
> Sin embargo, podemos usar varias herramientas para crear código a partir de esto para que funcione en el navegador.

### Import

```javascript
// podemos elegir qué partes de un módulo o archivo cargar en un archivo determinado.
import { function } from 'file_path'
// ¡También podemos importar variables de la misma manera!

// Importar todo desde un archivo
import * as name_of_your_choice from 'file_path'
```

### Export

Sin embargo, para que `import` funcione, primero debemos `exportar` las funciones o variables que necesitamos.

Al igual que la importación, la exportación es una función que no está en el navegador.

```javascript
const capitalizeString = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export { capitalizeString }; // Exportar funciones.
export const foo = "bar"; // Exportar variables.

// Como alternativa, si quieres comprimir todas las declaraciones de exportación en una sola línea, puede hacer esto:
const capitalizeString = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const foo = "bar";
export { capitalizeString, foo };

// Utilizar la exportación por defecto si sólo se exporta un valor de un archivo.
// También se utiliza para crear un valor de reserva para un archivo o módulo
export default function add(x, y) {
  return x + y;
}
// y para importar
import add from "math_functions";
add(5, 4); // devolverá 9
```

## Async/Await

### JavaScript es un lenguaje síncrono

> Esto significa que sólo se puede realizar una operación a la vez. Hay muchas maneras de que JavaScript nos proporcione la capacidad de hacer que se comporte como un lenguaje asíncrono. Una de ellas es con la cláusula Async-Await.

### ¿Qué Es async-await?

Async y Await son extensions de las promesas. Primero tienes que entender qué son `Promises` antes de llegar a async/await.

### Async

Las funciones asíncronas nos permiten escribir código basado en promesas como si fuera síncrono, pero sin bloquear el hilo de ejecución. Funciona de forma asíncrona a través del bucle de eventos. Las funciones asíncronas siempre devolverán un valor. Usar `async` simplemente implica que se devolverá una promesa, y si no se devuelve una `promesa`, JavaScript la envuelve automáticamente en una promesa resuelta con su valor.

```javascript
async function firstAsync() {
  return 23;
}

firstAsync().then(alert); // 23
```

Ejecutar el código anterior da el output `alerta` como 23, significa que una `promesa` fue devuelta, de lo contrario el método `.then()` simplemente no sería possible.

### Await

El operador await se utilize para esperar a que se complete una promesa. Puede set utilizado dentro de un bloque `async` solamente. La palabra clave `await` have que JavaScript espere hasta que la promesa devuelva un resultado. Hay que tener en cuenta que sólo have esperar al bloque de función `async` y no a toda la ejecución del programa.

El siguiente bloque de código muestra el uso de Async Await juntos.

```javascript
async function firstAsync() {
    let promise = new Promise((res, rej) => {
        setTimeout(() => res("Now it's done!"), 1000)
    });

    // espera hasta que la promesa nos devuelva un valor
    let result = await promise;

    // "¡Ahora está hecho!"
    alert(result);
    }
};
firstAsync();
```

### Cosas a recordar cuando se usa Async Await

#### No podemos utilizar la palabra clave `await` dentro de las funciones regulares

```javascript
function firstAsync() {
  let promise = Promise.resolve(10);
  let result = await promise; // Syntax error
}
```

Para que la función anterior funcione correctamente, tenemos que añadir `async` antes de la función `firstAsync();`

#### Async Await have que la ejecución sea sequential

No tiene porque set una cosa negativa pero tener una ejecución paralela es mucho más rápido.

Por ejemplo:

```javascript
async function sequence() {
  await promise1(50); // Espera 50ms...
  await promise2(50); // ...luego espera otros 50ms.
  return "done!";
}
```

Lo anterior tarda 100ms en completarse, no es una gran cantidad de tiempo pero sigue siendo lento.

Esto se debe a que está sucediendo en secuencia. Se devuelven dos promesas, ambas tardan 50ms en completarse. La segunda promesa se ejecuta sólo después de que la primera promesa se resuelva. Esto no es una buena práctica, ya que las peticiones grandes pueden consumir mucho tiempo. Tenemos que hacer que la ejecución sea paralela.

Esto se puede conseguir utilizando `Promise.all()` .

Según MDN:

> El método `Promise.all()` devuelve una única `Promise` que se resuelve cuando todas las promesas pasadas como iterable se han resuelto o cuando la iterable no contiene ninguna promesa.

#### Promise.all()

```javascript
async function sequence() {
  await Promise.all([promise1(), promise2()]);
  return "done!";
}
```

La función `promise.all()` resuelve cuando todas las promesas dentro del iterable han sido resueltas y luego devuelve el resultado.

Another method:

```javascript
async function parallel() {
  // Inicia un temporizador de 500ms de forma asíncrona...
  const wait1 = promise1(50);
  // ...lo que significa que este temporizador ocurre en paralelo.
  const wait2 = promise2(50);

  // Espera 50ms para el primer temporizador...
  await wait1;

  // ...para lo cual este temporizador ya ha terminado.
  await wait2;

  return "done!";
}
```

Async Await puede set peligroso pero si lo usamos correctamente, nos ayudará a que nuestro código sea muy legible y eficiente.
