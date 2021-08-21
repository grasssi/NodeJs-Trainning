const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
//multer Storage Options
const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload')
    },
    filename: (req, file, cb) => {
        const newFilename = Date.now() + path.extname(file.originalname)
        cb(null, newFilename)
    }
})
const fileFilterFunction = (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const allowedExt = ['.jpg', '.png', '.gif', '.jpeg']
    cb(null, allowedExt.includes(fileExt))
}
const maxSize = 1 * 1024 * 1024;
const Multer = multer({
    storage: myStorage, fileFilter: fileFilterFunction, limits: { fileSize: maxSize }
});

router.post('/upload', Multer.single('file'), (req, res) => {
    if (req.file !== undefined) {
        res.send({ message: 'File uploaded succefully' })
    } else {

        res.status(400).json({ message: 'File not uploaded' })
    }
});


router.post('/uploadMultiple', Multer.array('file', 3), (req, res) => {
    if (req.files.length !== 0) {
        res.send({ message: 'File uploaded succefully' })
    } else {

        res.status(400).json({ message: 'File not uploaded' })
    }
});

module.exports = router;