import type { CssVariable } from "../models/variables";
import { cssPropertiesOrder } from "./css-properties-order";

const tvkPrefix: string = "--tvk_";

export function parseVarKey(varKey: string) {
  const keyWithoutPrefix = varKey.replace(tvkPrefix, "");
  const nameSpace = keyWithoutPrefix.split("_");
  const categories = nameSpace.slice(0, -1);
  const name = nameSpace[nameSpace.length - 1];

  return {
    keyWithoutPrefix,
    nameSpace,
    categories,
    name,
  };
}

function collectVariable(
  variables: CssVariable[],
  isPristine: boolean,
  map: string[]
) {
  const varKey: string = map[0];
  const varValue = map[1];
  const parsing = parseVarKey(varKey);

  let existing = variables.find((v) => v.key === varKey);
  if (existing) {
    if (isPristine) {
      existing.initialValue = varValue;
    } else {
      existing.value = varValue;
    }
  } else {
    variables.push({
      key: varKey,
      value: varValue,
      initialValue: varValue,
      categories: parsing.categories,
      name: parsing.name,
    });
  }
}

export function grabVariables() {
  const variables: CssVariable[] = [];

  Array.from(document.styleSheets).forEach((sheet) => {
    Array.from(sheet.cssRules).forEach((rule) => {
      if (rule instanceof CSSStyleRule) {
        if (rule.selectorText === ":root") {
          let isPristine = !!rule.style.getPropertyValue(
            "--tvk--default-sheet"
          );

          if (rule.styleMap) {
            // All browsers except Firefox
            Array.from(rule.styleMap as any).forEach((map: any) => {
              if (map[0].startsWith(tvkPrefix)) {
                collectVariable(variables, isPristine, map);
              }
            });
          } else {
            // Firefox workaround
            Array.from(rule.style as any).forEach((style: any) => {
              if (style.startsWith(tvkPrefix)) {
                let rawContent = /\{(.*?)\}/.exec(rule.cssText);
                if (rawContent) {
                  let rawTxt = rawContent[1];
                  let rawVars = rawTxt.split(";");
                  rawVars.forEach((rawVar) => {
                    const map = rawVar.trim().split(":");
                    if (map[0].startsWith(tvkPrefix)) {
                      map[1] = map[1].trim();
                      collectVariable(variables, isPristine, map);
                    }
                  });
                }
              }
            });
          }
        }
      }
    });
  });

  let root = document.documentElement;
  Array.from(root.style).forEach((key) => {
    const target = variables.find((v) => v.key === key);
    if (target) target.value = root.style.getPropertyValue(key);
  });

  variables.sort((a, b) => {
    const aCrit = cssPropertiesOrder.indexOf(a.name);
    const bCrit = cssPropertiesOrder.indexOf(b.name);

    if (aCrit > -1 && bCrit > -1) return aCrit - bCrit;
    if (aCrit > -1) return -1;
    if (bCrit > -1) return 1;

    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  // console.log(`${variables.length} variables retrieved`);

  return variables;
}

export function getVariablesRootCategories(variables: CssVariable[]) {
  const categoriesList: string[] = [];

  variables.forEach((v) => {
    if (categoriesList.indexOf(v.categories[0]) < 0) {
      categoriesList.push(v.categories[0]);
    }
  });

  const categoriesOrder = [
    "colors",
    "base",
    "wrapper",
    "messages",
    "message",
    "footnotes",
    "side-footnotes",
    "feedback",
    "question",
    "button",
    "card",
    "thumbnail",
  ];

  return categoriesList.sort(function (a, b) {
    return categoriesOrder.indexOf(a) - categoriesOrder.indexOf(b);
  });
}

function comparePaths(currPath: string[], refPath: string[], strict = true) {
  for (let i = 0; i < currPath.length; i++) {
    if (strict && refPath.length !== currPath.length) return false;
    if (refPath[i] !== currPath[i]) return false;
  }
  return true;
}

export function getVariablesByPath(
  variables: CssVariable[],
  path: string[]
): CssVariable[] {
  let categoryVariables = variables.filter((v) => {
    return comparePaths(path, v.categories);
  });
  return categoryVariables;
}

export function getVariablesCategoriesByPath(
  variables: CssVariable[],
  path: string[]
) {
  let categoryVariables = variables.filter((v) => {
    return comparePaths(path, v.categories, false);
  });

  const subcategories: string[] = [];
  categoryVariables.forEach((v) => {
    if (v.categories.length > path.length) {
      const nextCat = v.categories[path.length];

      if (subcategories.indexOf(nextCat) < 0) subcategories.push(nextCat);
    }
  });

  const subCategoriesOrder = [
    "bot",
    "user",
    "header",
    "avatar",
    "body",
    "footnotes",
    "footnote",
    "loader",
  ];

  subcategories.sort(function (a, b) {
    return subCategoriesOrder.indexOf(a) - subCategoriesOrder.indexOf(b);
  });

  return subcategories;
}
