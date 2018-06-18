/**
 * Application main router
 */
import * as express from 'express';

import { CategoryRoute } from './Category';
import { ProductRoute } from './Product';
import { StatusRoute } from './Status';
import { UserRoute } from './User';

const router = express.Router();

router.use('/status', new StatusRoute().initRoutes());
router.use('/category', new CategoryRoute().initRoutes());
router.use('/user', new UserRoute().initRoutes());
router.use('/product', new ProductRoute().initRoutes());

export {
  router,
};
