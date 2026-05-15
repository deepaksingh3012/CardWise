// ── State ──
let portfolioCards = [];

// ── Init ──
document.addEventListener('DOMContentLoaded', function() {
  updateDateStamp();
  setupCategoryToggle();
  loadPortfolio();

  document.getElementById('searchBtn').addEventListener('click', searchOffers);
});
function updateDateStamp() {
  const dateStr = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
  document.getElementById('dateStamp').innerHTML = dateStr + '<br/>Mumbai, India';
}

function setupCategoryToggle() {
  document.getElementById('category').addEventListener('change', function() {
    document.getElementById('customWrap').style.display =
      this.value === 'custom' ? 'block' : 'none';
  });
}


// ── Portfolio Management ──
async function loadPortfolio() {
  try {
    const res = await fetch('/api/portfolio');
    const data = await res.json();
    portfolioCards = data.cards || [];
    renderPortfolio();
  } catch (e) {
    console.error('Failed to load portfolio:', e);
  }
}

function renderPortfolio() {
  const container = document.getElementById('cardTags');
  container.innerHTML = portfolioCards.map((card, i) => `
    <span class="card-tag">
      ${escapeHtml(card)}
      <span class="remove-btn" onclick="removeCard(${i})" title="Remove card">&times;</span>
    </span>
  `).join('');
  document.getElementById('portfolioCount').textContent =
    `${portfolioCards.length} Card${portfolioCards.length !== 1 ? 's' : ''}`;
}

async function addCard() {
  const nameInput = document.getElementById('newCardName');
  const issuerSelect = document.getElementById('newCardIssuer');
  const cardName = nameInput.value.trim();
  const issuer = issuerSelect.value;

  if (!cardName) {
    alert('Please enter a card name.');
    return;
  }

  try {
    const res = await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: cardName, issuer: issuer })
    });

    const data = await res.json();
    if (data.error) {
      alert(data.error);
      return;
    }

    portfolioCards = data.cards || [];
    renderPortfolio();
    nameInput.value = '';
    nameInput.focus();
  } catch (e) {
    alert('Failed to add card: ' + e.message);
  }
}

async function removeCard(index) {
  try {
    const res = await fetch(`/api/portfolio/${index}`, {
      method: 'DELETE'
    });

    const data = await res.json();
    if (data.error) {
      alert(data.error);
      return;
    }

    portfolioCards = data.cards || [];
    renderPortfolio();
  } catch (e) {
    alert('Failed to remove card: ' + e.message);
  }
}

async function resetPortfolio() {
  if (!confirm('Reset portfolio to default cards?')) return;

  try {
    const res = await fetch('/api/portfolio/reset', {
      method: 'POST'
    });

    const data = await res.json();
    portfolioCards = data.cards || [];
    renderPortfolio();
  } catch (e) {
    alert('Failed to reset portfolio: ' + e.message);
  }
}

// ── Search ──
async function searchOffers() {
  // No API key input UI; rely on server-configured GEMINI_API_KEY.
  const apiKey = '';
  const category = document.getElementById('category').value;
  const customQuery = document.getElementById('customQuery').value.trim();

  if (portfolioCards.length === 0) {
    alert('Please add at least one credit card to your portfolio.');
    return;
  }

  showLoading(portfolioCards.length);
  document.getElementById('searchBtn').disabled = true;

  try {
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        category: category,
        custom_query: customQuery
      })
    });

    const data = await res.json();

    if (data.error) {
      showError(data.error);
    } else {
      renderResults(data);
    }
  } catch (e) {
    showError('Failed to connect to server: ' + e.message);
  } finally {
    document.getElementById('searchBtn').disabled = false;
  }
}

// ── UI Rendering ──
function showLoading(cardCount) {
  document.getElementById('results').innerHTML = `
    <div class="loading-state">
      <div class="ticker"><span>◈ SEARCHING ${cardCount} CARD${cardCount !== 1 ? 'S' : ''} · HDFC SMARTBUY · AXIS BANK OFFERS · ICICI IMINE · CARD INSIDER · DEAL4LOANS · BANK OFFICIAL PAGES ◈</span></div>
      <div class="progress-bar"><div class="progress-fill"></div></div>
      <div class="loading-label">Agent searching via Gemini in real-time…</div>
    </div>`;
}

