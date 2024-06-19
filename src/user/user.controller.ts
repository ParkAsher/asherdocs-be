import {
    Body,
    Controller,
    Inject,
    Post,
    Request,
    UseGuards,
    forwardRef,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { CheckEmailDto } from './dtos/check-email.dto';
import { CheckNicknameDto } from './dtos/check-nickname.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
    ) {}

    // 이메일 중복체크
    @Post('email/check')
    async emailCheck(@Body() data: CheckEmailDto) {
        return await this.userService.emailCheck(data);
    }

    // 닉네임 중복체크
    @Post('nickname/check')
    async nicknameCheck(@Body() data: CheckNicknameDto) {
        return await this.userService.nicknameCheck(data);
    }

    // 회원 가입
    @Post('signup')
    async signUp(@Body() data: CreateUserDto) {
        return await this.userService.createUser(data);
    }

    // 로그인
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        const user = req.user;

        const { id, email, nickname } = user;

        const accessToken = await this.authService.createAcessToken(user);

        return { accessToken, nickname };
    }
}
