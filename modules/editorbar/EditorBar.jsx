
require("./panel.css");

var React = require('react');
var $ = require("jquery");

var EditBar = React.createClass({
    initialOptions : {
        panelId: "#j-edit-panel",
        barId : "#j-edit-bar",
        editTextId: "#j-edit-text",
        gridClass : ".j-gridster",
        panelText: ".edit-panel-text",
        gridBlockClass: ".j-grid-block",
        editorClass: ".wysiwyg-editor",
        hideClass: "hide",
        dataPanelIndex: "data-panel-index",
        dataBarIndex: "data-bar-index",
        placeHolder : "Type your text here..."

    },
    panelOpenHandler: function () {
        var _dateBarIndex = $(this.initialOptions.barId).attr(this.initialOptions.dataBarIndex),
            $li = $(this.initialOptions.gridBlockClass).eq(_dateBarIndex);
        var $offset = $li.offset(),
            _top = $offset.top,
            _left = $offset.left +  100;
        var $textArea = $('<textarea id="j-edit-text" name="editor" placeholder="' + this.initialOptions.placeHolder + '"></textarea>');

        $(this.initialOptions.panelId).css({"top":_top -23,"left":_left}).attr(this.initialOptions.dataPanelIndex, _dateBarIndex)
            .removeClass(this.initialOptions.hideClass)
            .find(this.initialOptions.panelText).empty().append($textArea);

        $(this.initialOptions.editTextId).myTextEditor();


        var $exitTemp = $li.find(this.initialOptions.editorClass),
            $panelEditor =  $(this.initialOptions.panelId).find(this.initialOptions.editorClass);
        if ($exitTemp.length) {
            $panelEditor.empty().append($exitTemp.html());
        }
    },
    render: function() {
        return (
            <div id="j-edit-bar" className="edit-bar hide">
                <div className="edit-bar-icon">
                    <span onClick={this.panelOpenHandler}><img src="images/set.png" alt="" className="bar-set"/></span>
                    <span><img src="images/text.png" alt=""/></span>
                    <span><img src="images/link.png" alt=""/></span>
                    <span><img src="images/fix.png" alt=""/></span>
                    <span><img src="images/auto.png" alt=""/></span>
                    <span><img src="images/help.png" alt=""/></span>
                </div>

            </div>
        );
    }
});

module.exports = EditBar;

