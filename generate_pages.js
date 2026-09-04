const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Extract the real document head and navigation to avoid losing SEO metadata and canonical tags.
const headMatch = indexHtml.match(/(<head>[\s\S]*?<\/head>)/);
const headAndNav = headMatch ? headMatch[1] : '';

// Extract footer
const footerMatch = indexHtml.match(/(<footer class="site-footer">[\s\S]*?<\/html>)/);
const footerHtml = footerMatch ? footerMatch[1] : '';

const seoBaseUrl = 'https://shreewin1.pro';
const registerUrl = 'https://www.shreewin23.com/#/register?invitationCode=68858148815';
const loginUrl = registerUrl;

function buildSeoHead({ title, description, slug, breadcrumbName, breadcrumbUrl }) {
  const safeTitle = title;
  const safeDescription = description;
  const pageUrl = slug === 'index' ? `${seoBaseUrl}/` : `${seoBaseUrl}/${slug}.html`;
  const breadcrumbList = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${seoBaseUrl}/` },
    { '@type': 'ListItem', position: 2, name: breadcrumbName || safeTitle, item: breadcrumbUrl || pageUrl }
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbList
  };

  return `
    <meta name="description" content="${safeDescription}" />
    <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
    <meta name="author" content="ShreeWin Guide" />
    <link rel="canonical" href="${pageUrl}" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:image" content="${seoBaseUrl}/images/logo.png" />
    <meta property="og:site_name" content="ShreeWin Guide" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
    <meta name="twitter:image" content="${seoBaseUrl}/images/logo.png" />
    <script type="application/ld+json">${JSON.stringify(schema)}</script>
  `;
}

function createPage(title, contentHtml, seoConfig = {}) {
  const pageTitle = seoConfig.pageTitle || title;
  const defaultMeta = {
    title: pageTitle,
    description: `Learn about ${title.toLowerCase()} on this independent ShreeWin guide website. Explore ${title.toLowerCase()} information, app access, login steps, and general platform guidance.`,
    slug: 'index',
    breadcrumbName: title,
    breadcrumbUrl: `${seoBaseUrl}/`
  };

  const seo = { ...defaultMeta, ...seoConfig };
  const seoTags = buildSeoHead(seo);

  let updatedHead = headAndNav
    .replace(/<title>.*?<\/title>/i, `<title>${pageTitle}</title>`)
    .replace(/<meta name="description"[^>]*>\s*/i, '')
    .replace(/<meta name="robots"[^>]*>\s*/i, '')
    .replace(/<meta name="author"[^>]*>\s*/i, '')
    .replace(/<meta name="keywords"[^>]*>\s*/i, '')
    .replace(/<link rel="canonical"[^>]*>\s*/gi, '')
    .replace(/<meta property="og:[^"]+"[^>]*>\s*/gi, '')
    .replace(/<meta name="twitter:[^"]+"[^>]*>\s*/gi, '')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '')
    .replace(/<\/head>/, `${seoTags}\n</head>`)
    .replace(/href="#top"/g, 'href="index.html#top"')
    .replace(/href="#games"/g, 'href="index.html#games"')
    .replace(/href="#why"/g, 'href="index.html#why"')
    .replace(/href="#wallet"/g, 'href="index.html#wallet"')
    .replace(/href="#offers"/g, 'href="index.html#offers"')
    .replace(/href="#faq"/g, 'href="index.html#faq"')
    .replace(/href="#login"/g, `href="${loginUrl}"`)
    .replace(/href="#register"/g, `href="${registerUrl}"`);

  return `
${updatedHead}
<main id="top" style="padding-top: 40px; padding-bottom: 80px; background: var(--header);">
  <section class="section" style="max-width: 800px; margin: 0 auto; background: var(--panel); border-radius: 20px; border: 1px solid var(--line); padding: 40px;">
    <nav class="breadcrumb" aria-label="Breadcrumb" style="margin-bottom: 18px; font-size: 0.9rem; color: var(--muted);">
      <a href="index.html">Home</a>
      <span> / </span>
      <span>${title}</span>
    </nav>
    <div class="legal-topbar" style="display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:24px; flex-wrap:wrap;">
      <a
        class="btn btn-ghost"
        href="index.html"
        aria-label="Go back to the previous page"
        onclick="if (window.history.length > 1 && document.referrer) { event.preventDefault(); window.history.back(); } else { window.location.href='index.html'; }"
      >← Back</a>
      <a class="btn btn-gold" href="index.html" aria-label="Go to the home page">Home</a>
    </div>
    <div class="legal-content">
      ${contentHtml}
    </div>
  </section>
</main>
${footerHtml}
  `;
}

// 1. Responsible Gaming
const responsibleGamingHtml = `
      <h1>Responsible Gaming</h1>
      <p>At ShreeWin Official, we believe online gaming should always remain a form of entertainment and recreation — not a source of financial pressure or emotional stress.</p>
      <p><strong>shreewin1.pro</strong> is an independent informational guide for ShreeWin. We are not the official ShreeWin platform.</p>

      <h2>Our Position on Responsible Gaming</h2>
      <p>We support responsible and balanced gaming habits. Gaming should:</p>
      <ul>
        <li>Be enjoyable</li>
        <li>Remain within personal limits</li>
        <li>Never interfere with daily responsibilities</li>
        <li>Never create financial problems</li>
        <li>Never become emotionally harmful</li>
      </ul>
      <p>If gaming stops feeling entertaining and starts causing stress, frustration, or financial difficulty, it may be time to take a break or seek support.</p>

      <h2>Informational Website Only</h2>
      <p>ShreeWin Official does not operate any gaming or betting services. We are:</p>
      <ul>
        <li>An independent informational website</li>
        <li>Not affiliated with ShreeWin officially</li>
        <li>Not responsible for gaming outcomes</li>
        <li>Not involved in deposits or withdrawals</li>
        <li>Not providing gambling services</li>
      </ul>
      <p>Our content is published only to explain platform features, navigation, login methods, app information, and educational guides.</p>

      <h2>Play Within Your Limits</h2>
      <p>Before participating in any online gaming activity, users should set personal boundaries. Helpful practices include:</p>
      <ul>
        <li>Setting a spending limit</li>
        <li>Taking regular breaks</li>
        <li>Avoiding long continuous sessions</li>
        <li>Tracking gaming time</li>
        <li>Never chasing losses</li>
        <li>Treating gaming as entertainment only</li>
      </ul>
      <p>Responsible players understand that outcomes are never guaranteed.</p>

      <h2>Never Borrow Money for Gaming</h2>
      <p>Users should never:</p>
      <ul>
        <li>Borrow money to play games</li>
        <li>Use essential household funds</li>
        <li>Spend money meant for bills or necessities</li>
        <li>Depend on gaming as an income source</li>
      </ul>
      <p>Gaming should never replace financial planning, work, or personal responsibilities.</p>

      <h2>Gaming and Emotional Health</h2>
      <p>Online gaming should not be used as a way to escape:</p>
      <ul>
        <li>Stress</li>
        <li>Depression</li>
        <li>Anxiety</li>
        <li>Financial problems</li>
        <li>Personal difficulties</li>
      </ul>
      <p>If gaming begins affecting mental well-being or relationships, it is important to step away and seek support from trusted individuals or professional services.</p>

      <h2>18+ Age Restriction</h2>
      <p>ShreeWin is intended only for users who are 18 years of age or older.</p>
      <p>Minors should not create accounts, access gaming services, or participate in any activities related to online gaming platforms. Parents and guardians are encouraged to monitor internet usage and restrict access to gaming-related platforms for underage users.</p>

      <h2>Warning Signs of Problem Gaming</h2>
      <p>Users should pay attention to behaviors such as:</p>
      <ul>
        <li>Spending more money than intended</li>
        <li>Hiding gaming activity</li>
        <li>Ignoring responsibilities</li>
        <li>Playing for extremely long periods</li>
        <li>Feeling stressed after losses</li>
        <li>Trying to recover losses immediately</li>
        <li>Losing control over gaming habits</li>
      </ul>
      <p>Recognizing these signs early can help prevent more serious issues later.</p>

      <h2>Take Breaks Regularly</h2>
      <p>Maintaining balance is important. We encourage users to:</p>
      <ul>
        <li>Take frequent breaks</li>
        <li>Focus on offline activities</li>
        <li>Spend time with family and friends</li>
        <li>Maintain healthy daily routines</li>
        <li>Avoid excessive screen time</li>
      </ul>
      <p>Balanced habits help create a healthier online experience.</p>

      <h2>No Guaranteed Earnings</h2>
      <p>ShreeWin Official does not promote unrealistic earning claims. We do not guarantee:</p>
      <ul>
        <li>Profits</li>
        <li>Winning results</li>
        <li>Financial success</li>
        <li>Gift code rewards</li>
        <li>Bonus outcomes</li>
      </ul>
      <p>Any claims found elsewhere promising "guaranteed income" or "fixed winning tricks" should be approached carefully.</p>

      <h2>Seek Help if Needed</h2>
      <p>If gaming begins negatively affecting your life, finances, emotions, or relationships, consider speaking with:</p>
      <ul>
        <li>Trusted family members</li>
        <li>Friends</li>
        <li>Mental health professionals</li>
        <li>Responsible gaming support organizations</li>
      </ul>
      <p>Seeking help is a positive and responsible decision.</p>

      <h2>External Platforms Disclaimer</h2>
      <p>Our website may mention or discuss third-party gaming platforms for informational purposes. We are not responsible for:</p>
      <ul>
        <li>Platform policies</li>
        <li>Financial transactions</li>
        <li>User losses</li>
        <li>Gameplay outcomes</li>
        <li>Third-party services</li>
      </ul>
      <p>Users interact with external platforms entirely at their own discretion and risk.</p>

      <h2>Contact Us</h2>
      <p>If you have questions regarding this Responsible Gaming policy, you may contact us through the contact page on shreewin1.pro.<br>
      Email: <a href="mailto:support@shreewin1.pro">support@shreewin1.pro</a></p>
`;

// 2. Privacy Policy
const privacyPolicyHtml = `
      <h1>Privacy Policy</h1>
      <p><strong>Affiliate Disclaimer:</strong> This privacy policy applies to <strong>shreewin1.pro</strong>, an independent informational guide website. For the privacy policy of any third-party platform discussed on this website, please refer to that platform directly.</p>
      <p>This privacy policy explains how shreewin1.pro — an independent informational guide — collects, uses, and protects information when you visit this website.</p>
      <p><strong>Last updated: September 2026</strong></p>

      <h2>1. Data We Collect on This Website</h2>
      <p>shreewin1.pro is an informational guide website. We may collect limited information when you visit, including:</p>
      <ul>
        <li><strong>Email addresses:</strong> If you subscribe to our newsletter or submit a contact form.</li>
        <li><strong>Usage data:</strong> Anonymous analytics such as page views, session duration, browser information, and traffic sources.</li>
        <li><strong>Cookies:</strong> Used for website functionality, preferences, and analytics.</li>
      </ul>
      <p>We do not intentionally collect account details, payment information, UPI IDs, or third-party gaming activity data through this website.</p>

      <h2>2. Payment and Financial Data</h2>
      <p>shreewin1.pro does not process deposits, withdrawals, or other financial transactions.</p>
      <p>We do not intentionally collect, store, or transmit UPI IDs, bank account numbers, card details, or other payment information through this website.</p>
      <p>Any financial transaction made through a third-party platform is subject to that platform's own privacy policy and terms.</p>

      <h2>3. Cookies and Tracking</h2>
      <p>shreewin1.pro may use cookies and similar technologies to improve website functionality, remember preferences, and understand how visitors use the website.</p>
      <p>The types of cookies may include:</p>
      <ul>
        <li><strong>Essential Cookies:</strong> Required for basic website functionality.</li>
        <li><strong>Analytics Cookies:</strong> Used to understand visitor activity and website performance.</li>
        <li><strong>Preference Cookies:</strong> Used to remember language, display, and other preference settings.</li>
      </ul>
      <p>You can disable non-essential cookies through your browser settings. Disabling certain cookies may affect some website functionality.</p>

      <h2>4. Your Rights</h2>
      <p>Depending on applicable privacy laws, you may have rights regarding your personal information, including:</p>
      <ul>
        <li><strong>Right to Access:</strong> Request information about personal data we may hold.</li>
        <li><strong>Right to Correction:</strong> Request correction of inaccurate information.</li>
        <li><strong>Right to Deletion:</strong> Request deletion of personal information, subject to applicable legal requirements.</li>
        <li><strong>Right to Withdraw Consent:</strong> Withdraw consent where processing is based on consent.</li>
      </ul>
      <p>To exercise these rights, contact us using the information provided below.</p>

      <h2>5. How We Share Your Data</h2>
      <p>shreewin1.pro does not sell personal information to third parties.</p>
      <p>Information may be shared in limited circumstances, including:</p>
      <ul>
        <li><strong>Service Providers:</strong> Analytics, hosting, email, or website-management providers may process information required to provide their services.</li>
        <li><strong>Legal Requirements:</strong> Information may be disclosed when required by applicable law, court order, or regulatory authority.</li>
        <li><strong>Security:</strong> Information may be processed when necessary to detect, investigate, or prevent abuse, fraud, or security issues.</li>
      </ul>

      <h2>6. Third-Party Websites</h2>
      <p>Our website may contain links to external websites and third-party platforms.</p>
      <p>When you follow an external link, you leave shreewin1.pro and become subject to the privacy policy and terms of the external website. We are not responsible for the privacy practices, security, or data handling of third-party websites.</p>

      <h2>7. Contact Us About Privacy</h2>
      <p>If you have questions about this privacy policy or want to make a privacy-related request, please contact us through the contact information provided on shreewin1.pro.</p>
      <p>Email: <a href="mailto:support@shreewin1.pro">support@shreewin1.pro</a></p>
      <p>We may update this privacy policy periodically to reflect changes to our website, services, or applicable requirements.</p>
      <p>See also: <a href="terms-and-conditions.html">Terms of Service</a> | Contact Us</p>
`;

// 3. DMCA Policy
const dmcaPolicyHtml = `
      <h1>DMCA Policy</h1>
      <p>ShreeWin Official respects the intellectual property rights of others and expects users and contributors to do the same.</p>
      <p>This DMCA Policy explains how copyright-related concerns and content removal requests are handled on our website.</p>
      <p><strong>shreewin1.pro</strong> is an independent informational guide related to ShreeWin. We are not the owner or operator of any third-party platform referenced on this website.</p>

      <h2>Copyright Respect</h2>
      <p>All trademarks, logos, images, graphics, and brand names referenced on this website belong to their respective owners.</p>
      <p>Content published on ShreeWin Official is intended primarily for:</p>
      <ul>
        <li>Educational purposes</li>
        <li>Informational blogging</li>
        <li>Platform awareness</li>
        <li>Tutorial and guide content</li>
      </ul>
      <p>We do not intentionally publish copyrighted material without appropriate context or a legitimate informational purpose.</p>

      <h2>Copyright Infringement Claims</h2>
      <p>If you believe that any content available on shreewin1.pro infringes your copyright or intellectual property rights, you may submit a copyright removal request.</p>
      <p>To help us process your request, please include:</p>
      <ul>
        <li>Your full name</li>
        <li>Your contact email address</li>
        <li>A description of the copyrighted material</li>
        <li>The exact URL(s) of the allegedly infringing content</li>
        <li>Evidence that you own the copyrighted material or are authorised to act on behalf of the copyright owner</li>
        <li>A statement confirming that the information provided is accurate</li>
        <li>Your physical or electronic signature</li>
      </ul>
      <p>Incomplete requests may require additional information or verification before action can be taken.</p>

      <h2>Submit Copyright Requests</h2>
      <p>Please send copyright notices and related concerns to:</p>
      <p>Email: <a href="mailto:support@shreewin1.pro">support@shreewin1.pro</a><br>
      Subject: DMCA Removal Request</p>

      <h2>Review Process</h2>
      <p>Once a valid copyright request is received:</p>
      <ul>
        <li>The request will be reviewed carefully.</li>
        <li>The reported content may be temporarily restricted or removed where appropriate.</li>
        <li>Additional verification may be requested if necessary.</li>
        <li>Appropriate action will be taken based on the circumstances and applicable law.</li>
      </ul>
      <p>We aim to respond to legitimate copyright concerns as quickly as reasonably possible.</p>

      <h2>Fair Use Notice</h2>
      <p>Some content published on this website may include limited use of:</p>
      <ul>
        <li>Logos</li>
        <li>Brand references</li>
        <li>Screenshots</li>
        <li>Interface images</li>
        <li>Publicly available materials</li>
      </ul>
      <p>Such materials may be used for purposes including:</p>
      <ul>
        <li>Commentary</li>
        <li>Education</li>
        <li>Informational explanation</li>
        <li>News or analysis</li>
        <li>User guidance</li>
      </ul>
      <p>Whether a particular use qualifies as fair use depends on the applicable copyright law and the specific circumstances.</p>

      <h2>False or Misleading Claims</h2>
      <p>Submitting false, misleading, or fraudulent copyright notices may have legal consequences under applicable laws.</p>
      <p>Please ensure that all information included in a copyright complaint is accurate and complete.</p>

      <h2>Third-Party Content</h2>
      <p>ShreeWin Official may occasionally reference or link to third-party websites and resources.</p>
      <p>We do not control third-party content and are not responsible for the copyright practices or policies of external websites.</p>

      <h2>Policy Updates</h2>
      <p>We reserve the right to update or modify this DMCA Policy when necessary.</p>
      <p>Users are encouraged to review this page periodically for any changes.</p>

      <h2>Contact Information</h2>
      <p>For copyright-related inquiries, please contact:</p>
      <p>Email: <a href="mailto:support@shreewin1.pro">support@shreewin1.pro</a></p>
`;

// 4. Disclaimer
const disclaimerHtml = `
      <h1>Disclaimer</h1>
      <p>The information provided on ShreeWin Official is published strictly for general educational and informational purposes only.</p>
      <p>We are an independent website that shares guides, tutorials, walkthroughs, and general information related to ShreeWin, including topics such as:</p>
      <ul>
        <li>ShreeWin Login</li>
        <li>ShreeWin Register</li>
        <li>ShreeWin App</li>
        <li>ShreeWin Gift Code</li>
        <li>Customer Support Guides</li>
        <li>Password Reset Information</li>
        <li>Platform Features and Navigation</li>
      </ul>
      <p>While we try our best to keep all content accurate and updated, we do not guarantee the completeness, reliability, or accuracy of any information published on this website. Any action you take based on information found on this site is strictly at your own risk.</p>

      <h2>No Official Affiliation</h2>
      <p>shreewin1.pro is an independent informational and affiliate guide related to ShreeWin. We are not the owner or operator of the ShreeWin platform.</p>
      <p>All trademarks, logos, brand names, images, and game-related visuals belong to their respective owners.</p>
      <p>The use of these names and images is strictly for informational and identification purposes only.</p>

      <h2>Educational Purpose Only</h2>
      <p>This website does not operate any gaming services, betting systems, financial activities, or gambling platforms. We do not:</p>
      <ul>
        <li>Accept deposits</li>
        <li>Process withdrawals</li>
        <li>Manage gaming accounts</li>
        <li>Provide official customer support</li>
        <li>Offer betting services</li>
        <li>Guarantee earnings or profits</li>
      </ul>
      <p>Our content is created only to help users understand publicly available platform features and navigation.</p>

      <h2>Responsible Usage</h2>
      <p>Users are advised to use online gaming platforms responsibly and according to the laws and regulations applicable in their region.</p>
      <p>We do not encourage excessive gaming, financial risk-taking, or illegal activities.</p>
      <p>If you choose to use any third-party gaming platform, please do so carefully and at your own discretion.</p>

      <h2>External Links Disclaimer</h2>
      <p>Our website may contain links to external websites for reference purposes. We do not control or guarantee the content, security, or reliability of any third-party website.</p>
      <p>Visiting external websites linked from our content is done entirely at the user's own risk.</p>

      <h2>Content Accuracy</h2>
      <p>Platform interfaces, features, offers, and promotional information may change over time. Some information published on this website may become outdated due to platform updates.</p>
      <p>We recommend that users verify important details through the relevant official platform sources before making decisions related to registration, payments, or gameplay.</p>

      <h2>Consent</h2>
      <p>By using this website, you agree to this disclaimer and accept its terms.</p>

      <h2>Contact</h2>
      <p>If you have questions regarding this disclaimer, you may contact us through shreewin1.pro.<br>
      Email: <a href="mailto:support@shreewin1.pro">support@shreewin1.pro</a></p>
`;

// 4. Terms and Conditions
const termsHtml = `
      <h1>Terms and Conditions</h1>
      <p>These <strong>ShreeWin terms and conditions</strong> explain the rules for using <strong>shreewin1.pro</strong> and its related website services. By accessing this website, you agree to follow these terms. Please review them carefully before using any information or third-party services referenced on this website.</p>
      <p><strong>Last updated: September 2026</strong></p>

      <h2>1. Eligibility</h2>
      <p>Information on <strong>shreewin1.pro</strong> is intended for adults aged <strong>18 years or older</strong>.</p>
      <p>Users are responsible for ensuring that their use of any third-party gaming or online service is permitted under the laws applicable in their location.</p>
      <p>This website does not create, manage, or operate gaming accounts on behalf of users.</p>

      <h2>2. Third-Party Services</h2>
      <p><strong>shreewin1.pro</strong> is an independent informational website and is not the owner or operator of any third-party gaming platform referenced on this website.</p>
      <p>Information about registration, login, games, payments, withdrawals, promotions, or other platform features is provided for general informational purposes.</p>
      <p>Third-party platforms may have their own:</p>
      <ul>
        <li>Terms and conditions</li>
        <li>Eligibility requirements</li>
        <li>Payment policies</li>
        <li>Verification procedures</li>
        <li>Withdrawal rules</li>
        <li>Privacy policies</li>
        <li>Responsible gaming requirements</li>
      </ul>
      <p>Users should review the applicable third-party terms before using those services.</p>

      <h2>3. Deposits and Payments</h2>
      <p><strong>shreewin1.pro</strong> does not accept deposits or process financial transactions. We do not:</p>
      <ul>
        <li>Process UPI payments</li>
        <li>Store bank account information</li>
        <li>Handle deposits or withdrawals</li>
        <li>Manage user wallets</li>
        <li>Control third-party payment processing</li>
      </ul>
      <p>Any payment made through an external platform is governed by that platform's own terms and payment policies.</p>

      <h2>4. Withdrawals</h2>
      <p><strong>shreewin1.pro</strong> does not process or approve withdrawals.</p>
      <p>Withdrawal limits, processing times, verification requirements, payment methods, and other conditions are determined by the relevant third-party platform.</p>
      <p>Users should verify current withdrawal information directly with the applicable service before making financial decisions.</p>

      <h2>5. Responsible Gaming</h2>
      <p>We support responsible and balanced gaming.</p>
      <p>Real-money gaming may involve financial risk, and users should never consider gaming a guaranteed source of income. Users should:</p>
      <ul>
        <li>Set personal spending limits</li>
        <li>Take regular breaks</li>
        <li>Never chase losses</li>
        <li>Never borrow money for gaming</li>
        <li>Avoid using essential household funds</li>
        <li>Stop if gaming becomes stressful or difficult to control</li>
      </ul>
      <p>Users under 18 should not participate in real-money gaming activities.</p>

      <h2>6. Account Security</h2>
      <p>If you create an account on a third-party platform, you are responsible for keeping your account information secure. Never share:</p>
      <ul>
        <li>Passwords</li>
        <li>OTPs</li>
        <li>Login credentials</li>
        <li>Banking information</li>
        <li>Other sensitive account details</li>
      </ul>
      <p><strong>shreewin1.pro</strong> does not control third-party accounts and cannot guarantee the security or availability of external platforms.</p>

      <h2>7. Prohibited Activities</h2>
      <p>Users should not use this website for unlawful purposes or attempt to:</p>
      <ul>
        <li>Disrupt website functionality</li>
        <li>Gain unauthorised access</li>
        <li>Introduce malicious software</li>
        <li>Scrape or misuse website content</li>
        <li>Impersonate the website or its operators</li>
        <li>Engage in fraudulent activities</li>
      </ul>
      <p>We reserve the right to restrict access where necessary to protect the website and its users.</p>

      <h2>8. Content Accuracy</h2>
      <p>We make reasonable efforts to keep published information current and accurate. However, third-party platforms may change their interfaces, features, rules, payment methods, promotions, or availability without notice.</p>
      <p>Therefore, we do not guarantee that all information will always be complete, current, or error-free.</p>

      <h2>9. Amendments</h2>
      <p>We may update these Terms and Conditions from time to time to reflect changes to our website, content, or applicable requirements.</p>
      <p>The <strong>Last updated</strong> date will be changed when significant revisions are made.</p>
      <p>Continued use of <strong>shreewin1.pro</strong> after an update indicates acceptance of the revised terms.</p>
      <p><strong>See also:</strong> <a href="privacy-policy.html">Privacy Policy</a> | Contact Us</p>
`;

fs.writeFileSync('responsible-gaming.html', createPage('Responsible Gaming', responsibleGamingHtml, {
  pageTitle: 'Responsible Gaming Guide for ShreeWin | Safe Play Information',
  title: 'Responsible Gaming Guide for ShreeWin | Safe Play Information',
  description: 'Read the ShreeWin responsible gaming guide and learn about safe play habits, age limits, emotional well-being, and how to use gaming information responsibly.',
  slug: 'responsible-gaming',
  breadcrumbName: 'Responsible Gaming'
}));
fs.writeFileSync('privacy-policy.html', createPage('Privacy Policy', privacyPolicyHtml, {
  pageTitle: 'Privacy Policy for ShreeWin Guide | Data & Cookie Information',
  title: 'Privacy Policy for ShreeWin Guide | Data & Cookie Information',
  description: 'Review the ShreeWin guide privacy policy covering cookies, analytics, personal data, third-party websites, and user rights.',
  slug: 'privacy-policy',
  breadcrumbName: 'Privacy Policy'
}));
fs.writeFileSync('dmca-policy.html', createPage('DMCA Policy', dmcaPolicyHtml, {
  pageTitle: 'DMCA Policy for ShreeWin Guide | Copyright Notice & Takedown Requests',
  title: 'DMCA Policy for ShreeWin Guide | Copyright Notice & Takedown Requests',
  description: 'Learn how the ShreeWin guide handles copyright notices, DMCA removal requests, fair use, and intellectual property concerns.',
  slug: 'dmca-policy',
  breadcrumbName: 'DMCA Policy'
}));
fs.writeFileSync('disclaimer.html', createPage('Disclaimer', disclaimerHtml, {
  pageTitle: 'Disclaimer for ShreeWin Guide | Independent Information & External Links',
  title: 'Disclaimer for ShreeWin Guide | Independent Information & External Links',
  description: 'Read the ShreeWin informational disclaimer covering third-party sources, platform information, and external website responsibilities.',
  slug: 'disclaimer',
  breadcrumbName: 'Disclaimer'
}));
fs.writeFileSync('terms-and-conditions.html', createPage('Terms and Conditions', termsHtml, {
  pageTitle: 'Terms and Conditions for ShreeWin Guide | Website Use Policy',
  title: 'Terms and Conditions for ShreeWin Guide | Website Use Policy',
  description: 'Review the ShreeWin guide terms and conditions covering eligibility, third-party services, deposits, withdrawals, and responsible use.',
  slug: 'terms-and-conditions',
  breadcrumbName: 'Terms and Conditions'
}));

// Update index.html footer links to point to these files
let newHtml = indexHtml
  .replace('<li><a href="#">Responsible Gaming</a></li>', '<li><a href="responsible-gaming.html">Responsible Gaming</a></li>')
  .replace('<li><a href="#">Privacy Policy</a></li>', '<li><a href="privacy-policy.html">Privacy Policy</a></li>')
  .replace('<li><a href="#">DMCA Policy</a></li>', '<li><a href="dmca-policy.html">DMCA Policy</a></li>')
  .replace('<li><a href="#">Disclaimer</a></li>', '<li><a href="disclaimer.html">Disclaimer</a></li>')
  .replace('<li><a href="#">Terms and Conditions</a></li>', '<li><a href="terms-and-conditions.html">Terms and Conditions</a></li>');

fs.writeFileSync('index.html', newHtml);

console.log("Generated legal pages and linked them.");
