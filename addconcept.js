/**
 * Created by Ted on 4/8/2017.
 */
var Clarifai = require('clarifai');
var clarifai_app = new Clarifai.App(
    '86zP6be-eJBwZk9liTtpvApSVRFBjv5hGA9yI9mQ',
    'M7VeWjDo2E6_5sMuSJI9IeWjdr72MRxPBwgOqnjh'
);

clarifai_app.models.initModel("alpha").then(function(model) {
    console.log("go 1");
    updateModel(model),
        function(err) {
            console.log("There is an error in finding the model");
        },
        console.log("go 2");

});

function updateModel(model) {
    console.log("its here");
        model.mergeConcepts({"id": "Biodome Montreal"}).then(
        function(response) {
            console.log("success updating concept");
        },
        function(err) {
            console.log("There is an error updating concept");
        }
    );
    console.log("its ok");
}