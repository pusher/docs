import getClosest from "../utils/get-closest.mjs";

export default () => {
  const tabToggles = [].slice.call(
    document.querySelectorAll(".tabbed-snippets nav button")
  );

  if (tabToggles.length > 0) {
    tabToggles.forEach((tabToggle) => {
      tabToggle.addEventListener("click", (e) => {
        e.preventDefault();

        const targetLang = e.target.dataset.snippet;
        const targetIndex = parseInt(e.target.dataset.index);
        const snippetsContainer = getClosest(e.target, ".tabbed-snippets");
        const snippets = snippetsContainer.querySelectorAll("pre");
        const allToggles = snippetsContainer.querySelectorAll("button");

        allToggles.forEach((toggle) => {
          toggle.setAttribute("aria-pressed", e.target === toggle);
        });

        snippets.forEach((snippet, i) => {
          const active = i === targetIndex;
          snippet.classList.toggle("db", active);
          snippet.classList.toggle("dn", !active);
          snippet.setAttribute("aria-expanded", active);
        });

        if (snippetsContainer.dataset.method === "true") {
          toggleMethods(snippetsContainer, targetLang);
        }
      });
    });
  }
};

const toggleMethods = (snippet, targetLang) => {
  const language = targetLang.replace("language-", "");
  const container = getClosest(snippet, ".method-wrapper");
  const methods = container.querySelectorAll(".parameter-block");

  methods.forEach((method) => {
    const blockLang = method.dataset.language;
    if (blockLang !== undefined) {
      const languages = blockLang.split(",");
      method.classList.toggle("db", languages.includes(language));
      method.classList.toggle("dn", !languages.includes(language));
    }
  });
};
