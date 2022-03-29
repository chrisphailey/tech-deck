const router = require('express').Router();
const { Post, User, Comment } = require('../../models');


// get all comments
router.get('/', (req, res) => {
    Comment.findAll()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.post('/', (req, res) => {
    if(req.session){
        Comment.create({
            content: req.body.content,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        })
        .then(data => res.json(data))
        .catch(err => {
            res.status(400).json(err)
        });
    }
});

router.delete('/:id', (req, res) => {
    if(req.session){
        Comment.destroy({
            where: {
                id: req.params.id
            },
        })
        .then(comment => {
            if(!comment){
                res.status(404).json({ message: 'No comment found with this id!'})
            }
            res.json(comment)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
})

module.exports = router