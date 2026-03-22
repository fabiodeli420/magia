// =========================================
//   LLEVAMOS MAGIA – JavaScript
// =========================================

const WA = '5491158919571';

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveLink();
});

// ===== ACTIVE LINK =====
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
}

// ===== HAMBURGER =====
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navMobile').classList.toggle('open');
});
document.querySelectorAll('.nav-mobile .nav-link').forEach(l => {
  l.addEventListener('click', () => document.getElementById('navMobile').classList.remove('open'));
});

// ===== REVEAL ON SCROLL =====
function observeReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== COUNTER =====
function initCounters() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.counter').forEach(el => {
        const target = parseInt(el.dataset.target);
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current;
          if (current >= target) clearInterval(timer);
        }, 25);
      });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) observer.observe(statsEl);
}

// ===== MAGIC CANVAS (estrellas y partículas) =====
function initMagicCanvas() {
  const canvas = document.getElementById('magicCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const colors = ['#c9a84c', '#e8c97a', '#7ec8e3', '#a78bca', '#f7a8c4', '#ffffff'];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.pulse += 0.02;
      p.y -= p.speed;
      if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      const op = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + Math.floor(op * 255).toString(16).padStart(2, '0');
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// ===== FORMULARIO =====
function sendConsulta() {
  const nombre  = document.getElementById('cNombre').value.trim();
  const escuela = document.getElementById('cEscuela').value.trim();
  const grado   = document.getElementById('cGrado').value.trim();
  const alumnos = document.getElementById('cAlumnos').value.trim();
  const destino = document.getElementById('cDestino').value;
  const mensaje = document.getElementById('cMensaje').value.trim();

  if (!nombre || !escuela || !grado) {
    showToast('⚠️ Completá nombre, escuela y grado');
    return;
  }

  let msg = `✨ *Consulta - LLEVAMOS MAGIA*\n\n`;
  msg += `👤 Nombre: ${nombre}\n`;
  msg += `🏫 Escuela: ${escuela}\n`;
  msg += `📚 Grado/Nivel: ${grado}\n`;
  if (alumnos) msg += `👥 Alumnos: ${alumnos}\n`;
  if (destino) msg += `🗺️ Destino: ${destino}\n`;
  if (mensaje) msg += `📝 Mensaje: ${mensaje}\n`;

  window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(msg), '_blank');
  showToast('✨ ¡Redirigiendo a WhatsApp!');
}

// ===== TOAST =====
function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `
    position:fixed; bottom:6rem; left:50%; transform:translateX(-50%);
    background:#1a3a6a; color:white;
    padding:0.7rem 1.5rem; border-radius:30px;
    font-family:'Nunito',sans-serif; font-size:0.85rem; font-weight:700;
    z-index:9999; box-shadow:0 8px 25px rgba(26,58,92,0.4);
    animation: toastIn 0.3s ease;
    border: 1px solid rgba(201,168,76,0.4);
  `;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  observeReveal();
  initCounters();
  initMagicCanvas();
});

// toast animation
const style = document.createElement('style');
style.textContent = `@keyframes toastIn { from { opacity:0; transform:translateX(-50%) translateY(10px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }`;
document.head.appendChild(style);
