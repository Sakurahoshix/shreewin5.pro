const fs = require('fs');
let css = fs.readFileSync('css/styles.css', 'utf8');

const newCSS = `
/* Guide Sections */
.guide-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.guide-content h2 {
  font-size: clamp(2rem, 3vw, 2.5rem);
  margin-bottom: 16px;
}

.guide-content > p {
  color: var(--muted);
  font-size: 1.05rem;
  margin-bottom: 24px;
}

.guide-box {
  background: rgba(2, 18, 65, 0.4);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
}

.guide-box p {
  margin: 0 0 16px;
  font-size: 0.95rem;
  color: var(--muted);
}

.guide-box p:last-child {
  margin-bottom: 0;
}

.guide-box p strong {
  color: #f2c94c;
}

.info-box p strong {
  color: var(--accent-2);
}

.guide-after-login h3 {
  font-size: 1.25rem;
  margin: 24px 0 12px;
  color: var(--ink);
}

.guide-after-login ul {
  list-style: disc;
  padding-left: 20px;
  color: var(--muted);
  margin-bottom: 24px;
}

.guide-after-login ul li {
  margin-bottom: 8px;
}

.guide-btn {
  margin-top: 12px;
}

.guide-image img {
  width: 100%;
  height: auto;
  border-radius: 20px;
  display: block;
}

`;

const mqCSS = `
  .guide-split {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

// Insert desktop CSS
const targetMQ = '@media (max-width: 980px) {';
if (css.includes(targetMQ)) {
  css = css.replace(targetMQ, newCSS + targetMQ);
}

// Insert mobile CSS inside the media query
const targetMQEnd = `  .hero,
  .game-row,
  .why-grid,
  .offer-grid,
  .stats,
  .split,
  .cta-band,
  .footer {
    grid-template-columns: 1fr;
  }`;
  
if (css.includes(targetMQEnd)) {
  css = css.replace(targetMQEnd, targetMQEnd + '\n' + mqCSS);
}

fs.writeFileSync('css/styles.css', css);
console.log("Patched CSS");
