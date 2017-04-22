var express = require("express");
var multer = require('multer');
var fs = require('fs');
var http = require('https');

var app = express();

var Clarifai = require('clarifai');

var clarifai_app = new Clarifai.App(
    'ZA7X0xCEKGj8ccJhHcHe9btVdeR-I-7aPVBR6b-X',
    'Vb5z6QJvd7zN7ENZZyCNuqUF64oemuMQf2bTbPix'
);

var storage;
storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
var upload = multer({storage: storage}).single("userPhoto");

//add hashMap and its keys with values
var hashMap = {
    Set : function(key,value){this[key] = value},
    Get : function(key){return this[key]},
    Contains : function(key){return this.Get(key) == null?false:true},
    Remove : function(key){delete this[key]}
}


hashMap.Set("Biodome Montreal","The Montreal Biodome is a facility located at Olympic Park in the Montreal neighbourhood of Mercier–Hochelaga-Maisonneuve that allows visitors to walk through replicas of four ecosystems found in the Americas. The building was originally constructed for the 1976 Olympic Games as a velodrome. It hosted both track cycling and judo events. Renovations on the building began in 1989 and in 1992 the indoor nature exhibit was opened.The Montreal Biodome is one of four facilities that make part of the largest natural science museum complex in Canada, Space for Life, which also includes the Montreal Insectarium, Montreal Botanical Garden, and Rio Tinto Alcan Planetarium.[6] It is an accredited member of both the Association of Zoos and Aquariums (AZA) and the Canadian Association of Zoos and Aquariums (CAZA)");
hashMap.Set("EV Building","The Engineering, Computer Science and Visual Arts Integrated Complex (EV Building) opened in September 2005, a striking addition to Montreal’s downtown landscape. The two towers of the high-tech complex are completely integrated with links at every floor and a common corridor. The 17-storey Engineering and Computer Science tower houses research and graduate teaching labs, administrative offices, and the Dean’s Office. From the many disparate locations in which it was previously housed, this tower integrates a large part of the Faculty in a single space, fostering more effective interaction of researchers. Facilities include over 300 specialized labs, conference and meeting rooms, and student areas.");
hashMap.Set("Henry F. Hall Building","The Henry F. Hall Building is a high-density hub of Concordia’s downtown campus. It is a utilitarian, cube-shaped, 1960s-style high-rise university building made of pre-fabricated stressed concrete. Most Social Sciences academic departments are concentrated in the Hall Building, along with engineering teaching and research labs, The D.B. Clarke Theatre, classrooms and student space. ");
hashMap.Set("J. W. McConnell Building", "The J. W. McConnell Building opened in 1992 to house the R. Howard Webster Library, teaching and research facilities, the Leonard and Bina Ellen Art Gallery, the J.A. DeSève Cinema and academic and administrative offices.");
hashMap.Set("John Molson Building", "In 2009 the John Molson Building officially opened on the corner of Guy and de Maisonneuve. It includes digitally equipped teaching amphitheatres and classrooms, faculty and graduate student offices, the Office of the Dean, student and faculty social space, as well as space for privatized programs. Special features also include case study rooms designed for group work, and laboratories for consumer behaviour research.Set on a tight footprint typical of a downtown property, the building is 15 storeys high, with two basement levels. The distinctive design features two-storey stacked atria, a vertically interconnected ground floor concourse, and a tunnel running under Guy Street connecting to the Métro and the new Engineering, Computer Science and Visual Arts Integrated Complex.");
hashMap.Set("Notre-Dame Basilica (Montreal)", "Notre-Dame Basilica is a basilica in the historic district of Old Montreal, in Montreal, Quebec, Canada. The church is located at 110 Notre-Dame Street West, at the corner of Saint Sulpice Street. It is located next to the Saint-Sulpice Seminary and faces the Place d'Armes square.Built in the Gothic Revival style, the church's is highly decorated. The vaults are coloured deep blue and decorated with golden stars, and the rest of the sanctuary is decorated in blues, azures, reds, purples, silver, and gold. It is filled with hundreds of intricate wooden carvings and several religious statues. Unusual for a church, the stained glass windows along the walls of the sanctuary do not depict biblical scenes, but rather scenes from the religious history of Montreal. It also has a Casavant Frères pipe organ, dated 1891, which comprises four keyboards, 92 stops using electropneumatic action and an adjustable combination system, 7000 individual pipes and a pedal board.");
hashMap.Set("Saint Joseph's Oratory", "Saint Joseph's Oratory of Mount Royal is a Roman Catholic minor basilica and national shrine on Westmount Summit in Montreal, Quebec. It is Canada's largest church[1] and the twenty-seventh largest church building in the world.The basilica enshrines a statue of Saint Joseph, which was authorized a Canonical coronation by Pope Pius XII on 31 July 1955, now located within its crypt department. The shrine is also famous due to its association with Brother Andre Bessette who was believed to possess healing powers through his Josephian devotion with its notable oil oinment given freely to its believers.");


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/html/index.html");
});

app.post('/api/photo', function (req, res) {


    upload(req, res, function (err) {
        if (err) {

            return res.end("Error uploading file.");
        }
        console.log('file location and name: ', req.file.destination + '/' + req.file.filename);

        var filePath = req.file.destination + '/' + req.file.filename;
        // send the buffer to claifai api to recognize, return the token

        fs.readFile(filePath, function (err, original_data) {
            var base64Image = original_data.toString('base64');
            // console.log(base64Image);

            clarifai_app.models.predict("beta", {base64: base64Image}).then(
                function (response) {
                    var itemName = response.data.outputs[0].data.concepts[0];

                    var str = itemName.name;
                    console.log(str);
                    var adjustedName = itemName.name[0].toUpperCase();
                    /* 4-22
                    var final_text = hashMap.Get(str);

                    var final_result = {};
                    final_result["place"] = str;
                    final_result["description"] = final_text;
                    fs.unlinkSync(filePath);
                    res.end(JSON.stringify(final_result));
                    */

                    for (var i = 1, len = str.length; i < len; i++) {
                        if (i > 0 && str.charAt(i - 1) == ' ' && i > 0 && str.charAt(i - 1) != 'a' && str.charAt(i) != 'l') {
                            adjustedName += str[i].toUpperCase();
                        }
                        else {
                            adjustedName += str[i];
                        }
                    }
                    console.log(adjustedName);

                    var titleParts = adjustedName.split(" ");
                    var titleParam = "";
                    titleParts.map(function (x) {
                        titleParam += x + "+";
                    });
                    titleParam.slice(0, -1);

                    var wiki_url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + titleParam;


                    http.get(wiki_url, function (response) {
                        // Continuously update stream with data
                        var body = '';
                        response.on('data', function (d) {
                            body += d;
                        });

                        response.on('end', function () {

                            // Data reception is done, do whatever with it!
                            var parsed = body.split("\"extract\":\"");
                            //console.log(parsed[1]);
                            var final_text = parsed[1].slice(0, -5);

                            var final_result = {};
                            final_result["place"] = adjustedName;
                            final_result["description"] = final_text;
                            // delete the file from the middleware
                            fs.unlinkSync(filePath);
                            res.end(JSON.stringify(final_result));
                        });
                    });

                },
                // predict function error
                function (err) {
                    console.error(err);
                });

        });

    });


});


// serves static files 
app.get(/^(.+)$/, function (req, res) {
    res.sendFile(__dirname + "/html/" + req.params[0]);
});


app.listen(3000, function () {
    console.log("Working on port 3000");
});
