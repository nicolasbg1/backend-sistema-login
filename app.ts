import cors from 'cors';
import express, { Request, Response } from 'express';
import { appRoutes } from './src/routes/routes';

const app = express();
app.use(express.json());

const allowedOrigins = ['http://localhost:3000'];
app.use(
	cors({
		origin: allowedOrigins,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	}),
);
app.use(express.urlencoded({ extended: true }));
app.use(appRoutes);

app.get('*', (req: Request, res: Response) => {
	res.send('Página não  encontrada');
});

const port = 9000;
app.listen(port, () => {
	console.log(`Serviço iniciado na porta ${port}`);
});