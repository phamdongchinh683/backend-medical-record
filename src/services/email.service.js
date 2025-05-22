const { _emailUser, _emailPass, _emailSender } = require("../global/secretKey");

class EmailService {
  async sendEmail(email, otp) {
    const transporter = nodemailer.createTransport({
      host: smtpEndpoint,
      port: port,
      auth: {
        user: _emailUser,
        pass: _emailPass,
      },
    });

    await transporter.sendMail({
      from: _emailSender,
      to: email,
      subject: "OTP application",
      text: `Remember! Do not share about anyone and the time limit is 60 seconds: ${otp}`,
    });
  }
}

module.exports = new EmailService();
