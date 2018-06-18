import { Router } from 'express';
import { StatusController } from '../controllers/Status';
import { BaseRoute } from './BaseRoute';

export class StatusRoute extends BaseRoute {

  public initRoutes(): Router {
    this.router.get('/', StatusController.getStatus);
    return this.router;
  }
}
