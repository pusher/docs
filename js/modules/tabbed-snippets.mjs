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
        const snippetsContainer = getClosest(e.target, ".tabbed-snippets");
        const snippets = snippetsContainer.querySelectorAll("pre");
        const allToggles = snippetsContainer.querySelectorAll("button");

        allToggles.forEach((toggle) => {
          toggle.setAttribute("aria-selected", e.target === toggle);
        });

        snippets.forEach((snippet) => {
          const active = snippet.classList.contains(targetLang);
          snippet.classList.toggle("db", active);
          snippet.classList.toggle("dn", !active);
          snippet.setAttribute("aria-expanded", active);
        });
      });
    });
  }
};
