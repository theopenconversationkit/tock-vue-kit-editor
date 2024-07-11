<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { PropType } from "vue";
import type { CssVariable } from "../models/variables";
import {
  getVariablesByPath,
  getVariablesCategoriesByPath,
  parseVarKey,
} from "../utils/variables";
import editorVariableEntry from "./editor-variable-entry.vue";
import { useEditorStore } from "../stores/editor-store";

const mainStore = useEditorStore();

const props = defineProps({
  variables: {
    type: Object as PropType<CssVariable[]>,
  },
  path: {
    type: Array<string>,
  },
});

let showInputs = ref<boolean>(true);

onMounted(() => {
  if (props.path!.length > 1) {
    showInputs.value = false;
  }
});

mainStore.$onAction(({ name, store, args, after }) => {
  if (name === "targetStylingVariable") {
    after(() => {
      if (mainStore.stylingTargetedVar) {
        const parsing = parseVarKey(mainStore.stylingTargetedVar);

        let shouldShow = true;

        if (props.path!.length < parsing.categories.length) {
          shouldShow = false;
        } else {
          for (let i = 0; i < props.path!.length; i++) {
            if (props.path![i] !== parsing.categories[i]) {
              shouldShow = false;
            }
          }
        }

        if (shouldShow) {
          showInputs.value = true;
        }
      }
    });
  }
});
</script>

<template>
  <div
    class="option-category-header p-2 d-flex align-items-center border-top border-bottom"
    :class="{
      'cursor-pointer': props.path!.length > 1,
    }"
    @click="props.path!.length > 1 ? (showInputs = !showInputs) : null"
  >
    <i
      v-if="props.path!.length > 1 && !showInputs"
      class="bi bi-chevron-right"
    ></i>
    <i
      v-if="props.path!.length > 1 && showInputs"
      class="bi bi-chevron-down"
    ></i>

    <h6 class="m-0 ms-1" :class="{ 'fw-bold': props.path!.length === 1 }">
      {{ path?.join(" | ") }}
    </h6>
  </div>

  <div
    class="p-3 border-bottom"
    v-for="(variable, index) in getVariablesByPath(variables!, path!)"
    v-if="showInputs"
  >
    <editorVariableEntry
      :variables="variables"
      :variable="variable"
      :key="variable.key"
    ></editorVariableEntry>
  </div>

  <div v-for="subCategory in getVariablesCategoriesByPath(variables!, path!)">
    <editorVariablesGroup
      :variables="variables"
      :path="[...path!, subCategory]"
      :key="[...path!, subCategory].join('')"
    ></editorVariablesGroup>
  </div>
</template>

<style lang="scss" scoped></style>
