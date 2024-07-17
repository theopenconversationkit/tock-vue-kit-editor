import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { EditorPanels, OutputFormats } from "../models/editor";
import { parseVarKey } from "../utils/variables";
import { getCurrentTheme } from "../utils/misc";

export const useEditorStore = defineStore("editorStore", () => {
  const editorPanel: Ref<EditorPanels> = ref(EditorPanels.templates);
  const stylingCategory: Ref<string> = ref("colors");
  const stylingTargetedVar: Ref<string | undefined> = ref(undefined);
  const outputFormat: Ref<OutputFormats> = ref(OutputFormats.html);
  const outputMinified: Ref<boolean> = ref(false);
  const templateDirtyState: Ref<boolean> = ref(false);

  function refreshEditorPanels() {
    // empty action watched by editor components to refresh data
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

    // hack to match non-thematic color variables to their thematic version
    if (parsing.nameSpace[0] === "colors") {
      if (
        ![
          "brand",
          "brand-hue",
          "brand-lightness",
          "brand-saturation",
          "light",
          "dark",
        ].includes(parsing.nameSpace[1])
      ) {
        const theme = getCurrentTheme();
        let splitting = variable.split("_");
        splitting.splice(2, 0, theme);
        variable = splitting.join("_");
      }
    }

    mainStoreInstance.setStylingCategory(parsing.categories[0]);
    setTimeout(() => {
      // Timeout required to let the targeted styling category panel to be displayed before searching for the variable
      mainStoreInstance.targetStylingVariable(variable);
    });
  }

  function targetStylingVariable(variable: string) {
    stylingTargetedVar.value = variable;
  }

  function stylingVariableReached() {
    stylingTargetedVar.value = undefined;
  }

  return {
    editorPanel,
    stylingCategory,
    stylingTargetedVar,
    outputFormat,
    outputMinified,
    templateDirtyState,
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
