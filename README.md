# tock-vue-kit-editor

A Vue 3 component for easy editing of Tock Vue Kit options and css variables

## Prerequisites

A Vue 3 application integrating the Tock Vue Kit

## Quick Start

Install the editor :

```
npm install tock-vue-kit-editor
```

Initialize the Tock Vue Kit and then call the editor component :

```html
<script setup lang="ts">
import "tock-vue-kit/dist/style.css";
import { renderChat } from "tock-vue-kit";

import "tock-vue-kit-editor/dist/style.css";
import { TvkEditor } from "tock-vue-kit-editor";

const chatTarget = ref<HTMLElement>();
const displayEditor = ref<boolean>(false);

onMounted(() => {
  renderChat(chatTarget.value!, "<Tock-connector-url>");

  setTimeout(() => {
    displayEditor.value = true;
  }, 100);
});
</script>

<template>
    <div ref="chatTarget"></div>
    
    <aside class="editor" v-if="displayEditor">
        <TvkEditor></TvkEditor>
    </aside>
</template>
```