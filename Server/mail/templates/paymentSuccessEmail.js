const emailLayout = require("./emailLayout")

exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
  return emailLayout({
    title: "Payment Confirmation",
    preheader: `Your payment of Rs. ${amount} was received successfully.`,
    content: `
      <h2>Course Payment Confirmation</h2>
      <p>Dear ${name},</p>
      <div class="details">
        <p><strong>Amount:</strong> Rs. ${amount}</p>
        <p><strong>Payment ID:</strong> ${paymentId}</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
      </div>
      <p>Your payment was received successfully and your enrollment is being processed.</p>
    `,
    footer:
      'If you need support, contact <a href="mailto:info@syllora.com">info@syllora.com</a>.',
  })
}
