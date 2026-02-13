# Coastal Farmer API

A robust backend for an e-commerce platform built with Node.js, TypeScript, Express, and MongoDB.

## Features
- **Product CRUD**: Full Create, Read, Update, and Delete operations for products.
- **Image Management**: Seamless integration with Cloudinary for uploading and deleting product images.
- **API Documentation**: Interactive Swagger documentation to explore and test endpoints.
- **Security**: Implementation of Helmet, CORS, and standard Express security practices.
- **Type Safety**: Fully written in TypeScript for predictable and maintainable code.

## Tech Stack
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Cloud Storage**: Cloudinary (for images)
- **Documentation**: Swagger UI

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB (Local or Atlas)
- Cloudinary account

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your credentials:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   NODE_ENV=development
   ```

### Running the App
- **Development**:
  ```bash
  npm run dev
  ```
- **Production**:
  ```bash
  npm run build
  npm start
  ```

## API Endpoints

### Documentation
Access interactive documentation at: `http://localhost:5000/api-docs`

### Products
- `GET /api/products`: Fetch all products
- `POST /api/products`: Create a new product
- `GET /api/products/:id`: Get product details
- `PUT /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product

### Image Upload
- `POST /api/upload`: Upload image to Cloudinary (returns URL)
- `DELETE /api/upload`: Delete image from Cloudinary via URL

## Project Structure
- `src/config`: Configuration files (DB, Cloudinary, etc.)
- `src/controllers`: Request handlers
- `src/models`: Database schemas
- `src/routes`: API endpoints
- `src/utils`: Helper functions and utilities
- `src/app.ts`: Express application setup
- `src/index.ts`: Server entry point
