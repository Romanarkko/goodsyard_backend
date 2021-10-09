const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  // ToDo make prettier html of message
  async sendActivatedMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Account activation " + process.env.API_URL,
      text: "",
      html: `
        <div>
          <h1>Account activation</h1>
          <p>Please, use the link below to activate your account to access our product. Note that you will not be able to log back into your account until you have activated it.</p>
          <a href="${link}">${link}</a>
        </div>
      `,
    });
  }
}

module.exports = new MailService();
