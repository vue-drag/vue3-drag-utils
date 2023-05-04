<script setup lang="ts">
import VPLayout from './Layout.vue';
import Home from './components/home.vue';
</script>
<template>
  <DndProvider>
    <VPLayout>
      <template #custom-home>
        <Home></Home>
      </template>
    </VPLayout>
  </DndProvider>
</template>
