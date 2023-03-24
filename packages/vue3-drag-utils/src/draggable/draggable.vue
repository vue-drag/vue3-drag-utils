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
    name: 'drag'
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
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
