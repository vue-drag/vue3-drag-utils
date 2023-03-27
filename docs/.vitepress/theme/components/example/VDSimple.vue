<script setup lang="ts">
import { ref } from 'vue'
const list1: any = ref([]);
const list2: any = ref([]);
for (let i = 0, len = 50; i < len; i++) {
    list1.value.push({
        id: i,
        name: `boxA${i}`
    });
    list2.value.push({
        id: i,
        name: `boxB${i}`
    });
}
const deleteHandle = (index: number) => {
    list1.value.splice(index, 1);
};
</script>
<template>
    <div>
        <draggable
            v-model:list="list1"
            class="container"
            item-key="id"
        >
            <template #item="{ data, index }">
                <div class="box">
                    {{ data.name }}
                    <button
                        @click="deleteHandle(index)"
                        class="delete"
                    >
                        delete
                    </button>
                </div>
            </template>
        </draggable>
    </div>
</template>
<style scoped lang="scss">
.container {
    display: flex;
    flex-flow: row wrap;
    gap: 10px;

    .box {
        width: calc(100vw / 20);
        height: calc(100vw / 20);
        line-height: calc(100vw / 20);
        background-color: lightgrey;
        text-align: center;
        position: relative;

        .delete {
            position: absolute;
            right: 0;
            top: 0;
        }
    }
}
</style>
