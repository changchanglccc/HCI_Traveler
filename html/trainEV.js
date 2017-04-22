/**
 * Created by Ted on 4/7/2017.
 */
var Clarifai = require('clarifai');
var clarifai_app = new Clarifai.App(
    'ZA7X0xCEKGj8ccJhHcHe9btVdeR-I-7aPVBR6b-X',
    'Vb5z6QJvd7zN7ENZZyCNuqUF64oemuMQf2bTbPix'
);

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}

var LBimages = [
    "J. W. McConnell Building",
    "http://photos.wikimapia.org/p/00/01/62/38/85_big.jpg",
    "http://theconcordian.com/wp-content/uploads/2012/10/Library-flickr.png",
    "http://economics.ca/2006/concordia.jpg",
    "https://library.concordia.ca/webster-transformation/wp-content/uploads/2014/12/LB-building-from-Bishop-and-De-Maisonneuve-2b.jpg",
    "http://www.imtl.org/image/big/Untitled_HDR2.jpg",
    "http://www.concordia.ca/content/dam/artsci/math-stats/images/20130619-SGW-Campus-LB-Building-003-300x300.jpg",
    "https://www.concordia.ca/content/dam/artsci/math-stats/images/20130619-SGW-Campus-LB-Building-318-600x400.jpg",
    "http://www.imtl.org/image/big/20130619_121010.jpg",
    "http://photos.wikimapia.org/p/00/01/62/38/65_big.jpg",
    "https://www.concordia.ca/content/concordia/en/artsci/economics/_jcr_content/content-main/tiles_0/tiles_0_tiles_parsys_1/image.img.jpg/1415135130125.jpg"
];

var EVimages = [
    "EV",
    "https://c1.staticflickr.com/6/5170/5280439508_a3d51cb0c2_b.jpg",
    "http://www.toituretruchon.com/img/projets3/Concordia_6.jpg",
    "https://c1.staticflickr.com/4/3098/2709465408_a509355fdc.jpg",
    "http://static.panoramio.com/photos/large/44715870.jpg",
    "https://users.encs.concordia.ca/~i-sip/s3pcps2016/assets/img/gallery/c1.jpg",
    "http://linguistics.concordia.ca/naphc6/ev-concordia.jpg",
    "http://wpmedia.montrealgazette.com/2015/05/montreal-que-may-20-2015-concordia-university-ev-buil.jpg?quality=55&strip=all&w=840&h=630&crop=1",
    "https://c1.staticflickr.com/6/5290/5279916107_92183888fd_b.jpg",
    "http://static.panoramio.com/photos/large/42706832.jpg",
    "https://thelinknewspaper.ca/images/made/images/articles/_resized/25.ca.EV.Tristan_900_623_90.jpg"
];

var MBimages = [
    "John Molson Building",
    "http://cdn.c.photoshelter.com/img-get/I0000QQCo_RE3hFk/s/650/650/Concordia-University-02.jpg",
    "https://www.concordia.ca/jmsb/student-life/alumni/_jcr_content/content-main/image.img.jpg/1468853751584.jpg",
    "https://www.concordia.ca/cunews/jmsb/2017/01/26/100-jmsb-students-pass-the-cpa-common-final-exam.img.png/1485442474915.jpg",
    "https://karmatrendz.files.wordpress.com/2011/10/le_quartier_concordia_16.jpg",
    "http://simbiosisgroup.net/wp-content/uploads/2011/07/1259.jpg",
    "https://thelinknewspaper.ca/images/made/images/articles/Volume_34/News/_resized/5n.JMSB(ErinSparks)_800_531_90.jpg",
    "https://thelinknewspaper.ca/images/made/images/articles/Volume_36/News/_resized/3CA.AsbestosJMSB(ShaunMichaud)4_900_600_90.jpg",
    "http://imtl.org/image/big/john_molson_school_montreal.jpg",
    "http://photos.wikimapia.org/p/00/01/61/96/02_big.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/d/d7/JMSB.jpg"
];

