---
title: Router
description: "Guía completa de React Router: navegación, rutas, hooks, BrowserRouter, HashRouter y navegación programática"
date: 2024-05-02
mod: 2025-10-25
published: true
tags: [javascript, react, router]
---

# Router

Para instalarla ejecutamos lo siguiente en terminal:

```bash
npm install react-router-dom
```

o si utilizamos `yarn`

```bash
yarn add react-router-dom
```

## Estructura del router

Para poder utilizar React Router tenemos que meter en nuestra aplicación lo siguiente:

- Componente `<Router></Router>`, nos permite tener rutas dentro de una aplicación y navegar entre ellas.
- Componente `<Switch></Switch>`, es un contenedor que indíca al router dónde tiene que meter el contenido de las rutas.
- Componente `<Route></Route>`, que contendrá el contenido propio de cada ruta y a qué ruta pertenece.
- Componente `<Link></Link>`, que nos permite navegar entre rutas sin salirnos de la SPA.

Podemos ver una estructura básica en el siguiente ejemplo:

```javascript
const App = () => {
  return (
    <div id="main" className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/todo">TodoList</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/todo">
              <Todo />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};
```

## Tipos de Router

### Browser Router

Se utiliza cuando en nuestra aplicación utilizamos paths regulares:

```javascript
<BrowserRouter>

// Regular paths

// https://example.com/your/page

```

### Hash Router

```javascript
<HashRouter>

// Paths with hash

// https://example.com/#/your/page

```

La principal diferencia entre los dos es la manera en la que las URLs son almacenadas y la manera de comunicarse con el web server. Pero a nivel funcional (navegación entre rutas), funcionan de la misma manera.

## Route matchers

Son los componentes que comprueban la url que tenemos en el navegador y que observan qué se tiene y qué no se tiene que renderizar.

Cuando se renderiza el `<Switch>`, se busca el componente `<Route>` que encaje con la url actual. Cuando se encuentra ese `<Route>`, se renderiza y se ignoran el resto de paths.

Por esta razón debemos de situar antes la ruta específica por delante de la más genérica.

```javascript
<Switch>
  <Route path="/about">
    <About />
  </Route>
  <Route path="/contact/:id">
    <Contact />
  </Route>
  <Route path="/contact">
    <AllContacts />
  </Route>
  <Route path="/">
    <Home />
  </Route>
</Switch>
```

## Navigators

Existen tres tipos de componentes para navegar entre rutas:

- `<Link></Link>`, es similar al tag `<a></a>` de html, a través del atributo `to` indicamos dónde queremos ir.

```javascript
<Link to="/">Home</Link>
```

- `<NavLink></NavLink>`, es exactamente igual al anterior, pero le da un estilo concreto cuando estamos en esa ruta.

```javascript
<NavLink to="/react" activeClassName="hurray">
  React
</NavLink>
```

- `<Redirect></Redirect>`, es un componente que según se renderiza hace que la aplicación navegue al sitio donde le indicamos. Se suele utilizar muchas veces en partes de la aplicación que hacen referencia a la autenticación. Por ejemplo, podemos comprobar si el usuario está no está autenticado o si no tiene permisos y redirigirle a la pantalla de login.

```javascript
<Redirect to="/login" />
```

## Navegación programática

Tenemos tres objetos para poder realizar está navegación:

### History

Este objeto nos permite navegar en la aplicación de manera programática. Este objeto nos da los siguientes métodos y propiedades (React Router funciona como un stack, y hay que tenerlo en cuenta a la hora de utilizar los métodos, ya que añaden al stack esas acciones):

- `push()`, añade una nueva entrada al stack y navega hacia ella
- `goBack()`, vuelve a la entrada anterior del objeto history
- `goForward()`, avanza a la siguiente entrada en el objeto history
- `block(prompt)`, bloquea la navegación. Por ejemplo, podemos usar este método si no queremos que el usuario abandone la página sin guardar cambios.
- `location`, es un objeto que nos devuelve información acerca de la ruta actual.

### Location

Como veíamos este objeto pertenece a `History` y nos proporciona información acerca de dónde está la aplicación ahora, dónde quieres que vaya, o incluso dónde estaba. Este objeto nos trae lo siguiente:

```javascript
{
  pathname: '/somewhere', // donde estamos actualmente
  search:'?some=search-string', // query string si nos pasan algo
  hash:'#howdy', // en caso de tener algún hash
  state: { // pasar información entre rutas
      [userDefined]: true
  }
}
```

### Match

Un objeto match contiene información sobre la coincidencia de una `<Route>` con la URL. Los objetos match contienen las siguientes propiedades:

```javascript
{
  isExact: true, // nos indica si la URL se casa completamente
  params: { projectId: "1", version: "1.0.0", modelId: "30" }, // objeto con todos los parámetros de la URL
  path: "/projects/:projectId/version/:version/models/:modelId", // El patrón de parámetros seguidos para obtener la ruta
  url: "/projects/1/version/1.0.0/models/30", // la URL completa
}
```

### Hooks

¿Cómo obtenemos los objetos anteriores? React Router viene con algunos hooks que te permiten acceder al estado del router y realizar la navegación desde dentro de tus componentes.

#### `useHistory`

El hook `useHistory` te da acceso a la instancia del historial que puedes usar para navegar.

```javascript
import { useHistory } from "react-router-dom";

const HomeButton = () => {
  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
};
```

