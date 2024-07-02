<script setup lang="ts">
import editorOptionsGroupWalker from "./editor-options-group-walker.vue";

const props = defineProps({
  optionsModel: {
    type: Object,
  },
  group: {
    type: String,
  },
  currentOptions: {
    type: Object,
  },
  index: {
    type: Number,
  },
});
</script>

<template>
  <div
    class="option-category-header p-2 d-flex align-items-center border-top border-bottom"
  >
    <h6 class="m-0 ms-1">
      {{ props.group }}
    </h6>
  </div>

  <editorOptionsGroupWalker
    :options-model="props.optionsModel"
    :group="props.group"
    :current-options="props.currentOptions"
  ></editorOptionsGroupWalker>
</template>

<style lang="scss" scoped></style>
