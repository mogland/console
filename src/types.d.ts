declare global {
  export interface History {
    backPath: string[];
  }
  export interface Window {
    MOG_API: string;
    MOG_BASE: string;
    version: string;
    PATTERN: "CORE" | "STANDALONE";
  }
}

interface HTMLFormElement extends HTMLElement {
  elements: HTMLFormControlsCollection;
}

interface HTMLInputElement extends HTMLElement {
  value: string;
}

export {};
