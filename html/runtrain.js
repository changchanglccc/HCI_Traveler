/**
 * Created by Ted on 4/8/2017.
 */
var Clarifai = require('clarifai');
var clarifai_app = new Clarifai.App(
    '86zP6be-eJBwZk9liTtpvApSVRFBjv5hGA9yI9mQ',
    'M7VeWjDo2E6_5sMuSJI9IeWjdr72MRxPBwgOqnjh'
);

clarifai_app.models.train("alpha").then(
    function(response) {
        console.log("Model MyTourGuides trained successfully.")
    },
    function(err) {
        console.log("there is an error2");
    }
);