const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const registerUrl = 'https://www.shreewin23.com/#/register?invitationCode=68858148815';
const loginUrl = registerUrl;

const guideHtml = `
      <section class="section" id="register-guide">
        <div class="guide-split">
          <div class="guide-content">
            <h2>ShreeWin Register — Create Your Account</h2>
            <p>Creating a new <strong>ShreeWin</strong> account can be completed in a few simple steps. Keep your active mobile number ready before starting the registration process.</p>
            
            <div class="guide-box">
              <p><strong>Step-1.</strong> Open the ShreeWin registration page through the app or your preferred browser.</p>
              <p><strong>Step-2.</strong> Enter your active Indian mobile number with the <strong>+91</strong> country code.</p>
              <p><strong>Step-3.</strong> Create a secure password for your new account.</p>
              <p><strong>Step-4.</strong> Complete the mobile verification process using the OTP received on your registered number.</p>
              <p><strong>Step-5.</strong> If an invitation or promotional code is applicable, enter it in the designated field.</p>
              <p><strong>Step-6.</strong> Review your information and select <strong>Register</strong> to complete account creation.</p>
            </div>

            <div class="guide-box info-box">
              <p><strong>Invitation Code:</strong> 4P55885611</p>
              <p><strong>Registration:</strong> Follow the current terms and requirements shown on the ShreeWin signup page.</p>
            </div>

            <a class="btn btn-gold btn-lg guide-btn" href="${registerUrl}">Register on ShreeWin</a>
          </div>
          <div class="guide-image">
            <img src="./images/app-register.png" alt="ShreeWin register screen on mobile app" width="400" height="800" />
          </div>
        </div>
      </section>

      <section class="section alt" id="login-guide">
        <div class="guide-split">
          <div class="guide-content">
            <h2>ShreeWin Login — How to Sign in to Your Account</h2>
            <p>Accessing your <strong>ShreeWin</strong> account is quick and straightforward. Whether you're using the Android app or visiting the website through your mobile or desktop browser, you can complete the login process in just a few steps.</p>

            <div class="guide-box">
              <p><strong>Step-1.</strong> Open the ShreeWin app or visit the ShreeWin website using your device browser.</p>
              <p><strong>Step-2.</strong> Select the <strong>Login</strong> option from the home screen.</p>
              <p><strong>Step-3.</strong> Enter the registered mobile number you used during account creation.</p>
              <p><strong>Step-4.</strong> Enter the password associated with your ShreeWin account.</p>
              <p><strong>Step-5.</strong> Tap <strong>Login</strong> to securely access your account.</p>
              <p><strong>Step-6.</strong> Once signed in, you can access your account dashboard and available account features.</p>
            </div>

            <div class="guide-after-login">
              <h3>After Login</h3>
              <ul>
                <li>Explore available games</li>
                <li>Check your deposit records</li>
                <li>View your wallet balance</li>
                <li>Review transaction details</li>
                <li>Check your game and account history</li>
              </ul>
              
              <p>If you forgot your password, select <strong>Forgot Password</strong> on the login page. Follow the verification instructions and use the OTP sent to your registered mobile number to create a new password.</p>
              <p>Don't have a ShreeWin account yet? Visit the registration page and complete the signup process using the required details.</p>
            </div>

            <a class="btn btn-gold btn-lg guide-btn" href="${loginUrl}">Login to ShreeWin</a>
          </div>
          <div class="guide-image">
            <img src="./images/app-login.png" alt="ShreeWin login screen on mobile app" width="400" height="800" />
          </div>
        </div>
      </section>

`;

const target = '      <section class="cta-band" id="register">';
if (html.includes(target)) {
  const newHtml = html.replace(target, guideHtml + target);
  fs.writeFileSync('index.html', newHtml);
  console.log("Patched index.html");
} else {
  console.log("Could not find target string.");
}
