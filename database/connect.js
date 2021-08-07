const mongoose = require('mongoose');
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
};
mongoose.connect('mongodb://localhost:27017/challenge_DataBase', options).then(connect => {
    console.log("=> connect to databse successfully!")
}).catch(err => {
    console.log("=> connect to database with error :")
    console.log(err);
});
