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
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(data => {
        console.log(data)
        req.session.save(() => {
            req.session.user_id = data.id,
            req.session.username = data.username,
            req.session.loggedIn = true;

            res.json(data)
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.post('/login', (req, res) => {
    User.findOne({
        where:{
            username: req.body.username
        }
    })
    .then((data) => {
        console.log(data)
        if(!data){
            res.status(404).json({ message: 'No user found with this username'})
            return;
        }
        // user verification
        const validPassword = data.checkPassword(req.body.password);
        if(!validPassword){
            res.status(404).json({ message: 'Incorrect password!'})
            return;
        }

        req.session.save(() => {
            req.session.user_id = data.id,
            req.session.username = data.username,
            req.session.loggedIn = true,

            res.status(200).json({ user: data, message: 'You are now logged in!'})
        })
    })
    .catch((err) => {
        res.status(500).json(err)
    })
})

router.post('/logout', (req, res) => {
    if(req.session.loggedIn){
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }
})

module.exports = router