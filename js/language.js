(() => {
  const saved = localStorage.getItem("ofoq-language");
  const initial = saved === "en" ? "en" : "ar";
  window.Ofoq = window.Ofoq || {};
  window.Ofoq.language = initial;
  window.Ofoq.t = (ar, en) => window.Ofoq.language === "ar" ? ar : en;
  window.Ofoq.setLanguage = (language) => {
    window.Ofoq.language = language === "en" ? "en" : "ar";
    localStorage.setItem("ofoq-language", window.Ofoq.language);
    document.documentElement.lang = window.Ofoq.language;
    document.documentElement.dir = window.Ofoq.language === "ar" ? "rtl" : "ltr";
    window.dispatchEvent(new CustomEvent("ofoq:languagechange"));
  };
  const validationMessage = (field) => {
    const t = window.Ofoq.t;
    const validity = field.validity;
    if (validity.valueMissing) return t("يرجى تعبئة هذا الحقل.", "Please fill out this field.");
    if (validity.typeMismatch && field.type === "email") return t("يرجى إدخال بريد إلكتروني صحيح.", "Please enter a valid email address.");
    if (validity.tooShort) return t(`يجب إدخال ${field.minLength} أحرف على الأقل.`, `Please use at least ${field.minLength} characters.`);
    if (validity.tooLong) return t(`يجب ألا يتجاوز الإدخال ${field.maxLength} أحرف.`, `Please use no more than ${field.maxLength} characters.`);
    if (validity.rangeUnderflow) return t("القيمة المدخلة أقل من الحد المسموح.", "The value is below the allowed minimum.");
    if (validity.rangeOverflow) return t("القيمة المدخلة أعلى من الحد المسموح.", "The value exceeds the allowed maximum.");
    if (validity.stepMismatch) return t("يرجى اختيار قيمة صالحة.", "Please choose a valid value.");
    if (validity.patternMismatch) return t("يرجى إدخال القيمة بالصيغة المطلوبة.", "Please match the requested format.");
    if (validity.badInput) return t("يرجى التحقق من القيمة المدخلة.", "Please check the value you entered.");
    if (validity.customError) return t("يرجى التحقق من هذا الحقل.", "Please check this field.");
    return t("يرجى التحقق من القيمة المدخلة.", "Please check the value you entered.");
  };
  const isFormField = (field) => field instanceof HTMLInputElement
    || field instanceof HTMLSelectElement
    || field instanceof HTMLTextAreaElement;
  document.addEventListener("invalid", (event) => {
    if (isFormField(event.target)) event.target.setCustomValidity(validationMessage(event.target));
  }, true);
  const clearValidationMessage = (event) => {
    if (isFormField(event.target)) event.target.setCustomValidity("");
  };
  document.addEventListener("input", clearValidationMessage);
  document.addEventListener("change", clearValidationMessage);
  window.addEventListener("ofoq:languagechange", () => {
    document.querySelectorAll("input, select, textarea").forEach((field) => {
      if (!field.validity.valid) field.setCustomValidity(validationMessage(field));
    });
  });
  document.documentElement.lang = initial;
  document.documentElement.dir = initial === "ar" ? "rtl" : "ltr";
})();
