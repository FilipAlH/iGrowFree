const db = require('../config/connection');
const { Thread, User, LifeStyle } = require('../models');
const LifeStyleSeeds = require('./lifestyleseeds.json')
const userData = require('./userData.json');
const threadData = require('./threadData.json');

db.once('open', async () => {
    // clean database
    await User.deleteMany({});
    await LifeStyle.deleteMany({})
    await Thread.deleteMany({});

    await LifeStyle.create(LifeStyleSeeds)

    // bulk create each model
    const users = await User.insertMany(userData);

    // await Thread.create(threadData);

    for (const thread of threadData){
        await Thread.create({
        ...thread,
        // assign random author to thread
        ThreadAuthor: users[Math.floor(Math.random() * users.length)].id
        });
    };
    console.log('all done!');
    process.exit(0);
});