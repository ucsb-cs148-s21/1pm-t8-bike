const router = require('express').Router();
const path = require('path');
let { Building } = require('../models/building.model');

// get all buildings info from db
router.route('/').get((req,res) => {
    Building.find()
        .then(buildings => res.json(buildings))
        .catch(err => res.status(400).json('Error: ' + err));

}); // end get all 

// add a new building to db
router.route('/add').post((req,res) => {
    const lat = req.body.lat;
    const lng = req.body.lng;
    const name = req.body.name;

    const newBuilding = new Building({lat, lng, name});

    newBuilding.save()
        .then(() => res.json('Building added!'))
        .catch(err => res.status(400).json('Error: ' + err));

}); // end add func

// get info of a specific building
router.route('/:name').get((req,res) => {
    //get the building from id
    Building.findOne({name: req.params.name})
        .then(building => res.json(building)) //if found, return info
        .catch(err => res.status(400).json('Error: ' + err)); //if not, throw err

}); // end get specific building

// delete a specific building
router.route('/:name').delete((req,res) => {
    Building.findOneAndDelete({name: req.params.name})
        .then(() => res.json("Building Deleted!"))
        .catch(err => console.log('Error: ' + err));
}); //end del specific building

//update building
router.route('/update/:name').post((req,res) => {
    Building.findOneAndUpdate({name: req.params.name})
        .then(building => {
            building.lat = req.body.lat;
            building.lng = req.body.lng;
            building.name = req.body.name;

            // saving updated building
            building.save()
                .then(() => res.json('Building updated'))
                .catch(err => res.status(400).json('Error: ' + err)); //throws if not all params filled
        })
        .catch(err => res.status(400).json('Error: ' + err)); // throws if post was not found

}); //ends update specific post

// update,get,del using :id in case its useful
// NOTE: route is a bit different so look at it carefully

// get info of a specific building
router.route('/id/:id').get((req,res) => {
    //get the building from id
    Building.findById(req.params.id)
        .then(building => res.json(building)) //if found, return info
        .catch(err => res.status(400).json('Error: ' + err)); //if not, throw err

}); // end get specific building

// delete a specific building
router.route('/id/:id').delete((req,res) => {
    Building.findByIdAndDelete(req.params.id)
        .then(() => res.json("Building Deleted!"));
}); //end del specific building

//update building
router.route('/update/id/:id').post((req,res) => {
    Building.findById(req.params.id)
        .then(building => {
            building.lat = req.body.lat;
            building.lng = req.body.lng;
            building.name = req.body.name;

            // saving updated building
            building.save()
                .then(() => res.json('Building updated'))
                .catch(err => res.status(400).json('Error: ' + err)); //throws if not all params filled
        })
        .catch(err => res.status(400).json('Error: ' + err)); // throws if post was not found

}); //ends update specific post

module.exports = router;