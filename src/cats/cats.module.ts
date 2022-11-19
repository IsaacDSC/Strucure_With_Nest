import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CatsController } from './cats.controller';
import { CatsRepository } from './cats.repository';
import { CatsService } from './cats.service';
import { CatsValidation } from './cats.validate';
@Module({
  controllers: [CatsController],
  providers: [CatsService, PrismaService, CatsRepository, CatsValidation],
})
export class CatsModule {}
