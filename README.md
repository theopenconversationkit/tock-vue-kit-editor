# tock-vue-kit-editor

A Vue 3 component for easy editing of [Tock Vue Kit](https://github.com/theopenconversationkit/tock-vue-kit) options and css variables

## Demo

Try the Tock Vue Kit (and the Tock Vue Kit Editor) on the [demo page](https://doc.tock.ai/tock-vue-kit/)

## Prerequisites

A Vue 3 application integrating the [Tock Vue Kit](https://github.com/theopenconversationkit/tock-vue-kit)

## Quick Start

Install the Tock Vue Kit and the Tock Vue Kit Editor :

```
npm install tock-vue-kit
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

To ensure correct operation, make sure the Tock Vue kit is initialized before instantiating the editor.
