var fs = require("fs");
var config = require("./config.json");

var AuthoringService = function(app, templateService) {

    function initMapping(app) {
        app.post('/authoring/update', updatePage);
        app.post('/authoring/list', updatePage);
        app.post("/authoring/create", createPage);

        fs.stat(__dirname + "/" + config.basePath, function(err, stats) {
            if (err) {
                fs.mkdir(__dirname + "/" + config.basePath)
            }
        });
    }

    function createPage(req, res) {
        fs.mkdir(__dirname + "/" + config.basePath + "/" + req.params.name, function() {
            res.send({
                created: true
            });
        });
    }


    function updatePage(req, res) {
        var fk = null;
        try {
            fk = templateService.fuck()
        } catch (ex) {

        }
        res.send({
            "fuck": fk
        });
    }

    initMapping(app);
};

module.exports = AuthoringService;
