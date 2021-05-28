const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buildingSchema = new Schema(
{   
    //_id: Schema.Types.ObjectId,
    name: {type: String, required: true},
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},  
}
);

const Building = mongoose.model('Building',buildingSchema);
module.exports = Building;
