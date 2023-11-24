import express from 'express';
import { usersController } from './users.controllers';

const router = express.Router();

router
  .route('/')
  .post(usersController.createUserController)
  .get(usersController.getUserController);

router.route('/:userId')
.get(usersController.getSingleUserController)
.put(usersController.updateUserController)
.delete(usersController.deleteUserController)

// Add New Product in Order
router.route('/:userId/orders')
.put(usersController.addOrderController)
.get(usersController.getUsersOrder)

router.route('/:userId/orders/total-price')
.get(usersController.getOrderTotalPrice)

export const userRoute = router;
