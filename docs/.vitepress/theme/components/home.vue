<script setup lang="ts">
import VPDoc from 'vitepress/dist/client/theme-default/components/VPDoc.vue';
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
</script>
<template>
  <div class="hero">
    <img
      class="logo"
      src="/static/logo.svg"
      alt="vitepress-custom"
    />
    <div class="name">Vue3-Drag-Utils</div>
    <div class="text">Experience better drag and drop tools</div>

    <div class="buttons">
      <VPButton
        tag="a"
        size="medium"
        theme="brand"
        text="Docs"
        href="/contents/Docs/Getting%20Started.html"
      >
      </VPButton>
      <VPButton
        tag="a"
        size="medium"
        theme="alt"
        text="Example"
        href="/contents/Example/1.Simple.html"
      >
      </VPButton>
      <VPButton
        tag="a"
        size="medium"
        theme="alt"
        text="Github"
        href="https://github.com/huyikai/vue3-drag-utils"
      >
      </VPButton>
    </div>
  </div>
  <VPDoc />
</template>
<style lang="scss">
.hero {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding-top: 30px;

  .logo {
    display: block;
  }

  .name {
    line-height: 40px;
    font-size: 32px;
    font-weight: 700;
    white-space: pre-wrap;
    background: var(--vp-home-hero-name-background);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: var(--vp-home-hero-name-color);
  }

  .text {
    color: var(--vp-c-text-2);
  }

  .buttons {
    margin-top: 30px;
    display: flex;
    flex-flow: row wrap;
    gap: 12px;
  }
}
</style>
