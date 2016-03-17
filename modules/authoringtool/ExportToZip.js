/**
 * Created by liuhan
 * on 2015/12/15.
 */
var React = require('react');
var JSZip = require("jszip");
var JSZipUtils = require("jszip-utils");
var saveAs = require("./SaveAs");

var AuthoringInfo = require("./AuthoringInfo");

var ExportToZip = (function() {

    function exportZ() {
        var zip = new JSZip();
        copyFile(zip, "build/jquery.2.1.4.min.js");

        setTimeout(function() {
            var content = zip.generate({type:"blob"});
            saveAs(content, "example.zip");
        }, 500);
    }



    //将指定路径的文件按 目录方式添加到zip中
    function copyFile(zip, path) {
        var paths = path.split("/");
        var folder = null;
        for(var i=0; i<paths.length-1; i++) {
            if (folder==null) {
                folder = zip.folder(paths[i]);
            } else {
                folder = folder.folder(paths[i]);
            }
        }
        JSZipUtils.getBinaryContent(path, function(err, data) {
            if(err) {
                throw err; // or handle err
            }
            folder.file(paths[paths.length-1], data);
        });
    }

    return {
        exportZ : exportZ
    };
}());

module.exports = ExportToZip;