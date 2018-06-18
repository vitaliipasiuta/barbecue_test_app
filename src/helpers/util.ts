import { forEach } from 'lodash';
import { IProduct } from '../models/Product';

const filterSteaksOnly = (products: IProduct[]): IProduct[] => {
  const filteredProducts = [];
  forEach(products, (product) => {
    if (product.title.includes('steak')) {
      filteredProducts.push(product);
    }
  });

  return filteredProducts;
};

const filterKebabsOnly = (products: IProduct[]): IProduct[] => {
  const filteredProducts = [];
  forEach(products, (product) => {
    if (product.title.includes('kebab')) {
      filteredProducts.push(product);
    }
  });

  return filteredProducts;
};

const addBestOffer = (products: IProduct[]): IProduct[] => {
  forEach(products, (product) => {
    if (product.category.title === 'vegetables') {
      product.bestOffer = true;
    }
  });

  return products;
};

const freeDrink = (products: IProduct[]): IProduct[] => {
  forEach(products, (product) => {
    if (product.weight >= 300) {
      product.freeDrink = true;
    }
  });

  return products;
};

export {
  filterSteaksOnly,
  filterKebabsOnly,
  addBestOffer,
  freeDrink,
};
