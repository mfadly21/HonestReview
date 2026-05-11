// ===== DATA =====
const businesses = [
  { id: 1, name: "Warung Mbok Darmi", cat: "Kuliner", emoji: "🍜", pos: 80, neu: 15, neg: 5, location: "Bengkulu Utara" },
  { id: 2, name: "TechStore Bengkulu", cat: "Elektronik", emoji: "📱", pos: 60, neu: 25, neg: 15, location: "Pusat Kota" },
  { id: 3, name: "Salon Cantik Nusantara", cat: "Kecantikan", emoji: "💄", pos: 75, neu: 10, neg: 15, location: "Bengkulu Selatan" },
  { id: 4, name: "Bengkel Pak Harto", cat: "Jasa", emoji: "🔧", pos: 85, neu: 10, neg: 5, location: "Ratu Agung" },
  { id: 5, name: "Kos Kenanga Indah", cat: "Properti", emoji: "🏠", pos: 55, neu: 30, neg: 15, location: "Dekat UNIB" },
  { id: 6, name: "Ayam Geprek Bu Tini", cat: "Kuliner", emoji: "🍗", pos: 90, neu: 8, neg: 2, location: "Sawah Lebar" },
  { id: 7, name: "Apotek Sehat Selalu", cat: "Jasa", emoji: "💊", pos: 70, neu: 20, neg: 10, location: "Soeprapto" },
  { id: 8, name: "Toko Baju Modis Kita", cat: "Kecantikan", emoji: "👗", pos: 65, neu: 20, neg: 15, location: "Pasar Minggu" },
];

const reviewsData = [
  { biz: 1, author: "Rina S.", rating: 5, title: "Makanan lezat, pelayanan ramah!", body: "Sudah berlangganan 3 tahun. Nasi rawon-nya autentik banget, tidak pelit isian. Harga sangat terjangkau untuk porsi yang besar. Ibu penjualnya ramah dan selalu tersenyum.", sentiment: "positive", hash: "0x7f3a9b2c", cid: "QmX9bW3k...", time: "2 jam lalu", helpful: 12 },
  { biz: 1, author: "Dodi R.", rating: 4, title: "Enak tapi antri lama", body: "Makanannya memang enak dan harga pas di kantong mahasiswa. Tapi waktu makan siang antriannya bisa sampai 20 menit. Mungkin perlu tambah karyawan agar pelayanan lebih cepat.", sentiment: "neutral", hash: "0x4c8d1e5f", cid: "QmK2mL7j...", time: "1 hari lalu", helpful: 5 },
  { biz: 2, author: "Budi P.", rating: 2, title: "Barang refurbished dijual sebagai baru!", body: "Beli HP katanya baru, ternyata ada bekas pakai di layar. Pas dikomplain, CS-nya tidak kooperatif dan menyalahkan pembeli. Tolong lebih jujur dalam berjualan. Sangat kecewa.", sentiment: "negative", hash: "0x1a6f3c9d", cid: "QmP8nQ2r...", time: "3 hari lalu", helpful: 28 },
  { biz: 3, author: "Maya K.", rating: 5, title: "Hasil hair treatment luar biasa!", body: "Baru pertama kali ke sini tapi sudah jadi pelanggan setia. Hair treatment-nya bagus banget, rambut jadi lebih lembut dan berkilau. Harga sebanding dengan kualitas.", sentiment: "positive", hash: "0x9e2b7f4a", cid: "QmR5tY9w...", time: "5 jam lalu", helpful: 8 },
  { biz: 4, author: "Joko W.", rating: 5, title: "Mekanik jujur dan handal!", body: "Sudah 5 tahun service motor di sini. Pak Harto selalu bilang jujur apa yang perlu diperbaiki dan tidak menambah kerusakan yang tidak ada. Harga wajar, kerjaan rapi.", sentiment: "positive", hash: "0x3d8c5a2e", cid: "QmV4uZ6m...", time: "1 minggu lalu", helpful: 19 },
  { biz: 5, author: "Siti A.", rating: 3, title: "Lokasi strategis tapi banyak kurang", body: "Lokasi dekat kampus memang bagus. Tapi AC kamar sering mati, wifi lambat terutama malam hari, dan kamar mandi agak jarang dibersihkan. Harga bisa lebih kompetitif.", sentiment: "neutral", hash: "0x6b1f9e3c", cid: "QmC9aB8n...", time: "2 minggu lalu", helpful: 7 },
  { biz: 6, author: "Fitri L.", rating: 5, title: "Ayam geprek TERENAK di Bengkulu!", body: "Levelnya bisa disesuaikan dari 0 sampai 10. Level 5 saja sudah nendang banget! Ayamnya crispy sempurna, sambalnya fresh dibuat setiap hari. Porsi besar, harga Rp 15.000 sangat worth it!", sentiment: "positive", hash: "0x2c7e4b8a", cid: "QmH3kD5p...", time: "4 jam lalu", helpful: 33 },
];

// State
let selectedRating = 0;
let currentFilter = 'semua';
let blockHeight = 847291;
let totalTx = 0;
let blocks = [];
let currentBizId = null;
let modalFilterType = 'all';
let activeChartTab = 'reviews';
let trendChartInstance = null;
let uploadedFiles = [];
let helpfulVotes = {};

// ===== INIT =====
function init() {
  populateBusinessGrid();
  populateBusinessSelect();
  populateDashBizFilter();
  initStarInput();
  initBlockchain();
  initDashboard();
  animateCounters();
  initParticles();
  initScrollBehavior();
  updateTxTimestamps();
  setInterval(updateTxTimestamps, 15000);
}

