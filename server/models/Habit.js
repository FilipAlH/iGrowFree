const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const HabitSchema = new Schema({
    habitName: {
        type: String,
        required: 'Create Habit!',
        minlength: 1,
        maxlength: 280,
        trim: true,
    },
    frequency: {
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
