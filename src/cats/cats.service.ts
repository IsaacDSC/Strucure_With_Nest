import { Injectable } from '@nestjs/common';
import { Cat } from './cats.interface';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  constructor(private readonly repository: CatsRepository) {}

  async create(cat: Cat) {
    return await this.repository.create(cat);
  }

  async findAll(): Promise<Cat[]> {
    return await this.repository.findAll();
  }
}
