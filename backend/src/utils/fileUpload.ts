import { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { ApiError } from './ApiError';
// import { FILE_BASE_PATH } from '../constants';

/**
 * process single file: folder creation, duplicate handling, image → webp
 */
const processSingleFile = async (folderName: string, file: Express.Multer.File) => {
    if (!file) throw new ApiError(400, 'File is required');

    const filePath = file.path;
    const mimeType = file.mimetype;

    // IMAGE → convert to WEBP
    if (mimeType.startsWith('image/') && !file.originalname.endsWith('.webp')) {
        const webpFileName = file.filename.replace(path.extname(file.filename), '.webp');
        const webpPath = path.join(path.dirname(filePath), webpFileName);

        await sharp(filePath).webp({ quality: 80 }).toFile(webpPath);
        fs.unlinkSync(filePath); // remove original

        return `${process.env.FILE_BASE_PATH}${folderName}/${webpFileName}`;
    }

    // OTHER FILES → leave as-is
    return `${process.env.FILE_BASE_PATH}${folderName}/${file.filename}`;
};

/**
 * Generates multer storage dynamically for given folderName
 */
const getStorage = (folderName: string) =>
    multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = path.join(process.cwd(), 'files', folderName);
            if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const baseName = path.basename(file.originalname, ext).replace(/\s+/g, '-').toLowerCase();
            const uniqueName = `${baseName}-${Date.now()}${ext}`;
            cb(null, uniqueName);
        },
    });

/**
 * uploadFile middleware
 * Supports both single and multiple files
 *
 * Usage:
 * Single: uploadFile('users', 'profile_pic')
 * Multiple: uploadFile(['users','adhaar'], ['profile','adhaar'])
 */
export const uploadFile = (
    folders: string | string[],
    fieldNames: string | string[]
) => {
    if (!folders || !fieldNames) throw new Error('Folders and fieldNames are required');

    if (typeof folders === 'string' && typeof fieldNames === 'string') {
        // Single file
        return multer({ storage: getStorage(folders), limits: { fileSize: 50 * 1024 * 1024 } }).single(fieldNames);
    }

    if (Array.isArray(folders) && Array.isArray(fieldNames) && folders.length === fieldNames.length) {
        // Multiple files
        const multerFields = folders.map((folder, index) => ({
            name: fieldNames[index],
            maxCount: 1,
        }));

        // Multer does not support per-field storage out of the box for multiple folders
        // We hack: store all files in temp folder and then move in processFile in service
        const tempFolder = path.join(process.cwd(), 'files', 'temp');
        if (!fs.existsSync(tempFolder)) fs.mkdirSync(tempFolder, { recursive: true });

        return multer({
            storage: multer.diskStorage({
                destination: tempFolder,
                filename: (req, file, cb) => {
                    const ext = path.extname(file.originalname);
                    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, '-').toLowerCase();
                    const uniqueName = `${baseName}-${Date.now()}${ext}`;
                    cb(null, uniqueName);
                }
            })
        }).fields(multerFields);
    }

    throw new Error('Invalid folders or fieldNames');
};

/**
 * process multiple files after upload
 * folderMap = { 'profile_pic': 'users', 'adhaar': 'adhaar' }
 */
export const processFiles = async (reqFiles: any, folderMap: Record<string, string>) => {
    const result: Record<string, string> = {};

    for (const fieldName in reqFiles) {
        const fileArray = reqFiles[fieldName];
        if (!fileArray || fileArray.length === 0) continue;

        const file = fileArray[0];
        const folder = folderMap[fieldName];
        if (!folder) throw new ApiError(500, `Folder mapping missing for ${fieldName}`);

        // move file from temp → correct folder & convert if image
        const targetFolderPath = path.join(process.cwd(), 'files', folder);
        if (!fs.existsSync(targetFolderPath)) fs.mkdirSync(targetFolderPath, { recursive: true });

        const ext = path.extname(file.filename);
        const newFileName = `${path.basename(file.filename, ext)}-${Date.now()}${ext}`;
        const newFilePath = path.join(targetFolderPath, newFileName);

        fs.renameSync(file.path, newFilePath);

        // if image → convert webp
        if (file.mimetype.startsWith('image/') && !file.originalname.endsWith('.webp')) {
            const webpFileName = newFileName.replace(path.extname(newFileName), '.webp');
            const webpPath = path.join(targetFolderPath, webpFileName);

            await sharp(newFilePath).webp({ quality: 80 }).toFile(webpPath);
            fs.unlinkSync(newFilePath);

            result[fieldName] = `${process.env.FILE_BASE_PATH}${folder}/${webpFileName}`;
        } else {
            result[fieldName] = `${process.env.FILE_BASE_PATH}${folder}/${newFileName}`;
        }
    }

    return result;
};
