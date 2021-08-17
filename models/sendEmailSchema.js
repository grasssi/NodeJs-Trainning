const mongoose = require('mongoose');

const sendEmailSchema = new mongoose.Schema({

    to: { type: String, },
    cc: { type: String, },
    bcc: { type: String, },
    bcc: { type: String, },
    subject: { type: String, },
    message: { type: String, },
    attachment: { type: String, },
    date: { type: Date, default: Date.now },

});

const Mail = mongoose.model('Mail', sendEmailSchema);
module.exports = Mail;