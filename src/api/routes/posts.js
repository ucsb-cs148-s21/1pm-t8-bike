const router = require('express').Router();
const util = require('util');
const express = require('express');
const path = require('path');
let Post = require('../models/post.model');
//let Comment = require('../models/comment.model');
const serviceKey = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');


//let uuidv4 = require('uuid/v4');

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, './public/uploads/')
//     },
//     filename: (req, file, callback) => {
//         let fn = file.originalname.replace(/ /g,"-").split(path.extname(file.originalname))[0] + '-' + Date.now() + path.extname(file.originalname);
//         file.originalname = fn;
//         callback(null, fn)
//     }
// });
//
// const upload = multer({ storage: storage,});

const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    keyFilename: serviceKey,
    projectId: 'bike-testing-1',
});

///storage.getBuckets().then(x => console.log(x));

const storageBucket = storage.bucket('uploads_t8bike1');
const uploadImage = (file) => {return new Promise((resolve, reject) => {
    const {originalname, buffer } = file
    const blob = storageBucket.file(originalname.replace(/ /g,"-").split(path.extname(originalname))[0] + '-' + Date.now() + path.extname(originalname))
    //console.log('blob: ' + blob.name)


    const blobStream = blob.createWriteStream({
        resumable: false
    })
    
    //console.log("after createWriteStream")
    //console.log("blobStream: "+ JSON.stringify(blobStream))
    //console.log(`publicUrl: https://storage.googleapis.com/${bucket.name}/${blob.name}`)
    blobStream.on('finish',() => {
       // console.log("inside blobstream.on finish")
        
        const publicUrl = `https://storage.googleapis.com/${storageBucket.name}/${blob.name}`
        
        //console.log("after making publicUrl: "+ publicUrl)
        resolve(publicUrl)
    })  
    .on('error', () =>{
        reject(`Unable to upload image, something went wrong`)
    })
    .end(buffer)
})};

const deleteImage = (imgUrl) => {return new Promise((resolve,reject) =>{
    var fileName = imgUrl.split("/");
    fileName = fileName.slice(4, fileName.length + 1).join("/");
    storageBucket.file(fileName).delete()
    .then(
        resolve("Image Deleted")
    )
    .catch((e) => {
        reject(e)
    });
  

})};

// get all posts info from db
router.route('/').get((req,res) => {
    Post.find().sort({"date":-1})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
}); // end get all

router.route('/email/:email').get((req,res) => {
    Post.find({username: req.params.email, status: "OPEN"})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
}); // end get all

// get all Announcement posts info from db
router.route('/Announcements').get((req,res) => {
    Post.find({ category: "Announcement" }).sort({"date":-1})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});

// get all Lost and Found posts info from db
router.route('/Lost-And-Founds').get((req,res) => {
    Post.find({ category: 
        "Lost and Found" }).sort({"date":-1})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});

// get all Crash Report posts info from db
router.route('/Crash-Reports').get((req,res) => {
    Post.find({ category: "Crash Report" }).sort({"date":-1})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});

// get all Others posts info from db
router.route('/Others').get((req,res) => {
    Post.find({ category: "Other" }).sort({"date":-1})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});

// get all Open posts info from db
router.route('/Open-Posts').get((req,res) => {
    Post.find({ status: "OPEN" }).sort({"date":-1})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});

// get all Closed posts info from db
router.route('/Closed-Posts').get((req,res) => {
    Post.find({ status: "CLOSED" }).sort({"date":-1})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});

// get all Closed LF posts info from db
router.route('/LF/Closed-Posts').get((req,res) => {
    Post.find({ status: "CLOSED", category: "Lost and Found"}).sort({"date":-1})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});

// get all Open LF posts info from db
router.route('/LF/Open-Posts').get((req,res) => {
    Post.find({ status: "OPEN", category: "Lost and Found"}).sort({"date":-1})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});

