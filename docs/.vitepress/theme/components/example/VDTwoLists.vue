<script setup lang="ts">
import { ref } from 'vue';
const listA: any = ref([]);
const listB: any = ref([]);
for (let i = 0, len = 5; i < len; i++) {
  listA.value.push({
    id: i,
    name: `BoxA${i}`
  });
  listB.value.push({
    id: i,
    name: `BoxB${i}`
  });
}
const deleteHandleA = (index: number) => {
  listA.value.splice(index, 1);
};
const deleteHandleB = (index: number) => {
  listB.value.splice(index, 1);
};
</script>
<template>
  <div class="container">
    <draggable
      v-model:list="listA"
      class="draggable"
      item-key="id"
    >
      <template #item="{ data, index }">
        <div class="item">
          <div>{{ data.name }}</div>
          <button
            @click="deleteHandleA(index)"
            class="delete"
          >
            Delete
          </button>
        </div>
      </template>
    </draggable>
    <draggable
      v-model:list="listB"
      class="draggable"
      item-key="id"
    >
      <template #item="{ data, index }">
        <div class="item">
          <div>{{ data.name }}</div>
          <button
            @click="deleteHandleB(index)"
            class="delete"
          >
            Delete
          </button>
        </div>
      </template>
    </draggable>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  gap: 5px;

  .draggable {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    gap: 5px;
    .item {
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
}
</style>
