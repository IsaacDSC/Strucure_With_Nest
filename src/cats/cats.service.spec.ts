import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { CatsRepository } from './cats.repository';

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

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: CatsRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(createCat),
            findAll: jest.fn().mockResolvedValue(listCats),
          },
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be return list the cast', async () => {
    const cats = await service.findAll();
    expect(cats).toEqual(listCats);
    expect(cats.length).toEqual(2);
  });

  it('should be create cat', async () => {
    const body = createCat;
    const cat = await service.create(body);
    expect(cat).toEqual(body);
  });

  it('should be not create cat', async () => {
    const body = { ...createCat, extra: 'not' };
    const cat = await service.create(body);
    expect(cat !== (body as any)).toBeTruthy();
  });
});