// add a new post to db and returns id
router.route('/add').post(multerMid.single("img"),(req,res) => {
    const username = req.body.username;
    const category = req.body.category;
    const title = req.body.title;
    const description = req.body.description;
    const date = req.body.date;
    const status = req.body.status;
    const comments = [];
    const numComments = 0;
    //optional to include img
    var img = '';
    
    if(req.file){
        uploadImage(req.file)
        .then(imageUrl => {
            img = imageUrl
            const newPost = new Post({username,category,title,description,date,img,status,comments,numComments});
            newPost.save()
                .then(() => res.json(newPost._id))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => console.log("upload Image Err: " + err));
    }
    else{
        const newPost = new Post({username,category,title,description,date,img,status,comments,numComments});
                newPost.save()
                    .then(() => res.json(newPost._id))
                    .catch(err => res.status(400).json('Error: ' + err));
    }

}); // end add func

// get info of a specific post
router.route('/:id').get((req,res) => {
    console.log('get request for spec post');
    Post.countDocuments({_id : req.params.id}, function (err, count) {
        if(count!==0){
            Post.findById(req.params.id)
                .then(post => { console.log("got existing post"); res.json(post)}) //if found, return info
                .catch(err => res.status(400).json('Error: ' + err));
        }      
        else{
            console.log("got nonexisiting post");
            const post = {
                username: '',
                category: '',
                title: '',
                description: '',
                img: '', 
                status: '',
                numComments: 0,
                comments: [],
                date: new Date(),
            }
            res.json(post);
        }                
    });
}); // end get specific post

// delete a specific post
router.route('/:id').delete((req,res) => {
    // Post.findByIdAndDelete(req.params.id)
    //     .then(() => res.json("Post Deleted!"));
    Post.findById(req.params.id)
        .then(post => {
            //del pic from uploads
            if(post.img !== ''){
                try{
                    deleteImage(post.img).then(res).catch(err=>console.log('Error: ' + err));
                }
                catch(err){
                    console.log("deleteImage had an error")
                }
            }

            //then deletePost
            Post.findByIdAndDelete(req.params.id)
                .then(() => res.json("Post Deleted!"))
            
        })
        .catch(err => res.status(400).json('Error: ' + err));

}); //end del specific post

// update a specific post
router.route('/update/:id').post(multerMid.single("img"),(req,res) => {
    Post.findById(req.params.id)
        .then(post => {
            post.username = req.body.username;
            post.category = req.body.category;
            post.title = req.body.title;
            post.description = req.body.description;
            post.date = Date.parse(req.body.date);
            post.status = req.body.status;
            //optional to update img
            if(req.file){ // incase change img
                //del prev
                if(post.img !== ''){
                    try{
                        deleteImage(post.img).then(res).catch(err=>console.log('Error: ' + err));
                    }
                    catch(err){
                        console.log("delete img had an error")
                    }
                }
                uploadImage(req.file)
                .then(imageUrl => {
                    post.img = imageUrl
                    //saving post
                    post.save()
                        .then(() => res.json('Post updated!'))
                        .catch(err => res.status(400).json('Error: ' + err))
                })
                .catch(err => console.log("upload Image Err: " + err));
            } 
            else if(req.body.img === ''){ //incase delete img
                //del pic from uploads
                if(post.img !== ''){
                    try{
                        deleteImage(post.img).then(res=>{res; post.img = ''}).catch(err=>console.log('Error: ' + err));
                    }
                    catch(err){
                        console.log("deleteImage had an error")
                    }
                }
                post.img = ''; //equal ''
                // saving updated post
                post.save()
                .then(() => res.json('Post updated'))
                .catch(err => res.status(400).json('Error: ' + err)); //throws if not all params filled
            }     
            else{ //incase no change
                post.img = post.img; //equal to itself from db 
                // saving updated post
                post.save()
                .then(() => res.json('Post updated'))
                .catch(err => res.status(400).json('Error: ' + err)); //throws if not all params filled
            }              
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

// updates a comment
router.route('/update/:id/update-comment/:cId').post((req,res) => {
    Post.updateOne(
        { _id: req.params.id, "comments._id": req.params.cId },
        { $set: { "comments.$.username" : req.body.username, "comments.$.description" : req.body.description, "comments.$.date": Date.parse(req.body.date)} },
     )
     .then(() => res.json('Comment Updated'))
    .catch(err => res.status(400).json('Error: ' + err)); // throws if post was not found
})

//del comment from array
router.route('/:id/delete-comment/:cId').delete((req,res) => {
    //get the post from id
    Post.findById(req.params.id)
        .then(post => {
            var removeIndex = post.comments.map(comment => {return comment._id;}).indexOf(req.params.cId);
            //remove the comment
            post.comments.splice(removeIndex, 1);
            post.numComments = post.comments.length;

            //save the post
            post.save()
                .then(() => res.json('Comment Deleted'))
                .catch(err => res.status(400).json('Error: ' + err)); //throws if not all params filled
        }) //if found, return post.comments
        .catch(err => res.status(400).json('Error: ' + err)); //if not, throw err
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