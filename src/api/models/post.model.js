const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
{   
    //_id: Schema.Types.ObjectId,
    username: {type: String, required: true, trim: true}, //will be changed to fit google oauth
    category: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, required: true},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: []}],
    //numComments: comments.length, //keeps track of comments length
    numComments: {type: Number, required: true, default: 0 },
    
},{
    timestamps: true,
}
);

const Post = mongoose.model('Post',postSchema);
module.exports = Post;