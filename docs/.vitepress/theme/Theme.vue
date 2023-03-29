<script setup lang="ts">
import VPLayout from './Layout.vue';
import Home from './components/home.vue';
import VCSearch from './components/VCSearch.vue';
import 'ant-design-vue/dist/antd.dark.css';
</script>
<template>
  <DndProvider>
    <VPLayout>
      <template #nav-bar-content-before>
        <VCSearch />
      </template>
      <template #custom-home>
        <Home></Home>
      </template>
    </VPLayout>
  </DndProvider>
</template>
