const express = require('express');
const multer = require('multer');
const path = require('path');
const verifyToken = require('../middleware/verifyToken');

const fileUploadRouter = express();

// Set storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB file size limit
    },
    fileFilter: function (req, file, cb) {

        // Check file types
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, and GIF files are allowed.'));
        }
    }
});

const uploadMiddleware = (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred during upload
            return res.status(200).json({ 
                status: 'error',
                message: err.message,
                data: '' 
            });
        } else if (err) {
            // An error occurred that is not related to Multer
            return res.status(200).json({ 
                status: 'error',
                message: err.message,
                data: '' 
            });
        }

        console.log(req.file);
        next();
    })
}


fileUploadRouter.post('/images', verifyToken, uploadMiddleware, (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'Files uploaded successfully',
        data: ''
    });
});

module.exports = fileUploadRouter;
