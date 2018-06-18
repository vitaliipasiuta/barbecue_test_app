import { forEach } from 'lodash';
import { addBestOffer, filterKebabsOnly, filterSteaksOnly, freeDrink } from '../../../src/helpers/util';
import * as productsOnlyVegatables '../../fixtures/productsOnlyVegatables.json';
import * as products from '../fixtures/products.json';

describe('#Unit / Helpers', () => {
  describe('/filterSteaksOnly', () => {
    it('should return empty array if empty array given', () => {
      const result = filterSteaksOnly([]);
      expect(result).toHaveLength(0);
    });

    it('should return empty array if no steaks in controllers list', () => {
      const result = filterSteaksOnly(productsOnlyVegatables);
      expect(result).toHaveLength(0);
    });

    it('should return array with one item', () => {
      const result = filterSteaksOnly(products);
      expect(result).toHaveLength(3);
      expect(result[0].title).toEqual('Pork steak');
    });
  });

  describe('/filterKebabsOnly', () => {
    it('should return empty array if empty array given', () => {
      const result = filterKebabsOnly([]);
      expect(result).toHaveLength(0);
    });

    it('should return empty array if no kebabs in controllers list', () => {
      const result = filterKebabsOnly(productsOnlyVegatables);
      expect(result).toHaveLength(0);
    });

    it('should return array with one item', () => {
      const result = filterKebabsOnly(products);
      expect(result).toHaveLength(3);
      expect(result[0].title).toEqual('Pork kebab');
    });
  });

  describe('/addBestOffer', () => {
    it('should return empty array if empty array given', () => {
      const result = addBestOffer([]);
      expect(result).toHaveLength(0);
    });

    it('should return array with best offer items for vegetables', () => {
      const result = addBestOffer(products);
      expect(result).toHaveLength(9);
      let i = 0;
      forEach(products, (product) => {
        if (product.bestOffer) {
          i = i + 1;
        }
      });
      expect(i).toEqual(3);
    });
  });

  describe('/freeDrink', () => {
    it('should return empty array if empty array given', () => {
      const result = addBestOffer([]);
      expect(result).toHaveLength(0);
    });

    it('should return array with free drinks items if weight bigger than 300', () => {
      const result = freeDrink(products);
      expect(result).toHaveLength(9);
      let i = 0;
      forEach(products, (product) => {
        if (product.freeDrink) {
          i = i + 1;
        }
      });
      expect(i).toEqual(7);
    });
  });
});
