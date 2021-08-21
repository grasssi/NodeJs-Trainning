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
const upload = multer({ storage: myStorage });
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        console.log(req.file);
        res.send({ message: 'File uploaded' })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = router;