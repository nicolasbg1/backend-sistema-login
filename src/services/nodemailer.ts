// emailService.ts
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({

	host: "sandbox.smtp.mailtrap.io",
	port: 2525,
	auth: {
	  user: "5ed995ee2bffa2",
	  pass: "74ee3b9dbef043"
	}
});

export const sendPasswordResetEmail = async (to: string, resetLink: string) => {
	try {
		const mailOptions = {
			from: process.env.EMAIL_USER || 'seu-email@gmail.com',
			to,
			subject: 'Redefinição de Senha',
			text: `Clique no seguinte link para redefinir sua senha: ${resetLink}`,
			html: "<p>Testando.....</p>"
		};

		const result = await transporter.sendMail(mailOptions);
		console.log('E-mail enviado com sucesso:', result);
	} catch (error) {
		console.error('Erro ao enviar e-mail:', error);
		throw error;
	}
};
 