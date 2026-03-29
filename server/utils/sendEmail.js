const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text) => {
  try {
    const response = await resend.emails.send({
      from: "no-reply@sanyuktparivarrichlifefamily.com",
      to,
      subject,
      text,
    });

    console.log("Email sent:", response);
    return response;

  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
};

module.exports = sendEmail;