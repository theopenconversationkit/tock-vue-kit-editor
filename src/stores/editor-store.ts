import { ref, computed, type Ref } from "vue";
import { defineStore } from "pinia";
import { EditorPanels, OutputFormats } from "../models/editor";
import { parseVarKey } from "../utils/variables";

export const useEditorStore = defineStore("editorStore", () => {
  const currentCustomizationName: Ref<string | undefined> = ref(undefined);
  const editorPanel: Ref<EditorPanels> = ref(EditorPanels.templates);
  const stylingCategory: Ref<string> = ref("colors");
  const stylingTargetedVar: Ref<string | undefined> = ref(undefined);
  const outputFormat: Ref<OutputFormats> = ref(OutputFormats.html);
  const outputMinified: Ref<boolean> = ref(false);
  const templateDirtyState: Ref<boolean> = ref(false);

  // function initStudio() {
  //   const customization = customizations.find((c) => c.active);
  //   if (customization) {
  //     const mainStoreInstance = useEditorStore();
  //     mainStoreInstance.setCurrentCustomizationName(customization.name);
  //   }
  // }

  function refreshEditorPanels() {
    // empty action watched by editor components to refresh data
  }

  function setCurrentCustomizationName(name: string) {
    currentCustomizationName.value = name;
    setTimeout(() => {
      const mainStoreInstance = useEditorStore();
      mainStoreInstance.refreshEditorPanels();
    });
  }

  function setEditorPanel(panel: EditorPanels) {
    editorPanel.value = panel;
    setTimeout(() => {
      const mainStoreInstance = useEditorStore();
      mainStoreInstance.refreshEditorPanels();
    });
  }

  function setStylingCategory(cat: string) {
    stylingCategory.value = cat;
  }

  function setOutputFormat(format: OutputFormats) {
    outputFormat.value = format;
    const mainStoreInstance = useEditorStore();
    mainStoreInstance.refreshEditorPanels();
  }

  function minifyOutput(state: boolean) {
    outputMinified.value = state;
    const mainStoreInstance = useEditorStore();
    mainStoreInstance.refreshEditorPanels();
  }

  function jumpToStylingVariable(variable: string) {
    stylingVariableReached();

    const mainStoreInstance = useEditorStore();
    const parsing = parseVarKey(variable);
    mainStoreInstance.setStylingCategory(parsing.categories[0]);
    mainStoreInstance.targetStylingVariable(variable);
  }

  function targetStylingVariable(variable: string) {
    stylingTargetedVar.value = variable;
  }

  function stylingVariableReached() {
    stylingTargetedVar.value = undefined;
  }

  return {
    currentCustomizationName,
    editorPanel,
    stylingCategory,
    stylingTargetedVar,
    outputFormat,
    outputMinified,
    templateDirtyState,
    // initStudio,
    setCurrentCustomizationName,
    refreshEditorPanels,
    setEditorPanel,
    setStylingCategory,
    jumpToStylingVariable,
    targetStylingVariable,
    stylingVariableReached,
    setOutputFormat,
    minifyOutput,
  };
});
