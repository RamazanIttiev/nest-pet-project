import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { cert, initializeApp } from 'firebase-admin/app';

import * as serviceAccount from '../firebase-adminsdk.json';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: 'http://localhost:3000',
		credentials: true,
	});
	await app.listen(3001);
}

initializeApp({
	credential: cert({
		projectId: serviceAccount.project_id,
		privateKey: serviceAccount.private_key,
		clientEmail: serviceAccount.client_email,
	}),
});

bootstrap();
