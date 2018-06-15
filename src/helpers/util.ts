import { forEach } from 'lodash';
import { IProduct } from '../models/Product';

const filterSteaksOnly = (products: IProduct[]): IProduct[] => {
  const filteredProducts = [];
  forEach(products, (product) => {
    if (product.title.includes("steak")) {
      filteredProducts.push(product);
    }
  });

  return filteredProducts;
};

const filterKebabsOnly = (products: IProduct[]): IProduct[] => {
  const filteredProducts = [];
  forEach(products, (product) => {
    if (product.title.includes("kebab")) {
      filteredProducts.push(product);
    }
  });

  return filteredProducts;
};

export {
  filterSteaksOnly,
  filterKebabsOnly,
}
