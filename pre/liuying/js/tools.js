/**
 * Created by liuying on 2015/9/2.
 */
'use strict';
/**
 *
 */
function exportZip() {
    var container = $("#main").html();
    var jsonData = JSON.parse($("#editor_box").html());

    var html = "<!DOCTYPE html>\n<html>\n<head>\n";

    html += '<meta charset="UTF-8">\n';
    html += '<meta http-equiv="X-UA-Compatible" content="IE=edge">\n';
    html += '<meta name="viewport" content="width=device-width, initial-scale=1">\n';
    html += '<link rel="stylesheet" type="text/css" href="js/libs/bootstrap-3.3.5/css/bootstrap.min.css">\n';
    html += '<script src="js/libs/jquery-1.11.2.min.js"></script>\n';
    /** 引入主题的CSS样式 */
    /*html += '<link rel="stylesheet" type="text/css" href="css/style.css">\n';*/

    html += '<script type="text/javascript" src="data.js"></script>\n';
    html += '<script type="text/javascript">\n';
    html +=	'$(document).ready(function() {\n';
    html += '//loadActionByData(data,"aaa");\n';
    html +=	'});</script>\n';
    html +=	'</head>\n<body>\n';
    html +=	'<div class="container">\n';
    html += container;
    html +=	'\n</div>\n';
    html += '<script type="text/javascript" src="js/common.js"></script>\n'; /*引入组件类
    for(var i=0; i<jsonData.files.length; i++) {
        html += '<script type="text/javascript" src="' + componentDef.js[i] + '"></script>\n';
        copyFile(zip,  componentDef.js[i]);
    }*/

    html +="</body>\n</html>\n";

    var zip = new JSZip();
    copyFile(zip, "js/common.js");
    copyFile(zip, "js/libs/jquery-1.11.2.min.js");
    /*这里拷贝主题颜色对应的css文件和相关的img*/
    copyFile(zip,  "css/common.css");
    copyFile(zip,  "js/libs/bootstrap-3.3.5/css/bootstrap.min.css");

    copyFile(zip,  "images/icon.png");
    /*引入数据中的文件*/
    for(var i=0; i<jsonData.files.length; i++) {
        copyFile(zip,  jsonData.files[i].src);
    }

    /*
    if (componentDef.imgs) {
        for(var i=0; i<componentDef.imgs.length; i++) {
            copyFile(zip,  "component/" + type + "/" + componentDef.imgs[i]);
        }
    }*/
    zip.file("core.html", html);
    zip.file("data.js", "var data= " + JSON.stringify(jsonData));
    zip.file("data.json", JSON.stringify(jsonData));
    setTimeout(function() {
        var content = zip.generate({type:"blob"});
        saveAs(content, "example.zip");
    }, 500);
}
//将指定路径的文件按目录方式添加到zip中
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

