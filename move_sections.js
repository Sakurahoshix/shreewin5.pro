const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The guides start at <section class="section" id="register-guide">
// and end before <section class="cta-band" id="register">
const startTag = '      <section class="section" id="register-guide">';
const endTag = '      <section class="cta-band" id="register">';

const startIndex = html.indexOf(startTag);
const endIndex = html.indexOf(endTag);

if (startIndex === -1 || endIndex === -1) {
  console.log("Could not find the sections to move.");
  process.exit(1);
}

const guidesHTML = html.substring(startIndex, endIndex);

// Remove the guides from the original place
html = html.substring(0, startIndex) + html.substring(endIndex);

// Insert right before <section class="section alt" id="why">
const targetTag = '      <section class="section alt" id="why">';
const targetIndex = html.indexOf(targetTag);

if (targetIndex === -1) {
  console.log("Could not find the target to insert before.");
  process.exit(1);
}

html = html.substring(0, targetIndex) + guidesHTML + html.substring(targetIndex);

fs.writeFileSync('index.html', html);
console.log("Moved sections successfully.");
