import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './cats.interface';
import { CreateCatDTO } from './cats.dtos';
import { CatsValidation } from './cats.validate';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly validate: CatsValidation,
  ) {}
  @Post()
  async create(@Body() createCatDTO: CreateCatDTO) {
    const { data, error } = this.validate.create(createCatDTO);
    if (error) {
      return error;
    }
    const created = await this.catsService.create(data as Cat);
    return created;
  }
  @Get()
  async findAll(): Promise<Cat[]> {
    return await this.catsService.findAll();
  }
}
