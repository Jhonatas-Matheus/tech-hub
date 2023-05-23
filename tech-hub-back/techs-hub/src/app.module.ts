import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { HashingHelper } from './hashing.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
