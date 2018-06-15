/**
 * Application main router
 */
import * as express from 'express';

import {StatusRoute} from './Status';
import {CategoryRoute} from './Category';
import {UserRoute} from './User';
import {ProductRoute} from './Product';

const router = express.Router();

router.use('/status', new StatusRoute().initRoutes());
router.use('/category', new CategoryRoute().initRoutes());
router.use('/user', new UserRoute().initRoutes());
router.use('/product', new ProductRoute().initRoutes());

export {
  router,
};
