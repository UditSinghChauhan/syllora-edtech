const emailLayout = require("./emailLayout")

exports.passwordUpdated = (email, name) => {
  return emailLayout({
    title: "Password Update Confirmation",
    preheader: "Your Syllora password was updated successfully.",
    content: `
      <h2>Password Update Confirmation</h2>
      <p>Hey ${name},</p>
      <p>Your password has been successfully updated for <strong>${email}</strong>.</p>
      <p>If you did not request this change, please contact support immediately to secure your account.</p>
    `,
    footer:
      'Need assistance? Contact <a href="mailto:info@syllora.com">info@syllora.com</a>.',
  })
}
