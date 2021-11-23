const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const threadSchema = new Schema({
  ThreadText: {
    type: String,
    required: 'You need to leave a Thread!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  ThreadAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Thread = model('Thread', threadSchema);

module.exports = Thread;