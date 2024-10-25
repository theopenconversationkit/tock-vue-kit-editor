export function debounce(func: Function, timeout = 300) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

export function isObject(value: any) {
  return !!(value && typeof value === "object" && !Array.isArray(value));
}

export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("unable to copy to clipboard", err);
    }
    document.body.removeChild(textarea);
  }
}

type Theme = "light" | "dark";

export function getCurrentTheme(): Theme {
  let theme: Theme = "light";
  const dataTheme = document.documentElement.getAttribute("data-theme");

  if (dataTheme && ["light", "dark"].includes(dataTheme)) {
    theme = dataTheme === "light" ? "light" : "dark";
  } else {
    const dataBsTheme = document.documentElement.getAttribute("data-bs-theme");
    if (dataBsTheme && ["light", "dark"].includes(dataBsTheme)) {
      theme = dataBsTheme === "light" ? "light" : "dark";
    } else {
      if (window.matchMedia) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          theme = "dark";
        }
      }
    }
  }

  return theme;
}
