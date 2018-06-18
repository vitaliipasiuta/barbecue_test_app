import * as sinon from 'sinon';
import * as supertest from 'supertest';

import { App } from '../../../src/App';
import { Server } from '../../../src/Server';

import { Category } from '../../../src/models/Category';
import { Product } from '../../../src/models/Product';

import { ServerInstance } from '../ServerInstance';

import * as allProducts from '../fixtures/allProducts.json';
import * as externalSourceResponse from '../fixtures/externalSourceResponse.json';

describe('#Integration / Product', () => {
  let sandbox: sinon.SinonSandbox;
  let server: Server;

  beforeAll(async () => {
    App.INIT('test');

    const testServerInstance = new ServerInstance();
    server = testServerInstance.server;

    const category = await Category.create({title: 'test_category', _id: '5b27a53799d3b628bf6d1461'});
    await Product.insertMany([
      {title: 'product1', weight: 200, id: 1, price: 100, category: category._id, _id: '5b27a53799d3b628bf6d1462'},
      {title: 'product2', weight: 200, id: 2, price: 200, category: category._id, _id: '5b27a53799d3b628bf6d1463'},
      {title: 'chicken kebab', weight: 300, id: 3, price: 300, category: category._id, _id: '5b27a53799d3b628bf6d1464'},
    ]);

    sandbox = sinon.createSandbox();
  });

  afterAll(async (done) => {
    await Category.remove({});
    await Product.remove({});
    server.close(done);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('/', () => {
    it('should return response with all available products', (done) => {
      supertest(server.express)
        .get('/product')
        .expect(200)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.statusCode).toEqual(200);
          expect(res.body).toHaveLength(3);
          expect(res.body).toEqual(allProducts);
          done();
        });
    });
  });

  describe('/id/:id', () => {
    it('should return response requested by id', (done) => {
      supertest(server.express)
        .get('/product/id/1')
        .expect(200)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.statusCode).toEqual(200);
          expect(res.body).toEqual({
            __v: 0,
            _id: '5b27a53799d3b628bf6d1462',
            category: '5b27a53799d3b628bf6d1461',
            id: 1,
            price: 100,
            title: 'product1',
            weight: 200,
          });
          done();
        });
    });
  });

  describe('/kebabsOnly', () => {
    it('should return response with kebabs only', (done) => {
      supertest(server.express)
        .get('/product/kebabsOnly')
        .expect(200)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.statusCode).toEqual(200);
          expect(res.body).toHaveLength(1);
          expect(res.body).toEqual([{
            __v: 0,
            _id: '5b27a53799d3b628bf6d1464',
            category: '5b27a53799d3b628bf6d1461',
            id: 3,
            price: 300,
            title: 'chicken kebab',
            weight: 300,
          }]);
          done();
        });
    });
  });

  describe('/beer', () => {
    it('should return response from external source', (done) => {
      supertest(server.express)
        .get('/product/beer')
        .expect(200)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.statusCode).toEqual(200);
          expect(res.body).toHaveLength(3);
          expect(res.body).toEqual(externalSourceResponse);
          done();
        });
    });
  });
});
