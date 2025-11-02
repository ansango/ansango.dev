---
title: Context-api
description: "Context API en React: gestión de estado global, useReducer, providers y consumo de contexto en componentes"
date: 2024-05-02
mod: 2025-10-25
published: true
tags: [context, javascript, react]
---

# Context-api

## Crear un contexto

Necesitaremos crear un contexto de la siguiente manera:

```javascript
import { createContext } from "react";
const NewsContext = createContext();

export default NewsContext;
```

## Concepto

Normalmente tenemos cierta información que la coge un componente y si la necesita un hijo de éste o el hijo del hijo, tenemos que ir propagándolo a través de propiedades.

Si tenemos un par de niveles es asumible, pero cuando tienes diez components, pasar toda esa información al último desde el primero, se convierte en algo poco recomendable.

Normalmente para solucionar esto utilizábamos `Redux`, almacenábamos esa información general en un nivel superior y se accedía desde cualquier componente sin necesidad de hacer toda esa propagación.

Para esto sirve `Context API`, a un cierto nivel definimos un contexto, en éste almacenamos información y la utilizamos donde la necesitemos.

Dentro de todo este manejo, tiene sentido hablar de los `reducers`.

## Reducers

¿Qué es un reducer?

Son funciones que a través de un switch definen diferentes devoluciones de datos. Realmente lo que se recibe en la función reducer, es un estado inicial y una acción, y en función de esa acción se devuelven estados diferentes.

Es por esto que es muy recomendable utilizarlo cuando la lógica se empìeza a complicar.

Ejemplo de reducer:

```javascript
import { GET_NEWS, GET_DESCRIPTION } from "../types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_NEWS:
      return { ...state, news: payload };

    case GET_DESCRIPTION:
      return { ...state, activeNews: payload };

    default:
      return state;
  }
};
```

## Caso de uso con Context API

### 1 - Definimos el contexto

```javascript
import { createContext } from "react";
const NewsContext = createContext();

export default NewsContext;
```

### 2 - Definimos el reducer

```javascript
import { GET_NEWS, GET_DESCRIPTION } from "../types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_NEWS:
      return { ...state, news: payload };

    case GET_DESCRIPTION:
      return { ...state, activeNews: payload };

    default:
      return state;
  }
};
```

### 3 - Declaramos el estado inicial

Declaramos el estado inicial

```javascript
import NewsContext from "./NewsContext";

const NewsState = (props) => {
  // Estado inicial

  let initialState = {
    news: [],
    activeNews: null,
  };
  return <NewsContext.Provider>{props.children}</NewsContext.Provider>;
};
export default NewsState;
```

### 4 - Seteamos el `useReducer`

Seteamos el hook `useReducer` con el reducer y el estado inicial:

```javascript
import { useReducer } from "react";
import NewsContext from "./NewsContext";
import NewsReducer from "./NewsReducer";

const NewsState = (props) => {
  // Estado inicial

  let initialState = {
    news: [],
    activeNews: null,
  };

  // seteamos useReducer

  const [state, dispatch] = useReducer(NewsReducer, initialState);
  return <NewsContext.Provider>{props.children}</NewsContext.Provider>;
};
export default NewsState;
```

### 5 - Creamos las funciones dispatch

Se despachan acciones que procesan el reducer:

```javascript
import { useReducer } from "react";
import axios from "axios";

import NewsContext from "./NewsContext";
import NewsReducer from "./NewsReducer";
import { GET_NEWS, GET_DESCRIPTION } from "../types";

const NewsState = (props) => {
  // Estado inicial

  let initialState = {
    news: [],
    activeNews: null,
  };

  // seteamos useReducer

  const [state, dispatch] = useReducer(NewsReducer, initialState);

  // despachamos getNews

  const getNews = async () => {
    try {
      let res = await axios.get("api/news");
      let { data } = res;
      dispatch({ type: GET_NEWS, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  // despachamos getDescription

  const getDescription = async () => {
    try {
      let res = await axios.get(`api/item/${id}`);
      let { data } = res;
      dispatch({ type: GET_DESCRIPTION, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  return <NewsContext.Provider>{props.children}</NewsContext.Provider>;
};
export default NewsState;
```

### 6 - Context Provider

