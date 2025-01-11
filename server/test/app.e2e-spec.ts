import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/shorten (POST)', async () => {
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    const originalUrl = `https://test.ru/${randomSuffix}`;
    const postResponse = await request(app.getHttpServer())
      .post('/shorten')
      .send({ originalUrl })
      .expect(201);

    expect(postResponse.body).toHaveProperty('shortUrl');
    const shortUrl = postResponse.body.shortUrl;

    const key = shortUrl.substring(shortUrl.lastIndexOf('/') + 1);
    expect(key).toBeDefined();
    expect(key).not.toBe('');
    expect(key.length).toBe(6);

    const getResponse = await request(app.getHttpServer())
      .get(`/${key}`)
      .expect(302);

    expect(getResponse.header).toHaveProperty('location', originalUrl);
  });
});
