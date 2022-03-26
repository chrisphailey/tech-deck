const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// get single post
router.get('/post/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
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
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        })
        .catch(err => {
            res.status(500).json(err)
        })
    });
})


