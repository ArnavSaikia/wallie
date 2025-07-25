const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema({
    name: String,
    url: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;