const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = 
    [
    {
        username: 'bigMoney',
        email: 'money@money.com',
        password:  'hello1234'
    },
    {
        username: 'teckie123',     
        email: 'teckie@teckie.com',
        password: 'teckdeck'
    },
    {
        username: 'johnny123',
        email: 'johnny@kohnny.com',
        password: 'lolly123'
    },
    {
        username:  'jamie456',
        email: 'jamie@jamie.com',
        password: 'poopoo'
    },
    {
        username: 'lildoggy',  
        email: 'doggy@doggy.com',
        password: 'dogdog1'
    },
]

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true}); 

module.exports = seedUsers
