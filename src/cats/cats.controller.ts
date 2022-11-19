import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './cats.interface';
import { CreateCatDTO } from './cats.dtos';
import { CatsValidation } from './cats.validate';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly validate: CatsValidation,
  ) {}
  @Post()
  async create(@Body() createCatDTO: CreateCatDTO, @Res() res: Response) {
    const { data, error } = this.validate.create(createCatDTO);
    if (error) {
      return res.status(HttpStatus.BAD_REQUEST).send(error);
    }
    const created = await this.catsService.create(data as Cat);
    return res.status(HttpStatus.CREATED).send(created);
  }
  @Get()
  async findAll(): Promise<Cat[]> {
    return await this.catsService.findAll();
  }
}
