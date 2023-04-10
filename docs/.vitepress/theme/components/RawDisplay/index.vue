<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  title: string;
  list: any;
}>();
const data = computed(() => {
  return JSON.stringify(props.list, null, 2);
});
</script>
<template>
  <div>
    <h3>{{ title }}</h3>
    <pre>{{ data }}</pre>
  </div>
</template>

<style scoped lang="scss">
h3 {
  margin: 0;
}
</style>
