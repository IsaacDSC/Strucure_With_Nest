import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsValidation } from './cats.validate';

const listCats = [
  {
    id: 'f8d298b6-be0e-4823-af2f-4c5d222834b9',
    name: 'cat01',
    age: 1,
    breed: 'not',
    createdAt: '2022-11-19T16:03:00.425Z',
    updatedAt: '2022-11-19T16:03:00.425Z',
  },
  {
    id: '667f8b4d-30c6-45e3-a8fd-13acf0a6e7c4',
    name: 'cat01',
    age: 1,
    breed: 'not',
    createdAt: '2022-11-19T16:03:30.948Z',
    updatedAt: '2022-11-19T16:03:30.948Z',
  },
];

const createCat = {
  name: 'cat01',
  age: 1,
  breed: 'not',
};

describe('CatsController', () => {
  let controller: CatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(listCats),
            create: jest.fn().mockResolvedValue(createCat),
          },
        },
        CatsValidation,
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be return list the cast', async () => {
    const cats = await controller.findAll();
    expect(cats).toEqual(listCats);
    expect(cats.length).toEqual(2);
  });

  it('should be create cat', async () => {
    const body = createCat;
    const cat = await controller.create(body);
    expect(cat).toEqual(body);
  });

  it('should be create cat', async () => {
    const body = { ...createCat, extra: 'not' };
    const cat = await controller.create(body);
    const catJSON = JSON.parse(cat);
    expect(catJSON[0]).toBeDefined();
    expect(catJSON[0].keys[0]).toBe('extra');
    expect(catJSON[0].message).toBe(`Unrecognized key(s) in object: 'extra'`);
  });
});
