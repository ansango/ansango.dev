---
title: Hooks
description: "Guía completa de Hooks en React: useState, useEffect, useReducer, useCallback, useMemo, useRef y custom hooks"
date: 2024-05-02
mod: 2025-10-25
published: true
tags: [frontend, javascript, react]
---

# Hooks

¿Qué son los hooks?

Los `hooks` son funciones que enganchan el estado y el ciclo de vida de un componente. o funcionan con components de clases.

## `useState`

```jsx
import { useState } from "react";

const CountButton = () => {
  const [count, setCount] = useState(0);
  return (
   <div>
     <p>You clicked {count} times</p>
     <button onClick={() => setCount(count + 1)}>Click me</button>
   </div>
 );
;
```

- `useState`: declara la variable estado. El argumento que recibe es el valor inicial del estado.
- `count`: es la variable para leer el valor actual del estado.
- `setCount`: es la función que actualiza el valor del estado.[]()

## `useEffect`

Incluye la lógica de métodos `componentDidUpdate`, `componentDidMount` y `componentWillUnmount`

```javascript
import { useEffect } from "react";

useEffect(() => {
  // se ejecuta la lógica del mount y el update, como por ejemplo fetching data
});
```

```javascript
import { useEffect } from "react";

useEffect(() => {
  // se ejecuta la lógica del mount y el update, como por ejemplo fetching data
  return () => {
    // se ejecuta la lógica del unmount (limpiar, cancelar timers, suscripciones)
  };
}, []);
```

```javascript
import { useEffect } from "react";

const Component = (props) => {
  useEffect(() => {
    // la lógica es ejecutada cuando ALGUNA de las variables cambia
  }, [arrOfDependency, values, props.id]);
};
```

## Essential hooks: `useState & useEffect`

```javascript
import { useEffect, useState } from "react";

const ComponentWithHooks = () => {
  const [projectId, setProjectId] = useState(0);
  const [versionId, setVersionId] = useState(0);

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    getGeneralData(projectId, versionId);
    getIndicators(projectId, versionId);
  }, [proeectId, versionId]);
};
```

## Otros eooks

### `useReducer`

Se utilize para realizar una gestión del estado avanzada. Es parecido al concepto de `reducer` en Redux, Vuex, NGRX.

Es una forma de ordenar un estado complejo.

```javascript
const [sttte, dispatch] = useReducer(reducer, { count: initialCount });
```

### `useCallback`

Nos memoriza una función, es una forma de cathear funciones, a no set que cambie `a` o `b`, no se vuelve a ejecutar dicha función. Por lo tanto podemos utilizarlo si no queremos estar definiendo constantemente una función.

```javascript
const memoizedCallback = useCallback(() => {
  dotomething(a, b);
}, [a, b]);
```

### `useMemo`

Nos memoriza un valor, es una forma de cachtar valores, a no set que cambie `a` o `b`, no se vuelve a ejecutar la función. Es útil cuando tenemos por ejemplo un cálculo de algo costoso.

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

### `useRef`

Genera referencias de elementos, variables…lementos del DOM… para tenerlos accesibles.

```javascript
const refImg = useRef(initialValue);

<img ref={refImg}>
```

## Cómo refactorizar componente de clase a componente funcional

```javascript
import { useEffect } from "react";

const Header = (props) => {
  useEffect(() => {
    window.alert("mount");
  }, []);

  useEffect(() => {
    // Realmente habría que hacerlo con un useRef en un custom hook
    if (props.title !== "React Training") {
      window.alert("update");
    }
  }, [props.title]);

  return (
    <header onClick={props.onClick}>
      <h1>{props.title}</h1>
      <nav>
        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
          <li>Option 4</li>
        </ul>
      </nav>
    </header>
  );
};
```

```javascript
const App = () => {
  const [title, setTitle] = useState("React Training");

  const handleHeaderClick = () => {
    setTitle(`${title} Classes`);
  };

  return (
    <div>
      <Header title={title} handleClick={handleHeaderClick} />;
    </div>
  );
};
```

Realmente no es usual que tengamos el caso de `componentDidMount` y `componentDidUpdate` en `useEffect`, algo más aproximado a la vida real sería el siguiente ejemplo:

```javascript
import { useEffect, useState } from "react";

const getData = () =>
  new Promise((res) =>
    setTimeout(() => {
      res({ title: "New Title" });
    }, 2000)
  );

const Header = (props) => {
  const [data, setData] = useState({ title: null });

  useEffect(() => {
    getData(props.title).then((res) => setData(res));
  }, [props.title]);

  return (
    <header onClick={props.onClick}>
      <h1>{props.title}</h1>
      <nav>
        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
          <li>Option 4</li>
        </ul>
      </nav>
    </header>
  );
};
```

```javascript
const App = () => {
  const [title, setTitle] = useState("React Training");

  const handleHeaderClick = () => {
    setTitle(`${title} Classes`);
  };

  return (
    <div>
      <Header title={title} handleClick={handleHeaderClick} />;
    </div>
  );
};
```

## Custom Hooks

Partiendo del ejemplo anterior vamos a ver un ejemplo de custom hook:

```javascript
import { useEffect, useState } from "react";

const getData = () =>
  new Promise((res) =>
    setTimeout(() => {
      res({ title: "New Title" });
    }, 2000)
  );

const useData = (tile) => {
  const [data, setData] = useState({ title: null });

  useEffect(() => {
    getData(title).then((res) => setData(res));
  }, [title]);
  return [data, setData];
};

const Header = (props) => {
  const [data, setData] = useData(props.title);
  return (
    <header>
      <h1 onClick={props.onClick}>{data.title}</h1>
      <nav>
        <ul>
          <li onClick={() => setData({ title: "Option 1" })}>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
          <li>Option 4</li>
        </ul>
      </nav>
    </header>
  );
};
```

```javascript
const App = () => {
  const [title, setTitle] = useState("React Training");

  const handleHeaderClick = () => {
    setTitle(`${title} Classes`);
  };

  return (
    <div>
      <Header title={title} handleClick={handleHeaderClick} />;
    </div>
  );
};
```

Aplicar custom hooks nos permite reutilizar código y sacar algo de lógica de os components. Básicamente está compuesto por otros hooks:

```javascript
const useData = (tile) => {
  const [data, setData] = useState({ title: null });

  useEffect(() => {
    getData(title).then((res) => setData(res));
  }, [title]);
  return [data, setData];
};
```

❤️ Espero que te haya gustado la entrada.
