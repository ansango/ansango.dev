---
title: Fetch API
description: "Guía completa de Fetch API en JavaScript: peticiones HTTP, headers, manejo de respuestas JSON y envío de datos"
date: 2025-10-14
mod: 2025-10-25
published: true
tags: [async, fetch, javascript, promise]
---

# Fetch API

Uno de los secretos peor guardados sobre AJAX en la web es que la API subyacente para ello, XMLHttpRequest, no fue realmente hecha para usarla en la manera en la que lo hacemos.

## XMLHttpRequest

XHR es un poco complicado en mi opinión, y ni puñetera idea de por qué razón"XML" está en mayúsculas

pero "Http" está en minúsculas 😠.

Así es como se usa XHR ahora:

```javascript
// Vaya jaleo!!!
if (window.XMLHttpRequest) {
  // Mozilla, Safari, ...
  request = new XMLHttpRequest();
} else if (window.ActiveXObject) {
  // IE 💀
  try {
    request = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {}
  }
}

// Open, send.
request.open("GET", "https://async-blocks.name/ajax-endpoint", true);
request.send(null);
```

Por supuesto, los fabulosos frameworks de JavaScript ❤️, hacen que sea más agradable trabajar con XHR, pero lo anterior es un auténtico jaleo.

## Uso básico de fetch

Una función fetch está provista ya en el global window scope, siendo su primer argumento la URL:

```javascript
// url (obligatorio), options (opcional)
fetch("https://async-blocks.name/some/url", {
  method: "get",
})
  .then(function (response) {})
  .catch(function (err) {
    // Error 😰
  });
```

**fetch API** utilize promesas de JavaScript para gestionar los resultados/las devoluciones:

```javascript
// Manejo simple 😏
fetch("https://async-blocks.name/some/url")
  .then(function (response) {})
  .catch(function (err) {
    // Error :(
  });

// Manejo avanzado 🧑‍🔬
fetch("https://async-blocks.name/some/url")
  .then(function (response) {
    return; //...
  })
  .then(function (returnedValue) {
    // ...
  })
  .catch(function (err) {
    // Error 😰
  });
```

Vale, puede que jamás has usado **then**, pero sinceramente, comiénza a usarlo, porque en breves no verás otra cosa.

## Headers

La capacidad de establecer las cabeceras de las peticiones es importante para la flexibilidad de las mismas. Puedes trabajar con las cabeceras de las peticiones ejecutando `new Headers()`, y también puedes utilizar los métodos append, has, get, set y delete para modificar las cabeceras de las peticiones:

```javascript
// Crear una instancia vacía de cabeceras:
var headers = new Headers();

// Añadir cabeceras:
headers.append("Content-Type", "text/plain");
headers.append("X-My-Custom-Header", "CustomValue");

// Comprobar, obtener y setear nuevos valores para una cabecera
headers.has("Content-Type"); // true
headers.get("Content-Type"); // "text/plain"
headers.set("Content-Type", "application/json");

// Eliminar una cabecera
headers.delete("X-My-Custom-Header");

// Crear y añadir valores iniciales
var headers = new Headers({
  "Content-Type": "text/plain",
  "X-My-Custom-Header": "CustomValue",
});
```

Para utilizar las cabeceras de las solicitudes, tenemos que crear una instancia `Request`:

```javascript
var request = new Request("https://async-blocks.name/some-url", {
  headers: new Headers({
    "Content-Type": "text/plain",
  }),
});

fetch(request).then(function () {
  /* handle response */
});
```

Muchas cositas hemos contado hasta ahora, igual te está pasando como me pasó a mi en su memento 💥 😲 👽 🤔, y te está estallando la cabeza. Vale, no te preocupes, vamos a ver que hacen `Request` y `Response`, para aclarar algo más:

## Request

Una instancia de Request representa la parte de la solicitud de una llamada de fetch. Al pasar a fetch un Request puedes hacer peticiones avanzadas y personalizadas: 😎

- `method` - `GET`, `POST`, `PUT`, `DELETE`, `HEAD`
- `url` - url de la petición
- `headers` - cabeceras asociadas al objecto
- `referrer` - remitente de la solicitud
- `mode` - `cors`, `no-cors`, `same-origin`
- `credentials` - ¿deben ir las cookies con la solicitud? 🤔, `omit`, `same-origin`
- `redirect` - `follow`, `error`, `manual`
- `integrity` - valor de integridad del sub-recurso
- `cache` - `default`, `reload`, `no-cache`

Un ejemplo:

