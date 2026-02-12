import cloudinary from '../config/cloudinary';
import { UploadApiResponse } from 'cloudinary';

/**
 * Upload an image to Cloudinary from a buffer
 * @param fileBuffer - The image file buffer from multer
 * @returns - Promise with secure_url and public_id
 */
export const uploadImage = (fileBuffer: Buffer): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'coastal_farmer' },
            (error, result) => {
                if (error) return reject(error);
                if (result) return resolve(result);
                reject(new Error('Cloudinary upload failed'));
            }
        );
        uploadStream.end(fileBuffer);
    });
};

/**
 * Delete an image from Cloudinary using its public ID
 * @param publicId - The public ID of the image
 * @returns - Promise with deletion result
 */
export const deleteImage = async (publicId: string): Promise<any> => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        throw error;
    }
};

/**
 * Extract public ID from Cloudinary URL
 * @param url - The secure URL of the image
 * @returns - The public ID
 */
export const extractPublicId = (url: string): string | null => {
    try {
        // Example URL: https://res.cloudinary.com/cloud_name/image/upload/v12345/coastal_farmer/image_name.jpg
        const parts = url.split('/');
        const folderAndFile = parts.slice(parts.indexOf('coastal_farmer')).join('/');
        // remove extension
        return folderAndFile.split('.')[0] || null;
    } catch (error) {
        return null;
    }
};
