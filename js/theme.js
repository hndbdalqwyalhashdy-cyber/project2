(() => {
  const saved = localStorage.getItem("ofoq-theme");
  const theme = saved === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = theme;
  window.Ofoq = window.Ofoq || {};
  window.Ofoq.toggleTheme = () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("ofoq-theme", next);
    const button = document.querySelector("[data-theme-toggle]");
    if (button) {
      const arabic = window.Ofoq.language === "ar";
      button.setAttribute("aria-label", arabic
        ? (next === "dark" ? "التبديل إلى الوضع النهاري" : "التبديل إلى الوضع الليلي")
        : (next === "dark" ? "Switch to light mode" : "Switch to dark mode"));
    }
  };
})();
