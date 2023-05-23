import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/login.user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HashingHelper } from 'src/hashing.service';
@Injectable()
export class AuthService {
    constructor(
        private hashingHelper: HashingHelper,
        private usersService: UsersService,
        private jwtService: JwtService) { }
    async signIn({ email, password }: LoginUserDto) {
        const userFound = await this.usersService.findOneByEmail(email)
        if (!userFound) {
            throw new BadRequestException('Email or password invalid.')
        }
        if(!await this.hashingHelper.compareData(password, userFound.password)){
            throw new BadRequestException('Email or password invalid.')
        }
        const payload = { userEmai: userFound.email, sub: userFound.id }
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