```javascript
const myRequest = new Request("https://async-blocks.name/blocks.json", {
  method: "POST",
  mode: "cors",
  redirect: "follow",
  headers: new Headers({
    "Content-Type": "text/plain",
  }),
});

// Ya podemos usar nuestra request 😎
fetch(myRequest).then(function () {
  /* handle response */
});
```

## Response

El método `then` de **fetch** recibe una instancia de `Response`, pero podemos crear manualmente objetos `Response`. Con `Response` podemos configurar todo esto:

- `type` - `basic`, `cors`
- `url`
- `useFinalURL` - Booleano para saber si la url es la URL final
- `status` - status code (ex: 200, 404, etc.)
- `ok` - Booleano para respuesta de exito (estado en el rango 200-299)
- `statusText` - status code (ex: OK)
- `headers` - Objeto de cabecera asociado a la respuesta.

Un ejemplo:

```javascript
// Crea tu propia respuesta
// new Response(BODY, OPTIONS)
var response = new Response(".....", {
  ok: false,
  status: 404,
  url: "/",
});

// Con then obtendremos una instancia de la Respuesta de vuelta
fetch("https://async-blocks.name/").then(function (responseObj) {
  console.log("status: ", responseObj.status);
});
```

`Response` además nos provee de los siguientes métodos:

- `clone()` - Crea un clon de un objeto Response.
- `error()` - Devuelve un nuevo objeto Response asociado a un error de red.
- `redirect()` - Crea una nueva respuesta con una URL diferente.
- `arrayBuffer()` - Devuelve una promesa que se resuelve con un ArrayBuffer.
- `blob()` - Devuelve una promesa que se resuelve con un Blob.
- `formData()` - Devuelve una promesa que se resuelve con un objeto FormData.
- `json()` - Devuelve una promesa que se resuelve con un objeto JSON.
- `text()` - Devuelve una promesa que se resuelve con un USVString (texto).

## Manejo de JSON

Vale ahora viene lo que nos interesa, manejar datos. Supongamos que hacemos una petición para obtener un `JSON`, el callback resultante tiene un método `json` para convertir los datos en bruto a un objeto JavaScript:

```javascript
fetch("https://async-blocks.name/data/superobject.json")
  .then(function (response) {
    // Convertimos a JSON
    return response.json();
  })
  .then(function (j) {
    // `j` es ya un objecto JavaScript 😄
    console.log(j);
  });
```

Sí, claro, podemos utilizar también `JSON.parse(jsonString)`, pero lo anterior es un gran atajo. ❤️

## Manejo de respuestas básicas de texto/HTML

JSON no siempre es el formato de respuesta de solicitud deseado, por lo que a continuación se explica cómo se puede trabajar con una respuesta HTML o de texto:

```javascript
fetch("/next/page")
  .then(function (response) {
    return response.text();
  })
  .then(function (text) {
    // <!DOCTYPE ....
    console.log(text);
  });
```

Puedes obtener el texto de la respuesta encadenando el método then de la promesa junto con el método `text()`.

## Manejo de las respuestas Blob

Si quieres cargar una imagen vía fetch, por ejemplo, será un poco diferente:

```javascript
fetch("https://async-blocks.name/logo.jpg")
  .then(function (response) {
    return response.blob();
  })
  .then(function (imageBlob) {
    document.querySelector("img").src = URL.createObjectURL(imageBlob);
  });
```

El método `blob()` toma un flujo de Response y lo lee hasta completarlo.

## Envío de datos

Otro caso de uso común para `ajax` es el envío de datos de formularios. Así es cómo se usaría fetch para enviar datos de formularios:

```javascript
fetch("https://async-blocks.name/submit", {
  method: "post",
  body: new FormData(document.getElementById("comment-form")),
});
```

Y si quieres hacer un `POST JSON` al servidor, así:

```javascript
fetch("https://async-blocks.name/submit-json", {
  method: "post",
  body: JSON.stringify({
    email: document.getElementById("email").value,
    answer: document.getElementById("answer").value,
  }),
});
```

Fácil ¿verdad? 😏

Aunque fetch es una API más agradable de usar, la API actual no permite cancelar una solicitud, lo que have que no sea una opción para muchos desarrolladores.

La nueva API de fetch parece mucho más sana y sencilla de usar que XHR. Después de todo, se creó para que pudiéramos hacer AJAX de la manera correcta.

Seguiremos esperando a que `fetch` tenga un soporte más amplio. No pares de usarlo!

❤️❤️❤️
