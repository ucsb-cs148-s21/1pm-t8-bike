const router = require('express').Router();
var distance = require('google-distance-matrix');
distance.key('AIzaSyBagPLQYd_ild9r_JDJ6DHcGNyWJ2J17to');
router.route('/bicycling/:originLat/:originLng/:destLat/:destLng').get((req,res) => {
    distance.mode('bicycling');
    var origins = [`${req.params.originLat},${req.params.originLng}`];
    var destinations = [`${req.params.destLat},${req.params.destLng}`];
    distance.matrix(origins, destinations, function (err, distances) {
        if (err) {
            res.json('Error: ' + err)
        }
        if(!distances) {
            return console.log('no distances');
        }
        if (distances.status == 'OK') {
            for (var i=0; i < origins.length; i++) {
                for (var j = 0; j < destinations.length; j++) {
                    var origin = distances.origin_addresses[i];
                    var destination = distances.destination_addresses[j];
                    if (distances.rows[0].elements[j].status == 'OK') {
                        var distance = distances.rows[i].elements[j].distance.text;
                        var time_needed = distances.rows[i].elements[j].duration.text;
                        //res.json('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                        res.json('Time needed from ' + origin + ' to ' + destination + ' is ' + time_needed);
                    } else {
                        res.json(destination + ' is not reachable by land from ' + origin);
                    }
                }
            }
        }
    } )
}); // end get all 

router.route('/walking/:originLat/:originLng/:destLat/:destLng').get((req,res) => {
    distance.mode('walking');
    var origins = [`${req.params.originLat},${req.params.originLng}`];
    var destinations = [`${req.params.destLat},${req.params.destLng}`];
    distance.matrix(origins, destinations, function (err, distances) {
        if (err) {
            res.json('Error: ' + err)
        }
        if(!distances) {
            return console.log('no distances');
        }
        if (distances.status == 'OK') {
            for (var i=0; i < origins.length; i++) {
                for (var j = 0; j < destinations.length; j++) {
                    var origin = distances.origin_addresses[i];
                    var destination = distances.destination_addresses[j];
                    if (distances.rows[0].elements[j].status == 'OK') {
                        var distance = distances.rows[i].elements[j].distance.text;
                        var time_needed = distances.rows[i].elements[j].duration.text;
                        //res.json('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                        res.json('Time needed from ' + origin + ' to ' + destination + ' is ' + time_needed);
                    } else {
                        res.json(destination + ' is not reachable by land from ' + origin);
                    }
                }
            }
        }
    } )
}); // end get all 

module.exports = router;