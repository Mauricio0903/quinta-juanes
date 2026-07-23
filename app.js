// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));

// ===== HAMBURGER =====
const ham = document.getElementById('ham'), mob = document.getElementById('mobMenu');
ham.addEventListener('click', () => {
  ham.classList.toggle('open'); mob.classList.toggle('open');
  document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
});
mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  ham.classList.remove('open'); mob.classList.remove('open'); document.body.style.overflow = '';
}));

// ===== REVEAL ON SCROLL =====
document.querySelectorAll('.rev').forEach(el => {
  new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.12 }).observe(el);
});

// ===== LIGHTBOX =====
function lb(src) {
  document.getElementById('lbimg').src = src;
  document.getElementById('lbx').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function cls() {
  document.getElementById('lbx').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') cls(); });

// ===== GALERÍA: FILTROS =====
const gf = document.querySelectorAll('.gf');
const galImgs = document.querySelectorAll('.gal-grid img');
gf.forEach(btn => {
  btn.addEventListener('click', () => {
    gf.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.f;
    galImgs.forEach(img => {
      img.classList.toggle('hide', f !== 'all' && img.dataset.cat !== f);
    });
  });
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// ===== COTIZADOR =====
const PHONE = '5219831547527';
let selectedEvent = 'XV años';
const pills = document.querySelectorAll('#eventPills .pill');
pills.forEach(p => {
  p.addEventListener('click', () => {
    pills.forEach(x => x.classList.remove('active'));
    p.classList.add('active');
    selectedEvent = p.dataset.val;
    buildQuoteLink();
  });
});
const qName = document.getElementById('qName');
const qDate = document.getElementById('qDate');
const qGuests = document.getElementById('qGuests');
const quoteSubmit = document.getElementById('quoteSubmit');
[qName, qDate, qGuests].forEach(el => el.addEventListener('input', buildQuoteLink));

function buildQuoteLink() {
  const nombre = qName.value.trim();
  const fecha = qDate.value ? new Date(qDate.value + 'T00:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Por definir';
  const invitados = qGuests.value;
  let msg = `Hola! Vi la página de Quinta Juanes y quiero cotizar mi evento 🌴\n\n`;
  if (nombre) msg += `Nombre: ${nombre}\n`;
  msg += `Tipo de evento: ${selectedEvent}\nFecha tentativa: ${fecha}\nInvitados: ${invitados}`;
  quoteSubmit.href = `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
}
buildQuoteLink();

document.getElementById('quoteForm').addEventListener('submit', e => e.preventDefault());

// ===== ASISTENTE IA =====
const aiFab = document.getElementById('aiFab');
const aiPanel = document.getElementById('aiPanel');
const aiClose = document.getElementById('aiClose');
const aiBody = document.getElementById('aiBody');
const aiForm = document.getElementById('aiForm');
const aiInput = document.getElementById('aiInput');
const aiSuggestions = document.getElementById('aiSuggestions');

aiFab.addEventListener('click', () => {
  aiPanel.classList.add('open');
  aiFab.style.display = 'none';
  aiInput.focus();
});
aiClose.addEventListener('click', () => {
  aiPanel.classList.remove('open');
  aiFab.style.display = 'flex';
});

let chatHistory = [];

function addMsg(text, who) {
  const div = document.createElement('div');
  div.className = `ai-msg ai-msg-${who}`;
  div.textContent = text;
  aiBody.appendChild(div);
  aiBody.scrollTop = aiBody.scrollHeight;
  return div;
}

function addTyping() {
  const div = document.createElement('div');
  div.className = 'ai-msg ai-msg-bot ai-msg-typing';
  div.innerHTML = '<span></span><span></span><span></span>';
  aiBody.appendChild(div);
  aiBody.scrollTop = aiBody.scrollHeight;
  return div;
}

async function sendToAI(text) {
  addMsg(text, 'user');
  chatHistory.push({ role: 'user', content: text });
  if (aiSuggestions) aiSuggestions.style.display = 'none';
  const typing = addTyping();

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory })
    });
    const data = await res.json();
    typing.remove();
    const reply = data.reply || 'Disculpa, no pude procesar tu mensaje. Escríbenos directo por WhatsApp y te ayudamos al instante 🌴';
    addMsg(reply, 'bot');
    chatHistory.push({ role: 'assistant', content: reply });
  } catch (err) {
    typing.remove();
    addMsg('Ahora mismo no puedo responder por aquí. Escríbenos directo por WhatsApp y te atendemos al instante 🌴', 'bot');
  }
}

aiForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = aiInput.value.trim();
  if (!text) return;
  aiInput.value = '';
  sendToAI(text);
});

document.querySelectorAll('.ai-chip').forEach(chip => {
  chip.addEventListener('click', () => sendToAI(chip.textContent));
});
