/**
 * Created by ¡ı∫≠ on 2015/12/21.
 */

var fs = require("fs");
var config = require("./config.json");

var TemplateService = function(app) {

    function initMapping() {
        app.get('/theme/list', doList);
    }

    function doList(req, res) {
        fs.readdir(".", function(err, files) {
            res.send({
                "files": files,
                "config": config
            });
        });
    }

    function fucking(bb) {
        return bb.some;
    }

    initMapping();

    return {
        fuck: fucking
    }
};

module.exports = TemplateService;