var HBimages = [
    "Henry F. Hall Building",
    "http://www.imtl.org/image/big/Henry_F_Hall_Concordia.jpg",
    "http://www.gussconcordia.org/wp-content/uploads/2016/01/NEWS_HallBuilding_TamimSujat_WEB.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/a/ab/Henry_F._Hall_Building_-_Concordia_University.JPG",
    "http://photos.wikimapia.org/p/00/01/61/95/69_big.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Henry_F._Hall_Building_-_Concordia_University_01.jpg/576px-Henry_F._Hall_Building_-_Concordia_University_01.jpg",
    "http://www.imtl.org/image/big/20130919_124100.jpg",
    "https://s-media-cache-ak0.pinimg.com/564x/bc/bf/d2/bcbfd2dc2ae2a2e9b48123d3baffa937.jpg",
    "https://users.encs.concordia.ca/~sera2010/images/hall.jpg",
    "http://thepack.unm.edu/wp-content/uploads/2016/03/hall.jpg",
    "http://www.montrealgazette.com/sports/cms/binary/6510930.jpg?size=640x420"
];
//
// var FGimages = [
//     "FG",
//     "https://upload.wikimedia.org/wikipedia/commons/2/2d/Faubourg_Sainte-Catherine_02.JPG",
//     "http://photos.wikimapia.org/p/00/01/61/97/84_big.jpg",
//     "http://photos.wikimapia.org/p/00/01/61/97/80_big.jpg",
//     "http://photos.wikimapia.org/p/00/01/61/97/79_big.jpg",
//     "http://photos.wikimapia.org/p/00/01/61/81/25_big.jpg",
//     "http://www.imtl.org/image/big/aIMG_6189.jpg",
//     "http://worldneighborhoods.com/pictures/download.php?id=4797&t=1",
//     "https://lh4.googleusercontent.com/-19MbVACebtY/UAVw55ZbcFI/AAAAAAAACuY/0lee3RBEYBc/s640/IMGP5632.JPG",
//     "http://photos.wikimapia.org/p/00/01/62/00/74_big.jpg",
//     "http://www.japote.ca/images/header-img.jpg"
// ];

var NotreDameBasilica = [
    "Notre-Dame Basilica",
    "https://traveldefined.files.wordpress.com/2015/09/dsc_0133-001.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/b/b6/Basilique_Notre-Dame_de_Montreal_10.JPG",
    "http://www.999photos.com/canada/montreal/notre_dame_basilica.gif",
    "https://media-cdn.tripadvisor.com/media/photo-s/06/e0/f6/3f/basilica-de-notre-dame.jpg",
    "https://3.bp.blogspot.com/-DYUkc-HR5TI/VN9bdN6D50I/AAAAAAAAOXs/MUGQ1qJ3SKM/s1600/Notre-Dame%2BBasilica%2BThe%2Bmagnificent%2BNeo-Gothic%2Bchurch-2.jpg",
    "http://wonderful-landscapes.blog.tiscali.it/wp-content/blogs.dir/61438/files/montreal/8679000.jpg",
    "http://www.gothereguide.com/Images/Canada/Montreal/Notre-Dame_Basilica_Montreal.jpg",
    "http://www.aviewoncities.com/img/montreal/kveca1405s.jpg",
    "http://khm1.googleapis.com/kh?v=103&hl=en-US&deg=0&x=77509&y=104700&z=18",
    "https://farm1.static.flickr.com/185/392892077_1e19c703da_m.jpg",
    "http://www.travelandtransitions.com/blog/wp-content/uploads/2011/09/Notre-Dame-Basilica.jpg",
    "http://gomontrealtourism.com/wp-content/uploads/montreal-notre-dame-basilica-exterioir-dawn.jpg",
    "https://media-cdn.tripadvisor.com/media/photo-s/0a/0d/59/53/notre-dame-basilica.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Basilique_Notre-Dame_de_Montreal_07.JPG/1200px-Basilique_Notre-Dame_de_Montreal_07.JPG",
    "https://photos.smugmug.com/Travel/Canada/i-cMC73bK/0/X2/HDR%202433%40151126%20-%20Montreal%20-%20Notre-Dame%20Basilica%20%5BOptimizer%5D-X2.jpg",
    "https://17410-presscdn-0-76-pagely.netdna-ssl.com/wp-content/uploads/2015/03/NDnight.jpg",
    "https://www.mtlblog.com/uploads/271912_45e58fc95a0958a5b640c472da1f3e6705746fc5.jpg",
    "https://media-cdn.tripadvisor.com/media/photo-s/0a/af/b5/c3/montreal-quebec-notre.jpg",
    "https://i0.wp.com/keepcalmandwander.com/wp-content/uploads/2013/01/MONTREAL-NOTRE-DAME-BASILICA-2.jpg?resize=610%2C915",
    "http://montrealinpictures.com/wp-content/uploads/2013/11/13-11-06-Place-darmes-at-night.jpg?x45027",
    "https://previews.123rf.com/images/denis0856/denis08561212/denis0856121200025/16795310-The-Notre-Dame-Basilica-of-Montreal-at-night-Stock-Photo.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Basilique_Notre-Dame_de_Montreal_07.JPG/220px-Basilique_Notre-Dame_de_Montreal_07.JPG"
];

