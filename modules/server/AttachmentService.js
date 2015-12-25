var fs = require('fs');
var busboy = require('connect-busboy');

var AttachmentService = function(app) {

    app.use(busboy());

    function initMapping(app) {
        app.post('/attach/upload', uploadFile);
    }

    function uploadFile(req, res) {
        if (req.busboy) {
            req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
               console.log("fieldname " + fieldname + "  file "  , file);
                var wstream = fs.createWriteStream('d:/' + fieldname);
                file.pipe(wstream);
                res.send({
                    url: fieldname
                });
            });
            req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
                // ...
            });
            req.pipe(req.busboy);
        }
    }
    initMapping(app);
};

module.exports = AttachmentService;
