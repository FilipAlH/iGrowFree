const db = require('../config/connection');

const { Thread, User, LifeStyle, Habit, Quote } = require('../models');
const LifeStyleSeeds = require('./lifestyleseeds.json')
const userData = require('./userData.json');
const habitSeeds = require('./habitSeeds.json')
const quoteSeeds = require('./quoteSeeds.json')
const threadData = require('./threadData.json')


db.once('open', async () => {
    // clean database
    await User.deleteMany({});
    await LifeStyle.deleteMany({})
    await Thread.deleteMany({});
    await Habit.deleteMany({})
    await Quote.deleteMany({})

    const users = await User.create(userData);
    await LifeStyle.create(LifeStyleSeeds)
    await Habit.create(habitSeeds)
    await Quote.create(quoteSeeds)
  
    for (const thread of threadData) {
        await Thread.create({
            ...thread,
            // assign random author to thread
            ThreadAuthor: users[Math.floor(Math.random() * users.length)].id
        });
    };

    console.log('all done!');
    process.exit(0);
});