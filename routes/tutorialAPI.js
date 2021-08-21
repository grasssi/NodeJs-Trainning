const express = require('express');
const router = express.Router();
const Tuto = require('../models/tutorialSchema')
// add one Tutorial
router.post('/tutos', async (req, res) => {
    try {
    const createdTuto = await Tuto.create(req.body)
    res.json(createdTuto);
}
catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
}
})

// affect tag to tuto
router.put('/tutos/affect/:idTuto/:idTag', async (req, res) => {
    try {
        const updatedTuto = await Tuto.findByIdAndUpdate(req.params.idTuto, {$push : {tags : req.params.idTag}}, { new: true })
        res.json(updatedTuto);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})
module.exports = router;
