const { Comment } = require('../models');

const commentData = [
    {
        content: 'I find this hard to believe!',
        post_id: 1,
        user_id: 1,
    },
    {
        content: 'Prove it or I am calling the cops',
        post_id: 2,
        user_id: 2,
    },
    {
        content: 'I wanna hear more!  Fantastic',
        post_id: 3,
        user_id: 3,
    },
    {
        content: 'I bet he makes a great stromboli',
        post_id: 4,
        user_id: 4,
    },
    {
        content: 'Eat my dust and smell it too',
        post_id: 3,
        user_id: 4,
    },
]

const seedComments = () => Comment.bulkCreate(commentData, {individualHooks: true});

module.exports = seedComments;