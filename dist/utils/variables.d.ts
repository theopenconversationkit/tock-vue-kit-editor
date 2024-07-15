import type { CssVariable } from "../models/variables";
export declare function parseVarKey(varKey: string): {
    keyWithoutPrefix: string;
    nameSpace: string[];
    categories: string[];
    name: string;
};
export declare function grabVariables(): CssVariable[];
export declare function getVariablesRootCategories(variables: CssVariable[]): string[];
export declare function getVariablesByPath(variables: CssVariable[], path: string[]): CssVariable[];
export declare function getVariablesCategoriesByPath(variables: CssVariable[], path: string[]): string[];
