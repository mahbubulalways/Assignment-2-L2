import { Request, Response } from 'express';
import ZodUserValidation from './users.validation';
import { usersServices } from './users.service';

// users create controller
const createUserController = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    // zod validation here
    const zodValidateData = ZodUserValidation.parse(body);
    const result = await usersServices.createUserService(zodValidateData);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: 'User is not created successfully',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'User is not created successfully',
      error: error,
    });
  }
};

// get users controller
const getUserController = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.getUserService();
    if (!result.length) {
      return res.status(400).json({
        success: false,
        message: 'Users is not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Users is found successfully',
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Users is not found',
      error: error,
    });
  }
};

// get single user
const getSingleUserController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);
    const result = await usersServices.getSingleUserService(id);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    return res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// update user
const updateUserController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);
    const body = req.body;
    const result = await usersServices.updateUserService(id, body);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    return res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// delete user controller
const deleteUserController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);
    const result = await usersServices.deleteUserService(id);
    if (!result.deletedCount) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    return res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// BONUS  PART

// Add New Product in Order

const addOrderController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);
    const body = req.body;
    const result = await usersServices.addProductInOrderService(id, body);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// get user's orders

const getUsersOrder = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);
    const result = await usersServices.getUsersOrders(id);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: {
        orders:result.orders
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// get user all orders price
const getOrderTotalPrice = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);
    const result = await usersServices.getUsersOrdersTotalPrice(id);
    return res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: result,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const usersController = {
  createUserController,
  getUserController,
  getSingleUserController,
  updateUserController,
  deleteUserController,
  addOrderController,
  getUsersOrder,
  getOrderTotalPrice,
};
