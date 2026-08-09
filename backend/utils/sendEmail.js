import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
})

const sendPasswordResetEmail = async (to, resetUrl) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: 'Reset your FeedMe password',
        text: `Reset your password: ${resetUrl}\n\nThis link expires in 1 hour. If you didn't request this, you can ignore this email.`,
        html: `<p>Reset your password by clicking the link below:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>This link expires in 1 hour. If you didn't request this, you can ignore this email.</p>`
    })
}

export { sendPasswordResetEmail }
