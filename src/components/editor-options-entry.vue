<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { updateTvkOption } from "tock-vue-kit";
import { debounce } from "../utils/misc";
import { useEditorStore } from "../stores/editor-store";

const mainStore = useEditorStore();

mainStore.$onAction(({ name, store, args, after }) => {
  if (name === "refreshEditorPanels") {
    after(() => {
      setTimeout(() => {
        checkConditions();
      });
    });
  }
});

const props = defineProps<{
  optionsModel: any;
  group: string;
  path: string;
  value: {
    type: string;
    default: any;
    title: string;
    description: string;
  };
  currentOptions: any;
}>();

let isEntryActive = ref(true);
let valueModel = ref();
let isImageDefDefined = ref(false);
let fullPath: string;

const debounceDelay = 500;

onMounted(() => {
  fullPath = [props.group, props.path].join(".");

  const appOptionsModelGroup = props.optionsModel[props.group];
  const currentValuesGroup = props.currentOptions[props.group];

  const defaultValue = deep_value(appOptionsModelGroup, props.path!);
  const currentValue = deep_value(currentValuesGroup, props.path!);

  checkConditions();

  if (typeof currentValue === "undefined") {
    valueModel.value = defaultValue.default;
  } else {
    valueModel.value = currentValue;
  }

  if (props.value.type === "ImageDef") {
    if (valueModel.value) {
      isImageDefDefined.value = true;
    }
  }
});

function checkConditions() {
  let active = true;
  const appOptionsModelGroup = props.optionsModel[props.group];
  const defaultValue = deep_value(appOptionsModelGroup, props.path!);
  if (defaultValue.conditions) {
    defaultValue.conditions.forEach((condition: string) => {
      if (!deep_value(props.currentOptions, condition)) {
        active = false;
      }
    });
  }
  isEntryActive.value = active;
}

const deep_value = (object: any, path: string) => {
  return path.split(".").reduce((a, v) => {
    return v in a ? a[v] : undefined;
  }, object);
};

function updateTvkOptionProxy(
  fullPath: string,
  value: string | number | boolean | undefined
) {
  mainStore.templateDirtyState = true;
  updateTvkOption(fullPath, value);
}

const updateValue = debounce((val: string): void => {
  updateTvkOptionProxy(fullPath, val);
  valueModel.value = val;
  mainStore.refreshEditorPanels();
}, debounceDelay);

watch(isImageDefDefined, (newState, oldState): void => {
  if (!newState) {
    updateTvkOptionProxy(fullPath, undefined);
    valueModel.value = undefined;
  }
});

const updateImageDef = debounce((def: string, val: string): void => {
  const defPath = [fullPath, def].join(".");
  updateTvkOptionProxy(defPath, val);
  let newValueModel = valueModel.value ? valueModel.value : {};
  newValueModel[def] = val;
  valueModel.value = newValueModel;
}, debounceDelay);

const updateKeyValueKey = debounce((oldKey: string, newKey: string): void => {
  valueModel.value[newKey] = valueModel.value[oldKey];
  delete valueModel.value[oldKey];
  updateTvkOptionProxy(fullPath, valueModel.value);
}, debounceDelay);

const updateKeyValueValue = debounce((key: string, newVal: string): void => {
  valueModel.value[key] = newVal;
  updateTvkOptionProxy(fullPath, valueModel.value);
}, debounceDelay);

function deleteKeyValue(key: string) {
  delete valueModel.value[key];
  if (Object.keys(valueModel.value).length < 1) valueModel.value = undefined;
  updateTvkOptionProxy(fullPath, valueModel.value);
}

const NewHeaderName = "New-Header-Name";

const keyValueKeyInputsRefs = ref<Record<string, HTMLInputElement>>({});

function functionRef(key: string, el: HTMLInputElement) {
  keyValueKeyInputsRefs.value[key] = el;
}

function canAddHeader(): boolean {
  return !valueModel.value || valueModel.value[NewHeaderName] === undefined;
}

function addNewHeader(): void {
  if (valueModel.value) {
    valueModel.value[NewHeaderName] = "";
  } else {
    valueModel.value = { [NewHeaderName]: "" };
  }
  setTimeout(() => {
    keyValueKeyInputsRefs.value[NewHeaderName].focus();
    keyValueKeyInputsRefs.value[NewHeaderName].select();
  });
}
</script>

