---
title: Como conectar con backend
description: "Conectar React con backend: Fetch API vs Axios, interceptores, timeouts y consumo de datos en componentes"
date: 2024-05-02
mod: 2025-10-25
published: true
tags: [axios, backend, fetch, frontend, javascript, react]
---

# Como conectar con backend

## Fetch

`fetch` es una API que nos provee de una series de recursos para poder comunicarnos con el backend, es decir, para poder hacer peticiones a un servidor.

### ¿Cómo Nos comunicamos con `fetch`?

En primer lugar necesitamos un endpoint al que llamar, y luego una series de opciones:

```javascript
const url = "https://myapi.com/user";
const options = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  body: JSON.stringify({ name: "John", surname: "Williams" }),
};

fetch(url, options).then((response) => console.log(response.status));
```

En `fetch` no tenemos una transformación directa a `JSON`, por lo que tendremos que convertir la respuesta para poder manejarla.

- ¿Cómo lo convertiríamos?

```javascript
fetch("https://myapi.com/user")
  .then(function (response) {
    // Convertimos a JSON
    return response.json();
  })
  .then(function (j) {
    // `j` es ya un objeto JavaScript 😄
    console.log(j);
  });
```

> Puedes leer una guía completa acerca de `fetch API` [aquí](/javascript/async/fetch-api)

## Axios

`axios` es un cliente `http` basado en promesas que normalmente es usado con React, lo que podemos hacer es comunicarnos con el servidor, además de proporcionarnos las siguientes características:

- Interceptores de peticiones y respuestas, si por ejemplo necesitamos meter un token, podemos crear un interceptor que es el encargado de obtenerlo e insertarlo en las cabeceras para luego hacer una petición.
- Transforma los datos obtenidos en las respuestas a `JSON` directamente.
- Nos permite cancelar las peticiones.

Para instalarlo podemos ejecutar el siguiente commando en terminal:

```bash
npm install axios --save
```

o

```bash
yarn add axios
```

### ¿Cómo Nos comunicamos con `axios`?

```javascript
const options = {
  url: "https://myapi.com/user",
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  body: JSON.stringify({ name: "John", surname: "Williams" }),
};

axios(options).then((response) => console.log(response.status));
```

## Diferencias entre `axios` y `fetch`

### Soporte

- `fetch`, tiene menos soporte, sobre todo por los más antiguos.
- `axios`, tiene menos problema ya que es soportado por la mayoría de navegadores.

### Timeouts

- `fetch`, es más enrevesado crear timeouts.

```javascript
const controller = new AbortController();
const options = {
  method: "POST",
  signal: controller.signal,
  body: JSON.stringify({ firstName: "David", lastName: "Pollock" }),
};
const promise = fetch("/login", options);
const timeoutId = setTimeout(() => controller.abort(), 4000);

promise
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

- `axios`, podemos crear timeouts fácilmente.

```javascript
axios({
  method: "post",
  url: "/login",
  timeout: 4000, // 4 segundos de timeout
  data: { firstName: "David", lastName: "Pollock" },
})
  .then((response) => console.log(response))
  .catch((error) => console.error("timeut exceeded"));
```

### Transformación automática a JSON

- `fetch`, no tenemos transformación automática, hay que realizarla encadenando promesas.

```javascript
fetch("https://myapi.com/profile")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

- `axios`, la tenemos en el objeto `response.data`.

```javascript
axios.get("https://myapi.com/profile").then(
  (response) => {
    console.log(response.data);
  },
  (error) => {
    console.error(error);
  }
);
```

### Interceptores

- `fetch`, no tenemos por defecto una manera provista para hacer interceptores de las peticiones. Podríamos reescribir el método global de fetch y definir nuestro propio interceptor.
- `axios`,
- podríamos crear un interceptor general:

```javascript
axios.interceptors.request.use((config) => {
  config.header["key"] = "example";
  return config;
});

axios.interceptors.response.use((res) => {
  console.log(res.data);
  return res;
});
```

- o bien crear una instancia (nos permite estandarizar varios tipos de peticiones):

```javascript
const instance = axios.create({
  baseURL: "https://myapi.com",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

instance.get(...)
```

### Barra de progreso

- `fetch`, no está provista.
- `axios`, tenemos el módulo `Axios Progress Bar`.

## Uso en React

Antes de empezar a consumir datos en nuestra aplicación, sería recomendable tener instalado lo siguiente:

- **React Developer Tools**: podemos depurar nuestra aplicación en React con las Developer Tools provistas para [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) y [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/).
- **Servidor mock**: existen varias opciones, pero podemos utilizar [`dyson`](https://github.com/webpro/dyson), que nos da un servidor mock bastante completo.

### Consumo de datos

- HelpDetail

```javascript
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const HelpDetail = (props) => {
  const params = useParams();
  const [helpData, setHelpData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/help/${params.name}`)
      .then((res) => {
        setHelpData(res.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.name]);

  return (
    <div>
      <h3>{params.name}</h3>
      <p>{loading && "The info is loading"}</p>
      <p>{!loading && helpData}</p>
    </div>
  );
};

export default HelpDetail;
```

- AllergenDetail

```javascript
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AllergenDetail = (props) => {
  const params = useParams();
  const [allergenData, setAllergenData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/allergen/${params.name}`)
      .then((res) => {
        setAllergenData(res.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.name]);
  return (
    <div>
      <h1>{params.name}</h1>
      <p>{loading && "The info is loading"}</p>
      <p>{!loading && allergenData}</p>
    </div>
  );
};

export default AllergenDetail;
```

❤️ Espero que te haya gustado la entrada.

Congrats! 🎊 has llegado al final de esta guía.
