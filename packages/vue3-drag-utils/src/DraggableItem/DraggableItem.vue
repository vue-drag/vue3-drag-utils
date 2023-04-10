<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    index: number;
    data: any;
    disabled: boolean;
    move: (dragIndex: number, hoverIndex: number) => void;
  }>(),
  {}
);

const typeName: any = inject('typeName');
const acceptName: any = inject('acceptName');
const canDrag = ref<boolean>(inject('canDrag', true));
const [, drag] = useDrag(() => ({
  type: typeName,
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
  accept: acceptName,
  hover: (item: any, monitor: any) => {
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
    // console.log('monitor', dropRect, clientOffset);
    props.move(dragIndex, hoverIndex);
    item.index = hoverIndex;
  },
  drop: (item: any, monitor: any) => {
    // console.log('drop', item, monitor);
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
