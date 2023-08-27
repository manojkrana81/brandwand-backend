const File = require('../models/file');

const fileUpload = async (req, res) => {

    try {
        const filedata = req.file;
        const file = new File({
            fileType: 'image',
            fileName: filedata.filename,
            uploadedBy: 'admin',
            uploadedDate: Date.now(),
        });

        const newFile = await file.save();
        return res.status(200).json({
            status: 'ok',
            message: 'File uploaded successfully',
            data: newFile,
        });
    }
    catch (err) {
        return res.status(200).json({
            status: 'error',
            message: err.message,
            data: '',
        });
    }
}

const getFiles = async (req, res) => {
    try {
        const { page, limit } = req.body;
        const files = await File.find({}).sort({uploadedDate:-1}).skip(limit * (page - 1)).limit(limit);
        return res.status(200).json({
            status: 'ok',
            message: `Page ${page}'s ${files.length} records`,
            data: files,
        });
    }
    catch (err) {
        return res.status(200).json({
            status: 'error',
            message: err.message,
            data: '',
        });
    }
}
module.exports = {
    fileUpload,
    getFiles,
}