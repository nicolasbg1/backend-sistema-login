// emailService.ts
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_USER || 'seu-email@gmail.com',
		pass: process.env.EMAIL_PASS || 'sua-senha',
	},
});

export const sendPasswordResetEmail = async (to: string, resetLink: string) => {
	try {
		const mailOptions = {
			from: process.env.EMAIL_USER || 'seu-email@gmail.com',
			to,
			subject: 'Redefinição de Senha',
			text: `Clique no seguinte link para redefinir sua senha: ${resetLink}`,
		};

		const result = await transporter.sendMail(mailOptions);
		console.log('E-mail enviado com sucesso:', result);
	} catch (error) {
		console.error('Erro ao enviar e-mail:', error);
		throw error;
	}
};
