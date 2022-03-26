const router = require('express').Router();
const {User, Post, Comment} = require('../models')

// get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'post_url',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id','post_id', 'post_url', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                },
            }

        ]
    })
    .then(data => {
        const posts = data.map(post => post.get({plain: true}));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        res.status(500).json(err);
    });
})

// get single post
router.get('/post/:id', (req,res) => {
    Post.findOne
})

module.exports = router