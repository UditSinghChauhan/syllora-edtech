const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  try {
    const ownerEmail = process.env.CONTACT_US_EMAIL || process.env.MAIL_USER

    await mailSender(
      email,
      "We received your message",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )

    await mailSender(
      ownerEmail,
      "New contact form submission",
      `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${firstname} ${lastname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${countrycode} ${phoneNo}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    )

    return res.json({
      success: true,
      message: "Email sent successfully",
    })
  } catch (error) {
    console.error(error)
    console.error(error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}
