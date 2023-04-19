<script setup lang="ts">
import { ref } from 'vue';
const listA: any = ref([]);
const listB: any = ref([]);
const listAOptions = ref({
  dropEffect: 'move'
});
const listBOptions = ref({
  dropEffect: 'move'
});
const dataSource = [
  {
    parameter: 'list(v-model)',
    description: 'dataSource array for list',
    type: 'any[]',
    default: '-'
  }
];

const reset = () => {
  listA.value = [];
  listB.value = [];
  for (let i = 0, len = 3; i < len; i++) {
    listA.value.push({
      id: i,
      name: `BoxA${i}`
    });
    listB.value.push({
      id: i,
      name: `BoxB${i}`
    });
  }
};
reset();
</script>
<template>
  <div>
    <a-row :gutter="24">
      <a-col :span="12">
        <a-row>
          <a-form>
            <a-form-item label="还原">
              <a-button
                type="primary"
                @click="reset"
                >还原</a-button
              >
            </a-form-item>
            <a-form-item label="拖拽效果">
              <a-radio-group
                v-model:value="listAOptions.dropEffect"
                button-style="solid"
              >
                <a-radio-button value="move">move</a-radio-button>
                <a-radio-button value="copy">copy</a-radio-button>
              </a-radio-group>
            </a-form-item>
          </a-form>
        </a-row>
        <a-row>
          <a-col :span="24">
            <draggable
              dragName="twoList"
              dropName="twoList"
              :dropEffect="listAOptions.dropEffect"
              v-model:list="listA"
              class="draggable"
              item-key="id"
            >
              <template #item="{ data, index }">
                <div class="box">
                  <div>{{ data.name }}</div>
                </div>
              </template>
            </draggable>
          </a-col>
        </a-row>
        <a-row>
          <RawDisplay
            title="listA"
            :list="listA"
          >
          </RawDisplay>
        </a-row>
      </a-col>
      <a-col :span="12">
        <a-row>
          <a-form>
            <a-form-item label="还原">
              <a-button
                type="primary"
                @click="reset"
                >还原</a-button
              >
            </a-form-item>
            <a-form-item label="拖拽效果">
              <a-radio-group
                v-model:value="listBOptions.dropEffect"
                button-style="solid"
              >
                <a-radio-button value="move">move</a-radio-button>
                <a-radio-button value="copy">copy</a-radio-button>
              </a-radio-group>
            </a-form-item>
          </a-form>
        </a-row>
        <a-row>
          <a-col :span="24">
            <draggable
              dragName="twoList"
              dropName="twoList"
              :dropEffect="listBOptions.dropEffect"
              v-model:list="listB"
              class="draggable"
              item-key="id"
            >
              <template #item="{ data, index }">
                <div class="box">
                  <div>{{ data.name }}</div>
                </div>
              </template>
            </draggable>
          </a-col>
        </a-row>
        <a-row>
          <RawDisplay
            title="listB"
            :list="listB"
          >
          </RawDisplay>
        </a-row>
      </a-col>
    </a-row>

    <CommonTable :dataSource="dataSource"> </CommonTable>
  </div>
</template>

<style scoped lang="scss">
.draggable {
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
  margin-bottom: 20px;

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
