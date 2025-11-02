---
title: Conceptos avanzados
description: "Conceptos avanzados de React: Error Boundaries, Fragments, High Order Components y patrones de desarrollo"
date: 2024-05-02
mod: 2025-10-25
published: true
tags: [frontend, javascript, react]
---

# Conceptos avanzados

## Error boundaries

Son components de React que capturan los errores en cualquier hijo del árbol de components. Son una especie de salvaguarda. Nos dan un log de esos errores que se producen. Nos muestran una interfaz en vez del árbol de components roto. Es como una especie de `try` `catch`

Podemos utilizarlos por ejemplo cuando falla una API cuando ésta nos devuelve algo inesperado, algo que no podamos controlar. Es interesante definir Error Boundaries en partes sensibles de la aplicación, en diferentes niveles, donde no podamos controlar errores inesperados.

**Sólo funcionan con clases.**

```javascript
const NoResults = (props) => {
  if (!props.results) {
    throw new Error("No results prop received");
  }
  return props.results.length && <span>No hay resultados disponibles</span>;
};

export default NoResults;
```

```javascript
<ErrorBoundary>
  <NoResults />
</ErrorBoundary>
```

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  // usamos este método para el estado
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  // usamos este método para logs
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <h1>We are sorry, there was a fatal error</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

Un ejemplo más real, partiendo de códigos anteriores sería el siguiente:

- Componente Bug

```javascript
const BugComponent = () => {
  const handleClick = () => {};
  throw Error("I'm a buggy component");
  return <button onClick={handleClick}>Click me! 🚀</button>;
};

export default BugComponent;
```

- Error Boundary

```javascript
export default class ErrorCatcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.log(error.toString(), errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong.</p>;
    }
    return this.props.children;
  }
}
```

- App

```javascript
const App = () => {
  return (
    <div className="App">
      <ErrorCatcher>
        <BugComponent />
      </ErrorCatcher>
      <div>{/* Componentes */}</div>
    </div>
  );
};

export default App;
```

## Fragments

Los fragments nos permiten agrupar una lista de components hijo sin tener que añadir nodos al DOM

```javascript
const MyComponent = () => {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
};
```

Este códgio anterior es lo mismo que esto:

```javascript
const MyComponent = () => {
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
  );
};
```

## High Order Components

Son funciones que reciben un componente como parámetro y devuelven un componente modificado. No son parte real de la API de React, pero suponen un patrón a utilizar para reutilizar la lógica de un componente. Nos permiten inyectar cosas, modificar propiedades, etc… Son como una especie de wrapper.

Están en desuso, pero a continuación vemos un ejemplo:

- High order functional component

```javascript
const withRedBox =
  (Component) =>
  ({ ...props }) =>
    <Component style={{ border: "red 1px solid" }} {...props} />;
```

- High order class component

```javascript
const withRedBox = (Component) => {
  class WithRedBox extends React.Component {
    render() {
      return <Component style={{ border: "red 1px solid" }} {...this.props} />;
    }
  }
};
```

Cada vez tienden a usarse menos por la aparición de los hooks.

Ejemplo más real:

- High Order Component

```javascript
import React from "react";

const withRedBox =
  (Component) =>
  ({ ...props }) =>
    <Component style={{ border: "red 1px solid" }} {...props} />;

export default withRedBox;
```

```javascript
import withRedBox from "../utils/withRedBox";

const mockApiCall = async (isFemale) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(isFemale ? "Michelle Jordan" : "Michael Jordan");
    }, 5000);
  });

const Header = ({ title, onClick, isFemale = false, style = {} }) => {
  const [userName, setUserName] = React.useState("Anibal");

  React.useEffect(() => {
    const fetchUserName = async () => {
      const name = await mockApiCall(isFemale);
      setUserName(name);
    };
    fetchUserName();
  }, [isFemale]);

  return (
    <header style={style} onClick={onClick}>
      <h1>{title}</h1>
      <nav>
        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
          <li>Option 4</li>
        </ul>
      </nav>
      <h3>{userName}</h3>
    </header>
  );
};

export default withRedBox(Header);
```

- App

```javascript
import Header from "./components/Header";
import { useState } from "react";

const App = () => {
  const [isFemale, setIsFemale] = useState(false);
  const title = "React Training";

  const handleHeaderClick = () => setIsFemale(!isFemale);

  return (
    <div className="App">
      <Header title={title} isFemale={isFemale} onClick={handleHeaderClick} />
      <div>{/* Componentes */}</div>
    </div>
  );
};

export default App;
```

❤️ Espero que te haya gustado la entrada.
