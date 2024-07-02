<script setup lang="ts">
import { ref } from "vue";
import { grabVariables } from "../utils/variables";
import { getTvkDefaultOptions, getTvkCurrentOptions } from "tock-vue-kit";
import { copyToClipboard, isObject } from "../utils/misc";
import { OutputFormats } from "../models/editor";
import { useEditorStore } from "../stores/editor-store";
import { saveAs } from "file-saver";
import type { CssVariable } from "../models/variables";

enum OutputType {
  css = "css",
  js = "js",
}

const mainStore = useEditorStore();

mainStore.$onAction(({ name, store, args, after }) => {
  if (name === "refreshEditorPanels") {
    after(() => {
      init();
    });
  }
});

const outputCss = ref();
const outputJs = ref();

function updateOutputFormat(format: OutputFormats): void {
  mainStore.setOutputFormat(format);
}

function minifyOutput(state: boolean): void {
  mainStore.minifyOutput(state);
}

function init(): void {
  outputCss.value = getOutput(OutputType.css);
  outputJs.value = getOutput(OutputType.js);
}

function getOutput(type: OutputType, shouldMinify?: boolean): string {
  if (type === OutputType.js) return getJsOutput(shouldMinify);
  else return getCssOutput(shouldMinify);
}

function getOutputObject(type: OutputType): { [key: string]: any } | undefined {
  if (type === OutputType.js) return getJsOptions();
  else return getCssVariablesObject();
}

function getCssVariables(): CssVariable[] {
  let variables = grabVariables();

  variables.sort((a, b) => {
    return a.key.localeCompare(b.key);
  });

  // Filter variables that do not differ from default values
  variables = variables.filter((v) => {
    return v.value.toString() !== v.initialValue.toString();
  });

  return variables;
}

function getCssVariablesObject(): { [key: string]: any } {
  const variables = getCssVariables();
  const result: { [key: string]: any } = {};

  variables.forEach((variable) => {
    result[variable.key] = variable.value;
  });

  return result;
}

function formatOutputString(value: string): string {
  if (mainStore.outputFormat === OutputFormats.json) return '"' + value + '"';
  return value;
}

function getEndLineChar() {
  if (mainStore.outputFormat === OutputFormats.json) return ",";
  return ";";
}

function getCssOutput(shouldMinify?: boolean): string {
  const minified = shouldMinify || mainStore.outputMinified;

  const lt = String.fromCharCode(60);
  const gt = String.fromCharCode(62);

  const result: string[] = [];

  let variables = getCssVariables();

  if (variables.length) {
    if (mainStore.outputFormat === OutputFormats.html) {
      result.push(lt + "style" + gt);
      result.push(":root {");
    }

    if (mainStore.outputFormat === OutputFormats.json) {
      result.push("{");
    }

    variables.forEach((v) => {
      result.push(
        formatOutputString(v.key) +
          ": " +
          formatOutputString(v.value.toString()) +
          getEndLineChar()
      );
    });

    result.push("}");
    if (mainStore.outputFormat === OutputFormats.html) {
      result.push(lt + "/style" + gt);
    }

    if (minified) result.push("\n");
  }

  return result.join(minified ? "" : "\n");
}

function getJsOptions(): { [key: string]: any } | undefined {
  const currentOptions = getTvkCurrentOptions();
  const appOptionsModel = getTvkDefaultOptions();

  return grabOptionsDiffs(currentOptions, appOptionsModel);
}

function getJsOutput(shouldMinify?: boolean): string {
  const minified = shouldMinify || mainStore.outputMinified;

  const lt = String.fromCharCode(60);
  const gt = String.fromCharCode(62);

  const result: string[] = [];

  const currentOptions = getTvkCurrentOptions();
  const appOptionsModel = getTvkDefaultOptions();

  const diffs = grabOptionsDiffs(currentOptions, appOptionsModel);

  if (mainStore.outputFormat === OutputFormats.html) {
    let comma = "";
    const hasDiffs = diffs && Object.keys(diffs).length;
    if (hasDiffs) comma = ",";

    result.push(lt + "script" + gt);
    result.push("TockVueKit.renderChat(");
    result.push('document.getElementById("<TARGET_ELEMENT_ID>"),');
    result.push('"<TOCK_BOT_API_URL>"' + comma);
  }

  if (diffs) {
    const space: null | number = minified ? 0 : 2;

    if (Object.keys(diffs).length) {
      result.push(JSON.stringify(diffs, null, space));
    }
  }

  if (mainStore.outputFormat === OutputFormats.html) {
    result.push(")");
    result.push(lt + "/script" + gt);
  }

  return result.join(minified ? "" : "\n");
}

function grabOptionsDiffs(object: any, model: any) {
  const data = walkOptions(object, model);
  if (data) {
    clearUndefinedOptions(data);
    return data;
  }
}

