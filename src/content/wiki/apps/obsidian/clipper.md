---
title: Clipper
description: description
date: 2024-05-02
mod: 2025-10-14
published: true
tags: [apps, bookmarklet, javascript, obsidian, utils, web]
---

# Clipper

Este bookmarklet permite guardar contenido de la web en Obsidian. Creado por [Steph Ango](https://stephango.com/obsidian-web-clipper)

Arrastra este enlace a tu barra de favoritos: <a href="javascript:(function()%7Bjavascript%3A%20Promise.all(%5Bimport('https%3A%2F%2Funpkg.com%2Fturndown%406.0.0%3Fmodule')%2C%20import('https%3A%2F%2Funpkg.com%2F%40tehshrike%2Freadability%400.2.0')%2C%5D).then(async%20(%5B%7B%0A%20%20%20%20default%3A%20Turndown%0A%7D%2C%20%7B%0A%20%20%20%20default%3A%20Readability%0A%7D%5D)%20%3D%3E%20%7B%0A%0A%20%20%20%20%2F*%20Optional%20vault%20name%20*%2F%0A%20%20%20%20const%20vault%20%3D%20%22vault.base%22%3B%0A%0A%20%20%20%20%2F*%20Optional%20folder%20name%20such%20as%20%22Clippings%2F%22%20*%2F%0A%20%20%20%20const%20folder%20%3D%20%220.Inbox%2FClippings%2F%22%3B%0A%0A%20%20%20%20%2F*%20Optional%20tags%20%20*%2F%0A%20%20%20%20let%20tags%20%3D%20%22clippings%22%3B%0A%0A%20%20%20%20%2F*%20Parse%20the%20site's%20meta%20keywords%20content%20into%20tags%2C%20if%20present%20*%2F%0A%20%20%20%20if%20(document.querySelector('meta%5Bname%3D%22keywords%22%20i%5D'))%20%7B%0A%20%20%20%20%20%20%20%20var%20keywords%20%3D%20document.querySelector('meta%5Bname%3D%22keywords%22%20i%5D').getAttribute('content').split('%2C')%3B%0A%0A%20%20%20%20%20%20%20%20keywords.forEach(function%20(keyword)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20let%20tag%20%3D%20'%20'%20%2B%20keyword.split('%20').join('')%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20tags%20%2B%3D%20tag%3B%0A%20%20%20%20%20%20%20%20%7D)%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20function%20getSelectionHtml()%20%7B%0A%20%20%20%20%20%20%20%20var%20html%20%3D%20%22%22%3B%0A%20%20%20%20%20%20%20%20if%20(typeof%20window.getSelection%20!%3D%20%22undefined%22)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20var%20sel%20%3D%20window.getSelection()%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(sel.rangeCount)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20container%20%3D%20document.createElement(%22div%22)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20for%20(var%20i%20%3D%200%2C%20len%20%3D%20sel.rangeCount%3B%20i%20%3C%20len%3B%20%2B%2Bi)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20container.appendChild(sel.getRangeAt(i).cloneContents())%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20html%20%3D%20container.innerHTML%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%20else%20if%20(typeof%20document.selection%20!%3D%20%22undefined%22)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(document.selection.type%20%3D%3D%20%22Text%22)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20html%20%3D%20document.selection.createRange().htmlText%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20return%20html%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20const%20selection%20%3D%20getSelectionHtml()%3B%0A%0A%20%20%20%20const%20%7B%0A%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20byline%2C%0A%20%20%20%20%20%20%20%20content%0A%20%20%20%20%7D%20%3D%20new%20Readability(document.cloneNode(true)).parse()%3B%0A%0A%20%20%20%20function%20getFileName(fileName)%20%7B%0A%20%20%20%20%20%20%20%20var%20userAgent%20%3D%20window.navigator.userAgent%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20platform%20%3D%20window.navigator.platform%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20windowsPlatforms%20%3D%20%5B'Win32'%2C%20'Win64'%2C%20'Windows'%2C%20'WinCE'%5D%3B%0A%0A%20%20%20%20%20%20%20%20if%20(windowsPlatforms.indexOf(platform)%20!%3D%3D%20-1)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20fileName%20%3D%20fileName.replace('%3A'%2C%20'').replace(%2F%5B%2F%5C%5C%3F%25*%7C%22%3C%3E%5D%2Fg%2C%20'-')%3B%0A%20%20%20%20%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20fileName%20%3D%20fileName.replace('%3A'%2C%20'').replace(%2F%5C%2F%2Fg%2C%20'-').replace(%2F%5C%5C%2Fg%2C%20'-')%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20return%20fileName%3B%0A%20%20%20%20%7D%0A%20%20%20%20const%20fileName%20%3D%20getFileName(title)%3B%0A%0A%20%20%20%20if%20(selection)%20%7B%0A%20%20%20%20%20%20%20%20var%20markdownify%20%3D%20selection%3B%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20%20%20var%20markdownify%20%3D%20content%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20if%20(vault)%20%7B%0A%20%20%20%20%20%20%20%20var%20vaultName%20%3D%20'%26vault%3D'%20%2B%20encodeURIComponent(%60%24%7Bvault%7D%60)%3B%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20%20%20var%20vaultName%20%3D%20''%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20const%20markdownBody%20%3D%20new%20Turndown(%7B%0A%20%20%20%20%20%20%20%20headingStyle%3A%20'atx'%2C%0A%20%20%20%20%20%20%20%20hr%3A%20'---'%2C%0A%20%20%20%20%20%20%20%20bulletListMarker%3A%20'-'%2C%0A%20%20%20%20%20%20%20%20codeBlockStyle%3A%20'fenced'%2C%0A%20%20%20%20%20%20%20%20emDelimiter%3A%20'*'%2C%0A%20%20%20%20%7D).turndown(markdownify)%3B%0A%20%20%20%20%0A%20%20%20%20var%20date%20%3D%20new%20Date()%3B%0A%0A%20%20%20%20function%20convertDate(date)%20%7B%0A%20%20%20%20%20%20%20%20var%20yyyy%20%3D%20date.getFullYear().toString()%3B%0A%20%20%20%20%20%20%20%20var%20mm%20%3D%20(date.getMonth()%20%2B%201).toString()%3B%0A%20%20%20%20%20%20%20%20var%20dd%20%3D%20date.getDate().toString()%3B%0A%20%20%20%20%20%20%20%20var%20mmChars%20%3D%20mm.split('')%3B%0A%20%20%20%20%20%20%20%20var%20ddChars%20%3D%20dd.split('')%3B%0A%20%20%20%20%20%20%20%20return%20yyyy%20%2B%20'-'%20%2B%20(mmChars%5B1%5D%20%3F%20mm%20%3A%20%220%22%20%2B%20mmChars%5B0%5D)%20%2B%20'-'%20%2B%20(ddChars%5B1%5D%20%3F%20dd%20%3A%20%220%22%20%2B%20ddChars%5B0%5D)%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20const%20today%20%3D%20convertDate(date)%3B%0A%0A%20%20%20%20%2F%2F%20Utility%20function%20to%20get%20meta%20content%20by%20name%20or%20property%0A%20%20%20%20function%20getMetaContent(attr%2C%20value)%20%7B%0A%20%20%20%20%20%20%20%20var%20element%20%3D%20document.querySelector(%60meta%5B%24%7Battr%7D%3D'%24%7Bvalue%7D'%5D%60)%3B%0A%20%20%20%20%20%20%20%20return%20element%20%3F%20element.getAttribute(%22content%22).trim()%20%3A%20%22%22%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20%2F%2F%20Fetch%20byline%2C%20meta%20author%2C%20property%20author%2C%20or%20site%20name%0A%20%20%20%20var%20author%20%3D%20byline%20%7C%7C%20getMetaContent(%22name%22%2C%20%22author%22)%20%7C%7C%20getMetaContent(%22property%22%2C%20%22author%22)%20%7C%7C%20getMetaContent(%22property%22%2C%20%22og%3Asite_name%22)%3B%0A%0A%20%20%20%20%2F%2F%20Check%20if%20there's%20an%20author%20and%20add%20brackets%0A%20%20%20%20var%20authorBrackets%20%3D%20author%20%3F%20%60%22%5B%5B%24%7Bauthor%7D%5D%5D%22%60%20%3A%20%22%22%3B%0A%0A%0A%20%20%20%20%2F*%20Try%20to%20get%20published%20date%20*%2F%0A%20%20%20%20var%20timeElement%20%3D%20document.querySelector(%22time%22)%3B%0A%20%20%20%20var%20publishedDate%20%3D%20timeElement%20%3F%20timeElement.getAttribute(%22datetime%22)%20%3A%20%22%22%3B%0A%0A%20%20%20%20if%20(publishedDate%20%26%26%20publishedDate.trim()%20!%3D%3D%20%22%22)%20%7B%0A%20%20%20%20%20%20%20%20var%20date%20%3D%20new%20Date(publishedDate)%3B%0A%20%20%20%20%20%20%20%20var%20year%20%3D%20date.getFullYear()%3B%0A%20%20%20%20%20%20%20%20var%20month%20%3D%20date.getMonth()%20%2B%201%3B%20%2F%2F%20Months%20are%200-based%20in%20JavaScript%0A%20%20%20%20%20%20%20%20var%20day%20%3D%20date.getDate()%3B%0A%0A%20%20%20%20%20%20%20%20%2F%2F%20Pad%20month%20and%20day%20with%20leading%20zeros%20if%20necessary%0A%20%20%20%20%20%20%20%20month%20%3D%20month%20%3C%2010%20%3F%20'0'%20%2B%20month%20%3A%20month%3B%0A%20%20%20%20%20%20%20%20day%20%3D%20day%20%3C%2010%20%3F%20'0'%20%2B%20day%20%3A%20day%3B%0A%0A%20%20%20%20%20%20%20%20var%20published%20%3D%20year%20%2B%20'-'%20%2B%20month%20%2B%20'-'%20%2B%20day%3B%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20%20%20var%20published%20%3D%20''%0A%20%20%20%20%7D%0A%0A%20%20%20%20%2F*%20YAML%20front%20matter%20as%20tags%20render%20cleaner%20with%20special%20chars%20%20*%2F%0A%20%20%20%20const%20fileContent%20%3D%0A%20%20%20%20%20%20%20%20'---%5Cn'%0A%20%20%20%20%20%20%20%20%2F%2F%20%2B%20'category%3A%20%22%5B%5BClippings%5D%5D%22%5Cn'%0A%20%20%20%20%20%20%20%20%2F%2F%20%2B%20'author%3A%20'%20%2B%20authorBrackets%20%2B%20'%5Cn'%0A%20%20%20%20%20%20%20%20%2B%20'title%3A%20%22'%20%2B%20title%20%2B%20'%22%5Cn'%0A%20%20%20%20%20%20%20%20%2F%2F%20%2B%20'source%3A%20'%20%2B%20document.URL%20%2B%20'%5Cn'%0A%20%20%20%20%20%20%20%20%2B%20'date%3A%20'%20%2B%20today%20%2B%20'%5Cn'%0A%20%20%20%20%20%20%20%20%2B%20'mod%3A%20'%20%2B%20today%20%2B%20'%5Cn'%0A%20%20%20%20%20%20%20%20%2F%2F%20%2B%20'published%3A%20'%20%2B%20published%20%2B%20'%5Cn'%0A%20%20%20%20%20%20%20%20%2F%2F%20%2B%20'topics%3A%20%5Cn'%0A%20%20%20%20%20%20%20%20%2B%20'tags%3A%20%5B'%20%2B%20tags%20%2B%20'%5D%5Cn'%0A%20%20%20%20%20%20%20%20%2B%20'---%5Cn%5Cn%5Cn'%0A%20%20%20%20%20%20%20%20%2B%20'**source**%3A%20'%20%2B%20document.URL%20%2B%20'%5Cn%5Cn%5Cn'%0A%20%20%20%20%20%20%20%20%2B%20markdownBody%3B%0A%0A%20%20%20%20document.location.href%20%3D%20%22obsidian%3A%2F%2Fnew%3F%22%0A%20%20%20%20%20%20%20%20%2B%20%22file%3D%22%20%2B%20encodeURIComponent(folder%20%2B%20fileName)%0A%20%20%20%20%20%20%20%20%2B%20%22%26content%3D%22%20%2B%20encodeURIComponent(fileContent)%0A%20%20%20%20%20%20%20%20%2B%20vaultName%3B%0A%0A%7D)%7D)()%3B">Clipper</a>

```js
javascript: Promise.all([import('https://unpkg.com/turndown@6.0.0?module'), import('https://unpkg.com/@tehshrike/readability@0.2.0'),]).then(async ([{
    default: Turndown
}, {
    default: Readability
}]) => {

    /* Optional vault name */
    const vault = "vault.base";

    /* Optional folder name such as "Clippings/" */
    const folder = "clippings/";

    /* Optional tags  */
    let tags = "clippings";

    /* Parse the site's meta keywords content into tags, if present */
    if (document.querySelector('meta[name="keywords" i]')) {
        var keywords = document.querySelector('meta[name="keywords" i]').getAttribute('content').split(',');

        keywords.forEach(function (keyword) {
            let tag = ' ' + keyword.split(' ').join('');
            tags += tag;
        });
    }

    function getSelectionHtml() {
        var html = "";
        if (typeof window.getSelection != "undefined") {
            var sel = window.getSelection();
            if (sel.rangeCount) {
                var container = document.createElement("div");
                for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                    container.appendChild(sel.getRangeAt(i).cloneContents());
                }
                html = container.innerHTML;
            }
        } else if (typeof document.selection != "undefined") {
            if (document.selection.type == "Text") {
                html = document.selection.createRange().htmlText;
            }
        }
        return html;
    }

    const selection = getSelectionHtml();

    const {
        title,
        byline,
        content
    } = new Readability(document.cloneNode(true)).parse();

    function getFileName(fileName) {
        var userAgent = window.navigator.userAgent,
            platform = window.navigator.platform,
            windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];

        if (windowsPlatforms.indexOf(platform) !== -1) {
            fileName = fileName.replace(':', '').replace(/[/\\?%*|"<>]/g, '-');
        } else {
            fileName = fileName.replace(':', '').replace(/\//g, '-').replace(/\\/g, '-');
        }
        return fileName;
    }
    const fileName = getFileName(title);

    if (selection) {
        var markdownify = selection;
    } else {
        var markdownify = content;
    }

    if (vault) {
        var vaultName = '&vault=' + encodeURIComponent(`${vault}`);
    } else {
        var vaultName = '';
    }

    const markdownBody = new Turndown({
        headingStyle: 'atx',
        hr: '---',
        bulletListMarker: '-',
        codeBlockStyle: 'fenced',
        emDelimiter: '*',
    }).turndown(markdownify);
    
    var date = new Date();

    function convertDate(date) {
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth() + 1).toString();
        var dd = date.getDate().toString();
        var mmChars = mm.split('');
        var ddChars = dd.split('');
        return yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);
    }

    const today = convertDate(date);

    // Utility function to get meta content by name or property
    function getMetaContent(attr, value) {
        var element = document.querySelector(`meta[${attr}='${value}']`);
        return element ? element.getAttribute("content").trim() : "";
    }

    // Fetch byline, meta author, property author, or site name
    var author = byline || getMetaContent("name", "author") || getMetaContent("property", "author") || getMetaContent("property", "og:site_name");

    // Check if there's an author and add brackets
    var authorBrackets = author ? `"[[${author}]]"` : "";


    /* Try to get published date */
    var timeElement = document.querySelector("time");
    var publishedDate = timeElement ? timeElement.getAttribute("datetime") : "";

    if (publishedDate && publishedDate.trim() !== "") {
        var date = new Date(publishedDate);
        var year = date.getFullYear();
        var month = date.getMonth() + 1; // Months are 0-based in JavaScript
        var day = date.getDate();

        // Pad month and day with leading zeros if necessary
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        var published = year + '-' + month + '-' + day;
    } else {
        var published = ''
    }

    /* YAML front matter as tags render cleaner with special chars  */
    const fileContent =
        '---\n'
        // + 'category: "[[Clippings]]"\n'
        // + 'author: ' + authorBrackets + '\n'
        + 'title: "' + title + '"\n'
        // + 'source: ' + document.URL + '\n'
        + 'date: ' + today + '\n'
        + 'mod: ' + today + '\n'
        // + 'published: ' + published + '\n'
        // + 'topics: \n'
        + 'tags: [' + tags + ']\n'
        + '---\n\n\n'
        + '**source**: ' + document.URL + '\n\n\n'
        + markdownBody;

    document.location.href = "obsidian://new?"
        + "file=" + encodeURIComponent(folder + fileName)
        + "&content=" + encodeURIComponent(fileContent)
        + vaultName;

})
```

Para generar un snippet y guardarlo en los bookmarks del navegador accede a:

[Bookmarklet Maker](https://caiorss.github.io/bookmarklet-maker/) y genera el output, copialo y pégalo en un nuevo bookmark del navegador.
