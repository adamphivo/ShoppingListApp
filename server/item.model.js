const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Item = new Schema ({
    name: {type: String},
    amount: {type: Number},
    isDone: {type: String},
})

module.exports = mongoose.model('Item', Item);