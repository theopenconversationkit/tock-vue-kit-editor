<script setup lang="ts">
import { ref } from "vue";
import type { CssVariable } from "../models/variables";
import { grabVariables, getVariablesRootCategories } from "../utils/variables";
import editorVariablesGroup from "./editor-variables-group.vue";
import { useEditorStore } from "../stores/editor-store";

const mainStore = useEditorStore();

mainStore.$onAction(({ name, store, args, after }) => {
  if (name === "refreshEditorPanels") {
    after(() => {
      init();
    });
  }
});

const variables = ref<CssVariable[]>([]);
const categories = ref<string[]>([]);

function init(): void {
  variables.value = grabVariables();
  categories.value = getVariablesRootCategories(variables.value);
}
</script>

<template>
  <div class="panel-body-wrapper d-flex flex-column">
    <div class="panel-body-header pt-1 px-1 border-bottom">
      <div class="d-flex flex-wrap justify-content-between">
        <div
          class="tag cursor-pointer me-1 mb-1 text-nowrap flex-fill text-center"
          v-for="category in categories"
          :class="{ active: mainStore.stylingCategory === category }"
          @click="mainStore.setStylingCategory(category)"
        >
          {{ category }}
        </div>
      </div>
    </div>

    <div class="panel-body-body flex-grow-1">
      <editorVariablesGroup
        :variables="variables"
        :path="[mainStore.stylingCategory]"
        :key="mainStore.stylingCategory"
      ></editorVariablesGroup>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
