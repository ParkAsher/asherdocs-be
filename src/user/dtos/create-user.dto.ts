import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(12)
    password: string;

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(15)
    nickname: string;
}
