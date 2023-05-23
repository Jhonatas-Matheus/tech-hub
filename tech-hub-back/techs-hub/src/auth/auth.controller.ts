import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/login.user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post()
    async handleSignIn(@Body() loginUserDto: LoginUserDto){
        return this.authService.signIn(loginUserDto)
    }
}
