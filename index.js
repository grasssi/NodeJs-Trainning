const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

//Morgan Config
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.json({message : 'Hello World! Grassi'})
})

// get all user
app.get('/users', (req, res) => {
    res.json({ message: 'get all users' });
})
// get one user by id
app.get('/users/:id', (req, res) => {
    res.json({ message: 'get one user by id' });
})
// add one user
app.post('/users', (req, res) => {
    res.json({ message: 'user added successfully' });
})
// update user by id
app.put('/users/:id', (req, res) => {
    res.json({ message: 'user updated' });
})

// delete user by id
app.delete('/users/:id', (req, res) => {
    res.json({ message: 'deleted user' });
})

app.listen(port, () => {
    console.log(`Application listening at http://localhost:${port}`)
})