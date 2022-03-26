const router = require('express').Router();
const { User } = require('../../models');

// get all users
router.get('/', (req,res) => {
    User.findAll({
        attributes: { exclude: ["password"]}
    })
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

// get single user
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id,
        },
        attributes: {
            exclude: ["password"]
        },
        include: {
            model: "post",
            key: "post_id"
        }
    })
})

module.exports = router