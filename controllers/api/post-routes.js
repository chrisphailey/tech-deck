const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// get single post
router.get('/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title','contents', 'post_url','user_id'],
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
        res.json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    })

// add post
router.post('/', (req, res) => {
    if(req.session){
        Post.create({
            title: req.body.title,
            contents: req.body.contents,
            post_url: req.body.post_url,
            user_id: req.session.user_id
        })
        .then(data => {
            console.log('@@@',data)
            res.json(data)
        })
        .catch(err => {
            console.log('@@@',err)
            res.json(err)
        })
    }
})



module.exports = router
