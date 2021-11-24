const db = require('../config/connection');
const { User, LifeStyle, Habit } = require('../models');
const LifeStyleSeeds = require('./lifestyleseeds.json')
const userData = require('./userData.json');
const habitSeeds = require('./habitSeeds.json')
const quoteSeeds = require('./quotes.json')

db.once('open', async () => {
    // clean database
    await User.deleteMany({});
    await LifeStyle.deleteMany({})
    await Habit.deleteMany({})
    await Quote.deleteMany({})
   

    // bulk create each model
    const users = await User.insertMany(userData);
    await LifeStyle.create(LifeStyleSeeds)
    await Habit.create({habitSeeds})
    await Quote.create({quoteSeeds})
    console.log('all done!');
    process.exit(0);
});