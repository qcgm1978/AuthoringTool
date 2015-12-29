var fs = require("fs");
var config = require("./config.json");

var bodyParser = require('body-parser');


var Datastore = require('nedb')
    , db = new Datastore({ filename: 'authoringdb', autoload: true });

var AuthoringService = function(app, templateService) {

    /**for parsing application/json, use it in future?*/
    var jsonParser = bodyParser.json(); //

    /**for multipart form parsing*/
    var urlencodedParser = bodyParser.urlencoded({ extended: false });

    function initMapping(app) {
        app.post('/authoring/update', urlencodedParser, updatePage);
        app.get('/authoring/list', listPages);

        fs.stat(__dirname + "/" + config.basePath, function(err, stats) {
            if (err) {
                fs.mkdir(__dirname + "/" + config.basePath);
            }
        });
    }

    function updatePage(req, res) {
        doUpdate(req,res);
        function doUpdate(req, res) {
            req.body.updated = new Date().getTime();
            db.update(
                {
                    name: req.body.name
                },
                req.body,
                {
                    upsert : true
                },
                function( err, numReplaced, newDoc) {
                    console.log(err, numReplaced, newDoc);
                }
             );
        }
    }

    function listPages(req, res) {
        db.find({}).sort({updated: -1}).limit(10).exec(function(err, docs) {
            res.send(docs);
        });
    }

    initMapping(app);
};

module.exports = AuthoringService;
