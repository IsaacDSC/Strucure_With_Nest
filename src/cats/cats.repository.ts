import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { Cat } from './cats.interface';

@Injectable()
export class CatsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(cat: Cat) {
    try {
      return await this.prisma.cats.create({
        data: { ...cat },
      });
    } catch (error) {
      return null;
    }
  }
  async findAll() {
    try {
      return await this.prisma.cats.findMany();
    } catch (error) {
      return null;
    }
  }
}
