/**
 * Created by Ted on 4/7/2017.
 */
var Clarifai = require('clarifai');
var clarifai_app = new Clarifai.App(
    'ZA7X0xCEKGj8ccJhHcHe9btVdeR-I-7aPVBR6b-X',
    'Vb5z6QJvd7zN7ENZZyCNuqUF64oemuMQf2bTbPix'
);

clarifai_app.models.create(
    "beta",
    [
        { "id": "EV Building" },
        { "id": "John Molson Building" },
        { "id": "Henry F. Hall Building" },
        { "id": "Biodome Montreal" },
        { "id": "J. W. McConnell Building" },
        { "id": "Notre-Dame Basilica (Montreal)"},
        { "id": "Saint Joseph's Oratory"}
    ]
).then(
    function(response) {
        console.log("success creating model beta");
    },
    function(err) {
        console.log("error1");
    }
);