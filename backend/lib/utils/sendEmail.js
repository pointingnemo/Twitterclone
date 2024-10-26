import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: 'vnut axdx vlon fnpq'
        }
        
    });
    
    const url = `${process.env.BASE_URL}/api/auth/verify-email/${token}`;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify your email',
        html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`
    };

    await transporter.sendMail(mailOptions);
};
