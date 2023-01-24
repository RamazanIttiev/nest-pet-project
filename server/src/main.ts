import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { cert, initializeApp } from 'firebase-admin/app';

import { CLIENT_URL } from './shared/constans';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: CLIENT_URL,
		credentials: true,
	});
	app.use(cookieParser());

	await app.listen(3001);
}

initializeApp({
	credential: cert({
		projectId: process.env.PROJECT_ID,
		privateKey: process.env.PRIVATE_KEY,
		clientEmail: process.env.CLIENT_EMAIL,
	}),
});

bootstrap();
