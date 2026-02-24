import { Router } from 'express';
import {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
} from '../controllers/orderController';
import { authMiddleware } from '../middleware/authMiddleware';
import { requiredRole } from '../middleware/roleMiddleware';

const router: Router = Router();

/**
 * @openapi
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerName
 *               - customerPhone
 *             properties:
 *               orderType:
 *                 type: string
 *                 enum: [online, offline]
 *               customerName:
 *                 type: string
 *               customerPhone:
 *                 type: string
 *               customerAddress:
 *                 type: string
 *               orderDate:
 *                 type: string
 *                 format: date-time
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     productName:
 *                       type: string
 *                     unitPrice:
 *                       type: number
 *                     quantity:
 *                       type: number
 *               totalAmount:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, delivered, cancelled]
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created
 */
router.route('/')
    .get(authMiddleware, requiredRole('admin'), getOrders)
    .post(createOrder);

/**
 * @openapi
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order data
 *       404:
 *         description: Order not found
 *   put:
 *     summary: Update an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderType:
 *                 type: string
 *                 enum: [online, offline]
 *               customerName:
 *                 type: string
 *               customerPhone:
 *                 type: string
 *               customerAddress:
 *                 type: string
 *               orderDate:
 *                 type: string
 *                 format: date-time
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     productName:
 *                       type: string
 *                     unitPrice:
 *                       type: number
 *                     quantity:
 *                       type: number
 *               totalAmount:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, delivered, cancelled]
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order updated
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted
 */
router.route('/:id')
    .get(authMiddleware, requiredRole('admin'), getOrderById)
    .put(authMiddleware, requiredRole('admin'), updateOrder)
    .delete(authMiddleware, requiredRole('admin'), deleteOrder);

/**
 * @openapi
 * /api/orders/{id}/status:
 *   patch:
 *     summary: Update order status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, delivered, cancelled]
 *     responses:
 *       200:
 *         description: Order status updated
 *       404:
 *         description: Order not found
 */
router.route('/:id/status')
    .patch(authMiddleware, requiredRole('admin'), updateOrderStatus);

export default router;
