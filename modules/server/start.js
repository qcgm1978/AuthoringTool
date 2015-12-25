
var express = require('express');
var app = express();
app.use(express.static('.'));

var templateService = require("./TemplateService")(app);
var attachmentService = require("./AttachmentService")(app);
var authoringService = require("./AuthoringService")(app, templateService);

var server = app.listen(80, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});