// ===== PARTICLES =====
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.5 + 0.3,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.4 + 0.05
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(108,99,255,${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
}

// ===== SCROLL BEHAVIOR =====
function initScrollBehavior() {
  const scrollBtn = document.getElementById('scroll-top-btn');
  const nav = document.getElementById('main-nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn?.classList.add('visible');
    } else {
      scrollBtn?.classList.remove('visible');
    }

    // Nav shadow on scroll
    if (window.scrollY > 10) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  });
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  const btn = document.getElementById('hamburger-btn');
  drawer.classList.toggle('open');
  btn.classList.toggle('open');
}

function closeMobileMenu() {
  document.getElementById('mobile-drawer')?.classList.remove('open');
  document.getElementById('hamburger-btn')?.classList.remove('open');
}

// ===== COUNTER ANIMATIONS =====
function animateCounters() {
  animateNum('count-reviews', 0, reviewsData.length + 47, 1400);
  animateNum('count-biz', 0, businesses.length + 120, 1200);
  animateNum('count-blocks', 0, blockHeight % 1000 + 500, 1600);
}

function animateNum(id, from, to, duration) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = Date.now();
  const tick = () => {
    const progress = Math.min((Date.now() - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.round(from + (to - from) * ease).toLocaleString('id');
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// ===== SECTION NAV =====
function showSection(name, btn) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-pill').forEach(p => p.classList.remove('active'));
  document.getElementById('section-' + name).classList.add('active');
  if (btn) btn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (name === 'dashboard') initDashboardCharts();
  if (name === 'write') populateRecentReviews();
  if (name === 'browse') populateBusinessGrid();
}

// ===== BUSINESS GRID =====
function getRating(biz) {
  const reviews = reviewsData.filter(r => r.biz === biz.id);
  if (!reviews.length) return (3.5 + Math.random() * 0.8).toFixed(1);
  const avg = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
  return avg.toFixed(1);
}

// Cache review counts to avoid randomness
const reviewCountCache = {};
function getReviewCount(biz) {
  if (!reviewCountCache[biz.id]) {
    reviewCountCache[biz.id] = reviewsData.filter(r => r.biz === biz.id).length + Math.floor(Math.random() * 20 + 5);
  }
  return reviewCountCache[biz.id];
}

function getStars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half);
}

function getBgColor(cat) {
  const map = { Kuliner: 'rgba(124,58,237,0.15)', Elektronik: 'rgba(8,145,178,0.15)', Kecantikan: 'rgba(219,39,119,0.15)', Jasa: 'rgba(217,119,6,0.15)', Properti: 'rgba(21,128,61,0.15)' };
  return map[cat] || 'rgba(108,99,255,0.15)';
}

function populateBusinessGrid() {
  const grid = document.getElementById('business-grid');
  const emptyState = document.getElementById('empty-state');
  const resultsInfo = document.getElementById('results-info');
  const q = document.getElementById('search-input')?.value.toLowerCase() || '';
  const sortVal = document.getElementById('sort-select')?.value || 'default';

  let filtered = currentFilter === 'semua' ? [...businesses] : businesses.filter(b => b.cat === currentFilter);
  if (q) filtered = filtered.filter(b => b.name.toLowerCase().includes(q) || b.cat.toLowerCase().includes(q) || (b.location || '').toLowerCase().includes(q));

  // Sort
  if (sortVal === 'rating-high') filtered.sort((a, b) => parseFloat(getRating(b)) - parseFloat(getRating(a)));
  else if (sortVal === 'rating-low') filtered.sort((a, b) => parseFloat(getRating(a)) - parseFloat(getRating(b)));
  else if (sortVal === 'reviews-most') filtered.sort((a, b) => getReviewCount(b) - getReviewCount(a));
  else if (sortVal === 'sentiment-best') filtered.sort((a, b) => b.pos - a.pos);

  if (!filtered.length) {
    grid.innerHTML = '';
    emptyState.style.display = 'block';
    if (resultsInfo) resultsInfo.textContent = '';
    return;
  }

  emptyState.style.display = 'none';
  if (resultsInfo) resultsInfo.textContent = `Menampilkan ${filtered.length} bisnis${q ? ` untuk "${q}"` : ''}`;

  grid.innerHTML = filtered.map((biz, idx) => {
    const rating = getRating(biz);
    const count = getReviewCount(biz);
    const animDelay = idx * 0.05;
    return `
    <div class="business-card" onclick="openBizModal(${biz.id})" style="animation-delay: ${animDelay}s">
      <div class="biz-top">
        <div class="biz-avatar" style="background: ${getBgColor(biz.cat)}">${biz.emoji}</div>
        <div class="biz-info">
          <h3>${biz.name}</h3>
          <div class="biz-cat">${biz.cat}${biz.location ? ' · ' + biz.location : ''}</div>
        </div>
      </div>
      <div class="rating-row">
        <span class="stars" style="letter-spacing: 2px">${getStars(parseFloat(rating))}</span>
        <span class="rating-num">${rating}</span>
        <span class="review-count">(${count} ulasan)</span>
      </div>
      <div class="blockchain-badge">⛓ ${count} transaksi on-chain</div>
      <div class="sentiment-bar" style="margin-bottom: 4px;">
        <div class="bar-fill sent-pos" style="flex: ${biz.pos}; height: 100%;"></div>
        <div class="bar-fill sent-neu" style="flex: ${biz.neu}; height: 100%;"></div>
        <div class="bar-fill sent-neg" style="flex: ${biz.neg}; height: 100%;"></div>
      </div>
      <div class="sent-labels">
        <span style="color: var(--green)">+${biz.pos}%</span>
        <span style="color: var(--text3)">~${biz.neu}%</span>
        <span style="color: var(--red)">-${biz.neg}%</span>
      </div>
    </div>`;
  }).join('');
}

function filterBusiness() {
  const q = document.getElementById('search-input')?.value || '';
  const clearBtn = document.getElementById('search-clear');
  if (clearBtn) clearBtn.style.display = q ? 'flex' : 'none';
  populateBusinessGrid();
}

