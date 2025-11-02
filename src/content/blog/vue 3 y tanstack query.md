---
title: Vue.js 3 + TanStack Query
description: Utiliza TanStack Query en Vue3 para mejorar tu código, peticiones y las interacciones de los usuarios de tus aplicaciones
date: 2025-10-12
mod: 2025-11-02
published: true
tags: [frontend, javascript, tag, tanstack-query, typescript, vue]
---

# Vue.js 3 + TanStack Query

![[877fcc2e414a444fd356d938ed2bc44a_MD5.jpeg]]

TanStack Query, el que conoces de React pero también disponible para Vue.js, es como darle a tu aplicación Vue.js 3 una superpotencia. Estas son las ventajas:

- Caching: dile adiós a llamadas innecesarias de API.
- Actualizaciones: manten tus datos frescos sin molestar a los usuarios.
- Manejo de errores: muestra correctamente mensajes de error a tus usuarios.
- Estado de carga: se acabaron los flags "`isLoading`".
- Paginación y scroll infinito: programa escenarios de datos complejos con facilidad.

Y la mejor parte es que funciona genial con `composition API`. 

## Configuración de TanStack

Primeros tenemos que añadir TanStack a nuestro proyecto. Abre tu terminal, y en la raíz de tu proyecto ejecuta:

```bash
npm install --save @tanstack/vue-query
```

Ahora que tenemos el paquete instalado, es hora de configurar Tanstack Query en Vue.

```typescript
// src/plugins/index.ts

import { VueQueryPlugin } from '@tanstack/vue-query'
import pinia from '../store'

export function registerPlugins(app) {
  app
    .use(router)
    .use(pinia)
    .use(VueQueryPlugin)
}
```

Podemos además configurar algunas opciones. Por ejemplo:

```typescript
import { VueQueryPlugin } from '@tanstack/vue-query'

export function registerPlugins(app) {
  // ... other plugins
  app.use(VueQueryPlugin, {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5 minutes
        },
      },
    },
  })
}
```

Esta configuración establece un valor predeterminado `staleTime`de 5 minutos para todas las consultas. Esto es como decirle a TanStack Query, "Hey, considera mis datos frescos durante 5 minutos".

Para asegurarse de que todo está conectado correctamente, puedes añadir un pequeño log en algún componente principal:

```vue
<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query'

const queryClient = useQueryClient()
console.log('TanStack Query is ready:', !!queryClient)
</script>
```

## Refactorizando un fetching tradicional

Esta sería una implementación tradicional de un fetch en Vue:

```vue
<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <v-list v-else>
      <v-list-item
        v-for="articleItem in articlesList"
        :key="articleItem.id"
        :title="articleItem.title"
        :value="articleItem.value"
      >
        <!-- Article item content -->
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getArticles } from "@/services";

const articlesList = ref([]);
const isLoading = ref(false);
const error = ref(null);

const refreshArticles = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await getArticles();
    articlesList.value = response.data
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

onMounted(refreshArticles);
</script>
```

Refactorizamos con el siguiente código, donde tendremos que tener listo un método de consulta con `fetch` o `axios` que nos devuelva los datos de la API:

```vue
<template>
  <div>
    <div v-if="isPending">Loading...</div>
    <div v-else-if="isError">Error: {{ error.message }}</div>
    <v-list v-else>
      <v-list-item
        v-for="articleItem in data"
        :key="articleItem.id"
        :title="articleItem.title"
        :value="articleItem.value"
      >
        <!-- Article item content -->
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { getArticles } from "@/services";

const { isPending, isError, data, error } = useQuery({
  queryKey: ['articles'],
  queryFn: getArticles
  },
});
</script>
```

`useQuery` es un hook que necesita lo siguiente:

- **queryKey:** Esto es como una id único para nuestra consulta. Aquí, estamos usando `['articles']`. TanStack Query utiliza esta clave para caché e invalidación.
- **queryFn** : Esta es nuestra función de fetching. TanStack Consulta llamará a esta función cuando necesite para buscar o volver a averiguar los datos.

## Manejar estados de carga y errores

Como ves nuestro template se ha simplificado enormemente:

- `isPending`sustituye la referencia `isLoading`.
- `isError`y `error`son proporcionados directamente por la consulta.
- utilizamos`data`en nuestro v-for, sin usar nuevas referencias.

