---
title: demo-grid-obsidian
description: "Una demostración de un grid con imágenes en diferentes aspectos utilizando Astro y Tailwind CSS."
tags: ["astro", "static-sites", "svelte", "tanstack", "web-dev"]
date: 2025-10-19
mod: 2025-11-02
published: true
---

# demo-grid-obsidian

Demo grid obsidian

<div class="columns-1 [@media(min-width:480px)]:columns-2 gap-2 space-y-2">
    <img src="/avatar.jpeg" class="w-full object-cover aspect-square"/>
    <img src="/avatar.jpeg" class="w-full object-cover aspect-3/2"/>
    <img src="/avatar.jpeg" class="w-full object-cover aspect-2/3 object-[81%]"/>
    <img src="/avatar.jpeg"/>
</div>