function clearSearch() {
  document.getElementById('search-input').value = '';
  document.getElementById('search-clear').style.display = 'none';
  populateBusinessGrid();
}

function setFilter(cat, btn) {
  currentFilter = cat;
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  populateBusinessGrid();
}

// ===== MODAL =====
function openBizModal(bizId) {
  const biz = businesses.find(b => b.id === bizId);
  currentBizId = bizId;
  modalFilterType = 'all';

  document.getElementById('modal-biz-name').textContent = biz.name;
  document.getElementById('modal-biz-cat').textContent = `${biz.emoji} ${biz.cat} · ${getReviewCount(biz)} ulasan terverifikasi`;

  const avatarEl = document.getElementById('modal-biz-avatar');
  if (avatarEl) {
    avatarEl.textContent = biz.emoji;
    avatarEl.style.background = getBgColor(biz.cat);
  }

  // Rating summary
  const reviews = reviewsData.filter(r => r.biz === bizId);
  const avg = reviews.length ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1) : '-';
  const summaryEl = document.getElementById('modal-rating-summary');
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div style="text-align: center;">
        <div style="font-size: 2.5rem; font-weight: 700; font-family: 'JetBrains Mono'; line-height: 1;">${avg}</div>
        <div style="color: var(--amber); font-size: 1.1rem; margin: 4px 0;">★★★★★</div>
        <div style="font-size: 0.75rem; color: var(--text3);">${getReviewCount(biz)} ulasan</div>
      </div>
      <div style="flex: 1;">
        ${[5,4,3,2,1].map(star => {
          const cnt = reviews.filter(r => r.rating === star).length;
          const pct = reviews.length ? Math.round(cnt / reviews.length * 100) : 0;
          const colors = ['#22c55e','#84cc16','#f59e0b','#f97316','#ef4444'];
          return `<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <span style="font-size: 0.72rem; color: var(--amber); min-width: 20px;">${star}★</span>
            <div style="flex: 1; height: 6px; background: var(--bg3); border-radius: 3px; overflow: hidden;">
              <div style="height: 100%; width: ${pct}%; background: ${colors[5-star]}; border-radius: 3px; transition: width 0.8s ease;"></div>
            </div>
            <span style="font-size: 0.7rem; color: var(--text3); min-width: 25px; text-align: right;">${cnt}</span>
          </div>`;
        }).join('')}
      </div>`;
  }

  renderModalReviews();
  document.getElementById('review-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('review-modal').classList.remove('open');
  document.body.style.overflow = '';
  currentBizId = null;
}

function setModalFilter(type, btn) {
  modalFilterType = type;
  document.querySelectorAll('.modal-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderModalReviews();
}

function renderModalReviews() {
  let reviews = reviewsData.filter(r => r.biz === currentBizId);
  if (modalFilterType !== 'all') {
    reviews = reviews.filter(r => r.sentiment === modalFilterType);
  }

  const list = document.getElementById('modal-reviews-list');
  if (!reviews.length) {
    list.innerHTML = '<p style="color: var(--text3); text-align: center; padding: 2rem;">Belum ada ulasan untuk filter ini.</p>';
    return;
  }
  list.innerHTML = reviews.map(r => renderReviewItem(r)).join('');
}

function renderReviewItem(r, minimal = false) {
  const initials = r.author.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const colors = ['#6c63ff', '#14b8a6', '#f59e0b', '#ec4899', '#22c55e', '#f97316'];
  const color = colors[r.author.charCodeAt(0) % colors.length];
  const sentClass = { positive: 'sent-positive', neutral: 'sent-neutral', negative: 'sent-negative' }[r.sentiment];
  const sentLabel = { positive: '😊 Positif', neutral: '😐 Netral', negative: '😞 Negatif' }[r.sentiment];
  const reviewClass = { positive: 'is-positive', neutral: 'is-neutral', negative: 'is-negative' }[r.sentiment];

  const helpfulCount = helpfulVotes[r.hash] || r.helpful || 0;
  const hasVoted = JSON.parse(localStorage.getItem?.('hr_votes') || '{}')[r.hash];

  return `
  <div class="review-item ${reviewClass}">
    <div class="review-header">
      <div class="reviewer-info">
        <div class="avatar-circle" style="background: ${color}22; color: ${color}; border: 1px solid ${color}40;">${initials}</div>
        <div class="reviewer-meta">
          <h4>${r.author}</h4>
          <span>${r.time}</span>
        </div>
      </div>
      <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)} <span style="font-size: 0.8rem; color: var(--text2); font-family: 'JetBrains Mono';">${r.rating}.0</span></div>
    </div>
    <div class="review-title-text">${r.title}</div>
    <div class="review-body">${r.body}</div>
    <div class="review-footer">
      <span class="chain-hash" onclick="copyHash('${r.hash}')" title="Klik untuk copy hash">⛓ ${r.hash}</span>
      <span class="ipfs-badge">IPFS: ${r.cid}</span>
      <span class="sentiment-tag ${sentClass}">${sentLabel}</span>
      <span class="immutable-tag">🔒 Immutable</span>
    </div>
    <div class="helpful-row">
      <span class="helpful-label">Ulasan ini membantu?</span>
      <button class="helpful-btn ${hasVoted ? 'voted' : ''}" onclick="markHelpful('${r.hash}', this)">👍 Ya (${helpfulCount})</button>
    </div>
  </div>`;
}

function copyHash(hash) {
  navigator.clipboard?.writeText(hash).then(() => showToast('📋 Hash berhasil dicopy!', 'success')).catch(() => {});
}

function markHelpful(hash, btn) {
  if (btn.classList.contains('voted')) return;
  btn.classList.add('voted');
  helpfulVotes[hash] = (helpfulVotes[hash] || 0) + 1;
  const count = helpfulVotes[hash];
  btn.textContent = `👍 Ya (${count})`;
  showToast('👍 Terima kasih atas penilaianmu!', 'success');
}

// ===== STAR INPUT =====
const ratingLabels = ['', 'Sangat Buruk', 'Buruk', 'Cukup', 'Bagus', 'Sangat Bagus'];

function initStarInput() {
  const btns = document.querySelectorAll('.star-btn');
  const labelEl = document.getElementById('rating-label-text');

  btns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      const val = parseInt(btn.dataset.val);
      btns.forEach(b => {
        const bVal = parseInt(b.dataset.val);
        b.classList.toggle('active', bVal <= val);
        b.style.color = bVal <= val ? 'var(--amber)' : '';
        b.style.filter = bVal <= val ? 'drop-shadow(0 0 8px rgba(245,158,11,0.6))' : '';
      });
      if (labelEl) labelEl.textContent = ratingLabels[val];
    });

    btn.addEventListener('click', () => {
      selectedRating = parseInt(btn.dataset.val);
      btns.forEach(b => {
        const bVal = parseInt(b.dataset.val);
        b.classList.toggle('active', bVal <= selectedRating);
        b.style.color = bVal <= selectedRating ? 'var(--amber)' : '';
        b.style.filter = bVal <= selectedRating ? 'drop-shadow(0 0 8px rgba(245,158,11,0.6))' : '';
      });
      if (labelEl) { labelEl.textContent = ratingLabels[selectedRating]; labelEl.style.color = 'var(--amber)'; }
      generateTxPreview();
      updateLiveSentiment();
    });
  });

  document.getElementById('star-input').addEventListener('mouseleave', () => {
    const btns = document.querySelectorAll('.star-btn');
    btns.forEach(b => {
      const bVal = parseInt(b.dataset.val);
      b.classList.toggle('active', bVal <= selectedRating);
      b.style.color = bVal <= selectedRating ? 'var(--amber)' : '';
      b.style.filter = bVal <= selectedRating ? 'drop-shadow(0 0 8px rgba(245,158,11,0.6))' : '';
    });
    if (labelEl) labelEl.textContent = selectedRating ? ratingLabels[selectedRating] : 'Pilih rating';
  });
}

// ===== BIZ SELECT CHANGE =====
function onBizSelectChange() {
  const val = document.getElementById('biz-select').value;
  const previewEl = document.getElementById('biz-preview');
  if (!previewEl) return;

  if (!val) {
    previewEl.style.display = 'none';
    return;
  }

  const biz = businesses.find(b => b.id == val);
  if (biz) {
    const rating = getRating(biz);
    const count = getReviewCount(biz);
    previewEl.style.display = 'flex';
    previewEl.innerHTML = `
      <div style="font-size: 1.5rem;">${biz.emoji}</div>
      <div>
        <div style="font-weight: 600; font-size: 0.9rem;">${biz.name}</div>
        <div style="font-size: 0.75rem; color: var(--text3);">${biz.cat} · ★ ${rating} · ${count} ulasan · ${biz.location}</div>
      </div>`;
  }
}

function populateBusinessSelect() {
  const sel = document.getElementById('biz-select');
  businesses.forEach(b => {
    const opt = document.createElement('option');
    opt.value = b.id;
    opt.textContent = `${b.emoji} ${b.name}`;
    sel.appendChild(opt);
  });
}

function populateDashBizFilter() {
  const sel = document.getElementById('dash-biz-filter');
  if (!sel) return;
  businesses.forEach(b => {
    const opt = document.createElement('option');
    opt.value = b.id;
    opt.textContent = `${b.emoji} ${b.name}`;
    sel.appendChild(opt);
  });
}

// ===== CHAR COUNT =====
function updateCharCount(el, max, countId) {
  const countEl = document.getElementById(countId);
  if (!countEl) return;
  const len = el.value.length;
  countEl.textContent = `${len}/${max}`;
  countEl.classList.remove('near-limit', 'at-limit');
  if (len >= max) countEl.classList.add('at-limit');
  else if (len >= max * 0.85) countEl.classList.add('near-limit');
}

// ===== LIVE SENTIMENT ANALYSIS =====
function updateLiveSentiment() {
  const body = document.getElementById('review-body').value;
  const sentEl = document.getElementById('live-sentiment');
  const iconEl = document.getElementById('sentiment-icon');
  const txtEl = document.getElementById('sentiment-txt');
  const fillEl = document.getElementById('sentiment-fill');

  if (!sentEl) return;
  if (body.length < 10 && !selectedRating) { sentEl.style.display = 'none'; return; }

  sentEl.style.display = 'flex';

  // Simple sentiment from rating and keywords
  let score = selectedRating ? (selectedRating - 1) / 4 : 0.5;
  const positiveWords = ['bagus', 'enak', 'ramah', 'puas', 'recommended', 'mantap', 'keren', 'luar biasa', 'terbaik', 'suka'];
  const negativeWords = ['buruk', 'kecewa', 'jelek', 'tidak puas', 'mahal', 'lama', 'kotor', 'bohong', 'tipu'];
  const lowerBody = body.toLowerCase();
  positiveWords.forEach(w => { if (lowerBody.includes(w)) score = Math.min(1, score + 0.08); });
  negativeWords.forEach(w => { if (lowerBody.includes(w)) score = Math.max(0, score - 0.1); });

  let icon, label, color;
  if (score >= 0.65) { icon = '😊'; label = 'Sentimen: Positif'; color = 'var(--green)'; }
  else if (score >= 0.35) { icon = '😐'; label = 'Sentimen: Netral'; color = 'var(--amber)'; }
  else { icon = '😞'; label = 'Sentimen: Negatif'; color = 'var(--red)'; }

  if (iconEl) iconEl.textContent = icon;
  if (txtEl) { txtEl.textContent = label; txtEl.style.color = color; }
  if (fillEl) { fillEl.style.width = `${score * 100}%`; fillEl.style.background = color; }
}

// ===== FILE UPLOAD =====
function handleFileSelect(input) {
  const files = Array.from(input.files).slice(0, 3);
  renderUploadPreview(files);
  uploadedFiles = files;
}

function handleFileDrop(e) {
  e.preventDefault();
  document.getElementById('upload-zone').classList.remove('drag-over');
  const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/')).slice(0, 3);
  renderUploadPreview(files);
  uploadedFiles = files;
}

function renderUploadPreview(files) {
  const placeholder = document.getElementById('upload-placeholder');
  const preview = document.getElementById('upload-preview');
  if (!preview) return;

  if (files.length) {
    placeholder.style.display = 'none';
    preview.innerHTML = files.map(f => {
      const url = URL.createObjectURL(f);
      return `<img class="upload-thumb" src="${url}" alt="preview">`;
    }).join('') + `<div style="font-size: 0.75rem; color: var(--text3); align-self: flex-end;">${files.length} foto dipilih ✓</div>`;
  }
}

// ===== TX PREVIEW =====
function generateTxPreview() {
  const body = document.getElementById('review-body').value;
  updateLiveSentiment();
  if (body.length < 10) return;

  const preview = document.getElementById('tx-preview');
  preview.classList.add('visible');

  const hash = '0x' + Array.from({length: 16}, () => Math.floor(Math.random()*16).toString(16)).join('');
  const cid = 'Qm' + randomStr(20);
  const feeEth = (Math.random() * 0.004 + 0.001).toFixed(4);

  document.getElementById('tx-cid').textContent = cid.slice(0, 18) + '...';
  document.getElementById('tx-hash').textContent = hash;
  document.getElementById('tx-ts').textContent = new Date().toISOString();
  const feeEl = document.getElementById('tx-fee');
  if (feeEl) feeEl.textContent = `$${feeEth} ETH`;
}

// ===== SUBMIT REVIEW =====
async function submitReview() {
  const bizId = parseInt(document.getElementById('biz-select').value);
  const title = document.getElementById('review-title').value.trim();
  const body = document.getElementById('review-body').value.trim();
  const author = document.getElementById('review-author').value.trim() || 'Anonim';

  if (!bizId) { showToast('⚠️ Pilih bisnis terlebih dahulu!', 'error'); return; }
  if (!selectedRating) { showToast('⚠️ Berikan rating bintang!', 'error'); return; }
  if (!title) { showToast('⚠️ Isi judul ulasan!', 'error'); return; }
  if (body.length < 20) { showToast('⚠️ Ulasan terlalu singkat (min. 20 karakter)!', 'error'); return; }

  const btn = document.getElementById('submit-btn');
  btn.disabled = true;

  setStep(1);
  btn.innerHTML = '<div class="spinner"></div> Menyiapkan data...';
  await delay(700);

  setStep(2);
  btn.innerHTML = '<div class="spinner"></div> Upload ke IPFS...';
  showToast('🌐 Mengupload ulasan ke IPFS...', '');
  await delay(1400);

  const cid = 'Qm' + randomStr(20);

  setStep(3);
  btn.innerHTML = '<div class="spinner"></div> Mengirim ke blockchain...';
  showToast('⛓️ Mengunci di Smart Contract...', '');
  await delay(1800);

  const hash = '0x' + randomHex(16);
  blockHeight++;

  setStep(4);
  btn.innerHTML = '✅ Dikonfirmasi!';

  const biz = businesses.find(b => b.id === bizId);
  const sentiment = selectedRating >= 4 ? 'positive' : selectedRating === 3 ? 'neutral' : 'negative';

  reviewsData.unshift({
    biz: bizId,
    author,
    rating: selectedRating,
    title,
    body,
    sentiment,
    hash: hash.slice(0, 10),
    cid: cid.slice(0, 10) + '...',
    time: 'Baru saja',
    helpful: 0
  });

  // Update review count cache
  reviewCountCache[bizId] = (reviewCountCache[bizId] || 5) + 1;

  addBlock(`#${blockHeight}`, hash, 1);
  showToast(`✅ Ulasan dikunci! Tx: ${hash.slice(0, 14)}...`, 'success');

  await delay(1000);

  // Reset form
  selectedRating = 0;
  document.querySelectorAll('.star-btn').forEach(b => { b.classList.remove('active'); b.style.color = ''; b.style.filter = ''; });
  const labelEl = document.getElementById('rating-label-text');
  if (labelEl) { labelEl.textContent = 'Pilih rating'; labelEl.style.color = ''; }
  document.getElementById('review-title').value = '';
  document.getElementById('review-body').value = '';
  document.getElementById('review-author').value = '';
  document.getElementById('biz-select').value = '';
  document.getElementById('tx-preview').classList.remove('visible');
  document.getElementById('biz-preview').style.display = 'none';
  document.getElementById('live-sentiment').style.display = 'none';
  document.getElementById('upload-preview').innerHTML = '';
  document.getElementById('upload-placeholder').style.display = 'block';
  document.getElementById('title-count').textContent = '0/80';
  document.getElementById('body-count').textContent = '0/1000';
  uploadedFiles = [];

  await delay(800);
  btn.disabled = false;
  btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> Publikasi ke Blockchain';
  resetSteps();
  populateRecentReviews();
  animateCounters();
}

