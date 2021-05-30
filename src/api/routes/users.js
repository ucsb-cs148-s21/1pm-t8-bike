const router = require('express').Router();
let User = require('../models/user.model');

// get specific user info from db
router.route('/').get((req,res) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

// get specific user info from db
router.route('/:email').get((req,res) => {
    User.findOne({username: req.params.email})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:email/exists').get((req,res) => {
    User.countDocuments({username: req.params.email}, function (err, count) {
        if (count === 0) {
            const username = req.params.email;
            const bio = "Hello World!";
            const itinerary = [];

            const newUser = new User({username, bio, itinerary});

            newUser.save()
                .then(() => res.json('User created!'))
                .catch(err => res.status(400).json('Error: ' + err));
        }
    })
});

// add a new course to db
router.route('/:email/update-bio').post((req,res) => {
    User.findOne({username: req.params.email})
        .then(user => {
            user.bio = req.body
        
            user.save()
                .then(() => res.json('Bio updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err)); // throws if post was not foun
}); // end add func

// delete a course from db
router.route('/:email/add-course/:id').post((req,res) => {
    User.find(req.params.id)
        .then(post => {
            post.username = req.body.username;
            post.category = req.body.category;
            post.title = req.body.title;
            post.description = req.body.description;
            post.date = Date.parse(req.body.date);
            post.img = req.file.originalname;

            // saving updated post
            post.save()
                .then(() => res.json('Post updated'))
                .catch(err => res.status(400).json('Error: ' + err)); //throws if not all params filled
        })
        .catch(err => res.status(400).json('Error: ' + err)); // throws if post was not found

}); // end add func

module.exports = router;