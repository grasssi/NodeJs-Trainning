const express = require('express');
const router = express.Router();
const Tag = require('../models/tagSchema')
// add one Tag
router.post('/tags', async (req, res) => {
    try {
    const createdTag = await Tag.create(req.body)
    res.json(createdTag);
}
catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
}
})
module.exports = router;
