import { Router } from 'express';
import { ProductController } from '../controllers/Product';
import { BaseRoute } from './BaseRoute';

export class ProductRoute extends BaseRoute {
  public initRoutes(): Router {
    this.router.get('/', ProductController.getAllProducts);
    this.router.get('/steaksOnly', ProductController.getSteaksOnly);
    this.router.get('/kebabsOnly', ProductController.getKebabsOnly);
    this.router.get('/id/:id', ProductController.getProductById);
    this.router.get('/category/:category', ProductController.getProductByCategory);
    this.router.get('/beer', ProductController.getBeer);
    return this.router;
  }
}
