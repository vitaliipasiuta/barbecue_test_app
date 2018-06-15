import { BaseRoute } from './BaseRoute';
import { Router } from 'express';
import { CategoryController } from '../controllers/Category';

export class CategoryRoute extends BaseRoute {

  public initRoutes(): Router {
    this.router.get('/', CategoryController.getAllCategories);
    this.router.get('/:category', CategoryController.getCategoryByTitle);
    return this.router;
  }
}
