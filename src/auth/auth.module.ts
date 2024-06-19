import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthStrategy } from './strategies/local-auth.strategy';

@Module({
    imports: [UserModule, PassportModule, TypeOrmModule.forFeature([User])],
    providers: [AuthService, LocalAuthStrategy],
    exports: [AuthService],
})
export class AuthModule {}
