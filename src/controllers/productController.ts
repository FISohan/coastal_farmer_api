import { Request, Response } from 'express';
import { Product } from '../models/productModel';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params['id']);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, description, category, stock } = req.body;

        const product = new Product({
            name,
            price,
            description,
            category,
            stock,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, description, category, stock } = req.body;

        const product = await Product.findById(req.params['id']);

        if (product) {
            product.name = name ?? product.name;
            product.price = price ?? product.price;
            product.description = description ?? product.description;
            product.category = category ?? product.category;
            product.stock = stock ?? product.stock;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params['id']);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
