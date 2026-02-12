import { Router, Request, Response } from 'express';
import multer from 'multer';
import { uploadImage, deleteImage, extractPublicId } from '../utils/cloudinaryUtils';

const router: Router = Router();

// Multer configuration: store in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @openapi
 * /api/upload:
 *   post:
 *     summary: Upload an image to Cloudinary
 *     tags: [Images]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                 public_id:
 *                   type: string
 */
router.post('/', upload.single('image'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const result = await uploadImage(req.file.buffer);
        res.status(200).json({
            url: result.secure_url,
            public_id: result.public_id,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @openapi
 * /api/upload:
 *   delete:
 *     summary: Delete an image from Cloudinary
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The secure URL of the image to delete
 *     responses:
 *       200:
 *         description: Image deleted successfully
 */
router.delete('/', async (req: Request, res: Response) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ message: 'Image URL is required' });
        }

        const publicId = extractPublicId(url);
        if (!publicId) {
            return res.status(400).json({ message: 'Invalid Cloudinary URL' });
        }

        const result = await deleteImage(publicId);
        res.status(200).json({ message: 'Image deleted successfully', result });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
