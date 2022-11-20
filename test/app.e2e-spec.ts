import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { randomUUID as uuid } from 'crypto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('"/cats" (POST) -> should be success', async () => {
    const body = {
      name: uuid(),
      age: 2,
      breed: uuid(),
    };
    return request(app.getHttpServer())
      .post('/cats')
      .send(body)
      .expect(201)
      .then((res) => {
        const resJson = JSON.parse(res.text);
        expect(resJson.name).toBe(body.name);
        expect(resJson.age).toBe(body.age);
        expect(resJson.breed).toBe(body.breed);
      });
  });

  it('"/cats" (POST) -> should be error ', async () => {
    const body = {
      name: uuid(),
      age: 2,
      breed: uuid(),
      extra: 'not',
    };
    return request(app.getHttpServer())
      .post('/cats')
      .send(body)
      .expect(201)
      .then((res) => {
        const resJson = JSON.parse(res.text);
        expect(resJson.length).toBe(1);
        expect(resJson[0].keys[0]).toBe('extra');
        expect(resJson[0].code).toBe('unrecognized_keys');
      });
  });

  it('"/cats" (GET) -> should be success', () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .then((res) => {
        const resJson = JSON.parse(res.text);
        expect(resJson.length > 0).toBeTruthy();
      });
  });
});
