const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const saltRounds = 10;
const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: String,
    age: Number,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    todos: [{type: Schema.Types.ObjectId, ref: 'todo'}]
}, {
    versionKey: false,
    timestamps: true
});
//  bcrypt.hash(userSchema.password, saltRounds, (err, hash) => {
//      userSchema.password=hash
//      // Store hash in your password DB.
//     });
    const User = mongoose.model('users', userSchema);
    module.exports = User;
    