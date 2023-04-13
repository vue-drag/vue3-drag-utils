<script setup lang="ts">
import { sortHandle } from '@/utils/sort';
const props = withDefaults(
  defineProps<{
    index: number;
    data: any;
    disabled: boolean;
    move: (item: any, dragIndex: number, hoverIndex: number) => void;
    hasItem: (item: any) => void;
  }>(),
  {}
);
const typeName: any = ref(inject('typeName'));
const acceptName: any = ref(inject('acceptName'));
const canDrag = ref<boolean>(inject('canDrag', true));
const [, drag] = useDrag(() => ({
  type: typeName.value,
  item: () => {
    return { index: props.index, data: props.data };
  },
  collect: (monitor) => ({
    isDragging: monitor.isDragging(),
    handlerId: monitor.getHandlerId()
  }),
  canDrag: () => canDrag.value
}));
const [, drop] = useDrop(() => ({
  accept: acceptName.value,
  hover: (item: any, monitor: any) => {
    // console.log(
    //   'DraggableItem Hover',
    //   item,
    //   props.uuid,
    //   monitor.getHandlerId(),
    //   monitor.getItemType()
    // );
    sortHandle(dragRef, item, props, monitor);
  },
  drop: (item: any, monitor: any) => {
    // console.log('drop', item, monitor);
  },
  collect: (monitor: any) => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })
}));

const dragRef: any = ref<HTMLDivElement>();
const setRef: any = (el: HTMLDivElement) => {
  dragRef.value = drag(drop(el)) as HTMLDivElement;
};
</script>
<template>
  <div
    class="draggable-item"
    :ref="setRef"
    :key="index"
  >
    <slot></slot>
  </div>
</template>
<style scoped lang="scss">
.draggable-item {
  cursor: move;
}
</style>