function showError(message) {
  document.getElementById('results').innerHTML = `
    <div class="error-box">
      <strong>Error:</strong> ${escapeHtml(message)}<br/><br/>
      Common fixes:<br/>
      · Check your API key is correct and starts with "AIza"<br/>
      · Make sure the key has Gemini API access enabled<br/>
      · Get a free key at <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color:var(--teal)">aistudio.google.com</a>
    </div>`;
}

function renderResults(data) {
  const offers = data.offers || [];
  if (!offers.length) {
    document.getElementById('results').innerHTML =
      `<div class="error-box">No offers found. Try a different category or check your API key.</div>`;
    return;
  }

  const totalValue = data.total_estimated_value ||
    offers.reduce((s, o) => s + (Number(o.value_estimate) || 0), 0);

  const lowEffort = offers.filter(o => o.effort_level === 'Low').length;
  const topValue = Math.max(...offers.map(o => Number(o.value_estimate) || 0));

  let html = `
    <div class="summary-bar">
      <div class="summary-stat">
        <span class="val">${offers.length}</span>
        <span class="lbl">Offers Found</span>
      </div>
      <div class="summary-stat">
        <span class="val">₹${totalValue.toLocaleString('en-IN')}</span>
        <span class="lbl">Total Est. Value</span>
      </div>
      <div class="summary-stat">
        <span class="val">₹${topValue.toLocaleString('en-IN')}</span>
        <span class="lbl">Best Single Offer</span>
      </div>
      <div class="summary-stat">
        <span class="val">${lowEffort}</span>
        <span class="lbl">Easy Wins (Low Effort)</span>
      </div>
    </div>
    <div class="offers-grid">`;

  offers.forEach((o, i) => {
    const effortClass = `pill-effort-${(o.effort_level || 'low').toLowerCase()}`;
    const steps = (o.action_steps || []).map(s => `<li>${escapeHtml(s)}</li>`).join('');
    const val = Number(o.value_estimate) || 0;

    html += `
      <div class="offer-card" style="animation:fadeIn 0.3s ease ${i * 0.05}s both">
        <div class="offer-rank">#${o.rank || i + 1}</div>
        <div class="offer-header">
          <div class="offer-issuer">${escapeHtml(o.card)}</div>
          <div class="offer-name">${escapeHtml(o.offer_name)}</div>
          <span class="offer-type-badge">${escapeHtml(o.offer_type)}</span>
        </div>
        <div class="offer-value-band">
          <div class="value-rupee">₹${val.toLocaleString('en-IN')}</div>
          <div class="value-sub">estimated value</div>
        </div>
        <div class="offer-body">
          <p class="offer-desc">${escapeHtml(o.description)}</p>
          <div class="meta-row">
            <span class="meta-pill ${effortClass}">${escapeHtml(o.effort_level)} effort</span>
            <span class="meta-pill pill-expiry">⏱ ${escapeHtml(o.expiration)}</span>
            ${o.activation_required ? '<span class="meta-pill pill-activation">Activation needed</span>' : ''}
          </div>
          ${steps ? `
          <div class="steps-section">
            <div class="steps-label">How to claim</div>
            <ol class="steps-list">${steps}</ol>
          </div>` : ''}
        </div>
      </div>`;
  });

  html += '</div>';

  // Sources
  if (data.sources && data.sources.length) {
    const sourceChips = data.sources
      .filter(s => s && s.startsWith('http'))
      .slice(0, 8)
      .map(s => {
        try {
          const host = new URL(s).hostname.replace('www.', '');
          return `<a class="source-chip" href="${escapeHtml(s)}" target="_blank">${escapeHtml(host)}</a>`;
        } catch { return ''; }
      }).join('');

    if (sourceChips) {
      html += `
        <div class="sources-section">
          <div class="sources-title">Sources searched by agent</div>
          <div class="sources-list">${sourceChips}</div>
        </div>`;
    }
  }

  document.getElementById('results').innerHTML = html;
}

// ── Utility ──
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}