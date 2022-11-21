import { Express } from 'express';
import supertest from 'supertest';
import { bootstrapApp } from '../src/bootstrap-app';

describe('AppController (e2e)', () => {
  let app: Express;

  beforeEach(async () => {
    app = bootstrapApp();
  });

  it('/api/hello (GET)', async () => {
    await supertest(app).get('/api/hello').expect(200).expect('Hello!');
  });
});
