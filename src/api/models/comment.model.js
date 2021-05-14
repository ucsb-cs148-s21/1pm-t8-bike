const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
{
    username: { type: String, required: true, trim: true }, //will be changed to fit google oauth
    description: { type: String, required: true },
    date: { type: Date, required: true },
},{
    timestamps: true
}
);

const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;