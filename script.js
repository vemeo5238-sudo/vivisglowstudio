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

// ===== Popup đặt lịch (kiểu web V Angel) – gửi yêu cầu qua tin nhắn tới 760-484-6977 =====
(() => {
  const VI = document.documentElement.lang === 'vi';
  const T = VI ? {
    title: 'Đặt lịch hẹn', name: 'Họ và tên', phone: 'Số điện thoại', service: 'Dịch vụ', choose: '— Chọn dịch vụ —',
    advice: 'Chưa chắc — tôi muốn được tư vấn', date: 'Ngày', time: 'Giờ', note: 'Ghi chú', notePh: 'Kiểu mày, màu môi, kiểu mi bạn thích…',
    send: 'Gửi yêu cầu đặt lịch', hint: 'Bấm gửi sẽ mở tin nhắn tới ViVi với đầy đủ thông tin — bạn chỉ cần bấm Gửi.',
    done: 'Cảm ơn bạn!', doneTxt: 'Tin nhắn đặt lịch đã được mở sẵn. Hãy bấm Gửi trong ứng dụng tin nhắn, ViVi sẽ nhắn lại xác nhận sớm nhất.',
    noSms: 'Không mở được tin nhắn? Gọi hoặc nhắn trực tiếp:', close: 'Đóng', msg: 'Xin chào ViVi, tôi muốn đặt lịch'
  } : {
    title: 'Book an appointment', name: 'Full name', phone: 'Phone number', service: 'Service', choose: '— Choose a service —',
    advice: "Not sure — I'd like advice", date: 'Date', time: 'Time', note: 'Notes', notePh: 'Brow shape, lip color or lash style you love…',
    send: 'Request appointment', hint: 'Sending opens a text message to ViVi with your details filled in — just tap Send.',
    done: 'Thank you!', doneTxt: 'Your booking text is ready. Tap Send in your messages app and ViVi will text you back to confirm as soon as possible.',
    noSms: "Text didn't open? Call or text us directly:", close: 'Close', msg: "Hi ViVi, I'd like to book an appointment"
  };
  const GROUPS = [
    ['Brows', ['Nano Hairstroke', 'Ombré (Shading)', 'Combo (Nano + Ombré)', 'Brow Enhancements']],
    ['Lips', ['Lip Blush', 'Dark Lip Neutralization']],
    ['Lash', ['Classic Full Set', 'Hybrid Full Set', 'Volume Full Set', 'Lash Refill', 'Lash Lift & Tint', '6-Month Lash Membership']],
    ['Facial', ['Basic Glow Facial', 'Advanced LED Facial', 'Premium Riman Signature Facial']],
    ['Waxing', ['Face Waxing', 'Body Waxing', 'Bikini & Brazilian', 'Waxing Combos']],
    ['Eyeliner', ['Lash Line Enhancement', 'Upper Eyeliner', 'Lower Eyeliner', 'Upper + Lower Eyeliner']]
  ];
  const times = []; for (let m = 9 * 60; m <= 18 * 60; m += 30) { const h = Math.floor(m / 60), mm = m % 60; times.push(`${(h % 12) || 12}:${String(mm).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`); }
  const wrap = document.createElement('div');
  wrap.innerHTML = `
  <div class="bmodal" id="bookModal" aria-hidden="true">
    <div class="bmodal__backdrop" data-bclose></div>
    <div class="bmodal__box" role="dialog" aria-modal="true" aria-labelledby="bookTitle">
      <button class="bmodal__close" aria-label="${T.close}" data-bclose>×</button>
      <p class="eyebrow">ViVi's Glow Studio</p>
      <h2 id="bookTitle">${T.title}</h2>
      <form id="bookForm" class="bform">
        <label>${T.name}<input type="text" name="name" required autocomplete="name"></label>
        <label>${T.phone}<input type="tel" name="phone" required pattern="[0-9 ()+\-]{9,18}" autocomplete="tel"></label>
        <label>${T.service}<select name="service" id="bookService" required>
          <option value="">${T.choose}</option>
          ${GROUPS.map(([g, l]) => `<optgroup label="${g}">${l.map(n => `<option>${n}</option>`).join('')}</optgroup>`).join('')}
          <option>${T.advice}</option>
        </select></label>
        <div class="bform__row">
          <label>${T.date}<input type="date" name="date" id="bookDate" required></label>
          <label>${T.time}<select name="time" required>${times.map(t => `<option>${t}</option>`).join('')}</select></label>
        </div>
        <label>${T.note}<textarea name="note" rows="2" placeholder="${T.notePh}"></textarea></label>
        <button type="submit" class="btn btn--gold btn--full">${T.send}</button>
        <p class="bform__hint">${T.hint}</p>
      </form>
      <div class="bdone" id="bookDone" hidden>
        <h3>${T.done}</h3>
        <p>${T.doneTxt}</p>
        <p class="bform__hint">${T.noSms} <a href="tel:+17604846977">760-484-6977</a></p>
        <button type="button" class="btn btn--outline" data-bclose>${T.close}</button>
      </div>
    </div>
  </div>`;
  document.body.appendChild(wrap.firstElementChild);
  const modal = document.getElementById('bookModal'), form = document.getElementById('bookForm'),
        done = document.getElementById('bookDone'), svc = document.getElementById('bookService');
  const today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  document.getElementById('bookDate').min = today.toISOString().split('T')[0];
  const open = service => {
    form.reset(); form.hidden = false; done.hidden = true;
    if (service && [...svc.options].some(o => o.value === service)) svc.value = service;
    modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
    setTimeout(() => form.querySelector('input').focus(), 60);
  };
  const close = () => { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-book]');
    if (b) { e.preventDefault(); open(b.dataset.book); return; }
    if (e.target.closest('[data-bclose]')) close();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('is-open')) close(); });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const dt = new Date(d.date + 'T12:00').toLocaleDateString(VI ? 'vi-VN' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const body = `${T.msg}:\n• ${T.service}: ${d.service}\n• ${T.date}: ${dt}, ${d.time}\n• ${T.name}: ${d.name}\n• ${T.phone}: ${d.phone}` + (d.note ? `\n• ${T.note}: ${d.note}` : '');
    const ios = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
    window.location.href = `sms:+17604846977${ios ? '&' : '?'}body=${encodeURIComponent(body)}`;
    form.hidden = true; done.hidden = false;
  });
})();
