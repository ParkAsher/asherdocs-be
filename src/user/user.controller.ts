import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { CheckEmailDto } from './dtos/check-email.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // 이메일 중복체크
    @Post('email-check')
    emailCheck(@Body() data: CheckEmailDto) {
        return this.userService.emailCheck(data);
    }
}
