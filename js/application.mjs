import mainMenu from "./modules/menu.mjs";
import tabbedSnippets from "./modules/tabbed-snippets.mjs";
import search from "./modules/search.mjs";

document.addEventListener("DOMContentLoaded", () => {
  mainMenu();
  tabbedSnippets();
  search();
});
