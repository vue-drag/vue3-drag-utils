<script setup lang="ts">
import { sortMove } from '@/utils/sort';
// Define emits
const emit = defineEmits<{
  (e: 'update:list', value: any): void;
}>();
// Define props
const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    dragName?: string;
    dropName?: string | string[];
    list: any;
    itemKey?: string;
  }>(),
  {
    disabled: false,
    itemKey: 'id'
  }
);
// Generate uuid
const uuid = v4();
// Parse dropName
const parser = (data: string | string[] | undefined) => {
  let array = [];
  if (typeof data === 'string') {
    array = [data, uuid];
  } else if (Array.isArray(data)) {
    array = [...data, uuid];
  } else {
    array = [uuid];
  }
  return array;
};
// Compute typeName
const typeName = computed(() => {
  return props.dragName || uuid;
});
// Compute acceptName
const acceptName = computed(() => {
  return parser(props.dropName);
});
const canDrag = computed(() => {
  return !props.disabled;
});
// Provide typeName and acceptName

provide('typeName', typeName);
provide('acceptName', acceptName);
provide('canDrag', canDrag);
// Compute dragList
const dragList = computed({
  get() {
    return useCloned(props.list).cloned.value;
  },
  set(val) {
    emit('update:list', val);
  }
});
// Move function
const move = (item: any, dragIndex: number, hoverIndex: number) =>
  sortMove(dragList, dragIndex, hoverIndex, item, hasItem(item));
const hasItem = (item: any) => {
  return dragList.value
    .map((i: any) => JSON.stringify(toRaw(i)))
    .includes(JSON.stringify(toRaw(item)));
};
</script>
<template>
  <TransitionGroup
    name="list"
    tag="div"
  >
    <DraggableItem
      v-for="(item, index) in dragList"
      :key="itemKey ? item[itemKey] : item"
      :move="move"
      :index="index"
      :data="item"
      :disabled="disabled"
      :hasItem="hasItem"
    >
      <slot
        name="item"
        :data="item"
        :index="index"
      ></slot>
    </DraggableItem>
  </TransitionGroup>
</template>
<style scoped lang="scss">
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}

// .list-enter-from,
// .list-leave-to {
//   // opacity: 0;
// }

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
</style>
