import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../helpers/api-erros';

const prisma = new PrismaClient();

export class UserController {
	async create(req: Request, res: Response) {
		
		const { name, email, password } = req.body;

		const userExists = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (userExists) {
			throw new BadRequestError('E-mail já existe');
		}

		const hashPassword = await bcrypt.hash(password, 10);

		const newUser = await prisma.user.create({
			data: {
				name,
				email,
				password: hashPassword,
			},
		});

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password: _, ...user } = newUser;

		return res.status(201).json(user);
		
	}

	async login(req: Request, res: Response) {
		
		const { email, password } = req.body;

		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (!user) {
			throw new BadRequestError('E-mail ou senha inválidos');
		}

		const verifyPass = await bcrypt.compare(password, user.password);

		if (!verifyPass) {
			throw new BadRequestError('E-mail ou senha inválidos');
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
			expiresIn: '8h',
		});

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password: _, ...userLogin } = user;

		return res.json({
			user: userLogin,
			token: token,
		});
	}
	

	async getProfile(req: Request, res: Response) {

		// @ts-expect-error
		const userId = req.user.id;

		const userProfile = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		return res.json(userProfile);
	}
}