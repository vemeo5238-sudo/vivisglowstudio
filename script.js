// Header đổi nền khi cuộn
const header = document.querySelector('.header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll); onScroll();

// Menu điện thoại
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  nav.classList.toggle('open');
  header.classList.toggle('menu-open', nav.classList.contains('open'));
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open'); nav.classList.remove('open'); header.classList.remove('menu-open'); document.body.style.overflow = '';
}));

// Hiệu ứng hiện dần
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Lọc hình ảnh
document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  const f = tab.dataset.filter;
  document.querySelectorAll('.gallery figure').forEach(fig =>
    fig.classList.toggle('hide', f !== 'all' && fig.dataset.cat !== f));
}));

// Trước / Sau (chỉ chạy nếu trang có khung kéo)
const range = document.getElementById('baRange');
if (range) {
  const before = document.getElementById('baBefore');
  const handle = document.getElementById('baHandle');
  const box = document.getElementById('ba');
  const setBA = v => {
    before.style.width = v + '%';
    handle.style.left = v + '%';
    before.querySelector('img').style.width = box.offsetWidth + 'px';
  };
  range.addEventListener('input', e => setBA(e.target.value));
  window.addEventListener('resize', () => setBA(range.value));
  setBA(50);
}

// Slider đánh giá (chỉ có ở trang chủ)
if (document.getElementById('track')) {
const track = document.getElementById('track');
const slides = track.children.length;
const dots = document.getElementById('dots');
let idx = 0, timer;
for (let i = 0; i < slides; i++) {
  const d = document.createElement('span');
  d.addEventListener('click', () => go(i));
  dots.appendChild(d);
}
function go(i) {
  idx = (i + slides) % slides;
  track.style.transform = `translateX(-${idx * 100}%)`;
  [...dots.children].forEach((d, j) => d.classList.toggle('active', j === idx));
  clearInterval(timer); timer = setInterval(() => go(idx + 1), 6000);
}
document.getElementById('prev').onclick = () => go(idx - 1);
document.getElementById('next').onclick = () => go(idx + 1);
let sx = 0;
track.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
track.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - sx;
  if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
});
go(0);
}

// Xem ảnh Portfolio phóng to
const lb = document.getElementById('lightbox');
if (lb) {
  const lbImg = lb.querySelector('img'), lbCap = lb.querySelector('.lightbox__cap');
  document.querySelectorAll('.gallery--ba figure, .studio__grid figure, .studio__wide figure, .feature__img, .menu-poster').forEach(f => f.addEventListener('click', () => {
    const img = f.querySelector('img');
    lbImg.src = img.src; lbImg.alt = img.alt;
    const cap = f.querySelector('figcaption'); lbCap.textContent = cap ? cap.textContent.replace(' · tap to enlarge','') : '';
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }));
  const close = () => { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
  lb.addEventListener('click', e => { if (e.target !== lbImg) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

// Ảnh bìa trình chiếu
const cs = document.getElementById('coverSlider');
if (cs) {
  const slides = [...cs.querySelectorAll('.cover__slide')];
  const dotsBox = cs.querySelector('.cover__dots');
  let ci = 0, ct;
  slides.forEach((_, i) => {
    const d = document.createElement('span');
    d.addEventListener('click', () => show(i));
    dotsBox.appendChild(d);
  });
  function show(i) {
    ci = (i + slides.length) % slides.length;
    slides.forEach((s, j) => s.classList.toggle('active', j === ci));
    [...dotsBox.children].forEach((d, j) => d.classList.toggle('active', j === ci));
    clearInterval(ct); ct = setInterval(() => show(ci + 1), 3000);
  }
  cs.querySelector('.cover__arrow--prev').onclick = () => show(ci - 1);
  cs.querySelector('.cover__arrow--next').onclick = () => show(ci + 1);
  let cx = 0;
  cs.addEventListener('touchstart', e => cx = e.touches[0].clientX, { passive: true });
  cs.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - cx;
    if (Math.abs(dx) > 40) show(ci + (dx < 0 ? 1 : -1));
  });
  show(0);
}

// ===== Popup đặt lịch: khách gọi trực tiếp hoặc nhắn tin tới 760-484-6977 =====
(() => {
  const VI = document.documentElement.lang === 'vi';
  const PHONE = '+17604846977', SHOW = '760-484-6977';
  const T = VI ? {
    title: 'Đặt lịch hẹn', lead: 'Gọi hoặc nhắn tin cho ViVi để đặt lịch — ViVi sẽ xác nhận giờ hẹn với bạn.',
    service: 'Dịch vụ', call: 'Gọi ngay', text: 'Nhắn tin', close: 'Đóng',
    msg: s => s ? `Xin chào ViVi, tôi muốn đặt lịch ${s}.` : 'Xin chào ViVi, tôi muốn đặt lịch hẹn.'
  } : {
    title: 'Book an appointment', lead: 'Call or text ViVi to book — she will confirm your appointment time with you.',
    service: 'Service', call: 'Call Now', text: 'Text Us', close: 'Close',
    msg: s => s ? `Hi ViVi, I'd like to book ${s}.` : "Hi ViVi, I'd like to book an appointment."
  };
  const ICON_CALL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>';
  const ICON_TEXT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2zm3 6v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2z"/></svg>';
  const wrap = document.createElement('div');
  wrap.innerHTML = `
  <div class="bmodal" id="bookModal" aria-hidden="true">
    <div class="bmodal__backdrop" data-bclose></div>
    <div class="bmodal__box bmodal__box--contact" role="dialog" aria-modal="true" aria-labelledby="bookTitle">
      <button class="bmodal__close" aria-label="${T.close}" data-bclose>×</button>
      <p class="eyebrow">ViVi's Glow Studio</p>
      <h2 id="bookTitle">${T.title}</h2>
      <p class="bcontact__svc" id="bookSvc" hidden></p>
      <p class="bcontact__lead">${T.lead}</p>
      <div class="bcontact__btns">
        <a href="tel:${PHONE}" class="btn btn--gold bcontact__btn">${ICON_CALL}<span>${T.call}</span></a>
        <a href="sms:${PHONE}" class="btn btn--sage bcontact__btn" id="bookText">${ICON_TEXT}<span>${T.text}</span></a>
      </div>
      <a href="tel:${PHONE}" class="bcontact__num">${SHOW}</a>
    </div>
  </div>`;
  document.body.appendChild(wrap.firstElementChild);
  const modal = document.getElementById('bookModal'), svcEl = document.getElementById('bookSvc'), textBtn = document.getElementById('bookText');
  const ios = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
  const open = service => {
    svcEl.hidden = !service; svcEl.textContent = service ? `${T.service}: ${service}` : '';
    textBtn.href = `sms:${PHONE}${ios ? '&' : '?'}body=${encodeURIComponent(T.msg(service))}`;
    modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
  };
  const close = () => { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-book]');
    if (b) { e.preventDefault(); open(b.dataset.book); return; }
    if (e.target.closest('[data-bclose]')) close();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('is-open')) close(); });
})();
