# Simple

---

<script setup lang="ts">
import VDSimple from "@/.vitepress/theme/components/example/VDSimple.vue"
import CodeDisplay from '@/.vitepress/theme/components/CodeDisplay/index.vue'
</script>

<VDSimple></VDSimple>

<CodeDisplay>

::: code-group

```vue [Typescript]
<template>
  <div>
    <draggable
      v-model:list="list"
      class="container"
      item-key="id"
    >
      <template #item="{ data, index }">
        <div class="box">
          <div>{{ data.name }}</div>
          <button
            @click="deleteHandle(index)"
            class="delete"
          >
            delete
          </button>
        </div>
      </template>
    </draggable>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const list: any = ref([]);
for (let i = 0, len = 5; i < len; i++) {
  list.value.push({
    id: i,
    name: `Box${i}`
  });
}
const deleteHandle = (index: number) => {
  list.value.splice(index, 1);
};
</script>
<style scoped lang="scss">
.container {
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;

  .box {
    width: 100%;
    height: 50px;
    border: 1px solid var(--vp-c-text-1);
    border-radius: 4px;
    text-align: center;
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;

    .delete {
      background-color: var(--vp-c-text-1);
      color: var(--vp-c-bg-elv);
      padding: 0 5px;
      box-sizing: border-box;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
</style>
```

```sh [pnpm]
$ pnpm add -D vitepress
```

```sh [yarn]
$ yarn add -D vitepress
```

:::
</CodeDisplay>
