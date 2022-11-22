import { Express } from 'express';
import supertest, { Response } from 'supertest';
import { bootstrapApp } from '../src/bootstrap-app';
import { dataSource } from '../src/datasource';
import {
  MOCK_TECHNOLOGIES,
  MOCK_TECHNOLOGY_REPOSITORY,
  MOCK_TECHNOLOGY_TYPEORM,
} from './mocks/technology.mock';

describe('AppController (e2e)', () => {
  let app: Express;

  beforeEach(async () => {
    app = bootstrapApp();
    jest.spyOn(dataSource, 'getRepository').mockReturnValue(MOCK_TECHNOLOGY_REPOSITORY);
  });

  it(`/api/technology (GET)`, async () => {
    await supertest(app)
      .get('/api/technology')
      .expect(200)
      .expect((res: Response) => {
        expect(res.body.length).toEqual(4);
      });
  });

  it(`/api/technology/3 (GET)`, async () => {
    await supertest(app)
      .get('/api/technology/3')
      .expect(200)
      .expect((res: Response) => {
        expect(res.body).toEqual(MOCK_TECHNOLOGY_TYPEORM);
      });
  });

  it(`/api/technology/ (POST)`, async () => {
    await supertest(app)
      .post('/api/technology/')
      .send({ name: 'SUPERTEST' })
      .expect(202)
      .expect((res: Response) => {
        expect(res.body.id).toEqual(MOCK_TECHNOLOGIES[MOCK_TECHNOLOGIES.length - 1].id);
      });
  });

  it(`/api/technology/5 (PUT)`, async () => {
    await supertest(app)
      .put('/api/technology/5')
      .send({ name: 'jest-supertest' })
      .expect(200)
      .expect((res: Response) => {
        expect(res.body.id).toEqual(MOCK_TECHNOLOGIES[MOCK_TECHNOLOGIES.length - 1].id);
      });
  });

  it(`/api/technology/5 (DELETE)`, async () => {
    await supertest(app)
      .delete('/api/technology/5')
      .expect(200)
      .expect((res: Response) => {
        expect(res.body.id).toEqual(5);
      });
  });
});
