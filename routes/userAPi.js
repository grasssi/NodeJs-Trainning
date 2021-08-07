const  express = require('express');
const router  = express.Router();
// reuire model
const User = require('../models/userSchema')

// get all user
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})
// get one user by id
router.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json(user);
})
// add one user
router.post('/users', async (req, res) => {
    const createdUser = await User.create(req.body)
    res.json(createdUser);
})
// update user by id
router.put('/users/:id', async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(updatedUser);
})

// delete user by id
router.delete('/users/:id', async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'deleted user successfully' });
})


module.exports = router ;