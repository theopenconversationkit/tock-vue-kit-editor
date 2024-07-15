import type { Message } from "tock-vue-kit/dist/models/messages";
interface TestMessage {
    name: string;
    messages: Message[];
    delay?: number;
}
export declare const testMessages: TestMessage[];
export {};
