import { Schema, model } from 'mongoose';

const orderItemSchema = new Schema({
    productId: { type: String, default: '' },
    productName: { type: String, default: '' },
    unitPrice: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
}, { _id: false });

const orderSchema = new Schema({
    orderType: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline',
    },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerAddress: { type: String, default: '' },
    orderDate: { type: Date, default: Date.now },
    items: { type: [orderItemSchema], default: [] },
    totalAmount: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
        default: 'pending',
    },
    notes: { type: String, default: '' },
}, {
    timestamps: true,
});

export const Order = model('Order', orderSchema);