<template>
  <div
    class="p-3 border-bottom"
    :class="{
      inactive: !isEntryActive,
      'tvke-secondary-bg-subtle': valueModel != props.value.default,
    }"
  >
    <label
      class="form-label lh-1 d-flex gap-4 align-items-center justify-content-between position-relative"
    >
      <span
        class="text-nowrap"
        :class="{ 'fw-bold': valueModel != props.value.default }"
      >
        {{ props.value.title }}
      </span>
      <span
        class="text-muted text-small text-end text-truncate rtl"
        v-tooltip="fullPath"
      >
        {{ fullPath }}
      </span>
    </label>

    <div class="form-text text-small mb-2">
      {{ props.value.description }}
    </div>

    <div class="input-group input-group-sm">
      <input
        v-if="props.value.type === 'string'"
        class="form-control"
        placeholder="Not specified"
        spellcheck="false"
        :value="valueModel"
        @input="updateValue(($event?.target as HTMLInputElement)?.value)"
        :disabled="!isEntryActive"
      />

      <input
        v-if="props.value.type === 'number'"
        type="number"
        class="form-control"
        placeholder="Not specified"
        spellcheck="false"
        :value="valueModel"
        @input="updateValue(($event?.target as HTMLInputElement)?.value)"
        :disabled="!isEntryActive"
      />

      <div class="form-check form-switch" v-if="props.value.type === 'boolean'">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          :id="path"
          :checked="valueModel"
          @input="updateValue(($event?.target as HTMLInputElement)?.checked)"
          :disabled="!isEntryActive"
        />
        <label class="form-check-label" :for="path">
          <span v-if="valueModel">enabled</span>
          <span v-if="!valueModel">disabled</span>
        </label>
      </div>

      <div v-if="props.value.type === 'ImageDef'">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            :id="path"
            v-model="isImageDefDefined"
            :disabled="!isEntryActive"
          />
          <label class="form-check-label" :for="path">
            <span v-if="isImageDefDefined">enabled</span>
            <span v-if="!isImageDefDefined">disabled</span>
          </label>
        </div>

        <div
          class="input-group-sm imageDef-wrapper mt-2"
          v-if="isImageDefDefined"
        >
          <label class="form-label text-small mb-0"
            >Src (url or svg data image)</label
          >
          <input
            class="form-control"
            placeholder="Not specified"
            spellcheck="false"
            :value="valueModel?.src"
            @input="
              updateImageDef('src', ($event?.target as HTMLInputElement)?.value)
            "
            :disabled="!isEntryActive"
          />

          <div class="d-flex gap-3">
            <div class="input-group-sm">
              <label class="form-label text-small mb-0">Width</label>
              <input
                class="form-control"
                placeholder="Not specified"
                spellcheck="false"
                :value="valueModel?.width"
                @input="
                  updateImageDef(
                    'width',
                    ($event?.target as HTMLInputElement)?.value
                  )
                "
                :disabled="!isEntryActive"
              />
            </div>

            <div class="input-group-sm">
              <label class="form-label text-small mb-0">Height</label>
              <input
                class="form-control"
                placeholder="Not specified"
                spellcheck="false"
                :value="valueModel?.height"
                @input="
                  updateImageDef(
                    'height',
                    ($event?.target as HTMLInputElement)?.value
                  )
                "
                :disabled="!isEntryActive"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="props.value.type === 'KeyValues'" class="w-100">
        <div class="d-flex text-small" v-if="valueModel">
          <div style="width: 45%">Header name</div>
          <div>Header value</div>
        </div>

        <div
          v-for="(value, key) in valueModel"
          class="input-group input-group-sm mb-1"
        >
          <input
            class="form-control"
            placeholder="Not specified"
            spellcheck="false"
            :value="key"
            :ref="
              (el) =>
                functionRef(key as unknown as string, el as HTMLInputElement)
            "
            @input="
              updateKeyValueKey(
                key,
                ($event?.target as HTMLInputElement)?.value
              )
            "
            :disabled="!isEntryActive"
          />
          <input
            class="form-control"
            placeholder="Not specified"
            spellcheck="false"
            :value="value"
            @input="
              updateKeyValueValue(
                key,
                ($event?.target as HTMLInputElement)?.value
              )
            "
            :disabled="!isEntryActive"
          />
          <button
            class="btn btn-danger btn-sm"
            @click="deleteKeyValue(key as unknown as string)"
            :disabled="!isEntryActive"
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>

        <button
          v-if="canAddHeader()"
          class="btn btn-link btn-sm p-0"
          @click="addNewHeader"
          :disabled="!isEntryActive"
        >
          Add new header
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
