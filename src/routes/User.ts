import { Router } from 'express';
import { UserController } from '../controllers/User';
import { BaseRoute } from './BaseRoute';

export class UserRoute extends BaseRoute {
  public initRoutes(): Router {
    this.router.get('/', UserController.getAllUsers);
    this.router.get('/:name', UserController.getUserByName);
    return this.router;
  }
}
