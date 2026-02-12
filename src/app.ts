import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

dotenv.config();

const app: Application = express();

// Swagger Configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Coastal Farmer API',
            version: '1.0.0',
            description: 'E-commerce API documentation for Coastal Farmer',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 5000}`,
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
import productRoutes from './routes/productRoutes';
import uploadRoutes from './routes/uploadRoutes';

app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to Coastal Farmer API' });
});

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: process.env.NODE_ENV === 'development' ? err.message : {} });
});

export default app;
