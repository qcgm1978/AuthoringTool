require("../rtfeditor/mytexteditor");
require("./panel.css");
var React = require('react');
var $ = require("jquery");


var EditPanel = React.createClass({
    initialOptions : {
        panelId: "#j-edit-panel",
        barId : "#j-edit-bar",
        gridClass : ".j-gridster",
        panelText: ".edit-panel-text",
        gridBlockClass: ".j-grid-block",
        editorClass: ".wysiwyg-editor",
        hideClass: "hide",
        dataPanelIndex: "data-panel-index"

    },

    statics: {
        init: function() {
            $(".j-grid-block").on("mouseover", function () {
                var $offset = $(this).offset(),
                    _top = $offset.top,
                    _left = $offset.left;
                console.log($offset);
                $("#j-edit-bar").css({"top":_top + 5,"left":_left + 10}).removeClass("hide").attr("data-bar-index",$(this).index());
            });

            $(".edit-panel-title").dragDiv("#j-edit-panel");
        }
    },

    closePanelHandler: function () {
        var $createdHtml = $(this.initialOptions.panelText).find(this.initialOptions.editorClass);
        var _indx =  $(this.initialOptions.panelId).attr(this.initialOptions.dataPanelIndex);
        var $gridLi = $(this.initialOptions.gridBlockClass).eq(_indx),
            $tempLi = $gridLi.find(this.initialOptions.editorClass);
        if ($tempLi.length) {
            $tempLi.remove();
            $gridLi.append($createdHtml);
        }else {
            $gridLi.append($createdHtml);
        }
        $(this.initialOptions.panelId).addClass(this.initialOptions.hideClass);
    },
    render: function () {
        var panelId = this.initialOptions.panelId;
        return (
            <div  id="j-edit-panel" className="edit-panel panel-drag hide">
                <div className="" >
                    <div className="edit-panel-title">
                        <span className="">Editor</span>
                        <span className="edit-panel-close" onClick={this.closePanelHandler}>CLOSE</span>
                    </div>
                    <div className="edit-panel-text"></div>
                </div>
            </div>
        )
    }
});


module.exports = EditPanel;