function setStep(n) {
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById('step' + i);
    if (!el) continue;
    el.classList.remove('active', 'done');
    if (i < n) el.classList.add('done');
    else if (i === n) el.classList.add('active');
  }
  // Animate step lines
  document.querySelectorAll('.step-line').forEach((line, idx) => {
    line.style.background = idx < n - 1 ? 'var(--green)' : 'var(--border)';
  });
}

function resetSteps() {
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById('step' + i);
    if (el) el.classList.remove('active', 'done');
  }
  document.querySelectorAll('.step-line').forEach(l => l.style.background = '');
  document.getElementById('step1').classList.add('active');
}

// ===== RECENT REVIEWS =====
function populateRecentReviews() {
  const container = document.getElementById('write-recent-reviews');
  if (!container) return;
  container.innerHTML = reviewsData.slice(0, 3).map(r => renderReviewItem(r, true)).join('');
}

// ===== BLOCKCHAIN =====
function initBlockchain() {
  for (let i = 0; i < 7; i++) {
    const txC = Math.floor(Math.random() * 3 + 1);
    totalTx += txC;
    blocks.unshift({ num: `#${blockHeight - 6 + i}`, hash: '0x' + randomHex(16), txCount: txC, time: new Date(Date.now() - (6 - i) * 8000) });
  }
  renderChainVisual();
  renderBlockList();
  updateBlockHeight();

  setInterval(() => {
    blockHeight++;
    const txC = Math.floor(Math.random() * 2 + 1);
    totalTx += txC;
    addBlock(`#${blockHeight}`, '0x' + randomHex(16), txC);
    updateBlockHeight();

    // Gas price fluctuation
    const gasEl = document.getElementById('gas-price');
    if (gasEl) gasEl.textContent = Math.floor(Math.random() * 15 + 12) + ' Gwei';

    const txEl = document.getElementById('total-tx-display');
    if (txEl) txEl.textContent = totalTx.toLocaleString('id');
  }, 8000);
}

