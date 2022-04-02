const router = require('express').Router();

const {User, Post} = require('../models')


router.get('/', (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: 
            [
            'id',
            'title',
            'contents',
            'user_id',
            'post_url',
            'createdAt'
        ]
        
    })
    .then(data => {
        if(!data){
            res.status(404).json({ message: 'No user found with this ID!'})
        }
        console.log(data)
        const posts = data.map((post) => post.get({ plain: true }));
        res.render("dashboard", {
            posts,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router;
