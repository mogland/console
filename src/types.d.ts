
declare global {
  export interface History {
    backPath: string[];
  }
}

interface HTMLFormElement extends HTMLElement {
  elements: HTMLFormControlsCollection;
}

interface HTMLInputElement extends HTMLElement {
  value: string;
}

export {}