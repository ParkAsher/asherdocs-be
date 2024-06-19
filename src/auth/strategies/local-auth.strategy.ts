import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { CustomException } from 'src/exceptions/Custom.Exception';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
        });
    }

    async validate(username: string, password: string) {
        const user = await this.authService.validateUser(username, password);

        if (!user) {
            throw new CustomException(
                '이메일 또는 비밀번호가 일치하지 않습니다.',
                HttpStatus.UNAUTHORIZED,
            );
        }

        return user;
    }
}
