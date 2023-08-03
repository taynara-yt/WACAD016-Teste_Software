import request from 'supertest';
import { server } from '../../../index';
import connection from '../../../db/config';

describe('Produto Service', () => {
  beforeAll(async () => {
    await server.bootstrap();
  });

  /**
   * pré requisito para esse teste:
   *
   * cadastrar manualmente um produto no banco de dados via interface MySQL
   * ou via API, mas lembrar de alterar o banco de dados para apontar para bd de teste
   * */
  it('should show all products', async () => {

    const res = await request(server.server)
    .get('/v1/produto');

    console.log(res.status);
    console.log(res.body);

    expect(res.statusCode).toEqual(200);
  });

  /**  implementar - 2,5
   * 
   * pré requisito para esse teste:
   * 
   * cadastrar manualmente um produto no banco de dados via interface MySQL
   * ou via API, mas lembrar de alterar o banco de dados para apontar para bd de teste
  it('should get specific product', async () => {
   
  });
  */

  it('should get specific product', async ()=>{
    const idProduto = '851fd104-30a1-11ee-a449-0242ac180002';

    const res = await request(server.server).get(`/v1/produto/${idProduto}`);
    
    expect(res.statusCode).toEqual(200);

    expect(res.body.id).toEqual('851fd104-30a1-11ee-a449-0242ac180002');
    expect(res.body.nome).toEqual('Ergonomic Fresh Mouse');
    expect(res.body.preco).toEqual(119);
    expect(res.body.estoque).toEqual(10);
    
  });

  it('should not authorize adding a new product', async () => {
    const newProduct = {
      nome: 'Elegant Metal Salad',
      preco: 200,
      estoque: 5,
    };

    const res = await request(server.server)
      .post('/v1/produto')
      .send(newProduct);

      console.log('conteudo de res.body:', res.body);

    expect(res.statusCode).toEqual(403);

  });
 

  afterAll(async () => {
    await connection.close();
  });
});



