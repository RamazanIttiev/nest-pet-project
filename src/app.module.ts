import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  providers: [AuthService],
})
export class AppModule {}