function walkOptions(
  object: any,
  model: any,
  target: { [key: string]: any } = {}
) {
  if (isObject(object)) {
    const entries = Object.entries(object);

    for (let i = 0; i < entries.length; i++) {
      const [objectKey, objectValue] = entries[i];
      const res = walkOptions(objectValue, model[objectKey]);

      if (typeof res === "object" && res.type === "leaf") {
        target[objectKey] = res.value;
      } else if (typeof res !== "undefined" && Object.keys(res).length) {
        target[objectKey] = res;
      }
    }
    return target;
  } else {
    if (!model || object !== model.default) {
      return { type: "leaf", value: object };
    }
  }
}

function clearUndefinedOptions(object: any) {
  if (isObject(object)) {
    const entries = Object.entries(object);

    for (let i = 0; i < entries.length; i++) {
      const [objectKey, objectValue] = entries[i];
      const res = clearUndefinedOptions(objectValue);
      if (!res) {
        delete object[objectKey];
      }
    }
    return object;
  } else {
    return typeof object !== "undefined";
  }
}

function copyOutput(type: OutputType): void {
  copyToClipboard(getOutput(type));
}

function downloadOutput(type: OutputType): void {
  const fileName =
    type === OutputType.css ? "tvk-css.json" : "tvk-options.json";

  const blob = new Blob([JSON.stringify(getOutputObject(type))], {
    type: "text/plain;charset=utf-8",
  });

  saveAs(blob, fileName);
}
</script>

<template>
  <div class="panel-body-wrapper d-flex flex-column">
    <div
      class="panel-body-header py-2 px-3 border-bottom text-small d-flex align-items-center"
    >
      <div>
        <div
          class="form-check form-check-inline no-min-height"
          v-tooltip="'Format output for html inclusion'"
        >
          <input
            type="radio"
            class="form-check-input"
            name="outputFormat"
            id="outputFormatHtml"
            :value="OutputFormats.html"
            v-model="mainStore.outputFormat"
            @change="updateOutputFormat(OutputFormats.html)"
          />
          <label class="form-check-label" for="outputFormatHtml">html</label>
        </div>

        <div
          class="form-check form-check-inline no-min-height"
          v-tooltip="'Format output for js usage'"
        >
          <input
            type="radio"
            class="form-check-input"
            name="outputFormat"
            id="outputFormatJs"
            :value="OutputFormats.json"
            v-model="mainStore.outputFormat"
            @change="updateOutputFormat(OutputFormats.json)"
          />
          <label class="form-check-label" for="outputFormatJs">json</label>
        </div>
      </div>

      <div
        class="form-check form-switch no-min-height ms-auto"
        v-tooltip="'Minify output code'"
      >
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="outputMinify"
          v-model="mainStore.outputMinified"
          @change="
            (event) => minifyOutput((<HTMLInputElement>event.target).checked)
          "
        />
        <label class="form-check-label" for="outputMinify">Minify</label>
      </div>
    </div>

    <div class="panel-body-body tvke-secondary-bg flex-grow-1 text-small p-3">
      <div v-if="!outputJs && !outputCss" class="text-center fst-italic pt-3">
        All settings set to default
      </div>

      <div v-if="outputJs" class="mb-2">
        <label v-if="mainStore.outputFormat === OutputFormats.html" class="mb-2"
          >Script:</label
        >
        <label v-if="mainStore.outputFormat === OutputFormats.json" class="mb-2"
          >Options:</label
        >

        <div class="output-block d-flex">
          <pre
            class="pre-wrap mb-0 flex-grow-1"
          ><code>{{ outputJs }}</code></pre>
          <div class="d-flex flex-column">
            <button
              type="button"
              class="btn btn-link btn-sm pe-0 pt-0"
              @click="copyOutput(OutputType.js)"
              v-tooltip="'Copy js code'"
            >
              <i class="bi bi-copy"></i>
            </button>

            <button
              v-if="mainStore.outputFormat === OutputFormats.json"
              type="button"
              class="btn btn-link btn-sm pe-0"
              @click="downloadOutput(OutputType.js)"
              v-tooltip="'Download js code'"
            >
              <i class="bi bi-file-earmark-arrow-down"></i>
            </button>
          </div>
        </div>
      </div>

      <div v-if="outputCss">
        <label v-if="mainStore.outputFormat === OutputFormats.html" class="mb-2"
          >Style:</label
        >
        <label v-if="mainStore.outputFormat === OutputFormats.json" class="mb-2"
          >Css variables:</label
        >

        <div class="output-block d-flex">
          <pre
            class="pre-wrap mb-0 flex-grow-1"
          ><code>{{ outputCss }}</code></pre>
          <div class="d-flex flex-column">
            <button
              type="button"
              class="btn btn-link btn-sm pe-0 pt-0"
              @click="copyOutput(OutputType.css)"
              v-tooltip="'Copy css code'"
            >
              <i class="bi bi-copy"></i>
            </button>

            <button
              v-if="mainStore.outputFormat === OutputFormats.json"
              type="button"
              class="btn btn-link btn-sm pe-0"
              @click="downloadOutput(OutputType.css)"
              v-tooltip="'Download css code'"
            >
              <i class="bi bi-file-earmark-arrow-down"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
