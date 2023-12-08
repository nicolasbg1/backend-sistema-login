import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../helpers/api-erros';
import jwt from 'jsonwebtoken';

export const auth = async (
	req: Request,
	res: Response,
	next: NextFunction) => {
	// logica

};

// função middleware