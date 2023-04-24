<script setup lang="ts">
// Define emits
const emit = defineEmits<{
  (e: 'update:list', value: any): void;
}>();
type DropEffect = 'move' | 'copy';
// Define props
const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    dragName?: string;
    dropName?: string | string[];
    dropEffect?: DropEffect;
    list: any;
    itemKey?: string;
  }>(),
  {
    disabled: false,
    itemKey: 'id',
    dropEffect: 'move' as DropEffect
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
const dropEffect = computed(() => {
  return props.dropEffect;
});
// Provide typeName and acceptName
provide('uuid', uuid);
provide('typeName', typeName);
provide('acceptName', acceptName);
provide('canDrag', canDrag);
provide('dropEffect', dropEffect);
// Compute dragList
const dragList = computed({
  get() {
    return props.list;
  },
  set(val) {
    emit('update:list', val);
  }
});

const dragEnd = (data: any) => {
  if (dropEffect.value === 'move' && !data.isSelf) {
    dragList.value.splice(data.index, 1);
  }
};
const dropMove = (
  item: any,
  dragIndex: number,
  hoverIndex: number,
  isSelf: boolean
) => {
  const clone = [...dragList.value];
  isSelf && clone.splice(dragIndex, 1);
  clone.splice(hoverIndex, 0, item);
  dragList.value = clone;
  // isSelf && dragList.value.splice(dragIndex, 1);
  // dragList.value.splice(hoverIndex, 0, item);
};

const [mainDropCollect, drop] = useDrop(() => ({
  accept: acceptName.value,
  collect: (monitor: any) => ({
    isOver: monitor.isOver()
  })
}));
provide('mainDropCollect', mainDropCollect);
</script>
<template>
  <div :ref="drop">
    <DraggableItem
      v-for="(item, index) in dragList"
      :key="itemKey ? item[itemKey] : item"
      :index="index"
      :data="item"
      :dragEnd="dragEnd"
      :dropMove="dropMove"
    >
      <slot
        name="item"
        :data="item"
        :index="index"
      ></slot>
    </DraggableItem>
  </div>
</template>
<style scoped lang="scss"></style>