#### `useLocation`

El hook `useLocation` devuelve el objeto location que representa la URL actual. Puedes pensar en él como un `useState` que devuelve una nueva ubicación cada vez que la URL cambia.

```javascript
import { useLocation } from "react-router-dom";

const usePageViews = () => {
  let location = useLocation();
  useEffect(() => {
    alert(`Changed to ${location.pathname}`);
  }, [location]);
};
```

#### `useParams`

`useParams` devuelve un objeto de pares clave/valor de parámetros URL. Se utiliza para acceder a `match.params` de la `<Route>` actual.

```javascript
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

const BlogPost = () => {
  let { id } = useParams();
  return <div>Now showing post {id}</div>;
};

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/blog/:id">
        <BlogPost />
      </Route>
    </Switch>
  </Router>,
  node
);
```

#### `useRouteMatch`

El hook `useRouteMatch` intenta hacer coincidir la URL actual de la misma manera que lo haría un `<Route>`. Es útil sobre todo para acceder a los datos de coincidencia sin tener que renderizar una `<Route>`.

```javascript
import { useRouteMatch } from "react-router-dom";

const BlogPost = () => {
  let match = useRouteMatch("/blog/:slug");

  return <div>The pattern is {match.path}</div>;
};
```

## Ejemplo completo

- App

```javascript
import React from "react";

import "./App.css";
import Header from "./components/Header";
import SubHeader from "./components/SubHeader";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Help from "./components/Help";
import AllergenDetail from "./components/AllergenDetail";
import { UserProvider } from "./state/UserContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const title = "React Training";

  return (
    <div className="App">
      {/* Router */}
      <Router>
        <UserProvider>
          <Header title={title} />
          <SubHeader />
          {/* Switch */}
          <Switch>
            {/* Routes */}
            <Route path="/allergen/:name">
              <AllergenDetail />
            </Route>
            <Route path="/allergen">
              <Content />
            </Route>
            <Route path="/help">
              <Help />
            </Route>
            <Route path="/">
              <div>
                <h1> Welcome!</h1>
              </div>
            </Route>
          </Switch>
          <Footer />
        </UserProvider>
      </Router>
    </div>
  );
};

export default App;
```

- Header

```javascript
import React from "react";
import { useUser } from "../state/UserContext";
import { Link, NavLink } from "react-router-dom";
const Header = ({ title, style = {} }) => {
  const { changeUser } = useUser();
  return (
    <header style={style} onClick={changeUser}>
      <h1>{title}</h1>
      <Nav />
      <UserBox />
    </header>
  );
};

const Nav = () => {
  return (
    <nav>
      <ul>
        <NavLink to="/" exact>
          Home 🏠
        </NavLink>
        <NavLink to="/allergen">Menú 🍕</NavLink>
        <NavLink to="/help">Help 🚧</NavLink>
      </ul>
    </nav>
  );
};

const UserBox = () => {
  const { userName } = useUser();
  return <h3>{userName}</h3>;
};

export default Header;
```

- Allergen Detail

```javascript
import React from "react";
import { useParams } from "react-router-dom";

const AllergenDetail = (props) => {
  const params = useParams();
  return (
    <div>
      <h1>{params.name}</h1>
      <p>
        We don't have any informaion about this allergen yet. But we will get it
        soon 😉
      </p>
    </div>
  );
};

export default AllergenDetail;
```

- Content

```javascript
import React from "react";
import List from "./List";
import { allergens } from "../data";

const Content = () => {
  const [menu, setMenu] = React.useState([]);
  const handleAdd = (id) => {
    setMenu((pv) => [...pv, allergens.find((a) => a.id === id)]);
  };
  return (
    <div className="flex w-100">
      <div className="w-50">
        <h1>Available:</h1>
        <List items={allergens} onSelect={handleAdd} showButtons />
      </div>
      <div className="w-50">
        <h1>Menu:</h1>
        <List items={menu} />
      </div>
    </div>
  );
};

export default Content;
```

- List

```javascript
import React from "react";
import { useHistory } from "react-router";
import Allergen from "./Allergen";

const List = (props) => {
  const history = useHistory();
  const handleSelect = (id) => {
    props.onSelect(id);
  };

  return (
    <div>
      {props.items.map((a) => (
        <Allergen
          key={a.id}
          name={a.text}
          icon={a.icon}
          hot={a.yummy}
          showButton={props.showButtons}
          onSelect={() => handleSelect(a.id)}
          onClick={() => history.push(`/allergen/${a.text}`)}
        />
      ))}
    </div>
  );
};

export default List;
```

- Help

```javascript
import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import HelpDetail from "./HelpDetail";

const Help = (props) => {
  return (
    <div>
      <h1>Help</h1>
      <Link to="/help/react">React Help</Link>
      <Link to="/help/allergen">Allergen Help</Link>
      <Switch>
        <Route path="/help/:name">
          <HelpDetail />
        </Route>
      </Switch>
    </div>
  );
};

export default Help;
```

- Help Detail

```javascript
import React from "react";
import { useParams } from "react-router-dom";

const HelpDetail = (props) => {
  const params = useParams();
  return (
    <div>
      <h3>{params.name}</h3>
      <p>Here we are going to show {params.name} help</p>
    </div>
  );
};

export default HelpDetail;
```

❤️ Espero que te haya gustado la entrada.
