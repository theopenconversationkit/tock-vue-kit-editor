<script setup lang="ts">
import { ref } from "vue";
import type { Template } from "../models/template";
import { useEditorStore } from "../stores/editor-store";
import { templates } from "../utils/templates";
import { reload } from "tock-vue-kit";
import { grabVariables } from "../utils/variables";

const mainStore = useEditorStore();

const Templates = ref(templates);

function applyTemplate(template: Template) {
  Templates.value.forEach((c) => {
    c.active = false;
  });
  template.active = true;

  let root = document.documentElement;

  // if (root.computedStyleMap) {
  //   root.computedStyleMap().forEach((value, key) => {
  //     if (key.startsWith("--tvk_")) {
  //       // console.log(key, value);
  //       root.style.setProperty(key, null);
  //     }
  //   });
  // }

  const variables = grabVariables();
  variables.forEach((variable) => {
    root.style.setProperty(variable.key, variable.initialValue);
  });

  if (template.styling) {
    Object.entries(template.styling).forEach((style) => {
      root.style.setProperty(style[0], style[1] as string);
    });
  }

  reload(template.tockUrl, template.options);

  // if (chatInstance?.unmount) {
  //   chatInstance.unmount();
  // }

  // if (chatWrapper.value) {
  //   chatInstance = renderChat(
  //     chatWrapper.value,
  //     template.tockUrl,
  //     template.options
  //   );
  // }
}
</script>

<template>
  <div class="panel-body-wrapper d-flex flex-column">
    <div class="panel-body-body flex-grow-1">
      <div
        class="option-category-header p-2 d-flex align-items-center border-top border-bottom"
      >
        <h6 class="m-0 ms-1">Templates</h6>
      </div>

      <div
        v-for="template in Templates"
        class="templates-list-entry cursor-pointer py-2 px-3"
        :class="{ active: template.active }"
        @click="applyTemplate(template)"
      >
        <h6 class="mb-0">
          {{ template.name }}
        </h6>
        <div v-if="template.description" class="text-small mt-1">
          {{ template.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
../utils/templates
