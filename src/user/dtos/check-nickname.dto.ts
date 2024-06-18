import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CheckNicknameDto {
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(15)
    nickname: string;
}
