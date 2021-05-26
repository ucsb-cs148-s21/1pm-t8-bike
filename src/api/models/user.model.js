const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Post = require("./post.model");

const courseSchema = new Schema(
    {
        course: {type: String, required: true},
        location: {type: String, required: true},
        days: {type: Array, required: true},
        start: {type: String, required: true},
        end: {type: String, required: true}
    }
)
const userSchema = new Schema(
{   
    //_id: Schema.Types.ObjectId,
    email: {type: String, required: true}, //will be changed to fit google oauth
    bio: {type: String, required: true},
    itinerary: [courseSchema],
    cache: [Post]
},
{
    timestamps: true,
}
);

const Post = mongoose.model('User',postSchema);
module.exports = User;