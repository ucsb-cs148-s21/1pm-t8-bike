const router = require('express').Router();
let Post = require('../models/post.model');

// get all posts info from db
router.route('/').get((req,res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));

}); // end get all 

// add a new post to db
router.route('/add').post((req,res) => {
    const username = req.body.username;
    const category = req.body.category;
    const title = req.body.title;
    const description = req.body.description;
    const date = req.body.date;

    const newPost = new Post({username,category,title,description,date});

    newPost.save()
        .then(() => res.json('Post added!'))
        .catch(err => res.status(400).json('Error: ' + err));

}); // end add func

// get info of a specific post
router.route('/:id').get((req,res) => {
    //get the post from id
    Post.findById(req.params.id)
        .then(post => res.json(post)) //if found, return info
        .catch(err => res.status(400).json('Error: ' + err)); //if not, throw err

}); // end get specific post

// delete a specific post
router.route('/:id').delete((req,res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));

}); //end del specific post

router.route('/update/:id').post((req,res) => {
    Post.findById(req.params.id)
        .then(post => {
            post.username = req.body.username;
            post.category = req.body.category;
            post.title = req.body.title;
            post.description = req.body.description;
            post.date = Date.parse(req.body.date);

            // saving updated post
            post.save()
                .then(() => res.json('Post updated'))
                .catch(err => res.status(400).json('Error: ' + err)); //throws if not all params filled
        })
        .catch(err => res.status(400).json('Error: ' + err)); // throws if post was not found

}); //ends update specific post

// in future, will add ability to add comments and update numComments
module.exports = router;