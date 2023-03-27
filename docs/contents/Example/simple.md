# Simple

<script setup>
import Simple from "./../../.vitepress/theme/components/example/VDSimple.vue"
import {ref} from "vue"
const visible=ref(true)
const show=()=>{
    visible.value=!visible.value
}
</script>

<Simple></Simple>

<button @click="show">显示代码</button>

<div class="test" v-if="visible">

::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
};

export default config;
```

```ts [config.ts]
import type { UserConfig } from 'vitepress';

const config: UserConfig = {
  // ...
};

export default config;
```

:::

</div>
