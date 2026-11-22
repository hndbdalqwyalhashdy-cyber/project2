(() => {
  const setMenuOpen = (menu, button, open) => {
    menu.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    const arabic = window.Ofoq.language === "ar";
    button.setAttribute("aria-label", open
      ? (arabic ? "إغلاق القائمة" : "Close menu")
      : (arabic ? "فتح القائمة" : "Open menu"));
  };
  document.addEventListener("click", (event) => {
    const languageButton = event.target.closest("[data-language-toggle]");
    if (languageButton) {
      window.Ofoq.setLanguage(window.Ofoq.language === "ar" ? "en" : "ar");
      return;
    }
    if (event.target.closest("[data-theme-toggle]")) {
      window.Ofoq.toggleTheme();
      return;
    }
    const menuButton = event.target.closest("[data-menu-toggle]");
    if (menuButton) {
      const menu = document.querySelector(".main-nav");
      setMenuOpen(menu, menuButton, !menu.classList.contains("is-open"));
      return;
    }
    const navLink = event.target.closest(".main-nav a");
    if (navLink) {
      const menu = document.querySelector(".main-nav");
      const button = document.querySelector("[data-menu-toggle]");
      if (menu && button) setMenuOpen(menu, button, false);
    }
    if (event.target.closest(".back-to-top")) {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
    }
  });
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".site-header");
    const topButton = document.querySelector(".back-to-top");
    if (header) header.classList.toggle("is-sticky", window.scrollY > 24);
    document.body.classList.toggle("is-sticky-header", window.scrollY > 24);
    if (topButton) topButton.classList.toggle("is-visible", window.scrollY > 500);
  }, { passive: true });
})();
