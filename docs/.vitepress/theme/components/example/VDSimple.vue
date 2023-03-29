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
const checked = ref(false);
const dataSource = [
  {
    key: '1',
    parameter: '胡彦斌',
    description: '西湖区湖底公园1号',
    type: 'string',
    default:'a'
  }
];

const columns = [
  {
    title: '参数',
    dataIndex: 'parameter',
    key: 'parameter'
  },
  {
    title: '说明',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '默认值',
    dataIndex: 'default',
    key: 'default'
  }
];
</script>
<template>
  <div>
    <a-switch v-model:checked="checked" />
    <a-button type="primary">Primary Button</a-button>
    <a-drawer
      v-model:visible="checked"
      class="custom-class"
      style="color: red"
      title="Basic Drawer"
      placement="right"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
    <draggable
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
    <a-table
      :dataSource="dataSource"
      :columns="columns"
      :pagination="false"
    />
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
  }
}
</style>
