/* ===== Dữ liệu dịch vụ ViVi's Glow Studio (theo menu tại tiệm) ===== */
const RESULTS = [
  { img: "images/pf-1.webp", cap: "Brows & Lip Blush", cats: ["brows", "lips"] },
  { img: "images/pf-2.webp", cap: "Nano Hairstroke Brows", cats: ["brows"] },
  { img: "images/pf-3.webp", cap: "Combo Brows", cats: ["brows"] },
  { img: "images/pf-4.webp", cap: "Soft Brows for Mature Skin", cats: ["brows"] },
  { img: "images/pf-5.webp", cap: "Nano Brows Transformation", cats: ["brows"] },
  { img: "images/pf-6.webp", cap: "Ombré Brows & Lips", cats: ["brows", "lips"] },
  { img: "images/pf-7.webp", cap: "From Brow Mapping to Result", cats: ["brows"] },
  { img: "images/pf-8.webp", cap: "Natural Nano Brows", cats: ["brows"] },
  { img: "images/pf-9.webp", cap: "Lash Line Enhancement", cats: ["eyeliner"] },
  { img: "images/pf-10.webp", cap: "Upper Eyeliner", cats: ["eyeliner"] },
  { img: "images/pf-11.webp", cap: "Classic Winged Eyeliner", cats: ["eyeliner"] },
  { img: "images/pf-12.webp", cap: "Healed Lip Blush", cats: ["lips"] },
  { img: "images/pf-15.webp", cap: "Full Lip Blush", cats: ["lips"] },
  { img: "images/pf-17.webp", cap: "Coral Lip Blush", cats: ["lips"] },
  { img: "images/pf-18.webp", cap: "Fresh Lip Blush", cats: ["lips"] },
  { img: "images/pf-19.webp", cap: "Lip Color Correction", cats: ["lips"] },
];
const LABELS = { brows: "Brows", lips: "Lips", lash: "Lash", facial: "Facial", waxing: "Waxing", eyeliner: "Eyeliner" };

