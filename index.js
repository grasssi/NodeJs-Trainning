const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000
// database connection 
require('./database/connect')


//Morgan Config
app.use(morgan('dev'))
// config body parser
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'Hello World! Grassi' })
})
// require routes 
const userApi = require('./routes/userAPi');
const todoApi = require('./routes/todoAPI');
const emailApi = require('./routes/sendEmailSchemaAPI');

app.use('/api/v1', userApi);
app.use('/api/v1',todoApi);
app.use('/api/v1',emailApi);


app.listen(port, () => {
    console.log(`Application listening at http://localhost:${port}`)
})