function updateBlockHeight() {
  const navEl = document.getElementById('live-block-nav');
  if (navEl) navEl.textContent = `Block #${blockHeight.toLocaleString('id')}`;
  const explorerEl = document.getElementById('block-height-display');
  if (explorerEl) explorerEl.textContent = `Block #${blockHeight.toLocaleString('id')}`;
}

function addBlock(num, hash, txC, animate = true) {
  blocks.unshift({ num, hash, txCount: txC, time: new Date() });
  if (blocks.length > 25) blocks.pop();
  if (animate) {
    renderChainVisual(true);
    renderBlockList(true);
    // Update dashboard blocks counter
    const dashEl = document.getElementById('dash-blocks');
    if (dashEl) dashEl.textContent = (parseInt(dashEl.textContent.replace(/\./g, '')) + 1).toLocaleString('id');
  }
}

function renderChainVisual(newBlock = false) {
  const el = document.getElementById('chain-visual');
  if (!el) return;
  const displayed = blocks.slice(0, 10).reverse();
  el.innerHTML = displayed.map((b, i) => {
    const isNew = newBlock && i === displayed.length - 1;
    return `
      ${i > 0 ? '<div class="chain-connector"></div>' : ''}
      <div class="chain-block ${isNew ? 'new' : ''}" onclick="copyHash('${b.hash}')" title="Klik untuk copy hash">
        <div style="font-weight: 600; margin-bottom: 3px;">${b.num}</div>
        <div style="opacity: 0.6; font-size: 0.62rem;">${b.hash.slice(0, 12)}...</div>
        <div style="color: var(--green); font-size: 0.62rem; margin-top: 3px;">✓ ${b.txCount} tx</div>
      </div>`;
  }).join('');
  // Auto scroll to right (newest block)
  el.scrollLeft = el.scrollWidth;
}

