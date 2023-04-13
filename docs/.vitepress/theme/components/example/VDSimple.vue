<script setup lang="ts">
import { ref } from 'vue';
const list: any = ref([]);
const enabled = ref(true);
const dataSource = [
  {
    parameter: 'list(v-model)',
    description: 'dataSource array for list',
    type: 'any[]',
    default: '-'
  }
];
const add = () => {
  const len = list.value.length;
  list.value.push({
    id: len,
    name: `Box${len}`
  });
};
const reset = () => {
  list.value = [];
  for (let i = 0, len = 3; i < len; i++) {
    list.value.push({
      id: i,
      name: `Box${i}`
    });
  }
};
reset();

const deleteHandle = (index: number) => {
  list.value.splice(index, 1);
};
</script>
<template>
  <div>
    <a-form>
      <a-form-item label="添加">
        <a-button
          type="primary"
          @click="add"
          >添加</a-button
        >
      </a-form-item>
      <a-form-item label="还原">
        <a-button
          type="primary"
          @click="reset"
          >还原</a-button
        >
      </a-form-item>
      <a-form-item label="启用">
        <a-switch v-model:checked="enabled" />
      </a-form-item>
    </a-form>
    <a-row
      type="flex"
      :gutter="24"
    >
      <a-col :span="12">
        <draggable
          :disabled="!enabled"
          v-model:list="list"
          class="container"
          item-key="id"
        >
          <template #item="{ data, index }">
            <div class="box">
              <div>{{ data.name }}</div>
              <delete-outlined @click="deleteHandle(index)" />
            </div>
          </template>
        </draggable>
      </a-col>
      <a-col :span="12">
        <RawDisplay
          title="list"
          :list="list"
        >
        </RawDisplay>
      </a-col>
    </a-row>

    <CommonTable :dataSource="dataSource"> </CommonTable>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;

  .box {
    width: 100%;
    height: 50px;
    text-align: center;
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid var(--vp-c-border);
    background-color: var(--vp-c-bg-elv-down);
  }
}
:deep(.ant-form-item-label) {
  & > label {
    color: var(--vp-c-text-1);
  }
}
</style>
