import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { UsersModule } from './users/users.module';

@Module({
  providers: [AuthService],
  controllers: [AppController],
  imports: [UsersModule, AuthModule],
})
export class AppModule {}
