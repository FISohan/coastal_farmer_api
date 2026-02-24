import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    unit: { type: String, required: true, default: 'kg' },
    image: { type: String, required: true },
    discount: { type: Number, required: true, default: 0 },
    originalPrice: { type: Number, required: true, default: 0 },
    isPublic: { type: Boolean, required: true, default: false },
}, {
    timestamps: true,
});


export const Product = model('Product', productSchema);
