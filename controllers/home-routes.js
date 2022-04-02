const router = require('express').Router();
const { redirect } = require('express/lib/response');
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
                attributes: ['id','post_id', 'content', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                },
            }

        ]
    })
    .then(data => {
        console.log(data)
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
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'post_url','contents','user_id', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(data => {
        if(!data){
            res.status(404).json({ message: 'No post found with this ID!'})
            return;
        }
        const post = data.get({ plain: true });
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        })
    })
        .catch(err => {
            res.status(500).json(err)
        })
    });

// login
router.get('/login', (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/')
        return;
    }
    res.render('login')
})

// logout
router.post('/logout', (req, res) => {
    if(req.session.loggedIn){
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end
    }
})


module.exports = router