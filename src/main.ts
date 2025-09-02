import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API de Inscripciones Estudiantiles')
    .setDescription(
      'API para gestionar las inscripciones de estudiantes universitarios a programas académicos',
    )
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors();
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
      enableDebugMessages: true,
      transform: true,

      exceptionFactory: (errors: ValidationError[]) => {
        let onlyError: string | undefined;

        while (errors.length > 0) {
          const error = errors.shift();

          if (error?.children?.length) {
            errors.push(...error.children);
          } else {
            onlyError = error?.constraints?.[Object.keys(error.constraints)[0]];
            break;
          }
        }
        return new BadRequestException(onlyError);
      },
    }),
  );

  await app.listen(process.env.PORT ?? 4004);

  console.log(
    `Application is running on: http://localhost:${process.env.PORT ?? 4004}`,
  );
}

bootstrap().catch((error) => {
  console.error('Error starting the application:', error);
  process.exit(1);
});
