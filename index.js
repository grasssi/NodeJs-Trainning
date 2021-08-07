const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

//Morgan Config
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Hello World! Grassi')
})

// get all user
// get one user by id
// add one user
// update user by id
// delete user by id

app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`)
})