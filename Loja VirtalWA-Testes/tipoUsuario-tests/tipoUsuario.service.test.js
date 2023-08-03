import request from 'supertest';
import { server } from '../../../index';
import connection from '../../../db/config';
import exp from 'constants';
import { TiposUsuarios } from '../tipoUsuario.constants';

describe('tipoUsuario Service', () => {
  beforeAll(async () => {
    await server.bootstrap();
  });

  //  implementar - 2,5
  it('should get all user types', async () => {
    const res = await request(server.server).get('/v1/tipo-usuario');

    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);

    console.log('conteúdo de res.body', res.body);

    const tipoUserEsperados = Object.values(TiposUsuarios);

    // Verifica se os objetos retornados possuem os atributos id e rotulo corretos
    res.body.forEach((tipoUsuario) => {
      expect(tipoUsuario).toHaveProperty('id');
      expect(tipoUsuario).toHaveProperty('rotulo');
    });

    // Verifica se os TiposUsuarios esperados estão presentes nos objetos retornados
    tipoUserEsperados.forEach((id) => {
      const tipoUserEsperado = expect.objectContaining({
        id,
        rotulo: expect.any(String),
      });
      expect(res.body).toContainEqual(tipoUserEsperado);
    });
  });


  afterAll(async () => {
    await connection.close();
  });
});
