import { BaseRoute } from './BaseRoute';
import { Router } from 'express';
import { UserController } from '../controllers/User';

export class UserRoute extends BaseRoute {
  public initRoutes(): Router {
    this.router.get('/', UserController.getAllUsers);
    this.router.get('/:name', UserController.getUserByName);
    return this.router;
  }
}
