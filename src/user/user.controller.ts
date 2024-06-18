import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { CheckEmailDto } from './dtos/check-email.dto';
import { CheckNicknameDto } from './dtos/check-nickname.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // 이메일 중복체크
    @Post('email/check')
    emailCheck(@Body() data: CheckEmailDto) {
        return this.userService.emailCheck(data);
    }

    // 닉네임 중복체크
    @Post('nickname/check')
    nicknameCheck(@Body() data: CheckNicknameDto) {
        return this.userService.nicknameCheck(data);
    }
}
