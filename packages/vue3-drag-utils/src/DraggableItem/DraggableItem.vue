<script setup lang="ts">
import { useDrag, useDrop } from 'vue3-dnd';
const props = withDefaults(
  defineProps<{
    index: number;
    data: any;
    move: (dragIndex: number, hoverIndex: number) => void;
  }>(),
  {}
);
const [, drag] = useDrag(() => ({
  type: 'drag',
  canDrag: true,
  item: () => {
    return { index: props.index, data: props.data };
  },
  collect: (monitor) => ({
    isDragging: monitor.isDragging(),
    handlerId: monitor.getHandlerId()
  })
}));
const [, drop] = useDrop(() => ({
  accept: ['drag'],
  hover: (item: any, monitor: any) => {
    // console.log(monitor.getClientOffset());
    if (!dragRef.value) {
      return;
    }
    const dragIndex = item.index;
    const hoverIndex = props.index;
    if (dragIndex === hoverIndex) {
      return;
    }
    const dropRect = dragRef.value?.getBoundingClientRect();
    const clientOffset = monitor.getClientOffset();
    console.log('monitor', dropRect, clientOffset);
    props.move(dragIndex, hoverIndex);
    item.index = hoverIndex;
  }
}));

const dragRef: any = ref<HTMLDivElement>();
const setRef: any = (el: HTMLDivElement) => {
  dragRef.value = drag(drop(el)) as HTMLDivElement;
};
watch(
  () => props.index,
  (newValue, oldValue) => {
    console.log('index', newValue, oldValue);
  }
);
</script>
<template>
  <div
    :ref="setRef"
    :key="index"
  >
    <slot></slot>
  </div>
</template>
