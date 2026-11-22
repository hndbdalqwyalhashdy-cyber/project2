(() => {
  let current = 0;
  let images = [];
  let returnFocus = null;
  let previousBodyOverflow = "";
  let zoom = 1;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const applyZoom = () => {
    const image = document.querySelector(".lightbox img");
    const button = document.querySelector(".lightbox-zoom");
    if (image) image.style.transform = `scale(${zoom})`;
    if (button) button.textContent = zoom > 1 ? "−" : "＋";
  };
  const close = (modal) => {
    modal.remove();
    document.body.style.overflow = previousBodyOverflow;
    if (returnFocus?.isConnected) returnFocus.focus();
    returnFocus = null;
    zoom = 1;
  };
  const show = (index) => {
    current = ((index % images.length) + images.length) % images.length;
    let modal = document.querySelector(".lightbox");
    const isNew = !modal;
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "lightbox";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      const arabic = window.Ofoq.language === "ar";
      modal.setAttribute("aria-label", arabic ? "معرض الصور" : "Image gallery");
      modal.innerHTML = `<button class="lightbox-close" type="button" aria-label="${arabic ? "إغلاق" : "Close"}">×</button><button class="lightbox-prev" type="button" aria-label="${arabic ? "الصورة السابقة" : "Previous image"}">‹</button><img alt=""><button class="lightbox-next" type="button" aria-label="${arabic ? "الصورة التالية" : "Next image"}">›</button><button class="lightbox-zoom" type="button" aria-label="${arabic ? "تكبير الصورة" : "Zoom image"}"></button><figcaption class="lightbox-caption"></figcaption>`;
      document.body.append(modal);
    }
    const modalImage = modal.querySelector("img");
    modal.classList.add("is-loading");
    modalImage.onload = () => modal.classList.remove("is-loading");
    modalImage.onerror = () => modal.classList.remove("is-loading");
    modalImage.classList.remove("is-changing");
    void modalImage.offsetWidth;
    modalImage.classList.add("is-changing");
    modalImage.src = images[current].src.replace(/w=\d+/, "w=1800");
    modalImage.alt = images[current].alt;
    modal.querySelector(".lightbox-caption").textContent = images[current].alt;
    zoom = 1;
    applyZoom();
    if (isNew) modal.querySelector(".lightbox-close").focus();
  };
  const swipe = (modal) => {
    let startX = 0;
    const start = (event) => { startX = event.touches[0].clientX; };
    const move = (event) => { event.preventDefault(); };
    const end = (event) => {
      const delta = event.changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 50) show(current + (delta < 0 ? 1 : -1));
    };
    modal.addEventListener("touchstart", start, { passive: true });
    modal.addEventListener("touchmove", move, { passive: false });
    modal.addEventListener("touchend", end);
  };
  document.addEventListener("click", (event) => {
    const item = event.target.closest("[data-gallery-item]");
    if (item) {
      images = Array.from(document.querySelectorAll("[data-gallery-item] img"));
      returnFocus = item;
      previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const modal = document.querySelector(".lightbox");
      if (modal && !modal.dataset.swiped) { modal.dataset.swiped = "true"; swipe(modal); }
      show(images.indexOf(item.querySelector("img")));
      return;
    }
    const modal = event.target.closest(".lightbox");
    if (!modal) return;
    if (event.target.closest(".lightbox-close") || event.target === modal) close(modal);
    else if (event.target.closest(".lightbox-zoom")) { zoom = clamp(zoom > 1 ? 1 : 2.2, 1, 2.5); applyZoom(); }
    else if (event.target.closest(".lightbox-prev")) show(current - 1);
    else if (event.target.closest(".lightbox-next")) show(current + 1);
  });
  document.addEventListener("wheel", (event) => {
    const modal = document.querySelector(".lightbox");
    if (!modal || !modal.contains(event.target)) return;
    event.preventDefault();
    zoom = clamp(zoom + (event.deltaY < 0 ? 0.15 : -0.15), 1, 2.5);
    applyZoom();
  }, { passive: false });
  document.addEventListener("keydown", (event) => {
    const modal = document.querySelector(".lightbox");
    if (!modal) return;
    if (event.key === "Escape") {
      close(modal);
      return;
    }
    if (event.key === "Tab") {
      const buttons = modal.querySelectorAll("button:not([disabled])");
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (!modal.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      show(current + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(current - 1);
    }
  });
  window.addEventListener("ofoq:languagechange", () => {
    const modal = document.querySelector(".lightbox");
    if (!modal) return;
    const arabic = window.Ofoq.language === "ar";
    modal.setAttribute("aria-label", arabic ? "معرض الصور" : "Image gallery");
    modal.querySelector(".lightbox-close").setAttribute("aria-label", arabic ? "إغلاق" : "Close");
    modal.querySelector(".lightbox-prev").setAttribute("aria-label", arabic ? "الصورة السابقة" : "Previous image");
    modal.querySelector(".lightbox-next").setAttribute("aria-label", arabic ? "الصورة التالية" : "Next image");
    modal.querySelector(".lightbox-zoom").setAttribute("aria-label", arabic ? "تكبير الصورة" : "Zoom image");
  });
})();
