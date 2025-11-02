---
title: Class Components
description: "Componentes de clase en React: estado, ciclo de vida, componentDidMount, componentDidUpdate y componentWillUnmount"
date: 2024-05-02
mod: 2025-10-25
published: true
tags: [frontend, javascript, react]
---

# Class Components

Ejemplo de componente clase:

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}

<Welcome name="Anibal" />;
```

## Diferencias entre tipos de componenes

### Function based components

-* Reciben props
- Devuelven `JSX`
- Las propiedades son de solo lectura
- La performance es mejor que en los components de clase

### Class based components

- No reciben nada, extienden de React.Component
- Tienen un método `render` que devuelve `JSX`
- Accedemos a las propiedades mediante `this`: `this.props.name`
- Tenemos disponible un estado interno de componente.
- Podemos inicializar el estado en el `constructor`
- Tenemos ciclos de vida como en otros frameworks como Vue o Angular

### ¿Cuándo Deberíamos utilizar cada tipo de componente?

Actualmente con la llegada de los Hooks, podemos hacer la mayoría de components como funciones o como clases. La elección va a depender de diferentes factores como:

- Performance.
- Mantenimiento.
- Facilidad en el desarrollo.

Normalmente si la situación es indiferente se suele utilizar components como función. Un ejemplo real de componente clase sería el siguiente:

```javascript
import React from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = {
      todos: [
        { value: "Ordenar la casa", done: true },
        { value: "Hacer ejercicio", done: false },
      ],
    };
  }
  addItem(todoItem) {
    const newTodo = {
      index: this.state.todos.length + 1,
      value: todoItem,
      done: false,
    };
    this.setState({ todos: [...this.state.todos, newTodo] });
  }
  removeItem(itemIndex) {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((item, idx) => idx !== itemIndex),
    }));
  }
  markTodoDone(itemIndex) {
    const todos = [...this.state.todos];
    todos[itemIndex] = { ...todos[itemIndex], done: !todos[itemIndex].done };
    this.setState({ todos });
  }
  render() {
    return (
      <div id="main" className="App">
        <h1>Todo List</h1>
        <TodoList
          items={this.state.todos}
          removeItem={this.removeItem}
          markTodoDone={this.markTodoDone}
        />
        <TodoForm addItem={this.addItem} />
      </div>
    );
  }
}
```

Respecto al estado de los components nos sucede como en los components función; no podemos modificarlo directamente, deberemos utilizar el método `setState` para modificar nuestro estado del componente.

## Ciclos de vida en los components de clase

### Mounting: cuando se crea el componete y se renderiza

Las fases son:

- Se ejecuta el `constructor`.
- Se ejecuta el método `render`.
- React actualiza el DOM y refs.
- Se ejecuta el método `componentDidMount`

Una vez montado, el constructor nunca se vuelve a llamar.

### Updating: cuando algo have que se actualice el componente y se vuelve a renderizar. Por ejemplo el padre del componente modifica las propiedades y el componente hijo vuelve a renderizarse

Las fases son:

- Se ejecuta el método `render` (se da cuando tenemos nuevas propiedades, `setState()`, o `forceUpdate()`).
- React actualiza el DOM y refs.
- Se ejecuta el método `componentDidUpdate`

Las modificaciones de las propiedades o el estado hacen que el componente se actualice, pero no se desmonta y vuelve a montarse. Lo que sucede es que se vuelve a llamar al método `render`.

### Unmounting: cuando se desmota el componente y desaparece. Por ejemplo cuando en una navegación pasamos de una pantalla a otra y el componente ya no aplica en la nueva pantalla

Solo tenemos una única fase:

- Se ejecuta el método `componentWillUnmount`

En este caso el método se ejecuta justo antes de que se desmonte.

## Métodos del ciclo de vida

### `componentDidMount`

- Se ejecuta cuando se ha producido la primera renderización del componente.
- Nos sirve para añadir información al DOM. Operar con el DOM, porque hasta que no lo tenemos disponible no podemos manipularlo.
- Inicializar timers.
- Setear suscripciones.
- Cargas de datos. Por ejemplo el consumo de una api para cargar datos.

Siempre que utilicemos timers o suscripciones, deberemos ejecutar el método `componentWillUnmount` para cancelar los timers o las suscripciones. Si no los matamos tendremos una fuga de memoria.

### `componentDidUpdate`

- Este método se ejecuta inmediatamente después de que suceda la actualización de o bien props o el estado.
- Cargas de datos. Por ejemplo en una vista de detalle, el id de los elementos va cambiando, entonces actualizamos la información de ese componente.
- Llamar al método `setState`, para setear el estado comparando el estado anterior y el estado actual.

### `componentWillUnmount`

- Es invocado inmediatamente antes de desmontar y destruir el componente.
- Limpiar el componente.
- Cancelar peticiones.
- Cancelar timers
- Eliminar suscripciones.

Ejemplo:

```javascript
import React from "react";

class Header extends React.Component {
  componentDidMount() {
    window.alert("mount");
  }

  componentDidUpdate() {
    window.alert("update");
  }

  render() {
    return (
      <header onClick={this.props.onClick}>
        <h1>{this.props.title}</h1>
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
  }
}
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

❤️ Espero que te haya gustado la entrada.
