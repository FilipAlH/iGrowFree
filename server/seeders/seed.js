const db = require('../config/connection');
const { User, LifeStyle } = require('../models');
const LifeStyleSeeds = require('./lifestyleseeds.json')
const userData = require('./userData.json');

db.once('open', async () => {
    // clean database
    await User.deleteMany({});
    await LifeStyle.deleteMany({})

    await LifeStyle.create(LifeStyleSeeds)

    // bulk create each model
    const users = await User.insertMany(userData);
    console.log('all done!');
    process.exit(0);
});