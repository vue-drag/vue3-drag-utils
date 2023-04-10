<script setup lang="ts">
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
    array.push(data);
  } else if (Array.isArray(data)) {
    array = [...data];
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
provide('typeName', typeName.value);
provide('acceptName', acceptName.value);
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
const move = (dragIndex: number, hoverIndex: number) => {
  const clone = [...dragList.value];
  const item = clone[dragIndex];
  clone.splice(dragIndex, 1);
  clone.splice(hoverIndex, 0, item);
  dragList.value = clone;
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