const SERVICES = [
  // BROWS
  { cat: "brows", name: "Nano Hairstroke", price: "$499", time: "Touch-up 6–8 wks · $150", img: "images/svc-nano.jpg?v=2", badge: "Signature",
    desc: "Natural, hair-like strokes for soft, realistic brows — ideal for filling sparse areas." },
  { cat: "brows", name: "Ombré (Shading)", price: "$399", time: "Touch-up 6–8 wks · $100", img: "images/svc-ombre.jpg?v=2",
    desc: "Soft powder effect for a fuller, more defined look on every skin type." },
  { cat: "brows", name: "Combo (Nano + Ombré)", price: "$499", time: "Touch-up 6–8 wks · $150", img: "images/svc-combo.jpg?v=2",
    desc: "The perfect blend of natural strokes and soft shading." },
  { cat: "brows", name: "Brow Enhancements", price: "$30 – $120", img: "images/svc-brows.jpg?v=2",
    desc: "Lift, lamination, tint and wax to keep your brows groomed and full.",
    inc: ["Lift & Lamination — $90", "Tint — $30–$35", "Lift + Tint — $90", "Shape, Lift, Tint, Wax — $100–$120"] },
  // LIPS
  { cat: "lips", name: "Lip Blush", price: "$449+", time: "Touch-up 6–8 wks · $150", img: "images/lips-blush.webp", badge: "Popular",
    desc: "Natural-looking, rosy lips with soft color custom-blended to your skin tone." },
  { cat: "lips", name: "Dark Lip Neutralization", price: "$499 – $599+", img: "images/svc-lips.jpg?v=2",
    desc: "Corrects dark or cool-toned lips for a brighter, even, healthy-looking color." },
  // LASH
  { cat: "lash", name: "Classic Full Set", price: "$135", img: "images/lash-classic.webp?v=2",
    desc: "1 extension applied to 1 natural lash. Natural & elegant — perfect for an everyday look.",
    inc: ["Refill 2–3 weeks — $65–$75", "After 4 weeks — $135 (removal + full set)"] },
  { cat: "lash", name: "Hybrid Full Set", price: "$145", img: "images/lash-hybrid.webp?v=3", badge: "Popular",
    desc: "A mix of classic and volume lashes. Adds fullness while keeping it soft and natural.",
    inc: ["Refill 2–3 weeks — $75–$85", "After 4 weeks — $145 (removal + full set)"] },
  { cat: "lash", name: "Volume Full Set", price: "$155", img: "images/lash-volume.webp?v=2",
    desc: "Multiple lightweight extensions per natural lash. Full & glamorous for a bold look.",
    inc: ["Refill 2–3 weeks — $85–$95", "After 4 weeks — $155 (removal + full set)"] },
  { cat: "lash", name: "Lash Lift & Tint", price: "$80 – $120", img: "images/svc-lash.jpg?v=2",
    desc: "Lift and curl your natural lashes, with an optional tint for extra definition.",
    inc: ["Lash Lift — $80–$90", "Lash Tint — $20–$30", "Lash Lift & Tint — $100–$120", "Removal (Rest) — $20–$30"] },
  // FACIAL
  { cat: "facial", name: "Basic Glow Facial", price: "$89", time: "45 min", img: "images/svc-facial.jpg?v=2",
    desc: "A classic, refreshing treatment to deeply cleanse, hydrate and relax your skin. Perfect for a quick skin pick-me-up.",
    inc: ["3-Step Deep Cleansing (Oil, Powder & Enzyme Wash)", "Relaxing Facial Massage", "Customized Clay Mask (Green Tea, Turmeric or Dead Sea Minerals)", "Riman Moisturizer + Sunscreen + Multi Stick Lip Balm"] },
  { cat: "facial", name: "Advanced LED Facial", price: "$125", time: "60 min", img: "images/svc-facial-riman.jpg",
    desc: "7-Color LED Light Therapy targets deeper concerns — boosting collagen, reducing fine lines or clearing acne-causing bacteria.",
    inc: ["3-Step Deep Cleansing (Oil, Powder & Enzyme Wash)", "Relaxing & Lifting Face, Neck & Shoulder Massage", "Collagen Mask", "Custom 7-Color LED Light Therapy (15 min)", "Riman Moisturizer + Sunscreen + Multi Stick Lip Balm"] },
  { cat: "facial", name: "Premium Riman Signature Facial", price: "$149", time: "75 min", img: "images/riman-facial.webp", badge: "Premium",
    desc: "Our ultimate VIP treatment with Korean RIMAN (Incellderm) skincare, advanced LED and red-light therapy for a youthful “Glass Skin” glow.",
    inc: ["3-Step Deep Cleansing (Oil, Powder & Enzyme Wash)", "NEW · 10-Point Facial Acupressure & Lifting Massage", "Advanced Riman Boo-See-Boo Glow Ritual", "Custom 7-Color LED Light Therapy (10 min)", "Red-Light Facial Treatment (10 min)", "Riman Moisturizer + Sunscreen + Multi Stick Lip Balm"] },
  // WAXING
  { cat: "waxing", name: "Face Waxing", price: "$15 – $50", img: "images/svc-waxing.jpg?v=2",
    desc: "Gentle, precise waxing for a clean, smooth face.",
    inc: ["Eyebrow Wax Only — $20", "Eyebrow Shape + Wax — $30", "Upper Lip — $15", "Chin — $15", "Full Face — $50"] },
  { cat: "waxing", name: "Body Waxing", price: "$25 – $70", img: "images/svc-waxing.jpg?v=2",
    desc: "Smooth, soft skin for weeks — arms, legs, back, chest and more.",
    inc: ["Underarm — $25", "Half Arms — $35 · Full Arms — $50", "Half Legs — $45 · Full Legs — $70", "Stomach — $35", "Back — $60 · Chest — $50"] },
  { cat: "waxing", name: "Bikini & Brazilian", price: "$45 – $120", img: "images/svc-waxing.jpg?v=2",
    desc: "Hygienic, comfortable bikini waxing in a private room.",
    inc: ["Bikini Line — $45", "Full Bikini — $55", "Brazilian — $120"] },
  { cat: "waxing", name: "Waxing Combos", price: "$70 – $110", img: "images/svc-waxing.jpg?v=2", badge: "Save",
    desc: "Bundle your favorite areas and save.",
    inc: ["Bikini + Underarms — $75", "Full Face + Underarms — $70", "Full Legs + Bikini — $110"] },
  // EYELINER
  { cat: "eyeliner", name: "Lash Line Enhancement", price: "$299", img: "images/eyeliner-1.webp?v=2",
    desc: "Natural, subtle definition between the lash roots." },
  { cat: "eyeliner", name: "Upper Eyeliner", price: "$375", img: "images/eyeliner-2.webp?v=2",
    desc: "Classic definition along the upper eyelid." },
  { cat: "eyeliner", name: "Lower Eyeliner", price: "$175", img: "images/eyeliner-3.webp?v=2",
    desc: "Soft definition along the lower lash line." },
  { cat: "eyeliner", name: "Upper + Lower Eyeliner", price: "$499", time: "Touch-up 6–8 wks · $125–$150", img: "images/eyeliner-4.webp?v=2", badge: "Complete",
    desc: "Complete upper and lower eye definition." },
];

