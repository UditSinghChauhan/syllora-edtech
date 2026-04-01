const emailLayout = ({ title, preheader, content, footer }) => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <style>
        body {
          background-color: #f5f7fb;
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: #1f2937;
          margin: 0;
          padding: 24px 12px;
        }
        .wrapper {
          max-width: 600px;
          margin: 0 auto;
        }
        .preheader {
          display: none;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
        }
        .card {
          background-color: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
          border: 1px solid #e5e7eb;
        }
        .brand {
          padding: 28px 24px;
          background: linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%);
          color: #ffffff;
          text-align: left;
        }
        .brand-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 999px;
          background-color: rgba(255, 255, 255, 0.14);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .brand h1 {
          margin: 16px 0 8px;
          font-size: 30px;
          line-height: 1.2;
        }
        .brand p {
          margin: 0;
          color: rgba(255, 255, 255, 0.86);
        }
        .content {
          padding: 32px 24px;
        }
        .content h2 {
          margin-top: 0;
          margin-bottom: 18px;
          font-size: 24px;
          color: #111827;
        }
        .otp-box {
          margin: 24px auto;
          display: inline-block;
          padding: 14px 22px;
          border-radius: 16px;
          background-color: #eff6ff;
          border: 1px solid #bfdbfe;
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 0.2em;
          color: #1d4ed8;
        }
        .cta {
          display: inline-block;
          margin-top: 16px;
          padding: 12px 20px;
          background-color: #facc15;
          color: #111827 !important;
          text-decoration: none;
          border-radius: 10px;
          font-weight: bold;
        }
        .details {
          margin: 20px 0;
          padding: 16px 18px;
          border-radius: 14px;
          background-color: #f8fafc;
          border: 1px solid #e5e7eb;
          text-align: left;
        }
        .details p {
          margin: 8px 0;
        }
        .footer {
          padding: 0 24px 28px;
          color: #6b7280;
          font-size: 14px;
        }
        .footer a {
          color: #1d4ed8;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="preheader">${preheader}</div>
        <div class="card">
          <div class="brand">
            <span class="brand-badge">Syllora</span>
            <h1>Learn. Build. Grow.</h1>
            <p>Full-stack learning experiences for students and instructors.</p>
          </div>
          <div class="content">
            ${content}
          </div>
          <div class="footer">
            ${footer}
          </div>
        </div>
      </div>
    </body>
  </html>`
}

module.exports = emailLayout