function renderBlockList(animate = false) {
  const el = document.getElementById('block-list');
  if (!el) return;
  const query = document.getElementById('tx-search-input')?.value.toLowerCase() || '';
  const filtered = blocks.slice(0, 12).filter(b => !query || b.num.includes(query) || b.hash.includes(query));
  el.innerHTML = filtered.map((b, i) => `
    <div class="block-item ${animate && i === 0 ? 'new-block' : ''}">
      <div class="block-num">⬛ ${b.num}</div>
      <div class="block-hash">${b.hash}</div>
      <div class="block-time">${formatTime(b.time)}</div>
      <div class="block-tx-count">${b.txCount} tx</div>
    </div>`).join('');
}

function filterBlocks() { renderBlockList(); }

function formatTime(date) {
  const diff = Math.floor((Date.now() - date) / 1000);
  if (diff < 5) return 'Baru saja';
  if (diff < 60) return diff + 'd lalu';
  if (diff < 3600) return Math.floor(diff / 60) + 'm lalu';
  return Math.floor(diff / 3600) + 'j lalu';
}

function updateTxTimestamps() {
  renderBlockList();
}

// ===== DASHBOARD =====
function initDashboard() {
  document.getElementById('dash-total').textContent = (reviewsData.length + 47).toLocaleString('id');
  document.getElementById('dash-blocks').textContent = (blockHeight % 1000 + 500).toLocaleString('id');

  // Init AI text
  const aiText = document.getElementById('ai-analysis-text');
  if (aiText) aiText.textContent = 'Menganalisis ulasan dari blockchain...';
}

function updateDashboard() { initDashboardCharts(); }

