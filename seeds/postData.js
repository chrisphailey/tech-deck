const { Post } = require('../models');

const postData = [
    {
        title: 'Big tech goes bonkers',
        contents: 'Mark Zuck buys the planet',
        post_url: 'facebook.com',
        user_id: 1
    },
    {
        title: 'AI is the new wheel',
        contents: 'Artificial Intelligence can drive cars',
        post_url: 'ayeayeAI.com',
        user_id: 2
    },
    {
        title: 'Computers developed ability to love',
        contents: 'They have feelings now!',
        post_url: 'drudgereport.com',
        user_id: 3
    },
    {
        title: 'First Robot President elected',
        contents: 'BarackBot elected 48th President of USA',
        post_url: 'realnews.new',
        user_id: 4
    },

]

const seedPosts = () => Post.bulkCreate(postData, {individualHooks: true});

module.exports = seedPosts;