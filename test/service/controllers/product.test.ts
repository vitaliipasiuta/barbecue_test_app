import { Request, Response } from 'express';
import * as nock from 'nock';
import * as sinon from 'sinon';

import { App } from '../../../src/App';

import { ProductController } from '../../../src/controllers/Product';
import { Product } from '../../../src/models/Product';

import * as products from '../../unit/fixtures/products.json';
import * as allProductsResponse from '../fixtures/allProductsResponse.json';
import * as request from '../fixtures/request.json';

import * as externalSourceResponse from '../fixtures/externalSourceResponse.json';

describe('#Service / Controllers / Product', () => {
  const sandbox = sinon.sandbox.create();

  let beerHost: string;
  beforeAll(() => {
    App.INIT('test');
    beerHost = <string> App.config.get('beercomua');
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  beforeEach(() => {
    nock.disableNetConnect();
    nock.enableNetConnect('127.0.0.1');
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
    sandbox.restore();
  });

  describe('/getProductById', () => {
    it('should return message when id passed as not a number', async () => {
      const request = <Request> {
        params: {
          id: 'xczc',
        },
      };

      const response = <Response> {
        send: () => {},
      };

      sandbox.stub(Product, 'findOne').returns(null);
      const getSpy = sinon.spy(response, 'send');

      await ProductController.getProductById(request, response);

      sinon.assert.calledOnce(getSpy);
      sinon.assert.calledWith(getSpy, 'Id should be number');
    });

    it('should return null when item with requested id is not exists', async () => {
      const request = <Request> {
        params: {
          id: '51',
        },
      };

      const response = <Response> {
        json: () => {},
      };

      sandbox.stub(Product, 'findOne').returns(null);
      const getSpy = sinon.spy(response, 'json');

      await ProductController.getProductById(request, response);

      sinon.assert.calledOnce(getSpy);
      sinon.assert.calledWith(getSpy, null);
    });

    it('should return data from db when item with requested id exists', async () => {
      const productFromDB = {
        _id: '5b166ca6dae64f569d46297c',
        title: 'Pork steak',
        weight: 400,
        id: 5,
        price: 300,
        category: '5b166779dae64f569d462953',
      };

      const request = <Request> {
        params: {
          id: '5',
        },
      };

      const response = <Response> {
        json: () => {},
      };

      sandbox.stub(Product, 'findOne').returns(productFromDB);
      const getSpy = sinon.spy(response, 'json');

      await ProductController.getProductById(request, response);

      sinon.assert.calledOnce(getSpy);
      sinon.assert.calledWith(getSpy, productFromDB);
    });
  });

  describe('/getAllProducts', () => {
    it('should return nothing when db is empty', async () => {
      const response = <Response> {
        json: () => {},
      };

      const find = { populate: sandbox.stub().returns(null) };
      sandbox.stub(Product, 'find').returns(find);

      const getSpy = sinon.spy(response, 'json');

      await ProductController.getAllProducts(request, response);

      sinon.assert.calledOnce(getSpy);
      sinon.assert.calledWith(getSpy, null);
    });

    it('should return all products response', async () => {
      const response = <Response> {
        json: () => {},
      };

      const find = { populate: sandbox.stub().returns(products) };
      sandbox.stub(Product, 'find').returns(find);

      const getSpy = sinon.spy(response, 'json');

      await ProductController.getAllProducts(request, response);

      sinon.assert.calledOnce(getSpy);
      sinon.assert.calledWith(getSpy, allProductsResponse);
    });
  });

  describe('/getBeer', () => {
    it('should return data from external source', async () => {
      nock(beerHost)
        .get('/beer')
        .reply(200, externalSourceResponse);

      const response = <Response> {
        json: () => {},
      };

      const getSpy = sinon.spy(response, 'json');

      await ProductController.getBeer(request, response);

      sinon.assert.calledOnce(getSpy);
      sinon.assert.calledWith(getSpy, externalSourceResponse);
    });

  });
});
