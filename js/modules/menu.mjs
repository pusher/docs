export default () => {
  const menuButtons = [].slice.call(document.querySelectorAll(".menu-toggle"));
  const menu = document.getElementById("menu");

  if (menuButtons.length > 0) {
    menuButtons.forEach((menuButton) => {
      menuButton.addEventListener("click", (e) => {
        menu.classList.toggle("open");
        document.body.classList.toggle("overflow-hidden");
      });
    });
  }

  const docsMenuButtons = [].slice.call(
    document.querySelectorAll(".docs-menu-toggle")
  );
  const docsMenu = document.getElementById("docs-menu");

  if (docsMenuButtons.length > 0) {
    docsMenuButtons.forEach((docsMenuButton) => {
      docsMenuButton.addEventListener("click", (e) => {
        docsMenu.classList.toggle("open");
        document.body.classList.toggle("overflow-hidden");
      });
    });
  }
};