const PRICE_MENU = {
  brows: [
    ["Permanent Brows", "Touch-up 6–8 weeks", [["Nano Hairstroke", "$499", "Touch-up $150"], ["Ombré (Shading)", "$399", "Touch-up $100"], ["Combo (Nano + Ombré)", "$499", "Touch-up $150"]]],
    ["Brow Enhancements", "", [["Lift & Lamination", "$90"], ["Tint", "$30 – $35"], ["Lift + Tint", "$90"], ["Shape, Lift, Tint, Wax", "$100 – $120"]]],
  ],
  lips: [
    ["Lip Blush", "", [["Lip Blush", "$449+", "Natural looking, rosy lips"], ["6–8 Week Touch-Up", "$150", "After initial session"], ["Dark Lip Neutralization", "$499 – $599+", "Correct dark or cool-toned lips"]]],
  ],
  lash: [
    ["Full Set", "", [["Classic Full Set", "$135"], ["Hybrid Full Set", "$145"], ["Volume Full Set", "$155"], ["Removal (Rest)", "$20 – $30"], ["Lash Lift", "$80 – $90"], ["Lash Tint", "$20 – $30"], ["Lash Lift & Tint", "$100 – $120"]]],
    ["Refill Options", "Refills must be maintained every 2–3 weeks", [["Classic Refill · 2–3 weeks", "$65 – $75"], ["Hybrid Refill · 2–3 weeks", "$75 – $85"], ["Volume Refill · 2–3 weeks", "$85 – $95"], ["After 4 weeks · Classic", "$135", "Removal + full set"], ["After 4 weeks · Hybrid", "$145", "Removal + full set"], ["After 4 weeks · Volume", "$155", "Removal + full set"]]],
    ["6-Month Lash Membership", "1 full set + 8 refills within 6 months", [["Classic", "$625.50", "Regular $695 · save $69.50"], ["Hybrid", "$706.50", "Regular $785 · save $78.50"], ["Volume", "$787.50", "Regular $875 · save $87.50"]]],
  ],
  facial: [
    ["Facial & Skin Care", "", [["Basic Glow Facial", "$89", "45 min"], ["Advanced LED Facial", "$125", "60 min"], ["Premium Riman Signature Facial", "$149", "75 min"]]],
  ],
  waxing: [
    ["Face", "", [["Eyebrow Wax Only", "$20"], ["Eyebrow Shape + Wax", "$30"], ["Upper Lip", "$15"], ["Chin", "$15"], ["Full Face", "$50"]]],
    ["Underarms", "", [["Underarm Wax", "$25"]]],
    ["Body", "", [["Half Arms", "$35"], ["Full Arms", "$50"], ["Half Legs", "$45"], ["Full Legs", "$70"], ["Stomach", "$35"], ["Back", "$60"], ["Chest", "$50"]]],
    ["Bikini", "", [["Bikini Line", "$45"], ["Full Bikini", "$55"], ["Brazilian", "$120"]]],
    ["Combos", "", [["Bikini + Underarms", "$75"], ["Full Face + Underarms", "$70"], ["Full Legs + Bikini", "$110"]]],
  ],
  eyeliner: [
    ["Permanent Eyeliner", "", [["Lash Line Enhancement", "$299"], ["Upper Eyeliner", "$375"], ["Lower Eyeliner", "$175"], ["Upper + Lower Eyeliner", "$499"], ["6–8 Week Touch-Up", "$125 – $150"]]],
  ],
};

