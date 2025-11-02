---
title: Tidy Reader
description: "Tidy Reader: bookmarklet para limpiar páginas web, utiliza Readability de Mozilla, instalación y código JavaScript"
date: 2024-05-26
mod: 2025-10-14
published: true
tags: [apps, bookmarklet, code, javascript, mozilla, open-source, pages, readability, reader, tidy, web]
---

# Tidy Reader

Tidy Reader es un bookmarklet sencillo [de código abierto que utiliza la biblioteca](https://github.com/kepano/tidy) [Readability](https://github.com/mozilla/readability) de Mozilla para ordenar las páginas web y facilitar su lectura. Creado por [Steph Ango](https://stephango.com/tidy)

Para instalarlo, simplemente arrastra: <a href="javascript:(function()%7Bjavascript%3A%20(function()%20%7B%0A%20%20%20%20console.log('start')%3B%0A%20%20%20%20var%20jsCode%20%3D%20document.createElement('script')%3B%0A%20%20%20%20jsCode.setAttribute('src'%2C%20'https%3A%2F%2Fcdn.rawgit.com%2Fmozilla%2Freadability%2F8525c6af%2FReadability.js')%3B%0A%20%20%20%20window.tidyHtml%20%3D%20(function()%20%7B%0A%20%20%20%20%20%20%20%20var%20loc%20%3D%20document.location%3B%0A%20%20%20%20%20%20%20%20var%20uri%20%3D%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20spec%3A%20loc.href%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20host%3A%20loc.host%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20prePath%3A%20loc.protocol%20%2B%20'%2F%2F'%20%2B%20loc.host%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20scheme%3A%20loc.protocol.substr(0%2C%20loc.protocol.indexOf('%3A'))%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20pathBase%3A%20loc.protocol%20%2B%20'%2F%2F'%20%2B%20loc.host%20%2B%20loc.pathname.substr(0%2C%20loc.pathname.lastIndexOf('%2F')%20%2B%201)%0A%20%20%20%20%20%20%20%20%7D%3B%0A%20%20%20%20%20%20%20%20var%20article%20%3D%20new%20Readability(uri%2C%20document).parse()%3B%0A%20%20%20%20%20%20%20%20document.children%5B0%5D.innerHTML%20%3D%20article.content%3B%0A%20%20%20%20%20%20%20%20var%20styles%20%3D%20%60%40media%20(prefers-color-scheme%3A%20dark)%20%7B%3Aroot%20%7B--background%3A%20%23222%3B--text%3A%20white%3B--text-muted%3A%20%23999%3B%7D%7D%40media%20(prefers-color-scheme%3A%20light)%20%7B%3Aroot%20%7B--background%3A%20white%3B--text%3A%20black%3B--text-muted%3A%20%23666%3B%7D%7D*%20%7Bfont-family%3A%20-apple-system%2C%20BlinkMacSystemFont%2C%20%22Inter%22%2C%20%22IBM%20Plex%20Sans%22%2C%20Segoe%20UI%2C%20Helvetica%2C%20Arial%2C%20sans-serif%2C%20Apple%20Color%20Emoji%2C%20Segoe%20UI%20Emoji%2C%20Segoe%20UI%20Symbol%3B%7Dcode%2C%20pre%20%7Bfont-family%3A%20IBM%20Plex%20Mono%2C%20monospace%3Bfont-size%3A%20calc(1rem%20%2B%200.5vw)%3B%7Dhtml%20%7Bbox-sizing%3A%20border-box%3Bwidth%3A%20100%25%3Bheight%3A%20100%25%3Bfont-size%3A%2062.5%25%3Bbackground-color%3A%20var(--background)%20!important%3B%7Dbody%20%7Bfont-size%3A%20calc(1.6rem%20%2B%200.5vw)%3Bline-height%3A%201.8%3Bmargin%3A%200%20auto%3Bwidth%3A%2040em%3Bmax-width%3A%2088%25%3Bcolor%3A%20var(--text)%3Bbackground-color%3A%20var(--background)%3B%7D.page%20%7Bmargin%3A%202rem%20auto%3Bbackground%3A%20var(--background)%3Bpadding%3A%200%200%2020rem%200%3B%7Dh1%20%7Bfont-size%3A%2044px%20!important%3Bletter-spacing%3A%20-0.5px%20!important%3Bline-height%3A%2046px%20!important%3Bmargin%3A%2022px%200%2015px%200%20!important%3B%7Dh2%20%7Bfont-size%3A%2035px%3Bline-height%3A%2038px%3Bfont-weight%3A%20bold%3B%7Dh3%20%7Bfont-size%3A%20inherit%3Bfont-weight%3A%20bold%3Bborder-bottom%3A%201px%20solid%20%23333%3B%7Dul%20%7Bmargin%3A%201rem%3B%7Dol%20%7Bmargin%3A%201rem%3B%7Dvideo%2C%20img%20%7Bmax-width%3A%20100%25%3B%7Da%20%7Bcolor%3A%20var(--text)%3Btext-decoration%3A%20underline%3B%7Da%3Avisited%20%7Bopacity%3A%200.6%3Bcolor%3A%20var(--text-muted)%3B%7Dblockquote%20%7Bmargin%3A%200%3Bpadding%3A%200.1em%200%200.1em%202em%3Bborder-left%3A%202px%20solid%20%23ccc%3Bcolor%3A%20var(--text-muted)%3B%7Dpre%20%7Bbackground-color%3A%20%23ccc%3Bpadding%3A%201rem%3B%7Dcode%20%7Bcolor%3A%20var(--text-muted)%3B%7Dpre%20%3E%20code%20%7Bcolor%3A%20%23333%3B%7D%60%0A%20%20%20%20%20%20%20%20var%20tidyStyle%20%3D%20document.createElement(%22style%22)%0A%20%20%20%20%20%20%20%20tidyStyle.innerText%20%3D%20styles%0A%20%20%20%20%20%20%20%20document.head.appendChild(tidyStyle)%0A%20%20%20%20%7D)%3B%0A%20%20%20%20jsCode.onload%20%3D%20tidyHtml%3B%0A%20%20%20%20document.body.appendChild(jsCode)%3B%0A%7D())%3B%7D)()%3B">Tidy</a> a tu barra de marcadores. Luego, haz clic en el marcador cuando estés en una página web que desees limpiar.

```js
javascript: (function() {
    console.log('start');
    var jsCode = document.createElement('script');
    jsCode.setAttribute('src', 'https://cdn.rawgit.com/mozilla/readability/8525c6af/Readability.js');
    window.tidyHtml = (function() {
        var loc = document.location;
        var uri = {
            spec: loc.href,
            host: loc.host,
            prePath: loc.protocol + '//' + loc.host,
            scheme: loc.protocol.substr(0, loc.protocol.indexOf(':')),
            pathBase: loc.protocol + '//' + loc.host + loc.pathname.substr(0, loc.pathname.lastIndexOf('/') + 1)
        };
        var article = new Readability(uri, document).parse();
        document.children[0].innerHTML = article.content;
        var styles = `@media (prefers-color-scheme: dark) {:root {--background: #222;--text: white;--text-muted: #999;}}@media (prefers-color-scheme: light) {:root {--background: white;--text: black;--text-muted: #666;}}* {font-family: -apple-system, BlinkMacSystemFont, "Inter", "IBM Plex Sans", Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;}code, pre {font-family: IBM Plex Mono, monospace;font-size: calc(1rem + 0.5vw);}html {box-sizing: border-box;width: 100%;height: 100%;font-size: 62.5%;background-color: var(--background) !important;}body {font-size: calc(1.6rem + 0.5vw);line-height: 1.8;margin: 0 auto;width: 40em;max-width: 88%;color: var(--text);background-color: var(--background);}.page {margin: 2rem auto;background: var(--background);padding: 0 0 20rem 0;}h1 {font-size: 44px !important;letter-spacing: -0.5px !important;line-height: 46px !important;margin: 22px 0 15px 0 !important;}h2 {font-size: 35px;line-height: 38px;font-weight: bold;}h3 {font-size: inherit;font-weight: bold;border-bottom: 1px solid #333;}ul {margin: 1rem;}ol {margin: 1rem;}video, img {max-width: 100%;}a {color: var(--text);text-decoration: underline;}a:visited {opacity: 0.6;color: var(--text-muted);}blockquote {margin: 0;padding: 0.1em 0 0.1em 2em;border-left: 2px solid #ccc;color: var(--text-muted);}pre {background-color: #ccc;padding: 1rem;}code {color: var(--text-muted);}pre > code {color: #333;}`
        var tidyStyle = document.createElement("style")
        tidyStyle.innerText = styles
        document.head.appendChild(tidyStyle)
    });
    jsCode.onload = tidyHtml;
    document.body.appendChild(jsCode);
}());
```
