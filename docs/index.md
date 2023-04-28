---
layout: custom
aside: false
---

## Usage

```shell
npm i vue3-drag-utils
```

```javascript
// main.js
import { createApp } from 'vue';
import vue3dragutils from 'vue3-drag-utils';
import 'vue3-drag-utils/es/style.css';
const app = createApp(App);
app.use(vue3dragutils);
app.mount('#app');
```

```vue
<!-- App.vue -->
<template>
  <DndProvider>
    <RouterView />
  </DndProvider>
</template>
```

```vue
<!-- Example.vue -->
<template>
  <draggable
    v-model:list="list"
  >
    <template #item="{ data, index }">
      <div>{{ data.name }}</div>
    </template>
  </draggable>
</template>
```