TanStack Query maneja todos estos estados para nosotros, haciendo que nuestro componente sea mucho más declarativo.

## Adaptación de la IU para los Estados que consulta

Ahora que tenemos TanStack Query tarareando en nuestra aplicación Vue.js, vamos a pulir nuestra interfaz de usuario:

```vue
<template>
  <div>
    <v-skeleton-loader
      v-if="isPending"
      type="article, article, article"
      :loading="isPending"
    >
      <v-card>Loading...</v-card>
    </v-skeleton-loader>

    <v-alert
      v-else-if="isError"
      type="error"
      :title="error.name"
    >
      {{ error.message }}
    </v-alert>

    <v-list v-else>
      <v-list-item
        v-for="articleItem in data"
        :key="articleItem.id"
        :title="articleItem.title"
        :value="articleItem.value"
      >
        <!-- Article item content -->
      </v-list-item>
    </v-list>
  </div>
</template>
```

## Manejar interacciones de usuarios

Vamos a añadir un filtro a nuestro componente:

```vue
<template>
  <div>
    <v-switch
      v-model="filteredArticles"
      label="Show only my articles"
      @change="onArticlesFilter"
    />

    <!-- ... rest of the template ... -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { getArticlesFiltered } from "@/services";

const filteredArticles = ref<boolean>(false);

const { isPending, isError, data, error } = useQuery({
  queryKey: ['articles', filteredArticles.value ],
  queryFn: () => getArticlesFiltered(filteredArticles.value),
});

function onArticlesFilter() {
  // The query will automatically refetch when filteredArticles changes!
}
</script>
```

## Reutilización de hooks

A medida que tu aplicación crece, puede que quieras reutilizar o simplemente sacar código de componentes que simplemente rendericen datos. Para ello puedes seguir algunas prácticas usuales como:

1. Crear una carpeta de `hooks`.
2. Y para cada consulta un archivo, en este caso `useArticles.ts`:

```typescript
// src/hooks/useArticles.ts
import { useQuery } from '@tanstack/vue-query';
import { getArticlesFiltered } from "@/services";

export function useArticles(filter:boolean) {
  return useQuery({
    queryKey: ['articles', filter],
    queryFn: () => getArticlesFiltered(filter),
    staleTime: 5 * 60 * 1000,
  });
}
```

Ahora puedes usar este hook en cualquier componente:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useArticles } from '@/hooks';

const filterArticles = ref<boolean>(false);
const { isPending, isError, data, error } = useArticles(filterArticles);
</script>
```

## Optimizaciones

Aquí te dejo algunos consejos para exprimir aún más rendimiento:

1. `staleTime`: Esto le dice a TanStack Query cuánto tiempo los datos deben considerarse frescos. Esto podemos usarlo para que los datos que no cambien a menudo.
2. `Prefetch` : Si sabes que es probable que el usuario necesite ciertos datos pronto, haz un `prefetch`:

	```typescript
	    const queryClient = useQueryClient();
	    queryClient.prefetchQuery(['articles', true ], 
		    () => getArticlesFiltered(true));
	```

3. **Paginación** : Para grandes conjuntos de datos, utiliza `useInfiniteQuery` para implementar una paginación eficiente o scroll infinito.

## Estrategias de refetch

TanStack Query hace refetch cuando falla alguna consulta por defecto, pero esto puede configurarse:

```typescript
useQuery({
  queryKey: ['articles'],
  queryFn: getArticles,
  // Se intentará la petición al menos 3 veces antes de mostrar un error
  retry: 3,
});
```

Para un manejo de errores más específico, podemos utilizar el callback `onError`:

```typescript
useQuery({
  queryKey: ['articles'],
  queryFn: getArticles,
  onError: (error) => {
    if (error.response && error.response.status === 401) {
      // manejar error, quizá podemos redirigir al usuario
    }
  },
});
```

## Conclusiones

Como ves Tanstack Query simplifica mucho la forma en la que trabajamos con las interfaces y las consultas, quitando muchas de las operaciones que repetimos constantemente en millones de componentes y dejándonos un código limpio y sostenible, y sobre todo nos permite economizar mucho nuestras queries.
