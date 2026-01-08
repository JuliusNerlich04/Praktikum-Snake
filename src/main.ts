import "./styles/main.css";

const root = document.querySelector<HTMLDivElement>("#app");
if (!root) throw new Error("#app not found");

root.innerHTML = `
  <h1 class="text-3xl font-bold text-emerald-400">
    Hello Snake
  </h1>
`;