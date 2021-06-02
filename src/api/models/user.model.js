const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { buildingSchema } = require('./building.model');

const daysSchema = new Schema(
    {
        M: {type: Boolean, required: true, default: false},
        T: {type: Boolean, required: true, default: false},
        W: {type: Boolean, required: true, default: false},
        R: {type: Boolean, required: true, default: false},
        F: {type: Boolean, required: true, default: false},
        Sa: {type: Boolean, required: true, default: false},
        Su: {type: Boolean, required: true, default: false},
    }
)

const courseSchema = new Schema(
    {
        title: {type: String, required: true},
        location: {type: buildingSchema, required: true},
        days: {type: daysSchema, required: true},
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