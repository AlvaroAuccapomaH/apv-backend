import nodemailer from 'nodemailer';

const emailOlvidePassword = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { email, nombre, token } = datos

    const info = await transporter.sendMail({
        from: "APV - Administrador de Pacientes de Veterinaria",
        to: email,
        subject: "Reestable tu Password",
        text: "Reestable tu Password",
        html: `<p>Hola: ${nombre}, has solicitado reestabler tu password. </p>
               <p>Sigue el siguiente enlace para generar un nuevo password:
               <a href="${process.env.FROTEND_URL}/olvide-password/${token}">Reestabler Password</a></p> 
               <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
            `
    })
}

export default emailOlvidePassword