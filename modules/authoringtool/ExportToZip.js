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


        var html = "<!DOCTYPE html>\n<html>\n<head>\n";

        html += '<meta charset="UTF-8">\n';
        html += '<meta http-equiv="X-UA-Compatible" content="IE=edge">\n';
        html += '<meta name="viewport" content="width=device-width, initial-scale=1">\n';

        var themeName =
        html += '<link rel="stylesheet" type="text/css" href="templates/default/style.css">\n';
        copyFile(zip, "templates/default/style.css");

        html += '<script type="text/javascript" src="build/jquery-1.7.2.min.js"></script>\n';
        copyFile(zip, "build/jquery.2.1.4.min.js");

        html += '</head>';
        html += '<body>';



        html += '</body></html>';



        setTimeout(function() {
            var content = zip.generate({type:"blob"});
            saveAs(content, "example.zip");
        }, 500);
    }

    //��ָ��·�����ļ��� Ŀ¼��ʽ��ӵ�zip��
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