/* ===== Hiển thị ===== */
const esc = s => s.replace(/&/g, "&amp;");
const card = (t, i) => `
  <article class="tcard" style="animation-delay:${i * 50}ms">
    <div class="tcard__media">
      <img src="${t.img}" alt="${esc(t.name)}" loading="lazy">
      <span class="tcard__tag">${LABELS[t.cat]}</span>
      ${t.badge ? `<span class="tcard__badge">${t.badge}</span>` : ""}
    </div>
    <div class="tcard__body">
      <h3>${esc(t.name)}</h3>
      <div class="tcard__meta">${t.time ? `<span>${t.time}</span><i></i>` : ""}<b>${t.price}</b></div>
      <p>${esc(t.desc)}</p>
      ${t.inc ? `<details class="tcard__more"><summary>Includes</summary><ul>${t.inc.map(x => `<li>${esc(x)}</li>`).join("")}</ul></details>` : ""}
      <div class="tcard__actions"><a href="#" class="btn btn--outline" data-book="${esc(t.name)}">Book</a></div>
    </div>
  </article>`;

const grid = document.getElementById("svcGrid"), countEl = document.getElementById("svcCount");
const params = new URLSearchParams(location.search);
function setFilter(f) {
  document.querySelectorAll("[data-filter]").forEach(b => { const on = b.dataset.filter === f; b.classList.toggle("is-active", on); b.setAttribute("aria-selected", on); });
  const list = f === "all" ? SERVICES : SERVICES.filter(t => t.cat === f);
  grid.innerHTML = list.map(card).join("");
  countEl.textContent = `${list.length} services`;
  const mem = document.getElementById("lashMember"); if (mem) mem.hidden = f !== "lash";
  const res = RESULTS.filter(r => r.cats.includes(f)), box = document.getElementById("svcResults");
  if (box) {
    box.hidden = !res.length;
    document.getElementById("resultsTitle").textContent = `${LABELS[f] || ""} — Before & After`;
    document.getElementById("resultsGrid").innerHTML = res.map(r => `<figure class="results__item"><img src="${r.img}" alt="${esc(r.cap)} – before and after" loading="lazy"><figcaption>${esc(r.cap)}</figcaption></figure>`).join("");
  }
  const act = document.querySelector(`[data-filter="${f}"]`), bar = act.parentElement;
  bar.scrollTo({ left: act.offsetLeft - (bar.clientWidth - act.offsetWidth) / 2, behavior: "smooth" });
}
document.querySelectorAll("[data-filter]").forEach(b => b.addEventListener("click", () => {
  setFilter(b.dataset.filter);
  history.replaceState(null, "", b.dataset.filter === "all" ? "services.html" : "?type=" + b.dataset.filter);
}));

const priceList = document.getElementById("priceList");
function showPrices(k) {
  document.querySelectorAll("[data-price]").forEach(b => b.classList.toggle("is-active", b.dataset.price === k));
  const pa = document.querySelector(`[data-price="${k}"]`), pb = pa.parentElement;
  pb.scrollTo({ left: pa.offsetLeft - (pb.clientWidth - pa.offsetWidth) / 2, behavior: "smooth" });
  priceList.innerHTML = PRICE_MENU[k].map(([title, note, items]) => `
    <div class="pgroup">
      <h3>${esc(title)}</h3>${note ? `<p class="pgroup__note">${note}</p>` : ""}
      <ul>${items.map(([n, p, d]) => `<li><span class="pitem__name">${esc(n)}${d ? `<small>${d}</small>` : ""}</span><span class="pitem__dots"></span><span class="pitem__price">${p}</span></li>`).join("")}</ul>
    </div>`).join("");
}
document.getElementById("priceTabs").addEventListener("click", e => { const b = e.target.closest("[data-price]"); if (b) showPrices(b.dataset.price); });

const start = LABELS[params.get("type")] ? params.get("type") : "all";
setFilter(start);
showPrices(start === "all" ? "brows" : start);
if (start !== "all") window.addEventListener("load", () => setTimeout(() => window.scrollTo({ top: document.getElementById("menu").getBoundingClientRect().top + scrollY - 70, behavior: "smooth" }), 150));

// Phóng to ảnh trước/sau
document.addEventListener("click", e => {
  const fig = e.target.closest(".results__item"), lb = document.getElementById("lightbox");
  if (!fig || !lb) return;
  const img = fig.querySelector("img"), li = lb.querySelector("img");
  li.src = img.src; li.alt = img.alt; lb.querySelector(".lightbox__cap").textContent = fig.querySelector("figcaption").textContent;
  lb.classList.add("open"); lb.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden";
});
