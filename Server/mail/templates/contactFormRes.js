const emailLayout = require("./emailLayout")

exports.contactUsEmail = (
  email,
  firstname,
  lastname,
  message,
  phoneNo,
  countrycode
) => {
  return emailLayout({
    title: "Contact Form Confirmation",
    preheader: "We received your message and will get back to you soon.",
    content: `
      <h2>Contact Form Confirmation</h2>
      <p>Dear ${firstname} ${lastname},</p>
      <p>Thank you for contacting Syllora. We have received your message and will respond as soon as possible.</p>
      <div class="details">
        <p><strong>Name:</strong> ${firstname} ${lastname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${countrycode} ${phoneNo}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>
      <p>We appreciate your interest and will get back to you shortly.</p>
    `,
    footer:
      'Need immediate help? Contact <a href="mailto:info@syllora.com">info@syllora.com</a>.',
  })
}
