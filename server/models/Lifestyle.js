const { Schema, model } = require('mongoose');

const LifeStyleSchema = new Schema(
    {
        LifeStyleType: {
            type: String,
            required: true,

        },

        LifeStyleHabits: [
            {
                Habit: {
                   type: String 
                }
            }
        ]
    }
)

const LifeStyle = model('LifeStyle', LifeStyleSchema)

module.exports = LifeStyle