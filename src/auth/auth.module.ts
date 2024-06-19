import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthStrategy } from './strategies/local-auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigService } from 'src/_config/jwt.config.service';

@Module({
    imports: [
        forwardRef(() => UserModule),
        PassportModule,
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useClass: JwtConfigService,
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, LocalAuthStrategy],
    exports: [AuthService],
})
export class AuthModule {}
