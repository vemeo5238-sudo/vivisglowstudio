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

// Slider đánh giá
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

// Xem ảnh Portfolio phóng to
const lb = document.getElementById('lightbox');
if (lb) {
  const lbImg = lb.querySelector('img'), lbCap = lb.querySelector('.lightbox__cap');
  document.querySelectorAll('.gallery--ba figure, .studio__grid figure, .studio__wide figure, .feature__img').forEach(f => f.addEventListener('click', () => {
    const img = f.querySelector('img');
    lbImg.src = img.src; lbImg.alt = img.alt;
    lbCap.textContent = f.querySelector('figcaption').textContent;
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
