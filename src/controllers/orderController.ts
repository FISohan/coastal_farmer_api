import { Request, Response } from 'express';
import { Order } from '../models/orderModel';

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({}).sort({ orderDate: -1 }).lean();
        res.json(orders);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private/Admin
export const getOrderById = async (req: Request, res: Response) => {
    try {
        const order = await Order.findById(req.params['id']);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an order
// @route   POST /api/orders
// @access  Private/Admin
export const createOrder = async (req: Request, res: Response) => {
    try {
        const {
            orderType,
            customerName,
            customerPhone,
            customerAddress,
            orderDate,
            items,
            totalAmount,
            status,
            notes,
        } = req.body;

        const order = new Order({
            orderType,
            customerName,
            customerPhone,
            customerAddress,
            orderDate,
            items,
            totalAmount,
            status,
            notes,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update an order
// @route   PUT /api/orders/:id
// @access  Private/Admin
export const updateOrder = async (req: Request, res: Response) => {
    try {
        const {
            orderType,
            customerName,
            customerPhone,
            customerAddress,
            orderDate,
            items,
            totalAmount,
            status,
            notes,
        } = req.body;

        const order = await Order.findById(req.params['id']);

        if (order) {
            order.orderType = orderType ?? order.orderType;
            order.customerName = customerName ?? order.customerName;
            order.customerPhone = customerPhone ?? order.customerPhone;
            order.customerAddress = customerAddress ?? order.customerAddress;
            order.orderDate = orderDate ?? order.orderDate;
            order.items = items ?? order.items;
            order.totalAmount = totalAmount ?? order.totalAmount;
            order.status = status ?? order.status;
            order.notes = notes ?? order.notes;

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update order status
// @route   PATCH /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        const order = await Order.findById(req.params['id']);

        if (order) {
            order.status = status;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete an order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const order = await Order.findById(req.params['id']);

        if (order) {
            await order.deleteOne();
            res.json({ message: 'Order removed' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
