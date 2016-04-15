/**
 * Created by liuhan
 * on 2015/12/15.
 */
var React = require('react');
//JSZip is a javascript library for creating, reading and editing .zip files, with a lovely and simple API.
var JSZip = require("jszip");
//A collection of cross-browser utilities to go along with JSZip
var JSZipUtils = require("jszip-utils");
var saveAs = require("./SaveAs");
var AuthoringInfo = require("./AuthoringInfo");
//import '../../bower_components/jQueryImageCaching/jquery.imageCaching.js'
function saveAs5(imgURL) {
    var oPop = window.open(imgURL, "", "width=1, height=1, top=5000, left=5000");
    for (; oPop.document.readyState != "complete";) {
        if (oPop.document.readyState == "complete")break;
    }
    oPop.document.execCommand("SaveAs");
    oPop.close();
}
var ExportToZip = (function () {
    function exportZ() {
        //todo test copy upload file
        var fileURL = $('[type="file"]:last').val();
        //saveAs5(fileURL)
        copyFile(zip, fileURL);

        var zip = new JSZip();
        var html = "<!DOCTYPE html>\n<html>\n<head>\n";
        html += '<meta charset="UTF-8">\n';
        html += '<meta http-equiv="X-UA-Compatible" content="IE=edge">\n';
        html += '<meta name="viewport" content="width=device-width, initial-scale=1">\n';
        var themeName = AuthoringInfo.themeName;
        html += '<link rel="stylesheet" type="text/css" href="templates/' + themeName + '/css/style.css">\n';
        /**����ģ�����css��img*/
        copyFile(zip, "templates/" + themeName + "/css/style.css");
        copyFile(zip, "templates/" + themeName + "/images/icon.png");
        copyFile(zip, "templates/" + themeName + "/images/insets_01.png");
        copyFile(zip, "templates/" + themeName + "/images/insets_02.png");
        copyFile(zip, "templates/" + themeName + "/images/insets_04.png");
        copyFile(zip, "templates/" + themeName + "/images/insets_05.jpg");
        copyFile(zip, "templates/" + themeName + "/images/insets_06.png");
        /**����Jquery*/
        html += '<script type="text/javascript" src="build/jquery.2.1.4.min.js"></script>\n';
        copyFile(zip, "build/jquery.2.1.4.min.js");
        /**link the page data(layout N content)*/
        AuthoringInfo.height = $('.screen').height()
        AuthoringInfo.minWidth = $('#main-grid>ul').width()
        var pageData = 'var data=' + JSON.stringify(AuthoringInfo);
        html += '<script type="text/javascript" src="data.js"></script>\n';
        zip.file("data.js", pageData);
        /**copy gridster related (we can use other method to paint the page)*/
        html += '<script type="text/javascript" src="modules/gridster/jquery.gridster.js"></script>\n';
        copyFile(zip, "modules/gridster/jquery.gridster.js");
        html += '<link rel="stylesheet" type="text/css" href="modules/gridster/jquery.gridster.css">\n';
        copyFile(zip, "modules/gridster/jquery.gridster.css");
        html += '<script type="text/javascript" src="modules/view.js"></script>\n';
        copyFile(zip, "modules/view.js");
        html += '</head>\n';
        html += '<body>\n';
        html += '<header class="site-header">\n';
        html += '<div class="A-head"><span class="A-head-bold">' +
            $('.A-head-bold').text() +
            '</span><span id="header-title">' +
            $('#header-title').text() +
            '</span></div>\n';
        html += '<div><span class="A-head-bor"></span><span class="A-head-line"></span></div>\n';
        html += '<div class="B-head"><span>' +
            $('.B-head span').text() +
            '<em></em></span></div>\n';
        html += '</header>\n';
        html += '<div class="content"></div>\n';
        html += '<footer class="site-footer">' +
            $('.site-footer').text() +
            '</footer>\n';
        //var foo=$('.zone img').imageCaching()
        html += '<script src="modules/common.js"></script>\n';
        copyFile(zip, "modules/common.js");
        html += '</body></html>';
        zip.file("index.html", html);
        zip.folder('json')
        setTimeout(function () {
            var content = zip.generate({type: "blob"});
            //todo comment for test
            saveAs(content, "example.zip");
        }, 500);
    }

    //��ָ��·�����ļ��� Ŀ¼��ʽ��ӵ�zip��
    function copyFile(zip, path) {
        var paths = path.split("/");
        var folder = null;
        for (var i = 0; i < paths.length - 1; i++) {
            if (folder == null) {
                folder = zip.folder(paths[i]);
            } else {
                folder = folder.folder(paths[i]);
            }
        }
        JSZipUtils.getBinaryContent(path, function (err, data) {
            if (err) {
                throw err; // or handle err
            }
            folder.file(paths[paths.length - 1], data);
        });
    }

    return {
        exportZ: exportZ
    };
}());
module.exports = ExportToZip;