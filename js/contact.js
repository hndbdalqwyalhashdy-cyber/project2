(() => {
  document.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-contact-form]");
    if (!form) return;
    event.preventDefault();
    if (!form.reportValidity()) return;
    const submissions = JSON.parse(localStorage.getItem("ofoq-messages") || "[]");
    submissions.push({ ...Object.fromEntries(new FormData(form).entries()), createdAt: new Date().toISOString() });
    localStorage.setItem("ofoq-messages", JSON.stringify(submissions));
    form.reset();
    window.Ofoq.toast(window.Ofoq.t("شكراً لتواصلك، تم حفظ رسالتك التجريبية.", "Thanks for reaching out. Your demo message has been saved."));
  });
  document.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-newsletter]");
    if (!form) return;
    event.preventDefault();
    if (!form.reportValidity()) return;
    const emails = JSON.parse(localStorage.getItem("ofoq-newsletter") || "[]");
    const email = new FormData(form).get("email");
    if (!emails.includes(email)) emails.push(email);
    localStorage.setItem("ofoq-newsletter", JSON.stringify(emails));
    form.reset();
    window.Ofoq.toast(window.Ofoq.t("أُضيف بريدك إلى قائمتنا.", "You have joined our list."));
  });
  document.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-review-form]");
    if (!form) return;
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    const reviews = JSON.parse(localStorage.getItem("ofoq-reviews") || "[]");
    reviews.unshift({ ...data, id: Date.now(), createdAt: new Date().toISOString() });
    localStorage.setItem("ofoq-reviews", JSON.stringify(reviews.slice(0, 3)));
    form.reset();
    window.Ofoq.toast(window.Ofoq.t("شكراً! تم نشر تقييمك في انتظار تفعيله.", "Thank you! Your review has been published, awaiting activation."));
    window.Ofoq.updateReviews();
  });
  window.Ofoq.updateReviews = () => {
    const host = document.querySelector("[data-reviews]");
    if (!host) return;
    const reviews = JSON.parse(localStorage.getItem("ofoq-reviews") || "[]");
    const arabic = window.Ofoq.language === "ar";
    const timeAgo = (iso) => {
      const minutes = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
      const hours = Math.max(1, Math.round(minutes / 60));
      const days = Math.max(1, Math.round(hours / 24));
      if (minutes < 60) return arabic ? `${minutes} دقيقة` : `${minutes}m ago`;
      if (hours < 24) return arabic ? `${hours} ساعة` : `${hours}h ago`;
      return arabic ? `${days} يوم` : `${days}d ago`;
    };
    host.innerHTML = reviews.map((review) => `<article class="review-card">
      <div class="review-header"><span class="review-stars" aria-label="${window.Ofoq.t("التقييم", "Rating")}">${"★".repeat(Number(review.rating) || 0)}</span><strong class="review-name">${window.Ofoq.t((review.name || "ضيف"), "Guest")}</strong></div>
      <p>${review.text}</p><span class="review-time">${timeAgo(review.createdAt)}</span>
    </article>`).join("");
  };
  window.addEventListener("ofoq:languagechange", () => window.Ofoq.updateReviews());
})();
