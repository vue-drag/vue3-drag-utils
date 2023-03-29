<script setup lang="ts">
import { ref } from 'vue';
const visible = ref(false);
const toggleVisible = () => {
  visible.value = !visible.value;
};
</script>
<template>
  <div class="Code-Display">
    <div
      @click="toggleVisible"
      class="btn-toggle"
    >
      <img
        class="icon"
        src="@/.vitepress/theme/assets/code.svg"
      />
      <span>{{ `${visible ? 'Hide' : 'Show'} Code` }}</span>
    </div>
    <slot v-if="visible"></slot>
  </div>
</template>

<style scoped lang="scss">
.Code-Display {
  padding-top: 30px;

  .btn-toggle {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    cursor: pointer;
    user-select: none;

    .icon {
      display: block;
      width: 24px;
      margin-right: 6px;
    }
  }
}
</style>
