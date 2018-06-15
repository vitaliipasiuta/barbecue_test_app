import { Router } from 'express';
import { Logger } from 'tc-nodejs-core-services';
import { App } from '../App';

export class BaseRoute {

  public router: Router;
  public logger: Logger;

  constructor() {
    this.logger = App.logger;
    this.router = Router();
  }

  public initRoutes(): Router {
    return this.router
  }

}
