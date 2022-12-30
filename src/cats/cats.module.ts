import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { CatsController } from './cats.controller';
import { CatsRepository } from './cats.repository';
import { CatsService } from './cats.service';
import { CatsValidation } from './cats.validate';
import { LoggerMiddleware } from './logger.middleware';
@Module({
  imports: [CatsModule],
  controllers: [CatsController],
  providers: [CatsService, PrismaService, CatsRepository, CatsValidation],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
