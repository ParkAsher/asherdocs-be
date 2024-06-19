import { HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { CustomException } from 'src/exceptions/Custom.Exception';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.getUserByEmail(email);

        // 회원이 존재할 때
        if (user) {
            // 비밀번호 비교
            const match = await compare(password, user.password);

            if (match) {
                // 비밀번호 일치
                delete user.password;

                return user;
            } else {
                // 비밀번호 불일치
                return null;
            }
        }

        // 회원이 존재하지 않을 때
        return null;
    }
}
