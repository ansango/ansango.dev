---
title: Introducción a React
description: "Introducción a React: biblioteca JavaScript para UI, JSX, componentes, Virtual DOM y create-react-app"
date: 2024-05-02
mod: 2025-10-25
published: true
tags: [frontend, javascript, react]
---

# Introducción a React

Antes de empezar puedes revisar las bases para aprender correctamente React en: [[javascript para react - parte 1]] y [[javascript para react - parte 2]]

React es una libería Javascript, React solo nos cubre el modelo vista, entonces para tener un patrón por ejemplo MVC necesitaríamos complementarlo con otras librerías.

El objetivo principar es construir UI.

React se conforma por components encapsulados, donde incluiremos lógica de presentación, lógica de datos y lógica de estilos. Siempre la lógica de datos y la lógica de presentación van juntas.

React utilize Virtual DOM, es una representación del DOM guardada en memoria, cuando existen cambios React compara el DOM real y busca la mejor manera de actualizar los datos.

Es una de las librerías más utilizadas por delante de Angular y Vue.

## CLI - create-react-app

```bash
npm i -g create-react-app
npx create-react-app my-first-app
```

```bash
cd my-first-app
yarn start
```

- Estructura base:
  - public
  - src
    - index.js: es el punto de entrada donde React renderiza el componente App.
    - index.css: estilos para el index.js
    - App.js: componente tipo función que nos devuelve un elemento de react `<div></div>` (jsx)
    - App.css: estilos para el componente App.js
  - .gitignore
  - package-lock.json
  - package.json.
    - Dependencias base:
      - testing-library
      - react
      - react-dom
      - react-scripts
      - web-vitals (rendimiento)
    - Scripts:
      - start
      - build
      - test
      - eject
  - README.md
  - yarn.lock

## JSX

Es una sintáxis parecida a HTML pero no es HTML, combina Javascript y HTML.

```javascript
const element = <h1>Hello World!</h1>;
```

No es obligatorio utilizarlo con React, pero es altamente recomendable.

- Qué podemos hacer con `JSX`?

```javascript
const formatName = (user) => {
  return `${user.firstName} ${user.lastName}`;
};

const user = {
  firstName: "Anibal",
  lastName: "Santos",
};

const element = <h1>Hello, {formatName(user)}</h1>;
```

## React Elements

Son elementos más pequeños de las aplicaciones de React, nos translimiten lo que queremos ver en la pantalla, son básicamente objetos planos.

Son inmutables, para actualizar la interfaz tenemos que crear un nuevo elemento. Por lo tanto React Dom compara el elemento y sus hijos previous y solo aplica las actualizaciones necesarias.

```javascript
function tick() {
    const element = {
        <div>
            <h1>Hello World!</h1>
            <p>It is{new Date().toLocaleTimeString()}</p>
        </div>
    }
    ReactDOM.render(element, document.getElementById('root'))
}

setInterval(tick, 1000)
```

❤️ Espero que te haya gustado la entrada.
