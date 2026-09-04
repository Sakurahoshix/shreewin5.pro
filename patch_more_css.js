const fs = require('fs');
let css = fs.readFileSync('css/styles.css', 'utf8');

const newCSS = `
/* App Info & Conclusion */
.app-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.app-features h3, .app-details h3 {
  font-size: 1.4rem;
  margin-bottom: 16px;
  color: var(--ink);
}

.styled-list {
  list-style: none;
  padding: 0;
  margin: 16px 0 24px;
}

.styled-list li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 12px;
  color: var(--muted);
}

.styled-list li::before {
  content: '•';
  color: #f2c94c; /* Gold color */
  position: absolute;
  left: 0;
  font-size: 1.2rem;
  line-height: 1.2;
}

.warning-text {
  font-size: 0.9rem;
  color: #ffd76a;
  background: rgba(255, 215, 106, 0.08);
  padding: 16px;
  border-radius: 8px;
  border-left: 3px solid #f2c94c;
}

.updated-date {
  font-size: 0.9rem;
  color: var(--muted);
  margin-top: 24px;
  opacity: 0.8;
}

/* Site Footer */
.site-footer {
  background: var(--header);
  border-top: 1px solid var(--line);
  padding: 60px 7vw 30px;
  position: relative;
  z-index: 1;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.footer-brand .footer-logo {
  max-width: 200px;
  height: auto;
  margin-bottom: 16px;
}

.footer-brand p {
  color: var(--muted);
  font-size: 0.9rem;
  margin: 0 0 12px;
  max-width: 90%;
}

.footer-links h4 {
  color: var(--ink);
  font-size: 1.15rem;
  margin-bottom: 20px;
  font-weight: 600;
}

.footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links ul li {
  margin-bottom: 12px;
}

.footer-links ul a {
  color: var(--muted);
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links ul a:hover {
  color: #f2c94c; /* Gold on hover */
}

.footer-bottom {
  border-top: 1px solid var(--line);
  padding-top: 24px;
  text-align: center;
}

.footer-bottom p {
  color: var(--muted);
  font-size: 0.85rem;
  margin: 0;
}

`;

const mqCSS = `
  .app-info-grid, .footer-grid {
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
const targetMQEnd = `  .guide-split {
    grid-template-columns: 1fr;
    gap: 32px;
  }`;
  
if (css.includes(targetMQEnd)) {
  css = css.replace(targetMQEnd, targetMQEnd + '\n' + mqCSS);
}

fs.writeFileSync('css/styles.css', css);
console.log("Patched more CSS");
