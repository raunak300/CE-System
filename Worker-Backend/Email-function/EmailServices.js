const nodemailer = require("nodemailer");

const Uemail = "cesys.connect@gmail.com"
const pass = process.env.PASSWORD;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: Uemail,
        pass: pass,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
(async () => {
    try {
        await transporter.verify();
        console.log("Email server ready.");
    } catch (err) {
        console.error("Email server verification failed:", err);
    }
})();

const sendUserEmail = async (email, role, items_data) => {
    try {
        const plainList = JSON.stringify(items_data, null, 2);

        const info = await transporter.sendMail({
            from: Uemail,
            to: email,
            subject: "Inventory Update",
            text: `Hello ${role},

Your request has been processed. Here are the item details:

${plainList}

Total cost: ₹${100}
Payment: Cash on Delivery

Thank you!`
        });

        console.log("Email sent:", info.messageId);
        return true;

    } catch (err) {
        console.error("Email send failed:", err);
        return false;
    }
};

const sendAdminEmail = async(email, role, items_data) => {
 try {
        const plainList = JSON.stringify(items_data, null, 2);

        const info = await transporter.sendMail({
            from: Uemail,
            to: email,
            subject: "Inventory Update",
            text: `Hello ${role},

Your request has been processed. Here are the item details:

${plainList}

Thank you!`
        });

        console.log("Email sent:", info.messageId);
        return true;

    } catch (err) {
        console.error("Email send failed:", err);
        return false;
    }

}
module.exports = {sendUserEmail,sendAdminEmail}
