(() => {
  const day = 86400000;
  const dateValue = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const isValidDate = (value) => {
    if (!value) return false;
    const date = new Date(`${value}T12:00:00`);
    return !Number.isNaN(date.getTime()) && dateValue(date) === value;
  };
  const validateDates = (form) => {
    const t = window.Ofoq.t;
    const arrival = new Date(`${form.elements.arrival.value}T12:00:00`);
    const departure = new Date(`${form.elements.departure.value}T12:00:00`);
    const room = window.Ofoq.room(form.elements.room.value);
    const guests = Number(form.elements.guests.value) || 1;
    if (arrival >= departure) return { arrival: t("يجب أن يكون الوصول قبل المغادرة.", "Arrival must be before departure."), guests: "" };
    if (room.guests && guests > room.guests) return { arrival: "", guests: t("عدد الضيوف يتجاوز سعة الغرفة.", "Guests exceed the room's capacity.") };
    return { arrival: "", guests: "" };
  };
  const updateSummary = () => {
    const form = document.querySelector("[data-booking-form]");
    if (!form) return;
    const arrival = new Date(`${form.elements.arrival.value}T12:00:00`);
    const departure = new Date(`${form.elements.departure.value}T12:00:00`);
    const nights = Math.max(1, Math.round((departure - arrival) / day) || 1);
    const room = window.Ofoq.room(form.elements.room.value);
    const guests = Number(form.elements.guests.value) || 1;
    const errors = validateDates(form);
    form.elements.departure.setCustomValidity(errors.arrival);
    form.elements.guests.setCustomValidity(errors.guests);
    const subtotal = room.price * nights;
    const tax = Math.round(subtotal * .15);
    const total = subtotal + tax;
    const out = document.querySelector("[data-booking-summary]");
    if (out) out.innerHTML = `<h2>${window.Ofoq.t("ملخص الإقامة", "Your stay")}</h2>
      ${errors.arrival ? `<p class="error-note">✦ ${errors.arrival}</p>` : ""}
      ${errors.guests ? `<p class="error-note">✦ ${errors.guests}</p>` : ""}
      <div class="summary-line"><span>${window.Ofoq.t("الغرفة", "Room")}</span><strong>${window.Ofoq.t(room.ar, room.en)}</strong></div>
      <div class="summary-line"><span>${window.Ofoq.t("عدد الليالي", "Nights")}</span><strong>${nights}</strong></div>
      <div class="summary-line"><span>${window.Ofoq.t("الضيوف", "Guests")}</span><strong>${guests}</strong></div>
      <div class="summary-line"><span>${window.Ofoq.t("الإقامة", "Accommodation")}</span><strong>${subtotal.toLocaleString()} ${window.Ofoq.t("ر.س", "SAR")}</strong></div>
      <div class="summary-line"><span>${window.Ofoq.t("الضريبة (15%)", "Tax (15%)")}</span><strong>${tax.toLocaleString()} ${window.Ofoq.t("ر.س", "SAR")}</strong></div>
      <div class="summary-line total"><span>${window.Ofoq.t("الإجمالي التقديري", "Estimated total")}</span><strong>${total.toLocaleString()} ${window.Ofoq.t("ر.س", "SAR")}</strong></div>
      <p class="muted">${window.Ofoq.t("هذا نموذج تجريبي ولا يتم تحصيل أي مبلغ.", "Demo booking only. No payment will be collected.")}</p>`;
  };
  window.Ofoq.updateBookingSummary = updateSummary;
  document.addEventListener("change", (event) => {
    const form = event.target.closest("[data-booking-form]");
    const quickForm = event.target.closest("[data-quick-booking]");
    if (quickForm && event.target.name === "arrival") {
      const next = new Date(`${quickForm.elements.arrival.value}T12:00:00`);
      next.setDate(next.getDate() + 1);
      quickForm.elements.departure.min = dateValue(next);
      if (quickForm.elements.departure.value < quickForm.elements.departure.min) quickForm.elements.departure.value = quickForm.elements.departure.min;
    }
    if (!form) return;
    if (event.target.name === "arrival") {
      const next = new Date(`${form.elements.arrival.value}T12:00:00`);
      next.setDate(next.getDate() + 1);
      form.elements.departure.min = dateValue(next);
      if (form.elements.departure.value < form.elements.departure.min) form.elements.departure.value = form.elements.departure.min;
    }
    updateSummary();
  });
  document.addEventListener("click", (event) => {
    const next = event.target.closest("[data-step-next]");
    const back = event.target.closest("[data-step-back]");
    if (!next && !back) return;
    const form = event.target.closest("[data-booking-form]");
    const steps = Array.from(form.querySelectorAll("[data-booking-step]"));
    const activeStep = steps.find((step) => !step.hidden);
    if (next && !Array.from(activeStep.querySelectorAll("input, select, textarea")).every((field) => field.checkValidity())) {
      activeStep.reportValidity();
      return;
    }
    const nextNumber = Number(activeStep.dataset.bookingStep) + (next ? 1 : -1);
    steps.forEach((step) => { step.hidden = Number(step.dataset.bookingStep) !== nextNumber; });
    form.querySelectorAll("[data-step-indicator]").forEach((indicator) => {
      indicator.classList.toggle("active", Number(indicator.dataset.stepIndicator) === nextNumber);
    });
    const heading = steps.find((step) => Number(step.dataset.bookingStep) === nextNumber)?.querySelector("h3");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus();
    }
    form.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });
  });
  document.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-booking-form]");
    if (!form) return;
    event.preventDefault();
    if (!form.reportValidity()) return;
    const errors = validateDates(form);
    if (errors.arrival || errors.guests) {
      (errors.arrival ? form.elements.departure : form.elements.guests).reportValidity();
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    data.createdAt = new Date().toISOString();
    const requests = JSON.parse(localStorage.getItem("ofoq-bookings") || "[]");
    requests.push(data);
    localStorage.setItem("ofoq-bookings", JSON.stringify(requests));
    form.innerHTML = `<div class="confirmation"><span class="icon">✓</span><h2>${window.Ofoq.t("وصل طلبك بنجاح", "Your request is received")}</h2><p class="muted">${window.Ofoq.t("تم حفظ طلبك التجريبي على هذا الجهاز. سيتواصل فريق أفق معك لتأكيد التفاصيل.", "Your demo request has been saved on this device. The Ofoq team will be in touch to confirm the details.")}</p><a class="btn btn-dark" href="index.html">${window.Ofoq.t("العودة للرئيسية", "Back to home")}</a></div>`;
  });
  window.addEventListener("ofoq:languagechange", updateSummary);
  window.addEventListener("ofoq:rendered", () => {
    document.querySelectorAll("[data-quick-booking]").forEach((form) => {
      const tomorrow = new Date(Date.now() + day);
      const departure = new Date(Date.now() + 2 * day);
      form.elements.arrival.min = dateValue(new Date());
      form.elements.departure.min = dateValue(tomorrow);
      form.elements.arrival.value = dateValue(tomorrow);
      form.elements.departure.value = dateValue(departure);
    });
    const form = document.querySelector("[data-booking-form]");
    if (!form) return;
    const today = new Date();
    const todayValue = dateValue(today);
    const tomorrow = new Date(today.getTime() + day);
    form.elements.arrival.min = todayValue;
    const roomId = new URLSearchParams(location.search).get("room");
    if (roomId && window.Ofoq.rooms.some((room) => room.id === roomId)) form.elements.room.value = roomId;
    const params = new URLSearchParams(location.search);
    const requestedArrival = params.get("arrival");
    const arrivalValue = isValidDate(requestedArrival) && requestedArrival >= todayValue
      ? requestedArrival
      : dateValue(tomorrow);
    form.elements.arrival.value = arrivalValue;
    const arrival = new Date(`${arrivalValue}T12:00:00`);
    const minimumDeparture = new Date(arrival.getTime() + day);
    const requestedDeparture = params.get("departure");
    const departureValue = isValidDate(requestedDeparture) && requestedDeparture > arrivalValue
      ? requestedDeparture
      : dateValue(new Date(arrival.getTime() + 2 * day));
    form.elements.departure.min = dateValue(minimumDeparture);
    form.elements.departure.value = departureValue;
    const requestedGuests = params.get("guests");
    if (Array.from(form.elements.guests.options).some((option) => option.value === requestedGuests)) {
      form.elements.guests.value = requestedGuests;
    }
    updateSummary();
  });
})();
