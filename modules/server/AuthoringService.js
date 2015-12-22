
var AuthoringService = function(app, templateService) {

    function initMapping(app) {
        app.post('/authoring/update', updatePage);
        app.post('/authoring/list', updatePage);
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
