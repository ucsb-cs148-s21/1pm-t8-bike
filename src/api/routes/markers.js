const router = require('express').Router();
const path = require('path');
let Marker = require('../models/marker.model');

// get all markers info from db
router.route('/').get((req,res) => {
    Marker.find()
        .then(markers => res.json(markers))
        .catch(err => res.status(400).json('Error: ' + err));

}); // end get all 

// get all crash report markers info from db
router.route('/Crash-Markers').get((req,res) => {
    Marker.find({ category: "Crash Marker" })
        .then(markers => res.json(markers))
        .catch(err => res.status(400).json('Error: ' + err));
});

// get all hardcoded markers info from db
router.route('/Hard-Coded-Markers').get((req,res) => {
    Post.find({ category: "Hard Coded Marker" })
        .then(markers => res.json(markers))
        .catch(err => res.status(400).json('Error: ' + err));
});

// add a new marker to db
router.route('/add').post((req,res) => {
    const lat = req.body.lat;
    const long = req.body.long;
    const category = req.body.long;
    const date = req.body.date;
    const numReports = req.body.numReports;

    const newMarker = new Marker({lat, long, category, date, numReports});

    newMarker.save()
        .then(() => res.json('Marker added!'))
        .catch(err => res.status(400).json('Error: ' + err));

}); // end add func

// get info of a specific marker
router.route('/:id').get((req,res) => {
    //get the marker from id
    Marker.findById(req.params.id)
        .then(marker => res.json(marker)) //if found, return info
        .catch(err => res.status(400).json('Error: ' + err)); //if not, throw err

}); // end get specific marker

// delete a specific marker
router.route('/:id').delete((req,res) => {
    Marker.findByIdAndDelete(req.params.id)
        .then(() => res.json("Marker Deleted!"));
}); //end del specific marker

//update marker
router.route('/update/:id').post((req,res) => {
    Post.findById(req.params.id)
        .then(marker => {
            marker.lat = req.body.lat;
            marker.long = req.body.long;
            marker.category = req.body.category;
            marker.numReports = req.body.numReports;
            marker.date = Date.parse(req.body.date);

            // saving updated marker
            marker.save()
                .then(() => res.json('Marker updated'))
                .catch(err => res.status(400).json('Error: ' + err)); //throws if not all params filled
        })
        .catch(err => res.status(400).json('Error: ' + err)); // throws if post was not found

}); //ends update specific post

module.exports = router;