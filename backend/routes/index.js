import { Router } from 'express';
import expressWs from 'express-ws';

var router = Router();
expressWs(router);

import { fetchOrders, ordersByDay } from '../controllers/orders';

//router.get('/orders', fetchOrders);
router.ws('/orders/by-day', ordersByDay);
router.ws('/orders', fetchOrders);
  
export default router;