var BiodomeMontreal = [
    "Biodome Montreal",
    "http://fr.canoe.ca/archives/infos/regional/montreal/media/2016/08/20160816-143451-g.jpg",
    "http://grandquebec.com/upl-files/biodome.JPG",
    "https://ville.montreal.qc.ca/memoiresdesmontrealais/sites/ville.montreal.qc.ca.memoiresdesmontrealais/files/styles/chm-blog-non-contraint-modal/public/10386933_10152454346350516_2069783342592019544_o.jpg?itok=tlAWWKp4",
    "https://cache-graphicslib.viator.com/graphicslib/media/b6/view-from-the-observatory-photo_18754230-fit468x296.jpg",
    "http://mummyinmontreal.weebly.com/uploads/1/5/0/7/15077292/8271671_orig.jpg",
    "https://images.trvl-media.com/media/content/shared/images/travelguides/destination/180017/Montreal-Biodome-49135.jpg",
    "http://www.monquebec.net/photos/Montreal/Biodome%20avenue%20Pierre-de-Coubertin%202.jpg",
    "http://www.2blowhards.com/Olympic%20Park%20-%20Biodome%20and%20tower.jpg",
    "http://www.travel-location-blog.com/data/media/8/olympic-stadium-montreal_786.jpg",
    "https://media-cdn.tripadvisor.com/media/photo-s/02/cf/4d/7f/biodome-de-montreal.jpg",
    "https://cache-graphicslib.viator.com/graphicslib/page-images/360x240/145464_Canada_Quebec_Montreal_OlympicStadiumOlympics_shutterstock_12190045.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/6/64/Le_Stade_Olympique_de_Montr%C3%A9al_Nuit_Arriere_Edit_1.jpg",
    "https://c1.staticflickr.com/6/5012/5487153232_ef40798805_b.jpg",
    "http://montrealinpictures.com/wp-content/uploads/2012/11/332_365_nov27.jpg?x45027",
    "https://media-cdn.tripadvisor.com/media/photo-s/06/d9/39/85/olympic-stadium-s-observatory.jpg",
    "http://montrealinpictures.com/wp-content/uploads/2012/11/332_365_nov27-6.jpg?x45027",
    "https://upload.wikimedia.org/wikipedia/commons/a/a7/Biodome_Montreal.jpg",
    "http://espacepourlavie.ca/sites/espacepourlavie.ca/files/1-biodome-vue-exterieure_0.jpg"
];

