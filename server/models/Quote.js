const { Schema, model } = require('mongoose');

const quoteSchema = new Schema({
    description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
        trim: true,
    },
    author: {
        type: String,
        required: true,
    }

})

const Quote = model('Quote', quoteSchema);

module.exports = Quote;
