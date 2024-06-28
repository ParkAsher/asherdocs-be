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
        origin: true,
        credentials: true,
    });

    await app.listen(5000);
}
bootstrap();
