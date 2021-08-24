const express = require('express');
const router = express.Router();
// reuire model
const User = require('../models/userSchema')
var bcrypt = require('bcrypt');
const saltRounds = 10;
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
    try {
        const user = await User.findById(req.params.id)
        res.json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})
// add one user
router.post('/users', async (req, res) => {
    console.log(req.body);
    try {
        const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
        const createdUser = await User.create({
            firstName: req.body.firstName,
            email: req.body.email,
            age: req.body.age,
            password: hashedPwd,
        });
        res.json(createdUser);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})
// update user by id
router.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updatedUser);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// delete user by id
router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.json({ message: 'deleted user successfully' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// affect todo to user
router.put('/users/affect/:idUser/:idTodo', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.idUser, { $push: { todos: req.params.idTodo } }, { new: true })
        res.json(updatedUser);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})
// desafect id to user
router.put('/users/desaffect/:idUser/:idTodo', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.idUser, { $pull: { todos: req.params.idTodo } }, { new: true })
        res.json(updatedUser);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// get all user
router.get('/users-with-todos', async (req, res) => {
    try {
        const users = await User.find({}).populate('todos', "name -_id createdAt");
        res.json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})


router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ firstName: req.body.firstName });
    console.log(user);
    console.log(req.body.password);
    console.log(user.password);
      if (user) {
        const cmp = await bcrypt.compare(req.body.password, user.password);
        if (cmp) {
          //   ..... further code to maintain authentication like jwt or sessions
          res.send("Auth Successful");
        } else {
          res.send("Wrong username or password.");
        }
      } else {
        res.send("Wrong username or password.");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error Occured");
    }
  });
  

module.exports = router;