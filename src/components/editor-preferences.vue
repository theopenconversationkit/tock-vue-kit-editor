<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getTvkDefaultOptions, getTvkCurrentOptions } from "tock-vue-kit";
import editorOptionsGroup from "./editor-options-group.vue";
import { useEditorStore } from "../stores/editor-store";

const mainStore = useEditorStore();

let optionsModel = ref<object>();
let groups = ref<string[]>([]);
let currentOptions = ref<object>();

mainStore.$onAction(({ name, store, args, after }) => {
  if (name === "refreshEditorPanels") {
    after(() => {
      init();
    });
  }
});

function init() {
  currentOptions.value = getTvkCurrentOptions();
  const appOptionsModel = getTvkDefaultOptions();
  optionsModel.value = appOptionsModel;
  groups.value = ["localStorage", "initialization", "preferences"];
}
</script>

<template>
  <div class="panel-body-wrapper d-flex flex-column">
    <div class="panel-body-body flex-grow-1">
      <editorOptionsGroup
        v-for="(group, index) in groups"
        :options-model="optionsModel"
        :group="group"
        :current-options="currentOptions"
        :index="index"
      ></editorOptionsGroup>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
