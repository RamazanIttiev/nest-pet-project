import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';

@Module({
	providers: [UsersService],
	exports: [UsersService],
	imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UsersModule {}
