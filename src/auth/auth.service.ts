import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

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

    async createAcessToken(user: User) {
        const payload = {
            id: user.id,
            nickname: user.nickname,
        };

        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: '1d',
        });

        return accessToken;
    }
}
