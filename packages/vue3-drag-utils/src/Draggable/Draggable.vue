<script setup lang="ts">
// Define emits
const emit = defineEmits<{
  (e: 'update:list', value: any): void; // Define the type of the emit function
}>();
type DropEffect = 'move' | 'copy'; // Define the type of DropEffect
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
const uuid = v4(); // Generate a unique id
// Parse dropName
const parser = (data: string | string[] | undefined) => {
  // Define a function to parse dropName
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
  // Compute the typeName
  return props.dragName || uuid;
});
// Compute acceptName
const acceptName = computed(() => {
  // Compute the acceptName
  return parser(props.dropName);
});
const canDrag = computed(() => {
  // Compute whether the item can be dragged
  return !props.disabled;
});
const dropEffect = computed(() => {
  // Compute the drop effect
  return props.dropEffect;
});
// Provide typeName and acceptName
provide('uuid', uuid); // Provide the uuid
provide('typeName', typeName); // Provide the typeName
provide('acceptName', acceptName); // Provide the acceptName
provide('canDrag', canDrag); // Provide whether the item can be dragged
provide('dropEffect', dropEffect); // Provide the drop effect
// Compute dragList
const dragList = computed({
  get() {
    return props.list;
  },
  set(val) {
    emit('update:list', val); // Emit the updated list
  }
});

const dragEnd = (data: any) => {
  // Define the dragEnd function
  if (dropEffect.value === 'move' && !data.isSelf) {
    // If the drop effect is move and the item is not being dragged onto itself
    dragList.value.splice(data.index, 1); // Remove the item from the list
  }
};
const dropMove = (
  // Define the dropMove function
  item: any,
  dragIndex: number,
  hoverIndex: number,
  isSelf: boolean
) => {
  const clone = [...dragList.value]; // Clone the dragList
  isSelf && clone.splice(dragIndex, 1); // If the item is being dragged onto itself, remove it from the list
  clone.splice(hoverIndex, 0, item); // Insert the item at the hoverIndex
  dragList.value = clone; // Update the dragList
};

const [mainDropCollect, drop] = useDrop(() => ({
  // Define the mainDropCollect and drop variables
  accept: acceptName.value, // Set the accepted item types
  collect: (monitor: any) => ({
    // Collect information about the drop
    isOver: monitor.isOver() // Check if the item is being dragged over the drop zone
  })
}));
provide('mainDropCollect', mainDropCollect); // Provide the mainDropCollect variable
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
