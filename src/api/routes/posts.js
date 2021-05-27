const router = require('express').Router();
let Post = require('../models/post.model');
//let Comment = require('../models/comment.model');

const multer = require('multer');
//let uuidv4 = require('uuid/v4');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/uploads/')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

// get all posts info from db
router.route('/').get((req,res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
}); // end get all

// get all L&F posts info from db
router.route('/lf').get((req,res) => {
    Post.find({category: "Lost and Found"})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
}); // end get all

router.route('/:email').get((req,res) => {
    Post.find({username: req.params.email})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
}); // end get all

// add a new post to db
router.route('/add').post(upload.single("img"),(req,res) => {
    const username = req.body.username;
    const category = req.body.category;
    const title = req.body.title;
    const description = req.body.description;
    const date = req.body.date;
    //optional to include img
    var img = '';
    if(req.file){
        img = req.file.originalname;
    }
    const comments = [];
    const numComments = 0;

    const newPost = new Post({username,category,title,description,date,img,comments,numComments});

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

router.route('/update/:id').post(upload.single("img"),(req,res) => {
    Post.findById(req.params.id)
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

}); //ends update specific post

// adds a comment
router.route('/update/:id/add-comment').post((req,res) => {
    //args for comment
    Post.findById(req.params.id)
        .then(post => {
            const comment = {
                username: req.body.username,
                description: req.body.description,
                date: Date.parse(req.body.date),
            }
        
            //push comment to comments array
            post.comments = [comment].concat(post.comments);
            post.numComments = post.comments.length;
        
            post.save()
                .then(() => res.json('Comment added!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err)); // throws if post was not found
})

//get all the comments in post and returns it
router.route('/:id/get-comments').get((req,res) => {
    //get the post from id
    Post.findById(req.params.id)
        .then(post => res.json(post.comments)) //if found, return post.comments
        .catch(err => res.status(400).json('Error: ' + err)); //if not, throw err
})

// in future, will add ability to add comments and update numComments
module.exports = router;