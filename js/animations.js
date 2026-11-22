(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 761px)");
  const revealTargets = [
    ".section-heading",
    ".feature-card",
    ".editorial-card",
    ".quote-card",
    ".intro-copy",
    ".intro-image",
    ".split-content",
    ".contact-info-card",
    ".detail-panel",
    ".booking-form",
    ".booking-summary",
    ".gallery-item",
    ".rich-copy",
    ".about-us",
    ".about-photo",
    ".about-content",
    ".about-cards",
    ".about-card",
    ".location-section",
    ".location-grid",
    ".location-content",
    ".location-photo"
  ].join(", ");
  const staggerGroups = [".feature-grid", ".cards-grid", ".gallery-grid", ".about-cards", ".location-grid"];
  let observer;
  let tiltReady = false;
  let tiltFrame = 0;
  let pendingTilt;
  let parallaxReady = false;
  let parallaxFrame = 0;

  window.Ofoq = window.Ofoq || {};
  window.Ofoq.observeReveals = () => {
    document.documentElement.classList.add("motion-ready");
    document.querySelectorAll(revealTargets).forEach((item) => {
      if (!item.hasAttribute("data-reveal")) item.dataset.reveal = item.matches(".section-heading, .gallery-item") ? "fade" : "up";
    });
    staggerGroups.forEach((selector) => {
      document.querySelectorAll(selector).forEach((group) => {
        Array.from(group.children).forEach((item, index) => {
          item.style.setProperty("--reveal-order", Math.min(index, 5));
        });
      });
    });

    if (observer) observer.disconnect();
    const pending = document.querySelectorAll("[data-reveal]:not(.revealed)");
    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      pending.forEach((item) => item.classList.add("revealed"));
      if (reducedMotion.matches) {
        document.querySelectorAll(".room-card").forEach((card) => {
          ["--tilt-x", "--tilt-y", "--spot-x", "--spot-y"].forEach((property) => card.style.removeProperty(property));
        });
        document.querySelectorAll(".home-hero").forEach((hero) => hero.style.removeProperty("--hero-parallax-y"));
      }
      return;
    }

    observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    }), { threshold: .12, rootMargin: "0px 0px -24px 0px" });
    pending.forEach((item) => observer.observe(item));
  };

  function setupTilt() {
    if (tiltReady) return;
    tiltReady = true;
    document.addEventListener("pointermove", (event) => {
      if (reducedMotion.matches || !finePointer.matches) return;
      const card = event.target.closest(".room-card");
      if (!card) return;
      pendingTilt = { card, x: event.clientX, y: event.clientY };
      if (tiltFrame) return;
      tiltFrame = window.requestAnimationFrame(() => {
        tiltFrame = 0;
        if (!pendingTilt || reducedMotion.matches || !pendingTilt.card.isConnected) return;
        const { card: target, x: clientX, y: clientY } = pendingTilt;
        const bounds = target.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (clientX - bounds.left) / bounds.width));
        const y = Math.max(0, Math.min(1, (clientY - bounds.top) / bounds.height));
        target.style.setProperty("--tilt-x", `${((.5 - y) * 5).toFixed(2)}deg`);
        target.style.setProperty("--tilt-y", `${((x - .5) * 5).toFixed(2)}deg`);
        target.style.setProperty("--spot-x", `${(x * 100).toFixed(1)}%`);
        target.style.setProperty("--spot-y", `${(y * 100).toFixed(1)}%`);
      });
    }, { passive: true });

    document.addEventListener("pointerout", (event) => {
      const card = event.target.closest(".room-card");
      if (!card || card.contains(event.relatedTarget)) return;
      if (pendingTilt?.card === card) pendingTilt = null;
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
      card.style.removeProperty("--spot-x");
      card.style.removeProperty("--spot-y");
    });
  }

  function setupParallax() {
    const update = () => {
      parallaxFrame = 0;
      const hero = document.querySelector(".home-hero");
      if (!hero) return;
      if (reducedMotion.matches || !finePointer.matches) {
        hero.style.removeProperty("--hero-parallax-y");
        return;
      }
      const offset = Math.max(-28, Math.min(28, -hero.getBoundingClientRect().top * .045));
      hero.style.setProperty("--hero-parallax-y", `${offset.toFixed(1)}px`);
    };
    if (!parallaxReady) {
      if (!document.querySelector(".home-hero") || reducedMotion.matches || !finePointer.matches) return;
      parallaxReady = true;
      window.addEventListener("scroll", () => {
        if (parallaxFrame) return;
        parallaxFrame = window.requestAnimationFrame(update);
      }, { passive: true });
    }
    update();
  }

  function initializeMotion() {
    window.Ofoq.observeReveals();
    setupTilt();
    setupParallax();
  }

  window.addEventListener("ofoq:rendered", initializeMotion);
  window.addEventListener("resize", setupParallax, { passive: true });
  reducedMotion.addEventListener?.("change", initializeMotion);
})();
