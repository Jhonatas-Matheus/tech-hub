import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from 'src/users/users.providers';
import { HashingHelper } from 'src/hashing.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TechnologiesModule } from 'src/technologies/technologies.module';

@Module({
  imports: [DatabaseModule ,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5m' },
    }),
    TechnologiesModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, ...usersProviders, HashingHelper]
})
export class AuthModule {}
