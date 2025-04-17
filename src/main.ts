import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";

// --------------------------------------------------------------------
//  STATIC MARK‑UP
// --------------------------------------------------------------------
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>

    <h1>Vite + TypeScript</h1>

    <div class="card">
      <button id="counter" type="button"></button>
      <p id="timestamp"></p>
    </div>

    <h2>Click history</h2>
    <ul id="clickList"></ul>

    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

// --------------------------------------------------------------------
//  WIRING
// --------------------------------------------------------------------
const counterBtn = document.querySelector<HTMLButtonElement>("#counter")!;
const tsEl = document.querySelector<HTMLElement>("#timestamp")!;
const listEl = document.querySelector<HTMLUListElement>("#clickList")!;

setupCounter(counterBtn, tsEl, listEl);
