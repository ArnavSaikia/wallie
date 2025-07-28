const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
    name: String,
    url: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Favourite = mongoose.model('Favourite', favouriteSchema);

module.exports = Favourite;