const emailLayout = require("./emailLayout")

exports.courseEnrollmentEmail = (courseName, name) => {
  return emailLayout({
    title: "Course Registration Confirmation",
    preheader: `You are enrolled in ${courseName}.`,
    content: `
      <h2>Course Registration Confirmation</h2>
      <p>Dear ${name},</p>
      <p>You have successfully registered for <strong>${courseName}</strong>. We are excited to have you on board.</p>
      <p>Please log in to your dashboard to access the course materials and start learning.</p>
      <a class="cta" href="https://Syllora-edtech-project.vercel.app/dashboard">Go to Dashboard</a>
    `,
    footer:
      'Questions? Reach us at <a href="mailto:info@syllora.com">info@syllora.com</a>.',
  })
}
