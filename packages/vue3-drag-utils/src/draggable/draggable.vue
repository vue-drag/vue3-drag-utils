<script setup lang="ts">
// import { useDrag } from 'vue3-dnd';

// const [collect, drag] = useDrag(() => ({
//   type: 'CommonDrag',
//   canDrag: true,
//   collect: (monitor) => ({
//     isDragging: monitor.isDragging(),
//     handlerId: monitor.getHandlerId()
//   })
// }));
</script>
<template>
  <div class="box">
    <div>12313</div>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.box {
  width: 100px;
  height: 100px;
  background-color: green;
}
</style>
