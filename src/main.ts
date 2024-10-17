import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './exceptions/Custom.ExceptionFilter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalFilters(new CustomExceptionFilter());

    // CORS
    app.enableCors({
        origin: [
            'https://asherdocs-fe.vercel.app/',
            'https://asherdocs-fe-git-master-ashers-projects-3c584865.vercel.app/',
            'https://asherdocs-wfega4m1m-ashers-projects-3c584865.vercel.app/',
            'http://localhost:3000/',
            'https://web-asherdocs-fe-lxcs5vq293f388aa.sel5.cloudtype.app/',
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    await app.listen(5000);
}
bootstrap();