```javascript
import { useReducer } from "react";
import axios from "axios";

import NewsContext from "./NewsContext";
import NewsReducer from "./NewsReducer";
import { GET_NEWS, GET_DESCRIPTION } from "../types";

const NewsState = (props) => {
  // Estado inicial

  let initialState = {
    news: [],
    activeNews: null,
  };

  // seteamos useReducer

  const [state, dispatch] = useReducer(NewsReducer, initialState);

  // despachamos getNews

  const getNews = async () => {
    try {
      let res = await axios.get("api/news");
      let { data } = res;
      dispatch({ type: GET_NEWS, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  // despachamos getDescription

  const getDescription = async () => {
    try {
      let res = await axios.get(`api/item/${id}`);
      let { data } = res;
      dispatch({ type: GET_DESCRIPTION, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  // Context Proveder

  return (
    <NewsContext.Provider
      value={{
        news: state.news,
        activeNews: state.activeNews,
        getNews,
        getDescription,
      }}
    >
      {props.children}
    </NewsContext.Provider>
  );
};
export default NewsState;
```

El contexto tiene un provider y dentro de éste se definen una series de valores. Estamos generando un contexto con los valores de este estado.

Este `NewsContext.Provider` actúa como wrapper para el contexto que acabamos de crear. Los valores en el componente serán devueltos en el `useContext` provider.

### 7 - Envolviendo nuestros components en el contexto

A conitnuación vamos a consumir los datos en los components hijo.

- App:

```javascript
import NewsList from "./components/NewsList";
import Description from "./components/Description";

import NewsState from "./context/News/NewsState";

const App = () => {
  return (
    <NewsState>
      <div>
        <NewsList />
        <Description />
      </div>
    </NewsState>
  );
};
```

Envolvemos nuestro componente App con el Estado.

- NewsList:

```javascript
import { useContext, useEffect } from "react";
import newsContext from "../context/News/NewsContext";

const NewsList = () => {
  const NewsContext = useContext(newsContext);

  useEffect(() => {
    NewsContext.getNews();
  }, []);

  return (
    <>
      <div>
        {NewsContext.news.length
          ? NewsContext.news.map((news) => (
              <div
                key={news.id}
                onClick={() => NewsContext.getDescription(news.id)}
              >
                {news.title}
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default NewsList;
```

Utilizamos aquí el `useContext` que recibe un objeto (el valor devuelto por React.createContext) y devuelve el valor del contexto actual para este contexto.

## Ejemplo final

- UserContext:

```javascript
import React from "react";
import { fetchUsernameByGender } from "../api/user";

const defaultState = {
  userName: null,
  isLoading: false,
  isLoaded: false,
};

const UserContext = React.createContext({
  ...defaultState,
  changeUser: () => {},
});

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOADING_USER": {
      return {
        userName: null,
        isLoading: true,
        isLoaded: false,
      };
    }
    case "SET_USER": {
      return {
        userName: action.payload,
        isLoading: false,
        isLoaded: true,
      };
    }
    case "CLEAR_USER": {
      return defaultState;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const UserProvider = ({ children, initialFemale = false }) => {
  const [state, dispatch] = React.useReducer(userReducer, defaultState);
  const dispatchAction = React.useCallback(
    (type, payload) => {
      dispatch({ type, payload });
    },
    [dispatch]
  );
  const [isFemale, setIsFemale] = React.useState(initialFemale);
  const handleHeaderClick = () => setIsFemale(!isFemale);

  React.useEffect(() => {
    const fetchUserName = async () => {
      dispatchAction("LOADING_USER");
      const name = await fetchUsernameByGender(isFemale);
      dispatchAction("SET_USER", name);
    };
    setTimeout(() => {
      fetchUserName();
    }, 1000);
  }, [dispatchAction, isFemale]);

  return (
    <UserContext.Provider
      value={{
        ...state,
        changeUser: handleHeaderClick,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => React.useContext(UserContext);

export { UserProvider, useUser };
```

- App

```javascript
import React from "react";

import "./App.css";
import Header from "./components/Header";
import SubHeader from "./components/SubHeader";
import Content from "./components/Content";
import Footer from "./components/Footer";
import { UserProvider } from "./state/UserContext";

const App = () => {
  const title = "React Training";

  return (
    <div className="App">
      <UserProvider>
        <Header title={title} />
        <SubHeader />
        <Content />
        <Footer />
      </UserProvider>
    </div>
  );
};

export default App;
```

- Header:

```javascript
import React from "react";
import { useUser } from "../state/UserContext";

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
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>

        <li>Option 4</li>
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

- Footer:

```javascript
import React from "react";
import { useUser } from "../state/UserContext";

const Footer = () => {
  const { userName, isLoading, isLoaded } = useUser();
  return (
    <footer style={{ textAlign: "center" }}>
      {isLoading && <p>Current user is loading</p>}
      {!isLoading && !isLoaded && <p>There isn't a user logged</p>}
      {isLoaded && <p>Current user logged: {userName}</p>}
    </footer>
  );
};

export default Footer;
```

❤️ Espero que te haya gustado la entrada.