function setChartTab(tab, btn) {
  activeChartTab = tab;
  document.querySelectorAll('.chart-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  drawTrendChart();
}

function initDashboardCharts() {
  // Rating distribution bars
  const bars = document.getElementById('rating-bars');
  if (bars) {
    const dist = [2, 3, 8, 18, 28];
    const max = Math.max(...dist);
    const colors = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e'];
    bars.innerHTML = [5, 4, 3, 2, 1].map((star, i) => {
      const count = dist[star - 1];
      const pct = Math.round(count / max * 100);
      return `
      <div class="bar-row">
        <div class="bar-label">${'★'.repeat(star)}${'☆'.repeat(5 - star)}</div>
        <div class="bar-track">
          <div class="bar-fill" style="width: 0%; background: ${colors[star - 1]}; transition: width 1.2s ${i * 0.12}s cubic-bezier(0.4,0,0.2,1);" data-target="${pct}"></div>
        </div>
        <div class="bar-val">${count}</div>
      </div>`;
    }).join('');
    // Animate widths
    setTimeout(() => {
      bars.querySelectorAll('.bar-fill').forEach(el => {
        el.style.width = el.dataset.target + '%';
      });
    }, 100);
  }

  // Donut chart
  setTimeout(() => {
    const circ = 2 * Math.PI * 52;
    const posArc = circ * 0.72;
    const neuArc = circ * 0.18;
    const negArc = circ * 0.10;

    const pos = document.getElementById('d-pos');
    const neu = document.getElementById('d-neu');
    const neg = document.getElementById('d-neg');

    if (pos) pos.setAttribute('stroke-dasharray', `${posArc} ${circ - posArc}`);
    if (neu) {
      neu.setAttribute('stroke-dasharray', `${neuArc} ${circ - neuArc}`);
      const neuOffset = -posArc + circ * 0.25;
      neu.setAttribute('stroke-dashoffset', `${neuOffset}`);
    }
    if (neg) {
      neg.setAttribute('stroke-dasharray', `${negArc} ${circ - negArc}`);
      neg.setAttribute('stroke-dashoffset', `${-posArc - neuArc + circ * 0.25}`);
    }
  }, 200);

  // Trend chart
  drawTrendChart();

  // Sparklines
  drawSparklines();

  // AI Analysis
  runAIAnalysis();

  // Keywords
  renderKeywords();
}

function drawTrendChart() {
  const canvas = document.getElementById('trend-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width = canvas.offsetWidth || 600;
  const H = canvas.height = 180;

  const months = ['Nov', 'Des', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei'];
  const reviewData = [18, 24, 31, 28, 38, 42, 59];
  const ratingData = [3.8, 4.0, 4.1, 4.0, 4.2, 4.3, 4.3];
  const data = activeChartTab === 'reviews' ? reviewData : ratingData;
  const maxVal = Math.max(...data) * 1.15;
  const minVal = Math.min(...data) * 0.85;

  ctx.clearRect(0, 0, W, H);

  const padL = 40, padR = 20, padT = 20, padB = 30;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const toX = (i) => padL + (i / (data.length - 1)) * chartW;
  const toY = (v) => padT + (1 - (v - minVal) / (maxVal - minVal)) * chartH;

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padT + (i / 4) * chartH;
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(W - padR, y);
    ctx.stroke();
  }

  // Gradient fill
  const grad = ctx.createLinearGradient(0, padT, 0, H - padB);
  grad.addColorStop(0, activeChartTab === 'reviews' ? 'rgba(108,99,255,0.3)' : 'rgba(20,184,166,0.3)');
  grad.addColorStop(1, 'rgba(108,99,255,0)');

  ctx.beginPath();
  ctx.moveTo(toX(0), toY(data[0]));
  for (let i = 1; i < data.length; i++) {
    const cpx = (toX(i - 1) + toX(i)) / 2;
    ctx.bezierCurveTo(cpx, toY(data[i - 1]), cpx, toY(data[i]), toX(i), toY(data[i]));
  }
  ctx.lineTo(toX(data.length - 1), H - padB);
  ctx.lineTo(toX(0), H - padB);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(toX(0), toY(data[0]));
  for (let i = 1; i < data.length; i++) {
    const cpx = (toX(i - 1) + toX(i)) / 2;
    ctx.bezierCurveTo(cpx, toY(data[i - 1]), cpx, toY(data[i]), toX(i), toY(data[i]));
  }
  ctx.strokeStyle = activeChartTab === 'reviews' ? 'rgba(108,99,255,0.9)' : 'rgba(20,184,166,0.9)';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Dots
  data.forEach((v, i) => {
    ctx.beginPath();
    ctx.arc(toX(i), toY(v), 4, 0, Math.PI * 2);
    ctx.fillStyle = activeChartTab === 'reviews' ? '#6c63ff' : '#14b8a6';
    ctx.fill();
    ctx.strokeStyle = '#080810';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Labels
    ctx.fillStyle = 'rgba(144,144,168,0.8)';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(months[i], toX(i), H - 8);
  });
}

function drawSparklines() {
  const sparks = [
    { id: 'sparkline-rating', data: [3.8, 4.0, 4.1, 4.0, 4.2, 4.3, 4.3], color: '#f59e0b' },
    { id: 'sparkline-reviews', data: [18, 24, 31, 28, 38, 42, 59], color: '#6c63ff' },
    { id: 'sparkline-sentiment', data: [60, 65, 68, 70, 71, 72, 72], color: '#22c55e' },
    { id: 'sparkline-blocks', data: [400, 450, 480, 500, 520, 540, 560], color: '#14b8a6' },
  ];

  sparks.forEach(s => {
    const container = document.getElementById(s.id);
    if (!container) return;
    const canvas = document.createElement('canvas');
    canvas.width = container.offsetWidth || 120;
    canvas.height = 30;
    container.innerHTML = '';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const max = Math.max(...s.data), min = Math.min(...s.data);
    const toX = (i) => (i / (s.data.length - 1)) * W;
    const toY = (v) => H - 4 - ((v - min) / (max - min || 1)) * (H - 8);

    ctx.beginPath();
    s.data.forEach((v, i) => {
      i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v));
    });
    ctx.strokeStyle = s.color;
    ctx.lineWidth = 1.5;
    ctx.lineJoin = 'round';
    ctx.stroke();
  });
}

