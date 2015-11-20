var remote = require('remote');
var bwindow = remote.BrowserWindow;
var dialog = remote.require('dialog');

/**
 * Created by ¡ı∫≠ on 2015/11/17.
 */
var fs = require("fs");

$(function() {
    fs.readdir("c:/", function(error, files) {
        console.log(files);
    });
});


function openDialog(name) {
    $(".dialog." + name).show().css("z-index", 9999);
    if ($(".masklayer").length===0) {
        var masklayer = $("<div class='masklayer'></div>").css("position", "absolute")
            .css("z-index", 9998)
            .css("left", 0).css("top", 0).css("bottom", 0).css("right", 0)
            .css("background-color", "rgba(0,0,0,.4)");
        $("body").append(masklayer);
    }
    $(".masklayer").show();
}

function closeDialg(name) {
    if (name) {
        $(".dialog." + name).hide().css("z-index", 0);
    } else {
        $(".dialog").hide().css("z-index", 0);
    }
    $(".masklayer").hide();
}


function useThisTemplate() {
    closeDialg();
    dialog.showSaveDialog( {
        title: "Select Authoring Save Path",
        defaultPath: "d:\\"
    }, function(path) {
        if (path) {
            fs.mkdirSync(path);
        }
        $(".dialog,.scene").hide();

        $(".activity-editor").show();

        $(".activity-editor .screen>.viewables").load("d:/git/AuthoringTool/template/column2/template.html",
           function() {
               AuthoringTools.initViewable();
           }
        );
    });
}

var AuthoringTools = (function($) {

    $(function() {
       $("#screenratio,#siderbar-show,#headerbar-show,#ddscreen-show").change(function() {
            renderViewPort();
       });
    });

    function initViewable() {
        console.log("init view table");
        $(".select-image").click(function() {
            dialog.showOpenDialog({
                filters: [
                    { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
                ]
            }, function(path) {
                fs.createReadStream(path).pipe(fs.createWriteStream('d:/R1A/img/' + StringUtils.randomStr(5) + ".png"));
            });
        });
    }

    function renderViewPort(ratio, sider, hider, ddscreen) {
        var ratio = $("#screenratio").val();
        if (ratio==="x169") {
            $(".screen").css("width", 1920);
        }
        if (ratio==="x1610") {
            $(".screen").css("width", 1080/10*16);
        }
        if (ratio==="x43") {
            $(".screen").css("width", 1080/3*4);
        }

        var ddscreen = $("#ddscreen-show").prop("checked");
        if (ddscreen) {
            $(".screen").css("width", parseInt($(".screen").css("width"))*2);
            $(".screen").addClass("dds");
        } else {
            $(".screen").removeClass("dds");
        }

        if ($("#siderbar-show").prop("checked")) {
            $(".screen").addClass("so");
        } else {
            $(".screen").removeClass("so");
        }

        if ($("#headerbar-show").prop("checked")) {
            $(".screen").addClass("ho");
        } else {
            $(".screen").removeClass("ho");
        }

    }

    return  {
        initViewable: initViewable
    }

}(jQuery));





var StringUtils = (function() {
    function randomStr(len) {
        var x="123456789poiuytrewqasdfghjklmnbvcxzQWERTYUIPLKJHGFDSAZXCVBNM";
        var tmp="";
        var ran = Math.random();
        for(var i=0;i< len;i++) {
            ran *=10;
            tmp += x.charAt(Math.ceil(ran)%x.length);
        }
        return tmp;
    }

    var FILE_NAME_REGEX = '(?!((^(con)$)|^(con)/..*|(^(prn)$)|^(prn)/..*|(^(aux)$)|^(aux)/..*|(^(nul)$)|^(nul)/..*|(^(com)[1-9]$)|^(com)[1-9]/..*|(^(lpt)[1-9]$)|^(lpt)[1-9]/..*)|^/s+|.*/s$)(^[^/////:/*/?/"/</>/|]{1,255}$)';

    function isFileName(name) {
        return name.match(FILE_NAME_REGEX);
    }

    String.prototype.between = function(sa, so) {
        var sfr = this.indexOf(sa);
        if (sfr==-1) return "";

        var sfo = this.indexOf(so, sfr + sa.length);

        if (sfo>-1) {
            return this.substring(sfr+sa.length, sfo);
        } else {
            return "";
        }
    };

    String.prototype.getFileExt = function() {
        var li = this.lastIndexOf(".");
        if (li===-1) return "";
        return this.substring(li+1);
    };

    String.prototype.getFileName = function () {
        return this.substring(this.lastIndexOf("/")+1);
    };

    return {
        randomStr: randomStr,
        isFileName: isFileName
    };
}());

