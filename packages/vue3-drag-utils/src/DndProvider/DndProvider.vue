<template>
  <DndProvider :backend="HTML5Backend">
    <slot></slot>
  </DndProvider>
</template>

<script setup lang="ts">
import { DndProvider } from 'vue3-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
</script>
<style scoped></style>
