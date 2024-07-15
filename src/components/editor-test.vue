<script setup lang="ts">
import { useEditorStore } from "../stores/editor-store";

import type { Message } from "tock-vue-kit/dist/models/messages";
import { MessageType, MessageAuthor } from "tock-vue-kit/dist/models/messages";

import { testMessages } from "../utils/test-messages";
import { addTvkMessage } from "tock-vue-kit";

const mainStore = useEditorStore();

function addMessage(testMessage: any) {
  const delay = testMessage.delay || 300;

  testMessage.messages.forEach(
    (message: Message, index: number, messages: Message[]) => {
      setTimeout(() => {
        addTvkMessage(message);
        if (index < messages.length - 1) {
          addTvkMessage({
            type: MessageType.loader,
            author: MessageAuthor.app,
            date: Date.now(),
          });
        }
      }, index * delay);
    }
  );
}
</script>

<template>
  <div class="panel-body-wrapper d-flex flex-column">
    <div class="panel-body-body flex-grow-1">
      <div
        class="option-category-header p-2 d-flex align-items-center border-top border-bottom"
      >
        <h6 class="m-0 ms-1">Test</h6>
      </div>

      <div
        v-for="testMssg in testMessages"
        class="templates-list-entry cursor-pointer py-2 px-3"
        @click="addMessage(testMssg)"
      >
        <i class="bi bi-send-plus me-1"></i> {{ testMssg.name }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

#body {
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px var(--tvke-primary-text-emphasis);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--tvke-primary-text-emphasis);
    border-radius: 10px;
  }
}
</style>
