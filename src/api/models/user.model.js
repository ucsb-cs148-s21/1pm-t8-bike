const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema(
    {
        title: {type: String, required: true},
        location: {type: String, required: true},
        days: {type: Array, required: true},
        start: {type: String, required: true},
        end: {type: String, required: true},
    }
)

const userSchema = new Schema(
{   
    //_id: Schema.Types.ObjectId,
    username: {type: String, required: true}, //will be changed to fit google oauth
    bio: {type: String, required: true},
    itinerary: [courseSchema],
    numCourses: {type: Number, required: true, default: 0},
},
{
    timestamps: true,
}
);

const User = mongoose.model('User', userSchema);
module.exports = User;