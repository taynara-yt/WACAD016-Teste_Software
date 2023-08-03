import request from 'supertest';
import { server } from '../../../index';
import connection from '../../../db/config';

describe('Auth Service', () => {
  beforeAll(async () => {
    await server.bootstrap();
  });

  // implementar - 2,5
  it('should sign up user', async () => {
      const randomEmailNumber = Math.random().toFixed(10);

      const res = await request(server.server)
      .post('/v1/signup')
      .send({
        nome: 'Polly Pocket',
        email: `pocket${randomEmailNumber}@gmail.com`,
        senha: '12345678'
      })

      console.log('conteúdo de res.body', res.body);

      expect(res.statusCode).toEqual(201);
      expect(res.body.nome).toEqual('Polly Pocket');
      expect(res.body.email).toEqual(`pocket${randomEmailNumber}@gmail.com`);
  });

   
  afterAll(async () => {
    await connection.close();
  });
});
