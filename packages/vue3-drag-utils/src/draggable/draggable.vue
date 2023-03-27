<script setup lang="ts">
const emit = defineEmits<{
  (e: 'update:list', value: any): void;
}>();
const props = withDefaults(
  defineProps<{
    name?: string;
    list: any;
    itemKey?: string;
  }>(),
  {
    name: 'drag',
    itemKey: 'id'
  }
);
const dragList = computed({
  get() {
    return useCloned(props.list).cloned.value;
  },
  set(val) {
    console.log('dragList', val);
    emit('update:list', val);
  }
});

const move = (dragIndex: number, hoverIndex: number) => {
  const clone = [...dragList.value];
  const item = clone[dragIndex];
  // clone.splice(dragIndex, 1);
  // clone.splice(hoverIndex, 0, item);
  // dragList.value = clone;
  dragList.value.splice(dragIndex, 1);
  dragList.value.splice(hoverIndex, 0, item);
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
