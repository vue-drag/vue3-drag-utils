<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    index: number;
    data: any;
    dragEnd: (data: any) => void;
    dropMove: (
      item: any,
      dragIndex: number,
      hoverIndex: number,
      isSelf: boolean
    ) => void;
  }>(),
  {}
);
interface DropResult {
  dropEffect: string;
  index: number;
  data: any;
  uuid: string;
}

const uuid: any = ref(inject('uuid'));
const typeName: any = ref(inject('typeName'));
const acceptName: any = ref(inject('acceptName'));
const canDrag = ref<boolean>(inject('canDrag', true));
const dropEffect = ref<string | undefined>(inject('dropEffect'));

const [dragCollect, drag] = useDrag(() => ({
  type: typeName.value,
  canDrag: () => canDrag.value,
  item: () => {
    return { index: props.index, uuid: uuid.value, data: props.data };
  },
  options: {
    dropEffect: dropEffect.value
  },
  collect: (monitor) => ({
    canDrag: monitor.canDrag(),
    getItem: monitor.getItem(),
    getItemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    uuid: uuid.value
  }),
  end: (data, monitor) => {
    console.log('end', uuid.value);
    const didDrop = monitor.didDrop();
    const dropResult = monitor.getDropResult() as DropResult;
    const isSelf = uuid.value === dropResult?.uuid;
    if (didDrop && dropResult) {
      props.dragEnd({ ...data, isSelf });
    }
  }
}));
const [dropCollect, drop] = useDrop(() => ({
  accept: acceptName.value,
  hover: (data: any, monitor: any) => {
    // console.log('DraggableItem Hover', monitor);
    // sortHandle(dragRef, item, props);
    // if (!dragRef.value) {
    //   return;
    // }
    // const dragIndex = item.index;
    // const hoverIndex = props.index;
    // if (dragIndex === hoverIndex) {
    //   return;
    // }
    // props.isHovering(item, dragIndex, hoverIndex);
    // item.index = hoverIndex;
  },
  drop: (data: any, monitor: any) => {
    const dragIndex = data.index;
    const hoverIndex = props.index;
    const isSelf = uuid.value === data.uuid;
    props.dropMove(data.data, dragIndex, hoverIndex, isSelf);
    return { ...data, uuid: uuid.value };
  },
  collect: (monitor: any) => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    getItem: monitor.getItem(),
    getDropResult: monitor.getDropResult(),
    uuid: uuid.value
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
    v-show="
      dropEffect === 'copy' ||
      (dropEffect === 'move' && !dragCollect.isDragging)
    "
  >
    {{ uuid }}
    {{ JSON.stringify(dragCollect, null, 2) }}
    <!-- {{ JSON.stringify(dropCollect, null, 2) }} -->
    <!-- {{ dragCollect?.getItem?.uuid }} -->
    <!-- {{ dragCollect?.getItem?.uuid && dragCollect?.getItem?.uuid === uuid }} -->
    <slot></slot>
  </div>
</template>
<style scoped lang="scss">
.draggable-item {
  cursor: move;
}
</style>
