(() => {
  const rooms = [
    { id: "sea-view", type: "room", ar: "غرفة بإطلالة بحرية", en: "Sea View Room", price: 950, size: 48, guests: 2, descAr: "غرفة بإطلالة بحرية تمنحك راحة أعمق بنظرة لا تُنسى.", descEn: "A sea view room giving you deeper relaxation with an unforgettable view.", image: "photo-1590490360182-c33d57733427", featuresAr: ["إطلالة مباشرة على البحر", "شرفة خاصة", "سرير كينغ"], featuresEn: ["Panoramic sea view", "Private balcony", "King bed"] },
    { id: "royal-suite", type: "suite", ar: "الجناح الملكي", en: "Royal Suite", price: 1850, size: 92, guests: 3, descAr: "جناح ملكي بأسلوب عصري يقدم انطباعاً بالفخامة والارتفاع.", descEn: "A royal suite with a modern style that gives a sensation of luxury and grandeur.", image: "photo-1611892440504-42a792e24d32", featuresAr: ["صالة معيشة منفصلة", "حمام رخامي", "خدمة ضيافة خاصة"], featuresEn: ["Separate living room", "Marble bathroom", "Personal host"] },
    { id: "family-suite", type: "suite", ar: "الجناح العائلي", en: "Family Suite", price: 1450, size: 78, guests: 5, descAr: "جناح عائلي مريح مصمم لرحلتك مع عائلتك أو الأصدقاء القريبين.", descEn: "A comfortable family suite designed for your trip with family or close friends.", image: "photo-1595576508898-0ad5c879a061", featuresAr: ["غرفتا نوم", "مساحة جلوس واسعة", "ترحيب للصغار"], featuresEn: ["Two bedrooms", "Spacious lounge", "Little guest welcome"] },
    { id: "garden-villa", type: "villa", ar: "فيلا الحديقة", en: "Garden Villa", price: 2450, size: 130, guests: 4, descAr: "فيلا للحياة الخاصة مع مسبح خاص وحديقة استوائية معطاءة.", descEn: "A villa for private living with a private pool and a tropical garden." , image: "photo-1613490493576-7fde63acd811", featuresAr: ["مسبح خاص", "حديقة استوائية", "خصوصية تامة"], featuresEn: ["Private pool", "Tropical garden", "Secluded setting"] },
    { id: "ocean-villa", type: "villa", ar: "فيلا الأفق", en: "Horizon Villa", price: 3200, size: 165, guests: 4, descAr: "فيلا الأفق مع مسبح لا متناهٍ، وواجهة بحرية خالية.", descEn: "The Horizon Villa with an infinity pool, and a sea-facing horizon.", image: "photo-1600607687939-ce8a6c25118c", featuresAr: ["مسبح لا متناهٍ", "واجهة بحرية", "خدمة كبير خدم"], featuresEn: ["Infinity pool", "Oceanfront setting", "Dedicated butler"] },
    { id: "deluxe", type: "room", ar: "غرفة ديلوكس", en: "Deluxe Room", price: 720, size: 40, guests: 2, descAr: "غرفة ديلوكس بإطلالة على حديقة خضراء وشرفة مفروشة.", descEn: "A deluxe room with a garden view and a furnished balcony.", image: "photo-1618773928121-c32242e63f39", featuresAr: ["إطلالة على الحديقة", "شرفة مفروشة", "سرير كينغ"], featuresEn: ["Garden view", "Furnished balcony", "King bed"] }
  ];
  window.Ofoq = window.Ofoq || {};
  window.Ofoq.rooms = rooms;
  window.Ofoq.room = (id) => rooms.find((item) => item.id === id) || rooms[0];
  window.Ofoq.renderRooms = () => {
    const host = document.querySelector("[data-room-list]");
    if (!host) return;
    const lang = window.Ofoq.language;
    const filterType = document.querySelector("[data-room-type]")?.value || "all";
    const sort = document.querySelector("[data-room-sort]")?.value || "recommended";
    const query = (document.querySelector("[data-room-search]")?.value || "").trim().toLowerCase();
    let visible = rooms.filter((room) => (filterType === "all" || room.type === filterType) &&
      (`${room.ar} ${room.en}`.toLowerCase().includes(query)));
    if (sort === "low") visible = visible.slice().sort((a, b) => a.price - b.price);
    if (sort === "high") visible = visible.slice().sort((a, b) => b.price - a.price);
    host.innerHTML = visible.map((room) => {
      const title = lang === "ar" ? room.ar : room.en;
      const features = lang === "ar" ? room.featuresAr : room.featuresEn;
      return `<article class="editorial-card room-card" data-reveal>
        <img src="https://images.unsplash.com/${room.image}?fit=crop&w=900&q=82&fm=webp" alt="${title}" loading="lazy">
        <div class="card-body"><span class="room-type">${room.type === "villa" ? (lang === "ar" ? "فيلا خاصة" : "PRIVATE VILLA") : room.type === "suite" ? (lang === "ar" ? "جناح فاخر" : "LUXURY SUITE") : (lang === "ar" ? "غرفة فاخرة" : "LUXURY ROOM")}</span>
          <h3>${title}</h3><div class="room-amenities"><span>${room.size} ${lang === "ar" ? "م²" : "sqm"}</span><span>${room.guests} ${lang === "ar" ? "ضيوف" : "guests"}</span><span>${features[0]}</span></div>
          <div class="card-meta"><span class="price">${room.price.toLocaleString(lang === "ar" ? "ar" : "en")} <small>${lang === "ar" ? "ر.س / الليلة" : "SAR / night"}</small></span><a class="card-link" href="room-details.html?room=${room.id}">${lang === "ar" ? "اكتشف الغرفة ←" : "Explore room →"}</a></div>
        </div></article>`;
    }).join("") || `<p class="muted">${lang === "ar" ? "لا توجد غرف تطابق بحثك." : "No rooms match your search."}</p>`;
    if (window.Ofoq.observeReveals) window.Ofoq.observeReveals();
  };
  document.addEventListener("input", (event) => {
    if (event.target.matches("[data-room-search]")) window.Ofoq.renderRooms();
  });
  document.addEventListener("change", (event) => {
    if (event.target.matches("[data-room-type], [data-room-sort]")) window.Ofoq.renderRooms();
  });
  window.addEventListener("ofoq:languagechange", () => window.Ofoq.renderRooms());
})();