function runAIAnalysis() {
  const aiText = document.getElementById('ai-analysis-text');
  const dotsEl = document.getElementById('ai-dots');
  if (!aiText) return;

  aiText.textContent = '';
  if (dotsEl) dotsEl.style.display = 'flex';

  setTimeout(() => {
    if (dotsEl) dotsEl.style.display = 'none';
    const analysis = `Berdasarkan analisis ${reviewsData.length + 47} ulasan terverifikasi on-chain, bisnis Anda menunjukkan performa positif yang konsisten. Pelanggan paling sering memuji keramahan staf (+43 mention), kebersihan (+28 mention), dan kualitas produk (+67 mention). Area yang perlu perhatian adalah waktu tunggu yang disebutkan dalam 12 ulasan negatif. Skor NPS (Net Promoter Score) Anda berada di angka 62, masuk kategori "Excellent". Rekomendasi: fokus pada pengurangan waktu antrean untuk meningkatkan kepuasan pelanggan di atas 4.5 bintang.`;
    let i = 0;
    aiText.classList.add('typewriter');
    const typer = setInterval(() => {
      aiText.textContent += analysis[i++];
      if (i >= analysis.length) { clearInterval(typer); aiText.classList.remove('typewriter'); }
    }, 16);
  }, 1200);
}

function refreshAI() {
  const btn = document.getElementById('refresh-ai-btn');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Memuat...'; }
  const aiText = document.getElementById('ai-analysis-text');
  if (aiText) { aiText.textContent = ''; }

  setTimeout(() => {
    runAIAnalysis();
    if (btn) { btn.disabled = false; btn.textContent = '🔄 Refresh'; }
    showToast('🤖 Analisis AI diperbarui!', 'success');
  }, 800);
}

function renderKeywords() {
  const kw = document.getElementById('keyword-cloud');
  if (!kw) return;
  const keywords = [
    { word: 'ramah', count: 43 }, { word: 'enak', count: 38 }, { word: 'murah', count: 31 },
    { word: 'bersih', count: 28 }, { word: 'cepat', count: 22 }, { word: 'rekomen', count: 19 },
    { word: 'lama antri', count: 12, neg: true }, { word: 'worth it', count: 17 }, { word: 'puas', count: 25 },
    { word: 'kecewa', count: 8, neg: true }, { word: 'terjangkau', count: 33 }, { word: 'profesional', count: 15 },
    { word: 'mantap', count: 20 }, { word: 'recommended', count: 24 },
  ];

  kw.innerHTML = keywords.map((k, i) => {
    const size = 0.75 + (k.count / 43) * 0.55;
    const opacity = 0.5 + (k.count / 43) * 0.5;
    const isNeg = k.neg;
    return `<span style="font-size: ${size}rem; opacity: ${opacity}; background: ${isNeg ? 'rgba(239,68,68,0.1)' : 'rgba(108,99,255,0.1)'}; border: 1px solid ${isNeg ? 'rgba(239,68,68,0.25)' : 'rgba(108,99,255,0.25)'}; color: ${isNeg ? 'var(--red)' : 'var(--accent2)'}; padding: 5px 14px; border-radius: 50px; cursor: default; transition: all 0.2s; display: inline-flex; gap: 4px; align-items: center; animation: fadeUp 0.4s ease ${i * 0.04}s both;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='${opacity}'">${k.word} <small style="opacity: 0.6; font-family: 'JetBrains Mono';">${k.count}</small></span>`;
  }).join('');
}

// ===== EXPORT FUNCTIONS =====
function exportData(type) {
  showToast(`📊 Export ${type.toUpperCase()} sedang diproses...`, 'success');
  setTimeout(() => {
    if (type === 'csv') {
      const csvRows = [
        ['Author', 'Rating', 'Sentiment', 'Title', 'Body', 'Hash', 'CID', 'Time'],
        ...reviewsData.map(r => [r.author, r.rating, r.sentiment, `"${r.title}"`, `"${r.body}"`, r.hash, r.cid, r.time])
      ];
      const csv = csvRows.map(r => r.join(',')).join('\n');
      downloadFile('honest-review-data.csv', csv, 'text/csv');
      showToast('✅ CSV berhasil diexport!', 'success');
    } else if (type === 'json') {
      const json = JSON.stringify({ reviews: reviewsData, businesses, exportedAt: new Date().toISOString() }, null, 2);
      downloadFile('honest-review-data.json', json, 'application/json');
      showToast('✅ JSON berhasil diexport!', 'success');
    } else {
      showToast('📑 Report PDF dikirim ke email!', 'success');
    }
  }, 600);
}

function downloadFile(name, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function shareReport() {
  const url = window.location.href;
  if (navigator.share) {
    navigator.share({ title: 'HonestReview Dashboard', url }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(url).then(() => showToast('🔗 Link berhasil dicopy!', 'success'));
  }
}

// ===== WALLET =====
function connectWallet() {
  const status = document.getElementById('wallet-status');
  const btn = document.getElementById('connect-btn');
  if (!btn) return;

  btn.innerHTML = '<div class="spinner"></div> Menghubungkan...';
  btn.disabled = true;

  setTimeout(() => {
    const addr = '0x' + randomHex(4) + '...' + randomHex(4);
    if (status) { status.textContent = addr; status.style.color = 'var(--green)'; }
    btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Terhubung';
    btn.style.background = 'var(--green2)';
    btn.disabled = false;
    showToast('✅ Wallet berhasil terhubung!', 'success');
  }, 1800);
}

// ===== TOAST =====
function showToast(msg, type) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-msg');
  if (!toast || !msgEl) return;
  msgEl.textContent = msg;
  toast.className = 'toast show ' + (type || '');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3500);
}

// ===== UTILS =====
function randomHex(len) {
  return Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

function randomStr(len) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz123456789';
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

// ===== START =====
document.addEventListener('DOMContentLoaded', init);