(() => {
  if ((location.protocol === "http:" || location.protocol === "https:") && "startViewTransition" in document) {
    const transitionStyle = document.createElement("style");
    transitionStyle.textContent = "@view-transition { navigation: auto; }";
    document.head.append(transitionStyle);
  }
  const A = (ar, en) => window.Ofoq.t(ar, en);
  const photo = (id, width = 900) => id.startsWith("assets/") ? id : `https://images.unsplash.com/${id}?fit=crop&w=${width}&q=82&fm=webp`;
  const page = document.querySelector("#page-content");
  const pageId = page.dataset.page;
  const navItems = [
    ["index.html", "الرئيسية", "Home", "home"],
    ["index.html#about", "من نحن", "About Us", "about"],
    ["rooms.html", "الغرف والأجنحة", "Stay", "rooms"],
    ["gardens.html", "الحدائق", "Gardens", "gardens"],
    ["dining.html", "المطاعم", "Dining", "dining"],
    ["facilities.html", "المرافق", "Experiences", "facilities"],
    ["gallery.html", "المعرض", "Gallery", "gallery"],
    ["contact.html", "تواصل معنا", "Contact", "contact"]
  ];
  const pageNames = {
    rooms: ["إقامتك، على مهل", "Stay, at your own pace", "غرف وأجنحة وفلل خاصة، لكل منها مساحة لراحة تشبهك.", "Rooms, suites, and private villas, each with space for the kind of rest you need."],
    booking: ["احجز إقامتك", "Reserve your stay", "خطوات قليلة تفصلك عن أيام من الهدوء والرفاهية.", "A few thoughtful steps separate you from a stay of calm and ease."],
    contact: ["يسعدنا أن نسمع منك", "We'd love to hear from you", "سواء كنت تخطط لإقامة أو ترغب في معرفة المزيد عن أفق، فريقنا هنا لمساعدتك.", "Whether you're planning a stay or simply curious about Ofoq, our team is here to help."],
    gardens: ["حدائق تنفّس معك", "Gardens that breathe with you", "بين ظلال النخيل، ومسارات الماء، تتباطأ اللحظة لتعود أقرب إلى الطبيعة.", "Under palm shade and beside flowing water, time slows and nature feels close."],
    dining: ["نكهات تحمل روح المكان", "A taste of the place", "مكونات محلية طازجة، ووصفات تحتفي بثراء البحر والموسم، في أجواء لا تُنسى.", "Fresh local ingredients and menus celebrating the sea and the season, served in memorable settings."],
    facilities: ["كل يوم، حكاية جديدة", "Make every day a story", "من أول ضوء على المسبح إلى مغامرات البحر، تفاصيل صغيرة تصنع إقامة استثنائية.", "From first light by the pool to adventures at sea, little details make a remarkable stay."],
    gallery: ["لحظات من أفق", "A glimpse of Ofoq", "مساحات مفتوحة على البحر والطبيعة، وذكريات تنتظر أن تُعاش.", "Open horizons, lush nature, and memories waiting to be made."],
    privacy: ["خصوصيتك أمانة", "Your privacy matters", "نحترم بياناتك ونستخدمها فقط لتقديم تجربة إقامة أكثر سلاسة وراحة.", "We respect your information and use it only to make your stay smoother and more comfortable."],
    terms: ["إقامة واضحة ومريحة", "A stay, made clear", "تساعدك هذه الشروط على معرفة تفاصيل الحجز والإقامة قبل وصولك.", "These terms outline the details of your reservation and stay before you arrive."],
    "room-details": ["تفاصيل إقامتك", "Your stay, in detail", "اختَر المساحة التي تشبه إيقاعك، واترك لنا بقية التفاصيل.", "Choose a space that feels like your own pace; let us take care of the rest."],
    "404": ["الصفحة غير موجودة", "Page not found", "لم نتمكن من العثور على الصفحة التي تبحث عنها.", "We couldn't find the page you're looking for."]
  };
  const rooms = window.Ofoq.rooms;

  document.addEventListener("error", (event) => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement) || image.dataset.imageFailed) return;
    image.dataset.imageFailed = "true";
    image.removeAttribute("src");
    image.removeAttribute("srcset");
    image.alt = A("الصورة غير متاحة حالياً", "Image currently unavailable");
  }, true);

  function header() {
    const active = pageId === "room-details" || pageId === "booking" ? "rooms" : pageId;
    document.querySelector("#site-header").innerHTML = `<header class="site-header"><div class="container header-inner">
      <a class="brand" href="index.html" aria-label="${A("العودة إلى الرئيسية - فندق أفق", "Ofoq Hotel home")}"><img class="brand-mark" src="assets/logo/ofoq-mark.svg" alt=""><span class="brand-copy"><strong>OFOQ HOTEL</strong><small>${A("فندق أُفُق · ملاذك بين البحر والطبيعة", "OFOQ HOTEL · A sanctuary by sea & nature")}</small></span></a>
      <nav class="main-nav" aria-label="${A("التنقل الرئيسي", "Main navigation")}">${navItems.map(([href, ar, en, key]) => `<a href="${href}" ${active === key ? 'aria-current="page"' : ""}>${A(ar, en)}</a>`).join("")}</nav>
      <div class="header-actions"><button class="header-action" type="button" data-language-toggle aria-label="${A("التبديل إلى الإنجليزية", "Switch to Arabic")}">${A("EN", "ع")} </button><button class="header-action" type="button" data-theme-toggle aria-label="${window.Ofoq.language === "ar" ? (document.documentElement.dataset.theme === "dark" ? "التبديل إلى الوضع النهاري" : "التبديل إلى الوضع الليلي") : (document.documentElement.dataset.theme === "dark" ? "Switch to light mode" : "Switch to dark mode")}">◐</button><a class="btn header-book" href="booking.html">${A("احجز إقامتك", "Book your stay")}</a><button class="header-action menu-toggle" type="button" data-menu-toggle aria-label="${A("فتح القائمة", "Open menu")}" aria-expanded="false">☰</button></div>
    </div></header>`;
  }

  function footer() {
    document.querySelector("#site-footer").innerHTML = `<footer class="site-footer"><div class="container"><div class="footer-grid">
      <div class="footer-about"><a class="brand" href="index.html"><img class="brand-mark" src="assets/logo/ofoq-mark.svg" alt=""><span class="brand-copy"><strong>OFOQ HOTEL</strong><small>${A("فندق أُفُق", "A horizon of your own")}</small></span></a><p>${A("حيث يلتقي البحر بسحر الطبيعة. ملاذ ساحلي صُمم للحظات التي تستحق أن تدوم.", "Where the Sea Meets the Beauty of Nature. A coastal sanctuary made for moments that stay with you.")}</p><div class="social-links"><a href="https://instagram.com" aria-label="Instagram">ig</a><a href="https://facebook.com" aria-label="Facebook">f</a><a href="https://x.com" aria-label="X">x</a></div></div>
      <div class="footer-col footer-location"><h3 class="footer-title">${A("موقعنا | Our Location", "Our Location")}</h3><div class="footer-links"><a href="contact.html#our-location">${A("أملج، منطقة تبوك", "Umluj, Tabuk Region")}</a></div></div>
      <div class="footer-col"><h3 class="footer-title">${A("اكتشف أفق", "Discover Ofoq")}</h3><div class="footer-links"><a href="rooms.html">${A("الغرف والأجنحة", "Rooms & suites")}</a><a href="gardens.html">${A("الحدائق", "Gardens")}</a><a href="dining.html">${A("المطاعم والمقاهي", "Dining")}</a><a href="facilities.html">${A("المرافق", "Facilities")}</a></div></div>
      <div class="footer-col"><h3 class="footer-title">${A("لنبقَ على تواصل", "Get in touch")}</h3><div class="footer-links"><a href="contact.html">${A("تواصل معنا", "Contact us")}</a><a href="mailto:hello@ofoqhotel.com">hello@ofoqhotel.com</a><a href="tel:+966126000000">+966 12 600 0000</a><span>${A("الساحل الغربي · المملكة العربية السعودية", "West Coast · Saudi Arabia")}</span></div></div>
      <div class="footer-newsletter"><h3 class="footer-title">${A("رسائل من أفق", "Notes from Ofoq")}</h3><p class="muted">${A("أخبار هادئة وعروض مختارة، مباشرة إلى بريدك.", "Occasional notes and thoughtful offers, sent to your inbox.")}</p><form class="newsletter" data-newsletter><label class="sr-only" for="newsletter-email">${A("البريد الإلكتروني", "Email address")}</label><input id="newsletter-email" name="email" type="email" placeholder="${A("بريدك الإلكتروني", "Your email address")}" required><button type="submit" aria-label="${A("اشتراك", "Subscribe")}">→</button></form></div>
          </div><div class="footer-bottom"><span>© ${new Date().getFullYear()} OFOQ HOTEL. ${A("جميع الحقوق محفوظة", "All rights reserved")}.</span><span><a href="privacy.html">${A("الخصوصية", "Privacy")}</a> · <a href="terms.html">${A("الشروط والأحكام", "Terms")}</a></span></div></div></footer>`;
  }

  function hero(title, description, image = "photo-1519046904884-53103b34b206") {
    return `<section class="page-hero"><img class="page-hero-image" src="${photo(image, 1800)}" alt="" fetchpriority="high"><div class="container"><div class="breadcrumb"><a href="index.html">${A("الرئيسية", "Home")}</a><span>/</span><span>${title}</span></div><h1>${title}</h1><p>${description}</p></div></section>`;
  }

  const roomsMarkup = () => `<div class="filter-row">
    <div class="field"><label for="room-search">${A("ابحث عن إقامة", "Search stays")}</label><input id="room-search" data-room-search type="search" placeholder="${A("اسم الغرفة أو الجناح", "Room or suite name")}"></div>
    <div class="field"><label for="room-type">${A("نوع الإقامة", "Stay type")}</label><select id="room-type" data-room-type><option value="all">${A("جميع الخيارات", "All stays")}</option><option value="room">${A("غرف", "Rooms")}</option><option value="suite">${A("أجنحة", "Suites")}</option><option value="villa">${A("فلل", "Villas")}</option></select></div>
    <div class="field"><label for="room-sort">${A("ترتيب السعر", "Sort by price")}</label><select id="room-sort" data-room-sort><option value="recommended">${A("مقترحة", "Recommended")}</option><option value="low">${A("الأقل سعراً", "Lowest first")}</option><option value="high">${A("الأعلى سعراً", "Highest first")}</option></select></div>
  </div><div class="cards-grid" data-room-list></div>`;

  function quickBarMarkup() {
    return `<div class="booking-bar"><form class="booking-fields" data-quick-booking><div class="field"><label for="quick-arrival">${A("الوصول", "Check-in")}</label><input id="quick-arrival" name="arrival" type="date" required></div><div class="field"><label for="quick-departure">${A("المغادرة", "Check-out")}</label><input id="quick-departure" name="departure" type="date" required></div><div class="field"><label for="quick-guests">${A("الضيوف", "Guests")}</label><select id="quick-guests" name="guests"><option value="1">1</option><option value="2" selected>2</option><option value="3">3</option><option value="4">4</option></select></div><div class="field"><label for="quick-room">${A("اختر الغرفة أو الجناح", "Choose a room or suite")}</label><select id="quick-room" name="room"></select></div><button class="btn btn-dark" type="submit">${A("احجز", "Book")} →</button></form></div>`;
  }
  function populateQuickBooking(form) {
    const select = form?.elements.room;
    if (!select) return;
    select.innerHTML = window.Ofoq.rooms.map((room) => `<option value="${room.id}">${A(room.ar, room.en)}</option>`).join("");
    if (window.Ofoq.rooms[0]) select.value = window.Ofoq.rooms[0].id;
  }

  function bookingMarkup() {
    return `${hero(A("احجز إقامتك", "Reserve your stay"), A("خطوات قليلة تفصلك عن أيام من الهدوء والرفاهية.", "A few thoughtful steps separate you from a stay of calm and ease."), "photo-1571896349842-33c89424de2d")}
      <section class="section"><div class="container booking-layout"><form class="booking-form" data-booking-form>
        <div class="steps"><span class="step active" data-step-indicator="1">${A("١. الإقامة", "1. Stay")}</span><span class="step" data-step-indicator="2">${A("٢. بياناتك", "2. Your details")}</span><span class="step" data-step-indicator="3">${A("٣. التأكيد", "3. Confirm")}</span></div>
        <h2>${A("تفاصيل الرحلة", "Your trip details")}</h2><p class="muted">${A("أكمل البيانات التالية لحساب تقديري لتكلفة إقامتك.", "Complete the details below to see an estimate for your stay.")}</p>
        <fieldset class="booking-step" data-booking-step="1"><legend class="sr-only">${A("تفاصيل الإقامة", "Stay details")}</legend><div class="form-grid">
          <div class="field"><label for="arrival">${A("تاريخ الوصول", "Check-in")}</label><input id="arrival" name="arrival" type="date" required></div>
          <div class="field"><label for="departure">${A("تاريخ المغادرة", "Check-out")}</label><input id="departure" name="departure" type="date" required></div>
          <div class="field"><label for="guests">${A("عدد الضيوف", "Guests")}</label><select id="guests" name="guests"><option value="1">1</option><option value="2" selected>2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></div>
          <div class="field"><label for="room">${A("اختر إقامتك", "Choose your stay")}</label><select id="room" name="room">${rooms.map((room) => `<option value="${room.id}">${A(room.ar, room.en)} — ${room.price.toLocaleString()} ${A("ر.س / ليلة", "SAR / night")}</option>`).join("")}</select></div>
        </div><div class="step-actions"><button class="btn btn-dark" type="button" data-step-next>${A("متابعة إلى بياناتك", "Continue to your details")} →</button></div></fieldset>
        <fieldset class="booking-step" data-booking-step="2" hidden><legend class="sr-only">${A("بيانات الضيف", "Guest details")}</legend><div class="form-grid">
          <div class="field"><label for="guest-name">${A("الاسم الكامل", "Full name")}</label><input id="guest-name" name="name" autocomplete="name" required minlength="2"></div>
          <div class="field"><label for="guest-email">${A("البريد الإلكتروني", "Email")}</label><input id="guest-email" name="email" type="email" autocomplete="email" required></div>
          <div class="field full"><label for="guest-phone">${A("رقم الهاتف", "Phone number")}</label><input id="guest-phone" name="phone" type="tel" autocomplete="tel" required minlength="7"></div>
          <div class="field full"><label for="guest-notes">${A("طلبات خاصة (اختياري)", "Special requests (optional)")}</label><textarea id="guest-notes" name="notes" placeholder="${A("أخبرنا كيف نجعل إقامتك أكثر تميزاً", "Tell us how we can make your stay special")}"></textarea></div>
        </div><div class="step-actions"><button class="btn btn-outline" type="button" data-step-back>${A("رجوع", "Back")}</button><button class="btn btn-dark" type="button" data-step-next>${A("متابعة إلى التأكيد", "Continue to confirmation")} →</button></div></fieldset>
        <fieldset class="booking-step" data-booking-step="3" hidden><legend class="sr-only">${A("تأكيد الطلب", "Confirm request")}</legend><h3>${A("تأكيد طلبك", "Confirm your request")}</h3><p class="muted">${A("راجع ملخص الإقامة، ثم أرسل الطلب التجريبي. لا يتم تحصيل أي مبلغ.", "Review your stay summary, then send your demo request. No payment will be collected.")}</p><label class="confirm-check"><input name="demoConsent" type="checkbox" required> ${A("أفهم أن هذا طلب تجريبي وليس حجزاً مؤكداً.", "I understand this is a demo request, not a confirmed booking.")}</label><div class="step-actions"><button class="btn btn-outline" type="button" data-step-back>${A("رجوع", "Back")}</button><button class="btn btn-dark" type="submit">${A("إرسال طلب الحجز", "Send booking request")} →</button></div></fieldset>
        <p class="muted">${A("هذا نموذج حجز تجريبي لأغراض العرض، ولا يتصل بنظام حجوزات فعلي.", "This is a demo booking form and does not connect to a live reservation system.")}</p>
      </form><aside class="booking-summary" data-booking-summary></aside></div></section>`;
  }

  function homeMarkup() {
    const rooms = window.Ofoq.rooms.slice(0, 3);
    const picks = [
      ["photo-1519046904884-53103b34b206", "البحر", "Sea"],
      ["photo-1441974231531-c6227db76b6e", "الحدائق", "Gardens"],
      ["photo-1414235077428-338989a2e8c0", "المذاقات", "Dining"]
    ];
    return `<section class="home-hero"><img class="home-hero-image" src="${photo("photo-1571896349842-33c89424de2d", 2200)}" alt="" fetchpriority="high"><div class="hero-content"><span class="eyebrow">${A("وجهة للسكينة والاكتشاف", "A destination for calm & discovery")}</span><h1>${A("حيث يلتقي البحر<br>بسحر الطبيعة", "Where the sea meets<br>the beauty of nature")}</h1><div class="hero-actions"><a class="btn" href="rooms.html">${A("اكتشف أفق", "Discover Ofoq")} <span>↙</span></a><a class="btn btn-outline" href="booking.html">${A("احجز إقامتك", "Book your stay")}</a></div><div class="hero-note"><span></span>${A("وجهتك الساحلية القادمة", "Your next coastal escape")}</div></div></section>
    <form class="booking-bar" data-quick-booking><div class="booking-fields">
      <div class="field"><label for="quick-arrival">${A("الوصول", "Check-in")}</label><input id="quick-arrival" name="arrival" type="date" required></div>
      <div class="field"><label for="quick-departure">${A("المغادرة", "Check-out")}</label><input id="quick-departure" name="departure" type="date" required></div>
      <div class="field"><label for="quick-guests">${A("الضيوف", "Guests")}</label><select id="quick-guests" name="guests"><option value="1">1</option><option value="2" selected>2</option><option value="3">3</option><option value="4">4</option></select></div>
      <div class="field"><label for="quick-room">${A("الإقامة", "Stay")}</label><select id="quick-room" name="room">${rooms.map((room) => `<option value="${room.id}">${A(room.ar, room.en)}</option>`).join("")}</select></div>
      <button class="btn btn-dark" type="submit">${A("ابحث", "Find a stay")} →</button>
    </div></form>
    <section class="section"><div class="container intro-grid"><div class="intro-copy" data-reveal><span class="eyebrow">${A("أهلاً بك في أفق", "Welcome to Ofoq")}</span><h2>${A("ملاذٌ ينسجم مع إيقاعك", "A retreat in tune with you")}</h2><p>${A("في أفق، تنساب الأيام على مهل. استيقظ على صوت البحر، تجوّل بين ظلال النخيل، ثم دع ضوء الغروب يرافقك إلى أمسية هادئة. هنا، الرفاهية ليست في المبالغة، بل في كل تفصيل يجعلك أقرب إلى الراحة.", "At Ofoq, days unfold at their own pace. Wake to the sea, wander among palms, then follow the sunset into an unhurried evening. Luxury here is not excess; it is every detail that brings you closer to ease.")}</p><a class="card-link" href="facilities.html">${A("حكاية أفق", "The Ofoq story")} ↗</a><div class="intro-stats"><div><strong>120+</strong><span>${A("وحدة إقامة", "private stays")}</span></div><div><strong>5★</strong><span>${A("تجربة استثنائية", "considered hospitality")}</span></div><div><strong>24/7</strong><span>${A("ضيافة حاضرة", "here for you")}</span></div></div></div><div class="intro-image" data-reveal><img src="${photo("photo-1602002418082-a4443e081dd1", 900)}" alt="${A("فيلا هادئة محاطة بالخضرة", "A tranquil villa surrounded by greenery")}" loading="lazy"></div></div></section>
    <section class="section feature-strip"><div class="container"><div class="section-heading"><span class="eyebrow">${A("أفق من زاوية أخرى", "The Ofoq feeling")}</span><h2>${A("رفاهية تُشبه الطبيعة", "Luxury with a natural soul")}</h2><p>${A("كل مساحة في أفق تدعوك لأن تعيش اللحظة كما هي، ببساطة وجمال.", "Every space at Ofoq invites you to live in the moment, simply and beautifully.")}</p></div><div class="feature-grid">${[
      ["assets/icons/stillness.svg", "خصوصية وهدوء", "Privacy & stillness", "مساحات صُممت لتمنحك وقتاً لنفسك.", "Spaces designed to give you room to yourself."],
      ["assets/icons/waves.svg", "بحر على مداك", "The sea, close by", "مياه فيروزية وإيقاع ساحلي ملهم.", "Turquoise water and an inspiring coastal rhythm."],
      ["assets/icons/leaf.svg", "طبيعة حيّة", "Living nature", "حدائق استوائية تروي حكاية المكان.", "Tropical gardens rooted in a sense of place."],
      ["assets/icons/hospitality.svg", "ضيافة من القلب", "Warm hospitality", "فريق يعتني بالتفاصيل قبل أن تطلبها.", "A team that thinks of the details before you ask."]
    ].map((item) => `<article class="feature-card" data-reveal><span class="icon"><img src="${item[0]}" alt=""></span><h3>${A(item[1], item[2])}</h3><p>${A(item[3], item[4])}</p></article>`).join("")}</div></div></section>
    <section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">${A("إقامتك كما تحبها", "Find your own kind of stay")}</span><h2>${A("مساحات تدعوك للبقاء", "Spaces made for staying")}</h2><p>${A("من إطلالة الصباح على البحر إلى خصوصية فيلتك، لكل إقامة في أفق طابعها الخاص.", "From morning sea views to the privacy of your own villa, every Ofoq stay has a character of its own.")}</p></div><div class="cards-grid">${rooms.map((room) => `<article class="editorial-card room-card" data-reveal><img src="${photo(room.image, 900)}" alt="${A(room.ar, room.en)}" loading="lazy"><div class="card-body"><span class="room-type">${room.type === "villa" ? A("فيلا خاصة", "PRIVATE VILLA") : room.type === "suite" ? A("جناح فاخر", "LUXURY SUITE") : A("غرفة فاخرة", "LUXURY ROOM")}</span><h3>${A(room.ar, room.en)}</h3><div class="card-meta"><span class="price">${room.price.toLocaleString()} <small>${A("ر.س / ليلة", "SAR / night")}</small></span><a class="card-link" href="room-details.html?room=${room.id}">${A("التفاصيل", "Details")} →</a></div></div></article>`).join("")}</div><div class="section-action"><a class="btn btn-outline" href="rooms.html">${A("اكتشف جميع الإقامات", "Explore all stays")}</a></div></div></section>
    <section class="split-band"><div class="split-content"><span class="eyebrow">${A("مساحات خضراء", "A world of green")}</span><h2>${A("خطواتك تقودك إلى الطبيعة", "Let the garden lead")}</h2><p>${A("بين شلالات هادئة وممرات تتلوّى تحت النخيل، تصبح أبسط نزهة لحظة تستحق أن تطول.", "Follow quiet cascades and palm-lined paths, and let even the simplest stroll become a moment worth lingering in.")}</p><a class="btn" href="gardens.html">${A("تجوّل في الحدائق", "Wander the gardens")} ↗</a></div><img src="${photo("assets/images/gardens/green-garden.jpg", 1100)}" alt="${A("حديقة خضراء فاخرة بالمنتجع الساحلي", "Luxury green garden of the coastal resort")}" loading="lazy"></section>
    <section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">${A("تجارب أفق", "Ofoq experiences")}</span><h2>${A("من السكينة إلى الاكتشاف", "From stillness to discovery")}</h2></div><div class="cards-grid">${picks.map((item, index) => {
      const links = ["facilities.html", "gardens.html", "dining.html"];
      const arDescs = ["مسبح لا متناهٍ وشاطئ خاص يفتحان يومك على البحر.", "مسارات ظليلة وشلالات وجلسات تحت السماء.", "قوائم موسمية في أجواء مطلة على الماء."];
      const enDescs = ["An infinity pool and private beach open your day to the sea.", "Shaded paths, cascades, and open-air hideaways.", "Seasonal menus in settings overlooking the water."];
      const titlesAr = ["البحر والمسبح", "الحدائق", "المطاعم والمقاهي"];
      const titlesEn = ["Sea & pool", "Gardens", "Dining"];
      return `<a class="editorial-card" href="${links[index]}" data-reveal><div style="position:relative"><img src="${photo(item[0], 800)}" alt="${A(item[1], item[2])}" loading="lazy"><div class="image-caption">${A(item[1], item[2])}</div></div><div class="card-body"><h3>${A(titlesAr[index], titlesEn[index])}</h3><p>${A(arDescs[index], enDescs[index])}</p><span class="card-link">${A("اكتشف التجربة", "Explore")} →</span></div></a>`;
    }).join("")}</div></div></section>
    <section class="section feature-strip"><div class="container"><div class="section-heading"><span class="eyebrow">${A("قالوا عن أفق", "Guest notes")}</span><h2>${A("لحظات تبقى", "The moments that stay")}</h2></div><article class="quote-card" data-reveal><div class="quote-stars" aria-label="${A("٥ من ٥", "5 out of 5")}">★★★★★</div><blockquote>${A("«منذ لحظة وصولنا، شعرنا أن المكان صُمم ليمنحنا مساحة حقيقية للهدوء. البحر والحدائق والاهتمام بالتفاصيل جعلوا إقامتنا استثنائية.»", "“From the moment we arrived, we felt this place was made to give us room to truly unwind. The sea, gardens, and thoughtful details made our stay exceptional.”")}</blockquote><cite>${A("ليان م. · ضيفة في أفق", "Lian M. · Ofoq guest")}</cite></article></div></section>
    <section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">${A("قد تتساءل", "A few things you may wonder")}</span><h2>${A("أسئلة شائعة", "Frequently asked questions")}</h2></div><div class="faq-list">${[
      ["متى موعد تسجيل الوصول والمغادرة؟", "What are check-in and check-out times?", "يبدأ تسجيل الوصول الساعة ٣ مساءً، والمغادرة حتى ١٢ ظهراً. يسعدنا ترتيب وصول مبكر أو مغادرة متأخرة حسب التوافر.", "Check-in begins at 3 PM, and check-out is until 12 PM. Early arrival or late departure can be arranged subject to availability."],
      ["هل يضم الفندق شاطئاً خاصاً؟", "Does the hotel have a private beach?", "نعم، يمكن لضيوف أفق الاستمتاع بمنطقة شاطئية خاصة مع جلسات ومناشف وخدمة ضيافة.", "Yes. Ofoq guests enjoy a private beach area with loungers, towels, and attentive service."],
      ["هل يمكن تعديل الحجز أو إلغاؤه؟", "Can I change or cancel my reservation?", "تختلف سياسة التعديل والإلغاء بحسب نوع السعر وتاريخ الإقامة. ستجد التفاصيل في تأكيد حجزك.", "Change and cancellation terms vary by rate and stay dates. Full details are provided with your reservation confirmation."]
    ].map((faq) => `<div class="faq-item"><button class="faq-question" type="button" aria-expanded="false"><span>${A(faq[0], faq[1])}</span><span>＋</span></button><div class="faq-answer" hidden>${A(faq[2], faq[3])}</div></div>`).join("")}</div></div></section>
    <section class="home-cta"><img class="home-cta-image" src="${photo("photo-1507525428034-b723cf961d3e", 1600)}" alt="" loading="lazy" decoding="async"><div class="container"><span class="eyebrow">${A("وقتك في أفق يبدأ هنا", "Your time at Ofoq begins here")}</span><h2>${A("امنح نفسك مساحة للراحة", "Make room to unwind")}</h2><p>${A("خطوتك القادمة قد تكون بداية أجمل حكاية ساحلية. يسعدنا أن نكون جزءاً منها.", "Your next step could begin a beautiful coastal story. We would love to be a part of it.")}</p><a class="btn" href="booking.html">${A("خطط لإقامتك", "Plan your stay")} ↗</a></div></section>${aboutMarkup()}`;
  }

  function aboutMarkup() {
    return `<section class="about-us" id="about"><div class="container"><div class="about-layout">
      <img class="about-photo" src="${photo("photo-1571896349842-33c89424de2d", 1600)}" alt="${A("صورة ساحلية فاخرة تجمع البحر والمسابح والطبيعة الخضراء", "A luxurious coastal resort photo blending the sea, the infinity pool, and green nature")}" loading="lazy">
      <div class="about-content">
        <h2 class="about-title">${A("من نحن", "About Us")}</h2>
        <p class="about-story">${A("في قلب أفق، نؤمن أن كل لحظة راحة تبدأ بتفاصلها. من اختيار بيئة صامتة تتناسب مع سعادتك، إلى كل تفصيل الضيافة التي تجعلك تشعر أنك في بيتك — سواء أبحث عن راحة أو عن رحلة، أنت في المكان الصح.", "At Ofoq, we believe every moment of rest begins with the details that shape it. From crafting a quiet setting that matches your happiness, to every hospitality detail that makes you feel at home — whether you need rest or a journey, you are in the right place.")}</p>
        <div class="about-ratings">
          <span class="about-rating">${A("4.9 من 5", "4.9 out of 5")}</span>
          <div class="rating" aria-label="${A("4.9 من 5", "4.9 out of 5")}">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <span class="about-reviews">${A("141 مراجعة", "141 reviews")}</span>
          <a class="card-link" href="contact.html#review-form">${A("اكتب تقييمك", "Write a review")} →</a>
        </div>
        <p class="about-desc">${A("في أفق، نؤمن أن الإقامة الجميلة تبدأ من التفاصيل. نصنع لضيوفنا تجربة استثنائية تجمع بين فخامة الضيافة وسحر البحر وهدوء الطبيعة، لتصبح كل لحظة ذكرى تستحق أن تُعاش.", "At OFOQ, we believe that a memorable stay begins with the finest details. We create exceptional experiences that blend luxurious hospitality, the beauty of the sea, and the serenity of nature, making every moment worth remembering.")}</p>
        <div class="about-cards">
          <article class="about-card"><span class="about-card-icon"><img src="assets/icons/stillness.svg" alt=""></span><h3>${A("رؤيتنا", "Our Vision")}</h3><p>${A("أن نكون وجهة مميزة للراحة والضيافة الفاخرة.", "To become a distinguished destination for relaxation and luxurious hospitality.")}</article>
          <article class="about-card"><span class="about-card-icon"><img src="assets/icons/waves.svg" alt=""></span><h3>${A("رسالتنا", "Our Mission")}</h3><p>${A("تقديم تجربة إقامة متكاملة تجمع الجمال والراحة وجودة الخدمة.", "To provide an exceptional stay that combines beauty, comfort, and outstanding service.")}</article>
          <article class="about-card"><span class="about-card-icon"><img src="assets/icons/leaf.svg" alt=""></span><h3>${A("قيمنا", "Our Values")}</h3><p>${A("الفخامة، الخصوصية، الاهتمام، والتميز.", "Luxury, privacy, care, and excellence.")}</article>
        </div>
      </div>
    </div></section>`;
  }


  function detailMarkup() {
    const selected = new URLSearchParams(location.search).get("room");
    const room = window.Ofoq.room(selected);
    const title = A(room.ar, room.en);
    const images = [room.image, "photo-1618221195710-dd6b41faaea6", "photo-1616486338812-3dadae4b4ace"];
    const features = A(room.featuresAr, room.featuresEn);
    const nightsOptions = Array.from({ length: 7 }, (_, count) => count + 1).map((count) => `<option value="${count}"${count === 1 ? " selected" : ""}>${count}</option>`).join("");
    return `${hero(title, A("مساحة خاصة، تفاصيل مدروسة، وإطلالة تجعل لكل صباح بداية مختلفة.", "A private space, thoughtful details, and a view that makes every morning feel new."), "photo-1505693416388-ac5ce068fe85")}
      <section class="section"><div class="container"><div class="detail-layout"><div><div class="detail-gallery">${images.map((image, index) => `<img src="${photo(image, index === 0 ? 1200 : 650)}" alt="${title} ${index + 1}" loading="lazy">`).join("")}</div><div class="section-heading detail-copy-heading"><span class="eyebrow">${A("إقامة أفق", "Ofoq stay")}</span><h2>${title}</h2><p>${A("استمتع بمساحة رحبة تمزج الخامات الطبيعية بالراحة العصرية، مع عناية شخصية تجعل كل تفصيل في مكانه.", "Enjoy a generous retreat where natural textures meet modern comfort, with personal touches that make every detail feel just right.")}</p></div><div class="amenity-list">${[A(`${room.size} م² من المساحة الهادئة`, `${room.size} sqm of considered space`), A(`تستوعب حتى ${room.guests} ضيوف`, `Up to ${room.guests} guests`), ...features].map((feature) => `<div class="amenity-item">✦ &nbsp;${feature}</div>`).join("")}</div></div></section><p class="room-desc">${A(room.descAr, room.descEn)}</p></div><aside class="detail-panel"><span class="room-type">${A("إقامة أفق", "OFOQ STAY")}</span><h2>${title}</h2><p class="muted">${A("السعر يبدأ من", "Starting from")}</p><div class="price">${room.price.toLocaleString()} <small>${A("ر.س / الليلة", "SAR / night")}</small></div><div class="room-price-calc"><label class="room-price-label" for="room-nights">${A("عدد الليالي:", "Nights:")}</label><select data-room-nights>${nightsOptions}</select><span class="room-price-total">${A("الإجمالي:", "Total:")} <span data-room-total></span></span></div><p class="muted">${A("يشمل السعر وجبة الإفطار وإمكانية الوصول إلى مرافق الفندق.", "Rate includes breakfast and access to hotel facilities.")}</p><a class="btn btn-dark btn-block" href="booking.html?room=${room.id}">${A("احجز هذه الإقامة", "Book this stay")} →</a><p class="muted demo-note">${A("تُعرض الأسعار لأغراض تجريبية.", "Prices shown for demonstration purposes.")}</p></aside></div></div></section>`;
  }

  const serviceData = {
    gardens: {
      cards: [
        ["photo-1441974231531-c6227db76b6e", "ممرات النخيل", "Palm Walk", "مسارات تتعرج بين أشجار وارفة ونباتات محلية، لتكون نزهتك اليومية أقرب إلى طقس هادئ.", "Meandering paths among palms and native plants turn your daily walk into a quiet ritual."],
        ["photo-1470770841072-f978cf4d019e", "حديقة الماء", "Water Garden", "شلالات خفيفة وبرك صافية تمنح المكان إيقاعاً رقيقاً وصوتاً يبعث على السكينة.", "Gentle cascades and clear pools give the gardens a soothing, unhurried rhythm."],
        ["assets/images/gardens/sunset-hideaway.jpg", "جلسات الغروب", "Sunset Hideaways", "زوايا خارجية خاصة بين الخضرة، مثالية لقهوة المساء أو لحظة تأمل تحت السماء.", "Private outdoor nooks among the greenery, ideal for evening coffee or a moment under the sky."]
      ]
    },
    dining: {
      cards: [
        ["photo-1414235077428-338989a2e8c0", "موج", "Mawj", "مطبخ ساحلي معاصر يحتفي بصيد اليوم ومكونات المنطقة، بإطلالة مفتوحة على البحر.", "Contemporary coastal cuisine celebrating the daily catch and regional produce, overlooking the sea."],
        ["photo-1517248135467-4c7edcad34c4", "سُلاف", "Sulaf", "نكهات من الأرض والموسم في حديقة مطعم هادئة، مع أطباق تُقدم للمشاركة.", "Seasonal, garden-led flavours in a relaxed setting, made for sharing."],
        ["photo-1509042239860-f550ce710b93", "رِواق", "Riwaq", "قهوة مختصة وشاي وأصناف خفيفة في مساحة تلتقي فيها ظلال النخيل بالبحر.", "Specialty coffee, tea, and light bites where palm shade meets the sea."]
      ]
    },
    facilities: {
      cards: [
        ["photo-1571896349842-33c89424de2d", "المسبح اللامتناهي", "Infinity Pool", "مياه هادئة تمتد بصرياً إلى الأفق، مع كبائن خاصة ومناشف وخدمة بجانب المسبح.", "Still water stretching toward the horizon, with private cabanas, fresh towels, and poolside service."],
        ["photo-1519046904884-53103b34b206", "شاطئ أفق", "Ofoq Beach", "ساحل هادئ للسباحة والاسترخاء، مع تجارب بحرية بإشراف فريق متخصص.", "A quiet stretch for swimming and unwinding, with sea experiences led by our team."],
        ["photo-1534438327276-14e5300c3a48", "النادي الرياضي", "Fitness Studio", "مساحة مجهزة للتمرين اليومي، مع جلسات حركة وإطلالة تلهمك على مواصلة يومك.", "A well-equipped space for daily exercise, with movement classes and inspiring views."]
      ]
    }
  };

  function serviceMarkup(type) {
    const info = pageNames[type];
    const data = serviceData[type];
    const image = { gardens: "photo-1470071459604-3b5ec3a7fe05", dining: "photo-1514933651103-005eec06c04b", facilities: "photo-1500375592092-40eb2168fd21" }[type];
    const intro = type === "gardens"
      ? `<section class="section"><div class="container intro-grid"><div class="intro-copy"><span class="eyebrow">${A("طبيعة تنتمي للمكان", "A landscape of its own")}</span><h2>${A("حديقة تُعاش، لا تُشاهد فقط", "A garden to inhabit, not just admire")}</h2><p>${A("تتوزع حدائق أفق على مساحات رحبة من النباتات المتكيفة مع الساحل، حيث يلتقي خرير الماء بظل الشجر وتفتح الجلسات الخارجية على لحظات من الصفاء.", "Across Ofoq, native coastal planting creates generous green spaces where flowing water meets the shade of trees and outdoor hideaways open onto moments of calm.")}</p><ul class="check-list"><li>${A("ممرات صالحة للتجول في كل الأوقات", "Shaded paths for a stroll at any hour")}</li><li>${A("جلسات خاصة بين النباتات", "Private seating among the greenery")}</li><li>${A("جولات تعريفية بالطبيعة المحلية", "Guided introductions to local flora")}</li></ul></div><div class="intro-image"><img src="${photo("photo-1470252649378-9c29740c9fa8", 900)}" alt="${A("مساحات خضراء في أفق", "Green spaces at Ofoq")}" loading="lazy"></div></div></section>`
      : "";
    const cards = data.cards.map((item) => `<article class="editorial-card" data-reveal><img src="${photo(item[0], 900)}" alt="${A(item[1], item[2])}" loading="lazy"><div class="card-body"><span class="eyebrow">${A(type === "dining" ? "نكهات أفق" : type === "gardens" ? "تجربة طبيعية" : "مرافق أفق", type.toUpperCase())}</span><h3>${A(item[1], item[2])}</h3><p>${A(item[3], item[4])}</p>${type === "dining" ? `<a class="card-link" href="contact.html">${A("استفسر عن الطاولة", "Ask about a table")} →</a>` : ""}</div></article>`).join("");
    const special = type === "dining" ? `<section class="section feature-strip"><div class="container"><div class="section-heading"><span class="eyebrow">${A("قائمة الموسم", "Seasonal menus")}</span><h2>${A("من البحر إلى مائدتك", "From sea to table")}</h2><p>${A("تتغير قوائمنا مع الموسم وتوافر المكونات الطازجة. اطلب قائمة الطعام مباشرة من فريق المطعم عند زيارتك.", "Our menus evolve with the seasons and the freshest ingredients. Ask our restaurant team for today's selection.")}</p></div><div class="cards-grid"><article class="feature-card"><span class="icon"><img src="assets/icons/dining.svg" alt=""></span><h3>${A("مائدة الساحل", "Coastal table")}</h3><p>${A("صيد محلي يُطهى ببساطة، مع أعشاب ومكونات من المنطقة.", "Local catch, simply prepared with herbs and regional produce.")}</p></article><article class="feature-card"><span class="icon"><img src="assets/icons/leaf.svg" alt=""></span><h3>${A("من الحديقة", "From the garden")}</h3><p>${A("أطباق نباتية موسمية تحتفي بما تقدمه الأرض.", "Seasonal plant-led dishes celebrating the land.")}</p></article><article class="feature-card"><span class="icon"><img src="assets/icons/waves.svg" alt=""></span><h3>${A("جلسة على البحر", "By the water")}</h3><p>${A("احجز جلسة خارجية لمتابعة الغروب مع قائمة خفيفة.", "Reserve an outdoor table for sunset and a light menu.")}</p></article></div></div></section>` : "";
    return `${hero(A(info[0], info[1]), A(info[2], info[3]), image)}${intro}<section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">${A("اختر تجربتك", "Choose your experience")}</span><h2>${A(type === "gardens" ? "أماكن تترك أثرها" : type === "dining" ? "موائد لكل لحظة" : "تفاصيل تكمّل إقامتك", type === "gardens" ? "Places that stay with you" : type === "dining" ? "A table for every moment" : "Details that complete your stay")}</h2></div><div class="cards-grid">${cards}</div></div></section>${special}<section class="home-cta"><div class="container"><span class="eyebrow">${A("في انتظارك", "Waiting for you")}</span><h2>${A("عِش أفق بطريقتك", "Experience Ofoq your way")}</h2><p>${A("يسعد فريقنا مساعدتك في التخطيط لتجربتك القادمة.", "Our team would be delighted to help you plan your next experience.")}</p><a class="btn" href="booking.html">${A("احجز إقامتك", "Book your stay")} ↗</a></div></section>`;
  }

  function galleryMarkup() {
    const photos = [
      ["photo-1519046904884-53103b34b206", "شاطئ أفق", "Ofoq beach"], ["photo-1571896349842-33c89424de2d", "مسبح على الأفق", "Infinity pool"], ["photo-1441974231531-c6227db76b6e", "ممرات الحديقة", "Garden paths"], ["photo-1602002418082-a4443e081dd1", "فيلا بين الخضرة", "A villa in the greenery"], ["photo-1414235077428-338989a2e8c0", "مائدة موسمية", "Seasonal dining"], ["photo-1600607687939-ce8a6c25118c", "تفاصيل الإقامة", "Stay details"], ["photo-1470252649378-9c29740c9fa8", "ساعة الغروب", "Golden hour"], ["photo-1517248135467-4c7edcad34c4", "مساء في المطعم", "An evening at the restaurant"], ["photo-1613490493576-7fde63acd811", "فيلا خاصة", "Private villa"], ["photo-1470770841072-f978cf4d019e", "حديقة الماء", "Water garden"], ["photo-1509042239860-f550ce710b93", "قهوة على مهل", "Coffee, unhurried"]
    ];
    return `${hero(A(pageNames.gallery[0], pageNames.gallery[1]), A(pageNames.gallery[2], pageNames.gallery[3]), "photo-1470071459604-3b5ec3a7fe05")}<section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">${A("ألبوم أفق", "Ofoq in pictures")}</span><h2>${A("جمال التفاصيل، في كل زاوية", "Beauty in every detail")}</h2><p>${A("اضغط على أي صورة لتكبيرها، واستخدم الأسهم للتنقل بين اللحظات.", "Select a photograph to enlarge it, then use the arrows to explore.")}</p></div><div class="gallery-grid">${photos.map((item) => `<button class="gallery-item" type="button" data-gallery-item aria-label="${A("عرض صورة", "View image")}: ${A(item[1], item[2])}"><img src="${photo(item[0], 700)}" alt="${A(item[1], item[2])}" loading="lazy"></button>`).join("")}</div></div></section>`;
  }

  function reviewMarkup() {
    return `<section class="section" id="review-form"><div class="container"><div class="section-heading"><span class="eyebrow">${A("نموذج التقييم", "The review form")}</span><h2>${A("قيم تجربتك", "Rate your stay")}</h2><p class="muted">${A("أخبار حقيقية عن أفق — لنخرج بجودة أفضل سوياً.", "Real stories about Ofoq — let us improve together.")}</p></div>
      <form class="review-form" data-review-form><div class="form-grid">
        <div class="field full"><label for="review-rating">${A("التقييم (1–5)", "Rating (1–5)")}</label><select id="review-rating" name="rating" required><option value="" disabled selected>${A("اختر التقييم", "Choose rating")}</option><option value="5">5★</option><option value="4">4★</option><option value="3">3★</option><option value="2">2★</option><option value="1">1★</option></select></div>
        <div class="field full"><label for="review-text">${A("تقييمك", "Your review")}</label><textarea id="review-text" name="text" required minlength="20" placeholder="${A("شاركنا ما عجبك أو ما يمكن تحسينه...", "Share what you liked or how we could improve...")}"></textarea></div>
        <div class="field"><label for="review-name">${A("اسمك (اختياري)", "Your name (optional)")}</label><input id="review-name" name="name" type="text"></div>
      </div><button class="btn btn-dark" type="submit">${A("إرسال تقييمك", "Submit review")} →</button></form>
      <div class="reviews-list" data-reviews></div>
    </div></section>`;
  }

  function contactMarkup() {
    return `${hero(A("يسعدنا أن نسمع منك", "We'd love to hear from you"), A("سواء كنت تخطط لإقامة أو ترغب في معرفة المزيد عن أفق، فريقنا هنا لمساعدتك.", "Whether you're planning a stay or simply curious about Ofoq, our team is here to help."), "photo-1519046904884-53103b34b206")}<section class="section"><div class="container contact-layout"><form class="contact-form" data-contact-form><h2>${A("أرسل لنا رسالة", "Send us a note")}</h2><p class="muted">${A("سنعود إليك في أقرب وقت ممكن.", "We'll be in touch as soon as we can.")}</p><div class="form-grid"><div class="field"><label for="contact-name">${A("الاسم", "Name")}</label><input id="contact-name" name="name" autocomplete="name" required minlength="2"></div><div class="field"><label for="contact-email">${A("البريد الإلكتروني", "Email")}</label><input id="contact-email" name="email" type="email" autocomplete="email" required></div><div class="field full"><label for="contact-subject">${A("الموضوع", "Subject")}</label><select id="contact-subject" name="subject"><option>${A("استفسار عن حجز", "Reservation enquiry")}</option><option>${A("تجربة في أفق", "Ofoq experience")}</option><option>${A("أخرى", "Other")}</option></select></div><div class="field full"><label for="contact-message">${A("رسالتك", "Your message")}</label><textarea id="contact-message" name="message" required minlength="10"></textarea></div></div><button class="btn btn-dark" type="submit">${A("إرسال الرسالة", "Send message")} →</button></form><div class="contact-info"><div class="contact-info-card"><strong>${A("الهاتف", "Phone")}</strong><a href="tel:+966126000000">+966 12 600 0000</a><p class="muted">${A("متاحون على مدار الساعة", "Available around the clock")}</p></div><div class="contact-info-card"><strong>${A("البريد الإلكتروني", "Email")}</strong><a href="mailto:hello@ofoqhotel.com">hello@ofoqhotel.com</a><p class="muted">${A("نسعد برسالتك في أي وقت", "Write to us whenever you like")}</p></div><div class="contact-info-card"><strong>${A("موقعنا", "Find us")}</strong><p>${A("الساحل الغربي، المملكة العربية السعودية", "West Coast, Saudi Arabia")}</p></div>    <div class="map-placeholder" role="img" aria-label="${A("خريطة توضيحية لموقع الفندق", "Illustrative hotel location map")}"><div><span class="map-pin" aria-hidden="true">⌖</span><strong>${A("أفق · الساحل الغربي", "Ofoq · West Coast")}</strong><span>${A("موقع توضيحي", "Illustrative location")}</span></div></div></div></div></section>${aboutLocation()}${reviewMarkup()}`;
  }

  function aboutLocation() {
    return `<section class="location-section section" id="our-location"><div class="container"><div class="location-grid">
      <div class="location-content" data-reveal>
        <h2 class="location-title"><span class="location-icon"><img src="assets/icons/location.svg" alt=""></span><span class="location-title-text">${A("أملج، منطقة تبوك، المملكة العربية السعودية.", "Umluj, Tabuk Region, Saudi Arabia.")}</span></h2>
        <p class="location-desc">${A("في قلب أملج، حيث تلتقي زرقة البحر بجمال الطبيعة، تبدأ رحلتك نحو الهدوء والرفاهية.", "Discover serenity and luxury in Umluj, where the beauty of the Red Sea meets the charm of nature.")}</p>
        <a class="btn" href="contact.html#our-location">${A("اكتشف وجهتنا", "Discover Our Destination")}</a>
      </div>
      <div class="location-photo" data-reveal><img src="${photo("assets/images/about-us/umluj-red-sea.jpg", 1400)}" alt="${A("أملج، البحر الأحمر", "Umluj, the Red Sea")}" loading="lazy"></div>
    </div></section>`;
  }

  function legalMarkup(type) {
    const privacy = type === "privacy";
    const title = A(pageNames[type][0], pageNames[type][1]);
    const blocks = privacy ? [
      ["البيانات التي نجمعها", "Information we collect", "قد نجمع معلومات التواصل وتفاصيل الإقامة التي تقدمها عند إرسال نموذج أو إجراء حجز تجريبي. تُحفظ بيانات النماذج في متصفح هذا الجهاز فقط ضمن هذا النموذج التعليمي.", "We may collect contact and stay details you submit through a form or demo reservation. Form data is stored in this browser on this device only as part of this demonstration."],
      ["كيف نستخدم بياناتك", "How we use your information", "تُستخدم البيانات لتوضيح وظيفة الموقع والتفاعلات التجريبية، ولا تُرسل إلى خادم أو جهة خارجية. لا تدخل معلومات حساسة أو بيانات دفع حقيقية.", "Information is used to demonstrate website interactions and is not transmitted to a server or third party. Do not enter sensitive information or real payment details."],
      ["التخزين والتحكم", "Storage and control", "تُحفظ التفضيلات والطلبات التجريبية محلياً باستخدام مساحة التخزين في المتصفح. يمكنك حذفها من إعدادات المتصفح لمسح بيانات الموقع.", "Preferences and demo requests use local browser storage. Clear the site's data in your browser settings to remove them."]
    ] : [
      ["الحجوزات", "Reservations", "نموذج الحجز في هذا الموقع تجريبي فقط. لا يمثل طلبه حجزاً مؤكداً ولا يتصل بنظام حجز أو دفع حقيقي.", "The reservation form on this website is for demonstration only. Submitting it does not create a confirmed reservation or connect to a live booking or payment system."],
      ["الأسعار والتوافر", "Rates and availability", "جميع الأسعار المعروضة توضيحية وقابلة للتغيير، ولا تمثل عرضاً تجارياً ملزماً. يرجى التواصل مع الفندق للحصول على معلومات مؤكدة.", "All displayed rates are illustrative and subject to change; they are not a binding offer. Contact the hotel for confirmed information."],
      ["استخدام الموقع", "Use of this website", "يُقدم المحتوى لأغراض تعريفية وتعليمية. باستخدامك الموقع، توافق على عدم إساءة استخدام النماذج أو محاولة تعطيل الموقع.", "Content is provided for informational and educational purposes. By using this website, you agree not to misuse its forms or interfere with its operation."]
    ];
    return `${hero(title, A(pageNames[type][2], pageNames[type][3]), "photo-1602002418082-a4443e081dd1")}<section class="section"><article class="container rich-copy"><p class="muted">${A("آخر تحديث: نوفمبر ٢٠٢٦", "Last updated: November 2026")}</p>${blocks.map((block, index) => `<h2>${A(block[0], block[1])}</h2><p>${A(block[2], block[3])}</p>${index === 0 && !privacy ? `<ul><li>${A("تُحسب الأسعار المعروضة لكل ليلة قبل الضرائب، ما لم يُذكر خلاف ذلك.", "Displayed rates are per night before taxes unless otherwise stated.")}</li><li>${A("يخضع تسجيل الوصول والمغادرة للتوافر وتأكيد الحجز.", "Check-in and check-out are subject to availability and reservation confirmation.")}</li></ul>` : ""}`).join("")}<h2>${A("تواصل معنا", "Get in touch")}</h2><p>${A("إذا كان لديك سؤال حول هذه المعلومات، يسعد فريقنا بمساعدتك عبر صفحة التواصل.", "If you have questions about this information, our team is happy to help through the contact page.")} <a class="card-link" href="contact.html">${A("تواصل معنا", "Contact us")} →</a></p></article></section>`;
  }

  function updateRoomPriceCalc() {
    const room = window.Ofoq.room(new URLSearchParams(location.search).get("room"));
    const host = document.querySelector(".room-price-calc");
    if (!host || !room) return;
    const nights = Number(document.querySelector("[data-room-nights]")?.value || 1);
    const out = document.querySelector("[data-room-total]");
    if (out) out.textContent = `${room.price * nights} ${A("ر.س", "SAR")}`;
  }

  function render() {
    header();
    footer();
    if (pageId === "home") page.innerHTML = homeMarkup();
    else if (pageId === "rooms") {
      page.innerHTML = `${hero(A("إقامتك، على مهل", "Stay, at your own pace"), A("غرف وأجنحة وفلل خاصة، لكل منها مساحة لراحة تشبهك.", "Rooms, suites, and private villas, each with space for the kind of rest you need."), "photo-1571896349842-33c89424de2d")}<section class="section"><div class="container"><div class="section-heading"><span class="eyebrow">${A("مساحات للراحة", "Room to unwind")}</span><h2>${A("اختر إقامتك في أفق", "Find your Ofoq stay")}</h2><p>${A("ابحث عن المساحة التي تناسب رحلتك، من غرفة بإطلالة بحرية إلى فيلا خاصة.", "Find a space that suits your trip, from a sea-view room to a private villa.")}</p></div>${roomsMarkup()}</div></section>${quickBarMarkup()}<section class="home-cta"><div class="container"><h2>${A("هل تحتاج إلى مساعدة في الاختيار؟", "Need help choosing?")}</h2><p>${A("فريقنا جاهز لمساعدتك في العثور على الإقامة المناسبة.", "Our team can help you find just the right stay.")}</p><a class="btn" href="contact.html">${A("تحدث إلى فريقنا", "Talk to our team")}</a></div></section>`;
      populateQuickBooking(document.querySelector("[data-quick-booking]"));
    }
    else if (pageId === "room-details") {
      page.innerHTML = detailMarkup();
      const nightsField = document.querySelector("[data-room-nights]");
      if (nightsField) {
        nightsField.addEventListener("change", updateRoomPriceCalc);
        updateRoomPriceCalc();
      }
    }
    else if (pageId === "booking") page.innerHTML = bookingMarkup();
    else if (serviceData[pageId]) page.innerHTML = serviceMarkup(pageId);
    else if (pageId === "gallery") page.innerHTML = galleryMarkup();
    else if (pageId === "contact") page.innerHTML = contactMarkup();
    else if (pageId === "privacy" || pageId === "terms") page.innerHTML = legalMarkup(pageId);
    else page.innerHTML = `<section class="not-found"><div><strong>404</strong><h1>${A("هذه الصفحة لم تعد هنا", "This page isn't here")}</h1><p>${A("ربما أخذتك الأمواج إلى مسار آخر. دعنا نعيدك إلى أفق.", "Perhaps the tide carried you elsewhere. Let's find your way back to Ofoq.")}</p><a class="btn" href="index.html">${A("العودة إلى الرئيسية", "Back to home")}</a></div></section>`;
    document.title = `${pageId === "home" ? A("أفق | OFOQ HOTEL", "Ofoq | OFOQ HOTEL") : `${pageId === "room-details" ? A("تفاصيل الغرفة", "Room details") : A((pageNames[pageId] || [])[0] || "أفق", (pageNames[pageId] || [])[1] || "Ofoq")} | OFOQ HOTEL`}`;
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      const pageDescription = pageId === "home"
        ? A("أفق، ملاذ ساحلي فاخر حيث يلتقي البحر بسحر الطبيعة.", "Ofoq, a luxury coastal sanctuary where the sea meets the beauty of nature.")
        : pageNames[pageId] ? A(pageNames[pageId][2], pageNames[pageId][3]) : A("ملاذ أفق الساحلي الفاخر.", "Discover the Ofoq coastal sanctuary.");
      description.content = pageDescription;
    }
    const backToTop = document.querySelector(".back-to-top");
    if (backToTop) backToTop.setAttribute("aria-label", A("العودة للأعلى", "Back to top"));
    if (pageId === "rooms") window.Ofoq.renderRooms();
    if (pageId === "home" && location.hash === "#about") {
      const about = document.getElementById("about");
      if (about) about.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    }
    window.dispatchEvent(new CustomEvent("ofoq:rendered"));
  }

  window.Ofoq.toast = (message) => {
    const toast = document.querySelector("#toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(window.Ofoq.toastTimer);
    window.Ofoq.toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3200);
  };
  document.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-quick-booking]");
    if (!form) return;
    event.preventDefault();
    if (!form.reportValidity()) return;
    const params = new URLSearchParams(new FormData(form));
    location.href = `booking.html?${params.toString()}`;
  });
  document.addEventListener("click", (event) => {
    const question = event.target.closest(".faq-question");
    if (!question) return;
    const answer = question.nextElementSibling;
    const opening = question.getAttribute("aria-expanded") !== "true";
    question.setAttribute("aria-expanded", String(opening));
    question.querySelector("span:last-child").textContent = opening ? "−" : "＋";
    answer.hidden = !opening;
  });
  window.addEventListener("ofoq:languagechange", render);
  render();
})();
