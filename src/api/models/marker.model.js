const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const markerSchema = new Schema(
{   
    //_id: Schema.Types.ObjectId,
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    category: {type: String, required: true},
    numReports: {type: Number, required: true},
    date: {type: Date, required: true},

},{
    timestamps: true,
}
);

const Marker = mongoose.model('Marker',markerSchema);
module.exports = Marker;

//multiple report crash
//