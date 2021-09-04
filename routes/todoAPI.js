const express = require('express');
const router = express.Router();
const ToDo = require('../models/sendEmailSchema')
const User = require('../models/userSchema')
const passport = require('passport')

//get all todo
router.get('/todos', passport.authenticate('bearer', { session: false }), async (req, res) => {
  try {
    const allTodo = await ToDo.find({});
    res.json(allTodo);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})
//get one todo by id
router.get('/todos/:id', async (req, res) => {
  try {
    const todoId = await ToDo.findById(req.params.id)
    res.json(todoId);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})
// add one todo
router.post('/todos', passport.authenticate('bearer', { session: false }), async (req, res) => {
  try {
    const createdTodo = await ToDo.create(req.body)
    // affect todo to connected user
    await User.findByIdAndUpdate(req.user._id, { $push: { todos: createdTodo._id } }, { new: true })

    res.json(createdTodo);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})
//update todo by id
router.put('/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await ToDo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedTodo);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})
// delete todo by id
router.delete('/todos/:id', async (req, res) => {
  try {
    const deletedTodo = await ToDo.findByIdAndDelete(req.params.id)
    res.json({ message: 'Todo deleted successfuly' });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

// affect tuto to tag
router.put('/tutos/affect/:idTag/:idTuto', async (req, res) => {
  try {
    const updatedTuto = await Tag.findByIdAndUpdate(req.params.idTag, { $push: { tutos: req.params.idTuto } }, { new: true })
    res.json(updatedTuto);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
})


module.exports = router;