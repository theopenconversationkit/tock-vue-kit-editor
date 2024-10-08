export declare function debounce(func: Function, timeout?: number): (...args: any[]) => void;
export declare function isObject(value: any): boolean;
export declare function copyToClipboard(text: string): Promise<void>;
type Theme = "light" | "dark";
export declare function getCurrentTheme(): Theme;
export {};
