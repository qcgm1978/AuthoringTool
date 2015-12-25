var fs = require("fs");
var config = require("./config.json");

var AuthoringService = function(app, templateService) {

    function initMapping(app) {
        app.post('/authoring/update', updatePage);
        app.post('/authoring/list', updatePage);

        fs.stat(__dirname + "/" + config.basePath, function(err, stats) {
            if (err) {
                fs.mkdir(__dirname + "/" + config.basePath);
            }
        });
    }

    function updatePage(req, res) {
       fs.stat(__dirname + "/" + config.basePath + "/" + req.params.name, function(err, stats) {
            if (err) { //不存在则创建
                fs.mkdir(__dirname + "/" + config.basePath + "/" + req.params.name, function() {
                    doUpdate(req,res);
                });
            } else {
                doUpdate(req,res);
            }
       });

        function doUpdate(req, res) {
            
        }
    }

    initMapping(app);
};

module.exports = AuthoringService;
