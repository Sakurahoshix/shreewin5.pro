const fs = require('fs');
const registerUrl = 'https://www.shreewin23.com/#/register?invitationCode=68858148815';
const loginUrl = registerUrl;
let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace Footer
const footerStart = html.indexOf('<footer class="footer">');
const footerEnd = html.indexOf('</footer>') + 9;
if (footerStart !== -1 && footerEnd !== -1) {
  const newFooter = `
    <footer class="site-footer">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="./images/logo.png" alt="Shree.Win" class="footer-logo" width="320" height="120" />
          <p>General informational guide about the ShreeWin gaming platform.</p>
          <p>This website is an independent informational resource and is not necessarily the official ShreeWin platform. Availability and features may change.</p>
        </div>
        <div class="footer-links">
          <h4>Games</h4>
          <ul>
            <li><a href="#games">ShreeWin Games</a></li>
            <li><a href="#games">ShreeWin Win Go</a></li>
            <li><a href="#games">ShreeWin K3</a></li>
            <li><a href="#games">ShreeWin TRX</a></li>
            <li><a href="#games">ShreeWin 5D</a></li>
            <li><a href="#games">ShreeWin Moto Racing</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>Account</h4>
          <ul>
            <li><a href="${registerUrl}">ShreeWin Register</a></li>
            <li><a href="${loginUrl}">ShreeWin Login</a></li>
            <li><a href="#app">ShreeWin App Information</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>Information</h4>
          <ul>
            <li><a href="#">Responsible Gaming</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">DMCA Policy</a></li>
            <li><a href="#">Disclaimer</a></li>
            <li><a href="#">Terms and Conditions</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 ShreeWin informational guide. Use gaming services responsibly and only where legally permitted. 18+</p>
      </div>
    </footer>`;
  html = html.substring(0, footerStart) + newFooter + html.substring(footerEnd);
}

// 2. Replace FAQ content
const faqStart = html.indexOf('<div class="faq" id="faqList">');
const faqEndTag = '</div>\n      </section>';
const faqEnd = html.indexOf(faqEndTag, faqStart);

if (faqStart !== -1 && faqEnd !== -1) {
  const newFaqContent = `
        <div class="faq" id="faqList">
          <details open>
            <summary>What is ShreeWin?</summary>
            <p>ShreeWin is a mobile-oriented gaming platform offering several game categories and account-access features.</p>
          </details>
          <details>
            <summary>Is ShreeWin available for Android?</summary>
            <p>Android availability and installation requirements can vary. Check the current platform information before installing an APK.</p>
          </details>
          <details>
            <summary>How can I access ShreeWin?</summary>
            <p>Users may access the platform through a supported app or mobile browser, subject to availability in their region.</p>
          </details>
          <details>
            <summary>What games are available on ShreeWin?</summary>
            <p>Available categories may include Win Go, K3, TRX, 5D and Moto Racing.</p>
          </details>
        </div>
      </section>`;
  html = html.substring(0, faqStart) + newFaqContent + html.substring(faqEnd + faqEndTag.length);
}

// 3. Insert App Info before FAQ
const faqSectionStart = html.indexOf('<section class="section" id="faq">');
if (faqSectionStart !== -1) {
  const appInfoHtml = `
      <section class="section alt" id="app">
        <div class="section-head wide">
          <h2>ShreeWin App — Download Android App</h2>
          <p>The <strong>ShreeWin</strong> app is a mobile gaming platform that can be accessed through supported Android devices and mobile browsers. The platform may include different game categories such as Win Go, K3, TRX, 5D and Moto Racing, depending on the currently available services.</p>
        </div>
        
        <div class="app-info-grid">
          <div class="app-features">
            <h3>ShreeWin App Features</h3>
            <ul class="styled-list">
              <li>Mobile-friendly interface</li>
              <li>Different game categories in one platform</li>
              <li>Account login and registration options</li>
              <li>Game-result and account-history sections</li>
              <li>Support for mobile browser access</li>
              <li>Interface availability may vary by device and region</li>
            </ul>
            <p class="warning-text">Before installing or accessing any third-party APK, users should verify its source, review the requested permissions, and check the applicable terms and local laws.</p>
          </div>
          <div class="app-details">
            <h3>ShreeWin App & APK Information</h3>
            <p>This guide explains general information about accessing ShreeWin through Android devices and mobile browsers. APK availability, file size, supported versions and installation requirements may change over time, so users should verify current information from the platform's available sources.</p>
          </div>
        </div>
      </section>\n\n`;
  html = html.substring(0, faqSectionStart) + appInfoHtml + html.substring(faqSectionStart);
}

// 4. Insert Conclusion after FAQ
// After the new FAQ, we have </section>
const faqSectionEndIndex = html.indexOf('</section>', html.indexOf('id="faq"')) + 10;
if (faqSectionEndIndex !== -1) {
  const conclusionHtml = `\n
      <section class="section" id="conclusion">
        <div class="section-head wide">
          <h2>Conclusion</h2>
          <p>This page provides general information about the <strong>ShreeWin app</strong>, Android access, available game categories and account features. Always review the platform's current terms, privacy information and applicable local regulations before using any gaming service.</p>
          <p class="updated-date">Updated on: September 2, 2026</p>
        </div>
      </section>\n`;
  html = html.substring(0, faqSectionEndIndex) + conclusionHtml + html.substring(faqSectionEndIndex);
}

fs.writeFileSync('index.html', html);
console.log("Updated HTML with App Info, FAQ, Conclusion, and Footer.");
