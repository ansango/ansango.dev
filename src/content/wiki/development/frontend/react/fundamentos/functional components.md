---
title: Functional Components
description: "Componentes funcionales en React: props, estado con hooks, eventos, renderizado condicional y listas"
date: 2024-05-02
mod: 2025-10-25
published: true
tags: [frontend, javascript, react]
---

# Functional Components

Básicamente son: funciones de Javascript que devuelven un elemento de React.

Ejemplo:

```jsx
const Welcome = (props) => {
    return <h1>Hello, {props.name}</h1>
}

const element = <Welcome name="Anibal"/>

ReactDOM.render(element, document.getElementById('root))

```

## Componer components

```javascript
const Welcome = (props) => {
  return <h1>Hello, {props.name}</h1>;
};

export default Welcome;
```

```javascript
import Welcome from './welcome'

const WelcomeEverybody = () => {
    return (
        <div>
            <Welcome name="Juan">
            <Welcome name="Sara">
            <Welcome name="Anibal">
        </div>
    )
}

export default WelcomeEverybody

```

## Propiedades y estado de los components

En el caso anterior cada vez que se renderice nuestra aplicación los components perderían el estado, para conservar ese estado tendríamos las `props`.

Estas propiedades son inmutables y no pueden set modificadas.

Tendría que se el componente padre el que modificara el valor y actualizase éste al componente hijo. Las propiedades de un componente solo son de lectura.

### Eventos

```javascript
const handleClick = () => {
    ...
}

<button onClick={handleClick}>
    Handle Click
</button>
```

Ejemplo para modificar el valor de una prop con eventos:

```javascript
const TodoItem = (props) => {
  return (
    <li>
      <div>
        <Icon onClick={() => props.markDone(props.item.id)} />
        {props.item.value}
        <button onClikc={() => props.removeItem(props.item.id)}>&times;</button>
      </div>
    </li>
  );
};
```

```javascript
<TodoItem item={item} removeITem={props.removeItem} markDone={props.markDone} />
```

### Gestión del estado (Hooks)

Los hooks son funciones que permiten introducir un estado ciclos de vida en components funcionales. El más sencillo es `useState()`

```javascript
const [state, setState] = useState({ counter: 0 });
```

Donde `state` es la variable a leer y `setState` es la función para escribir el estado.

`useState` es asíncrono, por eso tenemos un método para poder modificar el valor. El valor del estado sólo puede modificarse dese la función de `setState`.

Actualizar el valor del estado del componente depende del valor actual. React no actualizará el estado hasta que el componente se vuelva a renderizar.

Entonces es por esto que, `setState` es una función asíncrona.

React espera hasta que todos los components llamen a `setState` en sus manejadores de eventos antes de empezar a re-renderizar.

Para actualizar el estado con valores que dependen del estado actual, podemos tener una función en `setState` en vez de un objeto.

```javascript
incrementCount() {
    setCount(prevCount => prevCount + 1)
}

handleSomething() {
    incrementCount()
    incrementCount()
    incrementCount()
}

```

## Renderizado condicional

```javascript
const Welcome = (props) => {
    return {
        <div>
            {props.name ? (
                <h1>Welcome {props.name}</h1>
            ) : (
                <span>You are note a known user</span>
            )}
        </div>
    }
}
```

```javascript
const NoResults = (props) =>
  !(props.results && props.results.length > 0) && (
    <span>No hay resultados disponibles</span>
  );
```

## Listas

En el renderizado de listas, la propiedad `key` nos ayuda a deterctar que elementos han sido modificados, añadidos o eliminados. Tiene que se única, y es recomendable no usar los índices del array como key por si cambia el orden.

```javascript

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        <li key={number.toSting()}>
            {number}
        </li>
    )
    return (
        <ul>{listItems}</ul>
    )
}

cons numbers = [1,2,3,4,5]

```

❤️ Espero que te haya gustado la entrada.
