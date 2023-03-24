<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useData } from 'vitepress';
import iconSearch from './icons/iconSearch.vue';
import iconArrowRight from './icons/iconArrowRight.vue';
// pages data
const pages = useData().theme.value.pages.filter(i => !['home', 'custom'].includes(i.frontMatter.layout));
// search pop visible
const open = ref<boolean>(false);
const keywords = ref<string>('');
const result: any = ref<Array<{}>>([]);
// Input content 
const inputChange = () => {
    if (keywords.value) {
        result.value = pages.filter(i => {
            let title = i.frontMatter.title;
            let content = i.content;
            return (title && title.toLowerCase().indexOf(keywords.value.toLowerCase()) >= 0) || (content && content.toLowerCase().indexOf(keywords.value.toLowerCase()) >= 0);
        });
    } else {
        result.value = [];
    }
};
// input ref
const refInput = ref<any>(null);
// show search pop
const showSearchPopHandle = () => {
    open.value = true;
    nextTick(() => {
        refInput.value.focus();
    });
};
// hide search pop
const hideSearchPopHandle = () => {
    open.value = false;
    keywords.value = '';
    result.value = [];
};
</script>
<template>
    <div
        class="search-box"
        @click="showSearchPopHandle"
    >
        <iconSearch class="icon" />
        <div class="placeholder">Search</div>
    </div>
    <Teleport to="body">
        <div
            v-if="open"
            class="search-pop"
            :aria-expanded="open"
        >
            <div
                class="pop-mask"
                @click.stop="hideSearchPopHandle"
            >
            </div>
            <div class="search-pop-box">
                <input
                    ref="refInput"
                    class="input"
                    placeholder="Search Docs"
                    type="text"
                    autofocus="true"
                    v-model="keywords"
                    @input="inputChange"
                >
                <div class="result">
                    <a
                        :href="item.link.replace('docs', '').replace('.md', '')"
                        @click="hideSearchPopHandle"
                        class="item"
                        v-for="(item, index) in result"
                        :key="index"
                    >
                        <div class="contents">
                            <div class="title">{{ item.frontMatter.title }}</div>
                            <div class="content">{{ item.content }}</div>
                            <div class="path">{{ item.link }}</div>
                        </div>
                        <iconArrowRight class="icon"></iconArrowRight>
                    </a>
                </div>
            </div>
        </div>
    </Teleport>
</template>
<style lang="scss" scoped>
.search-box {
    border-radius: 100px;
    display: block;
    width: 120px;
    height: 28px;
    flex-shrink: 0;
    border: 1px solid var(--vp-c-divider);
    background-color: var(--vp-c-bg-mute);
    padding: 0 12px;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-right: 30px;
    transition: border-color 0.25s, background-color 0.25s;

    &:hover {
        border-color: var(--vp-c-gray);
    }

    .icon {
        width: 14px;
        height: 14px;
        color: var(--vp-c-text-1);
    }

    .placeholder {
        font-size: 12px;
        color: var(--vp-c-text-1);
        margin-left: 6px;
    }
}

.search-pop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 99;
    opacity: 0;
    height: 100vh;
    width: 100vw;
    visibility: hidden;
    transition: opacity 0.25s, visibility 0.25s, transform 0.25s;
    display: flex;
    flex-flow: column;
    align-items: center;
    // justify-content: center;
}

.search-pop[aria-expanded="true"] {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.pop-mask {
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

.search-pop-box {
    width: 500px;
    position: absolute;
    top: 20vh;
    z-index: 10;
    background: #3d3d3d;
    border-radius: 8px;
    padding: 20px;
    box-sizing: border-box;

    .input {
        border: 2px solid var(--vp-c-gray);
        border-radius: 6px;
        height: 54px;
        padding-left: 15px;
        line-height: 54px;
        width: 100%;
        font-size: 18px;
    }
}

.result {
    max-height: 60vh;
    overflow-y: auto;
    overflow-y: overlay;

    .item {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        padding: 18px 4px 16px 8px;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(100, 100, 100, 0.2);

        .contents {
            width: 100%;
            padding-right: 10px;

            .title {
                font-size: 18px;
                font-weight: bold;
            }

            .content {
                font-size: 12px;
            }

            .path {
                font-size: 12px;
                color: #999;
            }

            .title,
            .path,
            .content {
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }


        .icon {
            min-width: 16px;
            width: 16px;
            height: 16px;
        }

        &:nth-last-child(1) {
            border-bottom: none
        }
    }
}
</style>