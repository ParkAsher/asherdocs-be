import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfigService } from './_config/typeorm.config.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: TypeOrmConfigService,
            inject: [ConfigService],
        }),
        UserModule,
        AuthModule,
        CategoryModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
