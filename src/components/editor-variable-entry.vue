<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import type { PropType } from "vue";
import type { CssVariable } from "../models/variables";
import { copyToClipboard } from "../utils/misc";
import { CssSuggestions } from "../utils/css-suggestions";
import { useEditorStore } from "../stores/editor-store";

const mainStore = useEditorStore();

const props = defineProps({
  variables: {
    type: Object as PropType<CssVariable[]>,
  },
  variable: {
    type: Object as PropType<CssVariable>,
  },
});

onMounted(() => {
  if (isTargeted()) {
    targetWrapper();
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onDocumentClick);
});

mainStore.$onAction(({ name, store, args, after }) => {
  if (name === "targetStylingVariable") {
    after(() => {
      if (isTargeted()) {
        targetWrapper();
      }
    });
  }
});

function targetWrapper() {
  wrapperRef.value?.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
}

function isTargeted() {
  return (
    mainStore.stylingTargetedVar &&
    mainStore.stylingTargetedVar === props.variable?.key
  );
}

let edition = ref<boolean>(false);
const wrapperRef = ref<HTMLElement | null>(null);

function updateVariable(value: string) {
  let root = document.documentElement;
  root.style.setProperty(props.variable!.key, value as string);
  const target = props.variables?.find((v) => v.key === props.variable!.key);
  if (target) target.value = value;
}

function resetVariable() {
  if (props.variable) {
    updateVariable(props.variable.initialValue);
  }
}

function getSuggestions() {
  return CssSuggestions[props.variable!.name];
}

const inputRef = ref<HTMLElement | null>(null);

function getRepresentation() {
  const str = props.variable!.value.toString().trim();
  const re = /var\(([^)]+)\)/g;
  let matches = [...str.matchAll(re)];

  let tokens: { str: string; varName?: string }[] = [];
  let strtIndex = 0;
  if (matches.length) {
    matches.forEach((match) => {
      if (match.index && match.index > strtIndex) {
        tokens.push({ str: str.substring(strtIndex, match.index) });
      }
      tokens.push({ str: match[0], varName: match[1] });
      strtIndex = match.index! + match[0].length;
    });
    if (strtIndex < str.length) {
      tokens.push({ str: str.substring(strtIndex, str.length) });
    }
  } else {
    tokens.push({ str });
  }

  return tokens;
}

function jumpTo(event: Event, varKey: string) {
  event.stopPropagation();
  mainStore.jumpToStylingVariable(varKey);
}

let valueStringCopy: string;

function edit() {
  edition.value = true;
  valueStringCopy = props.variable!.value.toString();
}
function unedit() {
  edition.value = false;
}

function prevent(event: Event) {
  event.preventDefault();
  event.stopPropagation();
}

function updateValue(event: Event) {
  let val = (event?.target as HTMLElement)?.innerText;

  if (val.toString().trim().length < 1) val = "unset";

  updateVariable(val);
}

function focus() {
  mainStore.stylingVariableReached();
  edit();
  setTimeout(() => {
    setInputSelectionRange(999, 999);
  });
}

