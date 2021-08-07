const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000
// database connection 
require('./database/connect')
// reuire model
const User = require('./models/userSchema')

//Morgan Config
app.use(morgan('dev'))
// config body parser
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'Hello World! Grassi' })
})

// get all user
app.get('/users', async (req, res) => {
    const users = await User.find({});
    res.json(users)
})
// get one user by id
app.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json(user);
})
// add one user
app.post('/users', async(req, res) => {
    const createdUser = await User.create(req.body)
    res.json(createdUser);
})
// update user by id
app.put('/users/:id', async(req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body)
    res.json(updatedUser);
})

// delete user by id
app.delete('/users/:id', async(req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'deleted user successfully' });
})

app.listen(port, () => {
    console.log(`Application listening at http://localhost:${port}`)
})