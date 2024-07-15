<script setup lang="ts">
import "../assets/main.scss";
import "floating-vue/dist/style.css";
import FloatingVue from "floating-vue";

import editorTemplates from "./editor-templates.vue";
import editorVariables from "./editor-variables.vue";
import editorPreferences from "./editor-preferences.vue";
import editorWording from "./editor-wording.vue";
import editorTest from "./editor-test.vue";
import editorOutput from "./editor-output.vue";

import { getCurrentInstance, ref } from "vue";
import { createPinia, setActivePinia } from "pinia";
import { EditorPanels } from "../models/editor";
import { useEditorStore } from "../stores/editor-store";
import { onMounted } from "vue";
setActivePinia(createPinia());

const app = getCurrentInstance();
app!.appContext.app.use(FloatingVue);

const editorStore = useEditorStore();

const styleHeight = ref<string>("100vh");

const props = withDefaults(
  defineProps<{
    height: string;
  }>(),
  {
    height: "100vh",
  }
);

onMounted(() => {
  editorStore.refreshEditorPanels();
});
</script>

<template>
  <div id="tock-vue-kit-editor">
    <div class="panel-wrapper d-flex" :style="{ height: height }">
      <div class="panel-menu">
        <div
          class="panel-menu-entry"
          :class="{
            active: editorStore.editorPanel === EditorPanels.templates,
          }"
          v-tooltip="{ content: 'Templates', placement: 'right' }"
          @click="editorStore.setEditorPanel(EditorPanels.templates)"
        >
          <i class="bi bi-layout-text-sidebar-reverse"></i>
        </div>
        <div
          class="panel-menu-entry"
          :class="{
            active: editorStore.editorPanel === EditorPanels.preferences,
          }"
          v-tooltip="{ content: 'Preferences', placement: 'right' }"
          @click="editorStore.setEditorPanel(EditorPanels.preferences)"
        >
          <i class="bi bi-gear"></i>
        </div>
        <div
          class="panel-menu-entry"
          :class="{
            active: editorStore.editorPanel === EditorPanels.wording,
          }"
          v-tooltip="{ content: 'Wording', placement: 'right' }"
          @click="editorStore.setEditorPanel(EditorPanels.wording)"
        >
          <i class="bi bi-file-word"></i>
        </div>
        <div
          class="panel-menu-entry"
          :class="{
            active: editorStore.editorPanel === EditorPanels.styling,
          }"
          v-tooltip="{ content: 'Styling', placement: 'right' }"
          @click="editorStore.setEditorPanel(EditorPanels.styling)"
        >
          <i class="bi bi-filetype-css"></i>
        </div>

        <div
          class="panel-menu-entry"
          :class="{
            active: editorStore.editorPanel === EditorPanels.test,
          }"
          v-tooltip="{ content: 'Test', placement: 'right' }"
          @click="editorStore.setEditorPanel(EditorPanels.test)"
        >
          <i class="bi bi-play-circle"></i>
        </div>

        <div
          class="panel-menu-entry"
          :class="{
            active: editorStore.editorPanel === EditorPanels.output,
          }"
          v-tooltip="{ content: 'Output', placement: 'right' }"
          @click="editorStore.setEditorPanel(EditorPanels.output)"
        >
          <i class="bi bi-floppy"></i>
        </div>
      </div>

      <div class="panel-body flex-grow-1 position-relative">
        <editorTemplates
          v-if="editorStore.editorPanel === EditorPanels.templates"
        ></editorTemplates>
        <editorVariables
          v-if="editorStore.editorPanel === EditorPanels.styling"
        ></editorVariables>
        <editorPreferences
          v-if="editorStore.editorPanel === EditorPanels.preferences"
        ></editorPreferences>
        <editorWording
          v-if="editorStore.editorPanel === EditorPanels.wording"
        ></editorWording>
        <editorTest
          v-if="editorStore.editorPanel === EditorPanels.test"
        ></editorTest>
        <editorOutput
          v-if="editorStore.editorPanel === EditorPanels.output"
        ></editorOutput>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
