import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { CheckEmailDto } from './dtos/check-email.dto';
import { CheckNicknameDto } from './dtos/check-nickname.dto';
import { CustomException } from 'src/exceptions/Custom.Exception';

const SALT = 11;

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async emailCheck(data: CheckEmailDto) {
        const { email } = data;

        const user = await this.userRepository.findOneBy({ email });

        if (user) {
            throw new CustomException(
                '이미 존재하는 이메일입니다.',
                HttpStatus.CONFLICT,
            );
        }

        return true;
    }

    async nicknameCheck(data: CheckNicknameDto) {
        const { nickname } = data;

        const user = await this.userRepository.findOneBy({ nickname });

        if (user) {
            throw new CustomException(
                '이미 사용중인 닉네임입니다.',
                HttpStatus.CONFLICT,
            );
        }

        return true;
    }
}
