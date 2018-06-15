import { BaseRoute } from './BaseRoute';
import { Router } from 'express';
import { StatusController } from '../controllers/Status';

export class StatusRoute extends BaseRoute {

  public initRoutes(): Router {
    this.router.get('/', StatusController.getStatus);
    return this.router;
  }
}
