const router = require('express').Router();
let Comment = require('../models/comment.model');

// get all posts info from db
router.route('/').get((req,res) => {
    Comment.find()
        .then(comments => res.json(comments))
        .catch(err => res.status(400).json('Error: ' + err));

}); // end get all 

// add a new post to db
router.route('/add').post((req,res) => {
    const username = req.body.username;
    const description = req.body.description;
    const date = req.body.date;

    const newComment = new Comment({username,description,date});

    newComment.save()
        .then(() => res.json('Comment added!'))
        .catch(err => res.status(400).json('Error: ' + err));

}); // end add func

// get info of a specific comment
router.route('/:id').get((req,res) => {
    //get the comment from id
    Comment.findById(req.params.id)
        .then(comment => res.json(comment)) //if found, return info
        .catch(err => res.status(400).json('Error: ' + err)); //if not, throw err

}); // end get specific comment

// delete a specific comment
router.route('/:id').delete((req,res) => {
    Comment.findByIdAndDelete(req.params.id)
        .then(() => res.json('Comment deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));

}); //end del specific comment

router.route('/update/:id').post((req,res) => {
    Comment.findById(req.params.id)
        .then(comment => {
            comment.username = req.body.username;
            comment.description = req.body.description;
            comment.date = Date.parse(req.body.date);

            // saving updated post
            comment.save()
                .then(() => res.json('Comment updated'))
                .catch(err => res.status(400).json('Error: ' + err)); //throws if not all params filled
        })
        .catch(err => res.status(400).json('Error: ' + err)); // throws if comment was not found

}); //ends update specific comment

module.exports = router;