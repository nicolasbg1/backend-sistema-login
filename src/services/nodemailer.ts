// emailService.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	// Configurações do seu serviço de e-mail (por exemplo, Gmail)
	service: 'gmail',
	auth: {
		user: 'seu-email@gmail.com',
		pass: 'sua-senha',
	},
});

export const sendPasswordResetEmail = async (to: string, resetLink: string) => {
	await transporter.sendMail({
		from: 'seu-email@gmail.com',
		to,
		subject: 'Redefinição de Senha',
		text: `Clique no seguinte link para redefinir sua senha: ${resetLink}`,
	});
};