function setInputSelectionRange(start = 0, end = 0) {
  const selection = document.getSelection();
  if (selection) {
    const range = document.createRange();
    const editedSpan = inputRef.value?.children[0];

    const nLen = editedSpan?.childNodes[0]?.textContent?.length || 0;
    if (editedSpan?.childNodes[0]) {
      range.setStart(editedSpan?.childNodes[0] as Node, Math.min(nLen, start));
      range.setEnd(editedSpan?.childNodes[0] as Node, Math.min(nLen, end));
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}

function normalizePaste(event: ClipboardEvent) {
  prevent(event);

  let pastedText = event.clipboardData?.getData("text/plain");

  if (pastedText) {
    const selection = document.getSelection();
    const range = selection?.getRangeAt(0);
    if (range) {
      const currentValue = props.variable!.value.toString();
      const beforeSelection = currentValue.substring(0, range.startOffset);
      const afterSelection = currentValue.substring(range.endOffset);

      pastedText = beforeSelection + pastedText + afterSelection;
    }

    updateVariable(pastedText);

    valueStringCopy = props.variable!.value.toString();
  }
}

function keyDownWatch(event: KeyboardEvent) {
  const target = event.target as HTMLInputElement;
  if (["ArrowUp", "ArrowDown"].includes(event.key)) {
    prevent(event);

    const rawValue = props.variable!.value.toString();

    const values = rawValue.split(" ");

    let selection = document.getSelection();
    let cursorOffset: number = 0;
    if (selection) {
      cursorOffset = selection.getRangeAt(0).startOffset;
    }

    let currentValue: string;
    let currentValueIndex: number;
    let count = 0;
    for (let i = 0; i < values.length; i++) {
      if (cursorOffset <= count + values[i].length) {
        currentValue = values[i];
        currentValueIndex = i;
        break;
      }
      count += values[i].length + 1;
    }

    var isNumericValue = /^\d*\.?\d+(?:em|rem|px|%|vh|vw|pt)?/g;
    if (isNumericValue.test(currentValue!)) {
      const numValue = CSSNumericValue.parse(currentValue!);
      let factor = 1;
      if (event.ctrlKey) factor /= 10;
      if (event.shiftKey) factor *= 10;

      if (event.key === "ArrowUp") {
        // @ts-ignore
        numValue.value += factor;
      }
      if (event.key === "ArrowDown") {
        // @ts-ignore
        numValue.value -= factor;
      }

      values[currentValueIndex!] = numValue.toString();
      const newValues = values.join(" ");

      updateVariable(newValues);

      valueStringCopy = newValues;

      setTimeout(() => {
        setInputSelectionRange(cursorOffset, cursorOffset);
      });
    }
  }
}

let isDropdownShown = ref(false);

function showDropdown(event: Event) {
  prevent(event);
  isDropdownShown.value = !isDropdownShown.value;

  if (isDropdownShown.value) {
    document.addEventListener("click", onDocumentClick);
  } else {
    document.removeEventListener("click", onDocumentClick);
  }
}

function onDocumentClick(event: Event) {
  if (isDropdownShown.value) {
    showDropdown(event);
  }
}

function getVarTooltip(varName: string) {
  const varRef = props.variables?.find((v) => {
    return v.key === varName;
  });

  if (varRef) {
    return varRef.value.toString();
  }

  return null;
}

function isColor(varName: string) {
  if (!varName.startsWith("--tvk_colors")) return false;

  if (
    [
      "--tvk_colors_brand-hue",
      "--tvk_colors_brand-lightness",
      "--tvk_colors_brand-saturation",
    ].includes(varName)
  ) {
    return false;
  }

  return true;
}

function copy(text: string) {
  copyToClipboard(text);
}
</script>

<template>
  <div
    ref="wrapperRef"
    class="position-relative"
    :class="{ 'targeted-item': isTargeted() }"
  >
    <label
      class="form-label lh-1 d-flex gap-4 align-items-center justify-content-between position-relative"
    >
      <span
        class="text-nowrap"
        :class="{
          'fst-italic': props.variable!.value != props.variable!.initialValue,
        }"
      >
        {{ props.variable!.name }}
      </span>
      <span
        class="text-muted text-small text-end text-truncate py-1"
        v-tooltip="props.variable!.key + ' (click to copy)'"
        @click="copy(props.variable!.key)"
      >
        {{ props.variable!.key }}
      </span>
    </label>

    <div class="input-group input-group-sm">
      <button
        v-if="getSuggestions()"
        class="btn btn-secondary px-1"
        type="button"
        @click="showDropdown"
      >
        <i class="bi bi bi-caret-down-fill"></i>
      </button>

      <div
        class="form-control"
        ref="inputRef"
        spellcheck="false"
        :contenteditable="edition"
        @click="edit()"
        @blur="unedit()"
        @focus="focus()"
        @keyup="prevent($event)"
        @paste="normalizePaste($event)"
        @input.self="updateValue($event)"
        @keydown="keyDownWatch($event)"
        tabindex="0"
      >
        <template v-if="edition">{{ valueStringCopy }}</template>

        <template v-if="!edition" v-for="token in getRepresentation()">
          <span v-if="!token.varName">
            {{ token.str }}
          </span>

          <span v-if="token.varName">
            <span
              v-if="isColor(token.varName)"
              :style="{ '--prvw-color': 'var(' + token.varName + ')' }"
              class="variable-color-preview"
            ></span
            >var(<a
              @click="jumpTo($event, token.varName)"
              href="javascript:void(null)"
              class="variable-link"
              v-tooltip="getVarTooltip(token.varName)"
              >{{ token.varName }}</a
            >)
          </span>
        </template>
      </div>

      <!-- <input
        v-if="edition"
        ref="input"
        class="form-control"
        rows="1"
        spellcheck="false"
        :value="props.variable!.value"
        :list="props.variable!.key"
        @blur="edition = false"
        @keydown="keyWatch($event)"
        @input="
          updateVariable(
            props.variable!.key,
            ($event?.target as HTMLInputElement)?.value
          )
        "
      /> -->

      <button
        class="btn btn-secondary"
        v-if="props.variable!.value != props.variable!.initialValue"
        type="button"
        id="button-addon2"
        @click="resetVariable()"
        tabindex="1"
        v-tooltip="'Restore default value'"
      >
        <i class="bi bi-arrow-90deg-left"></i>
      </button>
    </div>

    <ul class="list-group variable-suggestions" v-if="isDropdownShown">
      <li
        class="list-group-item cursor-pointer"
        v-for="suggestion in getSuggestions()"
        @click="updateVariable(suggestion)"
      >
        {{ suggestion }}
      </li>
    </ul>

    <div
      v-if="props.variable!.value != props.variable!.initialValue"
      class="form-text text-small"
    >
      <span class="text-muted">Default value : </span
      >{{ props.variable!.initialValue.toString() }}
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
