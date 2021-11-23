const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema({
    CommentText: {
        type: String,
        required: 'You need to leave a Comment!',
        minlength: 1,
        maxlength: 280,
        trim: true,
    },
    CommentAuthor: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
})

const Comment = model('Comment', commentSchema);

module.exports = Comment;