var SaintJosephsOratory = [
    "Saint Joseph's Oratory",
    "https://upload.wikimedia.org/wikipedia/commons/5/50/Saint_joseph_oratory_montreal_2010q.JPG",
    "https://media-cdn.tripadvisor.com/media/photo-s/03/5c/71/d3/st-joseph-s-oratory-of.jpg",
    "http://ic.pics.livejournal.com/realtormarina/64216788/648154/648154_600.jpg",
    "http://nicolasetalexiane.com/wp-content/uploads/2014/02/Oratoir-Saint-Joseph-du-Mont-Royal-de-Montr%C3%A9al-nicolasetalexiane.com-pvt-canada-22.jpg",
    "http://i1.trekearth.com/photos/15259/picture_003.jpg",
    "http://i1.trekearth.com/photos/17800/oratoire_st_joseph_night.jpg",
    "http://www.parantours.com/UpImages/ProductAlbum/hhhhhhhhh[2].jpg",
    "https://media-cdn.tripadvisor.com/media/photo-s/05/21/e9/af/caption.jpg",
    "https://travellatina.files.wordpress.com/2017/03/2q5a1293w.jpg?w=740",
    "https://s3.amazonaws.com/editorialhub/production/2015/04/Cote-Des-Neiges_StJosephOratory_HotSpots_960x738-320x246.jpg",
    "http://cdn.c.photoshelter.com/img-get2/I0000ial706.geAY/fit=1000x750/Gardens-at-Saint-Josephs-Oratory-000037-007.jpg",
    "http://www.evomontreal.com/wp-content/uploads/2016/06/Oratoire_St_Joseph.jpg",
    "http://www.uqat.ca/blogue/wp-content/uploads/2012/09/oratoire-st-Joseph.jpg",
    "http://static.panoramio.com/photos/large/62694190.jpg",
    "https://sean-smith.net/uploads/images/IMG_0121.jpg",
    "https://c2.staticflickr.com/4/3270/3052206338_046071d8de_b.jpg",
    "http://montrealinpictures.com/wp-content/uploads/2012/09/254_365_sep10.jpg?x45027",
    "http://www.ameriquefrancaise.org/media-3424/frere_andre_4.jpg",
    "http://blog.kenkaminesky.com/wp-content/uploads/2011/03/Kaminesky-Blog-Montreal-Saint-Josephs-Oratory-001.jpg",
    "http://cdn.c.photoshelter.com/img-get2/I0000VtEV8T.6nPo/fit=1000x750/Montreal-Saint-Josephs-Oratory-002.jpg",
    "https://s-media-cache-ak0.pinimg.com/736x/a1/b1/30/a1b130f939e6965806f32cd15abf74dc.jpg",
    "http://www.photoshelter.com/img-get/I0000.xihQ2sRDGY/s/645/531/Saint-Josephs-Oratory-at-twilight-4-15-2-2.jpg",
    "http://www.visapro.ca/fr/sites/www.visapro.ca/files/imagecache/Foto-Originala/H10a-Canada-Quebec-Montreal-Oratoire-Saint-Joseph-du-Mont-Royal-Caty-Michel-Tourisme-Montreal_0.jpg",
    "https://c1.staticflickr.com/9/8445/8018569953_37279ce938_b.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/9/9c/Oratoire_Saint-Joseph_du_Mont-Royal_2.jpg",
    "https://s-media-cache-ak0.pinimg.com/originals/5d/1d/2d/5d1d2df18c4d1afb757bf262f8a0bd7f.jpg"
];

function trainmodel(imgurl, conceptname)
{
    clarifai_app.inputs.create({
        url: imgurl,
        concept: [
            {
                id: conceptname,
                value: true
            }
        ]
    }).then(
        function (response) {
            console.log("success creating concept: "+conceptname);
        }
    );
}

function processimagearray(arr) {
    for (var i = 1; i < arr.length; i++) {
        var name = arr[0];
        trainmodel(arr[i], name);
    }
}

processimagearray(SaintJosephsOratory);