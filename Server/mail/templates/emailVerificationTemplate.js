const emailLayout = require("./emailLayout")

const otpTemplate = (otp) => {
  return emailLayout({
    title: "OTP Verification Email",
    preheader: `Your Syllora verification code is ${otp}.`,
    content: `
      <h2>OTP Verification Email</h2>
      <p>Dear User,</p>
      <p>Thank you for registering with Syllora. Use the following one-time password to verify your account:</p>
      <div class="otp-box">${otp}</div>
      <p>This OTP is valid for 5 minutes. If you did not request this verification, you can safely ignore this email.</p>
    `,
    footer:
      'Need help? Reply to this email or contact <a href="mailto:info@syllora.com">info@syllora.com</a>.',
  })
}

module.exports = otpTemplate
