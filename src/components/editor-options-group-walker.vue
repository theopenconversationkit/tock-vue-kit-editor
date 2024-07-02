<script setup lang="ts">
import { onMounted, ref } from "vue";
import editorOptionsEntry from "./editor-options-entry.vue";

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
});

let entries = ref<object>();

onMounted(() => {
  if (props.optionsModel) {
    const currentGroup = props.optionsModel[props.group!];
    entries.value = walk(currentGroup);
  }
});

function walk(obj: any, path = "", paths: any[] = []) {
  for (const k in obj) {
    const key = path + (path ? "." : "") + k;
    if (
      typeof obj[k] === "object" &&
      !("type" in obj[k]) &&
      !("default" in obj[k]) &&
      !("title" in obj[k]) &&
      !("description" in obj[k])
    ) {
      walk(obj[k], key, paths);
      continue;
    }
    paths.push([key, obj[k]]);
  }
  return paths.sort((a, b) => {
    if (a[1].index && b[1].index) return a[1].index - b[1].index;
    if (a[1].index) return -1;
    if (b[1].index) return 1;
    return a[0].localeCompare(b[0]);
  });
}
</script>

<template>
  <editorOptionsEntry
    v-for="entry of entries"
    :options-model="props.optionsModel"
    :group="props.group!"
    :path="entry[0]"
    :value="entry[1]"
    :current-options="props.currentOptions!"
  ></editorOptionsEntry>
</template>

<style lang="scss" scoped></style>
