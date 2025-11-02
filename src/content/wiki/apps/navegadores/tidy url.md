---
title: Tidy URL
description: description
date: 2024-05-26
mod: 2025-10-14
published: true
tags: [apps, bookmarklet, code, javascript, open-source, url]
---

# Tidy URL

Tidy URL elimina elementos innecesarios en las URL, como los parámetros UTM, y copia el enlace en tu portapapeles. Esto elimina la información de seguimiento y hace que los enlaces sean más fáciles de compartir.

Para instalarlo, simplemente arrastra: <a href="javascript:(function()%7Bjavascript%3A(function()%7B%0A%20%20const%20url%20%3D%20window.location.href%3B%0A%20%20const%20tidyUrl%20%3D%20url.split('%3F')%5B0%5D%3B%0A%20%20navigator.clipboard.writeText(tidyUrl).then(function()%20%7B%0A%20%20%20%20window.location.href%20%3D%20tidyUrl%3B%0A%20%20%7D).catch(function()%20%7B%0A%20%20%20%20window.location.href%20%3D%20tidyUrl%3B%0A%20%20%7D)%3B%0A%7D)()%3B%7D)()%3B">Tidy URL</a> a tu barra de marcadores. Luego, haz clic en el marcador cuando estés en una página web que desees limpiar.

```js
javascript:(function(){
  const url = window.location.href;
  const tidyUrl = url.split('?')[0];
  navigator.clipboard.writeText(tidyUrl).then(function() {
    window.location.href = tidyUrl;
  }).catch(function() {
    window.location.href = tidyUrl;
  });
})();
```
