const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const habitSchema = new Schema({
    habitName: {
        type: String,
        required: 'Create Habit!',
        minlength: 1,
        maxlength: 280,
        trim: true,
    },
    timeLine: {
        type: String,
        required: 'hourly, daily, weekly ,monthly',
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
})

const Habit = model('Habit', HabitSchema);

module.exports = Habit;