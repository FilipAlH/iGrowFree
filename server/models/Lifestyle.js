const { Schema, model } = require('mongoose');

const LifeStyleSchema = new Schema(
    {
        LifeStyleType: {
            type: String,
            required: true,

        },

        LifeStyleHabits: [
            {
                habitName: {
                    type: String,
                    required: true,
                },

                frequency: {
                    type: Number,
                    required: true
                },
            }
        ]
    }
)

const LifeStyle = model('LifeStyle', LifeStyleSchema)

module.exports = LifeStyle