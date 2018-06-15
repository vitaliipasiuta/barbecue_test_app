import { filterSteaksOnly, filterKebabsOnly } from '../../../src/helpers/util';
import * as products from '../../fixtures/products.json';
import * as productsOnlyVegatables '../../fixtures/productsOnlyVegatables.json';

describe('#Unit / Helpers', () => {
  describe('/filterSteaksOnly', () => {
    it('should return empty array if empty array given',() => {
      const result = filterSteaksOnly([]);
      expect(result).toHaveLength(0);
    });

    it('should return empty array if no steaks in product list',() => {
      const result = filterSteaksOnly(productsOnlyVegatables);
      expect(result).toHaveLength(0);
    });

    it('should return array with one item',() => {
      const result = filterSteaksOnly(products);
      expect(result).toHaveLength(3);
      expect(result[0].title).toEqual('Pork steak');
    });
  });

  describe('/filterKebabsOnly', () => {
    it('should return empty array if empty array given',() => {
      const result = filterKebabsOnly([]);
      expect(result).toHaveLength(0);
    });

    it('should return empty array if no kebabs in product list',() => {
      const result = filterKebabsOnly(productsOnlyVegatables);
      expect(result).toHaveLength(0);
    });

    it('should return array with one item',() => {
      const result = filterKebabsOnly(products);
      expect(result).toHaveLength(3);
      expect(result[0].title).toEqual('Pork kebab');
    });
  });
});
