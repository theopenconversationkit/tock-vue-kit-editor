import type {
  AppOptions,
  DeepPartial,
} from "tock-vue-kit/dist/models/app-options-model";

export interface StringMap {
  [key: string]: string;
}

export interface Template {
  active: boolean;
  name: string;
  description?: string;
  tockUrl: string;
  options?: DeepPartial<AppOptions>;
  styling?: StringMap;
  _confirmTemplateChangeWarning?: boolean;
}
